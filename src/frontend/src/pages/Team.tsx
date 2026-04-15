import { useActor } from "@caffeineai/core-infrastructure";
import { useEffect, useState } from "react";
import { createActor } from "../backend";
import Layout from "../components/Layout";

function resolveImageUrl(imageKey: string): string {
  if (imageKey.includes("://")) return imageKey;
  return `https://blob.caffeine.ai/${imageKey}`;
}

const BASE_MEMBERS = [
  {
    name: "Dr. Nirmal Kumar Singh",
    title: "Secretary, Anumaya Sansthan",
    initials: "NS",
    color: "bg-forest-green-700",
    bio: "Dr. Nirmal Kumar Singh brings decades of experience in social development and community mobilization. He oversees day-to-day operations, field programs, and NGO governance.",
    photo: "/assets/secretary.jpeg" as string | null,
    dynamicKey: null as "chairperson" | "treasurer" | null,
  },
  {
    name: "Mrs. Anu Kumari Singh",
    title: "Chairperson, Anumaya Sansthan",
    initials: "AK",
    color: "bg-earth-brown",
    bio: "Mrs. Anu Kumari Singh is the founding Chairperson whose vision shaped the organization. She leads strategic planning, partnerships, and the mission direction of the NGO.",
    photo: null as string | null,
    dynamicKey: "chairperson" as "chairperson" | "treasurer" | null,
  },
  {
    name: "Mrs. Sweety Kumari",
    title: "Treasurer, Anumaya Sansthan",
    initials: "SK",
    color: "bg-teal-600",
    bio: "Mrs. Sweety Kumari manages financial operations, donor funds, and ensures complete transparency in all financial reporting for the organization.",
    photo: null as string | null,
    dynamicKey: "treasurer" as "chairperson" | "treasurer" | null,
  },
];

export default function Team() {
  const { actor, isFetching } = useActor(createActor);
  const [chairpersonPhoto, setChairpersonPhoto] = useState<string | null>(null);
  const [treasurerPhoto, setTreasurerPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getAdminSettings()
      .then((settings) => {
        if (settings.chairpersonPhotoKey) {
          setChairpersonPhoto(resolveImageUrl(settings.chairpersonPhotoKey));
        }
        if (settings.treasurerPhotoKey) {
          setTreasurerPhoto(resolveImageUrl(settings.treasurerPhotoKey));
        }
      })
      .catch(() => {
        // silently ignore — fallback to initials avatars
      });
  }, [actor, isFetching]);

  const members = BASE_MEMBERS.map((m) => {
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
      pageTitle="Our Leadership"
      pageDescription="Dedicated individuals driving change for communities and nature."
    >
      <section className="py-16 md:py-24 bg-cream" data-ocid="team.page">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 justify-center">
            {members.map((member, i) => (
              <div
                key={member.name}
                className="bg-card rounded-card shadow-card card-hover overflow-hidden"
                data-ocid={`team.member_card.${i + 1}`}
              >
                {/* Photo / Avatar */}
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
                    <div
                      className={`${member.color} w-32 h-32 rounded-full flex items-center justify-center ring-4 ring-white shadow-md`}
                    >
                      <span className="font-heading text-white text-3xl font-bold">
                        {member.initials}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-forest-green-900 mb-1">
                    {member.name}
                  </h3>
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

          {/* Join us */}
          <div className="mt-16 text-center bg-impact-green rounded-card p-10 shadow-card">
            <span className="text-4xl">🌱</span>
            <h3 className="font-heading text-2xl font-bold text-forest-green-900 mt-3 mb-3">
              Join Our Mission
            </h3>
            <p className="text-foreground/70 max-w-lg mx-auto mb-6">
              We welcome volunteers, interns, and change-makers who share our
              passion for ecology and community development.
            </p>
            <a
              href="/get-involved"
              className="inline-block bg-forest-green-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-forest-green-900 transition-colors"
              data-ocid="team.get_involved_button"
            >
              Get Involved →
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
