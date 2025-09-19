import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Variants } from 'framer-motion'
import { Roadmap } from '@/types/roadmap'
import { Badge } from '../ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import { CheckCircle, Circle } from 'lucide-react'
import { useAtom } from 'jotai'
import { roadmapAtom } from '@/lib/atom'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export default function RenderRoadmapSkills({itemVariants, roadmap,containerVariants}:{itemVariants: Variants, roadmap: Roadmap, containerVariants:Variants}) {
  const [roadmapStore, setRoadmapStore] = useAtom(roadmapAtom)
  const handleSkillDone = async(id:string)=>{
    try {
       const skills = roadmap.skillsToLearn.map(skill=>{
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
          const skills = roadmap.skillsToLearn.map(skill=>{
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
      
      const skills = roadmap.skillsToLearn.map(skill=>{
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
                    whileHover={{y: -3}}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.1 }}
                    className={`px-8 py-4 bg-white rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-4  shadow-sm hover:shadow-lg ${
                      skill.done 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className={skill.done ? ' text-green-700' : ''}>
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
                                      <Link href={href||"/roadmap"} className="text-blue-600 hover:underline">
                                        {children}
                                      </Link>
                                    ),
                                  }} remarkPlugins={[remarkGfm]}>{skill.skill}</ReactMarkdown>
                      </span>
                    </div>
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
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

  )
}
