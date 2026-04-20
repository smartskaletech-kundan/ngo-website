import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createActor } from "../backend";
import type { BlogPost } from "../backend.d.ts";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Skeleton } from "../components/ui/skeleton";

// ── Types ────────────────────────────────────────────────────────────────────

type Category =
  | "All"
  | "Field Stories"
  | "Volunteer Experiences"
  | "Impact Reports"
  | "Press";

const CATEGORIES: Category[] = [
  "All",
  "Field Stories",
  "Volunteer Experiences",
  "Impact Reports",
  "Press",
];

// ── Sub-components ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="blog-card">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
  onOpen: (post: BlogPost) => void;
}

function BlogCard({ post, index, onOpen }: BlogCardProps) {
  const fallbackImg =
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80";

  return (
    <article
      className="blog-card flex flex-col h-full animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      data-ocid={`blog.item.${index + 1}`}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={post.imageUrl || fallbackImg}
          alt={post.title}
          className="w-full h-full object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImg;
          }}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="inline-block bg-forest-green-800 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
          {post.category}
        </span>
        <h3 className="font-heading text-lg font-semibold text-forest-green-900 mb-2 line-clamp-2 leading-snug">
          {post.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
          <span className="flex items-center gap-1">
            <span className="font-medium text-foreground truncate max-w-[120px]">
              {post.author}
            </span>
            <span>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
          </span>
          <button
            type="button"
            onClick={() => onOpen(post)}
            className="text-forest-green-700 font-semibold hover:text-forest-green-900 transition-colors flex items-center gap-0.5 whitespace-nowrap"
            data-ocid={`blog.read_more_button.${index + 1}`}
          >
            Read More →
          </button>
        </div>
      </div>
    </article>
  );
}

interface PostModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

