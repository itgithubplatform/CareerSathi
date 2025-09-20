import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Variants } from 'framer-motion'
import { Roadmap } from '@/types/roadmap'
import { Badge } from '../ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import { CheckCircle, Circle, Link } from 'lucide-react'
import { roadmapAtom } from '@/lib/atom'
import { useAtom } from 'jotai'
import RenderMarkdown from '../ui/RenderMarkdown'

export default function RenderRoadmapProjects({ itemVariants, roadmap, containerVariants }: { itemVariants: Variants, roadmap: Roadmap, containerVariants: Variants }) {
  const [roadmapStore, setRoadmapStore] = useAtom(roadmapAtom)

  const handleSkillDone = async (id: string) => {
    try {
      const projects = roadmap.recommendedProjects.map(project => {
        if (project.id === id) {
          project.done = true
        }
        return project
      })
      setRoadmapStore({
        ...roadmap,
        recommendedProjects: projects
      })
      const res = await fetch("/api/roadmap/update-project", {
        method: "POST",
        body: JSON.stringify({
          roadmapId: roadmap.id,
          projectId: id
        })
      })
      if (!res.ok) {
        const projects = roadmap.recommendedProjects.map(project => {
          if (project.id === id) {
            project.done = false
          }
          return project
        })
        setRoadmapStore({
          ...roadmap,
          recommendedProjects: projects
        })
      }
    } catch (error) {
      console.log(error);

      const projects = roadmap.recommendedProjects.map(project => {
        if (project.id === id) {
          project.done = false
        }
        return project
      })
      setRoadmapStore({
        ...roadmap,
        recommendedProjects: projects
      })
    }
  }
  return (
    <motion.div variants={itemVariants}>
      <Card className='bg-transparent border-none shadow-none mt-12'>
        <CardHeader>
          <CardTitle className="flex text-2xl items-center gap-2">
            Recommended Tasks
            <Badge variant="outline" className="ml-2 text-xl">
              {roadmap.recommendedProjects.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={containerVariants}
            className="space-y-6"
          >
            <AnimatePresence>
              {roadmap.recommendedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.1 }}
                  className={`px-8 bg-white py-6 rounded-2xl shadow-sm hover:shadow-lg border-2 ${project.done
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200'
                    }`}
                >
                  <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 mb-3">
                    <div>
                      <h3 className={`font-semibold mb-4 ${project.done ? ' text-green-700' : ''}`}>
                        <RenderMarkdown>
                          {project.title}
                          </RenderMarkdown>
                      </h3>
                      <RenderMarkdown>{project.description}</RenderMarkdown>
                    </div>
                    <Button
                      variant={project.done ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleSkillDone(project.id)}
                      className={project.done ? "bg-white text-green-700 border-green-300 shrink-0" : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}
                    >
                      {project.done ? (
                        <>
                          <CheckCircle size={16} className="mr-1" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Circle size={16} className="mr-1" />
                          Mark Complete
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {project.done ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
