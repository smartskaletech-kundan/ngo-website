import { Download, ExternalLink, Instagram, Mail } from "lucide-react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

// ─── Data ────────────────────────────────────────────────────────────────────

const NEWS_ITEMS = [
  {
    id: 1,
    publication: "Bihar Times",
    initials: "BT",
    bgColor: "bg-forest-green-700",
    headline:
      "MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN Plants 5,000 Trees in Nalanda District",
    date: "December 2024",
    excerpt:
      "The Patna-based NGO completed its largest plantation drive yet, covering 12 villages and involving over 400 community volunteers in a single weekend.",
    href: "#",
  },
  {
    id: 2,
    publication: "Patna Daily",
    initials: "PD",
    bgColor: "bg-earth-brown-600",
    headline: "Eco-Champions Program Transforms Rural Waste Management",
    date: "November 2024",
    excerpt:
      "Youth volunteers in Vaishali trained as Eco-Champions are now leading door-to-door waste segregation and community composting initiatives.",
    href: "#",
  },
  {
    id: 3,
    publication: "Bihar Gazette",
    initials: "BG",
    bgColor: "bg-forest-green-500",
    headline:
      "MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN Receives NGO Excellence Recognition",
    date: "October 2024",
    excerpt:
      "The environmental NGO was honored for its outstanding contributions to soil conservation and rural livelihoods at the Bihar Social Development Summit.",
    href: "#",
  },
  {
    id: 4,
    publication: "EcoNews India",
    initials: "EN",
    bgColor: "bg-light-green-700",
    headline: "Soil Conservation Success Story from Bihar",
    date: "September 2024",
    excerpt:
      "MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN's work in Muzaffarpur has conserved over 167 acres of eroding farmland, helping farmers recover productivity and protect their livelihoods.",
    href: "#",
  },
  {
    id: 5,
    publication: "The Hindu — Bihar Edition",
    initials: "TH",
    bgColor: "bg-earth-brown-500",
    headline: "NGOs Lead Bihar's Monsoon Plantation Push in 2024",
    date: "August 2024",
    excerpt:
      "A coalition of Bihar NGOs, led by MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN, planted over 2,000 native-species saplings across flood-prone areas ahead of the monsoon season.",
    href: "#",
  },
  {
    id: 6,
    publication: "Hindustan — Patna",
    initials: "HP",
    bgColor: "bg-forest-green-800",
    headline: "रजिस्टर्ड NGO अनुमाया संस्थान का पर्यावरण अभियान",
    date: "July 2024",
    excerpt:
      "पटना स्थित अनुमाया संस्थान ने बिहार के ग्रामीण इलाकों में पेड़-पौधे लगाने और मिट्टी संरक्षण के लिए एक व्यापक अभियान शुरू किया है।",
    href: "#",
  },
];

const PRESS_RELEASES = [
  {
    id: 1,
    date: "June 2024",
    title: "Annual Impact Report 2023–24",
    excerpt:
      "Our comprehensive annual report documenting achievements, financials, and impact across all programs in the first full year of operations.",
  },
  {
    id: 2,
    date: "March 2024",
    title: "Launch of Eco-Champion Program",
    excerpt:
      "MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN announces the Eco-Champion volunteer training program, designed to build a cadre of environmental stewards across rural Bihar.",
  },
  {
    id: 3,
    date: "August 2024",
    title: "Monsoon Plantation Drive 2024 — Results",
    excerpt:
      "Over 2,000 trees planted across 8 villages in Bihar's flood-prone areas, with a 92% survival rate confirmed in follow-up assessments.",
  },
];

