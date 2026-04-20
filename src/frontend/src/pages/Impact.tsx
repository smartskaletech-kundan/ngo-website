import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Download,
  FileText,
  Heart,
  Home,
  Leaf,
  Recycle,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import type { SuccessStory } from "../backend.d";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

// ── Backend hook ─────────────────────────────────────────────────────────────

function useSuccessStories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SuccessStory[]>({
    queryKey: ["successStories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSuccessStories();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Large Counter item with real count-up ────────────────────────────────────

interface LargeCounterProps {
  icon: string;
  target: number;
  suffix: string;
  label: string;
  delay?: number;
}

function LargeCounter({
  icon,
  target,
  suffix,
  label,
  delay = 0,
}: LargeCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      const duration = 1800;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current = Math.min(current + increment, target);
        setCount(Math.floor(current));
        if (current >= target) clearInterval(interval);
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [visible, target, delay]);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center px-6 py-4 transition-all duration-700 ${
        visible ? "animate-fade-in-up opacity-100" : "opacity-0"
      }`}
      data-ocid={`impact.counter.${label.toLowerCase().replace(/\s+/g, "_")}`}
    >
      <span className="text-5xl mb-3" role="img" aria-label={label}>
        {icon}
      </span>
      <span className="font-heading text-5xl md:text-6xl font-bold text-white mb-2 tabular-nums">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="text-light-green text-base md:text-lg font-medium font-body">
        {label}
      </span>
    </div>
  );
}

// ── Wave Divider ─────────────────────────────────────────────────────────────

function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 64"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-12 md:h-16 fill-forest-green-50"
        aria-hidden="true"
      >
        <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1360,40 1440,32 L1440,64 L0,64 Z" />
      </svg>
    </div>
  );
}

// ── SDG card data ─────────────────────────────────────────────────────────────

const sdgCards = [
  {
    number: "SDG 13",
    title: "Climate Action",
    description:
      "We drive climate resilience through tree plantation and soil conservation across Bihar's vulnerable regions.",
    badgeColor: "bg-orange-500",
    icon: Sun,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    number: "SDG 15",
    title: "Life on Land",
    description:
      "Protecting and restoring land ecosystems — from degraded farmlands to roadside corridors.",
    badgeColor: "bg-forest-green-800",
    icon: Leaf,
    iconColor: "text-forest-green-800",
    bgColor: "bg-forest-green-50",
  },
  {
    number: "SDG 11",
    title: "Sustainable Cities & Communities",
    description:
      "Building cleaner, greener rural communities through eco-education and community-led programs across our 6 covered districts.",
    badgeColor: "bg-amber-500",
    icon: Home,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    number: "SDG 3",
    title: "Good Health & Wellbeing",
    description:
      "Trees reduce air pollution and improve air quality; green-cover programs in schools and communities contribute to better wellbeing in rural Bihar.",
    badgeColor: "bg-teal-600",
    icon: Heart,
    iconColor: "text-teal-600",
    bgColor: "bg-teal-50",
  },
];

// ── Timeline data ─────────────────────────────────────────────────────────────

const timelineItems = [
  {
    year: "2023",
    title: "Founded",
    description:
      "Registered as S000071/23-24 on 12th June 2023 in Patna, Bihar. First plantation drive launched with community volunteers across Patna and Ara.",
    icon: "🌱",
  },
  {
    year: "2024",
    title: "Growing Roots",
    description:
      "800+ trees planted across 6 districts. 20+ farmers trained in soil conservation. 8 panchayats engaged through community development programs.",
    icon: "🌳",
  },
  {
    year: "2025",
    title: "Building Momentum",
    description:
      "40+ acres brought under soil conservation. 30+ active volunteers across Patna, Vaishali, Nalanda, Jahanabad, Arwal, and Ara (Bhojpur).",
    icon: "🚀",
  },
];

// ── Story card ────────────────────────────────────────────────────────────────

function StoryCard({ story, index }: { story: SuccessStory; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <article
        className={`bg-card rounded-2xl shadow-card border border-border overflow-hidden card-hover animate-fade-in-up-delay-${Math.min(index + 1, 4)} flex flex-col`}
        data-ocid={`impact.story.item.${index + 1}`}
      >
        {story.imageUrl ? (
          <img
            src={story.imageUrl}
            alt={story.title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-48 bg-forest-green-50 flex items-center justify-center">
            <Leaf
              className="w-12 h-12 text-forest-green-800 opacity-30"
              aria-hidden="true"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-heading text-lg font-bold text-foreground mb-2 leading-snug">
            {story.title}
          </h3>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-forest-green-50 text-forest-green-800 rounded-full px-3 py-1">
              👤 {story.beneficiaryName}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-cream text-muted-foreground rounded-full px-3 py-1">
              📍 {story.location}
            </span>
          </div>
          <p className="text-muted-foreground font-body text-sm line-clamp-3 flex-1">
            {story.storyText}
          </p>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            data-ocid={`impact.story.open_modal_button.${index + 1}`}
            className="mt-4 inline-flex items-center gap-1 text-forest-green-800 font-body text-sm font-semibold hover:underline transition-smooth"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            Read Full Story
          </button>
        </div>
      </article>

      {/* Modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
          }}
          data-ocid={`impact.story.dialog.${index + 1}`}
        >
          <div className="bg-card rounded-2xl shadow-card-hover max-w-lg w-full p-6 relative animate-fade-in-up max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setExpanded(false)}
              data-ocid={`impact.story.close_button.${index + 1}`}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-smooth"
              aria-label="Close story"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
            {story.imageUrl && (
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            )}
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
              {story.title}
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-forest-green-50 text-forest-green-800 rounded-full px-3 py-1">
                👤 {story.beneficiaryName}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-cream text-muted-foreground rounded-full px-3 py-1">
                📍 {story.location}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-muted text-muted-foreground rounded-full px-3 py-1">
                📅 {story.date}
              </span>
            </div>
            <p className="text-foreground font-body text-sm leading-relaxed">
              {story.storyText}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// ── Story Skeleton ────────────────────────────────────────────────────────────

function StorySkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-muted" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-5/6" />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Impact() {
  const { data: stories, isLoading, isError } = useSuccessStories();

  return (
    <Layout
      pageTitle="Our Impact"
      pageDescription="Measuring the change we create — every tree, every family, every acre"
    >
      <SEO
        title="Our Impact"
        description="See the measurable impact of MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN — 800+ trees planted, 40+ acres of soil conserved, 30+ volunteers, across 6 Bihar districts."
      />
      {/* ── Section 1: Large Impact Counters ─────────────────────────────── */}
      <section
        className="bg-dark-green py-16 md:py-24"
        data-ocid="impact.counters.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white text-center mb-12 opacity-90">
            Numbers That Tell Our Story
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            <LargeCounter
              icon="🌳"
              target={800}
              suffix="+"
              label="Trees Planted"
              delay={0}
            />
            <LargeCounter
              icon="📍"
              target={6}
              suffix=""
              label="Districts Covered"
              delay={100}
            />
            <LargeCounter
              icon="👥"
              target={30}
              suffix="+"
              label="Active Volunteers"
              delay={200}
            />
            <LargeCounter
              icon="🌾"
              target={40}
              suffix="+"
              label="Acres Soil Conserved"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* ── Wave divider ─────────────────────────────────────────────────── */}
      <div className="bg-dark-green">
        <WaveDivider />
      </div>

      {/* ── Section 2: SDG Alignment ─────────────────────────────────────── */}
      <section
        className="bg-forest-green-50 py-16 md:py-20"
        data-ocid="impact.sdg.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-forest-green-800/10 text-forest-green-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 font-body">
              United Nations Framework
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Aligned with UN Sustainable Development Goals
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-2xl mx-auto">
              Our work directly contributes to four key SDGs — creating
              measurable change for people and planet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sdgCards.map((sdg, i) => {
              const Icon = sdg.icon;
              return (
                <div
                  key={sdg.number}
                  className={`bg-card rounded-2xl shadow-card border border-border p-6 card-hover animate-fade-in-up-delay-${Math.min(i + 1, 4)} flex flex-col`}
                  data-ocid={`impact.sdg.card.${i + 1}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`inline-block ${sdg.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full font-body`}
                    >
                      {sdg.number}
                    </span>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl ${sdg.bgColor} flex items-center justify-center mb-4`}
                  >
                    <Icon
                      className={`w-6 h-6 ${sdg.iconColor}`}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    {sdg.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed flex-1">
                    {sdg.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 3: Impact Timeline ────────────────────────────────────── */}
      <section
        className="bg-background py-16 md:py-20"
        data-ocid="impact.timeline.section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-4 font-body">
              Our Journey
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Milestones of Change
            </h2>
          </div>

          <div className="relative">
            {/* vertical line on mobile */}
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5 bg-forest-green-200 md:hidden"
              aria-hidden="true"
            />
            {/* horizontal line on desktop */}
            <div
              className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-forest-green-200"
              aria-hidden="true"
            />

            {/* desktop horizontal layout */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {timelineItems.map((item, i) => (
                <div
                  key={item.year}
                  className={`flex flex-col items-center text-center animate-fade-in-up-delay-${i + 1}`}
                  data-ocid={`impact.timeline.item.${i + 1}`}
                >
                  <div className="w-14 h-14 rounded-full bg-forest-green-800 border-4 border-forest-green-50 flex items-center justify-center text-2xl shadow-card mb-4 z-10">
                    {item.icon}
                  </div>
                  <span className="font-heading text-2xl font-bold text-forest-green-800 mb-1">
                    {item.year}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* mobile vertical layout */}
            <div className="md:hidden space-y-8">
              {timelineItems.map((item, i) => (
                <div
                  key={item.year}
                  className={`flex gap-5 animate-fade-in-up-delay-${i + 1}`}
                  data-ocid={`impact.timeline.mobile.item.${i + 1}`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-forest-green-800 border-4 border-cream flex items-center justify-center text-xl shadow-card z-10 shrink-0">
                      {item.icon}
                    </div>
                  </div>
                  <div className="pt-2 min-w-0">
                    <span className="font-heading text-xl font-bold text-forest-green-800 block mb-0.5">
                      {item.year}
                    </span>
                    <h3 className="font-heading text-base font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Wave divider ─────────────────────────────────────────────────── */}
      <div className="bg-background">
        <div className="overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 64"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-12 md:h-16 fill-forest-green-50"
            aria-hidden="true"
          >
            <path d="M0,48 C360,16 720,64 1080,32 C1260,16 1360,24 1440,48 L1440,64 L0,64 Z" />
          </svg>
        </div>
      </div>

      {/* ── Section 4: Success Stories ────────────────────────────────────── */}
      <section
        className="bg-forest-green-50 py-16 md:py-20"
        data-ocid="impact.stories.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-forest-green-800/10 text-forest-green-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 font-body">
              From the Ground
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Stories of Impact
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-xl mx-auto">
              Real people, real change — hear from those whose lives have been
              transformed.
            </p>
          </div>

          {isLoading && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="impact.stories.loading_state"
            >
              {[1, 2, 3].map((n) => (
                <StorySkeleton key={n} />
              ))}
            </div>
          )}

          {isError && (
            <div
              className="text-center py-12"
              data-ocid="impact.stories.error_state"
            >
              <Recycle
                className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3"
                aria-hidden="true"
              />
              <p className="text-muted-foreground font-body">
                Could not load stories. Please try again later.
              </p>
            </div>
          )}

          {!isLoading && !isError && stories && stories.length === 0 && (
            <div
              className="text-center py-16 bg-card rounded-2xl border border-border"
              data-ocid="impact.stories.empty_state"
            >
              <Leaf
                className="w-14 h-14 text-forest-green-800/20 mx-auto mb-4"
                aria-hidden="true"
              />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                Stories Coming Soon
              </h3>
              <p className="text-muted-foreground font-body text-sm max-w-xs mx-auto">
                We're collecting inspiring stories from our field programs.
                Check back soon!
              </p>
            </div>
          )}

          {!isLoading && stories && stories.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story, i) => (
                <StoryCard key={String(story.id)} story={story} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Section 5: Annual Reports ─────────────────────────────────────── */}
      <section
        className="bg-background py-16 md:py-20"
        data-ocid="impact.reports.section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-4 font-body">
              Accountability
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Annual Reports &amp; Documents
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Annual Report 2023-24 */}
            <div
              className="bg-card rounded-2xl shadow-card border border-border p-6 card-hover animate-fade-in-up-delay-1"
              data-ocid="impact.reports.annual_2024.card"
            >
              <div className="w-12 h-12 rounded-xl bg-forest-green-50 flex items-center justify-center mb-4">
                <FileText
                  className="w-6 h-6 text-forest-green-800"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                Annual Report 2023–24
              </h3>
              <p className="text-muted-foreground font-body text-sm mb-5 leading-relaxed">
                Comprehensive overview of our plantation drives, soil
                conservation efforts, community programs, and financial
                utilisation for FY 2023–24.
              </p>
              <button
                type="button"
                data-ocid="impact.reports.download_button.1"
                className="inline-flex items-center gap-2 border-2 border-earth-brown text-earth-brown px-5 py-2.5 rounded-xl font-semibold font-body text-sm hover:bg-earth-brown hover:text-white transition-smooth cursor-not-allowed opacity-80"
                aria-label="Download Annual Report 2023-24 PDF (coming soon)"
                title="PDF available soon"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download PDF
              </button>
            </div>

            {/* Impact Assessment 2024 */}
            <div
              className="bg-card rounded-2xl shadow-card border border-border p-6 card-hover animate-fade-in-up-delay-2"
              data-ocid="impact.reports.assessment_2024.card"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                <FileText
                  className="w-6 h-6 text-amber-600"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                Impact Assessment 2024
              </h3>
              <p className="text-muted-foreground font-body text-sm mb-5 leading-relaxed">
                Independent third-party evaluation of our environmental and
                social impact, beneficiary outreach, and program effectiveness
                for 2024.
              </p>
              <span
                data-ocid="impact.reports.coming_soon.badge"
                className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2 rounded-xl font-semibold font-body text-sm"
              >
                🕐 Coming Soon
              </span>
            </div>
          </div>

          {/* Transparency link */}
          <div className="text-center">
            <p className="text-muted-foreground font-body text-sm mb-3">
              For detailed financial information, registration certificates, and
              fund utilisation charts —
            </p>
            <Link
              to="/transparency"
              data-ocid="impact.reports.transparency_link"
              className="inline-flex items-center gap-2 bg-forest-green-800 text-white px-6 py-3 rounded-xl font-semibold font-body text-sm hover:bg-dark-green transition-smooth hover:scale-105"
            >
              <Leaf className="w-4 h-4" aria-hidden="true" />
              Visit Our Transparency Page
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
