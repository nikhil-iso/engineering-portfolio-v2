import { useEffect } from "react";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  SITE_TITLE,
  absoluteUrl,
} from "@/lib/site";

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  structuredData?: object | object[];
}

const STRUCTURED_DATA_ID = "seo-structured-data";

const Seo = ({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  path,
  image = SITE_IMAGE,
  type = "website",
  noindex = false,
  structuredData,
}: SeoProps) => {
  useEffect(() => {
    const resolvedPath = path ?? window.location.pathname;
    const canonicalUrl = absoluteUrl(resolvedPath);
    const resolvedImage = image.startsWith("http") ? image : absoluteUrl(image);

    document.title = title;

    setMetaTag("name", "description", description);
    setMetaTag("name", "author", SITE_AUTHOR);
    setMetaTag("name", "robots", noindex ? "noindex,nofollow" : "index,follow");
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", resolvedImage);
    setMetaTag("property", "og:site_name", SITE_NAME);
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", resolvedImage);
    setCanonicalLink(canonicalUrl);
    setStructuredData(structuredData);
  }, [description, image, noindex, path, structuredData, title, type]);

  return null;
};

function setMetaTag(attribute: "name" | "property", value: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${value}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function setCanonicalLink(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
}

function setStructuredData(structuredData?: object | object[]) {
  const existingScript = document.getElementById(STRUCTURED_DATA_ID);

  if (!structuredData) {
    existingScript?.remove();
    return;
  }

  const script = existingScript ?? document.createElement("script");
  script.id = STRUCTURED_DATA_ID;
  script.setAttribute("type", "application/ld+json");
  script.textContent = JSON.stringify(structuredData);

  if (!existingScript) {
    document.head.appendChild(script);
  }
}

export default Seo;
