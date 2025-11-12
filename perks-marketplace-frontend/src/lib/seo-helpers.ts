// Helper functions for SEO operations

// Format meta tags for Next.js metadata API
export const formatMetadata = (seoData: any) => {
  if (!seoData) return {};

  const { pageData, metaTags, schemaMarkup } = seoData;

  return {
    title: pageData?.title || "Perks Marketplace",
    description: pageData?.description || "Find the best perks and deals",
    keywords: pageData?.keywords?.join(", "),
    openGraph: {
      title: pageData?.ogTitle || pageData?.title,
      description: pageData?.ogDescription || pageData?.description,
      images: pageData?.ogImage ? [{ url: pageData.ogImage }] : [],
      type: pageData?.ogType || "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageData?.ogTitle || pageData?.title,
      description: pageData?.ogDescription || pageData?.description,
      images: pageData?.ogImage ? [pageData.ogImage] : [],
    },
    alternates: {
      canonical: pageData?.canonical,
    },
    robots: pageData?.noindex ? "noindex,nofollow" : "index,follow",
  };
};

// Generate schema markup script tag
export const generateSchemaScript = (schemas: any[]) => {
  if (!schemas || schemas.length === 0) return null;

  return schemas.map((schema, index) => ({
    type: "application/ld+json",
    id: `schema-${index}`,
    children: JSON.stringify(schema),
  }));
};

// Validate SEO score based on analysis
export const getSeoScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

// Format breadcrumbs for display
export const formatBreadcrumbs = (
  breadcrumbs: Array<{ name: string; url: string }>
) => {
  return breadcrumbs.map((item, index) => ({
    ...item,
    isLast: index === breadcrumbs.length - 1,
  }));
};
