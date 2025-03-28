"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface MobileNavProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function MobileNav({ activeSection, setActiveSection }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sections = [
    { id: "bio", label: "Bio" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsOpen(false)
  }

  return (
    <>
      <motion.button
        className="fixed top-4 right-4 z-50 p-2 bg-black/30 backdrop-blur-md rounded-full border border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.3)] pointer-events-auto"
        onClick={toggleMenu}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex flex-col space-y-4 w-64"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Button
                    variant={activeSection === section.id ? "default" : "ghost"}
                    className={`w-full py-6 text-lg ${
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                        : "text-white hover:bg-white/10"
                    }`}
                    onClick={() => handleSectionClick(section.id)}
                  >
                    {section.label}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

