import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { motion, Variants } from 'framer-motion'
import { BarChart3, BookOpen, Calendar, Clock, Target, TrendingUp } from 'lucide-react'
import { Progress } from '../ui/progress'
import { Roadmap } from '@/types/roadmap'


export default function RenderRoadmapHeader({ itemVariants, roadmap, cardVariants }: { itemVariants: Variants, cardVariants: Variants, roadmap: Roadmap }) {
  
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

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  const completedSkills = roadmap.skillsToLearn.filter(skill => skill.done).length;

  const completedProjects = roadmap.recommendedProjects.filter(project => project.done).length;

  const totalItems = roadmap.skillsToLearn.length + roadmap.recommendedProjects.length;

  const progressPercentage = totalItems > 0
    ? Math.round(((completedSkills + completedProjects) / totalItems) * 100)
    : 0;

  return (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden bg-transparent shadow-none border-none">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="p-3 rounded-full bg-white shadow-sm"
              >
                {getCareerPathIcon(roadmap.careerPath)}
              </motion.div>
              <div>
                <CardTitle className="text-2xl md:text-3xl">{roadmap.careerPath} Roadmap</CardTitle>
                <CardDescription className="flex flex-col md:flex-row md:items-center md:gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    Created {formatDate(roadmap.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    Updated {formatDate(roadmap.updatedAt)}
                  </span>
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-500">{progressPercentage}%</span>
              </div>
              <Progress color='' value={progressPercentage} className="h-3 [&>div]:bg-purple-500" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <motion.div
                variants={cardVariants}
                className="p-4 shadow-lg rounded-lg border-l-4 border-blue-500 bg-white"
              >
                <h3 className="font-semibold mb-2 text-sm">Skills Progress</h3>
                <p className="text-2xl font-bold">
                  {completedSkills}<span className="text-sm font-normal text-gray-500">/{roadmap.skillsToLearn.length}</span>
                </p>
              </motion.div>
              <motion.div
                variants={cardVariants}
                className="p-4 bg-white shadow-lg rounded-lg border-l-4 border-purple-500"
              >
                <h3 className="font-semibold mb-2 text-sm">Projects Progress</h3>
                <p className="text-2xl font-bold">
                  {completedProjects}<span className="text-sm font-normal text-gray-500">/{roadmap.recommendedProjects.length}</span>
                </p>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
