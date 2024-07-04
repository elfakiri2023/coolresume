## **Please note that this is a work in progress**

# Cool Resume

Craft, share, and showcase your professional story easily, saving time and hassle.

## Technologies used:

-   Framework: [Sveltekit](https://github.com/sveltejs/kit)
-   UI: [Skeleton](https://github.com/skeletonlabs/skeleton) & [Tailwind Css](https://github.com/tailwindlabs/tailwindcss)
-   Database: [Cloudflare D1](https://developers.cloudflare.com/d1)
-   Storage: [Cloudflare R2](https://developers.cloudflare.com/r2)
-   Hosting: [Cloudflare Pages](https://pages.cloudflare.com)
-   CLI: [Wrangler](https://github.com/cloudflare/workers-sdk)
-   Authentication: [Lucia](https://github.com/lucia-auth/lucia)
-   ORM: [Drizzle](https://github.com/drizzle-team/drizzle-or)
-   Email sending: [MailChannels](https://support.mailchannels.com/hc/en-us/articles/4565898358413-Sending-Email-from-Cloudflare-Workers-using-MailChannels-Send-API)
-   Data validation: [Zod](https://github.com/colinhacks/zod)
-   Captcha: [Turnstile](https://www.cloudflare.com/products/turnstile)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/elfakiri2023/coolresume.git
cd coolresume
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Cloudflare

-   **Login**:

    ```bash
    wrangler login
    ```

    > Follow the prompts to log in to your Cloudflare account.

-   **Create Project**

    ```bash
    wrangler pages project create coolresume
    ```

    > You can create a project via the Cloudflare dashboard or using the CLI.

-   **Create Database**:

    ```bash
    wrangler d1 create coolresume_db
    ```

    > You can create a database via the Cloudflare dashboard or using the CLI.

-   **Create R2 Bucket**:
    ```bash
    wrangler r2 bucket create coolresume-bucket
    ```
    > You can create a bucket via the Cloudflare dashboard or using the CLI.

### 4. Configure Wrangler

-   Copy `wrangler.toml.example` to `wrangler.toml` and update it with your database name, ID, and R2 bucket name.

### 5. Generate Turnstile Keys

-   Navigate to **Turnstile** section in your Cloudflare dashboard. Add your site and obtain the Site Key and Secret Key provided.

### 6. Configure Environment Variables

Modify the environment variables by copying `.env.example` to `.env` and updating it with necessary details

-   **TURNSTILE_SECRET_KEY** Turnstile secret key
-   **PUBLIC_TURNSTILE_SITE_KEY** Turnstile site key
-   **PUBLIC_CDN_URL** The CDN url used for displaying stored images (either a custom domain or the one provided with Cloudflare R2).
-   **CLOUDFLARE_ACCOUNT_ID** Go to Workers & Pages -> Overview -> copy Account ID from the right sidebar.
-   **CLOUDFLARE_DATABASE_ID** Open D1 database you want to connect to and copy Database ID.
-   **CLOUDFLARE_D1_TOKEN** Go to My profile -> API Tokens and create token with D1 edit permissions.

### 7. Setup the Database

run

```bash
npm run db:gen
```

then run

```bash
npm run db:mig:local
```

and to view and edit the Database in your browser using [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview), run

```bash
db:studio:dev
```

### 7. Local Development

To bind the D1 database and R2 bucket locally, run:

```bash
npm run proxy
```

In another command line window, run:

```bash
npm run dev
```

### 8. Deployment

For database migration to production, run

```bash
db:mig:prod
```

Then, deploy your project by running

```bash
npm run deploy
```

## TO-DO

-   ✅ Send email with MailChannels
-   ⬜️ Social login (Google, Github)
-   ⬜️ About section (Email, Location, Timezone ..)
