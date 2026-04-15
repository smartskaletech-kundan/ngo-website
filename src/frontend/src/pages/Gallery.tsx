import { useActor } from "@caffeineai/core-infrastructure";
import { useEffect, useState } from "react";
import { createActor } from "../backend";
import Layout from "../components/Layout";
import type { GalleryImage } from "../types/content";

type FilterType =
  | "All"
  | "Plantation Drives"
  | "Waste Management"
  | "Awareness Campaigns"
  | "Events & Workshops";

const FILTERS: FilterType[] = [
  "All",
  "Plantation Drives",
  "Waste Management",
  "Awareness Campaigns",
  "Events & Workshops",
];

// Category → emoji label
const CATEGORY_EMOJI: Record<string, string> = {
  "Plantation Drives": "🌱",
  "Waste Management": "♻️",
  "Awareness Campaigns": "📢",
  "Events & Workshops": "🎤",
};

// Fallback static images (Unsplash) shown when backend has no images yet
const FALLBACK_IMAGES: GalleryImage[] = [
  {
    id: 1n,
    title: "Tree Plantation Drive — Nalanda",
    description:
      "Community volunteers plant native saplings across degraded land in Nalanda district.",
    category: "Plantation Drives",
    date: "2024-03-10",
    location: "Nalanda, Bihar",
    imageKey:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
    uploadedAt: 0n,
  },
  {
    id: 2n,
    title: "Soil Conservation Work",
    description:
      "Contour bunding and afforestation to prevent soil erosion in agricultural land.",
    category: "Plantation Drives",
    date: "2024-02-20",
    location: "Vaishali, Bihar",
    imageKey:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    uploadedAt: 0n,
  },
  {
    id: 3n,
    title: "Community Awareness Session",
    description:
      "Village-level awareness program on waste segregation and recycling best practices.",
    category: "Awareness Campaigns",
    date: "2024-01-15",
    location: "Muzaffarpur, Bihar",
    imageKey:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    uploadedAt: 0n,
  },
  {
    id: 4n,
    title: "Tree Nursery Preparation",
    description:
      "Preparing native saplings for the upcoming plantation season.",
    category: "Plantation Drives",
    date: "2023-12-05",
    location: "Patna, Bihar",
    imageKey:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80",
    uploadedAt: 0n,
  },
  {
    id: 5n,
    title: "Waste Management Workshop",
    description:
      "Training eco-champions on composting and organic waste utilisation.",
    category: "Waste Management",
    date: "2024-03-22",
    location: "Patna, Bihar",
    imageKey:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80",
    uploadedAt: 0n,
  },
  {
    id: 6n,
    title: "Annual Environment Summit",
    description:
      "Annual gathering of environmental volunteers and NGO partners.",
    category: "Events & Workshops",
    date: "2024-01-28",
    location: "Patna, Bihar",
    imageKey:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    uploadedAt: 0n,
  },
  {
    id: 7n,
    title: "Village Clean-Up Drive",
    description: "Door-to-door waste collection campaign across 5 panchayats.",
    category: "Waste Management",
    date: "2023-11-18",
    location: "Muzaffarpur, Bihar",
    imageKey:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    uploadedAt: 0n,
  },
  {
    id: 8n,
    title: "Children Eco-Education Program",
    description:
      "Engaging school children in environmental awareness activities.",
    category: "Awareness Campaigns",
    date: "2023-10-10",
    location: "Nalanda, Bihar",
    imageKey:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
    uploadedAt: 0n,
  },
];

function resolveImageUrl(imageKey: string): string {
  if (imageKey.includes("://")) return imageKey;
  return `https://blob.caffeine.ai/${imageKey}`;
}

function SkeletonCard() {
  return (
    <div className="break-inside-avoid rounded-2xl overflow-hidden shadow-card bg-card animate-pulse mb-4">
      <div className="w-full bg-muted" style={{ height: "220px" }} />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-2/3" />
      </div>
    </div>
  );
}

