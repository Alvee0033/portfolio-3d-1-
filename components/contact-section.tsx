"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Facebook, Linkedin, Send } from "lucide-react"

export function ContactSection() {
  const contactInfo = [
    {
      platform: "Email",
      value: "morsalinislamalvy@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      link: "mailto:morsalinislamalvy@gmail.com",
      color: "from-blue-500 to-cyan-500",
      shadowColor: "rgba(59,130,246,0.5)",
    },
    {
      platform: "Facebook",
      value: "alvee1177",
      icon: <Facebook className="w-5 h-5" />,
      link: "https://www.facebook.com/alvee1177/",
      color: "from-blue-600 to-indigo-600",
      shadowColor: "rgba(37,99,235,0.5)",
    },
    {
      platform: "LinkedIn",
      value: "morsalin-islam-alvy",
      icon: <Linkedin className="w-5 h-5" />,
      link: "https://www.linkedin.com/in/morsalin-islam-alvy-777b29310/",
      color: "from-blue-700 to-blue-900",
      shadowColor: "rgba(29,78,216,0.5)",
    },
  ]

  const formContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const formItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const contactContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const contactItem = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 },
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
            Get In Touch
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={formContainer} initial="hidden" animate="show">
              <motion.h3 className="text-xl font-semibold text-white mb-4" variants={formItem}>
                Send Me a Message
              </motion.h3>
              <form className="space-y-4">
                <motion.div variants={formItem}>
                  <Input
                    placeholder="Your Name"
                    className="bg-black/30 border-purple-500/30 focus:border-purple-500/50 focus:ring-purple-500/30 transition-all duration-300"
                  />
                </motion.div>
                <motion.div variants={formItem}>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="bg-black/30 border-purple-500/30 focus:border-purple-500/50 focus:ring-purple-500/30 transition-all duration-300"
                  />
                </motion.div>
                <motion.div variants={formItem}>
                  <Textarea
                    placeholder="Your Message"
                    className="bg-black/30 border-purple-500/30 focus:border-purple-500/50 focus:ring-purple-500/30 min-h-[120px] transition-all duration-300"
                  />
                </motion.div>
                <motion.div variants={formItem}>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-[0_0_15px_rgba(139,92,246,0.3)] group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            <motion.div variants={contactContainer} initial="hidden" animate="show">
              <motion.h3 className="text-xl font-semibold text-white mb-4" variants={contactItem}>
                Contact Information
              </motion.h3>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg border border-purple-500/20 bg-black/30 hover:bg-black/50 transition-colors duration-300"
                    variants={contactItem}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: `0 0 15px ${contact.shadowColor}`,
                    }}
                  >
                    <div className={`p-2 rounded-full bg-gradient-to-r ${contact.color} mr-4`}>{contact.icon}</div>
                    <div>
                      <p className="text-sm text-gray-400">{contact.platform}</p>
                      <p className="text-white">{contact.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

