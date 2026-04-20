import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, MapPin, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { type SuccessStory, createActor } from "../../backend";
import AdminGuard from "../../components/AdminGuard";
import AdminLayout from "../../components/AdminLayout";

const EMPTY_FORM = {
  title: "",
  beneficiaryName: "",
  location: "",
  program: "",
  storyText: "",
  imageUrl: "",
  date: new Date().toISOString().split("T")[0],
};

function useAdminStories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SuccessStory[]>({
    queryKey: ["adminStories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSuccessStories();
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

interface StoryFormData {
  title: string;
  beneficiaryName: string;
  location: string;
  program: string;
  storyText: string;
  imageUrl: string;
  date: string;
}

function StoryForm({
  initial,
  onSubmit,
  loading,
  submitLabel,
  onCancel,
}: {
  initial: StoryFormData;
  onSubmit: (data: StoryFormData) => void;
  loading: boolean;
  submitLabel: string;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState<StoryFormData>(initial);
  function set(key: keyof StoryFormData, value: string) {
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
        <label className={labelClass()} htmlFor="story-title">
          Title
        </label>
        <input
          id="story-title"
          className={inputClass()}
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          required
          data-ocid="story.title.input"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass()} htmlFor="story-beneficiary">
            Beneficiary Name
          </label>
          <input
            id="story-beneficiary"
            className={inputClass()}
            value={form.beneficiaryName}
            onChange={(e) => set("beneficiaryName", e.target.value)}
            required
            data-ocid="story.beneficiaryName.input"
          />
        </div>
        <div>
          <label className={labelClass()} htmlFor="story-location">
            Location
          </label>
          <input
            id="story-location"
            className={inputClass()}
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            required
            data-ocid="story.location.input"
          />
        </div>
        <div>
          <label className={labelClass()} htmlFor="story-date">
            Date
          </label>
          <input
            id="story-date"
            type="date"
            className={inputClass()}
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            required
            data-ocid="story.date.input"
          />
        </div>
      </div>
      <div>
        <label className={labelClass()} htmlFor="story-program">
          Program
        </label>
        <select
          id="story-program"
          className={inputClass()}
          value={form.program}
          onChange={(e) => set("program", e.target.value)}
          required
          data-ocid="story.program.select"
        >
          <option value="">Select a program</option>
          <option value="plantation-drives">Plantation Drives</option>
          <option value="soil-erosion-control">Soil Erosion Control</option>
          <option value="community-development">Community Development</option>
        </select>
      </div>
      <div>
        <label className={labelClass()} htmlFor="story-text">
          Story Text
        </label>
        <textarea
          id="story-text"
          className={inputClass()}
          rows={5}
          value={form.storyText}
          onChange={(e) => set("storyText", e.target.value)}
          required
          data-ocid="story.storyText.textarea"
        />
      </div>
      <div>
        <label className={labelClass()} htmlFor="story-image">
          Image URL
        </label>
        <input
          id="story-image"
          className={inputClass()}
          placeholder="https://images.unsplash.com/..."
          value={form.imageUrl}
          onChange={(e) => set("imageUrl", e.target.value)}
          data-ocid="story.imageUrl.input"
        />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-body text-sm font-semibold hover:opacity-90 transition-colors disabled:opacity-50"
          data-ocid="story.submit_button"
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
            data-ocid="story.cancel_button"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default function AdminStories() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const { data: stories = [], isLoading } = useAdminStories();

  const [showForm, setShowForm] = useState(false);
  const [editStory, setEditStory] = useState<SuccessStory | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [mutating, setMutating] = useState(false);

  const addMutation = useMutation({
    mutationFn: async (data: StoryFormData) => {
      if (!actor) throw new Error("No actor");
      return actor.addSuccessStory(
        data.title,
        data.beneficiaryName,
        data.location,
        data.program,
        data.storyText,
        data.imageUrl,
        data.date,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminStories"] });
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: bigint; data: StoryFormData }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateSuccessStory(
        id,
        data.title,
        data.beneficiaryName,
        data.location,
        data.program,
        data.storyText,
        data.imageUrl,
        data.date,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminStories"] });
      setEditStory(null);
    },
  });

  async function handleDelete(id: bigint) {
    if (!actor) return;
    setMutating(true);
    try {
      await actor.deleteSuccessStory(id);
      qc.invalidateQueries({ queryKey: ["adminStories"] });
    } finally {
      setMutating(false);
      setDeleteId(null);
    }
  }

  return (
    <AdminGuard>
      <AdminLayout title="Success Stories Management">
        <div className="space-y-6" data-ocid="admin.stories.page">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                {showForm ? "New Story" : "Success Stories"}
              </h2>
              <button
                type="button"
                onClick={() => setShowForm((v) => !v)}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-body text-sm font-semibold hover:opacity-90 transition-colors"
                data-ocid="story.add.open_modal_button"
              >
                {showForm ? (
                  <X className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Plus className="w-4 h-4" aria-hidden="true" />
                )}
                {showForm ? "Close" : "Add Story"}
              </button>
            </div>
            {showForm && (
              <div className="p-5">
                <StoryForm
                  initial={EMPTY_FORM}
                  onSubmit={(data) => addMutation.mutate(data)}
                  loading={addMutation.isPending}
                  submitLabel="Save Story"
                  onCancel={() => setShowForm(false)}
                />
                {addMutation.isError && (
                  <p
                    className="text-destructive font-body text-sm mt-2"
                    data-ocid="story.add.error_state"
                  >
                    Failed to save. Please try again.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Stories Grid */}
          <div data-ocid="admin.stories.list">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                All Stories ({stories.length})
              </h2>
            </div>
            {isLoading ? (
              <div
                className="flex items-center gap-2 text-muted-foreground font-body"
                data-ocid="admin.stories.loading_state"
              >
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Loading stories…
              </div>
            ) : stories.length === 0 ? (
              <div
                className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground font-body"
                data-ocid="admin.stories.empty_state"
              >
                No success stories yet. Add your first one above.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stories.map((story, idx) => (
                  <div
                    key={story.id.toString()}
                    className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
                    data-ocid={`admin.stories.item.${idx + 1}`}
                  >
                    {story.imageUrl ? (
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="w-full h-36 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-36 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground font-body text-sm">
                          No image
                        </span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-foreground text-base line-clamp-2 mb-1">
                        {story.title}
                      </h3>
                      <p className="text-primary font-body text-sm font-medium mb-1">
                        {story.beneficiaryName}
                      </p>
                      <div className="flex items-center gap-1 text-muted-foreground font-body text-xs mb-2">
                        <MapPin
                          className="w-3 h-3 flex-shrink-0"
                          aria-hidden="true"
                        />
                        {story.location} · {story.date}
                      </div>
                      <p className="text-muted-foreground font-body text-sm line-clamp-3 mb-3">
                        {story.storyText}
                      </p>
                      <div className="flex items-center gap-2 pt-2 border-t border-border">
                        <button
                          type="button"
                          onClick={() => setEditStory(story)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-body text-xs font-semibold hover:bg-primary/20 transition-colors"
                          data-ocid={`admin.stories.edit_button.${idx + 1}`}
                        >
                          <Pencil className="w-3 h-3" aria-hidden="true" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteId(story.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive font-body text-xs font-semibold hover:bg-destructive/20 transition-colors"
                          data-ocid={`admin.stories.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="w-3 h-3" aria-hidden="true" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editStory && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            data-ocid="story.edit.dialog"
          >
            <div className="bg-card rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Edit Story
                </h3>
                <button
                  type="button"
                  onClick={() => setEditStory(null)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close dialog"
                  data-ocid="story.edit.close_button"
                >
                  <X
                    className="w-5 h-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="p-6">
                <StoryForm
                  initial={{
                    title: editStory.title,
                    beneficiaryName: editStory.beneficiaryName,
                    location: editStory.location,
                    program: editStory.program,
                    storyText: editStory.storyText,
                    imageUrl: editStory.imageUrl,
                    date: editStory.date,
                  }}
                  onSubmit={(data) =>
                    updateMutation.mutate({ id: editStory.id, data })
                  }
                  loading={updateMutation.isPending}
                  submitLabel="Save Changes"
                  onCancel={() => setEditStory(null)}
                />
                {updateMutation.isError && (
                  <p
                    className="text-destructive font-body text-sm mt-2"
                    data-ocid="story.edit.error_state"
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
            data-ocid="story.delete.dialog"
          >
            <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <Trash2
                  className="w-6 h-6 text-destructive"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                Delete Story?
              </h3>
              <p className="text-muted-foreground font-body text-sm mb-6">
                This action cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 rounded-lg border border-border font-body text-sm text-foreground hover:bg-muted transition-colors"
                  data-ocid="story.delete.cancel_button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(deleteId)}
                  disabled={mutating}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-body text-sm font-semibold hover:opacity-90 transition-colors disabled:opacity-50"
                  data-ocid="story.delete.confirm_button"
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
