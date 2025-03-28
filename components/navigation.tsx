"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const sections = [
    { id: "bio", label: "Bio" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-20 flex justify-center p-6 pointer-events-auto"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex space-x-2 bg-black/30 backdrop-blur-md p-2 rounded-full border border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "ghost"}
            className={`rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                : "text-white hover:bg-white/10 hover:shadow-[0_0_10px_rgba(139,92,246,0.3)]"
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            <span className="relative">
              {section.label}
              {activeSection === section.id && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 top-full block h-[2px] w-full bg-gradient-to-r from-purple-500 to-blue-500"
                />
              )}
            </span>
          </Button>
        ))}
      </div>
    </motion.nav>
  )
}

