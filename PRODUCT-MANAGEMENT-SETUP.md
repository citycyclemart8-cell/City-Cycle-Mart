# City Cycle Mart product management

The storefront is static on GitHub Pages. Supabase stores the live catalog and product photos; the bundled `data/products.js` file remains as an offline/setup fallback. Public visitors can read products and images. Only signed-in Supabase users can change the catalog or upload images.

## One-time Supabase setup

1. Create a Supabase project on the free plan.
2. In **SQL Editor**, run `supabase-setup.sql`.
3. In **Project Settings → API**, copy the Project URL and anon/publishable key into `scripts/supabase-config.js`. Those browser credentials are public; never place a `service_role` or secret key in the site.
4. In **Authentication → Providers / Sign In**, turn off public sign-ups. In **Authentication → Users**, invite only the store owner/admin account.
5. In **Authentication → URL Configuration**, add your GitHub Pages URL to the allowed redirect URLs (for example `https://citycyclemart8-cell.github.io/City-Cycle-Mart1/**`).
6. Commit and push the website files to the GitHub Pages branch. Open `/admin.html` on the deployed site and sign in.

The SQL makes product images public so product cards can display them. Image uploads are limited to 6 MB and common web image types. Do not add a Supabase secret/service-role key to any website file.

## First catalog import

After setup, use **Import bundled catalog** in the admin page once. It copies the current products from `data/products.js` to Supabase without replacing any existing database rows. Afterward, storefront pages load the database catalog automatically. If the database is empty or temporarily unreachable, they continue using the bundled catalog.

## Editing products

Use `/admin.html` to add a bicycle or accessory, edit its details/prices, upload one or more photos, add colour options with their own photos, or remove a product. The first gallery photo is used as the main catalog image; each colour option has a separate photo slider on the product detail page. Add at least two named colour options to show the colour selector. Changes are saved directly to Supabase and appear on the storefront after its next page load; GitHub Pages does not need a new deployment for catalog edits. Use a fresh page load to see changes in an already-open storefront tab.

Admin accounts are powerful: every authenticated user can edit/delete all products and manage images. Keep public sign-ups disabled and invite only trusted admins. This client-side setup intentionally uses Supabase Auth and RLS, with no server secret in the browser.
