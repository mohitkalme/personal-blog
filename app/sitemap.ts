import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mohitkalme.in",
      lastModified: new Date(),
    },
    {
      url: "https://mohitkalme.in/blog",
      lastModified: new Date(),
    },
  ];
}
