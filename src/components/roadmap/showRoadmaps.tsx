"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  FileText,
  TrendingUp,
  BookOpen,
  Target,
  BarChart3
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Roadmap {
  id: string;
  careerPath: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function ShowRoadmaps({ roadmaps }: { roadmaps: Roadmap[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name">("newest");
  const router = useRouter();

  const filteredRoadmaps = roadmaps
    .filter((roadmap) => 
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const getCareerPathIcon = (careerPath: string) => {
    if (careerPath.toLowerCase().includes("developer") || careerPath.toLowerCase().includes("engineer")) {
      return <BarChart3 className="text-blue-500" size={20} />;
    } else if (careerPath.toLowerCase().includes("design")) {
      return <Target className="text-purple-500" size={20} />;
    } else if (careerPath.toLowerCase().includes("data")) {
      return <TrendingUp className="text-green-500" size={20} />;
    } else {
      return <BookOpen className="text-indigo-500" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
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
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <Plus size={20} />
            Talk to AI mentor
          </motion.button>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-sm mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search roadmaps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="flex gap-2 items-center">
              <Filter className="text-gray-400" size={18} />
              <Select value={sortBy} onValueChange={(value: "newest" | "oldest" | "name") => setSortBy(value)}>
                <SelectTrigger className="w-[140px] border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        </motion.div>

        {/* Roadmaps Grid */}
        {filteredRoadmaps.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-sm text-center"
          >
            <FileText className="mx-auto text-gray-300" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 mt-4">No roadmaps yet</h3>
            <p className="text-gray-500 mt-2">
              {searchQuery ? "No roadmaps match your search." : "Create your first roadmap to get started on your career journey."}
            </p>
            {!searchQuery && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/chat")}
                className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                Create Roadmap with AI
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredRoadmaps.map((roadmap, index) => (
                <motion.div
                  key={roadmap.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => router.push(`/roadmaps/${roadmap.id}`)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-blue-50">
                      {getCareerPathIcon(roadmap.careerPath)}
                    </div>
                    <ChevronRight className="text-gray-400" size={20} />
                  </div>
                  
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                    {roadmap.careerPath}
                  </h3>
                  
                  <div className="flex items-center text-gray-500 text-sm mt-4">
                    <Calendar size={14} className="mr-1" />
                    <span className="mr-4">Created {formatDate(roadmap.createdAt)}</span>
                    
                    <Clock size={14} className="mr-1" />
                    <span>Updated {formatDate(roadmap.updatedAt)}</span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">65% complete</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}