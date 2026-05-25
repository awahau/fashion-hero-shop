"use client";

import { useEffect } from "react";
import { RecentlyViewed, trackRecentlyViewed } from "@/components/recently-viewed";
import { products } from "@/data/products";
import posthog from "posthog-js";

export function RecentlyViewedSection({ productId }: { productId: string }) {
  useEffect(() => {
    trackRecentlyViewed(productId);
    const product = products.find((p) => p.id === productId);
    if (product) {
      posthog.capture("product_viewed", {
        product_id: product.id,
        product_name: product.name,
        product_slug: product.slug,
        product_price: product.price,
        product_category: product.category,
      });
    }
  }, [productId]);

  return <RecentlyViewed currentProductId={productId} />;
}
