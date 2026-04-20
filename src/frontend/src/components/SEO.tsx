import { useEffect } from "react";

const DEFAULT_OG_IMAGE = "/assets/maya-logo.jpeg";
const SITE_NAME = "MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogUrl?: string;
  keywords?: string;
}

function setMeta(selector: string, attribute: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    // Parse selector like: meta[name="description"] or meta[property="og:title"]
    // Use a more robust regex that handles attribute values containing colons (og:title, etc.)
    const match = selector.match(/\[([a-zA-Z][a-zA-Z0-9-]*)="([^"]+)"\]/);
    if (match) {
      el.setAttribute(match[1], match[2]);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attribute, content);
}

export default function SEO({
  title,
  description,
  ogImage,
  ogUrl,
  keywords,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const image = ogImage ?? DEFAULT_OG_IMAGE;
    const url = ogUrl ?? window.location.href;

    document.title = fullTitle;

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:image"]', "content", image);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:site_name"]', "content", SITE_NAME);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", image);

    if (keywords) {
      setMeta('meta[name="keywords"]', "content", keywords);
    }

    return () => {
      // Reset to site-level defaults on unmount
      document.title = `${SITE_NAME} | Building Greener Communities`;
      const descEl = document.head.querySelector<HTMLMetaElement>(
        'meta[name="description"]',
      );
      if (descEl) {
        descEl.setAttribute(
          "content",
          `${SITE_NAME} — माया सामाजिक उत्थान एवं परामर्श संस्थान. Building Greener Communities for a Sustainable Tomorrow.`,
        );
      }
    };
  }, [title, description, ogImage, ogUrl, keywords]);

  return null;
}
