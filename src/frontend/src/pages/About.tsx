import { Link } from "@tanstack/react-router";
import Layout from "../components/Layout";

const values = [
  {
    icon: "🌿",
    title: "Integrity",
    desc: "We act with transparency and accountability in all we do.",
  },
  {
    icon: "♻️",
    title: "Sustainability",
    desc: "Every action is guided by long-term ecological and social impact.",
  },
  {
    icon: "🤝",
    title: "Inclusivity",
    desc: "We center marginalized communities in our planning and programs.",
  },
  {
    icon: "📊",
    title: "Impact",
    desc: "We measure outcomes and continuously improve our work.",
  },
];

export default function About() {
  return (
    <Layout
      pageTitle="About Anumaya Sansthan"
      pageDescription="Our story, mission, values, and registration details."
    >
      {/* Our Story */}
      <section
        className="py-16 md:py-24 bg-cream"
        data-ocid="about.story_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                Our Story
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900 mb-5">
                Born from Bihar's Ecological Need
              </h2>
              <p className="text-foreground/75 leading-relaxed mb-4">
                Anumaya Sansthan — officially{" "}
                <span className="font-hindi font-semibold text-forest-green-800">
                  माया सामाजिक उत्थान एवं परामर्श संस्थान
                </span>{" "}
                — was established on 12th June 2023 under Registration No.
                S000071/23-24.
              </p>
              <p className="text-foreground/75 leading-relaxed mb-4">
                Born from a deeply felt need to address ecological degradation
                and social underdevelopment in Bihar, the organization works to
                restore nature's balance while uplifting rural communities
                through sustainable, participatory programs.
              </p>
              <p className="text-foreground/75 leading-relaxed">
                From the fertile plains of Patna to the rural villages of
                Nalanda, Vaishali, and Muzaffarpur, Anumaya Sansthan is building
                a greener, more resilient Bihar — one tree, one community, one
                action at a time.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80"
                alt="Community development work by Anumaya Sansthan"
                className="rounded-card shadow-card w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="py-16 md:py-20 bg-impact-green"
        data-ocid="about.mission_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
              Our Mission & Vision
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-card shadow-card p-8 border-t-4 border-forest-green-700">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-heading text-2xl font-bold text-forest-green-900 mb-3">
                Our Mission
              </h3>
              <p className="text-foreground/75 leading-relaxed">
                To create sustainable green ecosystems and empower communities
                through environmental action, education, and social development.
              </p>
            </div>
            <div className="bg-card rounded-card shadow-card p-8 border-t-4 border-earth-brown">
              <div className="text-4xl mb-4">🌅</div>
              <h3 className="font-heading text-2xl font-bold text-forest-green-900 mb-3">
                Our Vision
              </h3>
              <p className="text-foreground/75 leading-relaxed">
                A Bihar where every village breathes clean air, farms fertile
                land, and thrives in harmony with nature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-16 md:py-24 bg-cream"
        data-ocid="about.values_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="bg-card rounded-card shadow-card p-6 text-center card-hover"
                data-ocid={`about.value_card.${i + 1}`}
              >
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-heading font-bold text-forest-green-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Card */}
      <section
        className="py-16 bg-forest-green-50"
        data-ocid="about.registration_section"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-card rounded-card shadow-card-hover border-2 border-forest-green-300 p-8 relative">
            <div className="absolute -top-3 left-6 bg-forest-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Official Registration
            </div>
            <div className="flex items-center gap-3 mb-6 mt-2">
              <span className="text-4xl">📜</span>
              <div>
                <h3 className="font-heading text-xl font-bold text-forest-green-900">
                  Anumaya Sansthan
                </h3>
                <p className="font-hindi text-forest-green-700 text-sm">
                  माया सामाजिक उत्थान एवं परामर्श संस्थान
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Registration Number", value: "S000071/23-24" },
                { label: "Date of Registration", value: "12th June 2023" },
                { label: "Registered Address", value: "Patna, Bihar, India" },
                { label: "Status", value: "Active & Registered" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-forest-green-50 rounded-lg p-3"
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    {item.label}
                  </p>
                  <p className="font-semibold text-forest-green-900 text-sm">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-forest-green-100 flex gap-4">
              <Link
                to="/transparency"
                data-ocid="about.transparency_link"
                className="text-forest-green-700 text-sm font-semibold hover:text-forest-green-900 transition-colors"
              >
                View Financial Reports →
              </Link>
              <Link
                to="/donate"
                data-ocid="about.donate_link"
                className="text-forest-green-700 text-sm font-semibold hover:text-forest-green-900 transition-colors"
              >
                Support Our Work →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
