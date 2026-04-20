import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart3,
  Camera,
  CreditCard,
  Loader2,
  Save,
  Settings,
  Smartphone,
  UserCircle2,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../../backend";
import AdminGuard from "../../components/AdminGuard";
import AdminLayout from "../../components/AdminLayout";

function resolvePhotoUrl(key: string): string {
  if (key.startsWith("data:")) return key;
  if (key.includes("://")) return key;
  return `https://blob.caffeine.ai/${key}`;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Payment Settings Card ─────────────────────────────────────────────────────

interface PaymentCardProps {
  currentKeyId?: string;
  onSave: (keyId: string) => Promise<void>;
}

function PaymentCard({ currentKeyId, onSave }: PaymentCardProps) {
  const [keyInput, setKeyInput] = useState("");
  const [saving, setSaving] = useState(false);

  const masked = currentKeyId
    ? `${currentKeyId.slice(0, 8)}${"•".repeat(12)}`
    : null;

  async function handleSave() {
    const trimmed = keyInput.trim();
    if (!trimmed) {
      toast.error("Please enter a Razorpay Key ID.");
      return;
    }
    setSaving(true);
    try {
      await onSave(trimmed);
      setKeyInput("");
      toast.success("Razorpay Key ID saved successfully!");
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="bg-card rounded-2xl border border-border shadow-sm p-6"
      data-ocid="settings.payment.card"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <CreditCard className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground leading-tight">
            Razorpay Integration
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1 leading-relaxed">
            Add your Razorpay Key ID to enable real UPI/card/net banking
            donations on the Donate page. Get it from your{" "}
            <span className="font-semibold">
              Razorpay Dashboard → Settings → API Keys
            </span>
            .
          </p>
        </div>
      </div>

      <div className="mb-4 p-3 rounded-xl bg-muted/50 border border-border flex items-center gap-3">
        <div
          className={`w-2 h-2 rounded-full flex-shrink-0 ${masked ? "bg-primary" : "bg-muted-foreground"}`}
        />
        <p className="text-sm font-body">
          {masked ? (
            <>
              <span className="text-muted-foreground">Current key: </span>
              <code className="font-mono text-foreground font-semibold">
                {masked}
              </code>
            </>
          ) : (
            <span className="text-muted-foreground">Not configured</span>
          )}
        </p>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="razorpay-key"
          className="block text-sm font-semibold font-body text-foreground"
        >
          {masked ? "Update Key ID" : "Enter Key ID"}
        </label>
        <input
          id="razorpay-key"
          type="text"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="rzp_live_xxxxxxxxxxxx"
          data-ocid="settings.razorpay_key.input"
          className="w-full border border-input rounded-lg px-3 py-2.5 text-sm font-mono bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !keyInput.trim()}
          data-ocid="settings.razorpay.save_button"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold font-body text-sm transition-smooth hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <Save className="w-4 h-4" aria-hidden="true" />
          )}
          {saving ? "Saving…" : "Save Key ID"}
        </button>
      </div>
    </div>
  );
}

// ── NGO Stats Card ────────────────────────────────────────────────────────────

interface NgoStats {
  treesPlanted: string;
  villagesCovered: string;
  volunteers: string;
  acresConserved: string;
  farmersTrained: string;
  panchayatsCovered: string;
  householdsCovered: string;
}

interface NgoStatsCardProps {
  initialStats?: NgoStats;
  onSave: (stats: NgoStats) => Promise<void>;
}

const STAT_FIELDS: {
  key: keyof NgoStats;
  label: string;
  placeholder: string;
}[] = [
  { key: "treesPlanted", label: "Trees Planted", placeholder: "e.g. 800+" },
  {
    key: "villagesCovered",
    label: "Villages Covered",
    placeholder: "e.g. 6",
  },
  { key: "volunteers", label: "Volunteers", placeholder: "e.g. 30+" },
  {
    key: "acresConserved",
    label: "Acres of Soil Conserved",
    placeholder: "e.g. 40+",
  },
  {
    key: "farmersTrained",
    label: "Farmers Trained",
    placeholder: "e.g. 20+",
  },
  {
    key: "panchayatsCovered",
    label: "Panchayats Covered",
    placeholder: "e.g. 8",
  },
  {
    key: "householdsCovered",
    label: "Households Covered",
    placeholder: "e.g. 100+",
  },
];

