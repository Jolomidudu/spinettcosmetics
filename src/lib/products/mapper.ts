import { Product } from "@/types/product";

type SupabaseProduct = {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  discounted_price?: number | null;
  size?: string | null;
  routine_step?: Product["routineStep"] | null;
  finish?: string | null;
  ingredients?: string[] | null;
  benefits?: string[] | null;
  skin_types?: string[] | null;
  concerns?: string[] | null;
  labels?: Product["labels"] | null;
  categories?: { name?: string | null } | null;
  product_media?: {
    storage_path: string;
    alt_text?: string | null;
    sort_order?: number | null;
  }[] | null;
};

export function mapSupabaseProduct(product: SupabaseProduct): Product {
  const media = [...(product.product_media || [])].sort(
    (first, second) => (first.sort_order || 0) - (second.sort_order || 0),
  );
  const images = media.map((item) => item.storage_path);
  const fallbackImage = "/images/products/fair-white/so-white-essentials-kit.png";

  return {
    id: product.id,
    title: product.title,
    category: product.categories?.name || undefined,
    description: product.description || undefined,
    benefits: product.benefits || [],
    ingredients: product.ingredients || [],
    skinTypes: product.skin_types || [],
    concerns: product.concerns || [],
    routineStep: product.routine_step || undefined,
    finish: product.finish || undefined,
    size: product.size || undefined,
    labels: product.labels || [],
    reviews: 0,
    price: Number(product.price),
    discountedPrice: Number(product.discounted_price ?? product.price),
    imgs: {
      thumbnails: images.length ? images : [fallbackImage],
      previews: images.length ? images : [fallbackImage],
    },
  };
}
