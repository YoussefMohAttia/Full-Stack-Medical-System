# XPharma deployment checklist

This is a single-instance Flask/SQLite deployment for an initial launch. Review the application and test it with real services before accepting customer orders. The repository is not a backup of customer data.

## Render setup

The included `render.yaml` describes a paid web service and a 1 GB persistent disk mounted at `/var/data`. Creating these resources incurs charges; verify Render's current pricing before deploying. Do not select a free service for real orders: its local database and uploaded files are ephemeral.

The application writes `/var/data/xpharma.db` and `/var/data/payment_proofs/`. A disk must actually be attached at `DATA_DIR`; the application cannot verify that a host's filesystem is persistent. Run one web instance with one Gunicorn worker. SQLite and local disk storage are not a multi-instance architecture.

The blueprint configures `APP_ENV=production`, `DB_ENGINE=sqlite`, `DATA_DIR=/var/data`, `TRUST_PROXY=1` and a generated `SECRET_KEY`. Only use `TRUST_PROXY=1` behind the intended trusted Render proxy, never when the application is directly reachable. The key must stay stable across restarts; changing it invalidates sessions.

In Render's environment settings configure your email provider, without committing secrets to Git. For Gmail SMTP set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM`, and `NOTIFICATION_EMAIL`. Alternatively set `RESEND_API_KEY`, `RESEND_FROM`, and `NOTIFICATION_EMAIL`; the Resend sender must be authorized by the provider. Ensure your host permits the relevant outgoing connection. Set `INSTAPAY_ACCOUNT` to the correct account, and check the included QR image belongs to it. A screenshot upload is not proof that payment has been verified.

## Create an admin

Production does not create the example admin accounts and rejects plaintext passwords. Open the deployed service's secure shell and run `python create_admin.py`. Enter an admin email and a strong password at the prompts; do not put passwords in Git, chat, or shell arguments. The command refuses to overwrite an existing account. Local demo accounts are not valid production credentials.

## Existing local data and proofs

A new disk starts empty. Migrating existing customers, orders and screenshots is a separate deliberate operation: use a consistent SQLite backup and privately copy any required files; verify results before switching traffic. Existing screenshot records may refer to the former `static/uploads/payment_proofs` location. Preserve and migrate those files before retiring an old installation; the application blocks direct public access to the old URL and can serve legacy files to admins while they remain at that location. Do not publish old payment screenshots or include them in a repository.

## Before customers use the site

- Check that the disk is mounted and survives a restart and deployment; set and test an independent backup and restore process for both the database and payment proofs. Restrict backup access.
- Confirm the domain and HTTPS, secure cookies, email delivery, account registration and verification, login, order notification, cancellation notification, QR and screenshot upload. Check phone and desktop layouts in both languages.
- Check that anonymous users and ordinary customers cannot access admin pages or payment screenshots. Test an authorized admin download from Reports and confirm the payment status is reviewed manually.
- Replace default or exposed credentials and rotate any keys that were shared or saved in an example file. Establish who can access customer addresses and order records.
- Review privacy policy, retention and relevant local business requirements before launch. Keep the Flask debugger disabled and monitor logs and email failures.

The built-in request limits are a basic per-IP safeguard, not a complete distributed abuse-prevention system. Reassess rate limits, email delivery, backups, disaster recovery and storage access for actual traffic and hosting conditions. Consult a security professional before handling real customer and payment data.
