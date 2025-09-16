'use client'
import { AssessmentFormData } from "@/types/assessmentTypes"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const activities = [
    ["problems-solving", "Solving problems"],
    ["design/creating", "Designing / Creating"],
    ["talking/leading", "Talking / Leading"],
    ["research", "Researching"],
    ["helping-people", "Helping people"],
    ["business-exploring", "Exploring business ideas"],
    ["tech-experiment", "Experimenting with tech"],
]
export default function Stage2({ form, setForm }: {
    form: AssessmentFormData,
    setForm: React.Dispatch<React.SetStateAction<AssessmentFormData>>
}) {
    const toggleActivity = (val: string) => {
    setForm((f) => {
      const present = f.activities.includes(val);
      const activities = present ? f.activities.filter((a) => a !== val) : [...f.activities, val];
      // enforce max 3
      return { ...f, activities: activities.slice(0, 3) };
    });
  };
    return (
        <div className="space-y-4 sm:space-y-6">
            <div>
                    <Label>Preferred work environment</Label>
                    <Select value={form.environment} onValueChange={(v) => setForm((f) => ({ ...f, environment: v }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="field">Field</SelectItem>
                        <SelectItem value="studio">Studio/Creative</SelectItem>
                        <SelectItem value="lab">Lab/Research</SelectItem>
                        <SelectItem value="remote">Remote/Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
            <div>
                <Label>Which activities energize you? (up to 3)</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {activities.map(([val, label]) => (
                        <button
                            key={val}
                            onClick={() => toggleActivity(val)}
                            className={`p-3 rounded-md border text-left ${form.activities.includes(val) ? "border-emerald-600 bg-emerald-50" : "border-slate-200 bg-white"}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">Selected {form.activities.length} / 3</p>
            </div>
            </div>
    )
}
