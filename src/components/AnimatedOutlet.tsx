import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useRouterState } from "@tanstack/react-router";

const pageTransition = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -2,
    transition: { duration: 0.12, ease: [0.4, 0, 1, 1] as const },
  },
};

export default function AnimatedOutlet() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ minHeight: "100vh" }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
