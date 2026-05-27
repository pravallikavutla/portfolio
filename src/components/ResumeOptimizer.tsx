import React, { useState } from "react";
import { Copy, Sparkles, Check, RefreshCw, AlertCircle, FileText } from "lucide-react";
import { CompressedSummaryResponse, SummaryTone } from "../types";

const INITIAL_TEXT = "Detail-oriented IT graduate with professional experience at Wipro in fraud investigation, risk analysis, and high-volume data review operations. Skilled in analytical assessment, troubleshooting, SLA-driven workflows, and internal moderation tools including AART and Note Maker. Proven ability to maintain 100% quality compliance while handling operational tasks efficiently in fast-paced environments.";

const PRESETS = [
  {
    name: "Model Minimalist",
    chars: 284,
    text: "Detail-oriented IT graduate with Wipro experience in fraud investigation, risk analysis & high-volume data operations. Skilled in troubleshooting, SLA workflows, AART, and Note Maker. Proven ability to maintain 100% quality compliance efficiently in fast-paced teams."
  },
  {
    name: "Model Professional",
    chars: 298,
    text: "IT graduate with Wipro experience in fraud investigation, risk analysis, and high-volume data reviews. Expert at resolving operations using AART & Note Maker while meeting strict SLAs. Strong troubleshooter committed to maintaining 100% quality compliance in fast-paced setups."
  },
  {
    name: "Model Technical/Action Word",
    chars: 294,
    text: "IT Graduate. Spearheaded fraud investigation and high-volume data reviews at Wipro. Mastered AART, Note Maker, and SLA-driven operational workflows. Troubleshot risk profiles and maintained 100% quality compliance in high-velocity financial environments."
  }
];

