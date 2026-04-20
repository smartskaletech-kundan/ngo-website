import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

interface ProgramRow {
  id: string;
  badge: string;
  title: string;
  description: string;
  stats: string;
  img: string;
  imgAlt: string;
}

const programs: ProgramRow[] = [
  {
    id: "plantation-drives",
    badge: "Plantation Drives",
    title: "Restoring Bihar's Green Cover",
    description:
      "Our plantation drives target degraded land, roadsides, schools, and panchayat areas across Patna, Vaishali, Nalanda, Jahanabad, Arwal, and Ara (Bhojpur). With community participation at the core, we have planted 800+ trees — native species chosen for ecological resilience and local benefit.",
    stats: "🌳 800+ Trees Planted | 🏘️ 6 Districts | 🙋 30+ Volunteers",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    imgAlt: "Tree plantation drive in rural Bihar",
  },
  {
    id: "soil-erosion-control",
    badge: "Soil Erosion Control",
    title: "Protecting the Land That Feeds Us",
    description:
      "Soil erosion threatens Bihar's agricultural heartland. We work with local farmers to deploy basic contour bunding and afforestation techniques to stabilize eroding soils and restore farm productivity. Our work is in its early phase with 40+ acres brought under conservation.",
    stats: "🌾 40+ Acres Conserved | 👨‍🌾 20+ Farmers Trained | 🗺️ 6 Districts",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    imgAlt: "Agricultural farmland in Bihar being conserved from soil erosion",
  },
  {
    id: "community-development",
    badge: "Community Development",
    title: "Strong Villages, Stronger Bihar",
    description:
      "Community development is the backbone of our work. We engage local youth and village leaders through awareness programs, participatory planning, and capacity building — helping 8 panchayats and 100+ households take ownership of their environment and future.",
    stats: "🏛️ 8 Panchayats | 🏠 100+ Households | 🤝 30+ Community Leaders",
    img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    imgAlt: "Community gathering in a Bihar village",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function ProgramRowItem({
  program,
  index,
}: {
  program: ProgramRow;
  index: number;
}) {
  const { ref, inView } = useInView(0.12);
  const isEven = index % 2 === 0;
  const bgClass = isEven ? "bg-white" : "bg-cream";

  return (
    <div ref={ref} className={bgClass}>
      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        data-ocid={`programs.row.${index + 1}`}
      >
        <div
          className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center ${
            isEven
              ? ""
              : "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
          }`}
        >
          {/* Image Column */}
          <div className="group overflow-hidden rounded-2xl shadow-card">
            <img
              src={program.img}
              alt={program.imgAlt}
              className="w-full h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Content Column */}
          <div className="flex flex-col gap-5">
            <span className="inline-block self-start bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              {program.badge}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900 leading-snug">
              {program.title}
            </h2>
            <p className="text-foreground/75 leading-relaxed text-base">
              {program.description}
            </p>

            {/* Inline Stats */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4">
              {program.stats.split(" | ").map((stat) => (
                <div key={stat} className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full bg-forest-green-600 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-semibold text-forest-green-800 text-sm">
                    {stat}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                to="/donate"
                data-ocid={`programs.support_button.${index + 1}`}
                className="inline-flex items-center gap-2 bg-forest-green-800 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-forest-green-900 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Support This Program
              </Link>
              <Link
                to="/program/$programId"
                params={{ programId: program.id }}
                data-ocid={`programs.learn_more_link.${index + 1}`}
                className="inline-flex items-center gap-1 text-forest-green-700 font-semibold text-sm hover:text-forest-green-900 transition-colors duration-200 underline-offset-4 hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Divider between rows */}
      {index < programs.length - 1 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <hr className="border-border" />
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const { ref: introRef, inView: introInView } = useInView(0.2);

  return (
    <Layout
      pageTitle="Our Programs | MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN"
      pageDescription="Three integrated programs driving ecological restoration and community upliftment across 6 Bihar districts."
    >
      <SEO
        title="Our Programs"
        description="Explore MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN's 3 integrated programs — Plantation Drives, Soil Erosion Control, and Community Development — across Bihar's rural communities."
      />

      {/* HERO BANNER */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center text-center overflow-hidden"
        data-ocid="programs.hero_section"
      >
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80"
          alt="Forest landscape in Bihar"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(27,94,32,0.82) 0%, rgba(46,125,50,0.7) 50%, rgba(109,76,65,0.55) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up">
            Our Programs
          </h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed animate-fade-in-up-delay-1 max-w-2xl mx-auto">
            Three focused programs — rooted in Bihar's ecology and community
            needs — building a greener, more resilient future one village at a
            time.
          </p>
        </div>
      </section>

      {/* INTRO TEXT */}
      <section
        className="bg-forest-green-50 py-10"
        data-ocid="programs.intro_section"
      >
        <div
          ref={introRef}
          className={`max-w-3xl mx-auto px-4 sm:px-6 text-center transition-all duration-700 ease-out ${
            introInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
            <strong className="text-forest-green-800 font-semibold">
              MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN
            </strong>{" "}
            is a young Bihar-based NGO working at the intersection of ecology
            and community development. Registered in June 2023, we focus on
            three core programs that address the most pressing environmental and
            social needs of Bihar's rural heartland.
          </p>
        </div>
      </section>

      {/* PROGRAM ROWS */}
      <div data-ocid="programs.list">
        {programs.map((program, index) => (
          <ProgramRowItem key={program.id} program={program} index={index} />
        ))}
      </div>

      {/* CTA BAND */}
      <section
        className="bg-forest-green-800 py-16 text-center"
        data-ocid="programs.cta_section"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Partner With Us
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-8">
            Support our programs through donations, CSR partnerships, or
            volunteering.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/donate"
              data-ocid="programs.donate_button"
              className="inline-flex items-center gap-2 bg-white text-forest-green-800 px-7 py-3 rounded-full font-bold text-base hover:bg-cream transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Donate Now
            </Link>
            <Link
              to="/volunteer"
              data-ocid="programs.volunteer_button"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-7 py-3 rounded-full font-bold text-base hover:bg-white hover:text-forest-green-800 transition-all duration-200"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
