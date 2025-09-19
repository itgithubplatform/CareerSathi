'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Brain, Target, Users, Shield, Sparkles, CheckCircle, Star, Quote } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FeatureCard from '@/components/ui/FeatureCard'
import TestimonialCard from '@/components/ui/TestimonialCard'
import StatsCounter from '@/components/ui/StatsCounter'

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

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your skills, interests, and market trends to provide personalized career recommendations.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Target,
      title: "Personalized Roadmaps",
      description: "Get step-by-step career paths tailored to your unique profile and aspirations in the Indian job market.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Users,
      title: "Industry Insights",
      description: "Access real-time data on job market trends, salary expectations, and skill demands across industries.",
      color: "from-pink-500 to-red-600"
    },
    {
      icon: Sparkles,
      title: "Skill Gap Analysis",
      description: "Identify exactly what skills you need to develop to reach your dream career goals.",
      color: "from-orange-500 to-yellow-600"
    }
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at TCS",
      content: "CareerSathi helped me transition from mechanical engineering to software development. The personalized roadmap was incredibly detailed!",
      rating: 5,
      avatar: "/api/placeholder/64/64"
    },
    {
      name: "Rahul Gupta",
      role: "Data Scientist at Flipkart",
      content: "The AI recommendations were spot-on. I discovered career paths I never knew existed and got the skills needed to land my dream job.",
      rating: 5,
      avatar: "/api/placeholder/64/64"
    },
    {
      name: "Ananya Patel",
      role: "Product Manager at Zomato",
      content: "As a commerce student, I was confused about tech careers. CareerSathi's guidance helped me become a successful product manager.",
      rating: 5,
      avatar: "/api/placeholder/64/64"
    }
  ]

  const stats = [
    { number: 50000, label: "Students Guided", suffix: "+" },
    { number: 95, label: "Success Rate", suffix: "%" },
    { number: 200, label: "Career Paths", suffix: "+" },
    { number: 24, label: "Support Available", suffix: "/7" }
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
              Powered by Google Cloud AI
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6">
              <span className="text-gradient">CareerSathi</span>
              <br />
              <span className="text-gray-800">Your Trusted Friend in</span>
              <br />
              <span className="text-gradient">Shaping Tomorrow's Career</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Personalized AI Career & Skills Advisor designed specifically for Indian students. 
              Navigate your career journey with confidence and precision.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link href="/auth/signup" className="btn-primary group">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/how-it-helps" className="btn-secondary">
                How It Helps
              </Link>
              <Link href="/assessment" className="px-6 py-3 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Take Assessment
              </Link>
            </motion.div>
            
            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500"
            >
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-500" />
                Data Privacy Protected
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                Built with Google Cloud
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-purple-500" />
                For Indian Students
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-bounce-slow"></div>
        <div className="absolute top-40 right-10 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce-slow"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-gradient">
              About CareerSathi
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              CareerSathi is India's first AI-powered career advisor designed specifically for students and professionals. 
              We understand the unique challenges of the Indian education system, family expectations, and job market dynamics. 
              Our mission is to democratize career guidance and make personalized mentorship accessible to every Indian student.
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <StatsCounter key={index} {...stat} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-gradient">
              Why Choose CareerSathi?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform combines cutting-edge technology with deep understanding 
              of the Indian job market to provide unparalleled career guidance.
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Your Journey to Success Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-gradient">
              Your Journey to Success
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              From confusion to clarity, from dreams to reality. Experience the complete transformation process that has helped 50,000+ students find their perfect career path.
            </p>
          </motion.div>
          
          {/* Interactive Journey Flow */}
          <div className="relative">
            {/* Journey Path Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid md:grid-cols-5 gap-8 relative z-10">
              {[
                {
                  phase: "Discovery",
                  title: "Smart Assessment",
                  description: "22-question AI assessment covering personality, skills, interests, and goals",
                  icon: "🎯",
                  color: "from-blue-500 to-blue-600",
                  features: ["Personality Analysis", "Skill Mapping", "Interest Profiling"]
                },
                {
                  phase: "Analysis",
                  title: "AI Processing",
                  description: "Google Cloud Vertex AI analyzes your profile against 200+ career paths and market data",
                  icon: "🤖",
                  color: "from-purple-500 to-purple-600",
                  features: ["Market Analysis", "Skill Gap Detection", "Career Matching"]
                },
                {
                  phase: "Recommendation",
                  title: "Personalized Results",
                  description: "Get 3-5 career matches with detailed roadmaps, salary insights, and growth potential",
                  icon: "📊",
                  color: "from-green-500 to-green-600",
                  features: ["Career Matches", "Salary Insights", "Growth Projections"]
                },
                {
                  phase: "Planning",
                  title: "Action Roadmap",
                  description: "Step-by-step learning path with courses, projects, and milestones tailored for you",
                  icon: "🗺️",
                  color: "from-orange-500 to-orange-600",
                  features: ["Learning Path", "Project Ideas", "Skill Development"]
                },
                {
                  phase: "Success",
                  title: "Continuous Support",
                  description: "24/7 AI mentor, progress tracking, and career guidance as you grow and evolve",
                  icon: "🚀",
                  color: "from-pink-500 to-pink-600",
                  features: ["AI Mentoring", "Progress Tracking", "Career Updates"]
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative"
                >
                  {/* Journey Node */}
                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 relative">
                    {/* Phase Badge */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className={`px-3 py-1 bg-gradient-to-r ${item.color} text-white text-xs font-semibold rounded-full shadow-lg`}>
                        {item.phase}
                      </span>
                    </div>
                    
                    {/* Icon */}
                    <div className="text-4xl mb-4 text-center">{item.icon}</div>
                    
                    {/* Content */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 text-center leading-relaxed">{item.description}</p>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      {item.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-700">
                          <div className={`w-2 h-2 bg-gradient-to-r ${item.color} rounded-full mr-2 flex-shrink-0`}></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Connection Arrow (Desktop) */}
                  {index < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center shadow-lg`}>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Success Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Journey Success Metrics</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { metric: "95%", label: "Success Rate", desc: "Students achieve career goals" },
                { metric: "3-6", label: "Months Average", desc: "Time to career clarity" },
                { metric: "200+", label: "Career Paths", desc: "Available recommendations" },
                { metric: "24/7", label: "AI Support", desc: "Always available guidance" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">{stat.metric}</div>
                  <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Interactive Demo Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/assessment" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Your Journey Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <p className="text-sm text-gray-600 mt-3">Takes only 10 minutes • Completely free • Instant results</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-gradient">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students who transformed their careers with CareerSathi
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Shape Your Future?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have already discovered their perfect career path. 
              Start your journey today with CareerSathi.
            </p>
            <Link href="/auth/signup" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}