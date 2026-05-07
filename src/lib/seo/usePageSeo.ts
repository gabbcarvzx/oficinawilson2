import { useEffect } from "react";
import { seoConfig } from "@/content/seoContent";

type SeoInput = {
  title: string;
  description: string;
  path: string;
};

function upsertMetaByName(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

export function usePageSeo({ title, description, path }: SeoInput) {
  useEffect(() => {
    const canonicalUrl = `${seoConfig.baseUrl}${path}`;

    document.title = title;

    upsertMetaByName("description", description);
    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:type", "website");
    upsertMetaByProperty("og:url", canonicalUrl);
    upsertMetaByProperty("og:image", `${seoConfig.baseUrl}${seoConfig.defaultImage}`);
  }, [description, path, title]);
}