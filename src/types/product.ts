export type Product = {
  title: string;
  category?: string;
  description?: string;
  benefits?: string[];
  ingredients?: string[];
  skinTypes?: string[];
  concerns?: string[];
  fragranceNotes?: string[];
  routineStep?: "cleanse" | "treat" | "hydrate" | "protect" | "color" | "body" | "hair" | "lips";
  finish?: string;
  size?: string;
  shade?: string;
  shades?: { name: string; value: string }[];
  labels?: ("vegan" | "cruelty-free" | "clean" | "dermatologist-tested")[];
  reviews: number;
  price: number;
  discountedPrice: number;
  id: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
