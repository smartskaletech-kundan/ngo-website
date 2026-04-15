import { useState } from "react";
import Layout from "../components/Layout";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Layout
      pageTitle="Contact Us"
      pageDescription="Reach out to Anumaya Sansthan — we'd love to hear from you."
    >
      <section className="py-16 md:py-24 bg-cream" data-ocid="contact.page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {/* Form */}
            <div>
              <div className="bg-card rounded-card shadow-card p-8">
                <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-6">
                  Send Us a Message
                </h2>
                {submitted && (
                  <div
                    className="bg-forest-green-100 border border-forest-green-300 text-forest-green-800 rounded-lg p-3 mb-5 text-sm font-medium"
                    data-ocid="contact.success_state"
                  >
                    ✅ Message sent! We'll respond within 2 business days.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="contact-name"
                      >
                        Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        data-ocid="contact.name_input"
                        className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="contact-email"
                      >
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        data-ocid="contact.email_input"
                        className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="contact-subject"
                    >
                      Subject *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      data-ocid="contact.subject_input"
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="contact-message"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      data-ocid="contact.message_textarea"
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green-500 bg-background resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>
                  <button
                    type="submit"
                    data-ocid="contact.submit_button"
                    className="w-full bg-forest-green-800 text-white py-3 rounded-lg font-bold hover:bg-forest-green-900 transition-colors"
                  >
                    Send Message →
                  </button>
                </form>
              </div>
            </div>

            {/* Info card */}
            <div className="flex flex-col gap-6">
              <div className="bg-forest-green-800 text-white rounded-card p-8">
                <h3 className="font-heading text-xl font-bold mb-6">
                  Get in Touch
                </h3>
                <ul className="space-y-5">
                  <li className="flex gap-3">
                    <span className="text-2xl flex-shrink-0">📍</span>
                    <div>
                      <p className="font-semibold text-light-green mb-0.5">
                        Address
                      </p>
                      <p className="text-white/80 text-sm">
                        Anumaya Sansthan, Patna, Bihar, India
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl flex-shrink-0">📞</span>
                    <div>
                      <p className="font-semibold text-light-green mb-0.5">
                        Phone
                      </p>
                      <p className="text-white/80 text-sm">+91 XXXXXXXXXX</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl flex-shrink-0">✉️</span>
                    <div>
                      <p className="font-semibold text-light-green mb-0.5">
                        Email
                      </p>
                      <a
                        href="mailto:contact@anumayasansthan.org"
                        className="text-white/80 text-sm hover:text-white transition-colors"
                      >
                        contact@anumayasansthan.org
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl flex-shrink-0">🕐</span>
                    <div>
                      <p className="font-semibold text-light-green mb-0.5">
                        Office Hours
                      </p>
                      <p className="text-white/80 text-sm">
                        Monday–Saturday, 10:00 AM – 5:00 PM
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="flex gap-3 mt-6 pt-5 border-t border-white/20">
                  {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((s) => (
                    <a
                      key={s}
                      href="https://anumayasansthan.org"
                      aria-label={s}
                      className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold hover:bg-forest-green-600 transition-colors"
                    >
                      {s[0]}
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-card shadow-card p-6 border border-border">
                <h4 className="font-heading font-bold text-forest-green-900 mb-2">
                  NGO Registration
                </h4>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Anumaya Sansthan
                  </span>
                  <br />
                  Reg. No: S000071/23-24 | Est. 12.06.2023
                </p>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div
            className="rounded-card overflow-hidden shadow-card border border-border"
            data-ocid="contact.map_section"
          >
            <div className="bg-forest-green-50 h-72 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-3">🗺️</div>
                <p className="font-heading text-xl font-bold text-forest-green-900 mb-1">
                  Anumaya Sansthan
                </p>
                <p className="text-forest-green-700 text-sm">
                  Patna, Bihar, India
                </p>
                <a
                  href="https://maps.google.com/?q=Patna,Bihar,India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 bg-forest-green-800 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-forest-green-900 transition-colors"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
