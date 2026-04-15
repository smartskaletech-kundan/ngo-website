import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { type BlogPost, createActor } from "../../backend";
import AdminGuard from "../../components/AdminGuard";
import AdminLayout from "../../components/AdminLayout";

const BLOG_CATEGORIES = [
  "Field Stories",
  "Volunteer Experiences",
  "Impact Reports",
  "Press",
];

const EMPTY_FORM = {
  title: "",
  excerpt: "",
  content: "",
  category: BLOG_CATEGORIES[0],
  date: new Date().toISOString().split("T")[0],
  imageUrl: "",
  author: "",
  published: false,
};

function useBlogPosts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BlogPost[]>({
    queryKey: ["adminBlogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogPosts();
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

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  imageUrl: string;
  author: string;
  published: boolean;
}

function BlogForm({
  initial,
  onSubmit,
  loading,
  submitLabel,
  onCancel,
}: {
  initial: BlogFormData;
  onSubmit: (data: BlogFormData) => void;
  loading: boolean;
  submitLabel: string;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState<BlogFormData>(initial);

  function set(key: keyof BlogFormData, value: string | boolean) {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass()} htmlFor="blog-title">
            Title
          </label>
          <input
            id="blog-title"
            className={inputClass()}
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            required
            data-ocid="blog.title.input"
          />
        </div>
        <div>
          <label className={labelClass()} htmlFor="blog-author">
            Author
          </label>
          <input
            id="blog-author"
            className={inputClass()}
            value={form.author}
            onChange={(e) => set("author", e.target.value)}
            required
            data-ocid="blog.author.input"
          />
        </div>
      </div>
      <div>
        <label className={labelClass()} htmlFor="blog-excerpt">
          Excerpt
        </label>
        <textarea
          id="blog-excerpt"
          className={inputClass()}
          rows={2}
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          required
          data-ocid="blog.excerpt.textarea"
        />
      </div>
      <div>
        <label className={labelClass()} htmlFor="blog-content">
          Content
        </label>
        <textarea
          id="blog-content"
          className={inputClass()}
          rows={6}
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
          required
          data-ocid="blog.content.textarea"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass()} htmlFor="blog-category">
            Category
          </label>
          <select
            id="blog-category"
            className={inputClass()}
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            data-ocid="blog.category.select"
          >
            {BLOG_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass()} htmlFor="blog-date">
            Date
          </label>
          <input
            id="blog-date"
            type="date"
            className={inputClass()}
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            required
            data-ocid="blog.date.input"
          />
        </div>
        <div>
          <label className={labelClass()} htmlFor="blog-imageUrl">
            Image URL
          </label>
          <input
            id="blog-imageUrl"
            className={inputClass()}
            placeholder="https://images.unsplash.com/..."
            value={form.imageUrl}
            onChange={(e) => set("imageUrl", e.target.value)}
            data-ocid="blog.imageUrl.input"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          id="blog-published"
          type="checkbox"
          checked={form.published}
          onChange={(e) => set("published", e.target.checked)}
          className="w-4 h-4 accent-primary"
          data-ocid="blog.published.checkbox"
        />
        <label
          htmlFor="blog-published"
          className="font-body text-sm text-foreground"
        >
          Published (visible on site)
        </label>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-body text-sm font-semibold hover:opacity-90 transition-colors disabled:opacity-50"
          data-ocid="blog.submit_button"
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
            className="px-4 py-2 rounded-lg font-body text-sm border border-border text-muted-foreground hover:bg-muted transition-colors"
            data-ocid="blog.cancel_button"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default function AdminBlog() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const { data: posts = [], isLoading } = useBlogPosts();

  const [showForm, setShowForm] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [mutating, setMutating] = useState(false);

  const addMutation = useMutation({
    mutationFn: async (data: BlogFormData) => {
      if (!actor) throw new Error("No actor");
      return actor.addBlogPost(
        data.title,
        data.excerpt,
        data.content,
        data.category,
        data.date,
        data.imageUrl,
        data.author,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminBlogPosts"] });
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: bigint; data: BlogFormData }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateBlogPost(
        id,
        data.title,
        data.excerpt,
        data.content,
        data.category,
        data.date,
        data.imageUrl,
        data.author,
        data.published,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminBlogPosts"] });
      setEditPost(null);
    },
  });

  async function handleDelete(id: bigint) {
    if (!actor) return;
    setMutating(true);
    try {
      await actor.deleteBlogPost(id);
      qc.invalidateQueries({ queryKey: ["adminBlogPosts"] });
    } finally {
      setMutating(false);
      setDeleteId(null);
    }
  }

  return (
    <AdminGuard>
      <AdminLayout title="Blog Management">
        <div className="space-y-6" data-ocid="admin.blog.page">
          {/* Create Form */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                {showForm ? "New Blog Post" : "Blog Posts"}
              </h2>
              <button
                type="button"
                onClick={() => setShowForm((v) => !v)}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-body text-sm font-semibold hover:opacity-90 transition-colors"
                data-ocid="blog.add.open_modal_button"
              >
                {showForm ? (
                  <X className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Plus className="w-4 h-4" aria-hidden="true" />
                )}
                {showForm ? "Close" : "Add Blog Post"}
              </button>
            </div>

            {showForm && (
              <div className="p-5">
                <BlogForm
                  initial={EMPTY_FORM}
                  onSubmit={(data) => addMutation.mutate(data)}
                  loading={addMutation.isPending}
                  submitLabel="Save Blog Post"
                  onCancel={() => setShowForm(false)}
                />
                {addMutation.isError && (
                  <p
                    className="text-destructive font-body text-sm mt-2"
                    data-ocid="blog.add.error_state"
                  >
                    Failed to save. Please try again.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Blog List */}
          <div
            className="bg-card border border-border rounded-xl overflow-hidden"
            data-ocid="admin.blog.list"
          >
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                All Posts ({posts.length})
              </h2>
            </div>
            {isLoading ? (
              <div
                className="flex items-center gap-2 text-muted-foreground font-body p-5"
                data-ocid="admin.blog.loading_state"
              >
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Loading posts…
              </div>
            ) : posts.length === 0 ? (
              <div
                className="p-8 text-center text-muted-foreground font-body"
                data-ocid="admin.blog.empty_state"
              >
                No blog posts yet. Create your first one above.
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
                        Category
                      </th>
                      <th className="text-left px-3 py-3 font-body font-semibold text-muted-foreground hidden md:table-cell">
                        Date
                      </th>
                      <th className="text-left px-3 py-3 font-body font-semibold text-muted-foreground hidden md:table-cell">
                        Author
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
                    {posts.map((post, idx) => (
                      <tr
                        key={post.id.toString()}
                        className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                        data-ocid={`admin.blog.item.${idx + 1}`}
                      >
                        <td className="px-5 py-3 font-body text-foreground font-medium max-w-xs truncate">
                          {post.title}
                        </td>
                        <td className="px-3 py-3 font-body text-muted-foreground hidden sm:table-cell">
                          {post.category}
                        </td>
                        <td className="px-3 py-3 font-body text-muted-foreground hidden md:table-cell">
                          {post.date}
                        </td>
                        <td className="px-3 py-3 font-body text-muted-foreground hidden md:table-cell">
                          {post.author}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold font-body ${post.published ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}
                          >
                            {post.published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditPost(post)}
                              className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                              aria-label="Edit post"
                              data-ocid={`admin.blog.edit_button.${idx + 1}`}
                            >
                              <Pencil className="w-4 h-4" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteId(post.id)}
                              className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                              aria-label="Delete post"
                              data-ocid={`admin.blog.delete_button.${idx + 1}`}
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
        {editPost && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            data-ocid="blog.edit.dialog"
          >
            <div className="bg-card rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Edit Blog Post
                </h3>
                <button
                  type="button"
                  onClick={() => setEditPost(null)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close dialog"
                  data-ocid="blog.edit.close_button"
                >
                  <X
                    className="w-5 h-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="p-6">
                <BlogForm
                  initial={{
                    title: editPost.title,
                    excerpt: editPost.excerpt,
                    content: editPost.content,
                    category: editPost.category,
                    date: editPost.date,
                    imageUrl: editPost.imageUrl,
                    author: editPost.author,
                    published: editPost.published,
                  }}
                  onSubmit={(data) =>
                    updateMutation.mutate({ id: editPost.id, data })
                  }
                  loading={updateMutation.isPending}
                  submitLabel="Save Changes"
                  onCancel={() => setEditPost(null)}
                />
                {updateMutation.isError && (
                  <p
                    className="text-destructive font-body text-sm mt-2"
                    data-ocid="blog.edit.error_state"
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
            data-ocid="blog.delete.dialog"
          >
            <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <Trash2
                  className="w-6 h-6 text-destructive"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                Delete Blog Post?
              </h3>
              <p className="text-muted-foreground font-body text-sm mb-6">
                This action cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 rounded-lg border border-border font-body text-sm text-foreground hover:bg-muted transition-colors"
                  data-ocid="blog.delete.cancel_button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(deleteId)}
                  disabled={mutating}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-body text-sm font-semibold hover:opacity-90 transition-colors disabled:opacity-50"
                  data-ocid="blog.delete.confirm_button"
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
