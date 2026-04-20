import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";
import type { ProgramContent, SuccessStory } from "../backend.d";
import Layout from "../components/Layout";
import { getProgramById } from "../data/programs";
import type { Program } from "../data/programs";

/* ── Avatar helpers ───────────────────────────────────────────────────────── */
function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = [
  "bg-forest-green-600",
  "bg-earth-brown-600",
  "bg-forest-green-800",
  "bg-earth-brown-800",
  "bg-forest-green-500",
];

/* ── Badge color map ──────────────────────────────────────────────────────── */
const BADGE_COLOR: Record<string, string> = {
  "plantation-drives": "bg-emerald-600",
  "soil-erosion-control": "bg-amber-600",
  "community-development": "bg-forest-green-700",
};

const BADGE_LABEL: Record<string, string> = {
  "plantation-drives": "Core Initiative",
  "soil-erosion-control": "Environmental Work",
  "community-development": "Social Initiative",
};

/* ── Derived stat icons ───────────────────────────────────────────────────── */
const STAT_ICONS: string[] = ["🌳", "🌾", "🏛️"];

/* ── Skeleton ─────────────────────────────────────────────────────────────── */
function SkeletonProgramDetail() {
  return (
    <Layout>
      <div className="animate-pulse">
        <div className="min-h-[65vh] bg-forest-green-100" />
        <div className="py-12 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 grid sm:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-card rounded-xl h-28 shadow-md" />
            ))}
          </div>
        </div>
        <div className="py-16 bg-cream">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
            <div className="h-8 bg-forest-green-100 rounded w-1/2" />
            <div className="h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-4/5" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* ── Main Component ───────────────────────────────────────────────────────── */
