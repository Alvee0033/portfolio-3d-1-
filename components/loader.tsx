"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Loader() {
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState("Loading")
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Set window size only on client side
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return newProgress
      })
    }, 30)

    const textInterval = setInterval(() => {
      setText((prev) => {
        if (prev === "Loading...") return "Loading"
        return prev + "."
      })
    }, 500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-8">
          Morsalin Islam Alvee
        </h1>

        <div className="relative w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="text-white text-lg">{text}</div>
          <div className="text-white text-lg">{progress}%</div>
        </div>
      </motion.div>

      {/* Animated background elements - only render on client side */}
      {typeof window !== "undefined" && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-purple-500 opacity-50"
              initial={{
                x: Math.random() * (windowSize.width || 1000),
                y: Math.random() * (windowSize.height || 800),
                scale: 0,
              }}
              animate={{
                y: [Math.random() * (windowSize.height || 800), Math.random() * (windowSize.height || 800)],
                scale: [0, 1.5, 0],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

