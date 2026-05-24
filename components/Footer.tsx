import React from "react";
import Link from "next/link";
import { GeneralInfo } from "@/lib/mockData";

interface FooterProps {
  generalInfo: GeneralInfo;
}

// Custom inline SVG icons for brands
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Footer({ generalInfo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-primary border-t border-gold/10 pt-16 pb-8">

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Tagline */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold fill-current"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.05A6.99 6.99 0 0 1 19 22H5a6.99 6.99 0 0 1-1.95-3H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM7 13a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm12 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zM9 17h6v1H9v-1z" /></svg>
              <span className="font-serif font-bold text-xl tracking-wider text-white">
                OMOTAYO<span className="text-gold">.</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm max-w-sm leading-relaxed">
              {generalInfo.tagline}
            </p>
            <div className="flex space-x-4">
              <a
                href={generalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-bg-elevated hover:bg-gold hover:text-bg-primary border border-gold/20 hover:border-gold text-text-muted transition-all duration-300"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={generalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-bg-elevated hover:bg-gold hover:text-bg-primary border border-gold/20 hover:border-gold text-text-muted transition-all duration-300"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${generalInfo.whatsapp.replace(/\D/g, "")}?text=Hi%20Omotayo%2C%20I%20saw%20your%20portfolio.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-bg-elevated hover:bg-gold hover:text-bg-primary border border-gold/20 hover:border-gold text-text-muted transition-all duration-300"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${generalInfo.email}`}
                className="p-2 rounded bg-bg-elevated hover:bg-gold hover:text-bg-primary border border-gold/20 hover:border-gold text-text-muted transition-all duration-300"
                aria-label="Email"
              >
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current fill-none" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4l-10 8L2 4" /></svg>
            </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-semibold tracking-wider text-white uppercase">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <a href="#about" className="text-link">
                  About Me
                </a>
              </li>
              <li>
                <a href="#services" className="text-link">
                  Services
                </a>
              </li>
              <li>
                <a href="#skills" className="text-link">
                  Skills
                </a>
              </li>
              <li>
                <a href="#experience" className="text-link">
                  Professional Experience
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Contact Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-semibold tracking-wider text-white uppercase">
              Quick Contact
            </h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>{generalInfo.location}</li>
              <li>
                <a
                  href={`mailto:${generalInfo.email}`}
                  className="text-link"
                >
                  {generalInfo.email}
                </a>
              </li>
              <li>
                  <a
                    href={`tel:${generalInfo.phone}`}
                    className="text-link"
                >
                  {generalInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-text-muted">
          <p>
            &copy; {currentYear} Omotayo Abdulkareem. All rights reserved.
          </p>
          <a
            href="#home"
            className="text-link mt-4 sm:mt-0 flex items-center space-x-1 group"
          >
            <span>Back to top</span>
            <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-current fill-none group-hover:-translate-y-1 transition-transform duration-200" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
