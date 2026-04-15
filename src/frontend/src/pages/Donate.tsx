import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import CampaignCard from "../components/CampaignCard";
import Layout from "../components/Layout";

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

const presetAmounts = ["₹100", "₹500", "₹1,000", "₹2,500", "₹5,000"];
const campaigns = [
  {
    icon: "🌱",
    title: "Plant 1000 Trees",
    goal: "₹5,00,000",
    raised: "₹3,20,000",
    percent: 64,
  },
  {
    icon: "💧",
    title: "Save Soil Program",
    goal: "₹3,00,000",
    raised: "₹1,80,000",
    percent: 60,
  },
  {
    icon: "🏘️",
    title: "Clean Village Initiative",
    goal: "₹2,00,000",
    raised: "₹1,40,000",
    percent: 70,
  },
];

const donors = [
  {
    name: "Rajesh Sharma",
    amount: "₹1,000",
    campaign: "Plant 1000 Trees",
    date: "Apr 2024",
  },
  {
    name: "Priya Verma",
    amount: "₹500",
    campaign: "Clean Village",
    date: "Apr 2024",
  },
  {
    name: "Anonymous",
    amount: "₹5,000",
    campaign: "Save Soil",
    date: "Mar 2024",
  },
  {
    name: "Amit Kumar",
    amount: "₹2,500",
    campaign: "Plant 1000 Trees",
    date: "Mar 2024",
  },
  {
    name: "Sunita Devi",
    amount: "₹100",
    campaign: "General Fund",
    date: "Mar 2024",
  },
];

const impactItems = [
  { amount: "₹100", impact: "Plants 2 saplings" },
  { amount: "₹500", impact: "Trains 1 Eco-Champion" },
  { amount: "₹1,000", impact: "Conserves 10 sq ft of eroding soil" },
  {
    amount: "₹5,000",
    impact: "Funds waste management for 1 household for a year",
  },
];

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

