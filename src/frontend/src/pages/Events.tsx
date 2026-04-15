import { useActor } from "@caffeineai/core-infrastructure";
import { CalendarDays, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";
import type { Event, backendInterface } from "../backend.d.ts";
import Layout from "../components/Layout";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
}

// ─── Category badge colour ────────────────────────────────────────────────────

function categoryClass(category: string): string {
  const map: Record<string, string> = {
    Plantation:
      "bg-forest-green-100 text-forest-green-800 border-forest-green-300",
    Workshop: "bg-amber-100 text-amber-800 border-amber-300",
    "Soil Conservation": "bg-amber-100 text-amber-800 border-amber-300",
    "Waste Management": "bg-teal-100 text-teal-800 border-teal-300",
    Community: "bg-blue-100 text-blue-800 border-blue-300",
  };
  return map[category] ?? "bg-muted text-foreground border-border";
}

// ─── Utility ─────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  if (!dateStr) return dateStr;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Static fallback data ─────────────────────────────────────────────────────

const FALLBACK_UPCOMING: Event[] = [
  {
    id: BigInt(1),
    title: "Bihar Mega Plantation Drive 2026",
    description:
      "Join thousands of volunteers for a large-scale plantation drive across 10 panchayats near Patna. We aim to plant 2,000 native saplings in a single day with community participation at every step.",
    date: "2026-06-15",
    location: "Phulwari Sharif, Patna, Bihar",
    category: "Plantation",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
    status: "upcoming",
    registrationsOpen: true,
  },
  {
    id: BigInt(2),
    title: "Soil Health Awareness Workshop",
    description:
      "A hands-on workshop for farmers covering contour bunding, check-dam construction, and organic farming techniques. Expert agronomists from Bihar Agricultural University will lead sessions.",
    date: "2026-06-28",
    location: "Nalanda Agricultural College, Nalanda",
    category: "Workshop",
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    status: "upcoming",
    registrationsOpen: true,
  },
  {
    id: BigInt(3),
    title: "Community Waste Segregation Drive",
    description:
      "Train your village as an Eco-Champion hub. Door-to-door waste collection demo, segregation awareness, and composting setup across 5 villages in Vaishali district.",
    date: "2026-07-10",
    location: "Hajipur, Vaishali, Bihar",
    category: "Waste Management",
    imageUrl:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80",
    status: "upcoming",
    registrationsOpen: false,
  },
];

const FALLBACK_PAST: Event[] = [
  {
    id: BigInt(101),
    title: "Green Bihar Tree Mela 2025",
    description:
      "A two-day tree mela that brought together 1,200 volunteers and planted 3,500 saplings across Muzaffarpur. Local schools, colleges, and panchayats participated in this landmark event.",
    date: "2025-09-20",
    location: "Muzaffarpur, Bihar",
    category: "Plantation",
    imageUrl:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80",
    status: "past",
    registrationsOpen: false,
  },
  {
    id: BigInt(102),
    title: "Farmer Training on Soil Conservation",
    description:
      "120 farmers trained over 3 days on scientific erosion control and sustainable land management methods. Supported by government extension officers and NGO field staff.",
    date: "2025-11-05",
    location: "Darbhanga, Bihar",
    category: "Soil Conservation",
    imageUrl:
      "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=80",
    status: "past",
    registrationsOpen: false,
  },
  {
    id: BigInt(103),
    title: "Clean Village Challenge 2025",
    description:
      "30 panchayats competed to achieve zero open-defecation and zero open-burning over a 30-day period. Anumaya Sansthan facilitated training, monitoring, and prize distribution.",
    date: "2025-12-15",
    location: "Sitamarhi, Bihar",
    category: "Community",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    status: "past",
    registrationsOpen: false,
  },
  {
    id: BigInt(104),
    title: "Eco-Champion Youth Camp",
    description:
      "A 2-day camp for 80 young leaders from across Bihar. Sessions on climate change, waste management, and community organizing. Participants took pledges and launched home village projects.",
    date: "2025-08-18",
    location: "Patna, Bihar",
    category: "Workshop",
    imageUrl:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    status: "past",
    registrationsOpen: false,
  },
];

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function EventCardSkeleton() {
  return (
    <div className="bg-card rounded-card shadow-card animate-pulse overflow-hidden">
      <div className="h-48 bg-muted" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-muted rounded w-1/3" />
        <div className="h-5 bg-muted rounded w-4/5" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-3 bg-muted rounded w-2/3" />
        <div className="h-10 bg-muted rounded-lg mt-4" />
      </div>
    </div>
  );
}

// ─── Upcoming Event Card ──────────────────────────────────────────────────────

interface EventCardProps {
  event: Event;
  onRegister: (event: Event) => void;
  index: number;
}

