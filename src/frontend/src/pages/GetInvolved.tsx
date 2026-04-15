import { useState } from "react";
import Layout from "../components/Layout";

interface FormState {
  name: string;
  email: string;
  phone: string;
  city: string;
  skills: string;
  availability: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  city: "",
  skills: "",
  availability: "",
};

const csrPackages = [
  {
    icon: "🌳",
    title: "Plantation Drive CSR Package",
    description: "Fund tree plantation for 1,000 trees",
    amount: "₹1,50,000",
    benefit: "Impact certificate provided",
  },
  {
    icon: "♻️",
    title: "Village Waste Management CSR",
    description: "Fund waste management for 1 village for 1 year",
    amount: "₹2,50,000",
    benefit: "Monthly utilization reports",
  },
  {
    icon: "🌾",
    title: "Soil Conservation CSR",
    description: "Fund soil conservation for 50 acres",
    amount: "₹3,00,000",
    benefit: "Site visit + commemorative plaque",
  },
];

const csrCategories = [
  {
    clause: "Schedule VII, Clause (iv)",
    label: "Environmental Sustainability",
  },
  {
    clause: "Schedule VII, Clause (x)",
    label: "Rural Development",
  },
  {
    clause: "Schedule VII, Clause (ii)",
    label: "Promotion of Education",
  },
];

