'use client'

import { AssessmentFormData } from "@/types/assessmentTypes"
import { Label } from "../ui/label"

export default function Stage4({ form, setForm }: {
    form: AssessmentFormData,
    setForm: React.Dispatch<React.SetStateAction<AssessmentFormData>>}) {
  return (
    <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Label>How do you handle uncertainty?</Label>
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      {[
                        ["secure", "Prefer secure paths"],
                        ["calculated", "Take calculated risks"],
                        ["thrive", "Thrive in uncertainty"],
                      ].map(([val, label]) => (
                        <button
                          key={val}
                          onClick={() => setForm((f) => ({ ...f, uncertainty: val }))}
                          className={`p-3 rounded-md border text-left ${form.uncertainty === val ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white"}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Trade-off that matters most</Label>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={() => setForm((f) => ({ ...f, tradeoff: "passion" }))}
                        className={`p-3 rounded-md border text-left ${form.tradeoff === "passion" ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white"}`}
                      >
                        Passion ❤️
                      </button>
                      <button
                        onClick={() => setForm((f) => ({ ...f, tradeoff: "money" }))}
                        className={`p-3 rounded-md border text-left ${form.tradeoff === "money" ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white"}`}
                      >
                        Money 💰
                      </button>
                    </div>

                  </div>
                </div>
  )
}
