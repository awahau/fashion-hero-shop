<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into FashionHero. The integration includes client-side initialization via `instrumentation-client.ts`, a reverse proxy through Next.js rewrites, a server-side PostHog client for API routes, and 12 events tracking the full ecommerce conversion funnel — from browsing and search, through add-to-cart and wishlist, all the way to checkout. User identity is linked via `posthog.identify()` on login and registration, and `posthog.reset()` is called on logout.

## Files created or modified

| File | Change |
|------|--------|
| `instrumentation-client.ts` | Created — client-side PostHog init with EU host, reverse proxy, exception capture |
| `src/lib/posthog-server.ts` | Created — server-side PostHog Node.js singleton client |
| `next.config.ts` | Updated — reverse proxy rewrites for `/ingest/*` → `eu.i.posthog.com` |
| `.env.local` | Created — `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` |

## Events instrumented

| Event | Description | File |
|-------|-------------|------|
| `product_viewed` | User views a product detail page — top of the conversion funnel | `src/app/products/[slug]/recently-viewed-section.tsx` |
| `collection_viewed` | User views a collection listing page | `src/components/collection-view.tsx` |
| `add_to_cart` | User adds a product to the cart with color and size | `src/components/cart-provider.tsx` |
| `remove_from_cart` | User removes a product from the cart | `src/components/cart-provider.tsx` |
| `quick_view_opened` | User opens the quick view modal from a product card | `src/components/product-card.tsx` |
| `checkout_started` | User clicks Place Order — key conversion event | `src/app/checkout/page.tsx` |
| `product_wishlisted` | User adds a product to their wishlist | `src/components/wishlist-provider.tsx` |
| `product_unwishlisted` | User removes a product from their wishlist | `src/components/wishlist-provider.tsx` |
| `product_searched` | User searches and clicks a result — captures query and result count | `src/components/search-modal.tsx` |
| `user_logged_in` | User successfully logs in (+ `posthog.identify()`) | `src/components/auth-provider.tsx` |
| `user_registered` | User creates a new account (+ `posthog.identify()`) | `src/components/auth-provider.tsx` |
| `user_logged_out` | User logs out (+ `posthog.reset()`) | `src/components/auth-provider.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/704250)
- [Purchase Conversion Funnel](/insights/DDjiKamm) — 3-step funnel: product viewed → add to cart → checkout started
- [New User Registrations](/insights/itqCaVzR) — daily trend of user_registered events
- [Add to Cart Events](/insights/Ru2T7RvN) — daily trend of add_to_cart events
- [Wishlist Engagement](/insights/fK7scFPk) — wishlisted vs unwishlisted over time
- [Product Search Activity](/insights/XKRLpUlf) — daily trend of product_searched events

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
