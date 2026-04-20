import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  theme: { color: string };
  prefill: { name: string; email: string; contact: string };
  notes: { address: string };
  handler: (response: { razorpay_payment_id: string }) => void;
}

const impactItems = [
  { amount: "₹100", impact: "Plants 2 native saplings" },
  { amount: "₹500", impact: "Trains 1 community eco-volunteer" },
  { amount: "₹1,000", impact: "Conserves 10 sq ft of eroding farmland" },
  { amount: "₹5,000", impact: "Supports a community development session" },
];

const bankDetails = [
  {
    label: "Account Name",
    value: "MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN",
  },
  { label: "Bank Name", value: "Indian Bank, Khajpura Branch, Patna" },
  { label: "Account Number", value: "8285666443" },
  { label: "IFSC Code", value: "IDIB000K520" },
  { label: "MICR Code", value: "800019018" },
];

// UPI app icons row
const UPI_APPS = ["PhonePe", "GPay", "Paytm", "BHIM"];

// QR code placeholder SVG
function QRPlaceholder() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
    >
      {/* Outer border */}
      <rect
        x="2"
        y="2"
        width="116"
        height="116"
        rx="8"
        fill="#F1F8F1"
        stroke="#2E7D32"
        strokeWidth="3"
      />
      {/* Top-left finder */}
      <rect
        x="14"
        y="14"
        width="28"
        height="28"
        rx="3"
        fill="none"
        stroke="#2E7D32"
        strokeWidth="2.5"
      />
      <rect x="20" y="20" width="16" height="16" rx="1" fill="#2E7D32" />
      {/* Top-right finder */}
      <rect
        x="78"
        y="14"
        width="28"
        height="28"
        rx="3"
        fill="none"
        stroke="#2E7D32"
        strokeWidth="2.5"
      />
      <rect x="84" y="20" width="16" height="16" rx="1" fill="#2E7D32" />
      {/* Bottom-left finder */}
      <rect
        x="14"
        y="78"
        width="28"
        height="28"
        rx="3"
        fill="none"
        stroke="#2E7D32"
        strokeWidth="2.5"
      />
      <rect x="20" y="84" width="16" height="16" rx="1" fill="#2E7D32" />
      {/* Data dots (decorative pattern) */}
      {[
        [56, 14],
        [64, 14],
        [72, 14],
        [56, 22],
        [72, 22],
        [56, 30],
        [64, 30],
        [14, 56],
        [22, 56],
        [30, 56],
        [46, 56],
        [54, 56],
        [62, 56],
        [70, 56],
        [78, 56],
        [86, 56],
        [94, 56],
        [102, 56],
        [14, 64],
        [30, 64],
        [46, 64],
        [62, 64],
        [78, 64],
        [94, 64],
        [14, 72],
        [22, 72],
        [38, 72],
        [54, 72],
        [70, 72],
        [86, 72],
        [102, 72],
        [46, 80],
        [62, 80],
        [78, 80],
        [46, 88],
        [54, 88],
        [70, 88],
        [86, 88],
        [46, 96],
        [62, 96],
        [94, 96],
        [56, 104],
        [72, 104],
        [88, 104],
        [102, 104],
      ].map(([cx, cy]) => (
        <rect
          key={`${cx}-${cy}`}
          x={cx}
          y={cy}
          width="6"
          height="6"
          rx="1"
          fill="#2E7D32"
          opacity="0.7"
        />
      ))}
    </svg>
  );
}

function useAdminSettings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["adminSettings"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAdminSettings();
    },
    enabled: !!actor && !isFetching,
  });
}

