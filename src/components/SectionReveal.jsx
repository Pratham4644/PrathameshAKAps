import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function RevealGroup({ children, className, ...props }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reducedMotion ? 0 : 0.08 },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const RevealItem = forwardRef(function RevealItem(
  { as = "div", children, className, ...props },
  ref
) {
  const reducedMotion = useReducedMotion();
  const MotionElement = motion[as];

  return (
    <MotionElement
      className={className}
      ref={ref}
      variants={{
        hidden: reducedMotion ? {} : { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reducedMotion ? 0 : 0.4,
            ease: "easeOut",
          },
        },
      }}
      {...props}
    >
      {children}
    </MotionElement>
  );
});

export default function SectionReveal({ children, className, ...props }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reducedMotion ? 0 : 0.4,
            ease: "easeOut",
            staggerChildren: reducedMotion ? 0 : 0.08,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
