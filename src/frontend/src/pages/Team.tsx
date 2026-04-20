import { useActor } from "@caffeineai/core-infrastructure";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

function resolveImageUrl(imageKey: string): string {
  if (imageKey.includes("://")) return imageKey;
  return `https://blob.caffeine.ai/${imageKey}`;
}

/* ── Silhouette Placeholder ───────────────────────────────────────────────── */

function SilhouettePlaceholder({
  gender = "female",
  size = "lg",
}: {
  gender?: "male" | "female";
  size?: "lg" | "sm";
}) {
  const dim = size === "lg" ? 128 : 64;
  const ringClass =
    size === "lg"
      ? "ring-4 ring-forest-green-200 shadow-md"
      : "ring-2 ring-white shadow";
  const sizeClass = size === "lg" ? "w-32 h-32" : "w-16 h-16";

  // Female silhouette path (slightly wider shoulders)
  const femalePath =
    "M50,20 C50,20 42,24 40,32 C38,40 40,46 40,46 C34,48 28,54 26,62 L74,62 C72,54 66,48 60,46 C60,46 62,40 60,32 C58,24 50,20 50,20Z M44,26 C44,26 42,30 42,34 C42,38 44,42 50,44 C56,42 58,38 58,34 C58,30 56,26 50,26Z";

  // Male silhouette path (broader shoulders)
  const malePath =
    "M50,18 C50,18 41,22 39,31 C37,40 39,46 39,46 C32,48 26,55 24,64 L76,64 C74,55 68,48 61,46 C61,46 63,40 61,31 C59,22 50,18 50,18Z M43,24 C43,24 41,28 41,33 C41,38 44,43 50,45 C56,43 59,38 59,33 C59,28 57,24 50,24Z";

  return (
    <div
      className={`${sizeClass} rounded-full overflow-hidden ${ringClass} flex-shrink-0`}
    >
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Background */}
        <rect width="100" height="100" fill="#2E7D32" />
        {/* Silhouette figure */}
        <path
          d={gender === "female" ? femalePath : malePath}
          fill="#A5D6A7"
          fillOpacity="0.9"
        />
      </svg>
    </div>
  );
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const BASE_MEMBERS = [
  {
    name: "Mrs. Anu Kumari Singh",
    title: "Chairperson",
    initials: "AK",
    gender: "female" as const,
    bio: "Mrs. Anu Kumari Singh is the founding Chairperson whose vision shaped this organization. She leads strategic planning, donor partnerships, and the overall mission direction of Anumaya Sansthan.",
    photo: null as string | null,
    dynamicKey: "chairperson" as "chairperson" | "treasurer" | null,
    linkedin: "#",
  },
  {
    name: "Dr. Nirmal Kumar Singh",
    title: "Secretary",
    initials: "NS",
    gender: "male" as const,
    bio: "Dr. Nirmal Kumar Singh oversees day-to-day operations, field programs, and NGO governance. With a background in social development and community mobilization, he leads the organization's mission in Bihar's rural districts.",
    photo: "/assets/secretary.jpeg" as string | null,
    dynamicKey: null as "chairperson" | "treasurer" | null,
    linkedin: "#",
  },
  {
    name: "Mrs. Sweety Kumari",
    title: "Treasurer",
    initials: "SK",
    gender: "female" as const,
    bio: "Mrs. Sweety Kumari manages financial operations and donor funds, ensuring complete transparency in all financial reporting.",
    photo: null as string | null,
    dynamicKey: "treasurer" as "chairperson" | "treasurer" | null,
    linkedin: "#",
  },
];

const FIELD_TEAM = [
  {
    name: "Priya Kumari",
    designation: "Plantation Drive Coordinator",
    initials: "PK",
    gender: "female" as const,
    linkedin: "#",
  },
  {
    name: "Ramesh Kumar Singh",
    designation: "Soil Conservation Field Officer",
    initials: "RK",
    gender: "male" as const,
    linkedin: "#",
  },
  {
    name: "Suresh Prasad",
    designation: "Community Development Officer",
    initials: "SP",
    gender: "male" as const,
    linkedin: "#",
  },
];

