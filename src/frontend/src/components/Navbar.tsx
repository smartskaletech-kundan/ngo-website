import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

type DropdownItem = { label: string; to: string; hash?: string };
type NavItem = {
  label: string;
  id: string;
  items: DropdownItem[];
};

const navItems: NavItem[] = [
  {
    label: "About Us",
    id: "about",
    items: [
      { label: "Introduction", to: "/about", hash: "#introduction" },
      { label: "Mission & Vision", to: "/about", hash: "#mission" },
      { label: "Our Team", to: "/team" },
      { label: "Our Journey", to: "/our-journey" },
      { label: "Awards", to: "/about", hash: "#awards" },
      { label: "FAQs", to: "/faq" },
    ],
  },
  {
    label: "Our Work",
    id: "work",
    items: [
      { label: "Plantation Drives", to: "/program/plantation-drives" },
      { label: "Soil Erosion Control", to: "/program/soil-erosion-control" },
      { label: "Community Development", to: "/program/community-development" },
    ],
  },
  {
    label: "Engage",
    id: "engage",
    items: [
      { label: "Volunteer", to: "/volunteer" },
      { label: "Donate", to: "/donate" },
      { label: "Careers", to: "/careers" },
    ],
  },
  {
    label: "Media",
    id: "media",
    items: [
      { label: "Gallery", to: "/gallery" },
      { label: "Blog", to: "/blog" },
      { label: "Press", to: "/media" },
    ],
  },
];

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M23.498 6.186a2.985 2.985 0 0 0-2.101-2.117C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.397.524A2.985 2.985 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.985 2.985 0 0 0 2.101 2.117C4.495 20.455 12 20.455 12 20.455s7.505 0 9.397-.524a2.985 2.985 0 0 0 2.101-2.117C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function NavDropdown({
  item,
  onClose,
  scrolled,
}: {
  item: NavItem;
  onClose: () => void;
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click — uses 'click' event so it doesn't race with button's onClick
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleButtonClick = (e: React.MouseEvent) => {
    // stopPropagation stops React's synthetic event tree.
    // stopImmediatePropagation stops the *native* event from reaching the
    // document-level 'click' handler (React 17+ delegates to #root, so the
    // native event still bubbles to document unless explicitly stopped here).
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setOpen((prev) => !prev);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        data-ocid={`navbar.${item.id}_dropdown`}
        onClick={handleButtonClick}
        className={`text-sm font-semibold flex items-center gap-1 px-1 py-1 transition-colors duration-200 hover:text-forest-green-400 ${
          scrolled ? "text-forest-green-900" : "text-white/95 hover:text-white"
        }`}
      >
        {item.label}
        <ChevronDown open={open} />
      </button>

      {/* Always rendered — visibility controlled by maxHeight + opacity for smooth animation */}
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-xl shadow-lg border border-forest-green-100 py-1.5 z-50 overflow-hidden"
        style={{
          maxHeight: open ? "500px" : "0px",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "max-height 0.3s ease, opacity 0.2s ease",
        }}
      >
        {item.items.map((sub) => (
          <Link
            key={`${sub.to}${sub.hash ?? ""}`}
            to={sub.to}
            onClick={() => {
              setOpen(false);
              onClose();
              if (sub.hash) {
                setTimeout(() => {
                  const el = document.querySelector(sub.hash as string);
                  el?.scrollIntoView({ behavior: "smooth" });
                }, 250);
              }
            }}
            data-ocid={`navbar.${item.id}_${sub.label.toLowerCase().replace(/[\s&]/g, "_")}_link`}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-forest-green-900 hover:bg-forest-green-50 hover:text-forest-green-700 transition-colors duration-150 font-medium"
          >
            {sub.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMobile = () => {
    setMenuOpen(false);
    setMobileOpenId(null);
  };

  return (
    <nav
      data-ocid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-forest-green-100"
          : "bg-forest-green-900/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group shrink-0"
            data-ocid="navbar.logo_link"
          >
            <img
              src="/assets/maya-logo.jpeg"
              alt="Maya Vasudha NGO Logo"
              className="w-10 h-10 rounded-full object-cover shrink-0 shadow-md ring-2 ring-white/30 group-hover:ring-white/60 transition-all"
            />
            <div className="min-w-0">
              <span
                className={`font-heading font-bold block leading-tight transition-colors duration-300 ${
                  scrolled ? "text-forest-green-900" : "text-white"
                } text-xs sm:text-sm md:text-base truncate max-w-[200px] md:max-w-none`}
              >
                MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN
              </span>
              <span
                className={`text-xs block transition-colors duration-300 ${scrolled ? "text-forest-green-600" : "text-green-200"}`}
              >
                माया सामाजिक उत्थान एवं परामर्श संस्थान
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <NavDropdown
                key={item.id}
                item={item}
                onClose={closeMobile}
                scrolled={scrolled}
              />
            ))}
          </div>

          {/* Right side: Social icons + Donate */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Social Icons */}
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              data-ocid="navbar.youtube_link"
              className={`transition-colors duration-200 hover:text-red-500 ${scrolled ? "text-forest-green-700" : "text-white/80"}`}
            >
              <YouTubeIcon />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              data-ocid="navbar.instagram_link"
              className={`transition-colors duration-200 hover:text-pink-500 ${scrolled ? "text-forest-green-700" : "text-white/80"}`}
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              data-ocid="navbar.facebook_link"
              className={`transition-colors duration-200 hover:text-blue-500 ${scrolled ? "text-forest-green-700" : "text-white/80"}`}
            >
              <FacebookIcon />
            </a>

            <div
              className="w-px h-5 bg-current opacity-20 mx-1"
              aria-hidden="true"
            />

            {/* Donate CTA */}
            <Link
              to="/donate"
              data-ocid="navbar.donate_button"
              className="bg-forest-green-700 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-forest-green-600 hover:scale-105 transition-all duration-200 shadow-md"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile right: social + hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              data-ocid="navbar.mobile_youtube_link"
              className={`hover:text-red-400 transition-colors ${scrolled ? "text-forest-green-700" : "text-white/80"}`}
            >
              <YouTubeIcon />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              data-ocid="navbar.mobile_instagram_link"
              className={`hover:text-pink-400 transition-colors ${scrolled ? "text-forest-green-700" : "text-white/80"}`}
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              data-ocid="navbar.mobile_facebook_link"
              className={`hover:text-blue-400 transition-colors ${scrolled ? "text-forest-green-700" : "text-white/80"}`}
            >
              <FacebookIcon />
            </a>

            <button
              type="button"
              className={`p-2 rounded-md transition-colors ml-1 ${
                scrolled
                  ? "text-forest-green-900 hover:bg-forest-green-50"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              data-ocid="navbar.hamburger_button"
            >
              {menuOpen ? (
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel — always rendered, animated via maxHeight */}
      <div
        data-ocid="navbar.mobile_menu"
        className={`lg:hidden overflow-hidden ${
          scrolled
            ? "bg-white border-t border-forest-green-100"
            : "bg-forest-green-900/98 border-t border-forest-green-700"
        }`}
        style={{
          maxHeight: menuOpen ? "80vh" : "0px",
          opacity: menuOpen ? 1 : 0,
          transition: "max-height 0.35s ease, opacity 0.25s ease",
          overflowY: menuOpen ? "auto" : "hidden",
        }}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const isSubOpen = mobileOpenId === item.id;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => setMobileOpenId(isSubOpen ? null : item.id)}
                  data-ocid={`navbar.mobile_${item.id}_toggle`}
                  className={`w-full flex items-center justify-between font-semibold py-3 px-3 rounded-lg transition-colors text-left ${
                    scrolled
                      ? "text-forest-green-900 hover:bg-forest-green-50"
                      : "text-white hover:bg-forest-green-800"
                  }`}
                >
                  {item.label}
                  <ChevronDown open={isSubOpen} />
                </button>

                {/* Mobile sub-menu — always rendered, animated via maxHeight */}
                <div
                  style={{
                    maxHeight: isSubOpen ? "400px" : "0px",
                    opacity: isSubOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease, opacity 0.2s ease",
                  }}
                >
                  <div className="ml-3 pl-3 border-l-2 border-forest-green-400/40 flex flex-col gap-0.5 mb-1">
                    {item.items.map((sub) => (
                      <Link
                        key={`${sub.to}${sub.hash ?? ""}`}
                        to={sub.to}
                        onClick={() => {
                          closeMobile();
                          if (sub.hash) {
                            setTimeout(() => {
                              const el = document.querySelector(
                                sub.hash as string,
                              );
                              el?.scrollIntoView({ behavior: "smooth" });
                            }, 250);
                          }
                        }}
                        data-ocid={`navbar.mobile_${item.id}_${sub.label.toLowerCase().replace(/[\s&]/g, "_")}_link`}
                        className={`py-2.5 px-2 text-sm rounded-md transition-colors font-medium ${
                          scrolled
                            ? "text-forest-green-700 hover:bg-forest-green-50 hover:text-forest-green-900"
                            : "text-green-200 hover:text-white hover:bg-forest-green-800"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="border-t border-forest-green-400/20 pt-3 mt-2">
            <Link
              to="/donate"
              onClick={closeMobile}
              data-ocid="navbar.mobile_donate_button"
              className="block bg-forest-green-700 text-white px-5 py-3 rounded-full text-sm font-semibold text-center hover:bg-forest-green-600 transition-colors shadow-md"
            >
              Donate Now
            </Link>
          </div>

          <div className="flex items-center justify-center gap-5 pt-2 pb-2">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-red-400 hover:text-red-500 transition-colors"
            >
              <YouTubeIcon />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-pink-400 hover:text-pink-500 transition-colors"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-blue-400 hover:text-blue-500 transition-colors"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
