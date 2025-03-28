"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function ProfileSection() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full px-4 md:px-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-3xl bg-black/40 backdrop-blur-md border border-purple-500/20 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-primary relative group">
                <img src="/profile-image.png" alt="Morsalin Islam Alvee" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Morsalin Islam Alvee</span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-50" />

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
            </motion.div>

            <div className="text-center md:text-left">
              <motion.h1
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Morsalin Islam Alvee
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 mt-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Software Engineer
              </motion.p>

              <motion.p
                className="mt-4 text-gray-400 max-w-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                I am a passionate software engineer with expertise in web development, 3D modeling, IoT, and creative
                design. I love building innovative solutions and creating immersive digital experiences that solve
                real-world problems.
              </motion.p>

              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

