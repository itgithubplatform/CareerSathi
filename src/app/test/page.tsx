import { askVertex, textEmbedding } from '@/lib/vertex'
import React from 'react'

export default async function page() {
    const res = await textEmbedding("What is the latest iPhone model?")
    console.log(res.response);
    
  return (
    <div>
      done
    </div>
  )
}
