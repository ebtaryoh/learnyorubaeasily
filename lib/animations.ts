export const EASING = {
  standard: [0.22, 1, 0.36, 1], // Custom refined spring-like curve
  smooth: [0.16, 1, 0.3, 1],
  expressive: [0.34, 1.56, 0.64, 1],
  entrance: [0.0, 0.0, 0.2, 1],
  exit: [0.4, 0.0, 1, 1],
}

export const DURATION = {
  micro: 0.2,
  small: 0.3,
  medium: 0.5,
  large: 0.8,
  cinematic: 1.2,
}

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: DURATION.large, ease: EASING.standard } 
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
}

export const cardHoverVariants = {
  rest: { 
    scale: 1, 
    y: 0,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" 
  },
  hover: { 
    scale: 1.015, 
    y: -4,
    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    transition: { duration: DURATION.small, ease: EASING.standard }
  }
}

export const imageZoomVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.03,
    transition: { duration: DURATION.medium, ease: EASING.smooth }
  }
}

export const revealMaskVariants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  visible: { 
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: DURATION.cinematic, ease: EASING.smooth }
  }
}
