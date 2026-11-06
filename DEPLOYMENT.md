# XPharma production deployment

The live website runs at https://xpharma-eg.com and https://www.xpharma-eg.com. The Workers address https://xpharma.xpharma-eg.workers.dev also remains available. Deployment uses `wrangler.production.jsonc`, the `xpharma-production` D1 database and the private `xpharma-production-private` R2 bucket. The previous staging Worker, D1 database and bucket were removed during launch.

Run `npm ci`, `npm run templates`, `npm run typecheck`, and `npm run test:smtp` before deploying. See [cloudflare/README.md](cloudflare/README.md) for local development and isolated end-to-end testing. The test suite must never target the production database.

Deploy with `npx wrangler deploy --config wrangler.production.jsonc`. Email and session secrets are stored in Cloudflare, not the configuration file. Do not commit `.dev.vars`, exported database files, credentials or payment screenshots. The R2 bucket must remain private.

The site uses manual InstaPay verification; staff must confirm receipt in InstaPay or the bank. The Workers free plan and the D1, R2 and email services have separate usage limits. Monitor failures, set up and regularly test backups, and confirm real email delivery and order notifications before relying on them for business.
