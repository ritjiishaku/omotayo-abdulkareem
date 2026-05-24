"use client";

import React, { useState } from "react";
import { GeneralInfo } from "@/lib/mockData";

interface ContactProps {
  generalInfo: GeneralInfo;
}

export default function Contact({ generalInfo }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const waNum = generalInfo.whatsapp.replace(/\D/g, "");

  return (
    <section id="contact" className="py-16 md:py-20 lg:py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="section-label">07 / Let&apos;s Build</p>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-white">
                Ready to automate your workflow?
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Send a message and I&apos;ll get back to you within 24 hours
                with a roadmap for your project.
              </p>
            </div>

            <a
              href={`https://wa.me/${waNum}?text=Hi%20Omotayo%2C%20I%27d%20like%20to%20discuss%20an%20automation%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 text-sm font-bold uppercase tracking-wider text-bg-primary bg-[#25D366] hover:bg-[#128C7E] rounded-lg transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`mailto:${generalInfo.email}`}
              className="flex items-center justify-center gap-3 w-full px-6 py-4 text-sm font-bold uppercase tracking-wider text-gold border border-gold/30 hover:bg-gold/10 rounded-lg transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current fill-none" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4l-10 8L2 4" />
              </svg>
              <span>{generalInfo.email}</span>
            </a>

            <p className="text-xs text-text-muted text-center">
              Response in &lt; 24 hours
            </p>
          </div>

          <div className="lg:col-span-3 card p-6 md:p-8">
            {status === "success" ? (
              <div className="text-center py-12 space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 border border-gold/30">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 stroke-gold fill-none" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Message sent!
                </h3>
                <p className="text-sm text-text-muted">
                  Thanks for reaching out. I&apos;ll review your project and
                  reply within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-secondary text-xs"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-wider text-text-muted"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:border-gold focus:outline-none text-white text-sm transition-colors duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-wider text-text-muted"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:border-gold focus:outline-none text-white text-sm transition-colors duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-wider text-text-muted"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your business bottleneck or automation goal..."
                    className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:border-gold focus:outline-none text-white text-sm transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-bg-primary bg-gold hover:bg-gold-muted disabled:bg-gold/40 disabled:cursor-not-allowed rounded-lg transition-all duration-300"
                >
                  {status === "submitting"
                    ? "Sending..."
                    : "Send Message"}
                </button>

                {status === "error" && (
                  <p className="text-xs text-red-400 text-center">
                    Something went wrong. Please try again or reach out via
                    WhatsApp.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
