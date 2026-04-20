import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import Layout from "../components/Layout";

type FAQItem = { q: string; a: string };
type FAQSection = { id: string; title: string; items: FAQItem[] };

const sections: FAQSection[] = [
  {
    id: "about",
    title: "About Us",
    items: [
      {
        q: "What is MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN?",
        a: "We are an NGO registered in Patna, Bihar (Registration No. S000071/23-24) focused on environmental sustainability, women empowerment, rural livelihoods, and community health. We work across villages in Bihar to create lasting impact.",
      },
      {
        q: "Does the organisation have FCRA certification?",
        a: "We are currently in the process of obtaining FCRA certification, which will allow us to receive international donations. Our domestic work is already fully operational under our state registration.",
      },
      {
        q: "Where is your office located?",
        a: "Our office is located at ANUPURI, VEER BASAWAN SINGH NAGAR, NEAR PATLIPUTRA RAILWAY STATION, B.V. College, Phulwari, Patna-800014, Bihar, India.",
      },
    ],
  },
  {
    id: "donations",
    title: "Donations & Tax Exemptions",
    items: [
      {
        q: "Is my donation tax-exempt under 80G?",
        a: "We are actively working towards 80G certification. Once received, all donations will be eligible for tax deduction under Section 80G. We will notify all donors as soon as the certification is complete.",
      },
      {
        q: "How can I track where my donation is used?",
        a: "We publish quarterly impact reports and annual financial statements on our Transparency page. Every donation is tracked and allocated to specific programs — you receive a donation receipt and an impact update by email.",
      },
      {
        q: "What payment methods are accepted for donations?",
        a: "We accept UPI, credit/debit cards, net banking, and direct bank transfers. Our UPI ID is anumayasansthan@indianbank. For bank transfers: Account No. 8285666443, IFSC: IDIB000K520, Indian Bank, Khajpura Branch, Patna.",
      },
    ],
  },
  {
    id: "volunteering",
    title: "Volunteering",
    items: [
      {
        q: "How do I register as a volunteer?",
        a: "Visit our 'Volunteer With Us' page and fill in the registration form with your name, contact details, area of interest (Environment, Education, Health, Rural Development, or Events), and your availability. Our team will reach out within 3–5 working days.",
      },
      {
        q: "Do volunteers need prior experience?",
        a: "No prior experience is required! We welcome students, professionals, and retirees alike. You will receive orientation and field training before any fieldwork. Enthusiasm and commitment are the only prerequisites.",
      },
      {
        q: "Can I volunteer remotely?",
        a: "Yes! We have remote volunteering opportunities in content writing, social media management, graphic design, fundraising, and data analysis. Simply mention your remote interest and availability in your registration form.",
      },
    ],
  },
  {
    id: "programs",
    title: "Programs",
    items: [
      {
        q: "Can corporates partner for CSR activities?",
        a: "Absolutely! We have a dedicated CSR partnership program for companies looking to meet their social responsibility goals. We offer tree plantation drives, skill development workshops, and health camps as CSR activities. Contact us at nirmalkumarsingh9625@gmail.com.",
      },
      {
        q: "What areas do your programs cover?",
        a: "Our 6 main programs cover: Tree Plantation, Women Empowerment, Education for underprivileged children, Water Conservation, Rural Livelihoods, and Health Camps. We operate primarily across villages in Bihar, India.",
      },
      {
        q: "How can I donate to a specific program?",
        a: "On the Donate page, you can specify which program your donation should support. We ensure funds are allocated as per your preference and publish program-wise expenditure in our quarterly reports.",
      },
    ],
  },
];

function AccordionItem({ item, id }: { item: FAQItem; id: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-[#A5D6A7]/40 rounded-xl overflow-hidden"
      data-ocid={`faq.item.${id}`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        data-ocid={`faq.toggle.${id}`}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-[#F9F6F0] transition-colors"
      >
        <span className="font-semibold text-[#1A1A1A] text-sm sm:text-base leading-snug pr-2">
          {item.q}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`w-5 h-5 text-[#2E7D32] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96" : "max-h-0"}`}
      >
        <p className="px-6 pb-5 pt-0 text-sm sm:text-base text-[#6D4C41] leading-relaxed border-t border-[#A5D6A7]/30 bg-[#F9F6F0]">
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 bg-[#2E7D32] overflow-hidden"
        data-ocid="faq.hero_section"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 60%, #A5D6A7 0%, transparent 55%), radial-gradient(circle at 75% 20%, #fff 0%, transparent 50%)",
          }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block text-[#A5D6A7] text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Got questions?
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 text-lg leading-relaxed"
          >
            Answers to the questions we hear most often about our organization,
            donation process, volunteering, and programs.
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

      {/* FAQ Sections */}
      <section
        className="bg-[#F9F6F0] py-20 px-4 sm:px-6 lg:px-8"
        data-ocid="faq.questions_section"
      >
        <div className="max-w-3xl mx-auto space-y-14">
          {sections.map((section, si) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: si * 0.08 }}
              data-ocid={`faq.section.${section.id}`}
            >
              <h2 className="font-heading text-2xl font-bold text-[#2E7D32] mb-6 flex items-center gap-3">
                <span
                  className="w-8 h-1 bg-[#A5D6A7] rounded-full inline-block"
                  aria-hidden="true"
                />
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, ii) => (
                  <AccordionItem
                    key={item.q}
                    item={item}
                    id={`${section.id}.${ii + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section
        className="bg-white py-16 px-4 sm:px-6 lg:px-8 text-center"
        data-ocid="faq.contact_cta_section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#2E7D32] mb-4">
            Still have questions?
          </h2>
          <p className="text-[#6D4C41] mb-8 leading-relaxed">
            We'd love to hear from you. Our team is happy to answer any specific
            questions about our work, your donation, or how to get involved.
          </p>
          <a
            href="/contact"
            data-ocid="faq.contact_button"
            className="inline-block bg-[#2E7D32] text-white px-10 py-3.5 rounded-full font-semibold text-base hover:bg-[#388E3C] transition-colors shadow-md"
          >
            Contact Us
          </a>
        </motion.div>
      </section>
    </Layout>
  );
}
