import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Shop",
    newTab: false,
    path: "/shop-with-sidebar",
  },
  {
    id: 3,
    title: "Best Sellers",
    newTab: false,
    path: "/shop-with-sidebar",
  },
  {
    id: 6,
    title: "Collections",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        title: "Skin Care",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 62,
        title: "Makeup",
        newTab: false,
        path: "/shop-without-sidebar",
      },
      {
        id: 64,
        title: "Hair Care",
        newTab: false,
        path: "/checkout",
      },
      {
        id: 65,
        title: "Body Care",
        newTab: false,
        path: "/cart",
      },
      {
        id: 66,
        title: "Fragrance",
        newTab: false,
        path: "/wishlist",
      },
      {
        id: 67,
        title: "Gift Sets",
        newTab: false,
        path: "/signin",
      },
    ],
  },
  {
    id: 7,
    title: "Journal",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 71,
        title: "Ingredient Notes",
        newTab: false,
        path: "/blogs/blog-grid-with-sidebar",
      },
      {
        id: 72,
        title: "Routine Guide",
        newTab: false,
        path: "/blogs/blog-grid",
      },
      {
        id: 73,
        title: "Skin Tips",
        newTab: false,
        path: "/blogs/blog-details-with-sidebar",
      },
      {
        id: 74,
        title: "Beauty Advice",
        newTab: false,
        path: "/blogs/blog-details",
      },
    ],
  },
  {
    id: 8,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
];
