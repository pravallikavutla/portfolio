import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Gemini API client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Compress Professional Summary
  app.post("/api/compress-summary", async (req, res) => {
    try {
      const { text, maxLength = 300, tone = "customized" } = req.body;

      if (!text) {
        return res.status(400).json({ error: "Text is required for compression." });
      }

      const tonePrompts: Record<string, string> = {
        minimalist: "Make it extremely compact, punchy, and modern. Prioritize maximum content density in minimal words.",
        technical: "Highlight specific tools like AART, Note Maker, workflows, and database keywords. Sound like a precise operational system.",
        action: "Start with high-impact action verbs (e.g., Spearheaded, Secured, Investigated) and focus on measurable outcomes like 100% compliance.",
        customized: "A balanced, professional summary showcasing IT degree and fraud investigation operations at Wipro."
      };

      const systemInstruction = `You are a professional resume copywriter and career counselor.
Your task is to rewrite and compress the candidate's professional Wipro summary.
You MUST ensure the output is STRICTLY under ${maxLength} characters (including spaces and punctuation).
Current requested style/tone: ${tonePrompts[tone] || tonePrompts.customized}.

CRITICAL RULES:
1. Do NOT include any preamble, wrapper quotes, intro ("Here is your summary:") or markdown formatting. Only output the plain text of the rewritten summary itself.
2. The final character length must be absolutely less than ${maxLength} characters.
3. Keep highly vital keywords if possible: "Wipro", "fraud investigation", "SLA", "AART", "Note Maker", and "100% compliance".`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Original professional summary: "${text}"`,
        config: {
          systemInstruction,
          temperature: 0.2
        }
      });

      const compressedText = (response.text || "").trim();
      const charCount = compressedText.length;

      res.json({
        original: text,
        compressed: compressedText,
        characterCount: charCount,
        isCompliant: charCount <= maxLength
      });
    } catch (error: any) {
      console.error("Error in /api/compress-summary:", error);
      res.status(500).json({ error: error.message || "Failed to compress summary." });
    }
  });

  // API Route: Generate Fraud Case Alerts for Playground
  app.get("/api/generate-fraud-case", async (req, res) => {
    try {
      const difficulty = req.query.difficulty || "medium";
      
      const systemInstruction = `You are an internal Wipro risk management tool simulating incoming customer transaction alerts for training fraud investigators.
Generate a realistic fraud scenario involving digital financial transaction risk assessments. Use structured JSON output.

The JSON MUST match the following TypeScript schema:
{
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
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Generate one realistic fraud risk case scenario suitable for a high-volume investigator at Wipro. Difficulty level: ${difficulty}. Include realistic data flags using tools like AART rules.`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              caseId: { type: Type.STRING },
              alertType: { type: Type.STRING },
              slaRemainingSeconds: { type: Type.INTEGER },
              customerProfile: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  segment: { type: Type.STRING },
                  history: { type: Type.STRING }
                },
                required: ["name", "segment", "history"]
              },
              incidentDetails: { type: Type.STRING },
              auditChecklist: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctDecision: { 
                type: Type.STRING,
                description: "Must be exactly APPROVE, HOLD, or ESCALATE" 
              }
            },
            required: ["caseId", "alertType", "slaRemainingSeconds", "customerProfile", "incidentDetails", "auditChecklist", "correctDecision"]
          }
        }
      });

      const parsedData = JSON.parse(response.text || "{}");
      res.json(parsedData);
    } catch (error: any) {
      console.error("Error in /api/generate-fraud-case:", error);
      res.status(500).json({ error: error.message || "Failed to generate fraud alert case." });
    }
  });

  // API Route: Audit User Investigation Note Maker Draft
  app.post("/api/audit-notes", async (req, res) => {
    try {
      const { userNote, caseDetails, userDecision } = req.body;

      if (!userNote) {
        return res.status(400).json({ error: "Investigation note is required for the audit." });
      }

      const systemInstruction = `You are an internal Quality Assurance (QA) supervisor at Wipro monitoring 100% compliance SLAs for fraud reviews.
Audit the investigator's transaction decision note and audit decision.
Return a rigorous evaluation of their Note Maker entry and process compliance in JSON format.

The JSON MUST match the following TypeScript schema:
{
  complianceScore: number; // integer score from 0 to 100 percentage
  decisionMatches: boolean; // whether their decision was appropriate
  strengths: string[];
  omissions: string[]; // what critical data indices or SLA cues they missed
  reconstructedNote: string; // write the perfect Note Maker version using crisp syntax [e.g. AART MARKER: IP-GEO: DECISION: DETAILS]
  executiveFeedback: string; // clear professional compliance assessment
}`;

      const promptString = `Case Details:
${JSON.stringify(caseDetails, null, 2)}

Investigator Decision: ${userDecision}
Investigator Note Maker entry: "${userNote}"

Evaluate the investigator’s note format, coverage of fraud triggers, and risk reasoning. Check for high density of data records, quality compliance, and correct outcome.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptString,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              complianceScore: { type: Type.INTEGER },
              decisionMatches: { type: Type.BOOLEAN },
              strengths: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              omissions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              reconstructedNote: { type: Type.STRING },
              executiveFeedback: { type: Type.STRING }
            },
            required: ["complianceScore", "decisionMatches", "strengths", "omissions", "reconstructedNote", "executiveFeedback"]
          }
        }
      });

      const auditResult = JSON.parse(response.text || "{}");
      res.json(auditResult);
    } catch (error: any) {
      console.error("Error in /api/audit-notes:", error);
      res.status(500).json({ error: error.message || "Failed to audit investigation note." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