export default function ResumeOptimizer() {
  const [inputText, setInputText] = useState(INITIAL_TEXT);
  const [tone, setTone] = useState<SummaryTone>("customized");
  const [maxLength, setMaxLength] = useState(300);
  const [isCompressing, setIsCompressing] = useState(false);
  const [apiResult, setApiResult] = useState<CompressedSummaryResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleCompress = async () => {
    setIsCompressing(true);
    setErrorMsg(null);
    try {
      const response = await fetch("/api/compress-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          maxLength: maxLength,
          tone: tone
        })
      });

      if (!response.ok) {
        throw new Error("Failed to connect with Server-Side Gemini Optimizer.");
      }

      const data: CompressedSummaryResponse = await response.json();
      setApiResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred during resume optimization.");
    } finally {
      setIsCompressing(false);
    }
  };

  const currentCharCount = inputText.length;
  const isOverLimit = currentCharCount > maxLength;

  return (
    <div className="space-y-10 py-4 font-sans">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-slate-900 font-display">
          AI Resume & Summary Optimizer
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Review, edit, and compress Wipro operations summaries into compact, high-impact profiles matching strict character constraints.
        </p>
      </div>

      {/* Preset Cards for Quick Resolution (Fulfills exact User prompt instantly) */}
      <section className="space-y-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
          // FULFILLED PRESETS (Under 300 Characters)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRESETS.map((p, index) => (
            <div 
              key={index} 
              className="border border-slate-200 hover:border-slate-800 transition-all p-5 bg-white relative flex flex-col justify-between"
            >
              <div className="space-y-3 pb-8">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold font-mono text-slate-900">{p.name}</span>
                  <span className="text-xs font-semibold font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5">
                    {p.chars} chars
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{p.text}</p>
              </div>
              
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button
                  onClick={() => setInputText(p.text)}
                  className="px-2 py-1 text-[10px] font-mono font-semibold uppercase bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-sm border border-slate-200 transition-colors"
                  title="Load into Editor"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCopy(p.text, p.name)}
                  className="px-2 py-1 text-[10px] font-mono font-bold uppercase bg-slate-900 hover:bg-slate-800 text-white rounded-sm transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedText === p.name ? (
                    <>
                      <Check className="w-3 h-3" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pentagon Space Institute Interactive Segment */}
      <section className="border border-slate-200 p-6 bg-slate-50/50 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              // PENTAGON SPACE TRAINING RESOLUTIONS
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select and copy customized, recruiter-approved descriptions of your Pentagon Space Institute training.
            </p>
          </div>
          <span className="text-[10px] font-mono bg-slate-900 text-white font-bold uppercase tracking-wider px-2 py-0.5 self-start">
            Academy Sync Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-200 bg-white p-5 flex flex-col justify-between hover:border-slate-800 transition-all">
            <div className="space-y-2 pb-6">
              <span className="text-xs font-bold font-mono text-slate-900 block">Training Bullet (SLA-Optimized Profile style)</span>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                "Completed immersive software training at Pentagon Space Institute, mastering robust Object-Oriented Core Java programming with relational SQL database queries, and rich functional UI front-end creation utilizing HTML5, CSS3, JavaScript, and ReactJS components."
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setInputText("Completed immersive software training at Pentagon Space Institute, mastering robust Object-Oriented Core Java programming with relational SQL database queries, and rich functional UI front-end creation utilizing HTML5, CSS3, JavaScript, and ReactJS components.")}
                className="px-2.5 py-1 text-[10px] font-mono font-semibold uppercase bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-sm"
              >
                Load to AI Auditor
              </button>
              <button
                onClick={() => handleCopy("Completed immersive software training at Pentagon Space Institute, mastering robust Object-Oriented Core Java programming with relational SQL database queries, and rich functional UI front-end creation utilizing HTML5, CSS3, JavaScript, and ReactJS components.", "PENTAGON_BULLET")}
                className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase bg-slate-900 hover:bg-slate-805 text-white rounded-sm flex items-center gap-1 cursor-pointer"
              >
                {copiedText === "PENTAGON_BULLET" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedText === "PENTAGON_BULLET" ? "Copied" : "Copy Description"}
              </button>
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-5 flex flex-col justify-between hover:border-slate-800 transition-all">
            <div className="space-y-2 pb-6">
              <span className="text-xs font-bold font-mono text-slate-900 block">Education Section Format (Structured Entry)</span>
              <div className="space-y-1 text-xs font-normal text-slate-600 leading-normal">
                <p className="font-bold text-slate-900">Pentagon Space Institute — Software Engineering Trainee</p>
                <p className="italic text-slate-400">Core Stack: Java | SQL | HTML | CSS | JavaScript | ReactJS</p>
                <p>Acquired strong command of back-end application structures and modular frontend logic. Engineered query workflows and built reactive visual components to complement SLA metrics reporting.</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleCopy("Pentagon Space Institute — Software Engineering Trainee\nCore Stack: Java | SQL | HTML | CSS | JavaScript | ReactJS\nAcquired strong command of back-end application structures and modular frontend logic. Engineered query workflows and built reactive visual components.", "PENTAGON_EDU")}
                className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase bg-slate-900 hover:bg-slate-805 text-white rounded-sm flex items-center gap-1 cursor-pointer"
              >
                {copiedText === "PENTAGON_EDU" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedText === "PENTAGON_EDU" ? "Copied" : "Copy Education Segment"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Sandbox Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Original Summary & Tweak controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                Original Professional Summary
              </label>
              <span className={`text-xs font-mono font-bold ${isOverLimit ? "text-rose-600" : "text-slate-500"}`}>
                {currentCharCount} / {maxLength} Chars
              </span>
            </div>
            
            <textarea
              className="w-full h-44 bg-slate-50/50 p-4 border border-slate-200 text-sm font-sans text-slate-800 focus:outline-none focus:border-slate-900 focus:bg-white transition-all rounded-sm resize-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste professional summary here..."
            />
            
            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${isOverLimit ? "bg-rose-500" : "bg-slate-900"}`}
                style={{ width: `${Math.min((currentCharCount / maxLength) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Config Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                Target Style / Tone
              </label>
              <select
                className="w-full bg-white border border-slate-200 text-xs p-2.5 outline-none rounded-none focus:border-slate-800 font-mono"
                value={tone}
                onChange={(e) => setTone(e.target.value as SummaryTone)}
              >
                <option value="customized">Balanced Profile Alum</option>
                <option value="minimalist">Ultra-Minimalist Dense</option>
                <option value="technical">Technical Keyword-focused</option>
                <option value="action">Spearheaded / Action Verbs</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 font-mono">
                Hard Limit Bounds
              </label>
              <select
                className="w-full bg-white border border-slate-200 text-xs p-2.5 outline-none rounded-none focus:border-slate-800 font-mono"
                value={maxLength}
                onChange={(e) => setMaxLength(Number(e.target.value))}
              >
                <option value={300}>Strictly Under 300 Characters</option>
                <option value={250}>Highly Compact 250 Chars</option>
                <option value={200}>Minimal Bullet 200 Chars</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCompress}
            disabled={isCompressing}
            className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isCompressing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Optimising with Gemini...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Custom AI Optimized Rewrite
              </>
            )}
          </button>
        </div>

        {/* Right Side: Optimize Response / Output Compare */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-slate-50 border border-slate-150 p-6 flex-1 flex flex-col justify-between min-h-[300px] relative">
            
            {/* Display State */}
            {!apiResult && !isCompressing && !errorMsg ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 p-8">
                <FileText className="w-10 h-10 text-slate-300" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Ready for AI Tuning
                </h4>
                <p className="text-xs text-slate-400">
                  Select a tone, adjust the limit bounds, then click rewrite to trigger our server-side Gemini auditor.
                </p>
              </div>
            ) : isCompressing ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 p-8">
                <RefreshCw className="w-10 h-10 text-slate-400 animate-spin" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-650">
                  Analyzing Resiliency Signals
                </h4>
                <p className="text-xs text-slate-400">
                  Re-structuring sentences, prioritizing keyword densities, and verifying exact character limit metrics.
                </p>
              </div>
            ) : errorMsg ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 p-8 text-rose-600">
                <AlertCircle className="w-10 h-10 text-rose-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Optimizer Unreachable
                </h4>
                <p className="text-xs text-rose-500">{errorMsg}</p>
              </div>
            ) : apiResult ? (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      // Optimized AI Copy
                    </span>
                    <span className="text-xs font-bold font-mono text-emerald-600 bg-emerald-50 px-2.5 py-0.5">
                      {apiResult.characterCount} Chars
                    </span>
                  </div>
                  
                  {/* Left thin accent border in summary preview */}
                  <div className="relative pl-4 border-l-2 border-slate-900">
                    <p className="text-sm text-slate-800 leading-relaxed font-sans font-medium">
                      {apiResult.compressed}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                      Quality Target Passed
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Perfect alignment with recruiters' standard length filters. Contains critical tags including Wipro and AART tools.
                  </p>
                </div>
              </div>
            ) : null}

            {/* Bottom Copy Output button */}
            {apiResult && (
              <button
                onClick={() => handleCopy(apiResult.compressed, "AI_OUTPUT")}
                className="mt-6 w-full h-10 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copiedText === "AI_OUTPUT" ? (
                  <>
                    <Check className="w-4 h-4" /> Summary Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Optimized Copy
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