export default function ProgramDetail() {
  const { programId } = useParams({ strict: false }) as { programId: string };
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);

  const staticProgram = getProgramById(programId);

  const [backendContent, setBackendContent] = useState<ProgramContent | null>(
    null,
  );
  const [backendStories, setBackendStories] = useState<SuccessStory[] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;

    let cancelled = false;
    async function fetchData() {
      if (!actor) return;
      try {
        const [content, stories] = await Promise.all([
          actor.getProgramContent(programId),
          actor.listSuccessStoriesByProgram(programId),
        ]);
        if (!cancelled) {
          setBackendContent(content);
          setBackendStories(stories.length > 0 ? stories : null);
        }
      } catch {
        // fall back to static data silently
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [actor, isFetching, programId]);

  // Redirect unknown programs
  useEffect(() => {
    if (!loading && !staticProgram && !backendContent) {
      navigate({ to: "/projects" });
    }
  }, [loading, staticProgram, backendContent, navigate]);

  if (loading && !staticProgram) return <SkeletonProgramDetail />;
  if (!loading && !staticProgram && !backendContent) return null;

  // Merge: backend content takes priority, fallback to static
  const program = staticProgram as Program;
  const name = backendContent?.name ?? program?.name ?? "";
  const tagline = backendContent?.tagline ?? program?.tagline ?? "";
  const description = backendContent?.description ?? program?.description ?? "";
  const heroImage = backendContent?.heroImage ?? program?.heroImage ?? "";

  // Stats: prefer backend if available
  const stats = backendContent
    ? [
        {
          label: backendContent.stat1Label,
          value: backendContent.stat1Value,
          icon: STAT_ICONS[0],
        },
        {
          label: backendContent.stat2Label,
          value: backendContent.stat2Value,
          icon: STAT_ICONS[1],
        },
        {
          label: backendContent.stat3Label,
          value: backendContent.stat3Value,
          icon: STAT_ICONS[2],
        },
      ]
    : (program?.stats ?? []);

  // How it works: prefer backend text array
  const howItWorksRaw: string[] = backendContent?.howItWorks ?? [];
  const howItWorks =
    howItWorksRaw.length > 0
      ? howItWorksRaw.map((text, i) => ({
          step: i + 1,
          title: `Step ${i + 1}`,
          description: text,
        }))
      : (program?.howItWorks ?? []);

  const badgeClass = BADGE_COLOR[programId] ?? "bg-forest-green-700";
  const badge = BADGE_LABEL[programId] ?? "Initiative";

  return (
    <Layout>
      <div data-ocid="program_detail.page">
        {/* ── SECTION 1: HERO BANNER ──────────────────────────────────────── */}
        <section
          className="relative min-h-[65vh] flex flex-col justify-end overflow-hidden"
          data-ocid="program_detail.hero"
        >
          <img
            src={heroImage}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80"
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-16 pt-24">
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-white text-sm font-semibold uppercase tracking-widest mb-6 ${badgeClass}`}
            >
              {badge}
            </span>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              {name}
            </h1>

            <p className="text-white/85 text-lg sm:text-xl font-medium max-w-2xl drop-shadow">
              {tagline}
            </p>

            <nav
              aria-label="Breadcrumb"
              className="mt-10 flex items-center gap-1.5 text-white/60 text-sm"
              data-ocid="program_detail.breadcrumb"
            >
              <Link
                to="/"
                className="hover:text-white transition-colors duration-150"
                data-ocid="program_detail.breadcrumb_home"
              >
                Home
              </Link>
              <ChevronRight size={14} aria-hidden="true" />
              <Link
                to="/projects"
                className="hover:text-white transition-colors duration-150"
                data-ocid="program_detail.breadcrumb_programs"
              >
                Programs
              </Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="text-white/90 font-medium truncate">{name}</span>
            </nav>
          </div>
        </section>

        {/* ── SECTION 2: KEY STATS ROW ────────────────────────────────────── */}
        <section
          className="py-12 bg-background"
          data-ocid="program_detail.stats"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-xl shadow-md p-6 text-center border border-border/60 hover:shadow-lg transition-shadow duration-200"
                  data-ocid={`program_detail.stat.${i + 1}`}
                >
                  <div className="text-3xl mb-3" aria-hidden="true">
                    {stat.icon}
                  </div>
                  <div className="font-heading text-3xl md:text-4xl font-bold text-forest-green-700 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm font-medium leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: PROGRAM DESCRIPTION ─────────────────────────────── */}
        <section
          className="py-16 bg-cream"
          data-ocid="program_detail.description"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900 mb-8">
              About This Program
            </h2>
            {description.split("\n\n").map((para) => (
              <p
                key={para.slice(0, 40)}
                className="text-base md:text-lg text-foreground/75 leading-relaxed mb-6 last:mb-0"
              >
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* ── SECTION 4: HOW IT WORKS ─────────────────────────────────────── */}
        {howItWorks.length > 0 && (
          <section
            className="py-16 bg-card"
            data-ocid="program_detail.how_it_works"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900 mb-12 text-center">
                How It Works
              </h2>

              <div className="relative">
                <div
                  className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-forest-green-200"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
                  {howItWorks.slice(0, 4).map((step, i) => (
                    <div
                      key={step.step}
                      className="flex flex-col items-center text-center relative"
                      data-ocid={`program_detail.step.${i + 1}`}
                    >
                      <div className="w-16 h-16 rounded-full bg-forest-green-600 text-white flex items-center justify-center font-heading font-bold text-xl mb-4 shadow-lg relative z-10 flex-shrink-0">
                        {step.step}
                      </div>
                      <h3 className="font-semibold text-forest-green-900 text-base mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>

                      {i < howItWorks.slice(0, 4).length - 1 && (
                        <div
                          className="md:hidden mt-4 text-forest-green-300"
                          aria-hidden="true"
                        >
                          <ArrowRight size={20} className="rotate-90" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── SECTION 5: SUCCESS STORIES ──────────────────────────────────── */}
        <section
          className="py-16 bg-cream"
          data-ocid="program_detail.success_stories"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900 mb-3">
                Stories of Change
              </h2>
              <p className="text-muted-foreground text-base max-w-xl mx-auto">
                Real voices from the communities we serve across Bihar.
              </p>
            </div>

            {/* Backend stories */}
            {backendStories && backendStories.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {backendStories.map((story, i) => (
                  <div
                    key={String(story.id)}
                    className="bg-card rounded-xl shadow-md p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-200"
                    data-ocid={`program_detail.story.${i + 1}`}
                  >
                    <div
                      className="text-6xl leading-none font-heading text-light-green-300 select-none -mb-2"
                      aria-hidden="true"
                    >
                      "
                    </div>
                    <p className="text-foreground/75 text-base leading-relaxed flex-1">
                      {story.storyText}
                    </p>
                    <div className="flex items-center gap-3 mt-2 pt-4 border-t border-border/50">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                        aria-hidden="true"
                      >
                        {getInitials(story.beneficiaryName)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-forest-green-800 text-sm truncate">
                          {story.beneficiaryName}
                        </p>
                        <p className="text-muted-foreground text-xs truncate">
                          {story.location}
                        </p>
                      </div>
                      <span className="ml-auto flex-shrink-0 text-xs px-2.5 py-1 rounded-full bg-forest-green-50 text-forest-green-700 font-medium border border-forest-green-200">
                        {badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : program?.stories && program.stories.length > 0 ? (
              /* Static fallback stories */
              <div className="grid md:grid-cols-2 gap-6">
                {program.stories.map((story, i) => (
                  <div
                    key={story.name}
                    className="bg-card rounded-xl shadow-md p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-200"
                    data-ocid={`program_detail.story.${i + 1}`}
                  >
                    <div
                      className="text-6xl leading-none font-heading text-light-green-300 select-none -mb-2"
                      aria-hidden="true"
                    >
                      "
                    </div>
                    <p className="text-foreground/75 text-base leading-relaxed flex-1">
                      {story.story}
                    </p>
                    <div className="flex items-center gap-3 mt-2 pt-4 border-t border-border/50">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                        aria-hidden="true"
                      >
                        {getInitials(story.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-forest-green-800 text-sm truncate">
                          {story.name}
                        </p>
                        <p className="text-muted-foreground text-xs truncate">
                          {story.location}
                        </p>
                      </div>
                      <span className="ml-auto flex-shrink-0 text-xs px-2.5 py-1 rounded-full bg-forest-green-50 text-forest-green-700 font-medium border border-forest-green-200">
                        {badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="text-center py-12 text-muted-foreground"
                data-ocid="program_detail.stories.empty_state"
              >
                <p className="text-base">
                  Community stories coming soon as our work grows.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── SECTION 6: PHOTO GALLERY ────────────────────────────────────── */}
        {program?.gallery && program.gallery.length > 0 && (
          <section className="py-16 bg-card" data-ocid="program_detail.gallery">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="mb-10 text-center">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900 mb-3">
                  Program Gallery
                </h2>
                <p className="text-muted-foreground text-base max-w-xl mx-auto">
                  Glimpses from the field — communities, volunteers, and impact
                  in action.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {program.gallery.map((item, i) => (
                  <div
                    key={item.url}
                    className="group relative overflow-hidden rounded-lg cursor-default"
                    data-ocid={`program_detail.gallery_image.${i + 1}`}
                  >
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-48 object-cover transition-transform duration-400 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm font-medium leading-snug">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── SECTION 7: CTA FOOTER BAND ──────────────────────────────────── */}
        <section
          className="py-16 bg-forest-green-700"
          data-ocid="program_detail.cta"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Support Our Work
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-10 max-w-xl mx-auto">
              Your contribution makes a direct impact on the ground in Bihar's
              rural communities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-white hover:bg-muted text-forest-green-800 px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                data-ocid="program_detail.donate_button"
              >
                Donate Now <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                to="/volunteer"
                className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-200"
                data-ocid="program_detail.volunteer_button"
              >
                Join as Volunteer
              </Link>
            </div>
          </div>
        </section>

        {/* Back nav */}
        <div className="bg-background py-6 border-t border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-forest-green-700 hover:text-forest-green-900 font-medium text-sm transition-colors duration-150"
              data-ocid="program_detail.back_link"
            >
              ← Back to All Programs
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
