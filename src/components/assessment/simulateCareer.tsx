"use client";
import { useState, ReactNode, useEffect } from "react";
// Professional icons from lucide-react
// You'll need to install this: npm install lucide-react
import {
  Search,
  ArrowRight,
  Loader2,
  AlertTriangle,
  Briefcase,
  ListTodo,
  Star,
  Users,
  MessageSquare,
  Target,
} from "lucide-react";
import LoadingSkeleton from "../layout/LoadingSkeleton";

// --- TYPES (Updated to the detailed version) ---
interface Choice {
  choice_id: number;
  action: string;
  evaluation_hint?: string | null;
  impact_score?: number | null;
}

interface MiniScenario {
  id: number;
  title: string;
  description: string;
  skill_focus: string;
  stakeholder_persona: {
    role: string;
    initial_message: string;
  };
  visual_prompt?: string;
  choices: Choice[];
}

interface SimulationResult {
  careerRole: string;
  overview: string;
  average_daily_routine: string;
  core_soft_skills: string[];
  scenarios: MiniScenario[];
  related_roles?: { role: string; reason: string }[];
  primary_image?: string | null;
}

// Prop types for InfoCard
interface InfoCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

// --- REUSABLE COMPONENTS ---

/**
 * A reusable card component for the sidebar to keep the UI consistent.
 */
const InfoCard = ({ title, icon, children }: InfoCardProps) => (
  <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
    <div className="flex items-center mb-3">
      <span className="text-indigo-600">{icon}</span>
      <h3 className="ml-2 text-lg font-semibold text-slate-800">{title}</h3>
    </div>
    <div className="text-sm text-slate-600 space-y-2">{children}</div>
  </div>
);

/**
 * A reusable card to display a single scenario in a professional way.
 */
interface ScenarioCardProps {
  scenario: MiniScenario;
  index: number;
}
const ScenarioCard = ({ scenario, index }: ScenarioCardProps) => (
  <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
    <h4 className="text-lg font-semibold text-indigo-600">
      Scenario {index + 1}: {scenario.title}
    </h4>
    <p className="mt-2 text-slate-600">{scenario.description}</p>
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
      <div className="flex items-center text-slate-500">
        <Target className="w-4 h-4 mr-2 text-indigo-500" />
        <strong>Skill Focus:</strong>
        <span className="ml-1.5">{scenario.skill_focus}</span>
      </div>
      <div className="flex items-center text-slate-500">
        <MessageSquare className="w-4 h-4 mr-2 text-indigo-500" />
        <strong>Stakeholder:</strong>
        <span className="ml-1.5">{scenario.stakeholder_persona.role}</span>
      </div>
    </div>
  </div>
);

/**
 * A professional skeleton loader that mimics the result layout.
 */

// --- MAIN PAGE COMPONENT ---

export default function SimulateCareerPage({careerRole}: {careerRole: string}) {
    useEffect(() => {
        if (careerRole) {
            handleSimulate();
        }
    },[careerRole]);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSimulate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Prevent form submission
    if (!careerRole.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/simulate_career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ careerRole }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to generate simulation.");
      }

      // We assume the API now returns the simplified SimulationResult
      const data = (await res.json()) as SimulationResult;
      setResult(data);
    } catch (err) {
      console.error(err);
      // Added TypeScript 'as Error' type assertion
      setError((err as Error).message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return (
        <div className="w-full max-w-3xl mx-auto">
          <div
            className="flex items-center p-4 text-red-700 bg-red-100 border border-red-200 rounded-lg"
            role="alert"
          >
            <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
            <div>
              <span className="font-semibold">Error:</span> {error}
            </div>
          </div>
        </div>
      );
    }

    if (result) {
      return (
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* --- Main Content --- */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-4xl font-bold text-slate-900">
                A Day in the Life:{" "}
                <span className="text-indigo-600">{result.careerRole}</span>
              </h2>

              {/* Primary Image */}
              {result.primary_image && (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                  <img
                    src={result.primary_image}
                    alt={`${result.careerRole} visual`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Overview */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Role Overview
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {result.overview}
                </p>
              </div>

              {/* Key Scenarios */}
              {result.scenarios && result.scenarios.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-800">
                    Key Scenarios & Challenges
                  </h3>
                  <div className="space-y-4">
                    {result.scenarios.map((scenario, i) => (
                      <ScenarioCard
                        key={scenario.id}
                        scenario={scenario}
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* --- Sidebar --- */}
            <div className="lg:col-span-1 space-y-6">
              <InfoCard
                title="Average Daily Routine"
                icon={<ListTodo className="w-5 h-5" />}
              >
                <p>{result.average_daily_routine}</p>
              </InfoCard>

              <InfoCard
                title="Core Soft Skills"
                icon={<Star className="w-5 h-5" />}
              >
                <ul className="list-disc list-inside space-y-1">
                  {result.core_soft_skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </InfoCard>

              {result.related_roles && result.related_roles.length > 0 && (
                <InfoCard
                  title="Related Roles"
                  icon={<Users className="w-5 h-5" />}
                >
                  <ul className="space-y-2">
                    {result.related_roles.map((role, i) => (
                      <li key={i}>
                        <strong className="text-slate-700">{role.role}</strong>
                        <p className="text-xs text-slate-500">{role.reason}</p>
                      </li>
                    ))}
                  </ul>
                </InfoCard>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null; // Render nothing if no action has been taken
  };

  return (
    <div className="min-h-screen  p-8 md:p-12 text-slate-900">
      {/* --- Content Area --- */}
      <main>{renderContent()}</main>
    </div>
  );
}


