"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState} from "react";
import { Plus } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import RoadmapCard from "./roadmapCard";
import { Roadmap } from "@/types/roadmap";
import RoadmapSearchAndFilter from "./roadmapSearchAndFilter";
import RoadmapNotFound from "./roadmapNotFound";


export default function RoadmapsPage({ roadmaps }: { roadmaps: Roadmap[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name">("newest");
  const router = useRouter();

  const filteredRoadmaps = roadmaps.filter((roadmap) => 
      roadmap.careerPath.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return a.careerPath.localeCompare(b.careerPath);
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto ">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Career Roadmaps</h1>
            <p className="text-gray-600 mt-2">
              Plan your career journey with personalized roadmaps
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/chat")}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-shadow font-semibold"
          >
            <Plus size={20} />
            Design Your Path with AI
          </motion.button>
        </motion.div>

        {/* Search and Filter */}
        <RoadmapSearchAndFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} sortBy={sortBy} setSortBy={setSortBy} />

        {/* Roadmaps Grid */}
        {filteredRoadmaps.length === 0 ? (
          <RoadmapNotFound searchQuery={searchQuery} />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredRoadmaps.map((roadmap, index) => {
                return (
                  <RoadmapCard key={roadmap.id} roadmap={roadmap} index={index} />
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}