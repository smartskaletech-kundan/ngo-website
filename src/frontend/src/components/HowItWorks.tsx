import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

interface Step {
  number: number;
  icon: string;
  title: string;
  description: string;
  cta?: { text: string; href: string };
}

const steps: Step[] = [
  {
    number: 1,
    icon: "🎯",
    title: "Choose a Cause",
    description:
      "Explore our programs and find a cause that resonates with your values and community.",
  },
  {
    number: 2,
    icon: "🤲",
    title: "Donate or Volunteer",
    description:
      "Make a donation or sign up as a volunteer — every contribution makes a difference.",
    cta: { text: "Volunteer Now", href: "/volunteer" },
  },
  {
    number: 3,
    icon: "📊",
    title: "Track Your Impact",
    description:
      "Follow real-time updates and see how your support is creating measurable change.",
  },
  {
    number: 4,
    icon: "📬",
    title: "Get Updates & Reports",
    description:
      "Receive periodic impact reports and stories directly from the field.",
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
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
      className={`flex flex-col items-center text-center transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      data-ocid={`how_it_works.step.${index + 1}`}
    >
      {/* Step number */}
      <div className="w-12 h-12 rounded-full bg-forest-green-600 text-white flex items-center justify-center text-xl font-bold font-heading mb-4 shadow-md z-10 relative">
        {step.number}
      </div>

      {/* Icon circle */}
      <div className="w-20 h-20 rounded-full bg-forest-green-100 border-2 border-forest-green-200 flex items-center justify-center text-4xl mb-5 shadow-sm">
        <span aria-hidden="true">{step.icon}</span>
      </div>

      {/* Title */}
      <h3 className="font-heading text-xl font-semibold text-forest-green-900 mb-2">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-foreground/65 leading-relaxed max-w-[200px]">
        {step.description}
      </p>

      {/* CTA — only on steps that define one */}
      {step.cta && (
        <Link
          to={step.cta.href}
          className="mt-4 inline-block border-2 border-forest-green-700 text-forest-green-700 hover:bg-forest-green-700 hover:text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200"
          data-ocid="how_it_works.volunteer_link"
        >
          {step.cta.text}
        </Link>
      )}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <div data-ocid="how_it_works.section">
      {/* Top wave */}
      <div className="bg-impact-green overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 fill-cream"
          aria-hidden="true"
        >
          <path d="M0,48 C360,0 1080,48 1440,48 L1440,48 L0,48 Z" />
        </svg>
      </div>

      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Our Process
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900 mb-3">
              How It Works
            </h2>
            <p className="text-foreground/65 text-base max-w-lg mx-auto">
              Making change is easy — here's how you can get started
            </p>
          </div>

          {/* Steps grid with connector */}
          <div className="relative">
            {/* Connector line — desktop only */}
            <div
              className="hidden md:block absolute top-[60px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] border-t-2 border-dashed border-forest-green-300"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative z-10">
              {steps.map((step, i) => (
                <StepCard key={step.number} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom wave */}
      <div className="bg-cream overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 fill-forest-green-50"
          aria-hidden="true"
        >
          <path d="M0,24 C720,48 720,0 1440,24 L1440,48 L0,48 Z" />
        </svg>
      </div>
    </div>
  );
}
