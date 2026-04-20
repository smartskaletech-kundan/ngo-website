import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

interface Program {
  image: string;
  name: string;
  description: string;
  programId: string;
}

const programs: Program[] = [
  {
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
    name: "Plantation Drives",
    description:
      "Planting native trees across Bihar's rural districts — restoring green cover, one community at a time.",
    programId: "plantation-drives",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    name: "Soil Erosion Control",
    description:
      "Working with Bihar's farmers to stabilize eroding farmland through contour bunding and afforestation.",
    programId: "soil-erosion-control",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    name: "Community Development",
    description:
      "Empowering panchayats and households to own their environmental future — awareness, planning, and action.",
    programId: "community-development",
  },
];

function ProgramCard({ program, index }: { program: Program; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl shadow-card overflow-hidden border-2 border-transparent hover:border-forest-green-400 hover:shadow-card-hover hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      data-ocid={`our_programs.card.${index + 1}`}
    >
      <div className="overflow-hidden h-52">
        <img
          src={program.image}
          alt={program.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <h3 className="font-heading text-xl font-bold text-forest-green-900 leading-snug">
          {program.name}
        </h3>
        <p className="text-sm text-foreground/65 leading-relaxed line-clamp-2">
          {program.description}
        </p>
        <div className="mt-1">
          <Link
            to="/program/$programId"
            params={{ programId: program.programId }}
            className="inline-block bg-forest-green-700 hover:bg-forest-green-800 text-white rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105"
            data-ocid={`our_programs.cta_button.${index + 1}`}
          >
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OurPrograms() {
  return (
    <div data-ocid="our_programs.section">
      {/* Top wave */}
      <div className="bg-forest-green-50 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 fill-white"
          aria-hidden="true"
        >
          <path d="M0,24 C480,48 960,0 1440,24 L1440,48 L0,48 Z" />
        </svg>
      </div>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Our Initiatives
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900 mb-3">
              What We Do
            </h2>
            <p className="text-foreground/60 text-base max-w-xl mx-auto">
              Three core programs working at the intersection of ecology and
              community development across 6 Bihar districts.
            </p>
          </div>

          {/* Grid — 1 col mobile, 3 col desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((program, i) => (
              <ProgramCard
                key={program.programId}
                program={program}
                index={i}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 border-2 border-forest-green-700 text-forest-green-800 px-7 py-3 rounded-full font-semibold hover:bg-forest-green-700 hover:text-white transition-all duration-200"
              data-ocid="our_programs.view_all_button"
            >
              View All Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom wave */}
      <div className="bg-white overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 fill-cream"
          aria-hidden="true"
        >
          <path d="M0,0 C360,48 1080,0 1440,0 L1440,48 L0,48 Z" />
        </svg>
      </div>
    </div>
  );
}
