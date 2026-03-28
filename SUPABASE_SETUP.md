# Supabase CLI Setup Guide for Beginners

## Step 1: Install Supabase CLI

```bash
# On macOS
brew install supabase/tap/supabase

# On Windows
scoop install supabase

# On Linux
npm install -g supabase
```

## Step 2: Login to Supabase

```bash
supabase login
```

## Step 3: Link to Your Project

```bash
# Go to your project directory
cd master-prompt-builder

# Link to existing project (get Project ID from Supabase dashboard)
supabase link --project-ref your-project-ref
```

## Step 4: Get Your API Keys

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings > API
4. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 5: Update .env.local

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

## Step 6: Start Local Development

```bash
supabase start
# This will start local Supabase services

# When done, stop with:
supabase stop
```

## Common Commands

```bash
supabase status      # Check status of services
supabase db reset    # Reset local database
supabase db push     # Push schema changes
supabase secrets     # Manage secrets
```

## Need Help?

- [Supabase Docs](https://supabase.com/docs)
- [Supabase CLI Docs](https://supabase.com/docs/guides/cli)
