# MailerMine Public UI (extracted)

Standalone Vite + React + TypeScript + Tailwind copy of the **existing** MailerMine public website.

This is **not** a redesign. Components, layouts, Tailwind classes, marketing CSS, brand assets, and page structure were copied from the Laravel/Inertia app and adapted only where required (Inertia → React Router, backend props → static mocks).

## Run

```bash
cd mailermine-ui
npm install
npm run dev
```

## What was extracted

- All `Website/*` public pages (Home, Features, Pricing, Docs, Blog, …)
- Auth guest pages (Login, Register/Signup, Forgot/Reset Password)
- `MarketingLayout`, `GuestLayout`
- All `Components/Website/*` + Brand logo
- Auth UI (`AuthCard`, Google button, shadcn `ui/*` used by auth)
- `content/website.ts`, theme context, brand assets
- Exact `marketing.css` + app design tokens + Tailwind theme from the main app

## What was replaced

| Original | Standalone |
|---|---|
| `@inertiajs/react` Link / Head / useForm / router | `src/shims/inertia.tsx` |
| Ziggy `route()` | `src/shims/route.ts` |
| Controller props (`plans`, blog posts, `seo`) | `src/data/mock.ts` |
| Laravel | None |

## Important

- Do **not** edit the parent Laravel project for UI work — edit this folder only.
- Forms are UI-only (no API).
- `/developers/docs/*` links remain as in the original footer/nav; the full developer docs app was not extracted.
- Pricing plans and blog posts are static mocks shaped like the live API payloads.
# mailermine-ui
