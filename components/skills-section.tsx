"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Cpu, Film, CuboidIcon as Cube } from "lucide-react"

export function SkillsSection() {
  const skills = [
    {
      category: "Web Development",
      items: ["HTML", "CSS", "JavaScript"],
      icon: <Code className="w-8 h-8 text-red-400" />,
      color: "from-red-500 to-orange-500",
      shadowColor: "rgba(239,68,68,0.5)",
    },
    {
      category: "3D Modeling & Animation",
      items: ["3D Modeling", "Animation", "Rendering"],
      icon: <Cube className="w-8 h-8 text-blue-400" />,
      color: "from-blue-500 to-indigo-500",
      shadowColor: "rgba(59,130,246,0.5)",
    },
    {
      category: "IoT & Arduino Robotics",
      items: ["Arduino", "Sensors", "Robotics"],
      icon: <Cpu className="w-8 h-8 text-green-400" />,
      color: "from-green-500 to-teal-500",
      shadowColor: "rgba(34,197,94,0.5)",
    },
    {
      category: "Video Editing & Motion Graphics",
      items: ["After Effects", "Motion Graphics", "Video Editing"],
      icon: <Film className="w-8 h-8 text-yellow-400" />,
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
            transition={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Skills
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden rounded-lg border border-${skill.color.split("-")[1]}-500/30 p-6`}
                variants={item}
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 0 20px ${skill.shadowColor}`,
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-5 z-0`} />
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-2 rounded-full bg-gray-800/80">{skill.icon}</div>
                    <h3 className="text-xl font-semibold text-white">{skill.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {skill.items.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <span className={`w-2 h-2 bg-gradient-to-r ${skill.color} rounded-full mr-2`}></span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

