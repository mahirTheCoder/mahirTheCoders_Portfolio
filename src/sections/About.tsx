import { motion } from "framer-motion";
import { Download, ArrowUpRight, CheckCircle2 } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import SkillsDisplay from "@/components/SkillsDisplay";
import profileImg from "@/assets/profile.jpg";

// ------------data
const stats = [
  { value: "10+", label: "Projects Shipped" },
  { value: "1+", label: "Years Experience" },
  { value: "10+", label: "Happy Clients" },
  { value: "99%", label: "On-time Delivery" },
];

const highlights = [
  "React & Next.js developer — comfortable with hooks and context",
  "Focus on performance & responsive web design",
  "Clean and user-friendly UI with Tailwind CSS",
  "Experience working with REST APIs and third-party SDKs",
  "Open to learning new technologies and contributing to projects",
];

// -----------animations
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

// ---------components
export default function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading
        tag="about me"
        title="The Developer"
        highlight="Behind the Code"
        subtitle="React Developer · Frontend Developer · UI/UX Enthusiast — building fast, accessible, and modern web experiences."
      />

      {/* ---------photo + bio */}
      <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center mb-20">

        {/* Photo */}
        <motion.div
          {...fadeLeft(0)}
          className="flex justify-center lg:justify-end order-2 lg:order-1"
        >
          <div className="relative">

            <div
              className="absolute -inset-6 rounded-3xl opacity-20 blur-2xl"
              style={{ background: "var(--gradient-primary)" }}
            />

            <motion.div
              className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.35 }}
            >
              <img
                src={profileImg}
                alt="Mahir Chowdhury React Developer"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.75)" }}
              />

              <div className="absolute inset-0 bg-black/25" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="rounded-xl px-4 py-3 backdrop-blur-md bg-background/70 border border-border">
                  <p className="font-bold text-base text-foreground">
                    mahirTheCoder
                  </p>
                  <p className="text-xs text-primary">
                    React Developer · UI Engineer
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Availability */}
            <div className="absolute -top-4 -left-4 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold bg-card border border-green-400/40 text-green-600 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Open to Work
            </div>

            {/* Projects */}
            <div className="absolute -bottom-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold bg-card border border-primary/40 text-primary shadow-lg">
              ⚡ 10+ Projects
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div {...fadeRight(0.1)} className="space-y-6 order-1 lg:order-2">

          <div>
            <p className="text-muted-foreground mb-4">
              Hey there — I'm a{" "}
              <span className="gradient-text font-semibold">
                React developer
              </span>{" "}
              passionate about building modern, responsive, and user-friendly
              web applications.
            </p>

            <p className="text-muted-foreground">
              I focus on{" "}
              <span className="text-foreground font-medium">
                frontend development
              </span>
              , clean UI design, and smooth user experiences.
            </p>
          </div>

          {/* highlights */}
          <ul className="space-y-2.5">
            {highlights.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <CheckCircle2 size={15} className="text-primary mt-0.5" />
                {item}
              </motion.li>
            ))}
          </ul>

          {/* buttons */}
          <div className="flex gap-3 pt-2">
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground"
            >
              Hire Me <ArrowUpRight size={14} />
            </motion.a>

            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ y: -2 }}
              className="btn-neon flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
            >
              Download CV <Download size={14} />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* -----------stats */}
      <motion.div {...fadeUp(0)} className="glass-card rounded-2xl mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-border">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <span className="font-bold text-4xl gradient-text">
                {s.value}
              </span>
              <span className="text-muted-foreground text-xs uppercase tracking-widest">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

{/* -----------skills auto slide */}
<motion.div {...fadeUp(0.1)} className="mb-20">
  <h3 className="font-bold text-xl mb-8 text-center text-foreground">
    Technical <span className="gradient-text">Skills</span>
  </h3>

  <div className="overflow-hidden glass-car rounded-2xl p-6">
      <SkillsDisplay view="circles" />
  </div>
</motion.div>

    </SectionWrapper>
  );
}