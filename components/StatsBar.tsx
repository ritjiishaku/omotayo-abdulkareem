"use client";

import React, { useRef, useState, useEffect } from "react";
import { GeneralInfo } from "@/lib/mockData";

interface StatsBarProps {
  stats: GeneralInfo["stats"];
}

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState("0");
  const num = parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el || !num) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);
        let start = 0;
        const duration = 1200;
        const step = Math.ceil(num / 30);
        const timer = setInterval(() => {
          start += step;
          if (start >= num) {
            setDisplayed(value);
            clearInterval(timer);
          } else {
            setDisplayed(`${start}${suffix}`);
          }
        }, duration / 30);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num, suffix, value]);

  return (
    <div ref={ref} className="text-center space-y-1">
      <span className="block font-serif text-3xl md:text-4xl font-bold text-gold">
        {displayed}
      </span>
      <span className="block text-xs md:text-sm text-text-muted tracking-wide">
        {label}
      </span>
    </div>
  );
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="py-12 md:py-16 bg-bg-surface border-y border-gold/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <AnimatedStat key={idx} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
