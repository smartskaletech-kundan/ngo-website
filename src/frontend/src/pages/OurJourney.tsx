import { Award, Globe, Heart, TreePine, Users } from "lucide-react";
import { motion } from "motion/react";
import Layout from "../components/Layout";

type Milestone = {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: boolean;
};

const milestones: Milestone[] = [
  {
    year: "June 2023",
    title: "Foundation",
    description:
      "MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN was officially founded and registered in Patna, Bihar (Registration No. S000071/23-24) — born from a vision of greener, healthier communities.",
    icon: <Heart className="w-5 h-5" />,
    highlight: true,
  },
  {
    year: "Oct 2023",
    title: "First Tree Plantation Drive",
    description:
      "Planted 500+ trees across the Phulwari area, launching our flagship environmental program and rallying 80+ community volunteers for a day of impact.",
    icon: <TreePine className="w-5 h-5" />,
  },
  {
    year: "Mar 2024",
    title: "1,000 Beneficiaries Milestone",
    description:
      "Crossed 1,000 direct beneficiaries through our combined education and health camp programs — a defining moment that validated our community-first approach.",
    icon: <Users className="w-5 h-5" />,
    highlight: true,
  },
  {
    year: "Jun 2024",
    title: "Women Empowerment Launch",
    description:
      "Started structured skill training workshops for 200+ women across 5 villages, covering tailoring, handicrafts, and financial literacy to promote self-reliance.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    year: "Sep 2024",
    title: "Water Conservation Initiative",
    description:
      "Implemented rainwater harvesting systems in 3 rural villages, conserving water resources and benefiting over 400 households facing seasonal water scarcity.",
    icon: <Globe className="w-5 h-5" />,
    highlight: true,
  },
  {
    year: "Feb 2025",
    title: "State Recognition",
    description:
      "Received formal recognition from the Bihar state government for outstanding contributions to environmental sustainability and rural community development.",
    icon: <Award className="w-5 h-5" />,
  },
  {
    year: "Apr 2025",
    title: "5,686+ Trees Planted",
    description:
      "Celebrated a cumulative milestone of over 5,686 trees planted across 167+ acres — reinforcing our commitment to reforestation and soil conservation across Bihar.",
    icon: <TreePine className="w-5 h-5" />,
    highlight: true,
  },
  {
    year: "2026 & Beyond",
    title: "Looking Ahead",
    description:
      "Expanding to 10 new villages, targeting 10,000 beneficiaries by 2027, and pursuing 80G & FCRA certifications to scale national and international partnerships.",
    icon: <Globe className="w-5 h-5" />,
  },
];

