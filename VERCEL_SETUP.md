# Vercel Deployment Guide for Beginners

## Prerequisites

1. Vercel Account ([sign up free](https://vercel.com))
2. GitHub/GitLab/Bitbucket account

## Quick Deploy

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/master-prompt-builder)

### Option 2: CLI Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (from project directory)
vercel

# Follow prompts:
# - Set up and share? (Y)
# - Which scope? (your account)
# - Link to existing project? (N)
# - Project name? (master-prompt-builder)
# - Directory? (.)
# - Override settings? (N)
```

## Environment Variables on Vercel

After first deploy, add environment variables in Vercel Dashboard:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings > Environment Variables
4. Add each variable:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `GEMINI_API_KEY` | Your Gemini API key |

## Connect to Supabase Production

```bash
# Link to production Supabase project
supabase link --project-ref your-production-project-ref

# Push database schema
supabase db push
```

## Custom Domain (Optional)

1. Vercel Dashboard > Settings > Domains
2. Add your domain
3. Update DNS records as instructed

## Automatic Deploys

Every push to `main` branch triggers automatic deploy.

## Need Help?

- [Vercel Docs](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
