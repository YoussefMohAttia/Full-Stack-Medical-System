# XPharma

A bilingual, responsive website built with TypeScript and Express on Cloudflare Workers. Customers can browse products, verify their email, reserve quantities, pay cash on collection or upload an InstaPay proof. Administrators can review reservations and download proofs from private R2 storage.

## Run locally

Requirements: a current Node.js LTS release and npm. In PowerShell, use `npm.cmd` if script execution policies block `npm`.

1. Run `npm ci`.
2. Copy `.dev.vars.example` to `.dev.vars` and set a unique random `SESSION_SECRET` of at least 32 characters. Configure Gmail or Resend settings for real email delivery.
3. Run `npm run db:local` to create the local D1 schema.
4. Run `npm run dev:cloudflare` and open the local URL printed by Wrangler.

Local D1 and R2 use separate files under `.wrangler/`. The database starts with a product catalogue and no administrator. See [Cloudflare setup](cloudflare/README.md) to create an admin and configure email and deployment.

The website pages are in `templates/`, and the product information is in `cloudflare/data/product-info.json`. After changing a template, run `npm run templates` to regenerate the compiled output.

## Testing

Run `npm run typecheck` and `npm run test:smtp`. The Cloudflare guide explains how to run the end-to-end and browser tests. Test real email delivery and a staging deployment before launch.
