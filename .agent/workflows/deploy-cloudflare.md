---
description: Deploy Ytnk Records to Cloudflare Pages
---

# Deploying to Cloudflare Pages

This guide outlines the steps to deploy the Astro application to Cloudflare Pages, which is the most economical and high-performance option.

## Prerequisites

1.  **GitHub Repository**: The code must be pushed to a GitHub repository.
2.  **Cloudflare Account**: Create a free account at [dash.cloudflare.com](https://dash.cloudflare.com/sign-up).

## Step 1: Push Code to GitHub

If you haven't already, push your local code to a new GitHub repository.

```bash
# In your terminal
git init
git add .
git commit -m "Initial commit"
# Create repo on GitHub website, then:
git remote add origin <your-repo-url>
git push -u origin main
```

## Step 2: Connect Cloudflare Pages

1.  Log in to the **Cloudflare Dashboard**.
2.  Go to **Workers & Pages** in the sidebar.
3.  Click **Create Application** > **Pages** > **Connect to Git**.
4.  Select your GitHub account and the `ytnkrecords` repository.
5.  Click **Begin setup**.

## Step 3: Build Configuration

Cloudflare usually detects Astro automatically, but verify these settings:

-   **Production branch**: `main`
-   **Framework preset**: `Astro`
-   **Build command**: `npm run build`
-   **Build output directory**: `dist`
-   **Environment Variables** (Optional):
    -   If you have secrets (like API keys), add them here later.

Click **Save and Deploy**.

## Step 4: Add Custom Domain

Once the first deploy is green/successful:

1.  In your Pages project dashboard, go to the **Custom Domains** tab.
2.  Click **Set up a custom domain**.
3.  **If you need to buy one**:
    -   Go to **Domain Registration** > **Register Domains** in the main Cloudflare sidebar.
    -   Search for your desired `ytnkrecords.com` (or similar).
    -   Purchase it (cheapest price on the market).
4.  **Once purchased**:
    -   Return to Pages > Custom Domains.
    -   Enter your domain name.
    -   Cloudflare automatically configures the DNS records (CNAME) for you.

## Step 5: Handling Forms (Future)

Since you want a DB for contact forms/demos:
1.  We can use **Cloudflare D1** (SQLite database at the edge) for free.
2.  We will need to update the Astro config to `output: 'server'` or `'hybrid'` to handle form submissions dynamically, or use Cloudflare Functions.
3.  This can be set up after the initial static site is live.
