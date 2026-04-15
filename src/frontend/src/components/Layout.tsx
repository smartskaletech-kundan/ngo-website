import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

export default function Layout({
  children,
  pageTitle,
  pageDescription,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      {pageTitle && (
        <section className="pt-20 pb-12 bg-forest-green-800 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center pt-8">
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-3">
              {pageTitle}
            </h1>
            {pageDescription && (
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                {pageDescription}
              </p>
            )}
          </div>
          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
            <svg
              viewBox="0 0 1440 48"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-10 fill-cream"
              aria-hidden="true"
            >
              <path d="M0,24 C480,48 960,0 1440,24 L1440,48 L0,48 Z" />
            </svg>
          </div>
        </section>
      )}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
