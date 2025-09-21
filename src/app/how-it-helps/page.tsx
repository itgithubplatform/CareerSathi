'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Target, Users, Shield, Sparkles, CheckCircle, Star, MessageCircle, BarChart3, Trophy, RefreshCw, MapPin, DollarSign, Zap, Lock, Globe, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HowItHelpsPage() {
  const caseStudies = [
    {
      type: "School Student",
      name: "Priya, Class 11",
      problem: "Confused between Science PCM vs Commerce for 12th grade",
      solution: "CareerSathi analyzed her interests in problem-solving and business, recommended Commerce with Math, and created a roadmap for CA/MBA preparation.",
      outcome: "Now confidently pursuing Commerce with clear goals",
      icon: "🎓",
      color: "from-blue-500 to-purple-600"
    },
    {
      type: "Fresh Graduate",
      name: "Rahul, B.Tech Graduate",
      problem: "Torn between immediate job vs higher studies (MS/MBA)",
      solution: "AI assessment revealed his entrepreneurial mindset. Suggested 2-year work experience in startups before MBA, with specific skill development plan.",
      outcome: "Landed startup job, building experience for future MBA",
      icon: "🚀",
      color: "from-green-500 to-blue-600"
    },
    {
      type: "Working Professional",
      name: "Anita, 5 years in IT",
      problem: "Wanted career switch to Product Management but unsure about feasibility",
      solution: "Identified transferable skills, created 8-month transition roadmap with courses, projects, and networking strategy tailored for Indian market.",
      outcome: "Successfully transitioned to PM role at major fintech",
      icon: "💼",
      color: "from-purple-500 to-pink-600"
    }
  ]

  const dashboardFeatures = [
    {
      icon: Target,
      title: "Career Path Saved",
      description: "Your personalized career roadmap is always accessible, with clear milestones and next steps."
    },
    {
      icon: BarChart3,
      title: "Skill Roadmap Milestones",
      description: "Track your progress through structured learning paths with measurable goals."
    },
    {
      icon: TrendingUp,
      title: "Progress Percentage",
      description: "Visual progress tracking with detailed analytics of your career development journey."
    },
    {
      icon: RefreshCw,
      title: "Re-run Mapping Anytime",
      description: "Update your assessment as you grow and get fresh recommendations instantly."
    },
    {
      icon: MessageCircle,
      title: "Chatbot Always Accessible",
      description: "24/7 AI mentor available for guidance, doubts, and career advice."
    }
  ]

  const chatbotFeatures = [
    {
      title: "Clarifies Doubts",
      description: "Get instant answers to career questions, from course selection to job market trends.",
      icon: "💡"
    },
    {
      title: "Handles Hidden Constraints",
      description: "Understands family pressure, financial limitations, and location constraints in career planning.",
      icon: "🔍"
    },
    {
      title: "Suggests Micro-Experiments",
      description: "Try small projects and activities to test your interest in different career paths.",
      icon: "🧪"
    },
    {
      title: "Dynamic Re-mapping",
      description: "Adapts recommendations based on your changing interests, skills, and life circumstances.",
      icon: "🗺️"
    }
  ]

  const valuePoints = [
    {
      icon: Lock,
      title: "Privacy First",
      description: "Complete control over your data. Delete or export anytime. No external sharing.",
      color: "text-green-600"
    },
    {
      icon: MapPin,
      title: "India-Specific Guidance",
      description: "Salary ranges, exam prep (UPSC, NEET, JEE), and career paths tailored for Indian market.",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Grows With You",
      description: "Adapts from school to college to professional life, evolving recommendations as you grow.",
      color: "text-purple-600"
    },
    {
      icon: Trophy,
      title: "Gamified Tracking",
      description: "Progress bars, achievement streaks, and badges make career development engaging and motivating.",
      color: "text-orange-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Your AI Career Mentor
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6">
              <span className="text-gradient">How CareerSathi</span>
              <br />
              <span className="text-gray-800">Will Help You</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your personalized AI mentor for school, fresher, or professional life.
              <br />
              Real stories, real results, real career transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-gradient">
              Real Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how CareerSathi has transformed careers across different life stages
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${study.color} opacity-10 rounded-bl-full`}></div>
                
                <div className="text-4xl mb-4">{study.icon}</div>
                <div className="mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {study.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{study.name}</h3>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-red-600 mb-1">Problem:</h4>
                    <p className="text-gray-600">{study.problem}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-1">CareerSathi Solution:</h4>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-600 mb-1">Outcome:</h4>
                    <p className="text-gray-600">{study.outcome}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dashboard Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-gradient">
              Your Personal Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to track and accelerate your career growth
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {dashboardFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Chatbot Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-gradient">
              AI Chatbot That Understands You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              More than just answers—a mentor that sparks new ideas and adapts to your evolving journey.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {chatbotFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start space-x-4"
                >
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">CareerSathi AI</h4>
                    <p className="text-sm text-green-600">Online • Ready to help</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-800">
                      "I'm confused about choosing between engineering and medicine. My parents want me to be a doctor, but I love coding..."
                    </p>
                  </div>
                  
                  <div className="bg-blue-100 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      I understand this is a common dilemma. Let's explore both paths considering your interests, family expectations, and market opportunities. Can you tell me more about what specifically excites you about coding?
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Extra Value Points Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-gradient">
              Why Choose CareerSathi?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for Indian students and professionals with unique features you won't find elsewhere
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {valuePoints.map((point, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
              >
                <point.icon className={`w-12 h-12 ${point.color} mx-auto mb-6`} />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {point.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students and professionals who have already discovered their perfect career path with CareerSathi's AI guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                href="/auth/signup" 
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              {/* <Link 
                href="/assessment" 
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Take Assessment
              </Link> */}
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-blue-100">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                Free to start
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-300" />
                Privacy protected
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-green-300" />
                50,000+ students trust us
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}