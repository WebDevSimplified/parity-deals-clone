# Runbook

This document outlines the deployment process, monitoring, troubleshooting guides, and rollback procedures for this application.

## Deployment Procedures

### Vercel Deployment (Recommended)
1. Import the repository in the Vercel Dashboard.
2. Configure the following environment variables:
   - All variables listed in `.env.example` (except `TEST_COUNTRY_CODE`).
3. Set the **Build Command** to:
   ```bash
   pnpm run build
   ```
4. Set the **Install Command** to:
   ```bash
   pnpm install
   ```
5. Deploy.

### Post-Deployment Hook for Migrations
Since Drizzle migrations are stored under `src/drizzle/migrations`, you must execute migrations on the database when changes are deployed.
1. Run migrations in your CI/CD pipeline or as a pre-deploy step:
   ```bash
   pnpm db:migrate
   ```
2. Make sure the `DATABASE_URL` matches the production Neon DB instance.

---

## Webhook Integrations

### 1. Clerk Webhooks
Clerk webhooks are used to synchronize user accounts with the application's local user database (`db_users_deleteuser` etc.).
- **Endpoint**: `https://<YOUR_DOMAIN>/api/webhooks/clerk`
- **Events**: `user.created`, `user.deleted`
- **Troubleshooting**: If user synchronization fails, verify that `CLERK_WEBHOOK_SECRET` matches the signing secret in the Clerk dashboard.

### 2. Stripe Webhooks
Stripe webhooks are used to track subscription billing status changes.
- **Endpoint**: `https://<YOUR_DOMAIN>/api/webhooks/stripe`
- **Events**: `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated`
- **Troubleshooting**: If subscriptions are not updating in the DB, check that `STRIPE_WEBHOOK_SECRET` matches the webhook endpoint secret in Stripe.

---

## Health Checks & Monitoring

### Health Indicators
- **Home Page**: Verify that `https://<YOUR_DOMAIN>/` returns a status `200` and displays the branding/marketing UI.
- **Database Connection**: The database is connected serverless via Neon. You can verify connectivity by logging in and checking the user dashboard.

---

## Troubleshooting Common Issues

### Issue 1: Database out-of-sync or missing columns
- **Symptom**: Server logs show SQL syntax errors or missing columns.
- **Fix**:
  1. Generate any missing migrations:
     ```bash
     pnpm db:generate
     ```
  2. Apply migrations:
     ```bash
     pnpm db:migrate
     ```

### Issue 2: Webhooks return `401` or `400` errors
- **Symptom**: Webhook execution logs show signature verification errors.
- **Fix**: Check `CLERK_WEBHOOK_SECRET` and `STRIPE_WEBHOOK_SECRET` in the environment configuration. If Webhooks are failing locally, ensure that the Stripe CLI tunnel is running (`pnpm stripe:webhooks`).

---

## Rollback Procedures

### Rollback on Vercel
1. Go to the project page in Vercel.
2. Navigate to the **Deployments** tab.
3. Select the last stable deployment.
4. Click the options menu (three dots) and select **Redeploy** or **Promote to Production**.

### Database Schema Rollback
Drizzle migrations are incremental. If you roll back the application code, the database schema remains forward-compatible in most cases. If a hard migration rollback is needed:
1. Connect to the Postgres database using a client.
2. Manually revert the last schema changes if necessary.
3. Keep the `drizzle_migrations` table up to date.
