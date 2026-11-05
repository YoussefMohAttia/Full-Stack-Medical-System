# XPharma

XPharma is a bilingual Flask website for browsing skincare products and reserving them for collection. Customers can create an account, verify their email, view product details, choose a quantity and pay by cash on collection or submit an InstaPay transfer screenshot for manual review.

The site includes English and Arabic, light and dark themes, and layouts for desktop and mobile. Administrators can add products, view reservations, and download payment proofs after signing in.

## Run locally

Install Python 3.10 or newer and the dependencies:

```powershell
python -m pip install -r requirements.txt
$env:DB_ENGINE = 'sqlite'
$env:SQLITE_DATABASE = 'data\xpharma_local.db'
python app.py
```

Open `http://127.0.0.1:5000`. The SQLite database is created on first use. Existing XPharma databases from earlier versions are backed up and migrated automatically; customer accounts and reservations are retained.

Email delivery requires a configured SMTP account or Resend API. Keep credentials in a local `.env` file and never commit that file. The site cannot send verification or notification emails without a working provider. InstaPay screenshots are reviewed by the team; an upload does not confirm payment.

## Production

See [DEPLOYMENT.md](DEPLOYMENT.md) for production configuration, private file storage, admin setup, backups, and pre-launch checks. A local development server, default demo admin credentials, and ephemeral storage must not be used for real customers.

## Main files

- `app.py` — routes and web security configuration.
- `backend.py` — database, accounts and reservations.
- `notifications.py` — email delivery and order notifications.
- `product_info.py` — bilingual product information.
- `templates/` and `static/` — pages, styling, company images and product materials.
- `create_admin.py` — interactive creation of a production administrator.

The Flask application and product assets are maintained separately from its previous prototype. The migration code retains only the compatibility needed to safely upgrade existing local databases.
