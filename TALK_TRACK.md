# Draft Gate - Talk Track

**Live Demo URL:** https://outbound-draft-gate.vercel.app

---

## 2-3 Minute Walkthrough Script

### Opening (15 seconds)

"Let me show you something we built for enterprise sales teams. If you're an AE or sales director at a 500+ person company, this pain is probably familiar."

### The Pain (30 seconds)

"Every day you're writing LinkedIn connection notes, follow-up emails after discovery calls, thank-you messages. You're juggling CRM updates, coordinating with your team, tracking multiple deals.

The problem isn't that you can't write. The problem is knowing whether you *should* send what you just wrote.

Wrong tone? You've damaged a relationship. Wrong claim? You've lost credibility. Wrong timing? You're in the spam folder. And by the time you realize it, the message is already out there."

### The Solution (45 seconds)

"This is Draft Gate. Every outbound message gets scored before it leaves your desk.

[Navigate to app, click 'Open Draft Gate']

Here's my desk with three sample drafts. Let's look at this LinkedIn connection request first. Seems reasonable—talking about helping similar companies, asking to connect.

[Click 'Score Draft']

Within seconds, we get back a decision: Send, Rewrite, or Hold—with specific reasons. This one comes back as 'Send OK' with 94% confidence. Professional tone, value-focused, no pressure language.

Now let's try this email follow-up.

[Select draft #2, click 'Score Draft']

Hold on—look at this one. 'Needs Rewrite' with high confidence. Why? It's got pressure language: 'literally the best,' 'you'd be crazy not to,' 'need your credit card ASAP.' Those are credibility killers.

But here's the key: it suggests a rewrite. Watch.

[Click 'Apply Rewrite']

Same core message, but the pressure is gone. Claims are softened. Tone is professional. This is what we actually want to send.

[Click 'Score Draft' again on rewritten version]

There—now it passes. 'Send OK.' I can copy this and send it from LinkedIn or email whenever I'm ready."

### The Value (20 seconds)

"Nothing auto-sends. You always click send from your actual platform. But now you know it's been checked against your company's policy before it goes out.

And this isn't just for individual AEs—click over to Enterprise View.

[Switch to Enterprise tab]

Same gate, but enforced at the org level. When you're running AI agents or automation workflows, this becomes your tool-approval layer. Every draft gets scored the same way before any agent can take action."

### Closing (10 seconds)

"That's Draft Gate. Score before you send. Catch the issues while they're still drafts. Built on Vercel AI Gateway with policy you control in code.

Questions?"

---

## Key Points to Emphasize

1. **Pain-first:** The risk isn't writing—it's sending the wrong message
2. **Draft-only:** Nothing auto-sends; human always clicks send
3. **Immediate value:** Catch tone, claims, and timing issues before they go out
4. **Enterprise scale:** Personal desk → org-wide policy enforcement
5. **Code-defined policy:** Your rules, not arbitrary AI decisions

## Common Questions

**Q: Does this integrate with Salesforce/HubSpot/LinkedIn?**  
A: This demo is draft-only—you copy and send from your existing tools. Production version can integrate with your CRM and communication platforms as a pre-send gate.

**Q: What if the scoring is wrong?**  
A: You always have final say. The gate gives you a second opinion, but you click send. Think of it like Grammarly for sales risk.

**Q: Can we customize the policy rules?**  
A: Yes—the policy is defined in code. You control what gets flagged as Send/Rewrite/Hold based on your company's guidelines and compliance requirements.

**Q: Does this work for other languages?**  
A: The demo is English-focused, but the AI Gateway pattern supports any language your model handles.
