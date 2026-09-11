"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import { hydrateCart } from "./features/cart-slice";
import { hydrateWishlist } from "./features/wishlist-slice";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const savedCart = window.localStorage.getItem("spinett-cart");
    const savedWishlist = window.localStorage.getItem("spinett-wishlist");

    if (savedCart) {
      store.dispatch(hydrateCart(JSON.parse(savedCart)));
    }
    if (savedWishlist) {
      store.dispatch(hydrateWishlist(JSON.parse(savedWishlist)));
    }

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      window.localStorage.setItem("spinett-cart", JSON.stringify(state.cartReducer.items));
      window.localStorage.setItem("spinett-wishlist", JSON.stringify(state.wishlistReducer.items));
    });

    return unsubscribe;
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
