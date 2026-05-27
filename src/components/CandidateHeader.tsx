import React from "react";

interface CandidateHeaderProps {
  currentTab: string;
  onTabChange: (tab: "overview" | "optimizer" | "compliance") => void;
}

export default function CandidateHeader({ currentTab, onTabChange }: CandidateHeaderProps) {
  return (
    <header className="flex flex-col lg:flex-row justify-between items-start border-b border-slate-100 pb-8 gap-6">
      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 uppercase font-display leading-none">
          Pravallika Vutla
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono text-slate-500 uppercase tracking-wider">
          <span>IT Graduate / Analyst</span>
          <span className="text-slate-300">•</span>
          <span>Risk & Fraud Operations Alum</span>
          <span className="text-slate-300">•</span>
          <span>Hyderabad, India</span>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-3 w-full lg:w-auto">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onTabChange("overview")}
            className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest border transition-all ${
              currentTab === "overview"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
            }`}
          >
            01 // Overview
          </button>
          <button
            onClick={() => onTabChange("optimizer")}
            className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest border transition-all ${
              currentTab === "optimizer"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
            }`}
          >
            02 // AI Optimizer [300 Chars]
          </button>
          <button
            onClick={() => onTabChange("compliance")}
            className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest border transition-all ${
              currentTab === "compliance"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
            }`}
          >
            03 // Compliance Sandbox
          </button>
        </div>
        <div className="text-right flex items-center gap-3">
          <p className="text-xs font-mono text-slate-400">REF: WPR-2024-RISK</p>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" title="SLA Stream Active"></span>
        </div>
      </div>
    </header>
  );
}
