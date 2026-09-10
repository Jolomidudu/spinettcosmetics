import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spinett Cosmetics | Skin, Glow & Beauty Essentials",
  description: "Shop luxury skincare, makeup, body care and glow-boosting essentials from Spinett Cosmetics.",
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