export default function Gallery() {
  const { actor, isFetching } = useActor(createActor);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [lightboxImg, setLightboxImg] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (isFetching || !actor) return;
    let cancelled = false;
    actor
      .listGalleryImages()
      .then((data) => {
        if (!cancelled) {
          setImages(data.length > 0 ? data : FALLBACK_IMAGES);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setImages(FALLBACK_IMAGES);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [actor, isFetching]);

  const filtered =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);

  return (
    <Layout
      pageTitle="Gallery"
      pageDescription="Moments from our work — plantation drives, community programs, and field activities."
    >
      {/* Hero banner */}
      <section
        className="relative py-16 md:py-24"
        style={{
          background:
            "linear-gradient(135deg, rgba(46,125,50,0.92), rgba(109,76,65,0.7)), url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80') center/cover no-repeat",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow">
            Photo Gallery
          </h1>
          <p className="font-body text-white/85 text-lg max-w-2xl mx-auto">
            Glimpses from our plantation drives, waste management campaigns,
            community events, and awareness programs across Bihar.
          </p>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-full"
          >
            <path
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
              fill="var(--color-cream, #F9F6F0)"
            />
          </svg>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-cream" data-ocid="gallery.page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div
            className="flex flex-wrap gap-2 mb-10 justify-center"
            data-ocid="gallery.filter_tabs"
          >
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                data-ocid={`gallery.filter_${filter.toLowerCase().replace(/[\s&/]+/g, "_")}_tab`}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 font-body ${
                  activeFilter === filter
                    ? "bg-forest-green-800 text-white shadow-card"
                    : "bg-card border border-border text-foreground hover:border-forest-green-400 hover:text-forest-green-800"
                }`}
              >
                {CATEGORY_EMOJI[filter] ?? "🖼️"} {filter}
              </button>
            ))}
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {(["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"] as const).map(
                (k) => (
                  <SkeletonCard key={k} />
                ),
              )}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-20" data-ocid="gallery.empty_state">
              <div className="text-6xl mb-4">🌿</div>
              <h3 className="font-heading text-xl font-semibold text-forest-green-800 mb-2">
                No images yet
              </h3>
              <p className="font-body text-muted-foreground">
                Check back soon — we're uploading photos from our latest
                activities!
              </p>
            </div>
          )}

          {/* Masonry grid */}
          {!loading && filtered.length > 0 && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {filtered.map((img, i) => (
                <button
                  key={String(img.id)}
                  type="button"
                  className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-card w-full text-left mb-4 focus-visible:outline-2 focus-visible:outline-forest-green-800"
                  onClick={() => setLightboxImg(img)}
                  data-ocid={`gallery.item.${i + 1}`}
                  aria-label={`View image: ${img.title}`}
                >
                  <img
                    src={resolveImageUrl(img.imageKey)}
                    alt={img.title}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-forest-green-900/0 group-hover:bg-forest-green-900/55 transition-all duration-300 flex items-end">
                    <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full">
                      <span className="inline-block bg-light-green text-forest-green-900 text-xs font-semibold px-2 py-0.5 rounded-full mb-1 font-body">
                        {CATEGORY_EMOJI[img.category] ?? ""} {img.category}
                      </span>
                      <p className="text-white text-sm font-medium font-body leading-snug line-clamp-2">
                        {img.title}
                      </p>
                      {img.location && (
                        <p className="text-white/70 text-xs font-body mt-0.5">
                          📍 {img.location}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          data-ocid="gallery.lightbox"
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 w-full h-full cursor-default"
            aria-label="Close lightbox"
            onClick={() => setLightboxImg(null)}
          />
          <div className="relative max-w-4xl w-full z-10">
            <button
              type="button"
              onClick={() => setLightboxImg(null)}
              data-ocid="gallery.lightbox_close_button"
              className="absolute -top-10 right-0 text-white text-3xl hover:text-light-green transition-colors font-body leading-none"
              aria-label="Close lightbox"
            >
              ×
            </button>
            <img
              src={resolveImageUrl(lightboxImg.imageKey)}
              alt={lightboxImg.title}
              className="w-full rounded-2xl shadow-card max-h-[75vh] object-contain"
            />
            <div className="mt-4 bg-card/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-light-green text-forest-green-900 text-xs font-semibold px-3 py-1 rounded-full font-body">
                  {CATEGORY_EMOJI[lightboxImg.category] ?? ""}{" "}
                  {lightboxImg.category}
                </span>
                {lightboxImg.date && (
                  <span className="text-white/70 text-xs font-body">
                    📅 {lightboxImg.date}
                  </span>
                )}
                {lightboxImg.location && (
                  <span className="text-white/70 text-xs font-body">
                    📍 {lightboxImg.location}
                  </span>
                )}
              </div>
              <p className="text-white font-heading text-lg font-semibold">
                {lightboxImg.title}
              </p>
              {lightboxImg.description && (
                <p className="text-white/80 font-body text-sm mt-1">
                  {lightboxImg.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
