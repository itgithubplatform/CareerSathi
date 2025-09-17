"use client"
import { parseJDToHTML } from '@/lib/parseJDToHTML';
import { JobType } from '@/types/jobsType';
import Link from 'next/link';
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function JobExpand({ job, open, setOpen }: { job: JobType, open: boolean, setOpen: React.Dispatch<React.SetStateAction<number>> }) {
  return (
    open && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={(e) => {
        setOpen(-1)
      }} className='fixed top-0 left-0 h-screen w-full bg-black/40 z-50 flex justify-center items-center'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onClick={(e) => {
        e.stopPropagation();}} className='h-auto pb-10 max-w-xl bg-white rounded-xl shadow-lg shadow-black/60 z-50 py-2 p-7 relative'>
          <button onClick={() => setOpen(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-5 right-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className='max-w-2xl w-full'>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h4 className="text-lg font-bold mb-1">{job.title}</h4>
                {job.company && <p className="text-sm text-slate-600"><strong>Company:</strong> {job.company.display_name}</p>}
                {job.location && <p className="text-sm text-slate-500"><strong>Location: </strong>{job.location.display_name}</p>}
               <div dangerouslySetInnerHTML={{ __html: job.description ? parseJDToHTML(job.description) : "" }} className="text-sm text-slate-600 mt-5 list-disc "/>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {job.category && <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700">{job.category.label}</span>}
              {job.salary_min || job.salary_max && <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">{job.salary_min} - {job.salary_max}</span>}
            </div>
            <div className="flex items-center justify-between">
              <Link target='_blank' href={job.redirect_url} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Quick Apply</Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  )
}
