import { NextRequest, NextResponse } from 'next/server';

// Jev-style evaluate: ONE call returns parallel Boolean judgments + confidence
// Code owns policy. Model only judges based on criteria we define.
interface ScoreResult {
  decision: 'send_ok' | 'needs_rewrite' | 'hold';
  confidence: number;
  reasons: string[];
  risk_flags: string[];
  rewrite?: string | null;
  send_ok: boolean;
  needs_rewrite: boolean;
  hold: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const { content, type } = await request.json();

    // Check for AI Gateway API key
    const apiKey = process.env.AI_GATEWAY_API_KEY;

    if (apiKey) {
      // Production path: Use Vercel AI Gateway
      return await scoreWithAIGateway(content, type, apiKey);
    } else {
      // Fallback: Deterministic mock scorer for demo
      return NextResponse.json(mockScorer(content, type));
    }
  } catch (error) {
    console.error('Scoring error:', error);
    // Fail open to "hold" with clear reason
    return NextResponse.json({
      decision: 'hold',
      confidence: 1.0,
      reasons: ['Scoring service temporarily unavailable. Please review manually before sending.'],
      risk_flags: ['Service error'],
      send_ok: false,
      needs_rewrite: false,
      hold: true,
      rewrite: null
    });
  }
}

async function scoreWithAIGateway(content: string, type: string, apiKey: string): Promise<NextResponse> {
  try {
    // Call AI Gateway with evaluate-style prompt
    const response = await fetch('https://api.vercel.com/v1/ai/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a sales draft evaluator. Analyze the draft and return ONLY valid JSON (no markdown, no extra text) with this exact structure:

{
  "send_ok": boolean,
  "needs_rewrite": boolean,
  "hold": boolean,
  "confidence": number (0-1),
  "reasons": ["reason1", "reason2"],
  "risk_flags": ["flag1", "flag2"],
  "rewrite": "suggested rewrite text or null"
}

POLICY RULES:
- send_ok: Professional tone, no unsupported claims, appropriate timing, value-focused
- needs_rewrite: Tone issues, claims need softening, better positioning available
- hold: Compliance risk, pressure tactics, wrong timing, unsubstantiated claims

Only ONE of send_ok/needs_rewrite/hold should be true. Set exactly one to true based on severity.`
          },
          {
            role: 'user',
            content: `Draft type: ${type}\n\nContent:\n${content}`
          }
        ],
        temperature: 0.3,
      })
    });

    if (!response.ok) {
      throw new Error(`AI Gateway returned ${response.status}`);
    }

    const data = await response.json();
    const resultText = data.choices[0].message.content.trim();
    
    // Parse JSON response
    let result;
    try {
      // Remove markdown code blocks if present
      const jsonText = resultText.replace(/^```json\s*\n?/g, '').replace(/\n?```$/g, '');
      result = JSON.parse(jsonText);
    } catch (e) {
      throw new Error('Invalid JSON response from model');
    }

    // Determine primary decision
    const decision = result.send_ok ? 'send_ok' : 
                    result.needs_rewrite ? 'needs_rewrite' : 'hold';

    return NextResponse.json({
      ...result,
      decision
    });

  } catch (error) {
    console.error('AI Gateway error:', error);
    // Fail open to hold
    return NextResponse.json({
      decision: 'hold',
      confidence: 1.0,
      reasons: ['AI Gateway temporarily unavailable. Please review manually.'],
      risk_flags: ['Gateway error'],
      send_ok: false,
      needs_rewrite: false,
      hold: true,
      rewrite: null
    });
  }
}

// Deterministic mock scorer - uses pattern matching for demo
function mockScorer(content: string, type: string): ScoreResult {
  const lowerContent = content.toLowerCase();
  const risks: string[] = [];
  const reasons: string[] = [];
  
  // Check for pressure language
  const pressureWords = ['asap', 'immediately', 'urgent', 'crazy not to', 'need your credit card', 'limited time'];
  const hasPressure = pressureWords.some(word => lowerContent.includes(word));
  
  // Check for unsupported claims
  const claimWords = ['best solution', 'literally the best', 'guaranteed', '#1'];
  const hasUnsupportedClaims = claimWords.some(word => lowerContent.includes(word));
  
  // Check for overly casual tone
  const casualWords = ['hey john', 'hey sarah', 'let me know!'];
  const tooCasual = casualWords.some(word => lowerContent.includes(word));
  
  // Check for value-focused language
  const valueWords = ['helped', 'solved', 'reduce', 'improve', 'based on our conversation'];
  const hasValue = valueWords.some(word => lowerContent.includes(word));
  
  // Check for professional closing
  const hasProfessionalClose = lowerContent.includes('best regards') || 
                               lowerContent.includes('thank you') ||
                               lowerContent.includes('looking forward');

  // Determine decision
  if (hasPressure || hasUnsupportedClaims) {
    risks.push(hasPressure ? 'Pressure language detected' : '');
    risks.push(hasUnsupportedClaims ? 'Unsupported claims' : '');
    risks.push('Could damage credibility');
    
    reasons.push('Contains high-pressure sales tactics that may alienate the prospect');
    reasons.push('Unsubstantiated claims without supporting evidence');
    
    const rewrite = content
      .replace(/literally the best/gi, 'a strong')
      .replace(/you'd be crazy not to/gi, 'you might find value in')
      .replace(/ASAP/gi, 'when you have a moment')
      .replace(/just need your credit card/gi, 'can discuss next steps')
      .replace(/Hey John/g, 'Hi John')
      .replace(/Let me know!/g, 'Would you be open to discussing this further?')
      .trim();

    return {
      decision: 'needs_rewrite',
      confidence: 0.92,
      reasons: reasons.filter(Boolean),
      risk_flags: risks.filter(Boolean),
      rewrite: rewrite !== content ? rewrite : null,
      send_ok: false,
      needs_rewrite: true,
      hold: false
    };
  }
  
  if (tooCasual && !hasValue) {
    reasons.push('Tone is too casual for enterprise outreach');
    reasons.push('Missing value proposition or clear next steps');
    
    return {
      decision: 'needs_rewrite',
      confidence: 0.85,
      reasons,
      risk_flags: ['Tone mismatch for enterprise context'],
      rewrite: null,
      send_ok: false,
      needs_rewrite: true,
      hold: false
    };
  }
  
  if (hasValue && hasProfessionalClose) {
    reasons.push('Professional tone maintained throughout');
    reasons.push('Value-focused with clear context from prior conversation');
    reasons.push('Appropriate call-to-action without pressure');
    
    return {
      decision: 'send_ok',
      confidence: 0.94,
      reasons,
      risk_flags: [],
      rewrite: null,
      send_ok: true,
      needs_rewrite: false,
      hold: false
    };
  }
  
  // Default: suggest rewrite for improvement
  reasons.push('Message could be strengthened with more specific value proposition');
  reasons.push('Consider adding context from previous interactions');
  
  return {
    decision: 'needs_rewrite',
    confidence: 0.78,
    reasons,
    risk_flags: [],
    rewrite: null,
    send_ok: false,
    needs_rewrite: true,
    hold: false
  };
}
