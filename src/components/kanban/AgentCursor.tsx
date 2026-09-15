"use client";

import * as React from "react";
import { motion, useMotionValue } from "framer-motion";
import agentCursor from "@/assets/isla_agent.svg.asset.json";

export type CursorPhase = "idle" | "approach" | "grab" | "drag" | "release";

/**
 * Visual overlay: the "Isla Agent" cursor.
 *
 * The position is integrated every frame with time-based exponential smoothing,
 * so there is never a teleport, snap or keyframe boundary: the cursor eases
 * toward the card while approaching and stays glued to it from grab through
 * release, as a single continuous motion.
 *
 * The anchor point is derived from the card's *center* (invariant under the
 * lift scale/rotate) plus its untransformed layout height, so the tilt applied
 * when the card is grabbed cannot shift the cursor.
 */
export function AgentCursor({
  boardRef,
  targetId,
  phase,
}: {
  boardRef: React.RefObject<HTMLDivElement | null>;
  targetId: string | null;
  phase: CursorPhase;
}) {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const [visible, setVisible] = React.useState(false);
  const placedRef = React.useRef(false);
  const targetRef = React.useRef<string | null>(targetId);
  targetRef.current = targetId;
  const phaseRef = React.useRef<CursorPhase>(phase);
  phaseRef.current = phase;

  React.useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let stopped = false;
    let last = performance.now();

    const tick = (now: number) => {
      if (stopped) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;

      const id = targetRef.current;
      if (id) {
        const node = board.querySelector<HTMLElement>(`[data-lead="${id}"]`);
        if (node) {
          const bRect = board.getBoundingClientRect();
          const scale = bRect.width / (board.offsetWidth || 1) || 1;
          const r = node.getBoundingClientRect();
          // Center is stable under the grab tilt/lift (transform-origin: center).
          const cx = (r.left + r.width / 2 - bRect.left) / scale;
          const cy = (r.top + r.height / 2 - bRect.top) / scale;
          const nx = cx;
          const ny = cy - node.offsetHeight / 2 + 26;

          if (!placedRef.current) {
            placedRef.current = true;
            x.set(nx);
            y.set(ny);
            setVisible(true);
          } else {
            const p = phaseRef.current;
            // Loose while approaching (natural accel/decel), tight while the
            // card is held so hand and card read as one object.
            const tau = p === "grab" || p === "drag" || p === "release" ? 0.05 : 0.24;
            const a = 1 - Math.exp(-dt / tau);
            x.set(x.get() + (nx - x.get()) * a);
            y.set(y.get() + (ny - y.get()) * a);
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
    };
  }, [boardRef, x, y]);

  const gripping = phase === "grab" || phase === "drag";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-40 origin-top-left"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0, scale: gripping ? 0.94 : 1 }}
      transition={{
        opacity: { duration: 0.35 },
        scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <img src={agentCursor.url} alt="" width={148} height={33} draggable={false} />
    </motion.div>
  );
}

export default AgentCursor;
