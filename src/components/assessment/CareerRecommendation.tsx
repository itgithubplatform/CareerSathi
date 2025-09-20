"use client";
import { useRouter } from "nextjs-toploader/app";
import { motion } from "framer-motion";
import { useState } from "react";
import { Briefcase, Link } from "lucide-react"; 
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import CareerLoader from "./CareerLoader";

interface CareerRecommendationsProps {
  careerPaths: {
    name: string;
    description: string;
  }[]
}

export default function CareerRecommendations({ careerPaths }: CareerRecommendationsProps) {
  const router = useRouter();
  const [loadingCareer, setLoadingCareer] = useState(false);

  const handleSelectCareer = async (career: { name: string; description: string }) => {
    try {
      setLoadingCareer(true);
      const res = await fetch("/api/roadmap/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ career }),
      });
      if (!res.ok) throw new Error("Failed to create roadmap");
      const data = await res.json();
      router.push("/roadmap/"+data.roadmapId);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }finally {
      setLoadingCareer(false);
    }
  };

  const handleRejectAll = () => {
    router.push("/chat");
  };
if (loadingCareer) {
  return (
    <CareerLoader/>
  )
}
  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-12 bg-gradient-to-br from-blue-50 to-purple-50">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-slate-800 mb-10 text-center mt-20"
      >
        Your Recommended Career Paths
      </motion.h1>

      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6">
        {careerPaths.map((career, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="p-6 rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-lg transition flex flex-col items-start"
          >
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-800">{career.name}</h2>
            </div>
           <ReactMarkdown components={{
            p: ({ children }) => <p className="mb-3 text-gray-800 leading-6">{children}</p>,
            ul: ({ children }) => <ul className="list-disc ml-5 mb-3 text-gray-800">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal ml-5 mb-3 text-gray-800">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900">{children}</h3>,
            h4: ({ children }) => <h4 className="text-base font-semibold mt-3 mb-1 text-gray-900">{children}</h4>,
            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            a: ({ children, href }) => (
              <Link href={href||"/roadmap"} className="text-blue-600 bg-blue-50 hover:scale-105 transition-all duration-200 hover:bg-blue-100 p-2 border border-blue-400 rounded-lg" >
                {children}
              </Link>
            ),
          }} remarkPlugins={[remarkGfm]}>{career.description}</ReactMarkdown>
            <button
              onClick={() => handleSelectCareer(career)}
              disabled={loadingCareer}
              className={`mt-6 w-full py-2 px-4 rounded-lg text-white font-medium transition bg-emerald-600 hover:bg-emerald-700`}
            >
              Choose this path
            </button>
          </motion.div>
        ))}
      </div>

      {/* Reject All */}

      <div className="flex flex-col md:flex-row items-center justify-center mt-12 gap-2">
      <span>None of these feels right?</span>
      <button
        onClick={handleRejectAll}
        className=" text-sm text-gray-600 hover:text-gray-800 bg-white hover:bg-gray-100  hover:shadow-lg border border-gray-300 py-2 px-4 rounded-lg transition"
        >
        Chat with <span className="text-purple-700 font-semibold">AI Mentor</span>
      </button>
        </div>
    </div>
  );
}
