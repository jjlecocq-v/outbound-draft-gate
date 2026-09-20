'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [showDesk, setShowDesk] = useState(false);

  if (showDesk) {
    return <DeskView onBack={() => setShowDesk(false)} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">DG</span>
            </div>
            <span className="font-semibold text-lg">Draft Gate</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="#" className="text-sm text-gray-600 hover:text-black">About</Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-black">Enterprise</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl text-center">
          <h1 className="text-6xl font-bold tracking-tight mb-6">
            Stop guessing what to send.
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            Every LinkedIn note, email follow-up, and CRM message scored before it leaves your desk. 
            Wrong tone, wrong claim, wrong timing—caught before you click send.
          </p>
          <button
            onClick={() => setShowDesk(true)}
            className="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Open Draft Gate
          </button>
          
          <div className="mt-16 pt-16 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Built for enterprise sales teams at 500+ employee companies</p>
            <div className="flex items-center justify-center gap-8 text-xs text-gray-400">
              <span>• ANZ / Enterprise AEs</span>
              <span>• Sales Directors</span>
              <span>• Revenue Operations</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>Powered by</span>
          <span className="font-semibold text-black">Vercel AI Gateway</span>
          <span>·</span>
          <span>Policy by Jev-style evaluate</span>
          <span>·</span>
          <span className="font-medium">You always click send</span>
        </div>
      </footer>
    </div>
  );
}

