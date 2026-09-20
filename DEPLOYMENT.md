# Deployment Guide

## Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repository: `jjlecocq-v/outbound-draft-gate`
3. Select the branch: `cursor/draft-gate-app-17f3`
4. Framework will be auto-detected as Next.js
5. Click "Deploy"

The app will be live at a URL like: `https://outbound-draft-gate.vercel.app`

### Optional: Add AI Gateway API Key

If you want to use real AI scoring instead of the mock scorer:

1. In Vercel dashboard, go to Project Settings → Environment Variables
2. Add: `AI_GATEWAY_API_KEY` with your Vercel AI Gateway API key
3. Redeploy

## Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Option 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jjlecocq-v/outbound-draft-gate&branch=cursor/draft-gate-app-17f3)

## After Deployment

Once deployed, update the live URL in:
- `README.md` (top of file)
- `TALK_TRACK.md` (top of file)
- `LINKEDIN_CAPTION.md` (replace [Live URL])

## Testing the Deployment

1. Visit the deployed URL
2. Click "Open Draft Gate"
3. Select a draft and click "Score Draft"
4. Verify the scoring works (will use mock scorer if no API key is set)

## Troubleshooting

If the build fails:
- Check that Node version is 18.x or higher
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

If scoring doesn't work:
- The app will fall back to mock scorer if AI Gateway key is not set
- This is expected and the demo still works fully
- Mock scorer uses deterministic pattern matching
