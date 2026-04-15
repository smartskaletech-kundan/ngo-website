import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  NewspaperIcon,
  Settings,
  Stars,
  X,
} from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { adminLogout } from "./AdminGuard";

const ADMIN_BASE = "/xn--manage-anumaya-81h";

const navItems = [
  { label: "Dashboard", to: ADMIN_BASE, icon: LayoutDashboard },
  { label: "Gallery", to: `${ADMIN_BASE}/gallery`, icon: Images },
  { label: "Blog", to: `${ADMIN_BASE}/blog`, icon: NewspaperIcon },
  { label: "Events", to: `${ADMIN_BASE}/events`, icon: CalendarDays },
  { label: "Stories", to: `${ADMIN_BASE}/stories`, icon: Stars },
  { label: "Settings", to: `${ADMIN_BASE}/settings`, icon: Settings },
];

function LeafLogo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 4C16 4 6 8 6 18C6 23.523 10.477 28 16 28C21.523 28 26 23.523 26 18C26 8 16 4 16 4Z"
        fill="white"
        fillOpacity="0.9"
      />
      <path
        d="M16 4C16 4 6 8 6 18"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="14"
        x2="16"
        y2="28"
        stroke="#2E7D32"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  function handleLogout() {
    adminLogout(navigate);
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-30 flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0`}
        style={{ backgroundColor: "#2E7D32" }}
        data-ocid="admin.sidebar"
      >
        {/* Logo area */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/20">
          <LeafLogo />
          <div className="min-w-0">
            <p className="font-heading font-bold text-white text-base leading-tight truncate">
              Anumaya Admin
            </p>
            <p className="text-white/60 text-xs font-body truncate">
              Content Panel
            </p>
          </div>
          <button
            type="button"
            className="ml-auto lg:hidden text-white/70 hover:text-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(({ label, to, icon: Icon }) => {
            const isActive =
              to === ADMIN_BASE
                ? currentPath === ADMIN_BASE
                : currentPath.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                data-ocid={`admin.nav.${label.toLowerCase()}`}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-body text-sm transition-smooth
                  ${
                    isActive
                      ? "bg-white/20 text-white font-semibold border-l-4 border-white pl-3"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom links */}
        <div className="p-3 border-t border-white/20 space-y-1">
          <Link
            to="/"
            data-ocid="admin.back_to_site"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white font-body text-sm transition-smooth"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            data-ocid="admin.logout_button"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white font-body text-sm transition-smooth"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Top bar */}
        <header
          className="h-14 bg-card border-b border-border flex items-center px-4 gap-3 flex-shrink-0 shadow-sm"
          data-ocid="admin.topbar"
        >
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
          <h1 className="font-heading font-semibold text-foreground text-lg flex-1 truncate">
            {title ?? "Admin Panel"}
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">
                A
              </span>
            </div>
            <span className="text-muted-foreground text-sm font-body hidden sm:block">
              admin
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
