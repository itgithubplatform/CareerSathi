import Header from '@/components/layout/Header'
import JobsHeader from '@/components/sections/jobsHeader'
import JobsTrendingCatagory from '@/components/sections/jobsTrendingCatagory'
import JobsRecommendation from '@/components/sections/jobsRecommendation'
import JobsSearchResults from '@/components/sections/jobsSearchResults'
import Footer from '@/components/layout/Footer'
import { getRecommendedJobs } from '@/lib/getRecommendedJobs'

export default async function page({ searchParams }: { searchParams: any }) {
    try {
        const querry = (await searchParams).q
        const page = (await searchParams).page || 1
        if (querry) {
            const res = await fetch(`https://api.adzuna.com/v1/api/jobs/in/search/${page}?app_id=${process.env.JOB_API_APP_ID}&app_key=${process.env.JOB_API_APP_KEY}&what=${querry}&where=India&content-type=application/json`, { next: { revalidate: 86400 } })
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            const data = await res.json()
            const noOfPages = Math.ceil(data.count / 10)

            return (
                <>
                    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 pt-28'>
                        <Header />
                        <div className='mx-auto max-w-6xl'>
                            <JobsHeader />
                            <JobsTrendingCatagory querry={querry} />
                            <JobsSearchResults noOfPages={noOfPages} jobsArr={data.results} querry={querry} />
                        </div>
                    </div>
                    <Footer />
                </>
            )
        } else {
            const jobArr = await getRecommendedJobs(["js"])
            return (
                <>
                    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 pt-28'>
                        <Header />
                        <div className='mx-auto max-w-6xl'>
                            <JobsHeader />
                            <JobsTrendingCatagory querry={querry} />
                            <JobsRecommendation jobsArr={jobArr} />
                        </div>
                    </div>
                    <Footer />
                </>
            )
        }
    } catch (error) {
        throw error
    }

}