const SOCIAL_HIGHLIGHTS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
    caption: "#PlantForBihar — Our monsoon drive results are in!",
    tags: "#PlantForBihar #AnumayaSansthan #BiharGreen 🌳",
    href: "#",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80",
    caption: "#CleanBihar — Eco-Champions clean up Gandak riverbank",
    tags: "#CleanBihar #EcoChampion #WasteManagement ♻️",
    href: "#",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    caption: "#AnumayaSansthan — Soil conservation training with farmers",
    tags: "#SoilHealth #BiharFarmers #Sustainability 🌾",
    href: "#",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function NewsCard({
  publication,
  initials,
  bgColor,
  headline,
  date,
  excerpt,
  href,
}: (typeof NEWS_ITEMS)[0]) {
  return (
    <article
      className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden card-hover flex flex-col"
      data-ocid={`media.news_card.${publication.toLowerCase().replace(/\s+/g, "_")}`}
    >
      {/* Publication row */}
      <div className="p-5 pb-0 flex items-center gap-3">
        <div
          className={`${bgColor} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white text-xs font-bold font-body tracking-wide">
            {initials}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-body font-semibold text-foreground text-sm truncate">
            {publication}
          </p>
          <p className="font-body text-muted-foreground text-xs">{date}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="font-heading text-foreground text-lg leading-snug line-clamp-2">
          {headline}
        </h3>
        <p className="font-body text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
          {excerpt}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors duration-200 mt-auto"
          data-ocid={`media.news_read_link.${publication.toLowerCase().replace(/\s+/g, "_")}`}
        >
          Read Article
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function PressCard({ id, date, title, excerpt }: (typeof PRESS_RELEASES)[0]) {
  return (
    <article
      className="bg-card rounded-2xl shadow-sm border border-border p-5 sm:p-6 flex flex-col sm:flex-row gap-4 card-hover"
      data-ocid={`media.press_card.${id}`}
    >
      {/* Date badge */}
      <div className="flex-shrink-0">
        <span className="inline-block bg-primary text-primary-foreground text-xs font-body font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
          {date}
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="font-heading text-foreground text-lg mb-1.5">{title}</h3>
        <p className="font-body text-muted-foreground text-sm leading-relaxed">
          {excerpt}
        </p>
      </div>

      {/* PDF button */}
      <div className="flex-shrink-0 flex items-start sm:items-center">
        <div className="relative group">
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 text-sm font-body font-medium border border-accent/40 text-accent/60 rounded-lg px-4 py-2 cursor-not-allowed select-none"
            data-ocid={`media.press_download.${id}`}
            aria-describedby={`pdf-tooltip-${id}`}
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Download PDF
          </button>
          <span
            id={`pdf-tooltip-${id}`}
            role="tooltip"
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-foreground text-background text-xs font-body rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10"
          >
            Coming Soon
          </span>
        </div>
      </div>
    </article>
  );
}

function SocialCard({
  id,
  image,
  caption,
  tags,
  href,
}: (typeof SOCIAL_HIGHLIGHTS)[0]) {
  return (
    <article
      className="rounded-2xl overflow-hidden bg-forest-green-800 shadow-md card-hover flex flex-col"
      data-ocid={`media.social_card.${id}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={image}
          alt={caption}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(27,94,32,0.8) 0%, rgba(27,94,32,0.1) 60%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5">
          <Instagram className="w-4 h-4 text-white" aria-hidden="true" />
        </div>
      </div>

      {/* Caption */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <p className="font-body font-semibold text-white text-sm leading-snug">
          {caption}
        </p>
        <p className="font-body text-white/60 text-xs leading-relaxed flex-1">
          {tags}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-white/80 hover:text-white transition-colors duration-200"
          data-ocid={`media.social_link.${id}`}
        >
          View on Instagram
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

// ─── Wave Divider ─────────────────────────────────────────────────────────────

function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`section-divider ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full fill-light-green-100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Media() {
  return (
    <Layout
      pageTitle="In the News"
      pageDescription="Media coverage, press releases, and social highlights from MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN"
    >
      <SEO
        title="Media"
        description="News, press coverage, and media resources about MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN's work in Bihar."
      />
      {/* ── Section 1: News Mentions ─────────────────────────────────────── */}
      <section
        className="py-16 bg-background"
        data-ocid="media.news_section"
        aria-labelledby="news-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-12">
            <span className="inline-block bg-secondary/40 text-primary font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Press & Media
            </span>
            <h2
              id="news-heading"
              className="font-heading text-foreground text-3xl md:text-4xl font-bold"
            >
              Media Coverage
            </h2>
            <p className="font-body text-muted-foreground mt-3 max-w-xl mx-auto text-base">
              Stories about MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN's work,
              as covered by leading publications across India.
            </p>
          </div>

          {/* Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="media.news_list"
          >
            {NEWS_ITEMS.map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Wave Divider ────────────────────────────────────────────────── */}
      <WaveDivider />

      {/* ── Section 3: Press Releases ────────────────────────────────────── */}
      <section
        className="py-16 bg-light-green-50"
        data-ocid="media.press_section"
        aria-labelledby="press-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-12">
            <span className="inline-block bg-secondary/40 text-primary font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Official Statements
            </span>
            <h2
              id="press-heading"
              className="font-heading text-foreground text-3xl md:text-4xl font-bold"
            >
              Press Releases
            </h2>
            <p className="font-body text-muted-foreground mt-3 text-base">
              Official announcements and reports from MAYA SAMAJIK UTTHAN EVAM
              PARAMARSH SANSTHAN.
            </p>
          </div>

          {/* List */}
          <div className="flex flex-col gap-4" data-ocid="media.press_list">
            {PRESS_RELEASES.map((item) => (
              <PressCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Wave Divider (flipped) ───────────────────────────────────────── */}
      <WaveDivider flip />

      {/* ── Section 4: Social Highlights ────────────────────────────────── */}
      <section
        className="py-16 bg-background"
        data-ocid="media.social_section"
        aria-labelledby="social-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-12">
            <span className="inline-block bg-secondary/40 text-primary font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Social Media
            </span>
            <h2
              id="social-heading"
              className="font-heading text-foreground text-3xl md:text-4xl font-bold"
            >
              From Our Social Channels
            </h2>
            <p className="font-body text-muted-foreground mt-3 max-w-xl mx-auto text-base">
              Highlights from our Instagram community — real moments from the
              field.
            </p>
          </div>

          {/* Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="media.social_list"
          >
            {SOCIAL_HIGHLIGHTS.map((item) => (
              <SocialCard key={item.id} {...item} />
            ))}
          </div>

          {/* Follow CTA */}
          <div className="text-center mt-10">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors duration-200 shadow-sm"
              data-ocid="media.follow_instagram_button"
            >
              <Instagram className="w-5 h-5" aria-hidden="true" />
              Follow Us on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 5: Media Contact CTA ────────────────────────────────── */}
      <section
        className="py-16 bg-secondary/30"
        data-ocid="media.contact_section"
        aria-labelledby="media-contact-heading"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Leaf accent */}
          <div className="flex justify-center mb-6">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary opacity-70"
              aria-hidden="true"
            >
              <path
                d="M24 4C24 4 8 10 8 28C8 37.94 15.16 44 24 44C32.84 44 40 37.94 40 28C40 10 24 4 24 4Z"
                fill="currentColor"
                fillOpacity="0.2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="24"
                y1="44"
                x2="24"
                y2="16"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

          <h2
            id="media-contact-heading"
            className="font-heading text-foreground text-3xl md:text-4xl font-bold mb-4"
          >
            Media Inquiries
          </h2>
          <p className="font-body text-muted-foreground text-base leading-relaxed mb-8">
            For press releases, interviews, media kits, or partnership
            opportunities, reach out to our communications team. We respond
            within 24 hours.
          </p>

          <a
            href="mailto:nirmalkumarsingh9625@gmail.com"
            className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground font-body font-semibold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-smooth shadow-md text-base"
            data-ocid="media.contact_email_button"
          >
            <Mail className="w-5 h-5" aria-hidden="true" />
            nirmalkumarsingh9625@gmail.com
          </a>

          <p className="font-body text-muted-foreground text-sm mt-6">
            You can also write to us at{" "}
            <strong className="text-foreground font-medium">
              MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN, ANUPURI, VEER BASAWAN
              SINGH NAGAR, NEAR PATLIPUTRA RAILWAY STATION, B.V. College,
              Phulwari, Patna-800014, Bihar, India
            </strong>
          </p>
        </div>
      </section>
    </Layout>
  );
}
