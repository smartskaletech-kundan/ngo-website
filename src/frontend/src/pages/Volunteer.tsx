import { useState } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  cityState: string;
  areaOfInterest: string;
  weekdays: boolean;
  weekends: boolean;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  cityState?: string;
  areaOfInterest?: string;
  availability?: string;
}

const initialForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  cityState: "",
  areaOfInterest: "",
  weekdays: false,
  weekends: false,
  message: "",
};

const benefitCards = [
  {
    id: "skills",
    color: "forest-green",
    borderColor: "border-t-[#2E7D32]",
    iconBg: "bg-[#E8F5E9]",
    title: "Build New Skills",
    description:
      "Gain hands-on experience in community development, environmental work, and leadership that stays with you for life.",
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-[#2E7D32]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l-3.5 1.75M12 20l-9-5m9 5l9-5"
        />
      </svg>
    ),
  },
  {
    id: "community",
    color: "earth-brown",
    borderColor: "border-t-[#6D4C41]",
    iconBg: "bg-[#EFEBE9]",
    title: "Be Part of a Community",
    description:
      "Connect with passionate changemakers from across India who share your vision for a greener, more equitable world.",
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-[#6D4C41]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a4 4 0 00-4-4h-1m-6 6H2v-2a4 4 0 014-4h1m6 6v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2m8-10a4 4 0 11-8 0 4 4 0 018 0zm6-2a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: "impact",
    color: "forest-green",
    borderColor: "border-t-[#2E7D32]",
    iconBg: "bg-[#E8F5E9]",
    title: "Create Real Impact",
    description:
      "Every hour you give translates directly into trees planted, children educated, and families supported.",
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-[#2E7D32]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
];

function validate(
  data: FormData,
  touched: Partial<Record<keyof FormData, boolean>>,
): FormErrors {
  const errors: FormErrors = {};
  if (touched.fullName && !data.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }
  if (touched.email) {
    if (!data.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Please enter a valid email address.";
    }
  }
  if (touched.phone) {
    if (!data.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(data.phone.replace(/\s/g, ""))) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }
  }
  if (touched.cityState && !data.cityState.trim()) {
    errors.cityState = "City / State is required.";
  }
  if (touched.areaOfInterest && !data.areaOfInterest) {
    errors.areaOfInterest = "Please select an area of interest.";
  }
  if (
    (touched.weekdays || touched.weekends) &&
    !data.weekdays &&
    !data.weekends
  ) {
    errors.availability = "Please select at least one availability option.";
  }
  return errors;
}

function validateAll(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) errors.fullName = "Full name is required.";
  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\d{10}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }
  if (!data.cityState.trim()) errors.cityState = "City / State is required.";
  if (!data.areaOfInterest)
    errors.areaOfInterest = "Please select an area of interest.";
  if (!data.weekdays && !data.weekends)
    errors.availability = "Please select at least one availability option.";
  return errors;
}