// Read UPI ID from localStorage
function useUpiId(): string {
  const [upiId, setUpiId] = useState<string>(() => {
    try {
      return localStorage.getItem("anumaya_upi_id") ?? "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === "anumaya_upi_id") {
        setUpiId(e.newValue ?? "");
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return upiId;
}

// ── Razorpay Payment Button ───────────────────────────────────────────────────

const DONATION_AMOUNTS = [100, 500, 1000, 5000];

interface RazorpayButtonProps {
  keyId: string;
  razorpayLoaded: boolean;
  onSuccess: (paymentId: string) => void;
}

function RazorpayButton({
  keyId,
  razorpayLoaded,
  onSuccess,
}: RazorpayButtonProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [opening, setOpening] = useState(false);

  function getAmount(): number {
    const custom = Number(customAmount.replace(/[^0-9]/g, ""));
    if (custom >= 1) return custom;
    return selectedAmount;
  }

  function handlePay() {
    if (!razorpayLoaded || !window.Razorpay) {
      return;
    }
    const amountPaise = getAmount() * 100;
    setOpening(true);
    const rzp = new window.Razorpay({
      key: keyId,
      amount: amountPaise,
      currency: "INR",
      name: "MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN",
      description: "Donation — Plant Trees, Build Bihar",
      theme: { color: "#2E7D32" },
      prefill: { name: "", email: "", contact: "" },
      notes: { address: "Anupuri, Patna-800014, Bihar" },
      handler: (response: { razorpay_payment_id: string }) => {
        setOpening(false);
        onSuccess(response.razorpay_payment_id);
      },
    });
    rzp.open();
    setOpening(false);
  }

  return (
    <div data-ocid="donate.razorpay_widget">
      {/* Amount selector */}
      <div className="mb-4">
        <p className="text-sm font-semibold font-body text-foreground mb-3">
          Select amount
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {DONATION_AMOUNTS.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => {
                setSelectedAmount(amt);
                setCustomAmount("");
              }}
              data-ocid={`donate.amount_${amt}.button`}
              className={`px-4 py-2 rounded-full text-sm font-semibold font-body border-2 transition-all duration-150 ${
                selectedAmount === amt && !customAmount
                  ? "bg-forest-green-800 text-white border-forest-green-800"
                  : "bg-card text-forest-green-800 border-forest-green-400 hover:bg-forest-green-50"
              }`}
            >
              ₹{amt.toLocaleString("en-IN")}
            </button>
          ))}
        </div>
        <input
          type="text"
          inputMode="numeric"
          value={customAmount}
          onChange={(e) =>
            setCustomAmount(e.target.value.replace(/[^0-9]/g, ""))
          }
          placeholder="Or enter custom amount (₹)"
          data-ocid="donate.custom_amount.input"
          className="w-full border border-input rounded-lg px-3 py-2.5 text-sm font-mono bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth"
        />
      </div>

      <button
        type="button"
        onClick={handlePay}
        disabled={!razorpayLoaded || opening}
        data-ocid="donate.razorpay.pay_button"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest-green-800 text-white px-8 py-3.5 rounded-xl font-semibold font-body text-base hover:bg-forest-green-900 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
      >
        {!razorpayLoaded ? (
          <>
            <span
              className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
              aria-hidden="true"
            />
            Loading…
          </>
        ) : opening ? (
          <>
            <span
              className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
              aria-hidden="true"
            />
            Opening…
          </>
        ) : (
          <>
            <span aria-hidden="true">💳</span>
            Pay ₹{getAmount().toLocaleString("en-IN")} Securely
          </>
        )}
      </button>
      <p className="text-xs text-muted-foreground font-body mt-2">
        Secured by Razorpay · Accepts cards, UPI, net banking
      </p>
    </div>
  );
}