export default function OurJourney() {
  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 bg-[#2E7D32] overflow-hidden"
        data-ocid="journey.hero_section"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #A5D6A7 0%, transparent 60%), radial-gradient(circle at 80% 20%, #fff 0%, transparent 50%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block text-[#A5D6A7] text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Since 2023
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Our Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            From a small vision in Patna to impacting thousands of lives across
            Bihar — trace the milestones that have defined our growth, our
            purpose, and our promise to the communities we serve.
          </motion.p>
        </div>

        {/* Wave divider */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden"
          aria-hidden="true"
        >
          <svg
            role="presentation"
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48Z"
              fill="#F9F6F0"
            />
          </svg>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="bg-[#F9F6F0] py-20 px-4 sm:px-6 lg:px-8"
        data-ocid="journey.timeline_section"
      >
        <div className="max-w-4xl mx-auto">
          {/* Desktop vertical center line */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#2E7D32] via-[#A5D6A7] to-[#2E7D32]"
            style={{ top: "0", height: "100%" }}
            aria-hidden="true"
          />

          {/* Mobile left vertical line */}
          <div className="md:hidden relative">
            <div
              className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2E7D32] via-[#A5D6A7] to-[#2E7D32]"
              aria-hidden="true"
            />
            <div className="pl-8 space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className={`relative rounded-2xl p-5 shadow-md border ${
                    m.highlight
                      ? "bg-[#2E7D32] text-white border-[#2E7D32]"
                      : "bg-white border-[#A5D6A7]/40"
                  }`}
                  data-ocid={`journey.milestone_card.${i + 1}`}
                >
                  <div className="absolute -left-[2.15rem] top-5 w-4 h-4 rounded-full bg-[#2E7D32] border-4 border-[#A5D6A7] z-10 shadow" />
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3 ${
                      m.highlight
                        ? "bg-white/20 text-white"
                        : "bg-[#A5D6A7]/30 text-[#2E7D32]"
                    }`}
                  >
                    {m.icon}
                    {m.year}
                  </span>
                  <h3
                    className={`font-heading font-bold text-base mb-2 ${m.highlight ? "text-white" : "text-[#1A1A1A]"}`}
                  >
                    {m.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${m.highlight ? "text-white/85" : "text-[#6D4C41]"}`}
                  >
                    {m.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop alternating */}
          <div className="hidden md:block relative">
            <div
              className="absolute left-1/2 -translate-x-px w-0.5 h-full bg-gradient-to-b from-[#2E7D32] via-[#A5D6A7] to-[#2E7D32]"
              aria-hidden="true"
            />
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={m.title}
                  className="relative flex items-start mb-16 last:mb-0"
                >
                  {/* Left card slot */}
                  <div className="flex-1 flex justify-end pr-10">
                    {isLeft ? (
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: i * 0.07 }}
                        className={`max-w-xs w-full rounded-2xl p-6 shadow-md border ${
                          m.highlight
                            ? "bg-[#2E7D32] text-white border-[#2E7D32]"
                            : "bg-white border-[#A5D6A7]/40"
                        }`}
                        data-ocid={`journey.milestone_card.${i + 1}`}
                      >
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3 ${
                            m.highlight
                              ? "bg-white/20 text-white"
                              : "bg-[#A5D6A7]/30 text-[#2E7D32]"
                          }`}
                        >
                          {m.icon}
                          {m.year}
                        </span>
                        <h3
                          className={`font-heading font-bold text-lg mb-2 ${m.highlight ? "text-white" : "text-[#1A1A1A]"}`}
                        >
                          {m.title}
                        </h3>
                        <p
                          className={`text-sm leading-relaxed ${m.highlight ? "text-white/85" : "text-[#6D4C41]"}`}
                        >
                          {m.description}
                        </p>
                      </motion.div>
                    ) : null}
                  </div>

                  {/* Center dot */}
                  <div className="w-5 h-5 rounded-full bg-[#2E7D32] border-4 border-[#A5D6A7] z-10 shadow flex-shrink-0 mt-5" />

                  {/* Right card slot */}
                  <div className="flex-1 flex justify-start pl-10">
                    {!isLeft ? (
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: i * 0.07 }}
                        className={`max-w-xs w-full rounded-2xl p-6 shadow-md border ${
                          m.highlight
                            ? "bg-[#2E7D32] text-white border-[#2E7D32]"
                            : "bg-white border-[#A5D6A7]/40"
                        }`}
                        data-ocid={`journey.milestone_card.${i + 1}`}
                      >
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3 ${
                            m.highlight
                              ? "bg-white/20 text-white"
                              : "bg-[#A5D6A7]/30 text-[#2E7D32]"
                          }`}
                        >
                          {m.icon}
                          {m.year}
                        </span>
                        <h3
                          className={`font-heading font-bold text-lg mb-2 ${m.highlight ? "text-white" : "text-[#1A1A1A]"}`}
                        >
                          {m.title}
                        </h3>
                        <p
                          className={`text-sm leading-relaxed ${m.highlight ? "text-white/85" : "text-[#6D4C41]"}`}
                        >
                          {m.description}
                        </p>
                      </motion.div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="bg-white py-16 px-4 sm:px-6 lg:px-8 text-center"
        data-ocid="journey.cta_section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <h2 className="font-heading text-3xl font-bold text-[#2E7D32] mb-4">
            Be Part of the Next Chapter
          </h2>
          <p className="text-[#6D4C41] mb-8 leading-relaxed">
            Our journey is still unfolding. Join us as a volunteer, donor, or
            partner and help write the next milestone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/volunteer"
              data-ocid="journey.volunteer_button"
              className="inline-block bg-[#2E7D32] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#388E3C] transition-colors shadow-md"
            >
              Volunteer With Us
            </a>
            <a
              href="/donate"
              data-ocid="journey.donate_button"
              className="inline-block border-2 border-[#2E7D32] text-[#2E7D32] px-8 py-3 rounded-full font-semibold hover:bg-[#2E7D32] hover:text-white transition-colors"
            >
              Support Our Work
            </a>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
