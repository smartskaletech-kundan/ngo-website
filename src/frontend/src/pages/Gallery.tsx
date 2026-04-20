import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useState } from "react";
import { createActor } from "../backend";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import type { GalleryImage } from "../types/content";

// ── Types ──────────────────────────────────────────────────────────────────

type CategoryKey =
  | "all"
  | "plantation-drives"
  | "soil-erosion-control"
  | "community-development";

interface FilterDef {
  key: CategoryKey;
  label: string;
  emoji: string;
}

// ── Constants ──────────────────────────────────────────────────────────────

const FILTERS: FilterDef[] = [
  { key: "all", label: "All", emoji: "🖼️" },
  { key: "plantation-drives", label: "Plantation Drives", emoji: "🌱" },
  { key: "soil-erosion-control", label: "Soil Erosion Control", emoji: "🌾" },
  { key: "community-development", label: "Community Development", emoji: "🤝" },
];

const CATEGORY_LABEL: Record<string, string> = {
  "plantation-drives": "Plantation Drives",
  "soil-erosion-control": "Soil Erosion Control",
  "community-development": "Community Development",
};

const CATEGORY_EMOJI: Record<string, string> = {
  "plantation-drives": "🌱",
  "soil-erosion-control": "🌾",
  "community-development": "🤝",
};

const VALID_CATEGORIES = new Set([
  "plantation-drives",
  "soil-erosion-control",
  "community-development",
]);

// ── Helpers ────────────────────────────────────────────────────────────────

function resolveImageUrl(imageKey: string): string {
  if (imageKey.includes("://")) return imageKey;
  return `https://blob.caffeine.ai/${imageKey}`;
}

// ── Sub-components ────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="break-inside-avoid rounded-xl overflow-hidden mb-4 animate-pulse">
      <div className="w-full bg-muted rounded-xl" style={{ height: "220px" }} />
    </div>
  );
}

// Plantation Drive Photo Placeholder Card — shown only when 0 plantation-drives images exist
function PlantationPlaceholderCard() {
  return (
    <div
      className="break-inside-avoid mb-4"
      data-ocid="gallery.plantation_placeholder"
    >
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1B5E20 0%, #2E7D32 40%, #388E3C 70%, #43A047 100%)",
          minHeight: "240px",
        }}
      >
        {/* Decorative leaf pattern */}
        <div
          className="absolute inset-0 opacity-10"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #A5D6A7 0%, transparent 40%), radial-gradient(circle at 80% 70%, #81C784 0%, transparent 40%)",
          }}
        />
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 min-h-[240px]">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 border-2 border-white/30">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-white"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
          <span className="inline-flex items-center gap-1 bg-[#A5D6A7]/30 border border-[#A5D6A7]/50 text-[#A5D6A7] text-xs font-semibold px-3 py-1 rounded-full font-body mb-3">
            🌱 Plantation Drives
          </span>
          <h3 className="font-heading text-white font-bold text-base leading-snug mb-2">
            Real Plantation Drive Photo
            <br />
            Coming Soon
          </h3>
          <p className="text-white/70 text-xs font-body leading-relaxed max-w-[180px] mx-auto mb-4">
            Our field team will upload an actual photo from the next drive
          </p>
          <span className="inline-flex items-center gap-1.5 bg-white/20 border border-white/40 text-white text-xs font-semibold px-3 py-1.5 rounded-full font-body">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload via Admin Panel
          </span>
        </div>
        <div
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-sm"
          aria-hidden="true"
        >
          🌿
        </div>
      </div>
    </div>
  );
}

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const img = images[index];
  if (!img) return null;

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 w-full h-full max-w-none max-h-none p-0 m-0 border-0"
      data-ocid="gallery.lightbox"
      aria-label="Image lightbox"
    >
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        aria-label="Close lightbox"
        onClick={onClose}
      />
      <button
        type="button"
        onClick={onClose}
        data-ocid="gallery.lightbox_close_button"
        className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Close lightbox"
      >
        ✕
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        data-ocid="gallery.lightbox_prev_button"
        className="absolute left-2 md:left-6 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white text-2xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Previous image"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        data-ocid="gallery.lightbox_next_button"
        className="absolute right-2 md:right-6 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white text-2xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Next image"
      >
        ›
      </button>
      <div
        className="relative z-10 flex flex-col items-center max-w-5xl w-full mx-4 md:mx-16"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <img
          src={resolveImageUrl(img.imageKey)}
          alt={img.title}
          className="max-h-[75vh] max-w-full w-auto object-contain rounded-xl shadow-2xl"
        />
        <div className="mt-4 w-full max-w-2xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 bg-forest-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full font-body">
              {CATEGORY_EMOJI[img.category] ?? "🖼️"}{" "}
              {CATEGORY_LABEL[img.category] ?? img.category}
            </span>
            {img.location && (
              <span className="text-white/70 text-xs font-body">
                📍 {img.location}
              </span>
            )}
            {img.date && (
              <span className="text-white/60 text-xs font-body">
                📅 {img.date}
              </span>
            )}
          </div>
          <p className="text-white font-heading text-lg font-semibold leading-snug">
            {img.title}
          </p>
          {img.description && (
            <p className="text-white/75 font-body text-sm mt-1">
              {img.description}
            </p>
          )}
          <p className="text-white/40 text-xs font-body mt-3">
            {index + 1} / {images.length}
          </p>
        </div>
      </div>
    </dialog>
  );
}

function YouTubeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-8 h-8"
    >
      <path d="M23.498 6.186a2.985 2.985 0 0 0-2.101-2.117C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.397.524A2.985 2.985 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.985 2.985 0 0 0 2.101 2.117C4.495 20.455 12 20.455 12 20.455s7.505 0 9.397-.524a2.985 2.985 0 0 0 2.101-2.117C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function Gallery() {
  const { actor, isFetching } = useActor(createActor);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<CategoryKey>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isFetching || !actor) return;
    let cancelled = false;
    actor
      .listGalleryImages()
      .then((data) => {
        if (!cancelled) {
          // Only show images with valid categories
          setImages(data.filter((img) => VALID_CATEGORIES.has(img.category)));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [actor, isFetching]);

  // Filter images by active category
  const filteredImages =
    activeFilter === "all"
      ? images
      : images.filter((img) => img.category === activeFilter);

  // Count per category tab (from full backend set)
  const countFor = (key: CategoryKey) =>
    key === "all"
      ? images.length
      : images.filter((img) => img.category === key).length;

  // Show plantation placeholder only when there are 0 plantation-drives images
  const plantationCount = images.filter(
    (img) => img.category === "plantation-drives",
  ).length;
  const showPlaceholder =
    plantationCount === 0 &&
    (activeFilter === "all" || activeFilter === "plantation-drives");

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null
          ? (i - 1 + filteredImages.length) % filteredImages.length
          : 0,
      ),
    [filteredImages.length],
  );
  const nextImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i + 1) % filteredImages.length : 0,
      ),
    [filteredImages.length],
  );

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  // Fully empty gallery (no images at all, no placeholder applicable)
  const isFullyEmpty =
    !loading &&
    images.length === 0 &&
    activeFilter !== "all" &&
    activeFilter !== "plantation-drives";

  const isGloballyEmpty = !loading && images.length === 0;

  return (
    <Layout
      pageTitle="Gallery"
      pageDescription="A glimpse of our work — plantation drives, soil conservation, and community development across Bihar."
    >
      <SEO
        title="Gallery"
        description="View photos from MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN's programs — plantation drives, soil erosion control, and community development in Bihar."
      />

      {/* ── Hero Banner ──────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: "45vh" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600')",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(15,50,20,0.72) 60%, rgba(0,0,0,0.85) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-16">
          <p className="font-body text-sm uppercase tracking-widest text-green-300 mb-3">
            Our Gallery
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-5">
            Field Work in Pictures
          </h1>
          <p className="font-body text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            From Bihar's paddy fields to village panchayat grounds — documenting
            our work in plantation, soil conservation, and community building.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-full"
          >
            <path
              d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z"
              fill="#F9F6F0"
            />
          </svg>
        </div>
      </section>

      {/* ── Filter Bar + Masonry Grid ────────────────────────────── */}
      <section
        className="py-10 md:py-14"
        style={{ backgroundColor: "#F9F6F0" }}
        data-ocid="gallery.page"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter bar */}
          <div
            className="mb-8 overflow-x-auto pb-2"
            data-ocid="gallery.filter_tabs"
          >
            <div className="flex flex-nowrap gap-2 justify-start md:justify-center min-w-max md:min-w-0">
              {FILTERS.map((f) => {
                const count = countFor(f.key);
                const isActive = activeFilter === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setActiveFilter(f.key)}
                    data-ocid={`gallery.filter_${f.key}_tab`}
                    className={`
                      inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold font-body
                      border transition-all duration-200 whitespace-nowrap focus-visible:outline-2
                      focus-visible:outline-forest-green-800
                      ${
                        isActive
                          ? "bg-forest-green-800 text-white border-forest-green-800 shadow-md"
                          : "bg-white text-forest-green-800 border-forest-green-600 hover:bg-forest-green-50"
                      }
                    `}
                  >
                    <span aria-hidden="true">{f.emoji}</span>
                    {f.label}
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full font-body ${isActive ? "bg-white/20 text-white" : "bg-forest-green-100 text-forest-green-800"}`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count */}
          {!loading && filteredImages.length > 0 && (
            <p className="font-body text-sm text-muted-foreground mb-6 text-center md:text-left">
              Showing{" "}
              <span className="font-semibold text-forest-green-800">
                {filteredImages.length}
              </span>{" "}
              photos
              {activeFilter !== "all" && (
                <>
                  {" "}
                  in{" "}
                  <span className="font-semibold text-forest-green-800">
                    {CATEGORY_LABEL[activeFilter]}
                  </span>
                </>
              )}
            </p>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => (
                <SkeletonCard key={k} />
              ))}
            </div>
          )}

          {/* Global empty state — no images at all */}
          {isGloballyEmpty && (
            <div className="text-center py-20" data-ocid="gallery.empty_state">
              <div className="text-6xl mb-5">📸</div>
              <h3 className="font-heading text-2xl font-semibold text-forest-green-800 mb-3">
                Our gallery is growing
              </h3>
              <p className="font-body text-muted-foreground max-w-md mx-auto leading-relaxed">
                Check back as our field team adds photos from our plantation
                drives and community activities across Bihar's 6 districts.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-forest-green-100 border border-forest-green-300 text-forest-green-800 text-sm font-semibold px-5 py-2.5 rounded-full">
                🌱 Photos from field are on the way
              </div>
            </div>
          )}

          {/* Per-category empty state (not plantation, not globally empty) */}
          {isFullyEmpty && (
            <div className="text-center py-20" data-ocid="gallery.empty_state">
              <div className="text-6xl mb-4">🌿</div>
              <h3 className="font-heading text-xl font-semibold text-forest-green-800 mb-2">
                No images in this category yet
              </h3>
              <p className="font-body text-muted-foreground">
                Check back soon — we're uploading photos from our latest field
                activities!
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-green-800 text-white font-body text-sm font-semibold hover:bg-forest-green-700 transition-all duration-200"
              >
                View all photos
              </button>
            </div>
          )}

          {/* Masonry Grid */}
          {!loading && !isGloballyEmpty && !isFullyEmpty && (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {/* Plantation placeholder first — only when 0 plantation images */}
              {showPlaceholder && <PlantationPlaceholderCard />}
              {filteredImages.map((img, i) => (
                <button
                  key={String(img.id)}
                  type="button"
                  className="break-inside-avoid relative group rounded-xl overflow-hidden mb-4 w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-forest-green-800 shadow-sm hover:shadow-lg transition-all duration-300"
                  onClick={() => openLightbox(i)}
                  data-ocid={`gallery.item.${i + 1}`}
                  aria-label={`View: ${img.title}`}
                >
                  <img
                    src={resolveImageUrl(img.imageKey)}
                    alt={img.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)",
                    }}
                    aria-hidden="true"
                  >
                    <div className="p-3 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-flex items-center gap-1 bg-forest-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5 font-body">
                        {CATEGORY_EMOJI[img.category] ?? "🖼️"}{" "}
                        {CATEGORY_LABEL[img.category] ?? img.category}
                      </span>
                      <p className="text-white text-sm font-semibold font-body leading-snug line-clamp-2">
                        {img.title}
                      </p>
                      {img.location && (
                        <p className="text-white/70 text-xs font-body mt-0.5">
                          📍 {img.location}
                        </p>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-sm">
                      🔍
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Videos Section ──────────────────────────────────────── */}
      <section
        className="py-12 md:py-16 bg-white"
        data-ocid="gallery.videos_section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="font-body text-sm uppercase tracking-widest text-forest-green-600 mb-2">
              Watch Our Work
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
              Videos
            </h2>
          </div>
          <div
            className="border-2 border-forest-green-300 rounded-2xl p-10 md:p-14 text-center bg-forest-green-50"
            data-ocid="gallery.videos_placeholder"
          >
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <YouTubeIcon />
              </div>
            </div>
            <h3 className="font-heading text-xl font-bold text-forest-green-900 mb-3">
              Video Documentation Coming Soon
            </h3>
            <p className="font-body text-forest-green-700 text-base max-w-xl mx-auto mb-6 leading-relaxed">
              Video documentation of our field work is coming soon. We are
              recording plantation drives, community meetings, and soil
              conservation activities across Bihar's 6 districts.
            </p>
            <p className="font-body text-muted-foreground text-sm mb-6">
              Subscribe to our YouTube channel for updates on field activities,
              success stories, and impact reports.
            </p>
            <a
              href="https://www.youtube.com/@anumayasansthan"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="gallery.youtube_subscribe_link"
              aria-label="Subscribe to YouTube channel"
              className="inline-flex items-center gap-2.5 bg-red-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-red-700 transition-colors duration-200 text-sm"
            >
              <YouTubeIcon />
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </Layout>
  );
}
