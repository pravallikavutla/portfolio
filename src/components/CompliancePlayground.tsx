import React, { useState, useEffect, useRef } from "react";
import { 
  ShieldAlert, ShieldCheck, Play, Send, CheckCircle, Clock, 
  RefreshCw, Award, ListChecks, FileSpreadsheet, Keyboard, AlertCircle, Sparkles, AlertTriangle
} from "lucide-react";
import { FraudCase, AuditResult, SimulationResult } from "../types";

const MOCK_MOCK_CASE: FraudCase = {
  caseId: "WPR-2024-RISK-981",
  alertType: "Suspicious Geo-Velocity & Phone Number Swap",
  slaRemainingSeconds: 60,
  customerProfile: {
    name: "Arjun Mehta",
    segment: "High-Volume Account",
    history: "Clean profile, no flags in last 12 months"
  },
  incidentDetails: "System captured an automatic alert. Initial login recorded in Mumbai, India. Just 14 minutes later, a login was recorded in Lagos, Nigeria. Instantly requested a phone number exchange, immediately followed by an outgoing transfer request of $3,500. AART velocity index flagged. No prior location change reports found.",
  auditChecklist: [
    "Assess geolocational velocity feasibility (Mumbai to Lagos in 14m)",
    "Cross-examine phone update pattern against normal user behavior indices",
    "Inspect previous device reputation markers"
  ],
  correctDecision: "HOLD"
};

