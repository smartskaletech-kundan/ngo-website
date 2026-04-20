import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../../backend";
import type { ProgramContent } from "../../backend.d";
import AdminGuard from "../../components/AdminGuard";
import AdminLayout from "../../components/AdminLayout";
import { getProgramById } from "../../data/programs";

/* ── Seed defaults from static data ──────────────────────────────────────── */
const PROGRAM_SEEDS: ProgramContent[] = [
  "plantation-drives",
  "soil-erosion-control",
  "community-development",
].map((id) => {
  const p = getProgramById(id);
  return {
    id,
    name: p?.name ?? "",
    tagline: p?.tagline ?? "",
    description: p?.description ?? "",
    heroImage: p?.heroImage ?? "",
    stat1Label: p?.stats[0]?.label ?? "",
    stat1Value: p?.stats[0]?.value ?? "",
    stat2Label: p?.stats[1]?.label ?? "",
    stat2Value: p?.stats[1]?.value ?? "",
    stat3Label: p?.stats[2]?.label ?? "",
    stat3Value: p?.stats[2]?.value ?? "",
    howItWorks: p?.howItWorks.map((s) => s.description) ?? [],
    updatedAt: 0n,
  };
});

function labelClass() {
  return "block text-sm font-semibold font-body text-foreground mb-1";
}
function inputClass() {
  return "w-full border border-input rounded-lg px-3 py-2.5 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth";
}

