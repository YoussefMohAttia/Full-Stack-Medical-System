# Cloudflare setup

The TypeScript and Express application uses Cloudflare Workers, D1, private R2 storage and Gmail SMTP or Resend. The D1 database ID in `wrangler.jsonc` is a placeholder. Provision your own resources, configure secrets and test a staging site before deploying for customers.

## Local setup

1. Install Node.js and run `npm ci`. Copy `.dev.vars.example` to `.dev.vars` and set a unique random `SESSION_SECRET` of at least 32 characters.
2. For Gmail email delivery, set `MAIL_PROVIDER=gmail`, `SMTP_USERNAME`, `SMTP_PASSWORD` and `SMTP_FROM` in `.dev.vars`. The password must be a Gmail app password, never the regular account password. For Resend, remove `MAIL_PROVIDER=gmail` and set `RESEND_API_KEY` and `RESEND_FROM` instead. `NOTIFICATION_EMAIL` receives order and cancellation notifications.
3. Run `npm run db:local`, then `npm run dev:cloudflare`. D1 and R2 use local files under `.wrangler/`.
4. Create an administrator using the instructions below.

`.dev.vars` contains secrets and is ignored by Git. Never share or commit it.

## Administrator

Run `node cloudflare/scripts/create-admin.cjs --output data/new-admin.migration.sql` in an interactive terminal and enter the name, email and password when prompted. For the local database, run `npx wrangler d1 execute xpharma-local --local --file data/new-admin.migration.sql`. For a remote database, replace its name with your database name and use `--remote`. Delete the private SQL file after use. The new database has no default administrator.

## Cloudflare resources

1. Authenticate Wrangler with your Cloudflare account. Create a D1 database and a private R2 bucket. R2 may require completing Cloudflare's checkout flow, even if usage is within free allowances.
2. Replace the `database_id`, `database_name` and bucket name in `wrangler.jsonc` with your own resources. Keep the R2 bucket private; do not enable its public URL. Apply D1 migrations using `npx wrangler d1 migrations apply <database-name> --remote`.
3. Set `SESSION_SECRET` and the selected email provider settings with `npx wrangler secret put <NAME>`. For Gmail, set `MAIL_PROVIDER`, `SMTP_USERNAME`, `SMTP_PASSWORD` and `SMTP_FROM`; use `gmail` as the `MAIL_PROVIDER` value. For Resend, set `RESEND_API_KEY` and `RESEND_FROM`. Use a unique production session secret. Make sure `APP_ENV=production` and the notification email and InstaPay account are correct.
4. Create an administrator. Verify your configuration in a staging deployment before switching traffic. Use `npx wrangler deploy --dry-run` to build without deploying.

Cloudflare's free Workers plan limits CPU time per request. Password hashing, Express and template rendering need to be measured on the deployed plan; successful local tests don't prove the free limit is sufficient. A paid plan may be needed. D1, R2, email and domains have separate limits and costs.

Without working email, customers cannot receive verification codes. Reservations and cancellations remain saved if the notification email fails, but the customer sees a warning. Test delivery to a real inbox before launch.

## Tests

Run `npm run typecheck` and `npm run test:smtp`. To run the end-to-end tests, use a separate test `.dev.vars` with `APP_ENV=test`, `RESEND_API_KEY=local-test-only`, `RESEND_FROM=Test <test@example.test>`, `RESEND_TEST_ENDPOINT=http://127.0.0.1:8788/emails` and `NOTIFICATION_EMAIL=Xpharma25@gmail.com`; omit `MAIL_PROVIDER=gmail`. Restart Wrangler after editing it. Start the local server on port 8790 with `npm run dev:cloudflare -- --port 8790`, then run `npm run test:api`. The tests create and delete test accounts and reservations in the local D1 database and store temporary test images in local R2. Never set `APP_ENV=test` or the test endpoint in production.

`npm run test:browser` tests language, dark mode and the product gallery in desktop and mobile Chrome. The script uses the standard Windows Chrome installation path.

## Files

- `cloudflare/src/`: Express routes, sessions, email and R2 proof handling.
- `cloudflare/migrations/`: D1 schema migrations.
- `cloudflare/data/product-info.json`: bilingual product information.
- `templates/`: page templates; run `npm run templates` after editing them.
- `cloudflare/generated/templates.js`: compiled templates used by the Worker.
- `static/.assetsignore`: prevents the uploads folder from being included in public Worker assets.

## Admin workflow

Administrators can search orders and customers, inspect proof images, review InstaPay payments, complete or cancel orders, and manage product names, descriptions, prices and images. Deleting a product removes it from the catalogue while retaining its existing orders and activity history. Deleted products can be restored as inactive from the product management page. Payment verification is manual: confirm the transfer in InstaPay or the receiving bank before marking it verified. A screenshot alone is not proof of payment. Rejected screenshots can be replaced by the customer; earlier proofs and admin actions remain available in the order details. Cancelling an order does not automatically refund a payment. Completing a cash order records that the cash was received.

Product names, short purposes and descriptions can be entered in English and Arabic. Detailed ingredient sections and brochure images for the original products are maintained in `cloudflare/data/product-info.json` and `static/`.
