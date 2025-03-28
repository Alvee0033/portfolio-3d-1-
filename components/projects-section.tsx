"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Cpu, Film, CuboidIcon as Cube, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Website",
      description: "A fully responsive e-commerce platform built with React and Node.js",
      category: "Web Development",
      icon: <Code className="w-6 h-6 text-red-400" />,
      color: "from-red-500 to-orange-500",
      shadowColor: "rgba(239,68,68,0.5)",
    },
    {
      title: "Smart Home System",
      description: "IoT-based home automation system using Arduino and sensors",
      category: "IoT & Robotics",
      icon: <Cpu className="w-6 h-6 text-green-400" />,
      color: "from-green-500 to-teal-500",
      shadowColor: "rgba(34,197,94,0.5)",
    },
    {
      title: "3D Character Animation",
      description: "Animated 3D character models for a short film project",
      category: "3D Modeling",
      icon: <Cube className="w-6 h-6 text-blue-400" />,
      color: "from-blue-500 to-indigo-500",
      shadowColor: "rgba(59,130,246,0.5)",
    },
    {
      title: "Motion Graphics Intro",
      description: "Dynamic intro animation for a YouTube channel using After Effects",
      category: "Video Editing",
      icon: <Film className="w-6 h-6 text-yellow-400" />,
      color: "from-yellow-500 to-amber-500",
      shadowColor: "rgba(234,179,8,0.5)",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full px-4 md:px-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-4xl bg-black/40 backdrop-blur-md border border-purple-500/20 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
        <CardContent className="p-6 md:p-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Projects
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-purple-500/20 p-6 bg-black/30 hover:bg-black/50 transition-colors duration-300"
                variants={item}
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 0 20px ${project.shadowColor}`,
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0`}
                />
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="mr-3 p-2 rounded-full bg-gray-800/80">{project.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                      <p className="text-xs text-gray-400">{project.category}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" /> View Project
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