export default function GetInvolved() {
  const [volunteerForm, setVolunteerForm] = useState<FormState>(initialForm);
  const [partnerForm, setPartnerForm] = useState({
    org: "",
    contact: "",
    email: "",
    nature: "",
  });
  const [internModal, setInternModal] = useState(false);
  const [internForm, setInternForm] = useState({
    name: "",
    email: "",
    area: "",
  });
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted("volunteer");
    setTimeout(() => setSubmitted(null), 4000);
    setVolunteerForm(initialForm);
  };

  const handlePartner = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted("partner");
    setTimeout(() => setSubmitted(null), 4000);
    setPartnerForm({ org: "", contact: "", email: "", nature: "" });
  };

  const handleIntern = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted("intern");
    setInternModal(false);
    setTimeout(() => setSubmitted(null), 4000);
  };

  return (
    <Layout
      pageTitle="Get Involved"
      pageDescription="Volunteer, partner, or intern with Anumaya Sansthan to create real change in Bihar."
    >
      {submitted && (
        <div
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-forest-green-700 text-white px-6 py-3 rounded-full shadow-card font-semibold text-sm"
          data-ocid="get_involved.success_state"
        >
          ✅ Thank you! We'll be in touch soon.
        </div>
      )}

      {/* CSR / Corporate Partnerships */}
      <section
        className="py-16 md:py-20 bg-[#F9F6F0]"
        data-ocid="get_involved.csr_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-amber-100 text-earth-brown text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide border border-amber-200">
              Corporate Partnerships
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-earth-brown mb-3">
              Corporate Social Responsibility
            </h2>
            <p className="text-foreground/65 text-base max-w-xl mx-auto">
              Partner with Anumaya Sansthan for your CSR goals
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left — Info */}
            <div>
              <div className="bg-card border border-amber-200 rounded-card shadow-card p-7">
                <h3 className="font-heading text-xl font-bold text-earth-brown mb-4">
                  Why CSR with Anumaya?
                </h3>
                <p className="text-foreground/75 text-sm leading-relaxed mb-6">
                  Under Section 135 of the Companies Act, 2013, Indian companies
                  are mandated to spend 2% of average net profits on CSR
                  activities. Anumaya Sansthan is the ideal partner for your
                  company's environmental CSR commitments.
                </p>

                <h4 className="font-semibold text-earth-brown text-sm uppercase tracking-wide mb-3">
                  CSR Categories We Cover
                </h4>
                <div className="space-y-2.5 mb-6">
                  {csrCategories.map((cat) => (
                    <div
                      key={cat.clause}
                      className="flex items-start gap-2.5 p-3 bg-amber-50 rounded-lg border border-amber-100"
                    >
                      <span className="text-earth-brown font-bold text-sm mt-0.5 shrink-0">
                        ✅
                      </span>
                      <div>
                        <p className="font-semibold text-earth-brown text-sm">
                          {cat.label}
                        </p>
                        <p className="text-foreground/55 text-xs mt-0.5">
                          {cat.clause}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-earth-brown text-sm font-medium leading-relaxed">
                    💡 All CSR contributions are eligible for{" "}
                    <strong>80G tax deductions</strong> and come with full fund
                    utilization reports and impact documentation.
                  </p>
                </div>

                <a
                  href="mailto:contact@anumayasansthan.org?subject=CSR Partnership Inquiry"
                  data-ocid="get_involved.csr_email_button"
                  className="mt-6 inline-flex items-center gap-2 bg-earth-brown text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-card"
                >
                  ✉️ Email Us for CSR Proposals →
                </a>
              </div>
            </div>

            {/* Right — CSR Package Cards */}
            <div className="space-y-4">
              {csrPackages.map((pkg, i) => (
                <div
                  key={pkg.title}
                  className="bg-card border border-amber-200 rounded-xl shadow-card p-5 flex items-start gap-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
                  data-ocid={`get_involved.csr_package.${i + 1}`}
                >
                  <div className="text-3xl w-12 h-12 flex items-center justify-center bg-amber-100 rounded-xl shrink-0">
                    {pkg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold text-earth-brown text-base mb-1">
                      {pkg.title}
                    </h4>
                    <p className="text-foreground/65 text-sm mb-2">
                      {pkg.description}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold text-earth-brown text-lg">
                        {pkg.amount}
                      </span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200">
                        {pkg.benefit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="bg-[#F9F6F0] overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 40"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 fill-cream"
          aria-hidden="true"
        >
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>

      {/* Volunteer */}
      <section
        className="py-16 md:py-20 bg-cream"
        data-ocid="get_involved.volunteer_section"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-4xl">🙋</span>
            <h2 className="font-heading text-3xl font-bold text-forest-green-900 mt-3 mb-2">
              Volunteer With Us
            </h2>
            <p className="text-foreground/70">
              Join hands with our field teams and make a direct impact.
            </p>
          </div>
          <div className="bg-card rounded-card shadow-card p-8">
            <form onSubmit={handleVolunteer} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="vol-name"
                  >
                    Full Name *
                  </label>
                  <input
                    id="vol-name"
                    type="text"
                    required
                    value={volunteerForm.name}
                    onChange={(e) =>
                      setVolunteerForm({
                        ...volunteerForm,
                        name: e.target.value,
                      })
                    }
                    data-ocid="get_involved.volunteer_name_input"
                    className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="vol-email"
                  >
                    Email *
                  </label>
                  <input
                    id="vol-email"
                    type="email"
                    required
                    value={volunteerForm.email}
                    onChange={(e) =>
                      setVolunteerForm({
                        ...volunteerForm,
                        email: e.target.value,
                      })
                    }
                    data-ocid="get_involved.volunteer_email_input"
                    className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="vol-phone"
                  >
                    Phone
                  </label>
                  <input
                    id="vol-phone"
                    type="tel"
                    value={volunteerForm.phone}
                    onChange={(e) =>
                      setVolunteerForm({
                        ...volunteerForm,
                        phone: e.target.value,
                      })
                    }
                    data-ocid="get_involved.volunteer_phone_input"
                    className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                    placeholder="+91 98765..."
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="vol-city"
                  >
                    City
                  </label>
                  <input
                    id="vol-city"
                    type="text"
                    value={volunteerForm.city}
                    onChange={(e) =>
                      setVolunteerForm({
                        ...volunteerForm,
                        city: e.target.value,
                      })
                    }
                    data-ocid="get_involved.volunteer_city_input"
                    className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                    placeholder="Patna, Bihar"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="vol-skills"
                >
                  Skills &amp; Expertise
                </label>
                <input
                  id="vol-skills"
                  type="text"
                  value={volunteerForm.skills}
                  onChange={(e) =>
                    setVolunteerForm({
                      ...volunteerForm,
                      skills: e.target.value,
                    })
                  }
                  data-ocid="get_involved.volunteer_skills_input"
                  className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                  placeholder="e.g., Agriculture, Teaching, Photography"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="vol-avail"
                >
                  Availability
                </label>
                <select
                  id="vol-avail"
                  value={volunteerForm.availability}
                  onChange={(e) =>
                    setVolunteerForm({
                      ...volunteerForm,
                      availability: e.target.value,
                    })
                  }
                  data-ocid="get_involved.volunteer_availability_select"
                  className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                >
                  <option value="">Select availability</option>
                  <option value="weekends">Weekends only</option>
                  <option value="fulltime">Full-time</option>
                  <option value="parttime">Part-time</option>
                  <option value="remote">Remote only</option>
                </select>
              </div>
              <button
                type="submit"
                data-ocid="get_involved.volunteer_submit_button"
                className="w-full bg-forest-green-800 text-white py-3 rounded-lg font-bold hover:bg-forest-green-900 transition-colors"
              >
                Submit Volunteer Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Partner */}
      <section
        className="py-16 md:py-20 bg-impact-green"
        data-ocid="get_involved.partner_section"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-4xl">🏢</span>
            <h2 className="font-heading text-3xl font-bold text-forest-green-900 mt-3 mb-2">
              Partner With Us
            </h2>
            <p className="text-foreground/70">
              Corporate and institutional partnerships for scaled impact in
              Bihar.
            </p>
          </div>
          <div className="bg-card rounded-card shadow-card p-8">
            <form onSubmit={handlePartner} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="org-name"
                  >
                    Organization Name *
                  </label>
                  <input
                    id="org-name"
                    type="text"
                    required
                    value={partnerForm.org}
                    onChange={(e) =>
                      setPartnerForm({ ...partnerForm, org: e.target.value })
                    }
                    data-ocid="get_involved.partner_org_input"
                    className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                    placeholder="Your organization"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="contact-person"
                  >
                    Contact Person *
                  </label>
                  <input
                    id="contact-person"
                    type="text"
                    required
                    value={partnerForm.contact}
                    onChange={(e) =>
                      setPartnerForm({
                        ...partnerForm,
                        contact: e.target.value,
                      })
                    }
                    data-ocid="get_involved.partner_contact_input"
                    className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="partner-email"
                >
                  Email *
                </label>
                <input
                  id="partner-email"
                  type="email"
                  required
                  value={partnerForm.email}
                  onChange={(e) =>
                    setPartnerForm({ ...partnerForm, email: e.target.value })
                  }
                  data-ocid="get_involved.partner_email_input"
                  className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                  placeholder="partner@org.com"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="partner-nature"
                >
                  Nature of Partnership
                </label>
                <textarea
                  id="partner-nature"
                  rows={3}
                  value={partnerForm.nature}
                  onChange={(e) =>
                    setPartnerForm({ ...partnerForm, nature: e.target.value })
                  }
                  data-ocid="get_involved.partner_nature_textarea"
                  className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background resize-none"
                  placeholder="CSR funding, co-branding, technical support, etc."
                />
              </div>
              <button
                type="submit"
                data-ocid="get_involved.partner_submit_button"
                className="w-full bg-earth-brown text-white py-3 rounded-lg font-bold hover:bg-earth-brown-dark transition-colors"
              >
                Express Interest
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Internship */}
      <section
        className="py-16 md:py-20 bg-forest-green-900 text-white"
        data-ocid="get_involved.internship_section"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-4xl">🎓</span>
          <h2 className="font-heading text-3xl font-bold mt-3 mb-4">
            Internship Program
          </h2>
          <p className="text-white/80 mb-6">
            Join us as an intern and work on real environmental projects in
            Bihar. Gain hands-on experience in the field.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              "Field Research",
              "Documentation",
              "Social Media",
              "Fundraising",
              "Community Outreach",
            ].map((area) => (
              <span
                key={area}
                className="bg-white/15 text-white text-sm px-4 py-1.5 rounded-full border border-white/20"
              >
                {area}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setInternModal(true)}
            data-ocid="get_involved.internship_apply_button"
            className="bg-white text-forest-green-900 px-8 py-3 rounded-full font-bold hover:bg-forest-green-50 transition-colors"
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* Intern Modal */}
      {internModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50"
          data-ocid="get_involved.intern_dialog"
        >
          <div className="bg-card rounded-card shadow-card-hover w-full max-w-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-xl font-bold text-foreground">
                Intern Application
              </h3>
              <button
                type="button"
                onClick={() => setInternModal(false)}
                data-ocid="get_involved.intern_close_button"
                className="text-muted-foreground hover:text-foreground text-2xl leading-none"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleIntern} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="intern-name"
                >
                  Name *
                </label>
                <input
                  id="intern-name"
                  type="text"
                  required
                  value={internForm.name}
                  onChange={(e) =>
                    setInternForm({ ...internForm, name: e.target.value })
                  }
                  data-ocid="get_involved.intern_name_input"
                  className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="intern-email"
                >
                  Email *
                </label>
                <input
                  id="intern-email"
                  type="email"
                  required
                  value={internForm.email}
                  onChange={(e) =>
                    setInternForm({ ...internForm, email: e.target.value })
                  }
                  data-ocid="get_involved.intern_email_input"
                  className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="intern-area"
                >
                  Area of Interest *
                </label>
                <select
                  id="intern-area"
                  required
                  value={internForm.area}
                  onChange={(e) =>
                    setInternForm({ ...internForm, area: e.target.value })
                  }
                  data-ocid="get_involved.intern_area_select"
                  className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                >
                  <option value="">Select area</option>
                  {[
                    "Field Research",
                    "Documentation",
                    "Social Media",
                    "Fundraising",
                    "Community Outreach",
                  ].map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  data-ocid="get_involved.intern_submit_button"
                  className="flex-1 bg-forest-green-800 text-white py-3 rounded-lg font-bold hover:bg-forest-green-900 transition-colors"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setInternModal(false)}
                  data-ocid="get_involved.intern_cancel_button"
                  className="flex-1 border border-input py-3 rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
