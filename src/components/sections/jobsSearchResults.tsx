"use client"
import React, { useEffect } from 'react'
import {motion} from 'framer-motion'
import { JobArray } from '@/types/jobsType'
import Link from 'next/link'
import JobExpand from './jobExpand'
import Pagination from './pagination'

export default function JobsSearchResults({querry,jobsArr,noOfPages}:{querry:string,jobsArr:JobArray,noOfPages:number}) {
    
    const [openIndex, setOpenIndex] = React.useState(-1)
  return (
    <>
      <motion.div initial={{opacity:0, y:20}}
                 animate={{opacity:1, y:0}} transition={{delay:.3}} className='mt-10'>
                    <h3 className="mb-4 text-xl font-bold">Results for "<span className='font-semibold text-indigo-600'>{decodeURIComponent(querry)}</span>"</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            jobsArr.map((job, i) => (
                                <>
                                <div key={i} className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                            <div className="p-5">
                                <div className="mb-4 flex items-start justify-between">
                                    <div>
                                        <h4 className="text-lg font-bold mb-1">{job.title}</h4>
                                        {job.company && <p className="text-sm text-slate-600">{job.company.display_name}</p>}
                                        {job.location && <p className="text-sm text-slate-500">{job.location.display_name}</p>}
                                    <p className='text-sm text-slate-600 mt-3'>{job?.description.slice(0, 100)}...</p>
                                    </div>
                                </div>
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {job.category && <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700">{job.category.label}</span>}
                                    {job.salary_min||job.salary_max && <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">{job.salary_min} - {job.salary_max}</span>}
                                </div>
                                <div className="flex items-center justify-between">
                                    <Link target='_blank' href={job.redirect_url} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Quick Apply</Link>
                                    <button onClick={() => setOpenIndex(i)} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Expand</button>
                                </div>
                            </div>
                        </div>
                            <JobExpand job={job} open={openIndex === i} setOpen={setOpenIndex} />
                                </>
                            ))
                        }
                    </div>
                    <Pagination  totalPages={noOfPages}  />
                </motion.div>
    </>
  )
}
