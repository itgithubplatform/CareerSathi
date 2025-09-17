import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import React from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <>
     <Header />
     <div className='pt-24 pb-20 bg-gradient-to-br from-blue-50 to-purple-50'>
     {children}
     </div>
     <Footer /> 
    </>
  )
}
