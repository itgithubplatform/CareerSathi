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
                            <button
                                onClick={() => setForm((f) => ({ ...f, tradeoff: "stability" }))}
                                className={`p-3 rounded-md border text-left ${form.tradeoff === "stability" ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white"}`}
                            >
                                Stability 🛡️
                            </button>
                            <button
                                onClick={() => setForm((f) => ({ ...f, tradeoff: "growth" }))}
                                className={`p-3 rounded-md border text-left ${form.tradeoff === "growth" ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white"}`}
                            >
                                Growth 🌱
                            </button>
                            <button
                                onClick={() => setForm((f) => ({ ...f, tradeoff: "fame" }))}
                                className={`p-3 rounded-md border text-left ${form.tradeoff === "fame" ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white"}`}
                            >
                                Fame/Recognition 🌟
                            </button>
                            <button
                                onClick={() => setForm((f) => ({ ...f, tradeoff: "privacy" }))}
                                className={`p-3 rounded-md border text-left ${form.tradeoff === "privacy" ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white"}`}
                            >
                                Privacy/Balance 🧘
                            </button>
                            <button
                                onClick={() => setForm((f) => ({ ...f, tradeoff: "collaboration" }))}
                                className={`p-3 rounded-md border text-left ${form.tradeoff === "collaboration" ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white"}`}
                            >
                                Collaboration 🤝
                            </button>
                            <button
                                onClick={() => setForm((f) => ({ ...f, tradeoff: "independence" }))}
                                className={`p-3 rounded-md border text-left ${form.tradeoff === "independence" ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white"}`}
                            >
                                Independence 👤
                            </button>
                        </div>

                    </div>
                </div>
    )
}