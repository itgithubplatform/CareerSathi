"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useRouter } from 'nextjs-toploader/app'

export default function JobsHeader() {
    const router = useRouter()
    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()        
        router.push(`/jobs?q=${e.currentTarget.q.value}`)
    }
  return (
    <>
      <div className='flex flex-1 justify-center '>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Explore Jobs</h2>
                        <p className="mt-2 text-base md:text-lg text-center text-slate-600">Discover new opportunities and find your next career move.</p>
                    </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className='flex flex-1 items-center justify-center mt-10'>
                    <form onSubmit={onSubmit} className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 mx-4">
                        <div className="relative w-full max-w-4xl">
                            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                            <input
                                name='q'
                                placeholder="Search for jobs"
                                type="text"
                                className="w-full py-2 pl-10 pr-4 border border-slate-300 rounded-lg  text-sm md:text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2 text-sm md:text-lg bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600  transition-all duration-200 hover:scale-105 hover:shadow-lg"
                        >
                            Search
                        </button>
                    </form>
                </motion.div>
    </>
  )
}
