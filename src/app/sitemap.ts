import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URLs for the site
  const baseUrl = "https://www.agreewise.ai";

  // Static pages
  const staticUrls = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
    },
  ];

  return staticUrls;
}
