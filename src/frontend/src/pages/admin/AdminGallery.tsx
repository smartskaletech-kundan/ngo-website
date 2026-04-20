import { useActor } from "@caffeineai/core-infrastructure";
import { Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../../backend";
import AdminGuard from "../../components/AdminGuard";
import AdminLayout from "../../components/AdminLayout";
import type { GalleryImage } from "../../types/content";

const CATEGORIES = [
  "Plantation Drives",
  "Soil Erosion Control",
  "Community Development",
] as const;

type Category = (typeof CATEGORIES)[number];

interface UploadForm {
  title: string;
  description: string;
  category: Category;
  date: string;
  location: string;
}

const EMPTY_FORM: UploadForm = {
  title: "",
  description: "",
  category: "Plantation Drives",
  date: new Date().toISOString().split("T")[0],
  location: "",
};

function resolveImageUrl(imageKey: string): string {
  if (imageKey.includes("://")) return imageKey;
  return `https://blob.caffeine.ai/${imageKey}`;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

interface EditModalProps {
  image: GalleryImage;
  onSave: (id: bigint, form: UploadForm) => Promise<void>;
  onClose: () => void;
  saving: boolean;
}

function EditModal({ image, onSave, onClose, saving }: EditModalProps) {
  const [form, setForm] = useState<UploadForm>({
    title: image.title,
    description: image.description,
    category: (CATEGORIES.includes(image.category as Category)
      ? image.category
      : "Plantation Drives") as Category,
    date: image.date,
    location: image.location,
  });

  function update(k: keyof UploadForm, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      data-ocid="admin_gallery.edit_dialog"
    >
      {/* Backdrop button */}
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-2xl shadow-xl border border-border w-full max-w-lg z-10 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-xl font-bold text-forest-green-800">
            Edit Image Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
            data-ocid="admin_gallery.edit_close_button"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Preview */}
        <div className="mb-4 rounded-xl overflow-hidden h-32 bg-muted">
          <img
            src={resolveImageUrl(image.imageKey)}
            alt={image.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-3">
          <div>
            <label
              className="block text-sm font-semibold font-body text-foreground mb-1"
              htmlFor="edit-title"
            >
              Title *
            </label>
            <input
              id="edit-title"
              type="text"
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              data-ocid="admin_gallery.edit_title_input"
              className="w-full border border-input rounded-lg px-3 py-2 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-forest-green-400"
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold font-body text-foreground mb-1"
              htmlFor="edit-description"
            >
              Description
            </label>
            <textarea
              id="edit-description"
              rows={2}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              data-ocid="admin_gallery.edit_description_textarea"
              className="w-full border border-input rounded-lg px-3 py-2 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-forest-green-400 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-sm font-semibold font-body text-foreground mb-1"
                htmlFor="edit-category"
              >
                Category *
              </label>
              <select
                id="edit-category"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                data-ocid="admin_gallery.edit_category_select"
                className="w-full border border-input rounded-lg px-3 py-2 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-forest-green-400"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-semibold font-body text-foreground mb-1"
                htmlFor="edit-date"
              >
                Date
              </label>
              <input
                id="edit-date"
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                data-ocid="admin_gallery.edit_date_input"
                className="w-full border border-input rounded-lg px-3 py-2 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-forest-green-400"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-semibold font-body text-foreground mb-1"
              htmlFor="edit-location"
            >
              Location
            </label>
            <input
              id="edit-location"
              type="text"
              placeholder="e.g. Patna, Bihar"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              data-ocid="admin_gallery.edit_location_input"
              className="w-full border border-input rounded-lg px-3 py-2 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-forest-green-400"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            data-ocid="admin_gallery.edit_cancel_button"
            className="flex-1 px-4 py-2 rounded-xl border border-border font-body text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(image.id, form)}
            disabled={saving || !form.title.trim()}
            data-ocid="admin_gallery.edit_save_button"
            className="flex-1 px-4 py-2 rounded-xl bg-forest-green-800 text-white font-body text-sm font-semibold hover:bg-forest-green-900 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

interface DeleteModalProps {
  image: GalleryImage;
  onConfirm: () => Promise<void>;
  onClose: () => void;
  deleting: boolean;
}

function DeleteModal({
  image,
  onConfirm,
  onClose,
  deleting,
}: DeleteModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      data-ocid="admin_gallery.delete_dialog"
    >
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-2xl shadow-xl border border-border w-full max-w-sm z-10 p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6 text-red-500" aria-hidden="true" />
        </div>
        <h2 className="font-heading text-lg font-bold text-foreground mb-2">
          Delete Image?
        </h2>
        <p className="font-body text-sm text-muted-foreground mb-1">
          <span className="font-semibold">{image.title}</span>
        </p>
        <p className="font-body text-sm text-muted-foreground mb-6">
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            data-ocid="admin_gallery.delete_cancel_button"
            className="flex-1 px-4 py-2 rounded-xl border border-border font-body text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            data-ocid="admin_gallery.delete_confirm_button"
            className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white font-body text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminGalleryContent() {
  const { actor, isFetching } = useActor(createActor);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<UploadForm>(EMPTY_FORM);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [editTarget, setEditTarget] = useState<GalleryImage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Load images
  const loadImages = () => {
    if (!actor || isFetching) return;
    actor
      .listGalleryImages()
      .then((data) => {
        setImages(data);
        setLoadingImages(false);
      })
      .catch(() => setLoadingImages(false));
  };

  useEffect(() => {
    if (!isFetching && actor) {
      actor
        .listGalleryImages()
        .then((data) => {
          setImages(data);
          setLoadingImages(false);
        })
        .catch(() => setLoadingImages(false));
    }
  }, [actor, isFetching]);

  function updateForm(k: keyof UploadForm, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setSelectedFiles(files);
    // Generate previews
    Promise.all(files.map((f) => readFileAsDataUrl(f))).then(setPreviews);
  }

  async function handleUpload() {
    if (!actor || selectedFiles.length === 0 || !form.title.trim()) return;
    setUploading(true);
    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const dataUrl = await readFileAsDataUrl(file);
        // Use title as-is for single upload, or append index for bulk
        const title =
          selectedFiles.length === 1 ? form.title : `${form.title} (${i + 1})`;
        await actor.addGalleryImage(
          title,
          form.description,
          form.category,
          form.date,
          form.location,
          dataUrl,
        );
      }
      toast.success(
        selectedFiles.length === 1
          ? "Image uploaded successfully!"
          : `${selectedFiles.length} images uploaded!`,
      );
      setForm(EMPTY_FORM);
      setSelectedFiles([]);
      setPreviews([]);
      if (fileRef.current) fileRef.current.value = "";
      loadImages();
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSaveEdit(id: bigint, editForm: UploadForm) {
    if (!actor) return;
    setSaving(true);
    try {
      await actor.updateGalleryImage(
        id,
        editForm.title,
        editForm.description,
        editForm.category,
        editForm.date,
        editForm.location,
      );
      toast.success("Image updated successfully!");
      setEditTarget(null);
      loadImages();
    } catch {
      toast.error("Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!actor || !deleteTarget) return;
    setDeleting(true);
    try {
      await actor.deleteGalleryImage(deleteTarget.id);
      toast.success("Image deleted.");
      setDeleteTarget(null);
      loadImages();
    } catch {
      toast.error("Delete failed. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-8" data-ocid="admin_gallery.page">
      {/* Info Banner — Plantation Drive Placeholder */}
      <div
        className="flex items-start gap-3 rounded-2xl border border-forest-green-300 p-4 md:p-5"
        style={{ backgroundColor: "#F1F8F1" }}
        data-ocid="admin_gallery.placeholder_banner"
      >
        <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">
          📸
        </span>
        <div className="min-w-0">
          <p className="font-body font-semibold text-forest-green-900 text-sm leading-snug mb-1">
            Plantation Drive Photo Placeholder is Live
          </p>
          <p className="font-body text-forest-green-800 text-sm leading-relaxed">
            A{" "}
            <span className="font-semibold">
              real plantation drive photo placeholder
            </span>{" "}
            is currently shown in the public gallery. Upload an actual
            plantation drive photo below to replace it — once uploaded, the
            placeholder will be replaced by your real photo.
          </p>
        </div>
      </div>

      {/* Upload form */}
      <div
        className="bg-card rounded-2xl border border-border shadow-card p-6"
        data-ocid="admin_gallery.upload_form"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-forest-green-100 flex items-center justify-center flex-shrink-0">
            <Plus
              className="w-5 h-5 text-forest-green-800"
              aria-hidden="true"
            />
          </div>
          <h2 className="font-heading text-xl font-bold text-forest-green-800">
            Upload New Image
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* File input */}
          <div className="md:col-span-2">
            <label
              className="block text-sm font-semibold font-body text-foreground mb-2"
              htmlFor="file-input"
            >
              Select Image(s) *
            </label>
            <div
              className="border-2 border-dashed border-forest-green-300 rounded-xl p-6 text-center cursor-pointer hover:border-forest-green-500 hover:bg-forest-green-50/40 transition-colors"
              data-ocid="admin_gallery.upload_dropzone"
            >
              <input
                id="file-input"
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                data-ocid="admin_gallery.file_input"
                className="hidden"
              />
              <label htmlFor="file-input" className="cursor-pointer block">
                <Upload
                  className="w-8 h-8 text-forest-green-500 mx-auto mb-2"
                  aria-hidden="true"
                />
                <p className="font-body text-sm text-muted-foreground">
                  <span className="text-forest-green-700 font-semibold">
                    Click to browse
                  </span>{" "}
                  or drag & drop — supports bulk upload
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  JPEG, PNG, WebP · Max 5 MB per file
                </p>
              </label>
            </div>
            {/* Previews */}
            {previews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {previews.map((src, i) => (
                  <div
                    key={src.slice(0, 30)}
                    className="relative w-16 h-16 rounded-lg overflow-hidden border border-border"
                  >
                    <img
                      src={src}
                      alt={`Preview ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <span className="flex items-center text-xs font-body text-muted-foreground pl-1">
                  {previews.length} file{previews.length > 1 ? "s" : ""}{" "}
                  selected
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label
              className="block text-sm font-semibold font-body text-foreground mb-1"
              htmlFor="upload-title"
            >
              Title *
            </label>
            <input
              id="upload-title"
              type="text"
              required
              placeholder="e.g. Plantation Drive — Nalanda"
              value={form.title}
              onChange={(e) => updateForm("title", e.target.value)}
              data-ocid="admin_gallery.title_input"
              className="w-full border border-input rounded-lg px-3 py-2 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-forest-green-400"
            />
          </div>

          {/* Category */}
          <div>
            <label
              className="block text-sm font-semibold font-body text-foreground mb-1"
              htmlFor="upload-category"
            >
              Category *
            </label>
            <select
              id="upload-category"
              value={form.category}
              onChange={(e) => updateForm("category", e.target.value)}
              data-ocid="admin_gallery.category_select"
              className="w-full border border-input rounded-lg px-3 py-2 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-forest-green-400"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label
              className="block text-sm font-semibold font-body text-foreground mb-1"
              htmlFor="upload-description"
            >
              Description
            </label>
            <textarea
              id="upload-description"
              rows={2}
              placeholder="Brief description of this image..."
              value={form.description}
              onChange={(e) => updateForm("description", e.target.value)}
              data-ocid="admin_gallery.description_textarea"
              className="w-full border border-input rounded-lg px-3 py-2 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-forest-green-400 resize-none"
            />
          </div>

          {/* Date + Location */}
          <div>
            <label
              className="block text-sm font-semibold font-body text-foreground mb-1"
              htmlFor="upload-date"
            >
              Date
            </label>
            <input
              id="upload-date"
              type="date"
              value={form.date}
              onChange={(e) => updateForm("date", e.target.value)}
              data-ocid="admin_gallery.date_input"
              className="w-full border border-input rounded-lg px-3 py-2 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-forest-green-400"
            />
          </div>
          <div>
            <label
              className="block text-sm font-semibold font-body text-foreground mb-1"
              htmlFor="upload-location"
            >
              Location
            </label>
            <input
              id="upload-location"
              type="text"
              placeholder="e.g. Patna, Bihar"
              value={form.location}
              onChange={(e) => updateForm("location", e.target.value)}
              data-ocid="admin_gallery.location_input"
              className="w-full border border-input rounded-lg px-3 py-2 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-forest-green-400"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleUpload}
            disabled={
              uploading || selectedFiles.length === 0 || !form.title.trim()
            }
            data-ocid="admin_gallery.upload_button"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest-green-800 text-white font-body font-semibold text-sm hover:bg-forest-green-900 transition-colors disabled:opacity-50 shadow-card"
          >
            <Upload className="w-4 h-4" aria-hidden="true" />
            {uploading
              ? "Uploading…"
              : selectedFiles.length > 1
                ? `Upload ${selectedFiles.length} Images`
                : "Upload Image"}
          </button>
        </div>

        {/* Loading state */}
        {uploading && (
          <div
            className="mt-4 flex items-center gap-2 text-forest-green-700 font-body text-sm"
            data-ocid="admin_gallery.upload_loading_state"
          >
            <div className="w-4 h-4 border-2 border-forest-green-400 border-t-transparent rounded-full animate-spin" />
            Uploading images, please wait…
          </div>
        )}
      </div>

      {/* Image grid */}
      <div>
        <h2 className="font-heading text-xl font-bold text-forest-green-800 mb-4">
          Gallery Images
          {images.length > 0 && (
            <span className="ml-2 text-sm font-body font-normal text-muted-foreground">
              ({images.length} total)
            </span>
          )}
        </h2>

        {/* Loading */}
        {loadingImages && (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            data-ocid="admin_gallery.loading_state"
          >
            {(["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const).map(
              (k) => (
                <div
                  key={k}
                  className="rounded-xl bg-muted animate-pulse aspect-square"
                />
              ),
            )}
          </div>
        )}

        {/* Empty */}
        {!loadingImages && images.length === 0 && (
          <div
            className="text-center py-16 bg-card rounded-2xl border border-border"
            data-ocid="admin_gallery.empty_state"
          >
            <div className="text-5xl mb-3">🖼️</div>
            <p className="font-heading text-lg font-semibold text-forest-green-800 mb-1">
              No images yet
            </p>
            <p className="font-body text-sm text-muted-foreground">
              Upload your first image using the form above.
            </p>
          </div>
        )}

        {/* Grid */}
        {!loadingImages && images.length > 0 && (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            data-ocid="admin_gallery.image_grid"
          >
            {images.map((img, idx) => (
              <div
                key={String(img.id)}
                className="relative group rounded-xl overflow-hidden border border-border shadow-sm bg-card"
                data-ocid={`admin_gallery.item.${idx + 1}`}
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={resolveImageUrl(img.imageKey)}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <span className="inline-block bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-2 py-0.5 rounded-full font-body mb-1">
                    {img.category}
                  </span>
                  <p className="font-body text-sm font-semibold text-foreground line-clamp-1">
                    {img.title}
                  </p>
                  {img.date && (
                    <p className="font-body text-xs text-muted-foreground mt-0.5">
                      {img.date}
                      {img.location ? ` · ${img.location}` : ""}
                    </p>
                  )}
                </div>
                {/* Action buttons */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => setEditTarget(img)}
                    data-ocid={`admin_gallery.edit_button.${idx + 1}`}
                    aria-label={`Edit ${img.title}`}
                    className="w-8 h-8 rounded-lg bg-white/90 hover:bg-white flex items-center justify-center shadow-sm transition-colors"
                  >
                    <Pencil
                      className="w-4 h-4 text-forest-green-700"
                      aria-hidden="true"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(img)}
                    data-ocid={`admin_gallery.delete_button.${idx + 1}`}
                    aria-label={`Delete ${img.title}`}
                    className="w-8 h-8 rounded-lg bg-white/90 hover:bg-red-50 flex items-center justify-center shadow-sm transition-colors"
                  >
                    <Trash2
                      className="w-4 h-4 text-red-500"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editTarget && (
        <EditModal
          image={editTarget}
          onSave={handleSaveEdit}
          onClose={() => setEditTarget(null)}
          saving={saving}
        />
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal
          image={deleteTarget}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
          deleting={deleting}
        />
      )}
    </div>
  );
}

export default function AdminGallery() {
  return (
    <AdminGuard>
      <AdminLayout title="Gallery Management">
        <AdminGalleryContent />
      </AdminLayout>
    </AdminGuard>
  );
}
