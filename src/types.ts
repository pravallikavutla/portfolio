/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppTab = "overview" | "optimizer" | "compliance";

export interface CompressedSummaryResponse {
  original: string;
  compressed: string;
  characterCount: number;
  isCompliant: boolean;
}

export type SummaryTone = "minimalist" | "technical" | "action" | "customized";

export interface FraudCase {
  caseId: string;
  alertType: string;
  slaRemainingSeconds: number;
  customerProfile: {
    name: string;
    segment: string;
    history: string;
  };
  incidentDetails: string;
  auditChecklist: string[];
  correctDecision: "APPROVE" | "HOLD" | "ESCALATE";
}

export interface AuditResult {
  complianceScore: number;
  decisionMatches: boolean;
  strengths: string[];
  omissions: string[];
  reconstructedNote: string;
  executiveFeedback: string;
}

export interface SimulationResult {
  score: number;
  caseId: string;
  alertType: string;
  userDecision: string;
  correctDecision: string;
  isCorrect: boolean;
  timeTaken: number;
}
