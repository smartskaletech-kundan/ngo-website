import { useActor } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import type { SuccessStory } from "../backend.d";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import OurPrograms from "../components/OurPrograms";
import SEO from "../components/SEO";
import StatsStrip from "../components/StatsStrip";

/* ── Data ─────────────────────────────────────────────────────────────────── */

const trustSignals = [
  {
    id: "registered",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        className="w-5 h-5 text-forest-green-700"
      >
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2L3.09 6.26A2 2 0 002 8.12V12c0 5.52 3.83 10.74 9.11 12.01A4 4 0 0012 24a4 4 0 00.89-.01C18.17 22.74 22 17.52 22 12V8.12a2 2 0 00-1.09-1.86L12 2z" />
      </svg>
    ),
    label: "Registered NGO",
    sub: "Government of Bihar",
  },
  {
    id: "regnum",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        className="w-5 h-5 text-forest-green-700"
      >
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" strokeLinecap="round" />
      </svg>
    ),
    label: "S000071/23-24",
    sub: "Registration No.",
  },
  {
    id: "date",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        className="w-5 h-5 text-forest-green-700"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
      </svg>
    ),
    label: "Est. June 2023",
    sub: "Date of Registration",
  },
  {
    id: "location",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        className="w-5 h-5 text-forest-green-700"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    label: "6 Districts",
    sub: "Patna, Ara, Vaishali & more",
  },
  {
    id: "trees",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        className="w-5 h-5 text-forest-green-700"
      >
        <path d="M12 22V12" strokeLinecap="round" />
        <path d="M12 12C12 12 7 9 7 5a5 5 0 0110 0c0 4-5 7-5 7z" />
      </svg>
    ),
    label: "800+ Trees",
    sub: "Planted across Bihar",
  },
];

const differentiators = [
  {
    icon: "🌱",
    title: "Community-Led from Day One",
    description:
      "Our programs are shaped by village leaders and panchayat input, not top-down decisions. Every initiative starts with listening.",
  },
  {
    icon: "📍",
    title: "Bihar's Rural Reality",
    description:
      "We work in Patna, Ara, Vaishali, Nalanda, Jahanabad, and Arwal — Bihar's rural heartland, not urban centers.",
  },
  {
    icon: "📊",
    title: "Transparent & Accountable",
    description:
      "Every tree planted, every rupee spent is documented. We are a registered NGO (S000071/23-24) with full financial disclosure.",
  },
  {
    icon: "🤝",
    title: "Growing Together",
    description:
      "We are 1–2 years old and growing. We believe slow, deep roots matter more than fast, hollow growth.",
  },
];

const blogPosts = [
  {
    tag: "Plantation",
    title: "800+ Trees Planted Across 6 Bihar Districts in Our First Year",
    date: "March 12, 2024",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80",
  },
  {
    tag: "Soil Health",
    title:
      "Farmers in Ara (Bhojpur) Report Better Yields After Conservation Work",
    date: "February 28, 2024",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
  },
  {
    tag: "Community",
    title: "Youth Eco-Champions Program Launches in 5 Panchayats",
    date: "January 15, 2024",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
  },
];

const fallbackStories: SuccessStory[] = [
  {
    id: 1n,
    title: "From Barren to Bountiful",
    beneficiaryName: "Ramawati Devi",
    location: "Nalanda",
    program: "soil-erosion-control",
    storyText:
      "Our farmland was losing soil every monsoon. With the team's help, we planted trees and built contour bunds. Our yield is already improving.",
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    date: "2024-03-10",
  },
  {
    id: 2n,
    title: "Trees That Became a Forest",
    beneficiaryName: "Mohan Prasad",
    location: "Ara (Bhojpur)",
    program: "plantation-drives",
    storyText:
      "200 trees now stand where barren land once was. Students and parents came together for our plantation drive — the community is energised.",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
    date: "2024-01-20",
  },
  {
    id: 3n,
    title: "Our Panchayat Took Ownership",
    beneficiaryName: "Suresh Kumar",
    location: "Jahanabad",
    program: "community-development",
    storyText:
      "After attending a community development workshop, our panchayat formed its own eco-committee. We now plan our own plantation schedules.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    date: "2024-02-15",
  },
];

/* ── Sub-components ───────────────────────────────────────────────────────── */

