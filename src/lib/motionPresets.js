/** Shared motion presets — calm, premium feel */
export const easeOut = [0.25, 0.1, 0.25, 1];
export const easePremium = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easePremium },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const hoverLift = {
  y: -2,
  transition: { duration: 0.35, ease: easePremium },
};

/** Glass cards — soft shadow on hover */
export const glassCardHover = {
  y: -2,
  boxShadow: '0 12px 36px -12px rgba(109, 94, 243, 0.18)',
  transition: { duration: 0.35, ease: easePremium },
};
