/** Shared motion presets — subtle, founder-premium feel */
export const easeOut = [0, 0, 0.2, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const hoverLift = {
  scale: 1.02,
  transition: { duration: 0.3, ease: easeOut },
};

/** Glass cards — glow shadow on hover (300ms ease-out) */
export const glassCardHover = {
  scale: 1.02,
  boxShadow: '0 10px 40px rgba(109, 94, 243, 0.25)',
  transition: { duration: 0.3, ease: easeOut },
};
