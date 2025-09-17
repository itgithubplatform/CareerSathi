"use client";
import React from 'react'
import { motion, Variants } from 'framer-motion';
import { Roadmap } from '@/types/roadmap';
import RenderRoadmapHeader from './renderRoadmapHeader';
import RenderRoadmapSkills from './renderRoadmapSkills';
import RenderRoadmapProjects from './RenderRoadmapProjects';

const containerVariants:Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants:Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants:Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function RenderRoadmap({ roadmap }: { roadmap: Roadmap }) {
 
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8"
    >
      {/* Header Card */}
      <RenderRoadmapHeader itemVariants={itemVariants} cardVariants={cardVariants} roadmap={roadmap} />
      {/* Skills Section */}
      <RenderRoadmapSkills itemVariants={itemVariants} roadmap={roadmap} containerVariants={containerVariants} />
      {/* Projects Section */}
      <RenderRoadmapProjects itemVariants={itemVariants} roadmap={roadmap} containerVariants={containerVariants} />
    </motion.div>
  );
}
