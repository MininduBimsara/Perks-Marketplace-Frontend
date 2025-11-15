# SEO Feature Documentation

## 1. Plain-English Overview

The SEO feature helps search engines understand and index your site better. It does three main things:

1. Global settings (site name, default meta, Open Graph, organization info). Admins manage these in the SEO settings page (`/admin/seo`).
2. Page-level SEO: For a specific page (e.g. a perk) the frontend asks the backend for SEO data (`/v1/seo/page-seo`). That response includes meta tags, structured data (schema), and page-specific info like breadcrumbs.
3. Generated files: `sitemap.xml` and `robots.txt` are regenerated from the admin panel so search engines can discover pages efficiently and know what to crawl.

## 2. Backend Endpoints Summary (Base: `/api/v1/seo`)

Public:

- `GET /sitemap.xml` – Returns sitemap file.
- `GET /robots.txt` – Returns robots file.
- `GET /page-seo` – Returns SEO bundle for a page (`pageType`, `pageIdentifier`, optional `includeSchema`).

Admin (JWT required):

- `GET /settings` – Fetch global SEO settings.
- `PUT /settings` – Update global SEO settings (multipart for images).
- `POST /meta-tags` – Generate meta tags for arbitrary page data.
- `POST /schema-markup` – Generate JSON-LD schema for a page.
- `POST /analyze` – Returns basic SEO analysis (score, issues, recommendations).
- `POST /regenerate-sitemap` – Rebuild sitemap.xml.
- `POST /regenerate-robots` – Rebuild robots.txt.

## 3. Frontend Integration

### Service Layer (`src/services/seo.ts`)

Methods map directly to backend endpoints:

- `getSitemap()`, `getRobotsTxt()`
- `getPageSeo(pageType?, pageIdentifier?, includeSchema?)`
- `getSeoSettings()`, `updateSeoSettings(formData)`
- `generateMetaTags(data)`, `generateSchemaMarkup(data)`
- `analyzeSeo(data)`
- `regenerateSitemap()`, `regenerateRobotsTxt()`

### Admin UI (`src/app/(admin)/seo/page.tsx`)

- Loads current settings with `getSeoSettings()`.
- Updates settings via `updateSeoSettings(FormData)` (supports image uploads for OG Image & Logo).
- Buttons to regenerate sitemap and robots.
- Displays last generated timestamp for sitemap.

### Public Perk Page (`src/components/perks/PerkDetail.tsx`)

- After loading perk data it calls: `seoService.getPageSeo("perk", perk.slug || perk._id, true)`.
- Stores response in `seoData` state.
- Renders `<MetaTags seoData={seoData} />` to inject meta tags & schema scripts into `<head>`.

### Meta Tag Injection (`src/components/seo/MetaTags.tsx`)

- Removes previously injected tags identified by `data-seo="true"`.
- Adds `<meta>` tags (supports `name` and `property`), canonical `<link>` if present, and JSON-LD `<script type="application/ld+json">` blocks for each schema object.
- Runs client-side (good for dynamic updates; SSR enhancement recommended below).

### Helpers (`src/lib/seo-helpers.ts`)

- `formatMetadata(seoData)`: Converts SEO payload into Next.js `generateMetadata()` shape (title, description, keywords, openGraph, twitter, robots, canonical).
- `generateSchemaScript(schemas)`: Returns array describing JSON-LD blocks (usable for SSR if desired).
- `getSeoScoreColor(score)`: Utility for analysis display.
- `formatBreadcrumbs(breadcrumbs)`: Prepares breadcrumb list with `isLast` marker.

## 4. Data Structure: Example `GET /page-seo` Response

```
{
  "success": true,
  "data": {
    "pageData": { ... core descriptive fields ... },
    "metaTags": [ { name|property|rel, content|href } ],
    "schemaMarkup": [ { @context, @type, ... } ],
    "seoSettings": { siteName, defaultMetaTitle, twitterCardType, ... }
  }
}
```

