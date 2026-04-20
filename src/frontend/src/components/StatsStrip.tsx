import { useActor } from "@caffeineai/core-infrastructure";
import { useEffect, useRef, useState } from "react";
import { createActor } from "../backend";

interface StatItem {
  icon: string;
  target: number;
  suffix: string;
  label: string;
}

const DEFAULT_STATS: StatItem[] = [
  { icon: "🌳", target: 800, suffix: "+", label: "Trees Planted" },
  { icon: "🏘️", target: 6, suffix: "", label: "Districts Covered" },
  { icon: "🙋", target: 30, suffix: "+", label: "Active Volunteers" },
  { icon: "🌾", target: 40, suffix: "+", label: "Acres Conserved" },
  { icon: "🏛️", target: 8, suffix: "", label: "Panchayats Reached" },
];

function parseStatToNumber(val: string): { target: number; suffix: string } {
  const trimmed = val.trim();
  const hasSuffix = trimmed.endsWith("+");
  const suffix = hasSuffix ? "+" : "";
  const num = Number.parseInt(trimmed.replace(/\D/g, ""), 10);
  return { target: Number.isNaN(num) ? 0 : num, suffix };
}

function AnimatedCounter({
  target,
  suffix,
}: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target]);

  return (
    <span
      ref={ref}
      className="font-heading text-4xl md:text-5xl font-bold text-white tabular-nums"
    >
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

function StatCard({ item, index }: { item: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center px-4 py-6 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-3xl mb-4 border border-white/20">
        <span aria-hidden="true">{item.icon}</span>
      </div>
      <AnimatedCounter target={item.target} suffix={item.suffix} />
      <span className="mt-2 text-xs md:text-sm text-green-200 uppercase tracking-widest font-medium">
        {item.label}
      </span>
    </div>
  );
}

export default function StatsStrip() {
  const { actor, isFetching } = useActor(createActor);
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getAdminSettings()
      .then((settings) => {
        const ns = settings.ngoStats;
        const parsed: StatItem[] = [
          {
            icon: "🌳",
            ...parseStatToNumber(ns.treesPlanted || "800+"),
            label: "Trees Planted",
          },
          {
            icon: "🏘️",
            ...parseStatToNumber(ns.villagesCovered || "6"),
            label: "Districts Covered",
          },
          {
            icon: "🙋",
            ...parseStatToNumber(ns.volunteers || "30+"),
            label: "Active Volunteers",
          },
          {
            icon: "🌾",
            ...parseStatToNumber(ns.acresConserved || "40+"),
            label: "Acres Conserved",
          },
          {
            icon: "🏛️",
            ...parseStatToNumber(ns.panchayatsCovered || "8"),
            label: "Panchayats Reached",
          },
        ];
        setStats(parsed);
      })
      .catch(() => {
        // keep defaults
      });
  }, [actor, isFetching]);

  return (
    <div data-ocid="stats_strip.section">
      {/* Top wave */}
      <div className="bg-cream overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 fill-forest-green-800"
          aria-hidden="true"
        >
          <path d="M0,0 C360,48 1080,0 1440,0 L1440,48 L0,48 Z" />
        </svg>
      </div>

      <section className="bg-gradient-to-br from-forest-green-700 to-forest-green-900 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-white/15 border border-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
              Our Impact
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mt-3">
              Numbers That Speak
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {stats.map((item, i) => (
              <StatCard key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom wave */}
      <div className="bg-forest-green-900 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 fill-dark-green"
          aria-hidden="true"
        >
          <path d="M0,24 C480,0 960,48 1440,24 L1440,48 L0,48 Z" />
        </svg>
      </div>
    </div>
  );
}
