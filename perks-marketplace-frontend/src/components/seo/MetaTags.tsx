"use client";

import { useEffect } from "react";

// Component to inject meta tags and schema markup into page head
// This is a client component that updates document head dynamically
export function MetaTags({ seoData }: { seoData: any }) {
  useEffect(() => {
    if (!seoData) return;

    const { metaTags, schemaMarkup } = seoData;

    // Clean up existing meta tags that we manage
    const existingTags = document.querySelectorAll(
      'meta[data-seo="true"], script[data-seo="true"]'
    );
    existingTags.forEach((tag) => tag.remove());

    // Add new meta tags
    metaTags?.forEach((tag: any) => {
      const metaElement = document.createElement("meta");
      metaElement.setAttribute("data-seo", "true");

      if (tag.name) metaElement.setAttribute("name", tag.name);
      if (tag.property) metaElement.setAttribute("property", tag.property);
      if (tag.content) metaElement.setAttribute("content", tag.content);
      if (tag.rel) {
        const linkElement = document.createElement("link");
        linkElement.setAttribute("rel", tag.rel);
        linkElement.setAttribute("href", tag.href);
        linkElement.setAttribute("data-seo", "true");
        document.head.appendChild(linkElement);
        return;
      }

      document.head.appendChild(metaElement);
    });

    // Add schema markup
    schemaMarkup?.forEach((schema: any, index: number) => {
      const scriptElement = document.createElement("script");
      scriptElement.setAttribute("type", "application/ld+json");
      scriptElement.setAttribute("data-seo", "true");
      scriptElement.textContent = JSON.stringify(schema);
      document.head.appendChild(scriptElement);
    });
  }, [seoData]);

  return null; // This component doesn't render anything visible
}