/* ── HowItWorks steps editor ─────────────────────────────────────────────── */
function StepsEditor({
  steps,
  onChange,
}: {
  steps: string[];
  onChange: (steps: string[]) => void;
}) {
  function update(i: number, val: string) {
    const next = [...steps];
    next[i] = val;
    onChange(next);
  }
  function add() {
    onChange([...steps, ""]);
  }
  function remove(i: number) {
    onChange(steps.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-2" data-ocid="programs.steps_editor">
      {steps.map((step, i) => (
        <div
          key={`step-${i}-${step.slice(0, 10)}`}
          className="flex gap-2 items-start"
        >
          <span className="mt-2.5 w-6 h-6 flex-shrink-0 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
            {i + 1}
          </span>
          <input
            type="text"
            className={inputClass()}
            value={step}
            onChange={(e) => update(i, e.target.value)}
            placeholder={`Step ${i + 1} description`}
            data-ocid={`programs.step.${i + 1}.input`}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="mt-2 p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors flex-shrink-0"
            aria-label={`Remove step ${i + 1}`}
            data-ocid={`programs.step.${i + 1}.delete_button`}
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-2 text-primary font-body text-sm font-semibold hover:opacity-80 transition-colors mt-1"
        data-ocid="programs.add_step_button"
      >
        <Plus className="w-4 h-4" aria-hidden="true" />
        Add Step
      </button>
    </div>
  );
}

/* ── Single program form panel ───────────────────────────────────────────── */
function ProgramPanel({
  initial,
  onSave,
}: {
  initial: ProgramContent;
  onSave: (content: ProgramContent) => Promise<void>;
}) {
  const [form, setForm] = useState<ProgramContent>(initial);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sync if initial changes (e.g. after backend fetch)
  useEffect(() => {
    setForm(initial);
  }, [initial]);

  function set(key: keyof ProgramContent, value: string | string[]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
      toast.success(`"${form.name}" saved successfully!`);
    } catch {
      toast.error("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden"
      data-ocid={`programs.panel.${initial.id}`}
    >
      {/* Panel header — click to expand */}
      <button
        type="button"
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/30 transition-colors"
        onClick={() => setOpen((v) => !v)}
        data-ocid={`programs.panel.${initial.id}.toggle`}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-lg flex-shrink-0">
            {initial.id === "plantation-drives"
              ? "🌳"
              : initial.id === "soil-erosion-control"
                ? "🌾"
                : "🤝"}
          </div>
          <div className="text-left">
            <p className="font-heading font-bold text-foreground text-base leading-tight">
              {form.name || initial.id}
            </p>
            <p className="text-xs text-muted-foreground font-body mt-0.5 line-clamp-1">
              {form.tagline || "No tagline set"}
            </p>
          </div>
        </div>
        {open ? (
          <ChevronUp
            className="w-5 h-5 text-muted-foreground flex-shrink-0"
            aria-hidden="true"
          />
        ) : (
          <ChevronDown
            className="w-5 h-5 text-muted-foreground flex-shrink-0"
            aria-hidden="true"
          />
        )}
      </button>

      {open && (
        <form
          onSubmit={handleSubmit}
          className="px-6 pb-6 space-y-5 border-t border-border pt-5"
        >
          {/* Name + Tagline */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass()} htmlFor={`${initial.id}-name`}>
                Program Name
              </label>
              <input
                id={`${initial.id}-name`}
                className={inputClass()}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
                data-ocid={`programs.${initial.id}.name.input`}
              />
            </div>
            <div>
              <label className={labelClass()} htmlFor={`${initial.id}-tagline`}>
                Tagline
              </label>
              <input
                id={`${initial.id}-tagline`}
                className={inputClass()}
                value={form.tagline}
                onChange={(e) => set("tagline", e.target.value)}
                data-ocid={`programs.${initial.id}.tagline.input`}
              />
            </div>
          </div>

          {/* Hero Image */}
          <div>
            <label className={labelClass()} htmlFor={`${initial.id}-hero`}>
              Hero Image URL
            </label>
            <input
              id={`${initial.id}-hero`}
              className={inputClass()}
              value={form.heroImage}
              onChange={(e) => set("heroImage", e.target.value)}
              placeholder="https://images.unsplash.com/..."
              data-ocid={`programs.${initial.id}.heroImage.input`}
            />
            {form.heroImage && (
              <img
                src={form.heroImage}
                alt="Hero preview"
                className="mt-2 w-full h-28 object-cover rounded-lg border border-border"
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label className={labelClass()} htmlFor={`${initial.id}-desc`}>
              Description
            </label>
            <textarea
              id={`${initial.id}-desc`}
              className={inputClass()}
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              data-ocid={`programs.${initial.id}.description.textarea`}
            />
          </div>

          {/* Stats */}
          <div>
            <p className={labelClass()}>Impact Stats (3 stats)</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {([1, 2, 3] as const).map((n) => {
                const labelKey = `stat${n}Label` as keyof ProgramContent;
                const valueKey = `stat${n}Value` as keyof ProgramContent;
                return (
                  <div
                    key={n}
                    className="space-y-1.5 bg-muted/30 p-3 rounded-lg border border-border"
                  >
                    <label
                      className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                      htmlFor={`${initial.id}-stat${n}-label`}
                    >
                      Stat {n} Label
                    </label>
                    <input
                      id={`${initial.id}-stat${n}-label`}
                      className={inputClass()}
                      value={String(form[labelKey] ?? "")}
                      onChange={(e) => set(labelKey, e.target.value)}
                      placeholder="e.g. Trees Planted"
                      data-ocid={`programs.${initial.id}.stat${n}Label.input`}
                    />
                    <label
                      className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-1"
                      htmlFor={`${initial.id}-stat${n}-value`}
                    >
                      Stat {n} Value
                    </label>
                    <input
                      id={`${initial.id}-stat${n}-value`}
                      className={inputClass()}
                      value={String(form[valueKey] ?? "")}
                      onChange={(e) => set(valueKey, e.target.value)}
                      placeholder="e.g. 800+"
                      data-ocid={`programs.${initial.id}.stat${n}Value.input`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* How It Works steps */}
          <div>
            <p className={labelClass()}>How It Works Steps</p>
            <StepsEditor
              steps={form.howItWorks}
              onChange={(steps) => set("howItWorks", steps)}
            />
          </div>

          {/* Save */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold font-body text-sm transition-smooth hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              data-ocid={`programs.${initial.id}.save_button`}
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              ) : (
                <Save className="w-4 h-4" aria-hidden="true" />
              )}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────────────────── */
export default function AdminPrograms() {
  const qc = useQueryClient();
  const { actor, isFetching } = useActor(createActor);

  const { data: programs, isLoading } = useQuery<ProgramContent[]>({
    queryKey: ["adminPrograms"],
    queryFn: async () => {
      if (!actor) return PROGRAM_SEEDS;
      const result = await actor.listPrograms();
      // Merge: for any program not yet in backend, use seed
      return PROGRAM_SEEDS.map((seed) => {
        const found = result.find((p) => p.id === seed.id);
        return found ?? seed;
      });
    },
    enabled: !!actor && !isFetching,
    placeholderData: PROGRAM_SEEDS,
  });

  async function handleSave(content: ProgramContent) {
    if (!actor) throw new Error("Actor not ready");
    const result = await actor.upsertProgramContent(content);
    if (result.__kind__ === "err") throw new Error(result.err);
    await qc.invalidateQueries({ queryKey: ["adminPrograms"] });
  }

  const displayPrograms = programs ?? PROGRAM_SEEDS;

  return (
    <AdminGuard>
      <AdminLayout title="Programs Management">
        <div className="max-w-3xl space-y-6" data-ocid="admin.programs.page">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
              🌿
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground leading-tight">
                Programs Management
              </h1>
              <p className="text-sm text-muted-foreground font-body">
                Edit content for each of the 3 programs — changes appear live on
                the site
              </p>
            </div>
          </div>

          {/* Info note */}
          <div className="flex items-start gap-2 bg-forest-green-50 border border-forest-green-200 rounded-lg p-3">
            <span
              className="text-forest-green-600 text-sm flex-shrink-0 mt-0.5"
              aria-hidden="true"
            >
              ℹ️
            </span>
            <p className="text-forest-green-800 text-xs font-body leading-relaxed">
              Click a program card to expand and edit its content. Changes saved
              here will override the default site content. Stats, description,
              and how-it-works steps are all editable.
            </p>
          </div>

          {/* Loading */}
          {isLoading && (
            <div
              className="flex items-center gap-2 text-muted-foreground font-body py-6"
              data-ocid="programs.loading_state"
            >
              <Loader2
                className="w-5 h-5 animate-spin text-primary"
                aria-hidden="true"
              />
              Loading programs…
            </div>
          )}

          {/* Program panels */}
          {displayPrograms.map((program) => (
            <ProgramPanel
              key={program.id}
              initial={program}
              onSave={handleSave}
            />
          ))}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
