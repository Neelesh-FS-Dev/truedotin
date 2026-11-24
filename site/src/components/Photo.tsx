import type { Photo as PhotoData } from "../content/media";

type Props = {
  photo: PhotoData;
  sizes: string;
  alt?: string;
  priority?: boolean;
  className?: string;
};

// AVIF first, JPEG fallback. Explicit width/height reserve the box so nothing shifts on load.
export function Photo({ photo, sizes, alt, priority = false, className }: Props) {
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={photo.avifSrcSet} sizes={sizes} />
      <img
        src={photo.src}
        srcSet={photo.srcSet}
        sizes={sizes}
        width={photo.width}
        height={photo.height}
        alt={alt ?? photo.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
