import { useEffect } from "react";

// Sets title and description per route. Site-wide robots are noindex while the preview is private.
export function useDocumentMeta(title: string, description: string): void {
  useEffect(() => {
    document.title = title;
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "description";
      document.head.appendChild(tag);
    }
    tag.content = description;
  }, [title, description]);
}
