import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

// ─── Types & data ─────────────────────────────────────────────────────────────
export interface Skill {
  name: string;
  level: number;
  color: string;
  icon: string;
  category: "frontend" | "backend" | "tools";
}

export const defaultSkills: Skill[] = [
  { name: "React.js",     level: 92, color: "hsl(192 100% 42%)",  icon: "⚛",  category: "frontend" },
  { name: "JavaScript",     level: 75, color: "hsl(30 90% 48%)",    icon: "JS", category: "frontend" },
  { name: "TypeScript",   level: 50, color: "hsl(211 95% 50%)",   icon: "TS", category: "frontend" },
  { name: "Tailwind CSS", level: 90, color: "hsl(199 89% 42%)",   icon: "🌊", category: "frontend" },
  { name: "Next.js",      level: 78, color: "hsl(220 15% 48%)",   icon: "▲",  category: "frontend" },
  { name: "Node.js",      level: 15, color: "hsl(142 70% 38%)",   icon: "⬡",  category: "backend"  },
  { name: "REST APIs",    level: 10, color: "hsl(262 60% 55%)",   icon: "🌐", category: "backend"  },
  { name: "Git / GitHub", level: 88, color: "hsl(20 80% 48%)",    icon: "⎇",  category: "tools"    },
];

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCountUp(target: number, active: boolean, delay = 0) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;
    const timeout = setTimeout(() => {
      const duration = 1300;
      const steps = 50;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        // ease-out curve
        const progress = 1 - Math.pow(1 - step / steps, 3);
        setCount(Math.round(target * progress));
        if (step >= steps) { setCount(target); clearInterval(timer); }
      }, duration / steps);
    }, delay);
    return () => clearTimeout(timeout);
  }, [active, target, delay]);

  return count;
}

// ─── Circular skill card ──────────────────────────────────────────────────────
function CircularSkill({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const count = useCountUp(skill.level, inView, index * 80 + 300);

  const r = 34;
  const circ = 2 * Math.PI * r;
  const progress = (skill.level / 100) * circ;

  // 3-D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [10, -10]), { stiffness: 220, damping: 22 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-10, 10]), { stiffness: 220, damping: 22 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r2 = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r2.left - r2.width / 2);
    my.set(e.clientY - r2.top - r2.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.85 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      whileHover={{ scale: 1.05 }}
      className="relative flex flex-col items-center gap-2.5 p-4 rounded-2xl cursor-default select-none"
    >
      {/* Glassmorphic card bg */}
      <div
        className="absolute inset-0 rounded-2xl transition-shadow duration-300 glass-card"
        style={{
          boxShadow: `0 6px 28px ${skill.color}20, 0 1px 4px hsl(var(--border) / 0.4)`,
        }}
      />

      {/* Donut ring */}
      <div className="relative z-10" style={{ filter: `drop-shadow(0 0 6px ${skill.color}44)` }}>
        <svg width="88" height="88" viewBox="0 0 88 88" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="44" cy="44" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="6.5" />
          <motion.circle
            cx="44" cy="44" r={r}
            fill="none"
            stroke={skill.color}
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={inView ? { strokeDashoffset: circ - progress } : {}}
            transition={{ duration: 1.3, delay: index * 0.07 + 0.2, ease: [0.33, 1, 0.68, 1] }}
          />
        </svg>
        {/* Icon inside ring */}
        <div
          className="absolute inset-0 flex items-center justify-center text-lg font-bold font-mono"
          style={{ color: skill.color }}
        >
          {skill.icon}
        </div>
      </div>

      {/* Name + % */}
      <div className="relative z-10 text-center leading-tight">
        <p className="text-sm font-semibold text-foreground">{skill.name}</p>
        <p className="text-xs font-mono mt-0.5" style={{ color: skill.color }}>
          {count}%
        </p>
      </div>
    </motion.div>
  );
}

// ─── Horizontal bar skill ─────────────────────────────────────────────────────
function BarSkill({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const count = useCountUp(skill.level, inView, index * 70 + 200);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -22 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.48, delay: index * 0.065, ease: "easeOut" }}
      className="group"
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2.5">
          <motion.span
            whileHover={{ rotate: 12, scale: 1.15 }}
            transition={{ duration: 0.2 }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
            style={{
              background: `${skill.color}15`,
              color: skill.color,
              border: `1px solid ${skill.color}35`,
            }}
          >
            {skill.icon}
          </motion.span>
          <span className="text-sm font-semibold text-foreground">{skill.name}</span>
        </div>
        <span className="text-xs font-mono tabular-nums" style={{ color: skill.color }}>
          {count}%
        </span>
      </div>

      {/* Track */}
      <div
        className="relative h-2 rounded-full overflow-hidden"
        style={{ background: "hsl(var(--muted))" }}
      >
        {/* Fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.25, delay: index * 0.065 + 0.1, ease: [0.33, 1, 0.68, 1] }}
          style={{
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color} 60%, ${skill.color}cc)`,
            boxShadow: `0 0 8px ${skill.color}50`,
          }}
        >
          {/* Travelling shine */}
          <motion.span
            className="absolute inset-y-0 w-12 rounded-full"
            initial={{ left: "-3rem", opacity: 0 }}
            animate={inView ? { left: "110%", opacity: [0, 0.7, 0] } : {}}
            transition={{ duration: 0.9, delay: index * 0.065 + 1.0, ease: "easeOut" }}
            style={{
              background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Category tabs ────────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: "all",      label: "All"      },
  { key: "frontend", label: "Frontend" },
  { key: "backend",  label: "Backend"  },
  { key: "tools",    label: "Tools"    },
] as const;
type Category = (typeof CATEGORIES)[number]["key"];

// ─── Main export ──────────────────────────────────────────────────────────────
interface SkillsDisplayProps {
  skills?: Skill[];
  view?: "bars" | "circles" | "both";
}

export default function SkillsDisplay({ skills = defaultSkills, view = "both" }: SkillsDisplayProps) {
  const [active, setActive] = useState<Category>("all");

  const filtered = active === "all" ? skills : skills.filter(s => s.category === active);

  return (
    <div className="w-full space-y-8">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => {
          const isActive = active === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className="relative px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                border: `1px solid ${isActive ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="skill-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "hsl(var(--primary))" }}
                  transition={{ type: "spring", bounce: 0.22, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Circles grid */}
      {(view === "circles" || view === "both") && (
        <motion.div
          key={`c-${active}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {filtered.map((sk, i) => (
            <CircularSkill key={sk.name} skill={sk} index={i} />
          ))}
        </motion.div>
      )}

      {/* Progress bars */}
      {(view === "bars" || view === "both") && (
        <motion.div
          key={`b-${active}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="glass-card rounded-2xl p-6 space-y-5"
        >
          <p
            className="text-[10px] font-mono font-semibold uppercase tracking-widest"
            style={{ color: "hsl(var(--primary))" }}
          >
            // Proficiency Levels
          </p>
          {filtered.map((sk, i) => (
            <BarSkill key={sk.name} skill={sk} index={i} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