function parseAmount(amountStr: string): number {
  if (!amountStr) return 0;
  return Number.parseInt(amountStr.replace(/[₹,]/g, ""), 10) || 0;
}

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState("₹500");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [selectedCampaign, setSelectedCampaign] = useState("General Donation");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pan: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [successPaymentId, setSuccessPaymentId] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const razorpayScriptRef = useRef<HTMLScriptElement | null>(null);

  const { data: adminSettings } = useAdminSettings();
  const razorpayKeyId = adminSettings?.razorpayKeyId ?? null;

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
      // cleanup on unmount
      if (razorpayScriptRef.current) {
        document.body.removeChild(razorpayScriptRef.current);
        razorpayScriptRef.current = null;
      }
    };
  }, [razorpayKeyId]);

  const getNumericAmount = (): number => {
    if (selectedAmount === "custom") return parseAmount(customAmount);
    return parseAmount(selectedAmount);
  };

  const handleRazorpayPayment = () => {
    if (!razorpayKeyId || !razorpayLoaded || !window.Razorpay) return;
    const amount = getNumericAmount();
    if (amount <= 0) return;

    const options = {
      key: razorpayKeyId,
      amount: amount * 100,
      currency: "INR",
      name: "Anumaya Sansthan",
      description: `Donation - ${selectedCampaign}`,
      theme: { color: "#2E7D32" },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone ? `+91${form.phone}` : "",
      },
      notes: { address: "Patna, Bihar, India" },
      handler: (response: { razorpay_payment_id: string }) => {
        setSuccessPaymentId(response.razorpay_payment_id);
        setSubmitted(false);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      razorpayKeyId &&
      (paymentMethod === "card" ||
        paymentMethod === "upi" ||
        paymentMethod === "netbanking")
    ) {
      handleRazorpayPayment();
    } else {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const isRazorpayActive = !!razorpayKeyId;
  const razorpayApplicable = paymentMethod !== "neft";

  return (
    <Layout
      pageTitle="Your Donation Makes a Difference"
      pageDescription="Help us plant trees, save soil, and transform lives in rural Bihar."
    >
      {/* Payment Success Modal */}
      {successPaymentId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          data-ocid="donate.success_modal"
        >
          <div className="bg-card rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center animate-fade-in-up">
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
            <p className="text-xs text-muted-foreground mb-6">
              A receipt will be emailed to you. You are eligible for 80G tax
              deduction.
            </p>
            <button
              type="button"
              data-ocid="donate.success_modal_close"
              onClick={() => setSuccessPaymentId(null)}
              className="bg-forest-green-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-forest-green-900 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Amount selection */}
      <section className="py-12 bg-cream" data-ocid="donate.amount_section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-card rounded-card shadow-card p-8">
            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-6">
              Choose Your Contribution
            </h2>
            <div className="flex flex-wrap gap-3 mb-5">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount("");
                  }}
                  data-ocid={`donate.amount_button_${amt.replace("₹", "").replace(",", "")}`}
                  className={`px-5 py-2 rounded-full font-semibold text-sm border-2 transition-all duration-200 ${
                    selectedAmount === amt && !customAmount
                      ? "bg-forest-green-800 border-forest-green-800 text-white"
                      : "border-forest-green-300 text-forest-green-800 hover:bg-forest-green-50"
                  }`}
                >
                  {amt}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setSelectedAmount("custom")}
                data-ocid="donate.custom_amount_button"
                className={`px-5 py-2 rounded-full font-semibold text-sm border-2 transition-all duration-200 ${
                  selectedAmount === "custom"
                    ? "bg-forest-green-800 border-forest-green-800 text-white"
                    : "border-forest-green-300 text-forest-green-800 hover:bg-forest-green-50"
                }`}
              >
                Custom Amount
              </button>
            </div>
            {selectedAmount === "custom" && (
              <div className="flex items-center border-2 border-forest-green-300 rounded-lg overflow-hidden max-w-xs">
                <span className="px-3 py-2 bg-forest-green-50 text-forest-green-800 font-bold border-r-2 border-forest-green-300">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  data-ocid="donate.custom_amount_input"
                  className="px-3 py-2 flex-1 outline-none text-foreground bg-card"
                />
              </div>
            )}

            {/* Campaign selector */}
            <div className="mt-5">
              <label
                className="block text-sm font-medium text-foreground mb-2"
                htmlFor="campaign-select"
              >
                Donate Towards
              </label>
              <select
                id="campaign-select"
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                data-ocid="donate.campaign_select"
                className="w-full max-w-xs px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background text-foreground"
              >
                <option>General Donation</option>
                {campaigns.map((c) => (
                  <option key={c.title}>{c.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Cards */}
      <section
        className="py-12 bg-impact-green"
        data-ocid="donate.campaigns_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-8 text-center">
            Support a Campaign
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {campaigns.map((c, i) => (
              <CampaignCard key={c.title} {...c} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-12 bg-cream" data-ocid="donate.form_section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-card rounded-card shadow-card p-8">
            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-6">
              Your Details
            </h2>

            {submitted && (
              <div
                className="bg-forest-green-100 border border-forest-green-300 text-forest-green-900 rounded-lg p-4 mb-6 flex items-center gap-2"
                data-ocid="donate.success_state"
              >
                <span>✅</span>
                <span className="font-medium">
                  Thank you! Please use the UPI/bank details below to complete
                  your transfer.
                </span>
              </div>
            )}

            {/* Online payment coming soon notice — only when Razorpay NOT configured */}
            {!isRazorpayActive && (
              <div
                className="bg-muted border border-border rounded-lg p-4 mb-6 flex items-start gap-3"
                data-ocid="donate.payment_coming_soon"
              >
                <span className="text-xl">ℹ️</span>
                <p className="text-sm text-muted-foreground">
                  Online payment is coming soon. Please use UPI or bank transfer
                  details below to donate directly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-sm font-medium text-foreground mb-1"
                    htmlFor="donor-name"
                  >
                    Full Name *
                  </label>
                  <input
                    id="donor-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    data-ocid="donate.name_input"
                    className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                    placeholder="Ramesh Kumar"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-foreground mb-1"
                    htmlFor="donor-email"
                  >
                    Email Address *
                  </label>
                  <input
                    id="donor-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    data-ocid="donate.email_input"
                    className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                    placeholder="ramesh@example.com"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-sm font-medium text-foreground mb-1"
                    htmlFor="donor-phone"
                  >
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="px-3 py-2.5 bg-muted border border-input border-r-0 rounded-l-lg text-sm text-muted-foreground">
                      +91
                    </span>
                    <input
                      id="donor-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      data-ocid="donate.phone_input"
                      className="flex-1 px-4 py-2.5 border border-input rounded-r-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                      placeholder="9876543210"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-foreground mb-1"
                    htmlFor="donor-pan"
                  >
                    PAN Number (for 80G)
                  </label>
                  <input
                    id="donor-pan"
                    type="text"
                    value={form.pan}
                    onChange={(e) => setForm({ ...form, pan: e.target.value })}
                    data-ocid="donate.pan_input"
                    className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                    placeholder="ABCDE1234F (optional)"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-foreground mb-1"
                  htmlFor="donor-address"
                >
                  Address
                </label>
                <textarea
                  id="donor-address"
                  rows={2}
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  data-ocid="donate.address_textarea"
                  className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background resize-none"
                  placeholder="Your full address"
                />
              </div>

              <fieldset>
                <legend className="block text-sm font-medium text-foreground mb-3">
                  Payment Method
                </legend>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { value: "card", label: "💳 Card", id: "pay-card" },
                    { value: "upi", label: "📱 UPI", id: "pay-upi" },
                    {
                      value: "netbanking",
                      label: "🌐 Net Banking",
                      id: "pay-net",
                    },
                    { value: "neft", label: "🏛️ NEFT/RTGS", id: "pay-neft" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      htmlFor={opt.id}
                      className={`flex items-center justify-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all text-sm font-medium ${
                        paymentMethod === opt.value
                          ? "border-forest-green-600 bg-forest-green-50 text-forest-green-800"
                          : "border-input hover:border-forest-green-300"
                      }`}
                    >
                      <input
                        id={opt.id}
                        type="radio"
                        name="payment"
                        value={opt.value}
                        checked={paymentMethod === opt.value}
                        onChange={() => setPaymentMethod(opt.value)}
                        data-ocid={`donate.payment_${opt.value}_radio`}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Razorpay badge */}
              {isRazorpayActive && razorpayApplicable && (
                <div
                  className="flex items-center gap-2 text-sm text-forest-green-800 bg-forest-green-50 border border-forest-green-200 rounded-lg px-4 py-2.5"
                  data-ocid="donate.razorpay_badge"
                >
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-forest-green-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span className="font-medium">
                    Secure payment powered by Razorpay
                  </span>
                </div>
              )}

              <button
                type="submit"
                data-ocid="donate.submit_button"
                className="w-full bg-forest-green-800 text-white py-4 rounded-lg font-bold text-lg hover:bg-forest-green-900 hover:scale-[1.02] transition-all duration-200 shadow-card"
              >
                {isRazorpayActive && razorpayApplicable
                  ? `🔒 Pay ₹${getNumericAmount().toLocaleString("en-IN")} Securely`
                  : "🔒 Donate Now — Secure & Safe"}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                All donations are eligible for 80G tax deduction. Your payment
                is 100% secure.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Bank Details */}
      <section
        className="py-12 bg-impact-green"
        data-ocid="donate.bank_section"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-card rounded-card border-2 border-forest-green-400 shadow-card p-8">
            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-6">
              💳 Bank Transfer Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { label: "Account Name", value: "Anumaya Sansthan" },
                {
                  label: "Bank Name",
                  value: "Indian Bank, Khajpura Branch, Patna",
                },
                { label: "Account Number", value: "8285666443" },
                { label: "IFSC Code", value: "IDIB000K520" },
                { label: "MICR Code", value: "800019018" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-forest-green-50 rounded-lg p-3"
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    {item.label}
                  </p>
                  <p className="font-semibold text-forest-green-900 font-mono text-sm">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* UPI */}
            <div className="border-t border-forest-green-200 pt-6">
              <h3 className="font-heading font-bold text-forest-green-900 mb-4">
                📱 UPI Payment
              </h3>
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="border-2 border-dashed border-forest-green-300 rounded-card p-6 text-center w-40 flex-shrink-0 bg-forest-green-50">
                  <div className="text-4xl mb-2">📲</div>
                  <p className="text-xs text-forest-green-700 font-medium">
                    QR Code
                  </p>
                  <p className="text-xs text-muted-foreground">Scan to Pay</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    UPI ID:
                  </p>
                  <p className="font-mono text-forest-green-800 font-bold text-base mb-3">
                    anumayasansthan@indianbank
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Scan using any UPI app: Google Pay, PhonePe, Paytm, BHIM
                  </p>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              {[
                "🔒 SSL Secure",
                "✅ 100% Verified NGO",
                "💸 80G Tax Benefit",
                "🛡️ PCIDSS Compliant",
              ].map((badge) => (
                <span
                  key={badge}
                  className="bg-forest-green-100 text-forest-green-800 text-xs font-semibold px-3 py-1.5 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Donors */}
      <section className="py-12 bg-cream" data-ocid="donate.donors_section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-6 text-center">
            Our Generous Donors — Thank You! 🙏
          </h2>
          <div className="bg-card rounded-card shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-forest-green-800 text-white">
                    <th className="text-left px-4 py-3 font-semibold">
                      Donor Name
                    </th>
                    <th className="text-right px-4 py-3 font-semibold">
                      Amount
                    </th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">
                      Campaign
                    </th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map((donor, i) => (
                    <tr
                      key={`${donor.name}-${i}`}
                      className={`border-b border-border ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}
                      data-ocid={`donate.donor_row.${i + 1}`}
                    >
                      <td className="px-4 py-3 font-medium">{donor.name}</td>
                      <td className="px-4 py-3 text-right font-bold text-forest-green-700">
                        {donor.amount}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                        {donor.campaign}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                        {donor.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Impact of donation */}
      <section
        className="py-12 bg-forest-green-900 text-white"
        data-ocid="donate.impact_section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-2xl font-bold mb-8">
            The Impact of Your Donation
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactItems.map((item) => (
              <div key={item.amount} className="bg-white/10 rounded-card p-5">
                <p className="font-heading text-2xl font-bold text-light-green mb-2">
                  {item.amount}
                </p>
                <p className="text-white/80 text-sm leading-snug">
                  {item.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
