import { Link } from "@tanstack/react-router";
import Layout from "../components/Layout";

const projects = [
  {
    icon: "🌳",
    badge: "Plantation",
    badgeColor: "bg-forest-green-100 text-forest-green-800",
    title: "Restoring Bihar's Green Cover",
    description:
      "Our large-scale plantation drives target degraded land, roadsides, schools, and panchayat areas. With community participation at the core, we have planted thousands of trees — native species chosen for ecological resilience and local benefit.",
    impact: [
      { icon: "🌳", value: "10,000+", label: "Trees Planted" },
      { icon: "🏘️", value: "50+", label: "Villages Covered" },
      { icon: "🙋", value: "200+", label: "Volunteers" },
    ],
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&q=80",
    imgAlt: "Tree plantation drive in Bihar",
    flip: false,
  },
  {
    icon: "🌾",
    badge: "Soil Conservation",
    badgeColor: "bg-amber-100 text-amber-800",
    title: "Protecting the Land That Feeds Us",
    description:
      "Soil erosion threatens Bihar's agricultural heartland. Anumaya Sansthan deploys contour bunding, check dams, and afforestation to stabilize eroding soils — working with farmers to restore productivity and prevent desertification.",
    impact: [
      { icon: "🌾", value: "300+", label: "Acres Conserved" },
      { icon: "👨‍🌾", value: "150", label: "Farmers Trained" },
      { icon: "🗺️", value: "12", label: "Districts" },
    ],
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&q=80",
    imgAlt: "Soil conservation work in rural Bihar",
    flip: true,
  },
  {
    icon: "♻️",
    badge: "Waste Management",
    badgeColor: "bg-teal-100 text-teal-800",
    title: "Clean Villages, Healthy Futures",
    description:
      "Our waste management program introduces door-to-door collection, segregation awareness, and community composting in rural panchayats. We train local youth as Eco-Champions to lead ongoing efforts.",
    impact: [
      { icon: "♻️", value: "5,000 Kg", label: "Recycled" },
      { icon: "🏛️", value: "30", label: "Panchayats" },
      { icon: "🏠", value: "500+", label: "Households" },
    ],
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80",
    imgAlt: "Community waste management program",
    flip: false,
  },
];

const upcoming = [
  {
    icon: "🌊",
    title: "Water Conservation Initiative",
    desc: "Building check dams and water harvesting structures in drought-prone Bihar districts.",
    badge: "Coming Soon",
  },
  {
    icon: "📚",
    title: "Eco-Education Program",
    desc: "Environmental literacy curriculum for school children across 20 Bihar government schools.",
    badge: "In Planning",
  },
];

export default function Projects() {
  return (
    <Layout
      pageTitle="Our Projects & Initiatives"
      pageDescription="From plantation drives to waste management — transforming Bihar one initiative at a time."
    >
      {/* Projects */}
      {projects.map((project, i) => (
        <section
          key={project.title}
          className={`py-16 md:py-24 ${i % 2 === 0 ? "bg-cream" : "bg-impact-green"}`}
          data-ocid={`projects.section.${i + 1}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`grid md:grid-cols-2 gap-12 items-center ${project.flip ? "md:flex-row-reverse" : ""}`}
            >
              <div className={project.flip ? "md:order-2" : ""}>
                <span
                  className={`inline-block ${project.badgeColor} text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide`}
                >
                  {project.icon} {project.badge}
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900 mb-5 leading-snug">
                  {project.title}
                </h2>
                <p className="text-foreground/75 leading-relaxed mb-8">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-6 mb-8">
                  {project.impact.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-2">
                      <span className="text-xl">{stat.icon}</span>
                      <div>
                        <p className="font-bold text-forest-green-800 text-lg leading-none">
                          {stat.value}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/gallery"
                  data-ocid={`projects.view_gallery_button.${i + 1}`}
                  className="inline-flex items-center gap-2 border-2 border-forest-green-700 text-forest-green-700 px-5 py-2.5 rounded-full font-semibold hover:bg-forest-green-700 hover:text-white transition-all duration-200"
                >
                  View Gallery →
                </Link>
              </div>
              <div className={project.flip ? "md:order-1" : ""}>
                <img
                  src={project.img}
                  alt={project.imgAlt}
                  className="rounded-card shadow-card w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Upcoming */}
      <section
        className="py-16 md:py-24 bg-forest-green-900 text-white"
        data-ocid="projects.upcoming_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Upcoming Initiatives
            </h2>
            <p className="text-white/70 mt-3">
              New programs in development — stay tuned for updates.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {upcoming.map((item, i) => (
              <div
                key={item.title}
                className="bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/20"
                data-ocid={`projects.upcoming_card.${i + 1}`}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-heading text-xl font-bold">
                    {item.title}
                  </h3>
                  <span className="bg-light-green/20 text-light-green text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
