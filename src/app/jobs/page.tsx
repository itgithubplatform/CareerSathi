import Header from '@/components/layout/Header'
import JobsHeader from '@/components/sections/jobsHeader'
import JobsTrendingCatagory from '@/components/sections/jobsTrendingCatagory'
import JobsRecommendation from '@/components/sections/jobsRecommendation'

export default async function page({searchParams}:{searchParams:any}) {
   const querry = (await searchParams).q
   
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 pt-28'>
            <Header />
            <div className='mx-auto max-w-6xl'>
                <JobsHeader/>
                <JobsTrendingCatagory querry={querry}/>
                {querry ?null: <JobsRecommendation/>}
                </div>
            </div>
            )
}
