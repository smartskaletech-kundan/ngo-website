import { Link } from "@tanstack/react-router";
import { useState } from "react";

function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const orgLinks = [
  { label: "About", to: "/about" },
  { label: "Our Journey", to: "/our-journey" },
  { label: "Plantation Drives", to: "/program/plantation-drives" },
  { label: "Soil Erosion Control", to: "/program/soil-erosion-control" },
  { label: "Community Development", to: "/program/community-development" },
  { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
];

const engageLinks = [
  { label: "Volunteer", to: "/volunteer" },
  { label: "Donate", to: "/donate" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms", to: "/terms" },
  { label: "FAQs", to: "/faq" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  }

  return (
    <footer className="text-white" data-ocid="footer">
      {/* Newsletter Strip */}
      <div
        className="bg-[#1B5E20] py-8 px-4 sm:px-6 lg:px-8"
        data-ocid="footer.newsletter_section"
      >
        <div className="max-w-7xl mx-auto">
          {subscribed ? (
            <p
              className="text-center text-white font-semibold text-lg"
              data-ocid="footer.newsletter_success_state"
            >
              🌿 Thank you for subscribing! We'll keep you updated on our
              programs and impact.
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col md:flex-row items-center gap-4"
              data-ocid="footer.newsletter_form"
            >
              <p className="text-white font-medium text-base md:text-lg md:flex-shrink-0 text-center md:text-left">
                Stay Connected —{" "}
                <span className="text-[#A5D6A7]">
                  Get updates on our programs and impact.
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:ml-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  data-ocid="footer.newsletter_input"
                  className="px-4 py-2.5 rounded-lg bg-transparent border border-white text-white placeholder-white/60 text-sm focus:outline-none focus:border-[#A5D6A7] min-w-[240px]"
                />
                <button
                  type="submit"
                  data-ocid="footer.newsletter_submit_button"
                  className="px-6 py-2.5 bg-[#2E7D32] border border-white text-white font-semibold rounded-lg text-sm hover:bg-[#388E3C] transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="bg-[#2E7D32] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1: Brand */}
            <div>
              <div className="flex items-start gap-3 mb-4">
                <img
                  src="/assets/maya-logo.jpeg"
                  alt="Maya Vasudha NGO Logo"
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0 ring-2 ring-white/30 shadow-md"
                />
                <span className="font-heading font-bold text-sm leading-tight">
                  MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN
                </span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-5">
                Building Greener Communities for a Sustainable Tomorrow
              </p>
              <div className="space-y-2 text-sm text-white/75 mb-5">
                <p className="leading-relaxed">
                  📍 ANUPURI, VEER BASAWAN SINGH NAGAR, NEAR PATLIPUTRA RAILWAY
                  STATION, B.V. College, Phulwari, Patna-800014, Bihar, India
                </p>
                <p>
                  ✉️{" "}
                  <a
                    href="mailto:nirmalkumarsingh9625@gmail.com"
                    className="hover:text-white transition-colors underline-offset-2 hover:underline"
                  >
                    nirmalkumarsingh9625@gmail.com
                  </a>
                </p>
                <p>
                  📞{" "}
                  <a
                    href="tel:+918210105075"
                    className="hover:text-white transition-colors underline-offset-2 hover:underline"
                  >
                    +91 8210105075
                  </a>
                </p>
              </div>
              {/* Social Icons */}
              <div className="flex gap-3" data-ocid="footer.social_icons">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  data-ocid="footer.youtube_link"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-colors text-white"
                >
                  <YouTubeIcon />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  data-ocid="footer.instagram_link"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-colors text-white"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  data-ocid="footer.facebook_link"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-colors text-white"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>

            {/* Column 2: Organization */}
            <div>
              <h4 className="font-heading font-semibold text-lg mb-5 text-white">
                Organization
              </h4>
              <ul className="space-y-3">
                {orgLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-white/75 hover:text-white text-sm transition-colors hover:underline underline-offset-2"
                      data-ocid={`footer.org_link.${link.label.toLowerCase().replace(/\s+/g, "_")}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Engage */}
            <div>
              <h4 className="font-heading font-semibold text-lg mb-5 text-white">
                Engage
              </h4>
              <ul className="space-y-3">
                {engageLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-white/75 hover:text-white text-sm transition-colors hover:underline underline-offset-2"
                      data-ocid={`footer.engage_link.${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div>
              <h4 className="font-heading font-semibold text-lg mb-5 text-white">
                Legal
              </h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-white/75 hover:text-white text-sm transition-colors hover:underline underline-offset-2"
                      data-ocid={`footer.legal_link.${link.label.toLowerCase().replace(/\s+/g, "_")}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#2E7D32] border-t border-[#A5D6A7]/30 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/70">
          <p className="text-center md:text-left">
            © {year} MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN. All rights
            reserved.
          </p>
          <p className="text-center md:text-right">
            Reg. No. S000071/23-24 | Est. 12th June 2023
          </p>
        </div>
      </div>
    </footer>
  );
}
