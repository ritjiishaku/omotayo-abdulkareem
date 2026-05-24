"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GeneralInfo } from "@/lib/mockData";

interface NavbarProps {
  generalInfo: GeneralInfo;
}

export default function Navbar({ generalInfo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-bg-primary/85 border-b border-gold/20 py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo / Brand Name */}
        <Link href="/" className="flex items-center space-x-2 group">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold group-hover:rotate-12 transition-transform duration-300 fill-current">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.05A6.99 6.99 0 0 1 19 22H5a6.99 6.99 0 0 1-1.95-3H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM7 13a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm12 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zM9 17h6v1H9v-1z" />
          </svg>
          <span className="font-serif font-bold text-xl tracking-wider text-white">
            OMOTAYO<span className="text-gold">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-wide text-text-muted hover:text-gold transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-bg-primary bg-gold hover:bg-gold-muted rounded-lg transition-all duration-300"
          >
            Book Automation
          </a>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text-muted hover:text-gold focus:outline-none transition-colors duration-200"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current fill-none" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current fill-none" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-bg-surface border-l border-gold/20 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between p-8 overflow-y-auto">
          <div className="space-y-6 mt-16">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-lg font-medium text-text-muted hover:text-gold transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="space-y-6">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block text-center w-full px-5 py-3 text-sm font-semibold uppercase tracking-wider text-bg-primary bg-gold hover:bg-gold-muted rounded-lg transition-all duration-300"
            >
              Book Automation
            </a>
            <div className="flex justify-center space-x-6 text-text-muted">
              <a
                href={generalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </nav>
  );
}