function UpcomingEventCard({ event, onRegister, index }: EventCardProps) {
  return (
    <article
      className="bg-card rounded-card shadow-card card-hover flex flex-col overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      data-ocid={`events.upcoming.item.${index + 1}`}
    >
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={
            event.imageUrl ||
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80"
          }
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category badge */}
        <span
          className={`inline-block self-start text-xs font-semibold px-3 py-0.5 rounded-full border mb-3 ${categoryClass(event.category)}`}
        >
          {event.category}
        </span>

        {/* Title */}
        <h3 className="font-heading text-lg font-semibold text-foreground mb-3 leading-snug">
          {event.title}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1.5">
          <CalendarDays
            className="w-4 h-4 flex-shrink-0 text-forest-green-600"
            aria-hidden="true"
          />
          <span>{formatDate(event.date)}</span>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
          <MapPin
            className="w-4 h-4 flex-shrink-0 text-forest-green-600 mt-0.5"
            aria-hidden="true"
          />
          <span>{event.location}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3 flex-1 mb-4">
          {event.description}
        </p>

        {/* CTA */}
        {event.registrationsOpen ? (
          <button
            type="button"
            onClick={() => onRegister(event)}
            data-ocid={`events.upcoming.register_button.${index + 1}`}
            className="w-full bg-forest-green-800 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-forest-green-900 transition-colors mt-auto"
          >
            Register Now →
          </button>
        ) : (
          <div
            className="w-full text-center py-2.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground border border-border mt-auto"
            data-ocid={`events.upcoming.closed_badge.${index + 1}`}
          >
            Registration Closed
          </div>
        )}
      </div>
    </article>
  );
}

// ─── Past Event Card (horizontal) ─────────────────────────────────────────────

interface PastEventCardProps {
  event: Event;
  index: number;
}