function DeskView({ onBack }: { onBack: () => void }) {
  const [selectedDraft, setSelectedDraft] = useState(0);
  const [drafts, setDrafts] = useState([
    {
      id: 1,
      type: 'LinkedIn',
      title: 'Connection request to VP Engineering',
      content: "Hi Sarah! I noticed you recently joined as VP Engineering at DataCorp. We've helped similar companies reduce their infrastructure costs by 40% while improving reliability. Would love to connect and share what we're seeing in the market.",
      scored: false,
      score: null as any
    },
    {
      id: 2,
      type: 'Email',
      title: 'Follow-up after discovery call',
      content: "Hey John,\n\nGreat talking yesterday! Our platform is literally the best solution out there and you'd be crazy not to buy it ASAP. We can have you up and running next week - just need your credit card.\n\nLet me know!\nMike",
      scored: false,
      score: null as any
    },
    {
      id: 3,
      type: 'Email',
      title: 'Meeting thank you note',
      content: "Hi Jennifer,\n\nThank you for taking the time to meet with our team yesterday. Based on our conversation, it sounds like the data governance challenges you mentioned align well with what we've solved for similar enterprise teams.\n\nI've attached the case study we discussed. Would next Thursday at 2pm work for a quick follow-up to answer any questions?\n\nBest regards,\nAlex",
      scored: false,
      score: null as any
    }
  ]);
  const [isScoring, setIsScoring] = useState(false);
  const [activeTab, setActiveTab] = useState<'desk' | 'enterprise'>('desk');

  const currentDraft = drafts[selectedDraft];

  const handleScore = async () => {
    setIsScoring(true);
    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: currentDraft.content, type: currentDraft.type })
      });
      const result = await response.json();
      
      const updatedDrafts = [...drafts];
      updatedDrafts[selectedDraft] = {
        ...updatedDrafts[selectedDraft],
        scored: true,
        score: result
      };
      setDrafts(updatedDrafts);
    } catch (error) {
      console.error('Scoring failed:', error);
    } finally {
      setIsScoring(false);
    }
  };

  const handleApplyRewrite = () => {
    if (currentDraft.score?.rewrite) {
      const updatedDrafts = [...drafts];
      updatedDrafts[selectedDraft] = {
        ...updatedDrafts[selectedDraft],
        content: currentDraft.score.rewrite,
        scored: false,
        score: null
      };
      setDrafts(updatedDrafts);
    }
  };

  const handleSend = () => {
    alert('✓ Ready to send!\n\nYour draft has passed the gate. Copy this message and send it from LinkedIn/Email/CRM when you\'re ready.\n\nDraft Gate never auto-sends — you always click send.');
  };

  const handleEditContent = (newContent: string) => {
    const updatedDrafts = [...drafts];
    updatedDrafts[selectedDraft] = {
      ...updatedDrafts[selectedDraft],
      content: newContent,
      scored: false,
      score: null
    };
    setDrafts(updatedDrafts);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="text-gray-600 hover:text-black"
            >
              ← Back
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">DG</span>
              </div>
              <span className="font-semibold text-lg">Draft Gate</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('desk')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  activeTab === 'desk' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                My Desk
              </button>
              <button
                onClick={() => setActiveTab('enterprise')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  activeTab === 'enterprise' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                Enterprise View
              </button>
            </div>
          </div>
        </div>
      </header>

      {activeTab === 'desk' ? (
        <main className="flex-1 flex">
          {/* Draft List Sidebar */}
          <aside className="w-80 border-r border-gray-200 bg-gray-50 p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-4 px-2">Drafts</h2>
            <div className="space-y-2">
              {drafts.map((draft, idx) => (
                <button
                  key={draft.id}
                  onClick={() => setSelectedDraft(idx)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedDraft === idx
                      ? 'bg-white border-2 border-black'
                      : 'bg-white border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500">{draft.type}</span>
                    {draft.scored && draft.score && (
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        draft.score.decision === 'send_ok' ? 'bg-green-100 text-green-700' :
                        draft.score.decision === 'needs_rewrite' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {draft.score.decision === 'send_ok' ? 'SEND' :
                         draft.score.decision === 'needs_rewrite' ? 'REWRITE' : 'HOLD'}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{draft.title}</p>
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex">
            {/* Draft Editor */}
            <div className="flex-1 p-8">
              <div className="max-w-3xl">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">{currentDraft.title}</h1>
                    <span className="text-sm text-gray-500">{currentDraft.type}</span>
                  </div>
                </div>

                <textarea
                  value={currentDraft.content}
                  onChange={(e) => handleEditContent(e.target.value)}
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none font-sans text-base"
                  placeholder="Write your message..."
                />

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleScore}
                    disabled={isScoring}
                    className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors disabled:opacity-50"
                  >
                    {isScoring ? 'Scoring...' : 'Score Draft'}
                  </button>
                  {currentDraft.scored && currentDraft.score?.decision === 'send_ok' && (
                    <button
                      onClick={handleSend}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Ready to Send (you click)
                    </button>
                  )}
                  {currentDraft.scored && currentDraft.score?.rewrite && (
                    <button
                      onClick={handleApplyRewrite}
                      className="border border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-medium hover:border-black transition-colors"
                    >
                      Apply Rewrite
                    </button>
                  )}
                  {currentDraft.scored && (
                    <button
                      onClick={() => navigator.clipboard.writeText(currentDraft.content)}
                      className="border border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-medium hover:border-black transition-colors"
                    >
                      Copy
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Score Panel */}
            {currentDraft.scored && currentDraft.score && (
              <aside className="w-96 border-l border-gray-200 bg-gray-50 p-6 overflow-y-auto">
                <h2 className="text-lg font-bold mb-6">Draft Score</h2>
                
                {/* Decision */}
                <div className="mb-6">
                  <div className={`p-4 rounded-lg ${
                    currentDraft.score.decision === 'send_ok' ? 'bg-green-100' :
                    currentDraft.score.decision === 'needs_rewrite' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-lg">
                        {currentDraft.score.decision === 'send_ok' ? '✓ SEND' :
                         currentDraft.score.decision === 'needs_rewrite' ? '⚠ REWRITE' :
                         '✋ HOLD'}
                      </span>
                      <span className="text-sm font-semibold">
                        {Math.round(currentDraft.score.confidence * 100)}% confident
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reasons */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Analysis</h3>
                  <div className="space-y-3">
                    {currentDraft.score.reasons.map((reason: string, idx: number) => (
                      <div key={idx} className="p-3 bg-white rounded border border-gray-200">
                        <p className="text-sm text-gray-700">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Flags */}
                {currentDraft.score.risk_flags && currentDraft.score.risk_flags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Risk Flags</h3>
                    <div className="space-y-2">
                      {currentDraft.score.risk_flags.map((flag: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-red-700">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          <span>{flag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Rewrite */}
                {currentDraft.score.rewrite && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Suggested Rewrite</h3>
                    <div className="p-4 bg-white rounded border border-gray-200">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{currentDraft.score.rewrite}</p>
                    </div>
                  </div>
                )}
              </aside>
            )}
          </div>
        </main>
      ) : (
        <EnterpriseView />
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>Powered by</span>
          <span className="font-semibold text-black">Vercel AI Gateway</span>
          <span>·</span>
          <span>Policy by Jev-style evaluate</span>
          <span>·</span>
          <span className="font-medium">You always click send</span>
        </div>
      </footer>
    </div>
  );
}

function EnterpriseView() {
  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Enterprise Policy Gate</h1>
          <p className="text-gray-600">Same draft gate, enforced as agent tool-approval policy for your entire sales org</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-lg mb-3">Personal Sales Desk</h3>
            <p className="text-sm text-gray-600 mb-4">Individual AE scores drafts before sending from LinkedIn, email, or CRM</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Human always clicks send</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Instant feedback loop</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>No auto-send risk</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-lg mb-3">Enterprise Agent Policy</h3>
            <p className="text-sm text-gray-600 mb-4">Same gate enforced at org level for AI sales agents and automation workflows</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Central policy enforcement</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Agent tool-approval workflow</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Audit trail for compliance</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-6">Policy Rules (Code-Defined)</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2 text-green-700">✓ Send OK when:</h4>
              <ul className="space-y-1 text-sm text-gray-700 ml-4">
                <li>• Professional tone maintained</li>
                <li>• No unsupported claims or pressure language</li>
                <li>• Appropriate timing and context</li>
                <li>• Value-focused, not product-pushy</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-yellow-700">⚠ Rewrite when:</h4>
              <ul className="space-y-1 text-sm text-gray-700 ml-4">
                <li>• Tone too casual or aggressive</li>
                <li>• Claims need softening or evidence</li>
                <li>• Better positioning available</li>
                <li>• Minor timing concerns</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-red-700">✋ Hold when:</h4>
              <ul className="space-y-1 text-sm text-gray-700 ml-4">
                <li>• Compliance risk detected</li>
                <li>• Hard pressure tactics or manipulation</li>
                <li>• Wrong timing (too soon after last contact)</li>
                <li>• Unsubstantiated claims that could damage credibility</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 italic">
              <strong>Draft-only mode:</strong> This demo never posts to external systems. 
              Production deployment enforces the same gate as tool-approval for autonomous agents, 
              with human-in-the-loop for final send.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