function StoryCard({ story, index }: { story: SuccessStory; index: number }) {
  return (
    <div
      className="bg-card rounded-2xl shadow-card card-hover overflow-hidden flex flex-col"
      data-ocid={`home.story_card.${index}`}
    >
      <img
        src={story.imageUrl}
        alt={story.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-lg font-semibold text-forest-green-900 mb-2 line-clamp-1">
          {story.title}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 bg-forest-green-50 border border-forest-green-200 rounded-full px-2.5 py-0.5 text-xs text-forest-green-800 font-medium">
            👤 {story.beneficiaryName}
          </span>
          <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5 text-xs text-amber-800 font-medium">
            📍 {story.location}
          </span>
        </div>
        <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
          {story.storyText}
        </p>
        <Link
          to="/impact"
          className="text-forest-green-700 text-sm font-semibold hover:text-forest-green-900 transition-colors inline-flex items-center gap-1"
        >
          Read Full Story →
        </Link>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function Home() {
  const { actor, isFetching } = useActor(createActor);
  const [stories, setStories] = useState<SuccessStory[]>(fallbackStories);
  const [storiesLoading, setStoriesLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .listSuccessStories()
      .then((result) => {
        setStories(result.length > 0 ? result.slice(0, 3) : fallbackStories);
      })
      .catch(() => setStories(fallbackStories))
      .finally(() => setStoriesLoading(false));
  }, [actor, isFetching]);

  return (
    <div className="min-h-screen flex flex-col" data-ocid="home.page">
      <SEO
        title="Home"
        description="Maya Samajik Utthan Evam Paramarsh Sansthan — a young Bihar-based NGO working at the intersection of ecology and community development through plantation drives, soil erosion control, and community development."
      />
      <Navbar />

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-ocid="home.hero_section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-forest-green-900/60 to-black/80" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="font-hindi text-white/90 text-base md:text-lg mb-3 animate-fade-in-up">
            माया सामाजिक उत्थान एवं परामर्श संस्थान
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white text-shadow leading-tight mb-6 animate-fade-in-up-delay-1">
            Building Greener Communities
            <br />
            <span className="text-light-green">for a Sustainable Tomorrow</span>
          </h1>
          <p className="text-white/85 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delay-2">
            Maya Samajik Utthan Evam Paramarsh Sansthan is a young, Bihar-based
            NGO working at the intersection of ecology and community
            development. Registered in June 2023, we are in our early phase —
            planting seeds of change across Patna, Ara, Vaishali, Nalanda,
            Jahanabad, and Arwal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-3">
            <Link
              to="/donate"
              data-ocid="home.hero_donate_button"
              className="bg-forest-green-600 hover:bg-forest-green-700 text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-200 shadow-card-hover"
            >
              Donate Now →
            </Link>
            <Link
              to="/volunteer"
              data-ocid="home.hero_volunteer_button"
              className="bg-white/15 backdrop-blur-sm hover:bg-white/25 border-2 border-white/70 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-200 hover:scale-105"
            >
              Volunteer With Us →
            </Link>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10">
          <svg
            viewBox="0 0 1440 72"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-16 fill-cream"
            aria-hidden="true"
          >
            <path d="M0,40 C360,72 1080,8 1440,40 L1440,72 L0,72 Z" />
          </svg>
        </div>
      </section>

      {/* ── SECTION 2: TRUST BAR ────────────────────────────────────────── */}
      <section
        className="bg-cream py-8 border-b border-forest-green-100"
        data-ocid="home.trust_bar_section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {trustSignals.map((signal) => (
              <div
                key={signal.id}
                className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl bg-white border border-forest-green-100 shadow-xs text-center group hover:border-forest-green-300 transition-colors duration-200"
              >
                <div className="w-9 h-9 rounded-full bg-forest-green-50 flex items-center justify-center group-hover:bg-forest-green-100 transition-colors duration-200">
                  {signal.svg}
                </div>
                <span className="text-forest-green-900 font-semibold text-sm leading-tight">
                  {signal.label}
                </span>
                <span className="text-forest-green-600 text-xs leading-tight">
                  {signal.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: STATS STRIP ──────────────────────────────────────── */}
      <StatsStrip />

      {/* ── HOW IT WORKS (existing, kept in position) ───────────────────── */}
      <HowItWorks />

      {/* ── SECTION 4: WHAT WE DO (OurPrograms) ────────────────────────── */}
      <OurPrograms />

      {/* ── SECTION 5: WHAT MAKES US DIFFERENT ─────────────────────────── */}
      <section
        className="py-16 md:py-24 bg-cream"
        data-ocid="home.differentiators_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Our Promise
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
              What Makes Us Different
            </h2>
            <p className="text-foreground/60 mt-3 text-base max-w-xl mx-auto">
              Four pillars that define how we work and why communities trust us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {differentiators.map((item, i) => (
              <div
                key={item.title}
                className="flex gap-5 p-6 bg-white rounded-2xl border border-forest-green-100 shadow-card hover:border-forest-green-300 hover:shadow-card-hover transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
                data-ocid={`home.differentiator.${i + 1}`}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-forest-green-50 border border-forest-green-200 flex items-center justify-center text-3xl group-hover:bg-forest-green-100 transition-colors duration-200">
                  <span aria-hidden="true">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-forest-green-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-foreground/65 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FEATURED SPOTLIGHT ───────────────────────────────── */}
      <section
        className="py-16 md:py-24 bg-forest-green-50"
        data-ocid="home.featured_spotlight_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Featured Initiative
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
              Our Flagship Program
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center bg-white rounded-3xl overflow-hidden shadow-card-hover">
            {/* Image LEFT */}
            <div className="relative h-72 md:h-full min-h-[380px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"
                alt="Tree plantation drive in Bihar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-green-900/40 to-transparent" />
              <span className="absolute bottom-4 left-4 bg-forest-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Plantation Drives
              </span>
            </div>

            {/* Content RIGHT */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h3 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900 mb-3 leading-tight">
                Plantation Drives Across Bihar Districts
              </h3>
              <p className="text-forest-green-700 font-semibold text-base mb-5">
                In our first year, we planted 800+ trees across 6 districts
              </p>
              <p className="text-foreground/70 leading-relaxed mb-6 text-sm">
                Our native species selection — neem, peepal, mahua, arjun —
                ensures ecological resilience and community benefit. We work
                with village communities, farmers, and school children to plant
                indigenous species and restore green cover for future
                generations.
              </p>

              {/* Impact chips */}
              <div className="flex flex-wrap gap-2 mb-7">
                {["800+ Trees", "6 Districts", "30+ Volunteers"].map((chip) => (
                  <span
                    key={chip}
                    className="bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-forest-green-200"
                  >
                    ✓ {chip}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/program/$programId"
                  params={{ programId: "plantation-drives" }}
                  data-ocid="home.featured_learn_more_button"
                  className="inline-flex items-center justify-center bg-forest-green-700 hover:bg-forest-green-800 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
                >
                  Learn More →
                </Link>
                <Link
                  to="/donate"
                  data-ocid="home.featured_donate_button"
                  className="inline-flex items-center justify-center border-2 border-forest-green-700 text-forest-green-800 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-forest-green-700 hover:text-white"
                >
                  Support This Drive
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: TESTIMONIALS ─────────────────────────────────────── */}
      <section
        className="py-16 md:py-24 bg-white"
        data-ocid="home.testimonials_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Community Voices
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
              What Our Community Says
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="max-w-2xl w-full bg-forest-green-50 rounded-2xl border border-forest-green-200 p-10 text-center shadow-card">
              <span
                className="text-5xl text-forest-green-300 font-serif leading-none block mb-4"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="text-foreground/70 text-lg italic leading-relaxed">
                Testimonials coming soon as our work grows.
              </p>
              <p className="mt-6 text-xs text-muted-foreground uppercase tracking-widest">
                — We are just getting started
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: BLOG PREVIEW ─────────────────────────────────────── */}
      <section
        className="py-16 md:py-24 bg-cream"
        data-ocid="home.blog_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              News &amp; Updates
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
              Latest from the Field
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <div
                key={post.title}
                className="bg-card rounded-card shadow-card card-hover overflow-hidden"
                data-ocid={`home.blog_card.${i + 1}`}
              >
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <span className="inline-block bg-forest-green-100 text-forest-green-700 text-xs font-semibold px-2 py-0.5 rounded-full mb-2">
                    {post.tag}
                  </span>
                  <h3 className="font-heading font-semibold text-base text-foreground mb-2 leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-xs mb-3">
                    {post.date}
                  </p>
                  <Link
                    to="/blog"
                    className="text-forest-green-700 text-sm font-semibold hover:text-forest-green-900 transition-colors"
                    data-ocid={`home.blog_read_more.${i + 1}`}
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Success Stories ─────────────────────────────────────────────── */}
      <section
        className="py-16 md:py-24 bg-forest-green-50"
        data-ocid="home.stories_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Impact Stories
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
              Lives We've Touched
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {storiesLoading
              ? [1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="bg-card rounded-2xl shadow-card overflow-hidden animate-pulse"
                  >
                    <div className="h-48 bg-forest-green-100" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-forest-green-100 rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded" />
                        <div className="h-3 bg-muted rounded w-4/5" />
                      </div>
                    </div>
                  </div>
                ))
              : stories.map((story, i) => (
                  <StoryCard
                    key={String(story.id)}
                    story={story}
                    index={i + 1}
                  />
                ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/impact"
              data-ocid="home.stories_view_all_button"
              className="inline-flex items-center gap-2 border-2 border-forest-green-700 text-forest-green-800 px-7 py-3 rounded-full font-semibold hover:bg-forest-green-700 hover:text-white transition-all duration-200"
            >
              View All Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: CTA BAND ─────────────────────────────────────────── */}
      <section
        className="relative py-16 md:py-20 bg-forest-green-800 overflow-hidden"
        data-ocid="home.cta_section"
      >
        {/* Decorative leaf pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 C20 15 10 25 15 40 C20 55 35 55 40 40 C45 25 35 15 30 5Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Join the Green Mission
          </h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            Your support plants trees, restores soil, and builds stronger
            communities in rural Bihar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              data-ocid="home.cta_donate_button"
              className="bg-white text-forest-green-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-forest-green-50 hover:scale-105 transition-all duration-200 shadow-card"
            >
              Donate Now
            </Link>
            <Link
              to="/volunteer"
              data-ocid="home.cta_volunteer_button"
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-200"
            >
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