export default function Donate() {
  const [successPaymentId, setSuccessPaymentId] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const razorpayScriptRef = useRef<HTMLScriptElement | null>(null);

  const { data: adminSettings } = useAdminSettings();
  const razorpayKeyId = adminSettings?.razorpayKeyId ?? null;
  const upiId = useUpiId();

  // Load Razorpay checkout.js once when key is available
  useEffect(() => {
    if (!razorpayKeyId || razorpayScriptRef.current) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
    razorpayScriptRef.current = script;
    return () => {
      if (razorpayScriptRef.current) {
        document.body.removeChild(razorpayScriptRef.current);
        razorpayScriptRef.current = null;
      }
    };
  }, [razorpayKeyId]);

  return (
    <Layout
      pageTitle="Support Our Mission"
      pageDescription="Help us plant trees, protect soil, and build stronger communities in rural Bihar."
    >
      <SEO
        title="Donate"
        description="Support MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN's mission. Your donation funds plantation drives, soil conservation, and community development in Bihar."
      />

      {/* Payment Success Modal */}
      {successPaymentId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          data-ocid="donate.success_modal"
        >
          <div className="bg-card rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-2">
              Thank You for Your Donation!
            </h2>
            <p className="text-muted-foreground mb-2">
              Your payment was successful.
            </p>
            <p className="text-sm font-mono bg-muted rounded-lg px-4 py-2 inline-block mb-6 text-forest-green-800">
              Payment ID: {successPaymentId}
            </p>
            <button
              type="button"
              data-ocid="donate.success_modal_close_button"
              onClick={() => setSuccessPaymentId(null)}
              className="bg-forest-green-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-forest-green-900 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        className="relative py-20 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#1B5E20" }}
        data-ocid="donate.hero_section"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p className="font-body text-sm uppercase tracking-widest text-green-300 mb-3">
            Support Anumaya Sansthan
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5">
            Every Donation Grows Bihar's Future
          </h1>
          <p className="font-body text-white/80 text-lg max-w-2xl mx-auto">
            We are a young, grassroots NGO registered in June 2023. Your support
            directly funds plantation drives, soil conservation, and community
            empowerment across 6 Bihar districts.
          </p>
        </div>
      </section>

      {/* ── Donate Options ──────────────────────────────────── */}
      <section className="py-14 bg-cream" data-ocid="donate.options_section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          {/* ── Razorpay Online Payment ── */}
          {razorpayKeyId ? (
            <div
              className="rounded-2xl border-2 shadow-lg overflow-hidden"
              style={{ borderColor: "#2E7D32" }}
              data-ocid="donate.razorpay_section"
            >
              <div
                className="px-6 py-3 flex items-center justify-between"
                style={{ backgroundColor: "#2E7D32" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-white text-lg" aria-hidden="true">
                    💳
                  </span>
                  <span className="font-heading font-bold text-white text-base">
                    Pay Online (Razorpay)
                  </span>
                </div>
                <span className="bg-[#A5D6A7]/30 border border-[#A5D6A7]/60 text-[#A5D6A7] text-xs font-semibold px-3 py-1 rounded-full font-body">
                  Cards · UPI · Net Banking
                </span>
              </div>
              <div className="bg-card p-6">
                <p className="font-body text-sm text-muted-foreground mb-5 leading-relaxed">
                  Pay securely using Razorpay — supports credit/debit cards,
                  UPI, net banking, and wallets.
                </p>
                <RazorpayButton
                  keyId={razorpayKeyId}
                  razorpayLoaded={razorpayLoaded}
                  onSuccess={setSuccessPaymentId}
                />
              </div>
            </div>
          ) : (
            <div
              className="rounded-2xl border border-border bg-muted/40 p-5 flex items-start gap-3"
              data-ocid="donate.razorpay_pending"
            >
              <span className="text-2xl flex-shrink-0" aria-hidden="true">
                💳
              </span>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">
                  Online payments coming soon
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Online card/UPI payment via Razorpay will be enabled shortly.
                  Please use bank transfer or UPI below in the meantime.
                </p>
              </div>
            </div>
          )}
          {/* ── UPI Section (PRIMARY / EASIEST) ── */}
          <div
            className="rounded-2xl border-2 shadow-lg overflow-hidden"
            style={{ borderColor: "#2E7D32" }}
            data-ocid="donate.upi_section"
          >
            {/* Header band */}
            <div
              className="px-6 py-3 flex items-center justify-between"
              style={{ backgroundColor: "#2E7D32" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-white text-lg" aria-hidden="true">
                  📱
                </span>
                <span className="font-heading font-bold text-white text-base">
                  Donate by UPI
                </span>
              </div>
              <span className="bg-[#A5D6A7]/30 border border-[#A5D6A7]/60 text-[#A5D6A7] text-xs font-semibold px-3 py-1 rounded-full font-body">
                Easiest &amp; Fastest
              </span>
            </div>

            <div className="bg-card p-6">
              <p className="font-body text-sm text-muted-foreground mb-5 leading-relaxed">
                Scan the QR code or use your UPI app (PhonePe, GPay, Paytm,
                BHIM) to send your donation directly to our NGO account.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                {/* QR code placeholder */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div
                    className="w-36 h-36 rounded-xl border-2 border-forest-green-300 overflow-hidden shadow-sm p-2 bg-white"
                    data-ocid="donate.upi_qr_placeholder"
                  >
                    <QRPlaceholder />
                  </div>
                  <p className="text-xs text-muted-foreground font-body text-center">
                    Scan to pay
                  </p>
                </div>

                {/* UPI details */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-body">
                    UPI ID
                  </p>
                  {upiId ? (
                    <div
                      className="flex items-center gap-2 mb-3"
                      data-ocid="donate.upi_id_display"
                    >
                      <p className="font-mono text-forest-green-800 font-bold text-base break-all">
                        {upiId}
                      </p>
                      <span className="flex-shrink-0 bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-2 py-0.5 rounded-full font-body">
                        Active
                      </span>
                    </div>
                  ) : (
                    <div className="mb-3" data-ocid="donate.upi_id_pending">
                      <p className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold px-3 py-1.5 rounded-lg font-body">
                        <span aria-hidden="true">⏳</span>
                        UPI ID coming soon — check back shortly
                      </p>
                    </div>
                  )}

                  {/* UPI app pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {UPI_APPS.map((app) => (
                      <span
                        key={app}
                        className="bg-forest-green-50 border border-forest-green-200 text-forest-green-800 text-xs font-semibold px-2.5 py-1 rounded-full font-body"
                      >
                        {app}
                      </span>
                    ))}
                  </div>

                  {/* WhatsApp acknowledgement note */}
                  <div className="flex items-start gap-2.5 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
                    <span
                      className="text-green-700 text-base flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      💬
                    </span>
                    <p className="text-green-800 text-xs font-body leading-relaxed">
                      After payment, please{" "}
                      <a
                        href="https://wa.me/918210105075"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline underline-offset-2 hover:text-green-900 transition-colors"
                        data-ocid="donate.upi_whatsapp_link"
                      >
                        WhatsApp your transaction ID
                      </a>{" "}
                      to <span className="font-semibold">+91 8210105075</span>{" "}
                      for acknowledgement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bank Transfer Details ── */}
          <div data-ocid="donate.bank_section">
            <div className="text-center mb-5">
              <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-1">
                Donate via Bank Transfer
              </h2>
              <p className="font-body text-muted-foreground text-sm">
                Transfer directly to our verified bank account and inform us by
                email.
              </p>
            </div>

            {/* Bank info card */}
            <div className="bg-card rounded-2xl border-2 border-forest-green-500 shadow-lg p-8 mb-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-forest-green-100 flex items-center justify-center text-xl flex-shrink-0">
                  🏦
                </div>
                <div>
                  <h3 className="font-heading font-bold text-forest-green-900 text-lg leading-tight">
                    Indian Bank — Khajpura Branch, Patna
                  </h3>
                  <p className="text-xs text-muted-foreground font-body">
                    Verified NGO account — direct transfer
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {bankDetails.map((item) => (
                  <div
                    key={item.label}
                    className="bg-forest-green-50 border border-forest-green-200 rounded-xl p-4"
                  >
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-body">
                      {item.label}
                    </p>
                    <p className="font-semibold text-forest-green-900 font-mono text-sm break-all">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* How to donate note */}
              <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3">
                <span className="text-amber-600 text-xl flex-shrink-0 mt-0.5">
                  📋
                </span>
                <div>
                  <p className="text-amber-900 font-semibold text-sm mb-1">
                    After transferring, please inform us
                  </p>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    Transfer to the above account and email your transaction
                    details (name, amount, UTR/reference number) to{" "}
                    <a
                      href="mailto:nirmalkumarsingh9625@gmail.com"
                      className="font-semibold underline underline-offset-2 hover:text-amber-900 transition-colors"
                    >
                      nirmalkumarsingh9625@gmail.com
                    </a>
                    . We will send you an acknowledgement receipt.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Need Help */}
          <div
            className="bg-forest-green-50 border border-forest-green-300 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            data-ocid="donate.help_callout"
          >
            <div className="text-2xl flex-shrink-0" aria-hidden="true">
              🙏
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-forest-green-900 mb-1">
                Need help or have questions about donating?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 text-sm">
                <a
                  href="tel:+918210105075"
                  data-ocid="donate.help_phone_link"
                  className="inline-flex items-center gap-1.5 text-forest-green-800 font-semibold hover:text-forest-green-900 transition-colors"
                >
                  <span aria-hidden="true">📞</span>
                  +91 8210105075
                </a>
                <span
                  className="hidden sm:inline text-forest-green-300"
                  aria-hidden="true"
                >
                  |
                </span>
                <a
                  href="mailto:nirmalkumarsingh9625@gmail.com"
                  data-ocid="donate.help_email_link"
                  className="inline-flex items-center gap-1.5 text-forest-green-800 font-semibold hover:text-forest-green-900 transition-colors break-all"
                >
                  <span aria-hidden="true">✉️</span>
                  nirmalkumarsingh9625@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact of Donation ───────────────────────────────── */}
      <section
        className="py-12 bg-forest-green-900 text-white"
        data-ocid="donate.impact_section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
            What Your Donation Does
          </h2>
          <p className="font-body text-white/70 text-sm mb-8 max-w-xl mx-auto">
            Every rupee goes directly to field work — no overhead waste.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactItems.map((item) => (
              <div key={item.amount} className="bg-white/10 rounded-xl p-5">
                <p className="font-heading text-2xl font-bold text-[#A5D6A7] mb-2">
                  {item.amount}
                </p>
                <p className="text-white/80 text-sm leading-snug font-body">
                  {item.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Badges ────────────────────────────────────────── */}
      <section className="py-10 bg-cream" data-ocid="donate.trust_section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {[
              "✅ Registered NGO — S000071/23-24",
              "📅 Est. 12th June 2023",
              "🏦 Indian Bank Verified Account",
              "🌿 100% Grassroots — Bihar Based",
            ].map((badge) => (
              <span
                key={badge}
                className="bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-4 py-2 rounded-full border border-forest-green-200"
              >
                {badge}
              </span>
            ))}
          </div>
          <p className="font-body text-muted-foreground text-sm">
            We are a young NGO growing step by step. Your trust and support mean
            everything to us.
          </p>
        </div>
      </section>
    </Layout>
  );
}
