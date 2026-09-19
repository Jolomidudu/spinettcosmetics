import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Our Store | Spinett Cosmetics",
  description: "Explore the Spinett Cosmetics store.",
};

const OurStorePage = () => {
  return (
    <main>
      <ShopWithSidebar />
    </main>
  );
};

export default OurStorePage;