import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createActor } from "../backend";
import type { BlogPost } from "../backend.d.ts";
import Layout from "../components/Layout";
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

// ── Fallback sample data shown before backend has real posts ─────────────────

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: 1n,
    title: "10,000 Trees Later — How Nalanda Changed Forever",
    excerpt:
      "Volunteers and farmers came together over three monsoon seasons to restore a barren stretch of land in Nalanda. Here is their story.",
    content:
      "Three years ago, the eastern edge of Nalanda district looked barren. Dusty trails led to cracked earth where seasonal floods had stripped topsoil away. Farmers told us that yields had halved in a decade. Our first plantation drive brought 47 volunteers and 200 saplings. By the third monsoon, 4,200 trees stood tall — providing shade, improving groundwater recharge, and giving farmers something they hadn't felt in years: hope.\n\nThe program worked because we didn't just plant trees. We trained local Eco-Champions to care for saplings, partnered with panchayats for land access, and selected species — neem, peepal, mahua, jamun — that communities could harvest and use. Ramawati Devi, a farmer from the area, says her family now collects mahua flowers every season for the first time in memory.\n\nThis single initiative has since expanded to 50 villages across Bihar.",
    category: "Field Stories",
    date: "2024-03-15",
    author: "Dr. Nirmal Kumar Singh",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    published: true,
  },
  {
    id: 2n,
    title: "My 30 Days as an Anumaya Volunteer — What I Learned",
    excerpt:
      "I joined the plantation drive thinking I'd spend a weekend planting trees. I ended up staying a month and learning what community truly means.",
    content:
      "I'm a software engineer from Bengaluru. I had two weeks of leave and a vague wish to 'do something meaningful'. I found Anumaya Sansthan through a friend and registered for their June plantation drive in Muzaffarpur.\n\nOn day one, the field coordinator, Manoj bhai, handed me a spade and pointed to a map. No PowerPoint, no orientation deck — just soil and purpose. We worked in teams of eight, each paired with a local farmer who knew exactly which slope needed which tree. By day three, I stopped thinking about my inbox.\n\nThe most humbling moment: a 70-year-old woman named Parvati Devi walked two kilometres each morning to water saplings near her home. She explained that her grandchildren deserved shade. I planted faster after that.\n\nIf you have even a few days — join a drive. You won't regret it.",
    category: "Volunteer Experiences",
    date: "2024-02-20",
    author: "Arjun Mehta",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    published: true,
  },
  {
    id: 3n,
    title: "Annual Impact Report 2023–24: Numbers Behind the Change",
    excerpt:
      "5,686 trees planted. 1,875 kg waste recycled. 1,183 families impacted. Here is a full breakdown of our work this year.",
    content:
      "Every year, we publish a transparent impact report so our donors and community can see exactly how funds were used and what was achieved.\n\n**Plantation Programs (45% of funds)**\n- 5,686 trees planted across 50+ villages\n- 8 species selected for ecological fit and community utility\n- 300+ Eco-Champions trained\n\n**Soil Conservation (25% of funds)**\n- 167 acres of eroding farmland stabilised\n- 12 districts covered\n- Contour bunding + check dams installed in 23 locations\n\n**Waste Management (20% of funds)**\n- 1,875 kg of waste collected and recycled\n- 30 panchayats onboarded\n- 500+ households participating in segregation at source\n\n**Administration (10% of funds)**\n- Governance, compliance, reporting\n\nFull PDF available on our Transparency page.",
    category: "Impact Reports",
    date: "2024-04-01",
    author: "Mrs. Sweety Kumari",
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    published: true,
  },
  {
    id: 4n,
    title: "Composting in Vaishali: Turning Waste Into Wealth",
    excerpt:
      "How one panchayat in Vaishali transformed its waste problem into a composting enterprise that now earns revenue for the village.",
    content:
      "Raghunathpur panchayat in Vaishali had a waste problem. Open garbage heaps attracted disease and contaminated the local pond. Anumaya Sansthan introduced a community composting model in January 2024.\n\nFive youth volunteers were trained as Eco-Champions. They began door-to-door collection using colour-coded bins — green for organic, blue for dry recyclables. Within six weeks, 120 households were participating.\n\nThe organic waste feeds a community composting pit. By April, the panchayat had produced its first batch of vermicompost — 200 kg — sold to local farmers at ₹8/kg. The revenue funds ongoing collection.\n\nSuresh Kumar, one of the Eco-Champions, now earns a monthly income from the programme. 'Yeh kaam sikhne ke baad mujhe sheher nahin jana pada,' he says — after learning this work, I didn't need to leave for the city.",
    category: "Field Stories",
    date: "2024-01-10",
    author: "Field Team",
    imageUrl:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
    published: true,
  },
  {
    id: 5n,
    title: "Anumaya Sansthan Featured in Bihar's Eco-Heroes Series",
    excerpt:
      "Local media spotlight on the NGO's plantation and soil conservation work across 12 districts of Bihar.",
    content:
      "Anumaya Sansthan was featured in a regional television programme profiling environmental NGOs making a difference in Bihar. The programme highlighted the organisation's community-first approach to ecological restoration.\n\nSecretary Dr. Nirmal Kumar Singh spoke about the importance of working with, not for, rural communities. 'Tree plantation works when the community plants the tree and calls it theirs,' he said.\n\nThe segment reached an estimated 2 lakh viewers across Bihar. Several new volunteers registered through the website within 48 hours of the broadcast.\n\nWe are grateful for the recognition and remain committed to expanding our work to more districts.",
    category: "Press",
    date: "2023-11-05",
    author: "Communications Team",
    imageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    published: true,
  },
  {
    id: 6n,
    title: "Students Plant 500 Trees on World Environment Day",
    excerpt:
      "500 school students from Patna joined Anumaya Sansthan on World Environment Day to plant native trees across four localities.",
    content:
      "On June 5th — World Environment Day — Anumaya Sansthan partnered with five schools in Patna to organise a special plantation drive.\n\n500 students from classes 6 to 10 participated, each planting one tree of their choice from a curated list of native species. Before planting, students attended a 30-minute session on why native trees matter more than ornamental species for local ecosystems.\n\nEach student received a 'Tree Adoption Card' with the species, planting date, and a QR code linking to care instructions. Teachers have committed to checking on trees during monsoon breaks.\n\nChairperson Mrs. Anu Kumari Singh addressed the gathering: 'Every tree you plant today is a gift you are giving to the Bihar of 2040. Take care of it the way you'd take care of a younger sibling.'",
    category: "Volunteer Experiences",
    date: "2023-06-05",
    author: "Education Outreach Team",
    imageUrl:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80",
    published: true,
  },
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
            ✅ You're subscribed! Welcome to the Anumaya community.
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

  const { data: backendPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBlogPosts();
    },
    enabled: !!actor && !isActorLoading,
  });

  // Use backend data if available, fall back to sample posts
  const allPosts =
    backendPosts && backendPosts.length > 0 ? backendPosts : SAMPLE_POSTS;

  const filteredPosts =
    selectedCategory === "All"
      ? allPosts
      : allPosts.filter((p) => p.category === selectedCategory);

  return (
    <Layout
      pageTitle="Stories of Change"
      pageDescription="Field stories, volunteer experiences, and impact from our work in Bihar"
    >
      {/* Category Filter */}
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

          {/* Blog Grid */}
          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="blog.loading_state"
            >
              {(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((k) => (
                <SkeletonCard key={k} />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20" data-ocid="blog.empty_state">
              <div className="text-5xl mb-4">📖</div>
              <p className="font-heading text-xl font-semibold text-forest-green-900 mb-2">
                No stories yet
              </p>
              <p className="text-muted-foreground text-sm">
                Check back soon — new stories are added regularly.
              </p>
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