Use `metaTags` directly for injection or transform via `formatMetadata()` for SSR.

## 5. Lifecycle / Flow

1. Admin configures global SEO settings (branding, defaults, social, sitemap rules).
2. Public page loads → fetches page SEO bundle → injects meta + schema.
3. Search engine bots use `robots.txt` + `sitemap.xml` to discover pages.
4. Perk or other content updates → optionally regenerate sitemap.
5. Admin can analyze a page to see score & recommendations.

## 6. Extending the Feature

### Server-Side Rendering for Metadata

Currently meta tags are injected client-side. To improve SEO reliability:

1. In a route file (`app/(public)/perks/[id]/page.tsx`) export `generateMetadata({ params })`.
2. Fetch SEO data on server (direct `fetch` to backend or internal server action) and pass it into `formatMetadata()`.
3. Return the metadata object – Next.js will embed tags in initial HTML.
4. Optionally render JSON-LD with a custom layout wrapper.

### Add Schema & Meta Preview in Admin

- Implement buttons or forms calling `generateMetaTags` and `generateSchemaMarkup` to preview output before saving.

### SEO Analysis Dashboard

- New page consuming `analyzeSeo` to display scores and color-coded results using `getSeoScoreColor`.

### Add JSON-LD SSR Component

- Populate `src/components/seo/JsonLdScript.tsx` to accept an array of schemas and render them conditionally server-side.

## 7. Rate Limits Awareness

Backend enforces rate limits; avoid spamming regeneration operations:

- General endpoints: 100/min
- Sitemap/robots generation: 5/min
- Settings update: 10/min
  Check response headers: `X-RateLimit-*`.

## 8. Error Handling Patterns

Typical error structure:

```
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [ ... ]
  }
}
```

Frontend code currently extracts `error.response.data.message` in admin SEO page; extend to show validation details if present.

## 9. Security Considerations

- Admin endpoints require JWT; token attached via axios interceptor in `src/services/api.ts` (client-only, guards localStorage usage).
- Public endpoints deliberately expose only crawlable assets and page-level SEO data.

## 10. Quick Usage Recipes

### Fetch Page SEO and Inject (Client)

```ts
const res = await seoService.getPageSeo("perk", perkSlug, true);
const seoData = res.data.data || res.data;
<MetaTags seoData={seoData} />;
```

### Update Global Settings (Admin)

```ts
const form = new FormData();
form.append("siteName", "Amazing Perks Marketplace");
form.append("organization", JSON.stringify({ name: "Perks Marketplace Inc." }));
await seoService.updateSeoSettings(form);
```

### Regenerate Sitemap

```ts
await seoService.regenerateSitemap();
```

## 11. Validation Checklist

| Aspect                           | Present       | Notes                                              |
| -------------------------------- | ------------- | -------------------------------------------------- |
| Global settings fetch/update     | Yes           | `seoService.getSeoSettings` / `updateSeoSettings`  |
| Page-level SEO fetch             | Yes           | Implemented for Perk detail; extend to other pages |
| Client meta injection            | Yes           | `MetaTags` component                               |
| Schema markup                    | Yes           | Injected via `MetaTags` when `includeSchema=true`  |
| Sitemap regeneration             | Yes           | Admin UI button                                    |
| Robots regeneration              | Yes           | Admin UI button                                    |
| Meta/schema generation endpoints | Yes           | Not yet surfaced in UI                             |
| SEO analysis                     | Endpoint only | No UI page yet                                     |
| SSR metadata                     | Not yet       | Recommended improvement                            |
| Empty JSON-LD component          | Placeholder   | Implement for SSR                                  |

## 12. Future Enhancements

- Implement `generateMetadata` for SSR pages.
- Centralize breadcrumb formatting + canonical management.
- Add locale/hreflang support if multilingual expansion needed.
- Cache page-seo responses client-side (stale-while-revalidate pattern) for performance.

---

Maintainer Tip: Start SSR conversion with perk pages to validate approach; reuse pattern for categories, blog posts, and static pages.