function PastEventCard({ event, index }: PastEventCardProps) {
  return (
    <article
      className="bg-card rounded-card shadow-card card-hover flex flex-col sm:flex-row gap-0 overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      data-ocid={`events.past.item.${index + 1}`}
    >
      {/* Image */}
      <div className="sm:w-40 h-36 sm:h-auto flex-shrink-0 overflow-hidden">
        <img
          src={
            event.imageUrl ||
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80"
          }
          alt={event.title}
          className="w-full h-full object-cover opacity-80"
          loading="lazy"
        />
      </div>

      {/* Text */}
      <div className="p-4 flex flex-col justify-center gap-1.5">
        <span
          className={`inline-block self-start text-xs font-semibold px-2.5 py-0.5 rounded-full border ${categoryClass(event.category)}`}
        >
          {event.category}
        </span>
        <h3 className="font-heading text-base font-semibold text-foreground/80 leading-snug">
          {event.title}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
            {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            {event.location}
          </span>
        </div>
        <p className="text-xs text-foreground/60 line-clamp-2 mt-1">
          {event.description}
        </p>
      </div>
    </article>
  );
}

// ─── Registration Modal ───────────────────────────────────────────────────────

interface RegisterModalProps {
  event: Event;
  onClose: () => void;
  onSuccess: () => void;
  actor: backendInterface | null;
}

function RegisterModal({
  event,
  onClose,
  onSuccess,
  actor,
}: RegisterModalProps) {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      setError("Backend not ready. Please try again.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await actor.registerForEvent(event.id, form.name, form.email, form.phone);
      setDone(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2500);
    } catch {
      setError("Registration failed. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background text-sm";

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50"
      data-ocid="events.register_dialog"
    >
      <div className="bg-card rounded-card shadow-card-hover w-full max-w-md animate-fade-in-up">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Register for Event
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
              {event.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-ocid="events.register_close_button"
            className="text-muted-foreground hover:text-foreground text-2xl leading-none ml-4 flex-shrink-0 transition-colors"
            aria-label="Close registration form"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {done ? (
            <div
              className="text-center py-6"
              data-ocid="events.register_success_state"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-heading text-xl font-bold text-forest-green-800 mb-2">
                You're registered!
              </h3>
              <p className="text-sm text-muted-foreground">
                We'll send event details to{" "}
                <span className="font-semibold text-foreground">
                  {form.email}
                </span>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event name (read-only) */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="reg-event"
                >
                  Event
                </label>
                <input
                  id="reg-event"
                  type="text"
                  readOnly
                  value={event.title}
                  className={`${inputClass} bg-muted/40 text-muted-foreground cursor-default`}
                />
              </div>

              {/* Name */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="reg-name"
                >
                  Full Name *
                </label>
                <input
                  id="reg-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  data-ocid="events.register_name_input"
                  className={inputClass}
                  placeholder="Your full name"
                  disabled={loading}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="reg-email"
                >
                  Email Address *
                </label>
                <input
                  id="reg-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  data-ocid="events.register_email_input"
                  className={inputClass}
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="reg-phone"
                >
                  Phone Number *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-input rounded-l-lg bg-muted text-sm text-muted-foreground flex-shrink-0">
                    +91
                  </span>
                  <input
                    id="reg-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    data-ocid="events.register_phone_input"
                    className="flex-1 px-4 py-2.5 border border-input rounded-r-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background text-sm"
                    placeholder="98765 43210"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2 border border-destructive/20"
                  data-ocid="events.register_error_state"
                >
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  data-ocid="events.register_submit_button"
                  className="flex-1 bg-forest-green-800 text-white py-3 rounded-lg font-bold text-sm hover:bg-forest-green-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Registering…" : "Register for Event"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  data-ocid="events.register_cancel_button"
                  className="flex-1 border border-input py-3 rounded-lg font-medium text-sm hover:bg-muted transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({
  message,
  onDismiss,
}: { message: string; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-forest-green-700 text-white px-6 py-3 rounded-full shadow-card font-semibold text-sm animate-fade-in-up"
      data-ocid="events.success_toast"
    >
      ✅ {message}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Events() {
  const { actor, isFetching } = useActor(createActor);

  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [loadingPast, setLoadingPast] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Load upcoming events
  useEffect(() => {
    if (!actor || isFetching) return;
    setLoadingUpcoming(true);
    actor
      .getUpcomingEvents()
      .then((events) => {
        setUpcomingEvents(events.length > 0 ? events : FALLBACK_UPCOMING);
      })
      .catch(() => {
        setUpcomingEvents(FALLBACK_UPCOMING);
      })
      .finally(() => setLoadingUpcoming(false));
  }, [actor, isFetching]);

  // Load past events
  useEffect(() => {
    if (!actor || isFetching) return;
    setLoadingPast(true);
    actor
      .getPastEvents()
      .then((events) => {
        setPastEvents(events.length > 0 ? events : FALLBACK_PAST);
      })
      .catch(() => {
        setPastEvents(FALLBACK_PAST);
      })
      .finally(() => setLoadingPast(false));
  }, [actor, isFetching]);

  // While backend is initialising, show fallback data immediately
  useEffect(() => {
    if (isFetching) {
      setUpcomingEvents(FALLBACK_UPCOMING);
      setPastEvents(FALLBACK_PAST);
      setLoadingUpcoming(false);
      setLoadingPast(false);
    }
  }, [isFetching]);

  const handleRegisterSuccess = () => {
    setToast("You're registered! We'll send details to your email.");
  };

  return (
    <Layout
      pageTitle="Events & Drives"
      pageDescription="Join us for plantation drives, workshops, and community events across Bihar"
    >
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}

      {/* ── Upcoming Events ─────────────────────────────────────────────── */}
      <section
        className="py-16 md:py-20 bg-cream"
        data-ocid="events.upcoming_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-4xl mb-3">📅</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
              Upcoming Events
            </h2>
            <p className="text-foreground/65 mt-2 max-w-xl mx-auto">
              Be part of our next drive — register early to secure your spot.
            </p>
          </div>

          {loadingUpcoming ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : upcomingEvents.length === 0 ? (
            <div
              className="bg-card rounded-card shadow-card p-12 text-center"
              data-ocid="events.upcoming_empty_state"
            >
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                No upcoming events right now
              </h3>
              <p className="text-muted-foreground text-sm">
                Follow us on social media for announcements about new events and
                drives.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, i) => (
                <UpcomingEventCard
                  key={String(event.id)}
                  event={event}
                  index={i}
                  onRegister={setSelectedEvent}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Wave Divider ────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden leading-none bg-cream"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 72"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 fill-impact-green"
          aria-hidden="true"
        >
          <path d="M0,36 C360,72 720,0 1080,36 C1260,54 1380,30 1440,36 L1440,72 L0,72 Z" />
        </svg>
      </div>

      {/* ── Past Events ─────────────────────────────────────────────────── */}
      <section
        className="py-16 md:py-20 bg-impact-green"
        data-ocid="events.past_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest-green-900">
              Past Events
            </h2>
            <p className="text-foreground/65 mt-2 max-w-xl mx-auto">
              A look back at the drives and workshops we've organised together.
            </p>
          </div>

          {loadingPast ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-card rounded-card shadow-card h-36 animate-pulse"
                />
              ))}
            </div>
          ) : pastEvents.length === 0 ? (
            <div
              className="bg-card rounded-card shadow-card p-10 text-center"
              data-ocid="events.past_empty_state"
            >
              <p className="text-muted-foreground text-sm">
                No past events to display yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pastEvents.map((event, i) => (
                <PastEventCard key={String(event.id)} event={event} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Band ────────────────────────────────────────────────────── */}
      <section className="py-14 bg-forest-green-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">
            Don't miss the next drive
          </h3>
          <p className="text-white/75 text-sm mb-6">
            Follow Anumaya Sansthan on social media or subscribe to our
            newsletter to get event updates directly to your inbox.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-5 py-2.5 rounded-full font-medium transition-colors"
              data-ocid="events.facebook_link"
            >
              📘 Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-5 py-2.5 rounded-full font-medium transition-colors"
              data-ocid="events.instagram_link"
            >
              📸 Instagram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-5 py-2.5 rounded-full font-medium transition-colors"
              data-ocid="events.twitter_link"
            >
              🐦 Twitter / X
            </a>
          </div>
        </div>
      </section>

      {/* ── Register Modal ───────────────────────────────────────────────── */}
      {selectedEvent && (
        <RegisterModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSuccess={handleRegisterSuccess}
          actor={actor}
        />
      )}
    </Layout>
  );
}
