'use client'

import { AssessmentFormData } from "@/types/assessmentTypes"
import { Label } from "../ui/label"

export default function Stage3({ form, setForm }: {
    form: AssessmentFormData,
    setForm: React.Dispatch<React.SetStateAction<AssessmentFormData>>
}) {
    const toggleLearningStyle = (val: string) => {
    setForm((f) => {
      const present = f.learningStyles.includes(val);
      const arr = present ? f.learningStyles.filter((a) => a !== val) : [...f.learningStyles, val];
      return { ...f, learningStyles: arr.slice(0, 2) };
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
                  </div>
  )
}
