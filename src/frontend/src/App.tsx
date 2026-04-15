import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import GetInvolved from "./pages/GetInvolved";
import Home from "./pages/Home";
import Impact from "./pages/Impact";
import Media from "./pages/Media";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Projects from "./pages/Projects";
import RefundPolicy from "./pages/RefundPolicy";
import Team from "./pages/Team";
import Terms from "./pages/Terms";
import Transparency from "./pages/Transparency";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminStories from "./pages/admin/AdminStories";

const rootRoute = createRootRoute({ component: () => <Outlet /> });

// ── Public routes ────────────────────────────────────────────────────────────

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const teamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/team",
  component: Team,
});
const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  component: Projects,
});
const donateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/donate",
  component: Donate,
});
const getInvolvedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/get-involved",
  component: GetInvolved,
});
const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: Gallery,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});
const transparencyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/transparency",
  component: Transparency,
});
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  component: PrivacyPolicy,
});
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: Terms,
});
const refundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/refund-policy",
  component: RefundPolicy,
});

// ── New public routes ────────────────────────────────────────────────────────

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: Blog,
});
const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events",
  component: Events,
});
const mediaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/media",
  component: Media,
});
const impactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/impact",
  component: Impact,
});

// ── Admin routes (hidden URL — not linked in public site) ─────────────────────

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/xn--manage-anumaya-81h/login",
  component: AdminLogin,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/xn--manage-anumaya-81h",
  component: AdminDashboard,
});
const adminGalleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/xn--manage-anumaya-81h/gallery",
  component: AdminGallery,
});
const adminBlogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/xn--manage-anumaya-81h/blog",
  component: AdminBlog,
});
const adminEventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/xn--manage-anumaya-81h/events",
  component: AdminEvents,
});
const adminStoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/xn--manage-anumaya-81h/stories",
  component: AdminStories,
});
const adminSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/xn--manage-anumaya-81h/settings",
  component: AdminSettings,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  teamRoute,
  projectsRoute,
  donateRoute,
  getInvolvedRoute,
  galleryRoute,
  contactRoute,
  transparencyRoute,
  privacyRoute,
  termsRoute,
  refundRoute,
  blogRoute,
  eventsRoute,
  mediaRoute,
  impactRoute,
  adminLoginRoute,
  adminRoute,
  adminGalleryRoute,
  adminBlogRoute,
  adminEventsRoute,
  adminStoriesRoute,
  adminSettingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
