import { BookOpen, Briefcase, MapPin, Users } from "lucide-react";
import { motion } from "motion/react";
import Layout from "../components/Layout";

type JobCard = {
  title: string;
  location: string;
  type: string;
  description: string;
  subject: string;
};

const jobs: JobCard[] = [
  {
    title: "Field Coordinator",
    location: "Patna, Bihar",
    type: "Full-time",
    description:
      "Coordinate field activities, liaise with village communities, manage volunteers, and report on program implementation across our active sites.",
    subject: "Application for Field Coordinator",
  },
  {
    title: "Social Media & Communications Executive",
    location: "Patna / Remote",
    type: "Full-time",
    description:
      "Create compelling content, manage our social media channels, write impact stories, and amplify the organization's reach across digital platforms.",
    subject: "Application for Social Media & Communications Executive",
  },
  {
    title: "Program Officer – Education",
    location: "Patna, Bihar",
    type: "Full-time",
    description:
      "Design and implement education programs for underprivileged children, track learning outcomes, and coordinate with government schools and community stakeholders.",
    subject: "Application for Program Officer – Education",
  },
  {
    title: "Internship: Research & Documentation",
    location: "Remote / Patna",
    type: "Part-time",
    description:
      "Research social issues relevant to our programs, document field impact stories, support administrative operations, and assist with grant reporting.",
    subject: "Application for Internship – Research & Documentation",
  },
];

const whyCards = [
  {
    icon: <BookOpen className="w-6 h-6 text-[#2E7D32]" aria-hidden="true" />,
    title: "Purposeful Work",
    description:
      "Make a real, measurable difference in communities across Bihar. Every task contributes directly to environmental and social impact you can see.",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-[#2E7D32]" aria-hidden="true" />,
    title: "Learning & Growth",
    description:
      "Develop hands-on skills in field operations, community engagement, grant writing, and nonprofit management in a fast-learning environment.",
  },
  {
    icon: <Users className="w-6 h-6 text-[#2E7D32]" aria-hidden="true" />,
    title: "Collaborative Team",
    description:
      "Work alongside dedicated changemakers from diverse backgrounds — educators, activists, field workers, and management professionals.",
  },
];

export default function Careers() {
  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 bg-[#2E7D32] overflow-hidden"
        data-ocid="careers.hero_section"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, #A5D6A7 0%, transparent 55%), radial-gradient(circle at 80% 20%, #fff 0%, transparent 50%)",
          }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block text-[#A5D6A7] text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Work With Purpose
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Join Our Mission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/85 text-lg leading-relaxed"
          >
            At MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN, we seek passionate
            individuals who want to create real impact. Working with us means
            being part of a movement for environmental sustainability and
            community development.
          </motion.p>
        </div>

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

      {/* Why Work With Us */}
      <section
        className="bg-[#F9F6F0] py-20 px-4 sm:px-6 lg:px-8"
        data-ocid="careers.why_section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#2E7D32] mb-4">
              Why Work With Us
            </h2>
            <p className="text-[#6D4C41] max-w-xl mx-auto leading-relaxed">
              More than a job — a chance to be part of something that matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 shadow-md border border-[#A5D6A7]/30 hover:border-[#2E7D32]/40 transition-colors card-hover"
                data-ocid={`careers.why_card.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#A5D6A7]/25 flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-[#1A1A1A] mb-2">
                  {card.title}
                </h3>
                <p className="text-[#6D4C41] text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section
        className="bg-white py-20 px-4 sm:px-6 lg:px-8"
        data-ocid="careers.openings_section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#2E7D32] mb-4">
              Current Openings
            </h2>
            <p className="text-[#6D4C41] max-w-xl mx-auto leading-relaxed">
              We are actively looking for passionate people to join our growing
              team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[#F9F6F0] rounded-2xl p-6 border border-[#A5D6A7]/40 hover:border-[#2E7D32]/50 hover:shadow-md transition-all duration-300 flex flex-col gap-4"
                data-ocid={`careers.job_card.${i + 1}`}
              >
                <div className="flex flex-wrap items-start gap-2">
                  <span className="inline-block bg-[#2E7D32]/10 text-[#2E7D32] text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-[#6D4C41] bg-[#A5D6A7]/20 px-3 py-1 rounded-full">
                    <MapPin aria-hidden="true" className="w-3 h-3" />
                    {job.location}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-lg text-[#1A1A1A] mb-2 leading-snug">
                    {job.title}
                  </h3>
                  <p className="text-[#6D4C41] text-sm leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <a
                  href={`mailto:nirmalkumarsingh9625@gmail.com?subject=${encodeURIComponent(job.subject)}`}
                  data-ocid={`careers.apply_button.${i + 1}`}
                  className="mt-auto inline-block bg-[#2E7D32] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#388E3C] transition-colors shadow text-center"
                >
                  Apply Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equal Opportunity */}
      <section
        className="bg-[#F9F6F0] py-12 px-4 sm:px-6 lg:px-8 text-center border-t border-[#A5D6A7]/30"
        data-ocid="careers.eoe_section"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-[#6D4C41] text-sm leading-relaxed">
            <strong className="text-[#2E7D32]">
              Equal Opportunity Employer
            </strong>{" "}
            — MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN is committed to
            building a diverse and inclusive team. We welcome applications from
            individuals of all backgrounds, genders, religions, and abilities.
          </p>
        </div>
      </section>
    </Layout>
  );
}
