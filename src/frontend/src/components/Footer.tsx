import { Link } from "@tanstack/react-router";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-green-900 text-white" data-ocid="footer">
      {/* Wave top */}
      <div className="w-full overflow-hidden leading-none -mt-1">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 md:h-16 fill-cream-dark"
          aria-hidden="true"
        >
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌿</span>
              <span className="font-heading text-lg font-bold">
                Anumaya Sansthan
              </span>
            </div>
            <p className="font-hindi text-light-green text-sm leading-relaxed mb-2">
              माया सामाजिक उत्थान एवं परामर्श संस्थान
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Building greener communities for a sustainable tomorrow across
              Bihar and beyond.
            </p>
            <p className="text-white/50 text-xs mb-4">Reg. No: S000071/23-24</p>
            <div className="flex gap-3">
              {[
                { label: "Facebook", icon: "f", href: "#" },
                { label: "Instagram", icon: "in", href: "#" },
                { label: "Twitter", icon: "𝕏", href: "#" },
                { label: "LinkedIn", icon: "li", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold hover:bg-forest-green-600 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-light-green">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Our Projects", to: "/projects" },
                { label: "Donate", to: "/donate" },
                { label: "Get Involved", to: "/get-involved" },
                { label: "Transparency", to: "/transparency" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-light-green">
              Contact Info
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex gap-2">
                <span>📍</span>
                <span>Patna, Bihar, India</span>
              </li>
              <li className="flex gap-2">
                <span>📞</span>
                <span>+91 XXXXXXXXXX</span>
              </li>
              <li className="flex gap-2">
                <span>✉️</span>
                <a
                  href="mailto:contact@anumayasansthan.org"
                  className="hover:text-white transition-colors"
                >
                  contact@anumayasansthan.org
                </a>
              </li>
              <li className="flex gap-2">
                <span>🕐</span>
                <span>Mon–Sat, 10:00 AM – 5:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-light-green">
              Stay Updated
            </h4>
            <p className="text-white/70 text-sm mb-4">
              Get the latest news on our programs and impact in Bihar.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
              data-ocid="footer.newsletter_form"
            >
              <input
                type="email"
                placeholder="Your email address"
                data-ocid="footer.newsletter_input"
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-light-green"
              />
              <button
                type="submit"
                data-ocid="footer.newsletter_submit_button"
                className="bg-light-green text-forest-green-900 font-semibold py-2 rounded-lg text-sm hover:bg-forest-green-200 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-white/40 text-xs mt-2">
              We respect your privacy.
            </p>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-white/50 text-xs">
          <p>
            © {year} Anumaya Sansthan. All Rights Reserved. | Reg. No:
            S000071/23-24
          </p>
          <div className="flex gap-4">
            <Link
              to="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link
              to="/refund-policy"
              className="hover:text-white transition-colors"
            >
              Refund Policy
            </Link>
          </div>
          <p>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="hover:text-white transition-colors underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
