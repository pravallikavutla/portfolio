import React from "react";
import { 
  ArrowRight, ShieldCheck, Terminal, Sliders, Briefcase, 
  GraduationCap, FolderGit2, Mail, Linkedin, Phone, MapPin, ExternalLink, Sparkles
} from "lucide-react";

interface PortfolioOverviewProps {
  onTabChange: (tab: "overview" | "optimizer" | "compliance") => void;
}

export default function PortfolioOverview({ onTabChange }: PortfolioOverviewProps) {
  return (
    <div className="space-y-12 py-4">
      
      {/* Contact Cards & Persona Block */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Profile Bio Statement */}
        <div className="lg:col-span-8 relative pl-6 flex flex-col justify-center">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-900"></div>
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-slate-800 font-sans">
            Detail-oriented <span className="font-semibold text-slate-900">IT Graduate</span> &{" "}
            <span className="font-extrabold text-slate-900 underline decoration-slate-300 decoration-2 underline-offset-4">Wipro Associate</span> specialized
            in fraud investigation, risk analysis, and high-volume data review operations. Expert in mapping anomalies, optimizing compliance SLAs with 
            <span className="font-semibold italic text-slate-900"> AART</span> and <span className="font-semibold italic text-slate-900">Note Maker </span> 
            tool workflows, while sustaining clean 100% quality targets.
          </p>
        </div>

        {/* Actionable Contact Badges */}
        <div className="lg:col-span-4 flex flex-col justify-around bg-slate-50/60 p-6 border border-slate-150 space-y-4">
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
              // Direct Connectivity
            </h4>
            
            <div className="space-y-2 text-xs font-mono text-slate-700">
              <a 
                href="mailto:vutlapravallika@gmail.com" 
                className="flex items-center gap-2 hover:text-slate-950 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>vutlapravallika@gmail.com</span>
              </a>
              <a 
                href="tel:9182211295" 
                className="flex items-center gap-2 hover:text-slate-950 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+91 9182211295</span>
              </a>
              <a 
                href="https://linkedin.com/in/vutla-pravallika-b848a925a" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 hover:text-slate-950 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                <span className="underline">linkedin.com/in/vutla-pravallika</span>
                <ExternalLink className="w-3 h-3 text-slate-300" />
              </a>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Hyderabad, India</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200/60 pt-3 flex justify-between items-center text-xs">
            <span className="font-mono text-[10px] uppercase text-slate-400">Compliance Limit</span>
            <span className="font-mono font-bold text-slate-900 bg-emerald-50 text-emerald-700 px-2 py-0.5">100% QUALITY</span>
          </div>
        </div>
      </section>

      {/* Core Technical & Professional Skills Grid */}
      <section className="space-y-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
          // SKILLS TAXONOMY
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-150 p-6 bg-white space-y-3">
            <div className="flex items-center gap-2 text-slate-950">
              <Terminal className="w-4 h-4 text-slate-650" />
              <h4 className="text-sm font-bold uppercase tracking-wider font-display">Technical Expertise</h4>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Java", "SQL", "HTML", "CSS", "JavaScript", "ReactJS", "MS Excel", "Troubleshooting", "Debugging", "Data Analysis", "Data Validation"].map((skill, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-50 text-slate-800 text-xs font-mono border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="border border-slate-150 p-6 bg-white space-y-3">
            <div className="flex items-center gap-2 text-slate-950">
              <ShieldCheck className="w-4 h-4 text-slate-650" />
              <h4 className="text-sm font-bold uppercase tracking-wider font-display">Professional Strengths</h4>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Risk Analysis", "Fraud Investigation", "SLA Management", "Cross-functional Collaboration", "Attention to Detail", "Problem Solving", "Adaptability", "Quality Review"].map((skill, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-900 text-slate-50 text-xs font-mono border border-slate-900">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-150 pb-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
            // WORK EXPEDITIONS & ROLES
          </h3>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Active Tenancy</span>
        </div>

        <div className="relative border border-slate-200 bg-white p-6 md:p-8 space-y-6">
          <div className="absolute top-0 left-0 bg-slate-900 text-white px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider">
            PRIMARY EXPERIENCE RECORD
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-2 pt-2">
            <div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-600" />
                <h4 className="text-xl font-bold text-slate-905 uppercase font-display">
                  Associate — Risk & Fraud Operations
                </h4>
              </div>
              <p className="text-sm font-semibold text-slate-550 mt-1">Wipro Limited</p>
            </div>
            <div className="text-left sm:text-right font-mono text-xs text-slate-500">
              <p>May 2025 – Present</p>
              <p className="text-emerald-600 font-bold uppercase">[Active Stream]</p>
            </div>
          </div>

          {/* SLA Performance metrics highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-y border-slate-100 py-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Investigation Volume</span>
              <span className="text-lg font-bold text-slate-900">48+ Suspicious Accounts Daily</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Quality Compliance Score</span>
              <span className="text-lg font-bold text-slate-900">100% Quality Targets Met</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Core Instrumentation</span>
              <span className="text-lg font-bold text-slate-900">AART Rules & Note Maker Enforcer</span>
            </div>
          </div>

          {/* Bullet points on real actions from Wipro */}
          <ul className="space-y-3 pl-4 list-disc text-sm text-slate-705 leading-relaxed font-sans font-normal">
            <li>
              Investigated and audited 48+ suspicious accounts daily utilizing high-velocity patterns to identify identity misuse, fraudulent promotions, and complex user policy violations with 100% compliance.
            </li>
            <li>
              Performed analytical review and structural risk assessments using proprietary moderation interfaces such as AART and Note Maker to ensure accurate fraud validations and strict policy enforcement.
            </li>
            <li>
              Maintained productivity, low turn-around SLA, and high precision targets while coordinating daily operational high-volume workflows in a fast-paced environment.
            </li>
            <li>
              Collaborated with cross-functional support units and escalation channels to resolve complex anomaly triggers and support timely business decisions.
            </li>
            <li>
              Received formal management appreciation from QA auditors for stellar accuracy results and designated suitability for future Quality Assurance panel responsibilities.
            </li>
          </ul>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onTabChange("compliance")}
              className="px-4 py-2 bg-slate-900 text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              Simulate pravallika's Wipro Work <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="space-y-6">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
          // SOFTWARE & SECURITY PROJECTS
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-200 bg-white p-6 flex flex-col justify-between hover:border-slate-800 transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-950">
                <FolderGit2 className="w-5 h-5 text-slate-700" />
                <h4 className="text-base font-bold uppercase font-display">Cloud Storage (3-Layer Privacy)</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Engineered a comprehensive secure cloud storage blueprint integrating multi-layer verification safeguards. Focused on mitigating database leakage, configuring multi-factor access protocols, and strengthening system level confidentiality.
              </p>
              <ul className="list-disc pl-4 text-[11px] text-slate-500 space-y-1">
                <li>Configured custom authentication parameters.</li>
                <li>Mitigated digital authorization escalations.</li>
              </ul>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center text-[10px] font-mono">
              <span className="text-slate-400">Security / Cloud Architecture</span>
              <span className="text-slate-900 font-bold bg-slate-100 px-2 py-0.5">COMPLETE</span>
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-6 flex flex-col justify-between hover:border-slate-800 transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-950">
                <FolderGit2 className="w-5 h-5 text-slate-700" />
                <h4 className="text-base font-bold uppercase font-display">Event Management Web Application</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Developed a responsive modular platform facilitating custom user signups and transaction coordination. Applied responsive designs using HTML5, CSS3, and JavaScript, ensuring safe local registration storage.
              </p>
              <ul className="list-disc pl-4 text-[11px] text-slate-500 space-y-1">
                <li>Streamlined registration workflows and components.</li>
                <li>Achieved fluid rendering interfaces across target sizes.</li>
              </ul>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center text-[10px] font-mono">
              <span className="text-slate-400">Pure Web Dev Stack</span>
              <span className="text-slate-900 font-bold bg-slate-100 px-2 py-0.5">COMPLETE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Internships Section */}
      <section className="space-y-6">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
          // INTERNSHIP WORK RECORDS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-150 p-6 bg-slate-50/30 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[9px] font-mono text-slate-450 uppercase block font-bold">// TECH INTEGRATOR</span>
              <h4 className="text-sm font-bold uppercase font-display text-slate-900 mt-1">Web Development Intern</h4>
              <p className="text-[11px] text-slate-400 font-mono">Global Education Technology</p>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Authored standard clean frontend projects, analyzed mobile UI responsive viewport behaviors, and integrated CSS flex/grid layout patterns with pixel-perfect layouts.
              </p>
            </div>
          </div>

          <div className="border border-slate-150 p-6 bg-slate-50/30 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[9px] font-mono text-slate-450 uppercase block font-bold">// AWS EDUCATION ASSOCIATE</span>
              <h4 className="text-sm font-bold uppercase font-display text-slate-900 mt-1">AI-ML / AWS Intern</h4>
              <p className="text-[11px] text-slate-400 font-mono">AICTE EduSkills • AWS Academy</p>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Focused on deploying AWS Cloud fundamentals, mastering basic machine learning models, and configuring cloud database tables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="space-y-6">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
          // ACADEMIC TIMELINE & MILESTONES
        </h3>

        <div className="border border-slate-200 bg-white p-6 md:p-8 space-y-6">
          
          <div className="relative pl-6 border-l border-slate-200 space-y-8">
            
            {/* Degree */}
            <div className="relative">
              <div className="absolute -left-[30px] top-1.5 h-3.5 w-3.5 rounded-full bg-slate-900 border-2 border-white"></div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase">
                    B.Tech in Information Technology
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">Usha Rama College of Engineering and Technology</p>
                </div>
                <div className="text-left sm:text-right font-mono text-xs text-slate-450">
                  <p>2020 – 2024</p>
                  <p className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded-sm inline-block mt-0.5">CGPA: 8.4</p>
                </div>
              </div>
            </div>

            {/* Intermediate */}
            <div className="relative">
              <div className="absolute -left-[30px] top-1.5 h-3.5 w-3.5 rounded-full bg-slate-300 border-2 border-white"></div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                <div>
                  <h4 className="text-sm font-bold text-slate-700 uppercase">
                    Intermediate Education
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">Lalitha Junior College, Guntur</p>
                </div>
                <div className="text-left sm:text-right font-mono text-xs text-slate-450">
                  <p>2018 – 2020</p>
                  <p className="font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-sm inline-block mt-0.5 font-mono">CGPA: 9.75</p>
                </div>
              </div>
            </div>

            {/* Schooling */}
            <div className="relative">
              <div className="absolute -left-[30px] top-1.5 h-3.5 w-3.5 rounded-full bg-slate-200 border-2 border-white"></div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                <div>
                  <h4 className="text-sm font-bold text-slate-700 uppercase">
                    SSC / Matriculate Education
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">ZPHS, Karumanchi</p>
                </div>
                <div className="text-left sm:text-right font-mono text-xs text-slate-450">
                  <p>2017 – 2018</p>
                  <p className="font-bold text-slate-705 bg-slate-100 px-1.5 py-0.5 rounded-sm inline-block mt-0.5">CGPA: 9.7</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Decorative Final Bottom Stats block matching design mockup */}
      <footer className="border-t border-slate-100 pt-8 grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Current Residency</div>
          <div className="text-xs font-bold text-slate-800">Hyderabad, Telengana</div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Expertise Target</div>
          <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500"></span>
            Zero SLA Breach
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Pentagon Alum</div>
          <div className="text-xs font-bold text-slate-800">Core Java / ReactJS Trained</div>
        </div>
        <div className="flex justify-start lg:justify-end">
          <button 
            onClick={() => onTabChange("optimizer")}
            className="w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="SLA Resume Tweak panel"
          >
            <Sparkles className="w-5 h-5 text-slate-900" />
          </button>
        </div>
      </footer>

    </div>
  );
}
