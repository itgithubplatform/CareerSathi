import { Roadmap } from '@/types/roadmap';
import { useRouter } from 'nextjs-toploader/app';
import React from 'react'
import { BarChart3, BookOpen, Calendar, ChevronRight, Clock, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function RoadmapCard({ roadmap, index }: { roadmap: Roadmap, index: number }) {
  const router = useRouter();

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

  const calculateProgress = (roadmap: Roadmap): number => {
    const totalItems = roadmap.skillsToLearn.length + roadmap.recommendedProjects.length;

    if (totalItems === 0) return 0;

    const completedSkills = roadmap.skillsToLearn.filter(skill => skill.done).length;
    const completedProjects = roadmap.recommendedProjects.filter(project => project.done).length;

    const progress = ((completedSkills + completedProjects) / totalItems) * 100;
    return Math.round(progress);
  };

  const progress = calculateProgress(roadmap);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, y: -20 }}
      className="cursor-pointer h-full"
      onClick={() => router.push(`/roadmap/${roadmap.id}`)}
    >
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="p-2 rounded-lg bg-blue-50">
            {getCareerPathIcon(roadmap.careerPath)}
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </CardHeader>
        
        <CardContent>
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
            {roadmap.careerPath}
          </h3>

          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <Badge variant="outline" className="font-normal">
              {roadmap.skillsToLearn.length} skills
            </Badge>
            <Badge variant="outline" className="font-normal">
              {roadmap.recommendedProjects.length} projects
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center text-gray-500 text-sm gap-2 mt-4">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>Created {formatDate(roadmap.createdAt)}</span>
            </div>
            
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>Updated {formatDate(roadmap.updatedAt)}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 ">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs text-gray-500">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}