function PostModal({ post, onClose }: PostModalProps) {
  if (!post) return null;

  const fallbackImg =
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80";

  return (
    <Dialog open={!!post} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-3xl max-h-[90vh] overflow-y-auto p-0"
        data-ocid="blog.dialog"
      >
        <div className="relative">
          <img
            src={post.imageUrl || fallbackImg}
            alt={post.title}
            className="w-full h-56 object-cover rounded-t-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImg;
            }}
          />
        </div>
        <div className="p-6 md:p-8">
          <DialogHeader className="mb-4">
            <span className="inline-block bg-forest-green-800 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
              {post.category}
            </span>
            <DialogTitle className="font-heading text-2xl md:text-3xl font-bold text-forest-green-900 leading-tight text-left">
              {post.title}
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-2 text-left">
              By{" "}
              <span className="font-medium text-foreground">{post.author}</span>{" "}
              ·{" "}
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </p>
          </DialogHeader>
          <div className="prose prose-sm max-w-none text-foreground font-body leading-relaxed">
            {post.content.split("\n\n").map((para) => {
              const paraKey = para.slice(0, 40);
              if (para.startsWith("**") && para.endsWith("**")) {
                return (
                  <h4
                    key={`heading-${paraKey}`}
                    className="font-heading font-bold text-forest-green-900 mt-5 mb-2"
                  >
                    {para.replace(/\*\*/g, "")}
                  </h4>
                );
              }
              if (para.startsWith("- ")) {
                const items = para
                  .split("\n")
                  .filter((l) => l.startsWith("- "));
                return (
                  <ul
                    key={`list-${paraKey}`}
                    className="list-disc list-inside space-y-1 text-sm mb-3"
                  >
                    {items.map((item) => (
                      <li key={`item-${item.slice(0, 30)}`}>
                        {item.replace("- ", "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={`para-${paraKey}`}
                  className="text-sm mb-3 text-foreground/90"
                >
                  {para}
                </p>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Newsletter CTA ────────────────────────────────────────────────────────────

function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { actor } = useActor(createActor);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !actor) return;
    setStatus("loading");
    try {
      const result = await actor.subscribeNewsletter(email.trim());
      if (result.__kind__ === "ok") {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section
      className="bg-forest-green-800 py-16 px-4 text-center relative overflow-hidden"
      data-ocid="blog.newsletter_section"
    >
      {/* decorative wave top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none rotate-180">
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 fill-cream"
          aria-hidden="true"
        >
          <path d="M0,24 C480,48 960,0 1440,24 L1440,48 L0,48 Z" />
        </svg>
      </div>

      <div className="max-w-xl mx-auto relative">
        <div className="text-4xl mb-4">📬</div>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
          Get Our Stories Delivered
        </h2>
        <p className="text-white/80 font-body text-sm mb-8">
          Field stories, volunteer spotlights, and impact updates — straight to
          your inbox.
        </p>

        {status === "success" ? (
          <div
            className="bg-light-green/20 border border-light-green text-white rounded-xl px-6 py-4 text-sm font-medium"
            data-ocid="blog.newsletter.success_state"
          >
            ✅ You're subscribed! Welcome to the MAYA SAMAJIK UTTHAN EVAM
            PARAMARSH SANSTHAN community.
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              data-ocid="blog.newsletter.email_input"
              className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-light-green font-body"
            />
            <button
              type="submit"
              disabled={status === "loading" || !email.trim()}
              data-ocid="blog.newsletter.submit_button"
              className="px-7 py-3 bg-light-green text-forest-green-900 font-bold rounded-xl hover:bg-white transition-colors disabled:opacity-60 font-body whitespace-nowrap"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p
            className="text-red-300 text-xs mt-2"
            data-ocid="blog.newsletter.error_state"
          >
            Something went wrong. Please try again.
          </p>
        )}
        <p className="text-white/50 text-xs mt-4">
          We respect your privacy. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [openPost, setOpenPost] = useState<BlogPost | null>(null);
  const { actor, isFetching: isActorLoading } = useActor(createActor);

  // Fetch ONLY from backend — no hardcoded fallback
  const { data: allPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      if (!actor) return [];
      // listBlogPosts returns only published posts
      return actor.listBlogPosts();
    },
    enabled: !!actor && !isActorLoading,
  });

  const filteredPosts =
    selectedCategory === "All"
      ? allPosts
      : allPosts.filter((p) => p.category === selectedCategory);

  return (
    <Layout
      pageTitle="Stories of Change"
      pageDescription="Field stories, volunteer experiences, and impact from our work in Bihar"
    >
      <SEO
        title="Blog"
        description="Read stories, updates, and insights from MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN's plantation drives, soil conservation work, and community programs across Bihar."
      />

      {/* ── Hero section ───────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: "38vh" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600')",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(15,50,20,0.70) 60%, rgba(0,0,0,0.80) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-16">
          <p className="font-body text-sm uppercase tracking-widest text-green-300 mb-3">
            Stories & Updates
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Stories of Change
          </h1>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto">
            Field stories, volunteer experiences, and impact reports from our
            work across Bihar's 6 districts.
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

      {/* ── Category Filter + Grid ─────────────────────────────────── */}
      <section className="py-10 bg-cream" data-ocid="blog.page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex flex-wrap gap-2 justify-center mb-10"
            data-ocid="blog.category_filters"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                data-ocid={`blog.filter.${cat.toLowerCase().replace(/\s+/g, "_")}.tab`}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-forest-green-800 text-white shadow-md"
                    : "bg-card border border-forest-green-300 text-forest-green-800 hover:border-forest-green-600 hover:bg-forest-green-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading state */}
          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="blog.loading_state"
            >
              {(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((k) => (
                <SkeletonCard key={k} />
              ))}
            </div>
          ) : allPosts.length === 0 ? (
            /* Global empty state — backend has no published posts */
            <div className="text-center py-24" data-ocid="blog.empty_state">
              <div className="text-6xl mb-5">📖</div>
              <h3 className="font-heading text-2xl font-semibold text-forest-green-900 mb-3">
                Our blog is coming soon
              </h3>
              <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
                Stories from the field, volunteer experiences, and impact
                reports will appear here. Check back soon for updates from
                Bihar's 6 districts.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-forest-green-100 border border-forest-green-300 text-forest-green-800 text-sm font-semibold px-5 py-2.5 rounded-full">
                🌱 New stories are on the way
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            /* Category filter yields no results */
            <div className="text-center py-20" data-ocid="blog.empty_state">
              <div className="text-5xl mb-4">📖</div>
              <p className="font-heading text-xl font-semibold text-forest-green-900 mb-2">
                No stories in this category yet
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                New stories are added regularly — check back soon.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-green-800 text-white font-body text-sm font-semibold hover:bg-forest-green-700 transition-all duration-200"
              >
                View all stories
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, i) => (
                <BlogCard
                  key={post.id.toString()}
                  post={post}
                  index={i}
                  onOpen={setOpenPost}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Post modal */}
      <PostModal post={openPost} onClose={() => setOpenPost(null)} />

      {/* Newsletter CTA */}
      <NewsletterBand />
    </Layout>
  );
}
