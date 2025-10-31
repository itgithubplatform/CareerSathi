import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Variants } from 'framer-motion'
import { Roadmap } from '@/types/roadmap'
import { Badge } from '../ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import { CheckCircle, Circle, Info } from 'lucide-react'
import { useAtom } from 'jotai'
import { roadmapAtom } from '@/lib/atom'
import RenderMarkdown from '../ui/RenderMarkdown'
import ProjectORSkillInfo from './ProjectORSkillInfo'

export default function RenderRoadmapSkills({ itemVariants, roadmap, containerVariants }: { itemVariants: Variants, roadmap: Roadmap, containerVariants: Variants }) {
  const [roadmapStore, setRoadmapStore] = useAtom(roadmapAtom)
  const [skills, setSkills] = React.useState<string|null>(null)
  const handleSkillDone = async (id: string) => {
    try {
      const skills = roadmap.skillsToLearn.map(skill => {
        if (skill.id === id) {
          skill.done = true
        }
        return skill
      })
      setRoadmapStore({
        ...roadmap,
        skillsToLearn: skills
      })
      const res = await fetch("/api/roadmap/update-skill", {
        method: "POST",
        body: JSON.stringify({
          roadmapId: roadmap.id,
          skillId: id
        })
      })
      if (!res.ok) {
        const skills = roadmap.skillsToLearn.map(skill => {
          if (skill.id === id) {
            skill.done = false
          }
          return skill
        })
        setRoadmapStore({
          ...roadmap,
          skillsToLearn: skills
        })
      }
    } catch (error) {
      console.log(error);

      const skills = roadmap.skillsToLearn.map(skill => {
        if (skill.id === id) {
          skill.done = false
        }
        return skill
      })
      setRoadmapStore({
        ...roadmap,
        skillsToLearn: skills
      })
    }
  }
  return (
    <motion.div variants={itemVariants}>
      <Card className='bg-transparent border-none shadow-none'>
        <CardHeader>
          <CardTitle className="flex text-2xl items-center gap-2">
            Skills to Learn
            <Badge variant="outline" className=" text-xl">
              {roadmap.skillsToLearn.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={containerVariants}
            className="space-y-6"
          >
            <AnimatePresence>
              {roadmap.skillsToLearn.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.1 }}
                  className={`px-8 py-4 bg-white rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-4  shadow-sm hover:shadow-lg ${skill.done
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200'
                    }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className={skill.done ? ' text-green-700' : ''}>
                      <RenderMarkdown>{skill.skill}</RenderMarkdown>
                    </span>
                  </div>
                  <div className='flex flex-col items-center gap-3'>

                  <Button
                    variant={skill.done ? "outline" : "default"}
                    size="sm"
                    onClick={() => handleSkillDone(skill.id)}
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
                  <Button
                  onClick={()=>setSkills(skill.skill)}
                  size={"sm"}
                    className='
    bg-blue-500 hover:bg-blue-600
    text-white w-full  
    flex items-center gap-2 transition-colors  '
                  >
                    <Info className="" /> 
                    Learn More
                  </Button>
              </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </CardContent>
      </Card>
      {skills && <ProjectORSkillInfo text={skills} onClose={() => setSkills(null)} />}
    </motion.div>

  )
}
