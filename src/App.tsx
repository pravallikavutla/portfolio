/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { AppTab } from "./types";
import CandidateHeader from "./components/CandidateHeader";
import PortfolioOverview from "./components/PortfolioOverview";
import ResumeOptimizer from "./components/ResumeOptimizer";
import CompliancePlayground from "./components/CompliancePlayground";

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>("overview");

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-0 md:p-8 overflow-x-hidden font-sans">
      
      {/* Centered minimalist container representing the rigid 1024px grid but fully responsive */}
      <div className="w-full max-w-[1080px] bg-white text-slate-900 border-8 border-slate-50 relative p-6 md:p-14 flex flex-col justify-between overflow-hidden shadow-2xl relative min-h-[768px]">
        
        <div className="space-y-10 z-10">
          {/* Header Section */}
          <CandidateHeader 
            currentTab={currentTab} 
            onTabChange={(tab) => setCurrentTab(tab)} 
          />

          {/* Dynamic Content Views */}
          <div className="transition-all duration-300">
            {currentTab === "overview" && (
              <PortfolioOverview onTabChange={(tab) => setCurrentTab(tab)} />
            )}
            
            {currentTab === "optimizer" && (
              <ResumeOptimizer />
            )}
            
            {currentTab === "compliance" && (
              <CompliancePlayground />
            )}
          </div>
        </div>

        {/* Floating Decorative Circle - exact match to mockup design specifications */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-50 -mr-32 -mb-32 rounded-full z-0 pointer-events-none select-none opacity-60"></div>
      </div>
    </div>
  );
}