function NgoStatsCard({ initialStats, onSave }: NgoStatsCardProps) {
  const [stats, setStats] = useState<NgoStats>(() => ({
    treesPlanted: initialStats?.treesPlanted ?? "",
    villagesCovered: initialStats?.villagesCovered ?? "",
    volunteers: initialStats?.volunteers ?? "",
    acresConserved: initialStats?.acresConserved ?? "",
    farmersTrained: initialStats?.farmersTrained ?? "",
    panchayatsCovered: initialStats?.panchayatsCovered ?? "",
    householdsCovered: initialStats?.householdsCovered ?? "",
  }));
  const [saving, setSaving] = useState(false);

  // Sync with new initialStats when they load
  function handleChange(key: keyof NgoStats, value: string) {
    setStats((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(stats);
      toast.success("NGO stats updated successfully!");
    } catch {
      toast.error("Failed to save stats. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="bg-card rounded-2xl border border-border shadow-sm p-6"
      data-ocid="settings.ngo_stats.card"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <BarChart3 className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground leading-tight">
            NGO Impact Stats
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            These numbers appear on the homepage and impact section. Keep them
            up to date as your work grows.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        {STAT_FIELDS.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <label
              htmlFor={`stat-${field.key}`}
              className="block text-sm font-semibold font-body text-foreground"
            >
              {field.label}
            </label>
            <input
              id={`stat-${field.key}`}
              type="text"
              value={stats[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              data-ocid={`settings.stats.${field.key}.input`}
              className="w-full border border-input rounded-lg px-3 py-2.5 text-sm font-mono bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        data-ocid="settings.stats.save_button"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold font-body text-sm transition-smooth hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? (
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        ) : (
          <Save className="w-4 h-4" aria-hidden="true" />
        )}
        {saving ? "Saving…" : "Save Stats"}
      </button>
    </div>
  );
}

// ── Photo Upload Area ─────────────────────────────────────────────────────────

interface PhotoUploaderProps {
  label: string;
  initials: string;
  currentKey?: string;
  onUpload: (dataUrl: string) => Promise<void>;
  ocidPrefix: string;
}

function PhotoUploader({
  label,
  initials,
  currentKey,
  onUpload,
  ocidPrefix,
}: PhotoUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const displayUrl =
    preview ?? (currentKey ? resolvePhotoUrl(currentKey) : null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setPreview(dataUrl);
      await onUpload(dataUrl);
      toast.success(`${label} photo saved!`);
    } catch {
      toast.error("Upload failed. Please try again.");
      setPreview(null);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div
      className="flex flex-col items-center gap-3 p-5 rounded-xl border border-border bg-background"
      data-ocid={`${ocidPrefix}.photo_card`}
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 bg-muted flex items-center justify-center">
          {displayUrl ? (
            <img
              src={displayUrl}
              alt={label}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-heading text-2xl font-bold text-primary">
              {initials}
            </span>
          )}
        </div>
        {uploading && (
          <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
            <Loader2
              className="w-5 h-5 text-white animate-spin"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="font-body font-semibold text-sm text-foreground">
          {label}
        </p>
        {currentKey && !preview ? (
          <p className="text-xs text-primary font-body mt-0.5">Photo saved ✓</p>
        ) : (
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            No photo yet
          </p>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFile}
        data-ocid={`${ocidPrefix}.file_input`}
        aria-label={`Upload ${label} photo`}
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        data-ocid={`${ocidPrefix}.upload_button`}
        className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-lg text-sm font-semibold font-body hover:bg-primary/5 transition-smooth disabled:opacity-50"
      >
        <Camera className="w-4 h-4" aria-hidden="true" />
        {uploading ? "Uploading…" : "Upload Photo"}
      </button>
    </div>
  );
}

// ── Team Photos Card ──────────────────────────────────────────────────────────

interface TeamPhotosCardProps {
  secretaryKey?: string;
  chairpersonKey?: string;
  treasurerKey?: string;
  onSaveSecretary: (photoKey: string) => Promise<void>;
  onSaveChairperson: (photoKey: string) => Promise<void>;
  onSaveTreasurer: (photoKey: string) => Promise<void>;
}

function TeamPhotosCard({
  secretaryKey,
  chairpersonKey,
  treasurerKey,
  onSaveSecretary,
  onSaveChairperson,
  onSaveTreasurer,
}: TeamPhotosCardProps) {
  return (
    <div
      className="bg-card rounded-2xl border border-border shadow-sm p-6"
      data-ocid="settings.team_photos.card"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <UserCircle2 className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground leading-tight">
            Team Member Photos
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            Upload profile photos for leadership. Photos will appear on the Team
            page immediately after saving.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <PhotoUploader
          label="Secretary"
          initials="NS"
          currentKey={secretaryKey}
          onUpload={onSaveSecretary}
          ocidPrefix="settings.secretary"
        />
        <PhotoUploader
          label="Chairperson"
          initials="CP"
          currentKey={chairpersonKey}
          onUpload={onSaveChairperson}
          ocidPrefix="settings.chairperson"
        />
        <PhotoUploader
          label="Treasurer"
          initials="TR"
          currentKey={treasurerKey}
          onUpload={onSaveTreasurer}
          ocidPrefix="settings.treasurer"
        />
      </div>
    </div>
  );
}

// ── UPI Payment Card ──────────────────────────────────────────────────────────

const UPI_STORAGE_KEY = "anumaya_upi_id";

function UpiPaymentCard() {
  const [upiInput, setUpiInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedUpiId, setSavedUpiId] = useState<string>(() => {
    try {
      return localStorage.getItem(UPI_STORAGE_KEY) ?? "";
    } catch {
      return "";
    }
  });

  async function handleSave() {
    const trimmed = upiInput.trim();
    if (!trimmed) {
      toast.error("Please enter a UPI ID.");
      return;
    }
    setSaving(true);
    try {
      localStorage.setItem(UPI_STORAGE_KEY, trimmed);
      setSavedUpiId(trimmed);
      setUpiInput("");
      toast.success("UPI ID saved successfully!");
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleClear() {
    try {
      localStorage.removeItem(UPI_STORAGE_KEY);
      setSavedUpiId("");
      toast.success("UPI ID removed.");
    } catch {
      toast.error("Failed to remove UPI ID.");
    }
  }

  return (
    <div
      className="bg-card rounded-2xl border border-border shadow-sm p-6"
      data-ocid="settings.upi.card"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Smartphone className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground leading-tight">
            UPI Payment Settings
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1 leading-relaxed">
            Set your UPI ID to display it on the public donation page. Donors
            will see this ID along with a QR code placeholder.
          </p>
        </div>
      </div>

      <div className="mb-4 p-3 rounded-xl bg-muted/50 border border-border flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full flex-shrink-0 ${savedUpiId ? "bg-primary" : "bg-muted-foreground"}`}
          />
          <p
            className="text-sm font-body"
            data-ocid="settings.upi.current_display"
          >
            {savedUpiId ? (
              <>
                <span className="text-muted-foreground">Current UPI ID: </span>
                <code className="font-mono text-foreground font-semibold">
                  {savedUpiId}
                </code>
              </>
            ) : (
              <span className="text-muted-foreground">Not configured</span>
            )}
          </p>
        </div>
        {savedUpiId && (
          <button
            type="button"
            onClick={handleClear}
            data-ocid="settings.upi.clear_button"
            className="text-xs text-red-500 hover:text-red-700 font-body font-semibold transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      <div className="space-y-3">
        <label
          htmlFor="upi-id"
          className="block text-sm font-semibold font-body text-foreground"
        >
          {savedUpiId ? "Update UPI ID" : "Enter UPI ID"}
        </label>
        <input
          id="upi-id"
          type="text"
          value={upiInput}
          onChange={(e) => setUpiInput(e.target.value)}
          placeholder="e.g. anumayasansthan@upi"
          data-ocid="settings.upi.input"
          className="w-full border border-input rounded-lg px-3 py-2.5 text-sm font-mono bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !upiInput.trim()}
          data-ocid="settings.upi.save_button"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold font-body text-sm transition-smooth hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <Save className="w-4 h-4" aria-hidden="true" />
          )}
          {saving ? "Saving…" : "Save UPI ID"}
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminSettings() {
  const { actor, isFetching } = useActor(createActor);
  const { data: settings, refetch } = useQuery({
    queryKey: ["adminSettings"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAdminSettings();
    },
    enabled: !!actor && !isFetching,
  });

  async function handleSaveRazorpay(keyId: string) {
    if (!actor) throw new Error("Actor not ready");
    const result = await actor.updateRazorpayKeyId(keyId);
    if (!result.ok) throw new Error(result.err ?? "Unknown error");
    await refetch();
  }

  async function handleSaveNgoStats(stats: NgoStats) {
    if (!actor) throw new Error("Actor not ready");
    const result = await actor.updateNgoStats(
      stats.treesPlanted,
      stats.villagesCovered,
      stats.volunteers,
      stats.acresConserved,
      stats.farmersTrained,
      stats.panchayatsCovered,
      stats.householdsCovered,
    );
    if (!result.ok) throw new Error(result.err ?? "Unknown error");
    await refetch();
  }

  async function handleSaveSecretary(photoKey: string) {
    if (!actor) throw new Error("Actor not ready");
    const result = await actor.updateTeamPhotos(
      photoKey,
      settings?.chairpersonPhotoKey ?? null,
      settings?.treasurerPhotoKey ?? null,
    );
    if (!result.ok) throw new Error(result.err ?? "Unknown error");
    await refetch();
  }

  async function handleSaveChairperson(photoKey: string) {
    if (!actor) throw new Error("Actor not ready");
    const result = await actor.updateTeamPhotos(
      settings?.secretaryPhotoKey ?? null,
      photoKey,
      settings?.treasurerPhotoKey ?? null,
    );
    if (!result.ok) throw new Error(result.err ?? "Unknown error");
    await refetch();
  }

  async function handleSaveTreasurer(photoKey: string) {
    if (!actor) throw new Error("Actor not ready");
    const result = await actor.updateTeamPhotos(
      settings?.secretaryPhotoKey ?? null,
      settings?.chairpersonPhotoKey ?? null,
      photoKey,
    );
    if (!result.ok) throw new Error(result.err ?? "Unknown error");
    await refetch();
  }

  return (
    <AdminGuard>
      <AdminLayout title="Settings">
        <div className="max-w-2xl space-y-6" data-ocid="settings.page">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground leading-tight">
                Admin Settings
              </h1>
              <p className="text-sm text-muted-foreground font-body">
                Configure payments, stats, and team photos
              </p>
            </div>
          </div>

          {isFetching && (
            <div
              className="flex items-center gap-2 text-muted-foreground font-body py-8"
              data-ocid="settings.loading_state"
            >
              <Loader2
                className="w-5 h-5 animate-spin text-primary"
                aria-hidden="true"
              />
              Loading settings…
            </div>
          )}

          {!isFetching && (
            <>
              <PaymentCard
                currentKeyId={settings?.razorpayKeyId}
                onSave={handleSaveRazorpay}
              />
              <UpiPaymentCard />
              <NgoStatsCard
                initialStats={settings?.ngoStats}
                onSave={handleSaveNgoStats}
              />
              <TeamPhotosCard
                secretaryKey={settings?.secretaryPhotoKey}
                chairpersonKey={settings?.chairpersonPhotoKey}
                treasurerKey={settings?.treasurerPhotoKey}
                onSaveSecretary={handleSaveSecretary}
                onSaveChairperson={handleSaveChairperson}
                onSaveTreasurer={handleSaveTreasurer}
              />
            </>
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
