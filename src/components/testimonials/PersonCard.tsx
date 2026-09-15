import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Person } from "./people";

type Props = {
  person: Person;
  index: number;
  /** offset from container center, in px */
  x: number;
  y: number;
  rotate?: number;
  z?: number;
  size?: number;
};

export function PersonCard({
  person,
  index,
  x,
  y,
  rotate = 0,
  z = 0,
  size = 120,
}: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  // Parallax: cursor offset → small translate
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 200, damping: 20, mass: 0.4 });
  const px = useTransform(sx, (v) => v * 8);
  const py = useTransform(sy, (v) => v * 8);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const height = size * 1.35;

  return (
    // Outer wrapper: positions the card absolutely (NOT animated by framer)
    <div
      className="absolute"
      style={{
        left: `calc(50% + ${x}px - ${size / 2}px)`,
        top: `calc(50% + ${y}px - ${height / 2}px)`,
        width: size,
        height,
        zIndex: z,
      }}
    >
      {/* Entrance animation layer (only opacity + scale + rotate) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0, rotate }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          delay: 0.15 + index * 0.07,
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-full w-full"
      >
        {/* Parallax + hover layer */}
        <motion.a
          ref={ref}
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{ x: px, y: py }}
          className="group block h-full w-full cursor-pointer rounded-2xl shadow-[0_10px_40px_-18px_rgba(15,23,42,0.35)] ring-1 ring-slate-200 transition-shadow duration-300 hover:z-50 hover:shadow-[0_20px_60px_-10px_rgba(0,191,255,0.4)] hover:ring-isla-cyan/40 dark:shadow-none dark:ring-[#2C2C2C]"
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-800"
            style={{
              backgroundImage: `url(${person.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 rounded-md bg-white/85 px-2 py-1 backdrop-blur-sm dark:bg-[#111111]/85">
              <span className="truncate text-[11px] font-medium text-slate-900 dark:text-white">
                {person.name}
              </span>
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            </div>
          </div>
        </motion.a>
      </motion.div>
    </div>
  );
}

export default PersonCard;
