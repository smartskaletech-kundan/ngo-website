import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { type Event, createActor } from "../../backend";
import AdminGuard from "../../components/AdminGuard";
import AdminLayout from "../../components/AdminLayout";

const EVENT_CATEGORIES = [
  "Plantation",
  "Workshop",
  "Health Camp",
  "Awareness",
  "Community",
];
const EVENT_STATUSES = ["upcoming", "past"];

const EMPTY_FORM = {
  title: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  location: "",
  category: EVENT_CATEGORIES[0],
  imageUrl: "",
  status: "upcoming",
  registrationsOpen: true,
};

function useAdminEvents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Event[]>({
    queryKey: ["adminEvents"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

function labelClass() {
  return "block text-sm font-medium text-foreground font-body mb-1";
}
function inputClass() {
  return "w-full border border-input rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors";
}

interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  imageUrl: string;
  status: string;
  registrationsOpen: boolean;
}

function EventForm({
  initial,
  onSubmit,
  loading,
  submitLabel,
  onCancel,
}: {
  initial: EventFormData;
  onSubmit: (data: EventFormData) => void;
  loading: boolean;
  submitLabel: string;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState<EventFormData>(initial);
  function set(key: keyof EventFormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <div>
        <label className={labelClass()} htmlFor="event-title">
          Title
        </label>
        <input
          id="event-title"
          className={inputClass()}
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          required
          data-ocid="event.title.input"
        />
      </div>
      <div>
        <label className={labelClass()} htmlFor="event-description">
          Description
        </label>
        <textarea
          id="event-description"
          className={inputClass()}
          rows={3}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          required
          data-ocid="event.description.textarea"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass()} htmlFor="event-date">
            Date
          </label>
          <input
            id="event-date"
            type="date"
            className={inputClass()}
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            required
            data-ocid="event.date.input"
          />
        </div>
        <div>
          <label className={labelClass()} htmlFor="event-location">
            Location
          </label>
          <input
            id="event-location"
            className={inputClass()}
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            required
            data-ocid="event.location.input"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass()} htmlFor="event-category">
            Category
          </label>
          <select
            id="event-category"
            className={inputClass()}
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            data-ocid="event.category.select"
          >
            {EVENT_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass()} htmlFor="event-status">
            Status
          </label>
          <select
            id="event-status"
            className={inputClass()}
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
            data-ocid="event.status.select"
          >
            {EVENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass()} htmlFor="event-imageUrl">
            Image URL
          </label>
          <input
            id="event-imageUrl"
            className={inputClass()}
            placeholder="https://images.unsplash.com/..."
            value={form.imageUrl}
            onChange={(e) => set("imageUrl", e.target.value)}
            data-ocid="event.imageUrl.input"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          id="event-registrations"
          type="checkbox"
          checked={form.registrationsOpen}
          onChange={(e) => set("registrationsOpen", e.target.checked)}
          className="w-4 h-4 accent-primary"
          data-ocid="event.registrationsOpen.checkbox"
        />
        <label
          htmlFor="event-registrations"
          className="font-body text-sm text-foreground"
        >
          Registrations Open
        </label>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-body text-sm font-semibold hover:opacity-90 transition-colors disabled:opacity-50"
          data-ocid="event.submit_button"
        >
          {loading && (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          )}
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-border font-body text-sm text-muted-foreground hover:bg-muted transition-colors"
            data-ocid="event.cancel_button"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default function AdminEvents() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const { data: events = [], isLoading } = useAdminEvents();

  const [showForm, setShowForm] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [mutating, setMutating] = useState(false);

  const addMutation = useMutation({
    mutationFn: async (data: EventFormData) => {
      if (!actor) throw new Error("No actor");
      return actor.addEvent(
        data.title,
        data.description,
        data.date,
        data.location,
        data.category,
        data.imageUrl,
        data.status,
        data.registrationsOpen,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminEvents"] });
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: bigint; data: EventFormData }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateEvent(
        id,
        data.title,
        data.description,
        data.date,
        data.location,
        data.category,
        data.imageUrl,
        data.status,
        data.registrationsOpen,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminEvents"] });
      setEditEvent(null);
    },
  });

  async function handleDelete(id: bigint) {
    if (!actor) return;
    setMutating(true);
    try {
      await actor.deleteEvent(id);
      qc.invalidateQueries({ queryKey: ["adminEvents"] });
    } finally {
      setMutating(false);
      setDeleteId(null);
    }
  }

  return (
    <AdminGuard>
      <AdminLayout title="Events Management">
        <div className="space-y-6" data-ocid="admin.events.page">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                {showForm ? "New Event" : "Events"}
              </h2>
              <button
                type="button"
                onClick={() => setShowForm((v) => !v)}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-body text-sm font-semibold hover:opacity-90 transition-colors"
                data-ocid="event.add.open_modal_button"
              >
                {showForm ? (
                  <X className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Plus className="w-4 h-4" aria-hidden="true" />
                )}
                {showForm ? "Close" : "Add Event"}
              </button>
            </div>
            {showForm && (
              <div className="p-5">
                <EventForm
                  initial={EMPTY_FORM}
                  onSubmit={(data) => addMutation.mutate(data)}
                  loading={addMutation.isPending}
                  submitLabel="Save Event"
                  onCancel={() => setShowForm(false)}
                />
                {addMutation.isError && (
                  <p
                    className="text-destructive font-body text-sm mt-2"
                    data-ocid="event.add.error_state"
                  >
                    Failed to save. Please try again.
                  </p>
                )}
              </div>
            )}
          </div>

          <div
            className="bg-card border border-border rounded-xl overflow-hidden"
            data-ocid="admin.events.list"
          >
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                All Events ({events.length})
              </h2>
            </div>
            {isLoading ? (
              <div
                className="flex items-center gap-2 text-muted-foreground font-body p-5"
                data-ocid="admin.events.loading_state"
              >
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Loading events…
              </div>
            ) : events.length === 0 ? (
              <div
                className="p-8 text-center text-muted-foreground font-body"
                data-ocid="admin.events.empty_state"
              >
                No events yet. Create your first one above.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="text-left px-5 py-3 font-body font-semibold text-muted-foreground">
                        Title
                      </th>
                      <th className="text-left px-3 py-3 font-body font-semibold text-muted-foreground hidden sm:table-cell">
                        Date
                      </th>
                      <th className="text-left px-3 py-3 font-body font-semibold text-muted-foreground hidden md:table-cell">
                        Location
                      </th>
                      <th className="text-left px-3 py-3 font-body font-semibold text-muted-foreground hidden md:table-cell">
                        Category
                      </th>
                      <th className="text-left px-3 py-3 font-body font-semibold text-muted-foreground">
                        Status
                      </th>
                      <th className="px-3 py-3 font-body font-semibold text-muted-foreground text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev, idx) => (
                      <tr
                        key={ev.id.toString()}
                        className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                        data-ocid={`admin.events.item.${idx + 1}`}
                      >
                        <td className="px-5 py-3 font-body text-foreground font-medium max-w-xs truncate">
                          {ev.title}
                        </td>
                        <td className="px-3 py-3 font-body text-muted-foreground hidden sm:table-cell">
                          {ev.date}
                        </td>
                        <td className="px-3 py-3 font-body text-muted-foreground hidden md:table-cell">
                          {ev.location}
                        </td>
                        <td className="px-3 py-3 font-body text-muted-foreground hidden md:table-cell">
                          {ev.category}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold font-body ${ev.status === "upcoming" ? "bg-blue-100 text-blue-700" : "bg-muted text-muted-foreground"}`}
                          >
                            {ev.status.charAt(0).toUpperCase() +
                              ev.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditEvent(ev)}
                              className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                              aria-label="Edit event"
                              data-ocid={`admin.events.edit_button.${idx + 1}`}
                            >
                              <Pencil className="w-4 h-4" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteId(ev.id)}
                              className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                              aria-label="Delete event"
                              data-ocid={`admin.events.delete_button.${idx + 1}`}
                            >
                              <Trash2 className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editEvent && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            data-ocid="event.edit.dialog"
          >
            <div className="bg-card rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Edit Event
                </h3>
                <button
                  type="button"
                  onClick={() => setEditEvent(null)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close dialog"
                  data-ocid="event.edit.close_button"
                >
                  <X
                    className="w-5 h-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="p-6">
                <EventForm
                  initial={{
                    title: editEvent.title,
                    description: editEvent.description,
                    date: editEvent.date,
                    location: editEvent.location,
                    category: editEvent.category,
                    imageUrl: editEvent.imageUrl,
                    status: editEvent.status,
                    registrationsOpen: editEvent.registrationsOpen,
                  }}
                  onSubmit={(data) =>
                    updateMutation.mutate({ id: editEvent.id, data })
                  }
                  loading={updateMutation.isPending}
                  submitLabel="Save Changes"
                  onCancel={() => setEditEvent(null)}
                />
                {updateMutation.isError && (
                  <p
                    className="text-destructive font-body text-sm mt-2"
                    data-ocid="event.edit.error_state"
                  >
                    Update failed. Please try again.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirm */}
        {deleteId !== null && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            data-ocid="event.delete.dialog"
          >
            <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <Trash2
                  className="w-6 h-6 text-destructive"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                Delete Event?
              </h3>
              <p className="text-muted-foreground font-body text-sm mb-6">
                This action cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 rounded-lg border border-border font-body text-sm text-foreground hover:bg-muted transition-colors"
                  data-ocid="event.delete.cancel_button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(deleteId)}
                  disabled={mutating}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-body text-sm font-semibold hover:opacity-90 transition-colors disabled:opacity-50"
                  data-ocid="event.delete.confirm_button"
                >
                  {mutating && (
                    <Loader2
                      className="w-4 h-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </AdminGuard>
  );
}
