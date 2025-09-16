"use client"
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2, ArrowRight, XCircle } from "lucide-react";
import { AssessmentFormData } from "@/types/assessmentTypes";
import Stage1 from "@/components/assessment/Stage1";
import Stage2 from "@/components/assessment/Stage2";
import Stage3 from "@/components/assessment/Stage3";
import Stage4 from "@/components/assessment/Stage4";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from "nextjs-toploader/app";
import { useSession } from "next-auth/react";

export default function CareerAssessmentPage() {
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {data: session, status, update} = useSession()
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [form, setForm] = useState<AssessmentFormData>({
    // Stage 1
    education: "",
    stream: "",
    situation: "",
    // Stage 2
    environment: "",
    activities: [],
    // Stage 3
    learningStyles: [],
    // Stage 4
    uncertainty: "",
    tradeoff: "",
  });

  const next = () => setStage((s) => Math.min(4, s + 1));
  const prev = () => setStage((s) => Math.max(1, s - 1));

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    if (!form.education||!form.situation||!form.environment||!form.activities||!form.learningStyles||!form.uncertainty||!form.tradeoff) {
      setLoading(false);
      setError("Please fill required fields in Stage 1 (education & situation).");
      return;
    }

    try {
      const res = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        let message = `Server responded with ${res.status}`;
        throw new Error(message);
      }
      await update()
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // small animated card variants
  const variants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
        <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 sm:p-6">
      <Header/>
      <div className="w-full max-w-3xl my-20">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">Career Assessment</h1>
          <div className="text-sm text-slate-600">Stage {stage} of 4</div>
        </div>

        <motion.div
          key={stage}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl md:text-2xl mb-2">{`Stage ${stage}`}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Stage 1 */}
              {stage === 1 && (
                <Stage1 form={form} setForm={setForm} />
              )}
              {/* Stage 2 */}
              {stage === 2 && (
                <Stage2 form={form} setForm={setForm}  />
              )}

              {/* Stage 3 */}
              {stage === 3 && (
                <Stage3 form={form} setForm={setForm}  />
              )}


              {/* Stage 4 */}
              {stage === 4 && (
                <Stage4 form={form} setForm={setForm} />
              )}

              {/* Error message */}
              {error && (
                <div className="mt-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
                  <XCircle size={18} />
                  <div className="text-sm">{error}</div>
                </div>
              )}

              {/* Success */}
              {submitted && (
                <div className="mt-4 p-3 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
                  <Check size={18} />
                  <div className="text-sm">Submitted — thank you! We will generate your personalized roadmap.</div>
                </div>
              )}

              {/* Controls */}
              <div className="mt-6 flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                  <Button variant="ghost" onClick={prev} disabled={stage === 1} className="w-24">
                    Back
                  </Button>
                  {stage < 4 && (
                    <Button onClick={next} className="w-24 sm:w-auto font-bold bg-gradient-to-r from-blue-700  to-purple-700">
                      Next
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {stage === 4 ? (
                    <Button onClick={handleSubmit} disabled={loading || submitted} className="w-full sm:w-auto font-bold bg-gradient-to-r from-blue-700 to-purple-700">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="animate-spin" size={16} /> Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 ">Submit <ArrowRight size={14} /></span>
                      )}
                    </Button>
                  ) : (
                    <div className="text-sm text-slate-500 text-center sm:text-right w-full sm:w-auto">Complete all stages to submit</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
      <Footer/>
      </>
  );
}