export default function Volunteer() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  const handleBlur = (field: keyof FormData) => {
    const newTouched = { ...touched, [field]: true };
    setTouched(newTouched);
    setErrors(validate(form, newTouched));
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    const newForm = { ...form, [field]: value };
    setForm(newForm);
    if (touched[field]) {
      setErrors(validate(newForm, touched));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched: Partial<Record<keyof FormData, boolean>> = {
      fullName: true,
      email: true,
      phone: true,
      cityState: true,
      areaOfInterest: true,
      weekdays: true,
      weekends: true,
    };
    setTouched(allTouched);
    const errs = validateAll(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <Layout
      pageTitle="Volunteer With Us — MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN"
      pageDescription="Join thousands of volunteers creating positive change across India with MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN."
    >
      <SEO
        title="Volunteer With Us"
        description="Join MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN as a volunteer. Help with tree planting, education, health camps, and community events across Bihar."
      />
      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[420px] flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)",
        }}
        data-ocid="volunteer.hero_section"
      >
        {/* Decorative leaf pattern overlay */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
          viewBox="0 0 800 500"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {[
            { cx: 60, cy: 80, r: 0 },
            { cx: 200, cy: 30, r: 25 },
            { cx: 400, cy: 100, r: 50 },
            { cx: 600, cy: 50, r: 75 },
            { cx: 750, cy: 90, r: 100 },
            { cx: 100, cy: 250, r: 125 },
            { cx: 350, cy: 300, r: 150 },
            { cx: 550, cy: 200, r: 175 },
            { cx: 700, cy: 350, r: 200 },
            { cx: 50, cy: 420, r: 225 },
            { cx: 250, cy: 460, r: 250 },
            { cx: 450, cy: 400, r: 275 },
            { cx: 650, cy: 440, r: 300 },
          ].map(({ cx, cy, r }) => (
            <ellipse
              key={`leaf-${cx}-${cy}`}
              cx={cx}
              cy={cy}
              rx="28"
              ry="14"
              fill="white"
              transform={`rotate(${r} ${cx} ${cy})`}
            />
          ))}
        </svg>

        <div className="relative z-10 text-center px-4 sm:px-8 py-16 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center justify-center gap-1.5 text-sm text-white/70">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li aria-hidden="true">
                <span className="text-white/40">/</span>
              </li>
              <li className="text-white/90 font-medium">Volunteer</li>
            </ol>
          </nav>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            Make a Difference —<br className="hidden sm:block" /> Volunteer With
            Us
          </h1>
          <p className="text-white/90 text-lg sm:text-xl mb-4 font-light max-w-xl mx-auto">
            Join thousands of volunteers creating positive change across India
          </p>
          <p
            className="text-white/80 text-lg"
            style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
          >
            बदलाव की शुरुआत आपसे होती है
          </p>
        </div>

        {/* Organic wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 48"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-12 fill-[#F9F6F0]"
          >
            <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" />
          </svg>
        </div>
      </section>

      {/* ── Why Volunteer Cards ───────────────────────────────────────────────── */}
      <section
        className="py-16 md:py-20 bg-[#F9F6F0]"
        data-ocid="volunteer.benefits_section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2E7D32] mb-3">
              Why Volunteer?
            </h2>
            <p className="text-foreground/65 text-base max-w-lg mx-auto">
              Discover the transformative benefits of giving your time to a
              cause that matters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {benefitCards.map((card, i) => (
              <div
                key={card.id}
                className={`bg-card rounded-xl shadow-md border-t-4 ${card.borderColor} p-7 flex flex-col items-start hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300`}
                data-ocid={`volunteer.benefit_card.${i + 1}`}
              >
                <div className={`${card.iconBg} rounded-xl p-3 mb-5`}>
                  {card.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-foreground/65 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="bg-[#F9F6F0] overflow-hidden leading-none">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 40"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 fill-white"
        >
          <path d="M0,20 C480,40 960,0 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>

      {/* ── Registration Form ─────────────────────────────────────────────────── */}
      <section
        className="py-16 md:py-20 bg-card"
        data-ocid="volunteer.form_section"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2E7D32] mb-3">
              Register as a Volunteer
            </h2>
            <p className="text-foreground/65 text-base">
              Fill in the form below and our team will contact you within 2–3
              working days.
            </p>
          </div>

          {submitted ? (
            /* ── Thank-You Card ── */
            <div
              className="bg-[#F1F8E9] border border-[#A5D6A7] rounded-2xl shadow-lg p-10 text-center"
              data-ocid="volunteer.success_state"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#2E7D32] mx-auto mb-6">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#2E7D32] mb-3">
                Thank You for Volunteering!
              </h3>
              <p className="text-foreground/70 text-base max-w-md mx-auto">
                We've received your registration. Our team will reach out to you
                within 2–3 working days.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm(initialForm);
                  setTouched({});
                  setErrors({});
                }}
                data-ocid="volunteer.register_again_button"
                className="mt-7 inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[#2E7D32] text-[#2E7D32] rounded-full font-semibold hover:bg-[#2E7D32] hover:text-white transition-all duration-200"
              >
                Register Another Volunteer
              </button>
            </div>
          ) : (
            /* ── Registration Form ── */
            <div className="bg-background border border-border rounded-2xl shadow-lg p-8 md:p-10">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    className="block text-sm font-semibold text-foreground mb-1.5"
                    htmlFor="vol-full-name"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="vol-full-name"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    onBlur={() => handleBlur("fullName")}
                    data-ocid="volunteer.full_name_input"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-card transition-colors ${errors.fullName ? "border-red-400" : "border-input"}`}
                    placeholder="Enter your full name"
                    aria-describedby={
                      errors.fullName ? "vol-name-error" : undefined
                    }
                  />
                  {errors.fullName && (
                    <p
                      id="vol-name-error"
                      className="mt-1 text-xs text-red-500"
                      data-ocid="volunteer.full_name_field_error"
                    >
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email + Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-sm font-semibold text-foreground mb-1.5"
                      htmlFor="vol-email"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="vol-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      data-ocid="volunteer.email_input"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-card transition-colors ${errors.email ? "border-red-400" : "border-input"}`}
                      placeholder="you@example.com"
                      aria-describedby={
                        errors.email ? "vol-email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <p
                        id="vol-email-error"
                        className="mt-1 text-xs text-red-500"
                        data-ocid="volunteer.email_field_error"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold text-foreground mb-1.5"
                      htmlFor="vol-phone"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="vol-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      onBlur={() => handleBlur("phone")}
                      data-ocid="volunteer.phone_input"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-card transition-colors ${errors.phone ? "border-red-400" : "border-input"}`}
                      placeholder="10-digit mobile number"
                      aria-describedby={
                        errors.phone ? "vol-phone-error" : undefined
                      }
                    />
                    {errors.phone && (
                      <p
                        id="vol-phone-error"
                        className="mt-1 text-xs text-red-500"
                        data-ocid="volunteer.phone_field_error"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* City/State + Area of Interest */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-sm font-semibold text-foreground mb-1.5"
                      htmlFor="vol-city"
                    >
                      City / State <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="vol-city"
                      type="text"
                      value={form.cityState}
                      onChange={(e) =>
                        handleChange("cityState", e.target.value)
                      }
                      onBlur={() => handleBlur("cityState")}
                      data-ocid="volunteer.city_input"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-card transition-colors ${errors.cityState ? "border-red-400" : "border-input"}`}
                      placeholder="e.g. Patna, Bihar"
                      aria-describedby={
                        errors.cityState ? "vol-city-error" : undefined
                      }
                    />
                    {errors.cityState && (
                      <p
                        id="vol-city-error"
                        className="mt-1 text-xs text-red-500"
                        data-ocid="volunteer.city_field_error"
                      >
                        {errors.cityState}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold text-foreground mb-1.5"
                      htmlFor="vol-area"
                    >
                      Area of Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="vol-area"
                      value={form.areaOfInterest}
                      onChange={(e) =>
                        handleChange("areaOfInterest", e.target.value)
                      }
                      onBlur={() => handleBlur("areaOfInterest")}
                      data-ocid="volunteer.area_select"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-card transition-colors ${errors.areaOfInterest ? "border-red-400" : "border-input"}`}
                      aria-describedby={
                        errors.areaOfInterest ? "vol-area-error" : undefined
                      }
                    >
                      <option value="">Select an area</option>
                      <option value="Environment">Environment</option>
                      <option value="Education">Education</option>
                      <option value="Health">Health</option>
                      <option value="Rural Development">
                        Rural Development
                      </option>
                      <option value="Events">Events</option>
                    </select>
                    {errors.areaOfInterest && (
                      <p
                        id="vol-area-error"
                        className="mt-1 text-xs text-red-500"
                        data-ocid="volunteer.area_field_error"
                      >
                        {errors.areaOfInterest}
                      </p>
                    )}
                  </div>
                </div>

                {/* Availability (fieldset+legend for Biome compliance) */}
                <fieldset>
                  <legend className="block text-sm font-semibold text-foreground mb-2">
                    Availability <span className="text-red-500">*</span>
                  </legend>
                  <div className="flex items-center gap-8">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        id="vol-weekdays"
                        checked={form.weekdays}
                        onChange={(e) =>
                          handleChange("weekdays", e.target.checked)
                        }
                        data-ocid="volunteer.weekdays_checkbox"
                        className="w-4 h-4 rounded border-input accent-[#2E7D32] cursor-pointer"
                      />
                      <span className="text-sm text-foreground">Weekdays</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        id="vol-weekends"
                        checked={form.weekends}
                        onChange={(e) =>
                          handleChange("weekends", e.target.checked)
                        }
                        data-ocid="volunteer.weekends_checkbox"
                        className="w-4 h-4 rounded border-input accent-[#2E7D32] cursor-pointer"
                      />
                      <span className="text-sm text-foreground">Weekends</span>
                    </label>
                  </div>
                  {errors.availability && (
                    <p
                      className="mt-1 text-xs text-red-500"
                      data-ocid="volunteer.availability_field_error"
                    >
                      {errors.availability}
                    </p>
                  )}
                </fieldset>

                {/* Message (optional) */}
                <div>
                  <label
                    className="block text-sm font-semibold text-foreground mb-1.5"
                    htmlFor="vol-message"
                  >
                    Message{" "}
                    <span className="text-foreground/40 font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="vol-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    data-ocid="volunteer.message_textarea"
                    className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-card resize-none transition-colors"
                    placeholder="Tell us why you want to volunteer..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  data-ocid="volunteer.submit_button"
                  className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3.5 rounded-lg transition-colors duration-200 text-base shadow-md hover:shadow-lg"
                >
                  Join as Volunteer
                </button>

                <p className="text-center text-xs text-foreground/45 mt-2">
                  By submitting, you agree to be contacted by our team. No spam,
                  ever.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ── Wave to footer ───────────────────────────────────────────────────── */}
      <div className="bg-card overflow-hidden leading-none">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 40"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 fill-[#F9F6F0]"
        >
          <path d="M0,20 C360,0 1080,40 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>
    </Layout>
  );
}
