//src/app/simulate_career/page.tsx
"use client";
import { useState } from "react";

// Types
interface Choice {
  choice_id: number;
  action: string;
  evaluation_hint?: string | null; // hidden until submit
  impact_score?: number | null; // hidden until submit
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

export default function SimulateCareer() {
  const [careerRole, setCareerRole] = useState("AI Engineer");
  const [userContext, setUserContext] = useState(
    JSON.stringify({
      qualification: "Final Year Student (B.Tech)",
      motivation: "High salary and cutting-edge technology",
      time_availability_months: 6
    }, null, 2)
  );

  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track user's selected choice per scenario: index -> choice_id
  const [userSelections, setUserSelections] = useState<Record<number, number>>({});

  // Summary state after submission
  const [submitted, setSubmitted] = useState(false);
  const [overallReadiness, setOverallReadiness] = useState<number | null>(null);
  const [evaluationSummary, setEvaluationSummary] = useState<
    { scenarioIndex: number; scenarioTitle: string; skill_focus: string; chosen: Choice | null }[]
  >([]);
  const [improvementSuggestions, setImprovementSuggestions] = useState<string[]>([]);
  const [alternativeRoles, setAlternativeRoles] = useState<{ role: string; reason: string }[] | null>(null);

  const handleSimulate = async () => {
    if (!careerRole.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setUserSelections({});
    setSubmitted(false);
    setOverallReadiness(null);
    setEvaluationSummary([]);
    setImprovementSuggestions([]);
    setAlternativeRoles(null);

    let contextObject = {};
    try {
      contextObject = JSON.parse(userContext);
    } catch (e) {
      setError("Invalid JSON format in User Context. Using default context.");
      contextObject = {};
    }

    try {
      const res = await fetch("/api/simulate_career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ careerRole, context: contextObject }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to generate simulation.");
      }

      const data = (await res.json()) as SimulationResult;
      setResult(data);
    } catch (err) {
      console.error(err);
      setError((err as Error).message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const selectChoice = (scenarioIndex: number, choiceId: number) => {
    // Update selection but DO NOT show evaluation
    setUserSelections(prev => ({ ...prev, [scenarioIndex]: choiceId }));
  };

  const allAnswered = result ? result.scenarios.length === Object.keys(userSelections).length : false;

  const handleSubmitAnswers = () => {
    if (!result) return;
    // Compute overall readiness as average of chosen impact_scores (where provided).
    const summary: { scenarioIndex: number; scenarioTitle: string; skill_focus: string; chosen: Choice | null }[] = [];
    let totalScore = 0;
    let countScores = 0;
    const weaknesses: Record<string, number[]> = {}; // skill_focus -> list of scores

    result.scenarios.forEach((s, idx) => {
      const chosenId = userSelections[idx];
      const chosen = s.choices.find(c => c.choice_id === chosenId) || null;
      summary.push({
        scenarioIndex: idx,
        scenarioTitle: s.title,
        skill_focus: s.skill_focus,
        chosen
      });

      if (chosen && typeof chosen.impact_score === "number") {
        totalScore += chosen.impact_score;
        countScores++;
        // collect for weaknesses
        if (!weaknesses[s.skill_focus]) weaknesses[s.skill_focus] = [];
        weaknesses[s.skill_focus].push(chosen.impact_score);
      } else {
        // if no numeric score, treat as neutral (50)
        totalScore += 50;
        countScores++;
        if (!weaknesses[s.skill_focus]) weaknesses[s.skill_focus] = [];
        weaknesses[s.skill_focus].push(50);
      }
    });

    const overall = countScores > 0 ? Math.round(totalScore / countScores) : 0;
    setOverallReadiness(overall);
    setEvaluationSummary(summary);

    // Build improvement suggestions: for each skill_focus whose average score < 60, suggest improvements.
    const suggestions: string[] = [];
    for (const [skill, scores] of Object.entries(weaknesses)) {
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      if (avg < 60) {
        suggestions.push(
          `Work on ${skill}. Current simulation responses indicate low alignment (avg ${avg}%). Suggested micro-tasks: short daily practice (20-40 mins) focused on this skill, find 2 related mini-projects, and seek peer feedback weekly.`
        );
      } else if (avg < 80) {
        suggestions.push(
          `Improve ${skill} further to be industry-ready (avg ${avg}%). Suggested tasks: focused workshops, situational roleplays, and mentor feedback.`
        );
      } else {
        // high score, optional encouragement
        suggestions.push(`Your ${skill} responses look strong (avg ${avg}%). Keep practicing with real tasks to maintain this strength.`);
      }
    }

    setImprovementSuggestions(suggestions);

    // If overall readiness is poor (<40), surface alternative roles from API response (if present)
    if (overall < 40 && result.related_roles && result.related_roles.length > 0) {
      setAlternativeRoles(result.related_roles.slice(0, 3)); // show top 3 suggestions
    } else {
      setAlternativeRoles(null);
    }

    setSubmitted(true);
    // Scroll to summary or let UI show summary area automatically
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-6 text-blue-900">🔎 Career Reality Experience — Simulator</h1>

      {/* Input */}
      <div className="w-full max-w-3xl mb-6 space-y-4">
        <label className="block text-lg font-semibold text-gray-700">Dream Career/Role:</label>
        <input
          type="text"
          value={careerRole}
          onChange={(e) => setCareerRole(e.target.value)}
          className="w-full p-4 rounded-xl border-2 border-gray-300 bg-white shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
          placeholder="e.g., IPS Officer, Food-Tech Entrepreneur, Actor"
          disabled={loading}
        />

        <label className="block text-lg font-semibold text-gray-700 pt-2">User Context (JSON):</label>
        <textarea
          value={userContext}
          onChange={(e) => setUserContext(e.target.value)}
          className="w-full p-4 rounded-xl border-2 border-gray-300 bg-white shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 font-mono text-sm"
          rows={5}
          disabled={loading}
        />
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleSimulate}
          disabled={loading || !careerRole.trim()}
          className="px-8 py-3 text-lg font-semibold bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Generating..." : "Run Career Experience"}
        </button>
      </div>

      {/* Error */}
      {error && <div className="w-full max-w-3xl text-red-700 bg-red-100 p-4 rounded-lg mb-6">{error}</div>}

      {/* Result overview */}
      {result && (
        <div className="w-full max-w-5xl space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 text-center">{result.careerRole}</h2>
            <p className="text-gray-700 mt-2">{result.overview}</p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900">Average Daily Routine</h4>
                <p className="mt-2 text-sm text-gray-900">{result.average_daily_routine}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900">Core Soft Skills (daily)</h4>
                <ul className="list-disc list-inside text-sm mt-2 text-gray-900">
                  {result.core_soft_skills.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900">Progress</h4>
                <p className="mt-2 text-sm text-gray-700">{Object.keys(userSelections).length}/{result.scenarios.length} scenarios answered</p>
                <p className="mt-2 text-xs text-gray-500">Evaluation will be shown only after submitting all answers.</p>
              </div>
            </div>
          </div>

          {/* primary image */}
          {result.primary_image && (
            <div className="bg-white p-4 rounded-xl shadow-lg flex justify-center">
              <img src={result.primary_image} alt="visual" className="w-full max-w-2xl rounded-lg" />
            </div>
          )}

          {/* Scenarios */}
          <div className="space-y-4">
            {result.scenarios.map((s, idx) => {
              const selectedId = userSelections[idx];
              return (
                <div key={s.id} className="bg-white p-5 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900">{idx + 1}. {s.title}</h3>
                      <p className="text-gray-700 mt-1">{s.description}</p>
                      <p className="text-sm text-gray-500 mt-1"><strong>Focus:</strong> {s.skill_focus} • <strong>Stakeholder:</strong> {s.stakeholder_persona.role}</p>
                    </div>
                  </div>

                  {/* choices — clicking selects but does NOT reveal evaluation */}
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Your Options</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {s.choices.map((c) => {
                        const isSelected = selectedId === c.choice_id;
                        return (
                          <li
                            key={c.choice_id}
                            onClick={() => selectChoice(idx, c.choice_id)}
                            className={`p-3 rounded-lg cursor-pointer border ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-blue-50'}`}
                            role="button"
                            aria-pressed={isSelected}
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-gray-800 font-medium">{c.choice_id}. {c.action}</div>
                              {isSelected && <div className="text-xs text-gray-500">Selected</div>}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="mt-2 text-xs text-gray-500">(Evaluation will appear after you submit answers for all scenarios.)</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit area */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleSubmitAnswers}
              disabled={!allAnswered || submitted}
              className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold disabled:bg-gray-300 hover:bg-blue-700"
            >
              {submitted ? "Submitted" : `Submit Answers (${Object.keys(userSelections).length}/${result.scenarios.length})`}
            </button>
          </div>

          {/* Summary (shown after submit) */}
          {submitted && (
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 mt-6">
              <h3 className="text-2xl font-bold text-blue-900">Simulation Summary & Evaluation</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border border-blue-100 bg-blue-50">
                  <h4 className="font-semibold text-blue-900">Overall Readiness</h4>
                  <p className="text-2xl font-bold mt-2 text-gray-800">{overallReadiness}%</p>
                  <p className="text-xs text-gray-500 mt-1">(Average of chosen options' impact scores)</p>
                </div>

                <div className="p-4 rounded-lg border border-blue-100 bg-blue-50">
                  <h4 className="font-semibold text-blue-900">Top Weaknesses</h4>
                  <ul className="mt-2 text-sm text-gray-800">
                    {improvementSuggestions.slice(0, 3).map((sug, i) => <li key={i} className="mb-2">• {sug}</li>)}
                  </ul>
                </div>

                <div className="p-4 rounded-lg border border-blue-100 bg-blue-50">
                  <h4 className="font-semibold text-blue-900">Next Steps</h4>
                  <ul className="mt-2 text-sm text-gray-800">
                    <li>• Follow the suggested micro-tasks per weak skill.</li>
                    <li>• Re-run this simulation after 2-3 months to track progress.</li>
                    <li>• If you want deeper roleplay, open the chatbot for follow-up practice.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mt-2 text-blue-900">Per-Scenario Evaluation</h4>
                <div className="mt-3 space-y-3">
                  {evaluationSummary.map((it) => (
                    <div key={it.scenarioIndex} className="p-3 border border-blue-100 rounded-lg bg-blue-50">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-semibold text-gray-800">{it.scenarioIndex + 1}. {it.scenarioTitle}</div>
                          <div className="text-sm text-gray-700 mt-1"><strong>Skill Focus:</strong> {it.skill_focus}</div>
                          <div className="text-sm text-gray-700 mt-1"><strong>Your Choice:</strong> {it.chosen ? it.chosen.action : "No selection"}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-800">{it.chosen && typeof it.chosen.impact_score === "number" ? `${it.chosen.impact_score}%` : "N/A"}</div>
                        </div>
                      </div>
                      
                      {/* THIS IS THE CRITICAL CHANGE TO RENDER HTML */}
                      <div 
                        className="mt-2 text-sm text-gray-700"
                        dangerouslySetInnerHTML={{ __html: it.chosen?.evaluation_hint ?? "No evaluation available for this choice." }}
                      />
                      {/* END CRITICAL CHANGE */}
                      
                    </div>
                  ))}
                </div>
              </div>

              {/* Alternative role suggestions if overall is low */}
              {overallReadiness !== null && overallReadiness < 40 && alternativeRoles && alternativeRoles.length > 0 && (
                <div className="mt-4 p-4 rounded-lg border bg-yellow-50 border-yellow-200">
                  <h4 className="font-semibold text-yellow-800">Alternative Career Suggestions</h4>
                  <p className="text-sm text-yellow-700 mt-1">Based on your simulation responses, these related roles might be a better fit:</p>
                  <ul className="mt-2">
                    {alternativeRoles.map((r, i) => (
                      <li key={i} className="mt-1 text-sm text-yellow-900">• <strong>{r.role}</strong> — {r.reason}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-yellow-800">Consider exploring these roles with short experiments or informational interviews.</p>
                </div>
              )}

            </div>
          )}

        </div>
      )}
    </div>
  );
}