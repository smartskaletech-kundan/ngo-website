import { useActor } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import type { SuccessStory } from "../backend.d";
import CampaignCard from "../components/CampaignCard";
import Footer from "../components/Footer";
import ImpactCounter from "../components/ImpactCounter";
import Navbar from "../components/Navbar";
import TestimonialCard from "../components/TestimonialCard";

const initiatives = [
  {
    icon: "🌱",
    title: "Plantation Drives",
    description:
      "Large-scale tree plantation across Bihar's degraded lands and rural communities.",
    color: "bg-forest-green-50",
    iconBg: "bg-forest-green-100",
  },
  {
    icon: "🌾",
    title: "Soil Conservation",
    description:
      "Scientific soil erosion control through afforestation and sustainable land management.",
    color: "bg-amber-50",
    iconBg: "bg-amber-100",
  },
  {
    icon: "♻️",
    title: "Waste Management",
    description:
      "Community-led waste segregation and recycling programs in rural Bihar.",
    color: "bg-teal-50",
    iconBg: "bg-teal-100",
  },
];

const campaigns = [
  {
    icon: "🌱",
    title: "Plant 1000 Trees",
    goal: "₹5,00,000",
    raised: "₹3,20,000",
    percent: 64,
  },
  {
    icon: "💧",
    title: "Save Soil Program",
    goal: "₹3,00,000",
    raised: "₹1,80,000",
    percent: 60,
  },
  {
    icon: "🏘️",
    title: "Clean Village Initiative",
    goal: "₹2,00,000",
    raised: "₹1,40,000",
    percent: 70,
  },
];

const testimonials = [
  {
    quote:
      "Anumaya Sansthan planted trees around our village that have given us shade, fruit, and cleaner air. We feel the change.",
    name: "Ramawati Devi",
    location: "Nalanda, Bihar",
    initials: "RD",
  },
  {
    quote:
      "The waste management program taught our youth to recycle and earn. This is real development.",
    name: "Suresh Kumar",
    location: "Vaishali, Bihar",
    initials: "SK",
  },
  {
    quote:
      "Their soil conservation work saved our farmland from erosion. We lost less crop this year than ever before.",
    name: "Mohan Prasad",
    location: "Muzaffarpur, Bihar",
    initials: "MP",
  },
];

const blogPosts = [
  {
    tag: "Plantation",
    title: "10,000 Trees Milestone Reached in Nalanda District",
    date: "March 12, 2024",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80",
  },
  {
    tag: "Soil Health",
    title:
      "Farmers in Muzaffarpur Report Better Yields After Conservation Work",
    date: "February 28, 2024",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
  },
  {
    tag: "Community",
    title: "Youth Eco-Champions Program Launches in 5 Villages",
    date: "January 15, 2024",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
  },
];

const trustBadges = [
  { icon: "🏛️", text: "Registered NGO: S000071/23-24" },
  { icon: "💰", text: "80G Tax Exempt" },
  { icon: "📅", text: "Operating Since 2023" },
  { icon: "📍", text: "Bihar-Based Organization" },
];

const fallbackStories: SuccessStory[] = [
  {
    id: 1n,
    title: "From Barren to Bountiful",
    beneficiaryName: "Ramawati Devi",
    location: "Nalanda",
    storyText:
      "Our farmland was losing soil every monsoon. With Anumaya's help, we planted trees and built contour bunds. Our yield increased by 30%.",
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    date: "2024-03-10",
  },
  {
    id: 2n,
    title: "Clean Streets, Proud Community",
    beneficiaryName: "Suresh Kumar",
    location: "Vaishali",
    storyText:
      "The waste management program trained our youth as Eco-Champions. We went from the dirtiest to winning the district cleanliness award.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    date: "2024-02-15",
  },
  {
    id: 3n,
    title: "Trees That Became a Forest",
    beneficiaryName: "Mohan Prasad",
    location: "Muzaffarpur",
    storyText:
      "400 trees now stand where barren land once was. Students and parents came together for our plantation drive — the community is transformed.",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
    date: "2024-01-20",
  },
];

