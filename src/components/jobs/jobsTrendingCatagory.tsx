"use client"
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
const trendingCat = [
"Software Engineering",
"Data Science",
"Product Management",
"Design",
"Marketing",
"UX/UI Design"
]
export default function JobsTrendingCatagory({querry}:{querry:string}) {
    useEffect(() => {
        console.log();
    },[querry])
  return (
    <>
      <motion.div initial={{opacity:0, y:20}}
                animate={{opacity:1, y:0}}
                transition={{delay:.3}}
                className="mt-8">
                    <h3 className="mb-4 text-xl font-bold">Trending Job Categories</h3>
                    <div className="flex flex-wrap gap-3">
                        {
                            trendingCat.map((cat, i) => (
                                <Link href={`/jobs?q=${cat}`} key={i} className={`rounded-full  px-4 py-2 text-sm font-medium    ${decodeURIComponent(querry) === cat ? "text-blue-600 bg-transparent" : "text-slate-700 bg-slate-200 hover:bg-slate-300"}`}>{cat}</Link>
                            ))
                        }                        
                    </div>
                </motion.div>
    </>
  )
}
