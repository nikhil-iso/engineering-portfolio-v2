import type { GalleryItem } from "@/data/projects";

/** Resolve gallery items from either the new `gallery` field or legacy `images` array. */
export function resolveGallery(
  gallery?: GalleryItem[],
  images?: string[]
): GalleryItem[] {
  if (gallery && gallery.length > 0) return gallery;
  if (images && images.length > 0)
    return images.map((src) => ({ type: "image" as const, src }));
  return [];
}

/** Extract only image sources from gallery items (for lightbox). */
export function getImageSources(items: GalleryItem[]): string[] {
  return items.filter((i) => i.type === "image").map((i) => i.src);
}

/** Map a gallery-level index to the image-only index (for lightbox). Returns -1 if not an image. */
export function galleryIndexToImageIndex(items: GalleryItem[], galleryIndex: number): number {
  let imgIdx = 0;
  for (let i = 0; i < items.length; i++) {
    if (i === galleryIndex) return items[i].type === "image" ? imgIdx : -1;
    if (items[i].type === "image") imgIdx++;
  }
  return -1;
}
