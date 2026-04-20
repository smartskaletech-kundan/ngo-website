import { Link } from "@tanstack/react-router";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const values = [
  {
    icon: "🌿",
    title: "Ecological Integrity",
    desc: "We plant native species and conserve natural land using methods that respect Bihar's ecology.",
  },
  {
    icon: "🏘️",
    title: "Community Ownership",
    desc: "Our programs work only when villages own them. We build capacity, not dependency.",
  },
  {
    icon: "📊",
    title: "Honest Accounting",
    desc: "We are a young NGO with modest impact. We report what we have actually done — not what sounds impressive.",
  },
  {
    icon: "🌱",
    title: "Long-Term Commitment",
    desc: "Environmental change takes decades. We are here for the long run — planting seeds today for a greener Bihar tomorrow.",
  },
];

const districts = [
  { name: "Patna", emoji: "🏙️" },
  { name: "Ara (Bhojpur)", emoji: "🌾" },
  { name: "Vaishali", emoji: "🌳" },
  { name: "Nalanda", emoji: "🏛️" },
  { name: "Jahanabad", emoji: "🌿" },
  { name: "Arwal", emoji: "🌻" },
];

export default function About() {
  return (
    <Layout
      pageTitle="About MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN"
      pageDescription="Our story, mission, values, and registration details."
    >
      <SEO
        title="About Us"
        description="Learn about MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN's mission, vision, and values. Founded in June 2023, we work to restore ecology and empower communities across 6 Bihar districts."
      />

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
                MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN — officially{" "}
                <span className="font-hindi font-semibold text-forest-green-800">
                  माया सामाजिक उत्थान एवं परामर्श संस्थान
                </span>{" "}
                — was established on 12th June 2023 under Registration No.
                S000071/23-24. We are a newly registered NGO rooted in the rural
                heartland of Bihar, working to address ecological degradation
                and social underdevelopment in our communities.
              </p>
              <p className="text-foreground/75 leading-relaxed mb-4">
                In just over a year, we have planted 800+ trees, worked across 6
                districts, and engaged over 30 volunteers who believe in a
                greener Bihar. We are growing — step by step, village by
                village.
              </p>
              <p className="text-foreground/75 leading-relaxed">
                Our work is guided by the belief that environmental restoration
                and community upliftment go hand in hand. From tree plantation
                drives in Patna to soil conservation support for farmers in
                Nalanda and Arwal, we are laying the foundation for a
                sustainable and resilient Bihar.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80"
                alt="Community development work by MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN"
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
              Our Mission &amp; Vision
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

      {/* Coverage Districts */}
      <section
        className="py-12 md:py-16 bg-forest-green-50"
        data-ocid="about.coverage_section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Where We Work
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-forest-green-900">
              Our Coverage: 6 Bihar Districts
            </h2>
            <p className="text-foreground/60 mt-2 text-sm max-w-lg mx-auto">
              In our initial phase, we operate across these 6 districts of Bihar
              — growing our footprint step by step.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {districts.map((d, i) => (
              <div
                key={d.name}
                className="flex items-center gap-3 bg-white rounded-xl border border-forest-green-200 px-4 py-3 shadow-xs hover:border-forest-green-400 transition-colors"
                data-ocid={`about.district.${i + 1}`}
              >
                <span className="text-2xl" aria-hidden="true">
                  {d.emoji}
                </span>
                <span className="font-semibold text-forest-green-900 text-sm">
                  {d.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Card */}
      <section
        className="py-16 bg-cream"
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
                  MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN
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
                {
                  label: "Registered Address",
                  value:
                    "Anupuri, Veer Basawan Singh Nagar, Near Patliputra Railway Station, B.V. College, Phulwari, Patna-800014, Bihar, India",
                },
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

            {/* Contact Details */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-forest-green-50 rounded-lg p-3 flex items-center gap-2">
                <span
                  className="text-forest-green-700 text-lg"
                  aria-hidden="true"
                >
                  📞
                </span>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                    Phone / WhatsApp
                  </p>
                  <a
                    href="tel:+918210105075"
                    data-ocid="about.phone_link"
                    className="font-semibold text-forest-green-800 text-sm hover:text-forest-green-900 transition-colors"
                  >
                    +91 8210105075
                  </a>
                </div>
              </div>
              <div className="bg-forest-green-50 rounded-lg p-3 flex items-center gap-2">
                <span
                  className="text-forest-green-700 text-lg"
                  aria-hidden="true"
                >
                  ✉️
                </span>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                    Email
                  </p>
                  <a
                    href="mailto:nirmalkumarsingh9625@gmail.com"
                    data-ocid="about.email_link"
                    className="font-semibold text-forest-green-800 text-sm hover:text-forest-green-900 transition-colors break-all"
                  >
                    nirmalkumarsingh9625@gmail.com
                  </a>
                </div>
              </div>
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