function StorySkeletonCard() {
  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden animate-pulse">
      <div className="h-48 bg-forest-green-100" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-forest-green-100 rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded" />
          <div className="h-3 bg-muted rounded" />
          <div className="h-3 bg-muted rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}

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

export default function Home() {
  const workRef = useRef<HTMLElement>(null);
  const { actor, isFetching } = useActor(createActor);
  const [stories, setStories] = useState<SuccessStory[]>(fallbackStories);
  const [storiesLoading, setStoriesLoading] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .listSuccessStories()
      .then((result) => {
        setStories(result.length > 0 ? result.slice(0, 3) : fallbackStories);
      })
      .catch(() => {
        setStories(fallbackStories);
      })
      .finally(() => setStoriesLoading(false));
  }, [actor, isFetching]);

  return (
    <div className="min-h-screen flex flex-col" data-ocid="home.page">
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-ocid="home.hero_section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 hero-overlay" />

        {/* Hindi badge */}
        <div className="absolute bottom-24 left-6 md:left-12 z-10">
          <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
            <p className="font-hindi text-white text-sm md:text-base font-medium">
              माया सामाजिक उत्थान एवं परामर्श संस्थान
            </p>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-light-green font-semibold text-sm md:text-base uppercase tracking-widest mb-4 animate-fade-in-up">
            Anumaya Sansthan — Registered NGO | Bihar
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white text-shadow leading-tight mb-6 animate-fade-in-up-delay-1">
            Building Greener Communities for a Sustainable Tomorrow
          </h1>
          <p className="text-white/85 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delay-2">
            Anumaya Sansthan works at the intersection of ecology, community,
            and sustainable development — creating lasting change across Bihar
            and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-3">
            <Link
              to="/donate"
              data-ocid="home.hero_donate_button"
              className="bg-forest-green-700 hover:bg-forest-green-800 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-200 shadow-card-hover"
            >
              Donate Now →
            </Link>
            <Link
              to="/get-involved"
              data-ocid="home.hero_volunteer_button"
              className="bg-white/15 backdrop-blur-sm hover:bg-white/25 border-2 border-white/60 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105"
            >
              Join as Volunteer →
            </Link>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10">
          <svg
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-16 md:h-20 fill-dark-green"
            aria-hidden="true"
          >
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* Impact Counter */}
      <ImpactCounter />

      {/* Wave transition */}
      <div className="bg-dark-green overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 fill-cream"
          aria-hidden="true"
        >
          <path d="M0,24 C480,48 960,0 1440,24 L1440,48 L0,48 Z" />
        </svg>
      </div>

      {/* Trust Signals Bar */}
      <section
        className="py-6 bg-cream border-b border-forest-green-100"
        data-ocid="home.trust_signals_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {trustBadges.map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 border border-forest-green-300 rounded-full px-4 py-2 bg-white text-forest-green-800 text-sm font-medium shadow-sm"
              >
                <span aria-hidden="true">{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section
        className="py-16 md:py-24 bg-cream"
        ref={workRef}
        data-ocid="home.about_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&q=80"
                alt="NGO plantation workers in action in Bihar"
                className="rounded-card shadow-card w-full h-80 md:h-96 object-cover"
              />
            </div>
            <div className="animate-fade-in-up-delay-1">
              <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                Who We Are
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900 mb-5 leading-snug">
                Restoring Nature, Empowering Communities
              </h2>
              <p className="text-foreground/75 leading-relaxed mb-5">
                Anumaya Sansthan (Reg: S000071/23-24) is a Bihar-based NGO
                founded to restore ecological balance and uplift rural
                communities. We drive large-scale plantation, soil conservation,
                waste management, and community education programs.
              </p>
              <div className="inline-flex items-center gap-2 bg-forest-green-50 border border-forest-green-200 rounded-full px-4 py-2 mb-6">
                <span className="text-green-700 text-xs">✓</span>
                <span className="text-forest-green-800 text-sm font-medium">
                  Registered NGO | S000071/23-24 | Since 2023
                </span>
              </div>
              <br />
              <Link
                to="/about"
                data-ocid="home.about_learn_more_button"
                className="inline-flex items-center gap-2 bg-forest-green-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-forest-green-900 hover:scale-105 transition-all duration-200"
              >
                Learn More About Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Wave */}
      <div className="bg-cream overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 fill-impact-green"
          aria-hidden="true"
        >
          <path d="M0,0 C360,48 1080,0 1440,0 L1440,48 L0,48 Z" />
        </svg>
      </div>

      {/* Key Initiatives */}
      <section
        className="py-16 md:py-24 bg-impact-green"
        data-ocid="home.initiatives_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Our Work
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
              What We Do
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {initiatives.map((item, i) => (
              <div
                key={item.title}
                className={`${item.color} rounded-card shadow-card card-hover p-6 animate-fade-in-up`}
                style={{ animationDelay: `${i * 0.15}s` }}
                data-ocid={`home.initiative_card.${i + 1}`}
              >
                <div
                  className={`${item.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-forest-green-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <Link
                  to="/projects"
                  className="text-forest-green-700 text-sm font-semibold hover:text-forest-green-900 transition-colors"
                  data-ocid={`home.initiative_read_more.${i + 1}`}
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave */}
      <div className="bg-impact-green overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 fill-cream"
          aria-hidden="true"
        >
          <path d="M0,24 C720,48 720,0 1440,24 L1440,48 L0,48 Z" />
        </svg>
      </div>

      {/* Featured Campaign */}
      <section
        className="py-16 md:py-24 bg-cream"
        data-ocid="home.campaigns_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Support Us
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
              Active Campaigns
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {campaigns.map((c, i) => (
              <CampaignCard key={c.title} {...c} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-16 md:py-24 bg-forest-green-50"
        data-ocid="home.testimonials_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Community
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
              Voices from the Field
            </h2>
          </div>
          <div
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} {...t} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section
        className="py-16 md:py-24 bg-cream"
        data-ocid="home.stories_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Impact Stories
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
              Lives We've Changed
            </h2>
            <p className="text-foreground/65 mt-3 text-base max-w-xl mx-auto">
              Real stories from the communities we serve
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {storiesLoading
              ? [1, 2, 3].map((n) => <StorySkeletonCard key={n} />)
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

      {/* CTA Band */}
      <section
        className="relative py-16 md:py-24 bg-forest-green-800 overflow-hidden"
        data-ocid="home.cta_section"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Join Us in Building a Greener Bihar
          </h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            Donate, volunteer, or partner with Anumaya Sansthan to create
            lasting environmental and social impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              data-ocid="home.cta_donate_button"
              className="bg-white text-forest-green-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-forest-green-50 hover:scale-105 transition-all duration-200 shadow-card"
            >
              Donate Now
            </Link>
            <Link
              to="/get-involved"
              data-ocid="home.cta_volunteer_button"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-200"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section
        className="py-16 md:py-24 bg-cream"
        data-ocid="home.blog_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              News & Updates
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
                />
                <div className="p-5">
                  <span className="inline-block bg-forest-green-100 text-forest-green-700 text-xs font-semibold px-2 py-0.5 rounded-full mb-2">
                    {post.tag}
                  </span>
                  <h3 className="font-heading font-semibold text-base text-foreground mb-2 leading-snug">
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

      <Footer />
    </div>
  );
}
