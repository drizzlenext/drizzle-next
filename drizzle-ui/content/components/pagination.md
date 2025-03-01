---
title: Pagination
description: A pagination component
code: src/components/ui/pagination.tsx
usage: components/component-demo/pagination-demo.tsx
---

This pagination component controls the query string parameters, and uses Next.js's `useRouter`, `useSearchParams`, and `usePathname` hooks. The usage example below uses client-side hooks. However, this component can read server-side search parameters, which is how it works with Drizzle Next.