export default function CompliancePlayground() {
  const [activeCase, setActiveCase] = useState<FraudCase | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  
  // Investigation states
  const [userNote, setUserNote] = useState("");
  const [userDecision, setUserDecision] = useState<"APPROVE" | "HOLD" | "ESCALATE">("HOLD");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Timer States
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Results log
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [isSlaBreach, setIsSlaBreach] = useState(false);
  const [history, setHistory] = useState<SimulationResult[]>([]);

  // Timer countdown
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      setIsSlaBreach(true);
      setIsTimerActive(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, isTimerActive]);

  // Load active mock case initially or on-demand
  const loadNewCase = async (difficulty: "easy" | "medium" | "hard" = "medium") => {
    setIsLoading(true);
    setAuditResult(null);
    setIsSlaBreach(false);
    setUserNote("");
    setCheckedItems({});
    
    try {
      const response = await fetch(`/api/generate-fraud-case?difficulty=${difficulty}`);
      if (!response.ok) {
        throw new Error("Server-Side Case Generator Unreachable.");
      }
      const data: FraudCase = await response.json();
      setActiveCase(data);
      setTimeLeft(data.slaRemainingSeconds || 60);
      setIsTimerActive(true);
    } catch (err) {
      console.warn("Falling back to local high-fidelity mock case", err);
      setActiveCase(MOCK_MOCK_CASE);
      setTimeLeft(MOCK_MOCK_CASE.slaRemainingSeconds);
      setIsTimerActive(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxToggle = (item: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleInsertTemplate = (templateType: "standard" | "urgent" | "escalate") => {
    const timeNow = new Date().toISOString().substring(11, 16);
    const templates = {
      standard: `[AART-AUDIT] TIMESTAMPS: ${timeNow} UTC // TRIGGER: Rapid Geo-Friction // DECISION: ${userDecision} // DETAILS: Verified location velocities. User logs mismatch standard indices. Recommended hold for review.`,
      urgent: `[AART-ALERT-URGENT] IP MISMATCH AT ${timeNow} // STATUS: SUSPENDED // ACTIONS: Revoked outgoing session token. Intercepted transfer trigger instantly. Initiated internal phone-change challenge.`,
      escalate: `[AART-LEVEL-2] SLA TIMER RUNNING // REASON: Geo anomaly requires tier-2 escalation to secondary check bounds // DEVICE REPUTATION: UNVERIFIED.`
    };
    
    setUserNote(prev => (prev ? prev + "\n" + templates[templateType] : templates[templateType]));
  };

  const submitAudit = async () => {
    if (!activeCase) return;
    
    setIsAuditing(true);
    setIsTimerActive(false);

    try {
      const response = await fetch("/api/audit-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userNote,
          caseDetails: activeCase,
          userDecision
        })
      });

      if (!response.ok) {
        throw new Error("Server audit endpoint returned an error.");
      }

      const result: AuditResult = await response.json();
      setAuditResult(result);

      // Track history
      const runResult: SimulationResult = {
        score: result.complianceScore,
        caseId: activeCase.caseId,
        alertType: activeCase.alertType,
        userDecision,
        correctDecision: activeCase.correctDecision,
        isCorrect: result.decisionMatches,
        timeTaken: activeCase.slaRemainingSeconds - timeLeft
      };

      setHistory(prev => [runResult, ...prev]);
    } catch (err) {
      console.error(err);
      // Fallback local grading if API failures
      const matches = userDecision === activeCase.correctDecision;
      const calculatedScore = matches ? 100 : 40;
      const fallbackResult: AuditResult = {
        complianceScore: calculatedScore,
        decisionMatches: matches,
        strengths: ["Evaluated account flags"],
        omissions: isSlaBreach ? ["Exceeded strict SLA countdown limit"] : [],
        reconstructedNote: `[AART-AUDIT] DECISION: ${userDecision} // ACTION: HOLD // FLAG CHECK PASSED`,
        executiveFeedback: "Completed standard evaluation under fallback operational guidelines."
      };
      setAuditResult(fallbackResult);

      const runResult: SimulationResult = {
        score: calculatedScore,
        caseId: activeCase.caseId,
        alertType: activeCase.alertType,
        userDecision,
        correctDecision: activeCase.correctDecision,
        isCorrect: matches,
        timeTaken: activeCase.slaRemainingSeconds - timeLeft
      };

      setHistory(prev => [runResult, ...prev]);
    } finally {
      setIsAuditing(false);
    }
  };

  // Pre-load a case on mount
  useEffect(() => {
    loadNewCase("medium");
  }, []);

  const averageScore = history.length > 0 
    ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / history.length) 
    : 100;

  return (
    <div className="space-y-8 py-4 font-sans">
      <div className="border-b border-slate-100 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-slate-900 font-display">
            AART & Note Maker Compliance Sandbox
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Simulate a high-volume fraud operations analyst. Audit alerts, complete validation checklists, draft notes, and beat the SLA!
          </p>
        </div>
        
        {/* Quality Metric Badge */}
        <div className="bg-slate-950 text-white p-3 border border-slate-800 flex items-center gap-3">
          <div>
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              Live Quality Compliance
            </div>
            <div className="text-xl font-extrabold font-display text-right">
              {averageScore}%
            </div>
          </div>
          <div className="h-8 w-8 bg-slate-850 rounded-full flex items-center justify-center text-emerald-400">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {!activeCase ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-300 space-y-4">
          <RefreshCw className="w-10 h-10 text-slate-400 animate-spin" />
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">
            Booting Operational Simulator Environment...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: AART Alert Detail Sheet */}
          <div className="lg:col-span-7 flex flex-col justify-between border border-slate-200 p-6 bg-white space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    // Internal Investigation Log
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 uppercase tracking-tight">
                    Case {activeCase.caseId}
                  </h3>
                </div>
                
                {/* Timer Badge */}
                <div className={`px-3 py-1.5 border flex items-center gap-1.5 font-mono text-xs font-bold leading-none ${
                  isSlaBreach ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  SLA: {timeLeft}s {isSlaBreach && "[BREACH]"}
                </div>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/70 p-4 border border-slate-100 text-xs">
                <div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Alert Category</span>
                  <span className="font-semibold text-slate-900 uppercase font-mono">{activeCase.alertType}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Customer Segment</span>
                  <span className="font-semibold text-slate-900 font-sans">{activeCase.customerProfile.name} • {activeCase.customerProfile.segment}</span>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-slate-200/50">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Historical Flags</span>
                  <span className="font-semibold text-slate-700 font-sans">{activeCase.customerProfile.history}</span>
                </div>
              </div>

              {/* Case Triggers */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                  Anomaly Investigation Details
                </span>
                <p className="text-sm text-slate-800 leading-relaxed bg-slate-50/30 p-4 border border-slate-150 rounded-sm">
                  {activeCase.incidentDetails}
                </p>
              </div>

              {/* Interactive AART Checklist */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                    AART Operational Checklist (Inspect Items)
                  </span>
                </div>
                
                <div className="space-y-2">
                  {activeCase.auditChecklist.map((item, idx) => (
                    <label 
                      key={idx} 
                      className="flex items-start gap-3 bg-white hover:bg-slate-50 border border-slate-150 p-3 rounded-sm cursor-pointer select-none transition-all"
                    >
                      <input 
                        type="checkbox" 
                        checked={!!checkedItems[item]} 
                        onChange={() => handleCheckboxToggle(item)}
                        className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900" 
                      />
                      <span className="text-xs text-slate-600 leading-normal">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Change Case / Load new cases buttons */}
            <div className="flex items-center gap-2 pt-6 border-t border-slate-100">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-2">Difficulty:</span>
              <button 
                onClick={() => loadNewCase("easy")}
                className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors border border-slate-200 rounded-sm"
              >
                Easy
              </button>
              <button 
                onClick={() => loadNewCase("medium")}
                className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-300 rounded-sm"
              >
                Medium
              </button>
              <button 
                onClick={() => loadNewCase("hard")}
                className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-slate-150 transition-colors border border-slate-200 rounded-sm"
              >
                Hard Case
              </button>
            </div>
          </div>

          {/* Right Panel: Note Maker and Audit Results Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Note Maker Workspace */}
            <div className="border border-slate-200 p-6 bg-white flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900">
                    <Keyboard className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                      Note Maker Terminal
                    </span>
                  </div>
                  <span className="bg-slate-100 text-[10px] font-mono text-slate-500 px-2 py-0.5 font-bold uppercase">
                    v2.4 Live
                  </span>
                </div>

                {/* Templates Insertion Panel */}
                <div className="flex flex-wrap gap-1">
                  <button 
                    onClick={() => handleInsertTemplate("standard")}
                    className="text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-all rounded-sm cursor-pointer"
                  >
                    + Standard Core Info
                  </button>
                  <button 
                    onClick={() => handleInsertTemplate("urgent")}
                    className="text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-100 transition-all rounded-sm cursor-pointer"
                  >
                    + Rapid Action Flag
                  </button>
                  <button 
                    onClick={() => handleInsertTemplate("escalate")}
                    className="text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-1 bg-slate-55 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all rounded-sm cursor-pointer"
                  >
                    + L2 Escalation
                  </button>
                </div>

                <textarea
                  className="w-full h-32 bg-slate-50/50 p-3 text-xs font-mono text-slate-800 border border-slate-200 focus:outline-none focus:border-slate-900 focus:bg-white transition-all rounded-sm resize-none"
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="Draft your evaluation rationale here using Note Maker markers... Ensure to specify findings and why you're approving, escalatng or routing a transaction, keeping 100% SLA in mind."
                />

                {/* Risk Disposition Strategy */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                    Select Risk Disposition Decision
                  </span>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setUserDecision("APPROVE")}
                      className={`h-9 font-mono text-[10px] font-bold uppercase border tracking-wider transition-all cursor-pointer ${
                        userDecision === "APPROVE"
                          ? "bg-slate-900 border-slate-900 text-white"
                          : "bg-white border-slate-200 hover:border-slate-400 text-slate-650"
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setUserDecision("HOLD")}
                      className={`h-9 font-mono text-[10px] font-bold uppercase border tracking-wider transition-all cursor-pointer ${
                        userDecision === "HOLD"
                          ? "bg-slate-900 border-slate-900 text-white"
                          : "bg-white border-slate-200 hover:border-slate-400 text-slate-650"
                      }`}
                    >
                      Hold / Block
                    </button>
                    <button
                      onClick={() => setUserDecision("ESCALATE")}
                      className={`h-9 font-mono text-[10px] font-bold uppercase border tracking-wider transition-all cursor-pointer ${
                        userDecision === "ESCALATE"
                          ? "bg-slate-900 border-slate-900 text-white"
                          : "bg-white border-slate-200 hover:border-slate-400 text-slate-650"
                      }`}
                    >
                      Escalate L2
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={submitAudit}
                disabled={isAuditing || isLoading}
                className="w-full h-11 bg-slate-950 hover:bg-slate-905 text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isAuditing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Performing QA Review...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Dispatch Audit & Note Maker QA
                  </>
                )}
              </button>
            </div>

            {/* Audit Results Overlay Card */}
            {auditResult && (
              <div className="border border-slate-250 p-6 bg-slate-950 text-white space-y-5">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div className="space-y-0.5">
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                      QA Officer Report Card
                    </div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                      Audit Performance
                    </h4>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Compliance score block */}
                    <div className="text-right">
                      <div className="text-xs font-mono text-slate-500">Quality Score</div>
                      <div className={`text-2xl font-extrabold font-display ${
                        auditResult.complianceScore >= 90 ? "text-emerald-400" : "text-amber-400"
                      }`}>
                        {auditResult.complianceScore}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score indicators */}
                <div className="space-y-4 text-xs">
                  {/* Executive Feedback */}
                  <div className="bg-slate-900 p-3 border border-slate-800 space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Operational Evaluation</span>
                    <p className="text-slate-300 leading-normal font-sans italic">{auditResult.executiveFeedback}</p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest font-bold">✓ Strengths / Key Cues</span>
                      {auditResult.strengths.length > 0 ? (
                        <ul className="space-y-1 list-disc pl-3 text-slate-400">
                          {auditResult.strengths.map((str, i) => (
                            <li key={i}>{str}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-400 italic">None logged.</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-rose-400 uppercase tracking-widest font-bold">✗ Omissions / SLA Breaches</span>
                      {auditResult.omissions.length > 0 ? (
                        <ul className="space-y-1 list-disc pl-3 text-slate-400">
                          {auditResult.omissions.map((om, i) => (
                            <li key={i}>{om}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-amber-400 italic flex items-center gap-1">None! 100% Quality.</p>
                      )}
                    </div>
                  </div>

                  {/* Perfectly reconstructed standard Note Maker notation */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">Reconstructed Note Maker Standard Code</span>
                    <div className="bg-slate-900 border border-slate-800 p-2 font-mono text-[10px] text-emerald-300 select-all" title="Click to copy standard syntax">
                      {auditResult.reconstructedNote}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Internal Compliance Evaluation Audit History Table */}
      {history.length > 0 && (
        <section className="border border-slate-200 p-6 bg-white space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              // LOGGED SLA PERFORMANCE HISTORY
            </h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              {history.length} Cases Handled
            </span>
          </div>

          <div className="overflow-x-auto text-xs w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] uppercase font-mono tracking-wider text-slate-400 bg-slate-50/50">
                  <th className="py-2.5 px-3">Case ID</th>
                  <th className="py-2.5 px-3">Alert Trigger Name</th>
                  <th className="py-2.5 px-3">User disposition</th>
                  <th className="py-2.5 px-3">Actual Correct</th>
                  <th className="py-2.5 px-3">Speed (SLA)</th>
                  <th className="py-2.5 px-3 text-right">Compliance Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((h, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{h.caseId}</td>
                    <td className="py-3 px-3 text-slate-600 font-sans">{h.alertType}</td>
                    <td className="py-3 px-3 uppercase font-mono">{h.userDecision}</td>
                    <td className="py-3 px-3 uppercase font-mono">{h.correctDecision}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">{h.timeTaken}s elapsed</td>
                    <td className="py-3 px-3 font-bold text-right">
                      <span className={`px-2 py-0.5 font-mono ${
                        h.score >= 90 ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"
                      }`}>
                        {h.score}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
