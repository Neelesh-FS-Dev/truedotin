import { useEffect } from 'react';

// Keeps the document title and description in step with the current route.
export function useDocumentMeta(title: string, description: string): void {
  useEffect(() => {
    document.title = title;
    const tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const og = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    tag?.setAttribute('content', description);
    og?.setAttribute('content', title);
    ogDesc?.setAttribute('content', description);
  }, [title, description]);
}
