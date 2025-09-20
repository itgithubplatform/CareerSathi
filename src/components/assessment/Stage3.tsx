'use client'

import { AssessmentFormData } from "@/types/assessmentTypes"
import { Label } from "../ui/label"
import { useState } from "react"

export default function Stage3({ form, setForm }: {
    form: AssessmentFormData,
    setForm: React.Dispatch<React.SetStateAction<AssessmentFormData>>
}) {

  const [showCareerFields, setShowCareerFields] = useState(false);

  const toggleLearningStyle = (val: string) => {
    setForm((f) => {
      const present = f.learningStyles.includes(val);
      const arr = present ? f.learningStyles.filter((a) => a !== val) : [...f.learningStyles, val];
      return { ...f, learningStyles: arr.slice(0, 2) };
    });
  };

  const toggleIndustry = (val: string) => {
    setForm((f) => {
      const present = f.preferredIndustries.includes(val);
      const arr = present ? f.preferredIndustries.filter((a) => a !== val) : [...f.preferredIndustries, val];
      return { ...f, preferredIndustries: arr };
    });
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Learning Style Section */}
      <Label className="text-base font-semibold text-slate-800">
        How do you learn best? (pick up to 2)
      </Label>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          ["hands-on/projects", "Hands-on / Projects"],
          ["reading", "Reading / Theory"],
          ["watching-videos", "Watching videos"],
          ["group-discussions", "Group discussions"],
          ["self-experiment", "Self-experiment"],
        ].map(([val, label]) => (
          <button
            key={val}
            onClick={() => toggleLearningStyle(val)}
            className={`p-3 rounded-lg border text-left transition ${form.learningStyles.includes(val)
              ? "border-emerald-600 bg-emerald-50 text-emerald-800"
              : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-2">
        Selected {form.learningStyles.length} / 2
      </p>

      {/* Checkbox to show optional career fields */}
      <div className="mt-6 flex items-center gap-2">
        <input
          type="checkbox"
          id="knowCareerCheckbox"
          checked={showCareerFields}
          onChange={(e) => setShowCareerFields(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
        />
        <label htmlFor="knowCareerCheckbox" className="text-slate-800 font-medium">
          I know my career path / want to specify preferred industries
        </label>
      </div>

      {/* Optional Career Fields */}
      {showCareerFields && (
        <div className="space-y-6 mt-4">
          {/* Known Career */}
          <div>
            <Label className="text-base font-semibold text-slate-800">
              My Career Path (optional)
            </Label>
            <input
              type="text"
              placeholder="Type your desired career"
              value={form.knownCareer!}
              onChange={(e) => setForm(f => ({ ...f, knownCareer: e.target.value }))}
              className="mt-2 w-full p-3 border rounded-lg border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          {/* Preferred Industries */}
          <div>
            <Label className="text-base font-semibold text-slate-800">
              Preferred Industries (optional)
            </Label>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ["tech", "Tech / IT"],
                ["finance", "Finance"],
                ["design", "Design / Creative"],
                ["healthcare", "Healthcare"],
                ["education", "Education"],
              ].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => toggleIndustry(val)}
                  className={`p-3 rounded-lg border text-left transition ${form.preferredIndustries.includes(val)
                    ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Selected {form.preferredIndustries.length}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
