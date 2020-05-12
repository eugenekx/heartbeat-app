import React from 'react'
import { motion } from 'framer-motion'

export function MountTransition({
  children,
  slide = 0,
  slideUp = 0,
}) {
    return (
        <div className="landing-bg">
        <motion.div
            exit={{ opacity: 0, x: slide, y: -slideUp, scale: 0.8 }}
            initial={{ opacity: 0, x: slide, y: slideUp, scale: 1 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        >
    {children}
  </motion.div> 
  </div>
    )
} 