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
    path: "/shop-with-sidebar?sort=rating",
  },
  {
    id: 4,
    title: "Our Story",
    newTab: false,
    path: "/our-story",
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
        path: "/shop-with-sidebar?category=Skincare",
      },
      {
        id: 62,
        title: "Makeup",
        newTab: false,
        path: "/shop-with-sidebar?category=Complexion",
      },
      {
        id: 64,
        title: "Hair Care",
        newTab: false,
        path: "/shop-with-sidebar?category=Hair%20Care",
      },
      {
        id: 65,
        title: "Body Care",
        newTab: false,
        path: "/shop-with-sidebar?category=Body%20Care",
      },
      {
        id: 66,
        title: "Fragrance",
        newTab: false,
        path: "/shop-with-sidebar?category=Lip%20Care",
      },
      {
        id: 67,
        title: "Gift Sets",
        newTab: false,
        path: "/gift-sets",
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
        path: "/ingredients",
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
        path: "/faq",
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