export default function Team() {
  const { actor, isFetching } = useActor(createActor);
  const [secretaryPhoto, setSecretaryPhoto] = useState<string | null>(null);
  const [chairpersonPhoto, setChairpersonPhoto] = useState<string | null>(null);
  const [treasurerPhoto, setTreasurerPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getAdminSettings()
      .then((settings) => {
        if (settings.secretaryPhotoKey) {
          setSecretaryPhoto(resolveImageUrl(settings.secretaryPhotoKey));
        }
        if (settings.chairpersonPhotoKey) {
          setChairpersonPhoto(resolveImageUrl(settings.chairpersonPhotoKey));
        }
        if (settings.treasurerPhotoKey) {
          setTreasurerPhoto(resolveImageUrl(settings.treasurerPhotoKey));
        }
      })
      .catch(() => {
        // silently ignore — fallback to silhouette avatars
      });
  }, [actor, isFetching]);

  const members = BASE_MEMBERS.map((m) => {
    if (m.dynamicKey === null && secretaryPhoto) {
      // Secretary uses static photo by default; override with backend photo if set
      return { ...m, photo: secretaryPhoto };
    }
    if (m.dynamicKey === "chairperson" && chairpersonPhoto) {
      return { ...m, photo: chairpersonPhoto };
    }
    if (m.dynamicKey === "treasurer" && treasurerPhoto) {
      return { ...m, photo: treasurerPhoto };
    }
    return m;
  });

  return (
    <Layout
      pageTitle="Our Team | MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN"
      pageDescription="Meet our dedicated team of professionals, field workers, and volunteers driving change across Bihar."
    >
      <SEO
        title="Our Team"
        description="Meet the leadership and field team of MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN — dedicated professionals working for environmental and social change in Bihar."
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-forest-green-900 py-24 md:py-32"
        data-ocid="team.hero"
      >
        <div
          className="absolute inset-0 opacity-10"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #A5D6A7 0%, transparent 50%), radial-gradient(circle at 80% 20%, #2E7D32 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Meet Our Team
          </h1>
          <p className="text-light-green-200 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            A small but committed group of field workers, coordinators, and
            community builders dedicated to building a greener Bihar — one
            village at a time.
          </p>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-12 md:h-16"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
              fill="#F9F6F0"
            />
          </svg>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream" data-ocid="team.page">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Leadership Team ──────────────────────────────────────────── */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-10">
              <div
                className="w-1 h-10 bg-forest-green-600 rounded-full"
                aria-hidden="true"
              />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
                Leadership Team
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 justify-center">
              {members.map((member, i) => (
                <div
                  key={member.name}
                  className="bg-card rounded-card shadow-card card-hover overflow-hidden"
                  data-ocid={`team.member_card.${i + 1}`}
                >
                  {/* Photo / Silhouette */}
                  <div className="flex justify-center pt-8 pb-4">
                    {member.photo ? (
                      <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-forest-green-200 shadow-md">
                        <img
                          src={member.photo}
                          alt={`Portrait of ${member.name}`}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    ) : (
                      <SilhouettePlaceholder gender={member.gender} size="lg" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-heading text-xl font-bold text-forest-green-900">
                        {member.name}
                      </h3>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-forest-green-600 hover:text-forest-green-800 transition-colors shrink-0 mt-1"
                        aria-label={`LinkedIn profile of ${member.name}`}
                        data-ocid={`team.member_linkedin.${i + 1}`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {member.title}
                    </span>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Field Team ───────────────────────────────────────────────── */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-10">
              <div
                className="w-1 h-10 bg-forest-green-600 rounded-full"
                aria-hidden="true"
              />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
                Field Team
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {FIELD_TEAM.map((member, i) => (
                <div
                  key={member.name}
                  className="bg-card rounded-card shadow-card card-hover p-6 flex items-center gap-5"
                  data-ocid={`team.field_member_card.${i + 1}`}
                >
                  <SilhouettePlaceholder gender={member.gender} size="sm" />

                  {/* Name + Designation */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="font-heading text-base font-bold text-forest-green-900 leading-snug">
                        {member.name}
                      </h3>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-forest-green-500 hover:text-forest-green-700 transition-colors shrink-0 mt-0.5"
                        aria-label={`LinkedIn profile of ${member.name}`}
                        data-ocid={`team.field_member_linkedin.${i + 1}`}
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    <p className="text-foreground/60 text-xs leading-snug mt-1">
                      {member.designation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join us */}
          <div className="mt-8 text-center bg-impact-green rounded-card p-10 shadow-card">
            <span className="text-4xl" aria-hidden="true">
              🌱
            </span>
            <h3 className="font-heading text-2xl font-bold text-forest-green-900 mt-3 mb-3">
              Join Our Mission
            </h3>
            <p className="text-foreground/70 max-w-lg mx-auto mb-6">
              We welcome volunteers, interns, and change-makers who share our
              passion for ecology and community development in Bihar.
            </p>
            <a
              href="/volunteer"
              className="inline-block bg-forest-green-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-forest-green-900 transition-colors"
              data-ocid="team.get_involved_button"
            >
              Volunteer With Us →
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
