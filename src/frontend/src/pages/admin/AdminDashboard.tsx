import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Images,
  Loader2,
  NewspaperIcon,
  Stars,
  TreePine,
  Users,
} from "lucide-react";
import { createActor } from "../../backend";
import AdminGuard from "../../components/AdminGuard";
import AdminLayout from "../../components/AdminLayout";

function useAdminStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAdminStats();
    },
    enabled: !!actor && !isFetching,
  });
}

const statCards = [
  {
    key: "galleryCount",
    label: "Gallery Images",
    icon: Images,
    color: "bg-blue-50 text-blue-700",
  },
  {
    key: "blogCount",
    label: "Blog Posts",
    icon: NewspaperIcon,
    color: "bg-green-50 text-green-700",
  },
  {
    key: "eventCount",
    label: "Events",
    icon: CalendarDays,
    color: "bg-orange-50 text-orange-700",
  },
  {
    key: "storyCount",
    label: "Success Stories",
    icon: Stars,
    color: "bg-purple-50 text-purple-700",
  },
] as const;

const quickActions = [
  { label: "+ Add Blog Post", to: "/admin/blog", icon: NewspaperIcon },
  { label: "+ Add Event", to: "/admin/events", icon: CalendarDays },
  { label: "+ Add Story", to: "/admin/stories", icon: Stars },
  { label: "+ Upload Gallery Image", to: "/admin/gallery", icon: Images },
];

export default function AdminDashboard() {
  const { data: stats, isLoading } = useAdminStats();

  return (
    <AdminGuard>
      <AdminLayout title="Dashboard">
        <div className="space-y-8" data-ocid="admin.dashboard.page">
          {/* Stats Overview */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
              Overview
            </h2>
            {isLoading ? (
              <div
                className="flex items-center gap-2 text-muted-foreground font-body"
                data-ocid="admin.stats.loading_state"
              >
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Loading stats…
              </div>
            ) : (
              <div
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                data-ocid="admin.stats.section"
              >
                {statCards.map(({ key, label, icon: Icon, color }) => (
                  <div
                    key={key}
                    className="bg-card rounded-xl border border-border shadow-sm p-5 flex flex-col gap-3"
                    data-ocid={`admin.stat.${key}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-heading text-3xl font-bold text-foreground leading-none">
                        {stats ? Number(stats[key]).toLocaleString() : "—"}
                      </p>
                      <p className="text-muted-foreground font-body text-sm mt-1">
                        {label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
              Quick Actions
            </h2>
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              data-ocid="admin.quick_actions.section"
            >
              {quickActions.map(({ label, to, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  data-ocid={`admin.quick_action.${to.replace("/admin/", "")}`}
                  className="flex flex-col items-center gap-2 bg-card border border-border rounded-xl p-4 hover:border-primary hover:shadow-md transition-all duration-200 text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <span className="font-body text-sm font-medium text-foreground leading-tight">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Volunteer Applications */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
              Volunteer Applications
            </h2>
            <div
              className="bg-card border border-border rounded-xl p-5 flex items-center justify-between"
              data-ocid="admin.volunteers.section"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-body font-semibold text-foreground">
                    {stats
                      ? Number(stats.volunteerCount).toLocaleString()
                      : "—"}{" "}
                    Applications Received
                  </p>
                  <p className="text-muted-foreground font-body text-sm">
                    Total volunteer sign-ups
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
                <TreePine className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>View in future release</span>
              </div>
            </div>
          </section>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
