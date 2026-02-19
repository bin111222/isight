"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import React from "react";

export interface ImageRevealProps {
  leftImage: string;
  middleImage: string;
  rightImage: string;
  leftAlt?: string;
  middleAlt?: string;
  rightAlt?: string;
  className?: string;
}

export default function ImageReveal({
  leftImage,
  middleImage,
  rightImage,
  leftAlt = "Clinic photo",
  middleAlt = "Clinic photo",
  rightAlt = "Clinic photo",
  className = "",
}: ImageRevealProps) {
  const containerVariants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const leftImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: {
      rotate: -8,
      x: -150,
      y: 10,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 12,
      },
    },
    hover: {
      rotate: 1,
      x: -160,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const middleImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: {
      rotate: 6,
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 12,
      },
    },
    hover: {
      rotate: 0,
      x: 0,
      y: -10,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const rightImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: {
      rotate: -6,
      x: 200,
      y: 20,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 12,
      },
    },
    hover: {
      rotate: 3,
      x: 200,
      y: 10,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const imageClass = "object-cover rounded-[10px]";
  const boxClass = "absolute w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 overflow-hidden rounded-xl shadow-lg bg-white";

  return (
    <motion.div
      className={`relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 my-8 ${className}`.trim()}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Left Image - Highest z-index (front) */}
      <motion.div
        className={`${boxClass} origin-bottom-right`}
        variants={leftImageVariants}
        whileHover="hover"
        animate="animate"
        style={{ zIndex: 30 }}
      >
        <Image
          src={leftImage}
          alt={leftAlt}
          fill
          className={imageClass}
          sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 192px"
        />
      </motion.div>

      {/* Middle Image - Middle z-index */}
      <motion.div
        className={`${boxClass} origin-bottom-left`}
        variants={middleImageVariants}
        whileHover="hover"
        animate="animate"
        style={{ zIndex: 20 }}
      >
        <Image
          src={middleImage}
          alt={middleAlt}
          fill
          className={imageClass}
          sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 192px"
        />
      </motion.div>

      {/* Right Image - Lowest z-index (back) */}
      <motion.div
        className={`${boxClass} origin-bottom-right`}
        variants={rightImageVariants}
        whileHover="hover"
        animate="animate"
        style={{ zIndex: 10 }}
      >
        <Image
          src={rightImage}
          alt={rightAlt}
          fill
          className={imageClass}
          sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 192px"
        />
      </motion.div>
    </motion.div>
  );
}
