"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Check for touch device
    if (typeof window !== "undefined") {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)

      const mouseMove = (e: MouseEvent) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        })
      }

      const handleMouseDown = () => setCursorVariant("click")
      const handleMouseUp = () => setCursorVariant("default")
      const handleMouseEnter = () => (document.body.style.cursor = "none")
      const handleMouseLeave = () => (document.body.style.cursor = "auto")

      if (!isTouchDevice) {
        window.addEventListener("mousemove", mouseMove)
        window.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mouseup", handleMouseUp)
        document.body.addEventListener("mouseenter", handleMouseEnter)
        document.body.addEventListener("mouseleave", handleMouseLeave)
      } else {
        document.body.style.cursor = "auto"
      }

      return () => {
        window.removeEventListener("mousemove", mouseMove)
        window.removeEventListener("mousedown", handleMouseDown)
        window.removeEventListener("mouseup", handleMouseUp)
        document.body.removeEventListener("mouseenter", handleMouseEnter)
        document.body.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isTouchDevice])

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "rgba(145, 94, 255, 0.5)",
      mixBlendMode: "screen" as const,
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(145, 94, 255, 0.8)",
      mixBlendMode: "screen" as const,
    },
  }

  // Don't render on touch devices or during server-side rendering
  if (isTouchDevice || typeof window === "undefined") {
    return null
  }

  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="cursor-glow fixed w-64 h-64 rounded-full pointer-events-none z-40 opacity-20 bg-gradient-to-r from-purple-500 to-blue-500 blur-3xl"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />
    </>
  )
}

export default MouseFollower

