# Outbound Draft Gate

**Live Demo:** https://outbound-draft-gate.vercel.app

A Vercel-branded demo web app for enterprise sales teams. Score every LinkedIn note, email, and CRM message before you send it. Catch tone issues, unsupported claims, and bad timing while it's still a draft.

## What It Does

**The Pain:** Enterprise AEs and sales directors write dozens of outbound messages daily. The risk isn't writing—it's sending the wrong tone, wrong claim, or wrong timing. By the time you realize it, the message is already out there.

**The Solution:** Draft Gate scores every outbound draft before it leaves your desk. Three possible outcomes:
- ✓ **Send OK** - Professional tone, appropriate timing, value-focused
- ⚠ **Rewrite** - Needs improvement (with suggested rewrite)
- ✋ **Hold** - Risk detected (tone, claims, compliance, timing)

**The Result:** Nothing auto-sends. You always click send from your actual platform. But now you know it passed the gate first.

## Features

- **Personal Sales Desk** - Score drafts from LinkedIn, email, and CRM before sending
- **Enterprise Policy View** - Same gate enforced org-wide for AI agents and automation
- **Jev-style Evaluate** - ONE model call returns parallel Boolean judgments + confidence scores
- **AI Gateway Integration** - Uses Vercel AI Gateway (falls back to deterministic mock if no API key)
- **Draft-Only Mode** - Never posts to external systems; human always clicks send

## Tech Stack

- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** with Vercel brand colors (black/white, Geist font)
- **Vercel AI SDK** with AI Gateway pattern
- **Jev-style evaluate** pattern inspired by typesafe-ai/jev and There There helpdesk

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables (Optional)

Create a `.env.local` file:

```env
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_key
```

Without this key, the app uses a deterministic mock scorer that still demonstrates all functionality.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/outbound-draft-gate)

Or via CLI:

```bash
npm install -g vercel
vercel
```

## How It Works

### Jev-Style Evaluate Pattern

The scoring system follows the Jev pattern from typesafe-ai/jev:

1. **ONE evaluate call** returns parallel Boolean judgments
2. **Code owns policy** - the model only judges based on criteria we define
3. **Fail open to "hold"** with clear reason if the model call fails

```typescript
interface ScoreResult {
  send_ok: boolean;
  needs_rewrite: boolean;
  hold: boolean;
  confidence: number;
  reasons: string[];
  risk_flags: string[];
  rewrite?: string;
}
```

### Policy Rules (Code-Defined)

- **Send OK**: Professional tone, no unsupported claims, appropriate timing, value-focused
- **Rewrite**: Tone issues, claims need softening, better positioning available
- **Hold**: Compliance risk, pressure tactics, wrong timing, unsubstantiated claims

## Use Cases

### Personal Sales Desk
Individual AE scores drafts before sending from LinkedIn, email, or CRM. Instant feedback loop with no auto-send risk.

### Enterprise Agent Policy
Same gate enforced at org level for AI sales agents and automation workflows. Central policy enforcement with audit trail for compliance.

## Files

- `/app/page.tsx` - Main UI (landing, desk view, enterprise view)
- `/app/api/score/route.ts` - Jev-style evaluate API endpoint
- `/TALK_TRACK.md` - 2-3 minute demo walkthrough script
- `/LINKEDIN_CAPTION.md` - LinkedIn post captions

## Built For

- ANZ / Enterprise AEs at 500+ employee companies
- Sales Directors and Revenue Operations teams
- Anyone who needs confidence before clicking send

## License

MIT

---

**Powered by Vercel AI Gateway · Policy by Jev-style evaluate · You always click send**
