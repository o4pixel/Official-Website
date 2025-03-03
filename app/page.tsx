"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Twitter, Github, Mail } from "lucide-react"
import Link from "next/link"
import StarryBackground from "@/components/starry-background"
import { DiscordIcon } from "@/components/discord-icon"

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    // Staggered animations
    const welcomeTimer = setTimeout(() => setShowWelcome(true), 500)
    const nameTimer = setTimeout(() => setShowName(true), 1500)
    const buttonsTimer = setTimeout(() => setShowButtons(true), 2500)

    return () => {
      clearTimeout(welcomeTimer)
      clearTimeout(nameTimer)
      clearTimeout(buttonsTimer)
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-black text-white">
      <StarryBackground />

      <div className="z-10 flex flex-col items-center justify-center px-4 text-center">
        {showWelcome && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-lg md:text-xl text-gray-300 mb-2"
          >
            Welcome to:
          </motion.p>
        )}

        {showName && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-12 tracking-wider text-glow"
          >
            o4pixel
          </motion.h1>
        )}

        {showButtons && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-2 gap-4 md:gap-6 max-w-md w-full"
          >
            <SocialButton href="https://twitter.com/o4pixel" icon={<Twitter className="h-6 w-6" />} label="@o4pixel" />
            <SocialButton
              href="#"
              icon={<DiscordIcon className="h-6 w-6" />}
              label="o4pixel"
              onClick={() => {
                navigator.clipboard.writeText("o4pixel")
                alert("Discord username copied to clipboard!")
              }}
            />
            <SocialButton
              href="https://github.com/o4pixel"
              icon={<Github className="h-6 w-6" />}
              label="GitHub"
              iconAbove
            />
            <SocialButton
              href="mailto:o4pixel@gmail.com"
              icon={<Mail className="h-6 w-6" />}
              label="o4pixel@gmail.com"
            />
          </motion.div>
        )}
      </div>
    </main>
  )
}

interface SocialButtonProps {
  href: string
  icon: React.ReactNode
  label: string
  fullIcon?: boolean
  iconAbove?: boolean
  onClick?: () => void
}

function SocialButton({ href, icon, label, fullIcon = false, iconAbove = false, onClick }: SocialButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault()
          onClick()
        }
      }}
      className="group"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center bg-white/10 backdrop-blur-md rounded-xl p-4 h-24 border border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden relative"
      >
        {fullIcon ? (
          <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
            {icon}
          </div>
        ) : null}
        <div className="flex flex-col items-center justify-center z-10">
          {!fullIcon && !iconAbove && <div className="mb-2">{icon}</div>}
          {iconAbove && <div className="mb-2">{icon}</div>}
          <p className="text-sm font-medium">{label}</p>
        </div>
      </motion.div>
    </Link>
  )
}

