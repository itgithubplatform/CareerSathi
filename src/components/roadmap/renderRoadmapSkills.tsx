import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Variants } from 'framer-motion'
import { Roadmap } from '@/types/roadmap'
import { Badge } from '../ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import { CheckCircle, Circle } from 'lucide-react'

export default function RenderRoadmapSkills({itemVariants, roadmap,containerVariants}:{itemVariants: Variants, roadmap: Roadmap, containerVariants:Variants}) {
  return (
    <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Skills to Learn
              <Badge variant="secondary" className="ml-2">
                {roadmap.skillsToLearn.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div 
              variants={containerVariants}
              className="space-y-3"
            >
              <AnimatePresence>
                {roadmap.skillsToLearn.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    variants={itemVariants}
                    layout
                    whileHover={{y: -3}}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.1 }}
                    className={`p-4 rounded-lg border-2 flex items-center justify-between gap-4  shadow-sm hover:shadow-lg ${
                      skill.done 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-sm text-gray-500 font-mono w-6">#{index + 1}</span>
                      <span className={skill.done ? 'line-through text-green-700' : ''}>
                        {skill.skill}
                      </span>
                    </div>
                    <Button
                      variant={skill.done ? "outline" : "default"}
                      size="sm"
                      className={skill.done ? "bg-white text-green-700 border-green-300" : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}
                    >
                      {skill.done ? (
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
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

  )
}
