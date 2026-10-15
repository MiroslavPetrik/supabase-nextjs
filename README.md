# SSR Supabase Next.js components

Uses server data fetching & server actions instead of the [`supabase-js`](https://www.npmjs.com/package/@supabase/supabase-js) client library.

## Motivation

The Next.js versions of the Supabase components should not just reuse the React SPA hooks. Instead, they should leverage the idiomatic framework features. Namely:

- [**Suspense**](./components/oauth-consent-form/index.tsx#L20) for declarative loading state, enabling [static shell maxxing](https://github.com/MiroslavPetrik/next-suspend)
- [**catchError**](./components//oauth-consent-form/components/error-boundary.tsx#L6) for custom error boundaries
- [**useActionState() & "use server"**](./components//oauth-consent-form/components/consent-decision.tsx#L14) for server actions with implicit pending state
- [**useFormStatus()**](./components/oauth-consent-form/components/consent-decision.tsx#L60) for submit action tracking

This leads not just to cleaner & easy to read code, but also to better performance, e.g. by eliminating the `supabase-js` from the bundle.

Running the `npx next analyze` (this repo) shows:

| route            | SSR? | Size  |
| ---------------- | ---- | ----- |
| `/oauth/consent` | Yes  | 390kb |
| `/auth/login`    | No   | 470kb |

## Components

### [OAuth Consent](https://supabase.com/library/docs/nextjs/oauth-consent)

![preview](./public//preview.png)

```
npx shadcn@latest add MiroslavPetrik/supabase-nextjs/oauth-consent-nextjs-ssr
```
