import Header from '@/components/layout/Header'
import UserProgressDashboard from '@/components/dashboard/UserProgressDashboard'
import DailyQuestions from '@/components/dashboard/dailyQuestions'
import TodaysGoal from '@/components/dashboard/todaysGoal'
import QuickActions from '@/components/dashboard/quickActions'
import WelconeText from '@/components/dashboard/welconeText'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import DashboardRoadmapCard from '@/components/dashboard/dashboardRoadmapCard'
import DashboardRecommendedJobs from '@/components/dashboard/dashboardRecommendedJobs'
import Footer from '@/components/layout/Footer'


export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return <div className='text-red-500 flex justify-center items-center h-screen'>no session</div>
  }
  try {
    const roadmaps = await prisma.roadmap.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        skillsToLearn: true,
        recommendedProjects: true
      }
    })
    return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <WelconeText />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-6 ">
            <UserProgressDashboard />
              <QuickActions />
            </div>
            <div className="grid grid-cols-1 gap-6 ">
             <TodaysGoal />
            <DailyQuestions />
            </div>

            {/* Goals + Jobs */}
              {/* Today's Goal */}
          {/* Quick Actions */}
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Career Roadmap */}
            <DashboardRoadmapCard roadmaps={roadmaps} />
            {/* Sidebar */}
           <DashboardRecommendedJobs />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
  } catch (error) {
    throw error
  }
}