import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const mainLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Our Team", to: "/team" },
];

const resourceLinks = [
  { label: "Blog", to: "/blog", icon: "📝" },
  { label: "Events", to: "/events", icon: "📅" },
  { label: "Impact", to: "/impact", icon: "📊" },
  { label: "Media", to: "/media", icon: "📰" },
  { label: "Contact", to: "/contact", icon: "✉️" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav
      data-ocid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav shadow-subtle" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="navbar.logo_link"
          >
            <span className="text-2xl" role="img" aria-label="leaf">
              🌿
            </span>
            <span
              className={`font-heading text-xl font-bold transition-colors duration-300 ${
                scrolled ? "text-forest-green-800" : "text-white"
              }`}
            >
              Anumaya Sansthan
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5">
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`navbar.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                className={`text-sm font-medium transition-colors duration-200 hover:text-forest-green-600 ${
                  scrolled
                    ? "text-foreground"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Resources dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                data-ocid="navbar.resources_dropdown"
                className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 hover:text-forest-green-600 ${
                  scrolled
                    ? "text-foreground"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Resources
                <svg
                  aria-hidden="true"
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 bg-card rounded-xl shadow-card-hover border border-border/40 py-1.5 z-50"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setDropdownOpen(false)}
                      data-ocid={`navbar.${link.label.toLowerCase()}_link`}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-forest-green-50 hover:text-forest-green-800 transition-colors duration-150"
                    >
                      <span aria-hidden="true">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/donate"
              data-ocid="navbar.donate_button"
              className="bg-forest-green-800 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-forest-green-900 hover:scale-105 transition-all duration-200 shadow-card"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className={`md:hidden p-2 rounded-md transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
            data-ocid="navbar.hamburger_button"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden glass-nav border-t border-border/30 shadow-card"
          data-ocid="navbar.mobile_menu"
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                data-ocid={`navbar.mobile_${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                className="text-foreground font-medium py-2.5 px-2 rounded-lg hover:bg-forest-green-50 hover:text-forest-green-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Resources expandable */}
            <div>
              <button
                type="button"
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                data-ocid="navbar.mobile_resources_toggle"
                className="w-full flex items-center justify-between text-foreground font-medium py-2.5 px-2 rounded-lg hover:bg-forest-green-50 hover:text-forest-green-800 transition-colors"
              >
                Resources
                <svg
                  aria-hidden="true"
                  className={`w-4 h-4 transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </button>
              {mobileResourcesOpen && (
                <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l-2 border-forest-green-100 pl-3">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => {
                        setMenuOpen(false);
                        setMobileResourcesOpen(false);
                      }}
                      data-ocid={`navbar.mobile_${link.label.toLowerCase()}_link`}
                      className="flex items-center gap-2 text-foreground/75 text-sm py-2 hover:text-forest-green-800 transition-colors"
                    >
                      <span aria-hidden="true">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/donate"
              onClick={() => setMenuOpen(false)}
              data-ocid="navbar.mobile_donate_button"
              className="bg-forest-green-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold text-center hover:bg-forest-green-900 transition-colors mt-2"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
