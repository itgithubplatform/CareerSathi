"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function JobsRecommendation() {
  return (
    <>
      <motion.div initial={{opacity:0, y:20}}
                 animate={{opacity:1, y:0}} transition={{delay:.3}} className='mt-10'>
                    <h3 className="mb-4 text-xl font-bold">Recommended for you</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                            <div className="p-5">
                                <div className="mb-4 flex items-start justify-between">
                                    <div>
                                        <h4 className="text-lg font-bold">Software Engineer</h4>
                                        <p className="text-sm text-slate-600">Acme Inc.</p>
                                        <p className="text-sm text-slate-500">Remote</p>
                                    </div>
                                    <img alt="Company Logo" className="h-12 w-12 rounded-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaYieD6DtPjjrYt4s8eW9jvczYVBluvDJ0cufnOF4pS3gfAJf9esPSB0mHGHUKAxj3mj4QIaHQTzt99WxY1i5OeO4xvlOsUGBwWhunXnCiBDQXm1USzgAURsqcMofq7DcxsEMEr6uNkG-bp7-Pm2DNQYeRZZOMmkvAexlhuayAZekdX7dQ-Ux4nnL6jlD7idrPy_enCPoba28skR3qmM_9yZ_KfSz0Ua3-1QUzP6cw7kb5akaGud1AGCv0DrWNSdN-2mDuROZf_EQ" />
                                </div>
                                <div className="mb-4 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700">Full-time</span>
                                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">$120k - $150k</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Quick Apply</button>
                                    <button className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Save Job</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
    </>
  )
}
