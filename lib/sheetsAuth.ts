import { createPrivateKey, sign } from "crypto";

interface ServiceAccountKey {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

let cachedToken: { token: string; expiresAt: number } | null = null;
let cachedKey: ServiceAccountKey | null = null;

function getServiceAccountKey(): ServiceAccountKey {
  if (cachedKey) return cachedKey;

  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_B64;
  if (!b64) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_KEY_B64 not set in environment variables"
    );
  }

  const json = Buffer.from(b64, "base64").toString("utf-8");
  cachedKey = JSON.parse(json) as ServiceAccountKey;
  return cachedKey;
}

function base64url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function normalizePem(pem: string): string {
  const b64 = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\n/g, "")
    .replace(/\r/g, "")
    .trim();

  const lines: string[] = [];
  for (let i = 0; i < b64.length; i += 64) {
    lines.push(b64.substring(i, i + 64));
  }

  return "-----BEGIN PRIVATE KEY-----\n" + lines.join("\n") + "\n-----END PRIVATE KEY-----\n";
}

function createJWT(
  clientEmail: string,
  privateKeyPem: string,
  scope: string,
  tokenUri: string
): string {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope,
    aud: tokenUri,
    exp: now + 3600,
    iat: now,
  };

  const signatureInput =
    base64url(Buffer.from(JSON.stringify(header))) +
    "." +
    base64url(Buffer.from(JSON.stringify(payload)));
  const pem = normalizePem(privateKeyPem);
  const key = createPrivateKey({ key: pem, format: "pem", type: "pkcs8" });
  const sig = sign("RSA-SHA256", Buffer.from(signatureInput), key);
  const signature = base64url(sig);

  return signatureInput + "." + signature;
}

export async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token;
  }

  const key = getServiceAccountKey();
  const scope = "https://www.googleapis.com/auth/spreadsheets";
  const jwt = createJWT(key.client_email, key.private_key, scope, key.token_uri);

  const res = await fetch(key.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get access token: ${res.status} ${text}`);
  }

  const data: TokenResponse = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return data.access_token;
}