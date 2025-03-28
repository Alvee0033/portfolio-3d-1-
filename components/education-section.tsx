"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, School } from "lucide-react"

export function EducationSection() {
  const education = [
    {
      institution: "Noakhali Science and Technology University",
      degree: "Bachelor of Science in Software Engineering",
      period: "Current",
      icon: <GraduationCap className="w-8 h-8 text-blue-400" />,
    },
    {
      institution: "Mymensingh Cantonment Public School and College",
      degree: "Higher Secondary Certificate",
      period: "Completed",
      icon: <School className="w-8 h-8 text-green-400" />,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full px-4 md:px-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-3xl bg-black/40 backdrop-blur-md border border-purple-500/20 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
        <CardContent className="p-6 md:p-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Education
          </motion.h2>

          <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
            {education.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border border-purple-500/20 bg-black/30 hover:bg-black/50 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                variants={item}
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-3 rounded-full bg-gray-800/80 flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.institution}</h3>
                  <p className="text-gray-300">{item.degree}</p>
                  <p className="text-sm text-gray-400 mt-1">{item.period}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

