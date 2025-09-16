import React from 'react'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { AssessmentFormData } from '@/types/assessmentTypes';

export default function Stage1({ form, setForm }: { 
    form: AssessmentFormData; 
    setForm: React.Dispatch<React.SetStateAction<AssessmentFormData>>}) {
  return (
    <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Label>What is your current education level?</Label>
                    <Select value={form.education} onValueChange={(v) => setForm((f) => ({ ...f, education: v }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select education" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class10">Class 10 or below</SelectItem>
                        <SelectItem value="class11-12">Class 11–12</SelectItem>
                        <SelectItem value="undergrad">Undergraduate</SelectItem>
                        <SelectItem value="postgrad">Postgraduate / Professional</SelectItem>
                        <SelectItem value="working">Working professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {form.education && form.education !== "class10" && (
                    <div>
                      <Label>What is your current stream/major?</Label>
                      <Select value={form.stream} onValueChange={(v) => setForm((f) => ({ ...f, stream: v }))}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select stream" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering / Technology </SelectItem>
                          <SelectItem value="medical">Medical / Paramedical </SelectItem>
                          <SelectItem value="science">Pure Sciences </SelectItem>
                          <SelectItem value="commerce">Commerce </SelectItem>
                          <SelectItem value="arts">Arts / Humanities</SelectItem>
                          <SelectItem value="law">Law </SelectItem>
                          <SelectItem value="management">Management / Business </SelectItem>
                          <SelectItem value="design">Design / Fine Arts / Architecture </SelectItem>
                          <SelectItem value="computer">Computer Applications / IT </SelectItem>
                          <SelectItem value="education">Education / Teaching </SelectItem>
                          <SelectItem value="media">Media / Journalism / Mass Comm</SelectItem>
                          <SelectItem value="vocational">Vocational / Skill-based </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="na">Not applicable</SelectItem>

                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <Label>Which of these best describes your current situation?</Label>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {[
                        ["preparing-for-exams", "Preparing for exams"],
                        ["exploring-career-options", "Exploring career options"],
                        ["clear-goal-need-guidance", "Clear goal, need guidance"],
                        ["working-switch/upskill", "Working, want to switch/upskill"],
                      ].map(([val, label]) => (
                        <button
                          key={val}
                          onClick={() => setForm((f) => ({ ...f, situation: val }))}
                          className={`p-3 text-left rounded-md border ${form.situation === val ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white"}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
  )
}
