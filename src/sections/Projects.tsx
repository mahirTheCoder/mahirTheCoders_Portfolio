import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import projectDashboard from "@/assets/project-dashboard.jpg";
import projectAiChat from "@/assets/project-ai-chat.jpg";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectBuilder from "@/assets/project-builder.jpg";
import projectKanban from "@/assets/project-kanban.jpg";
import project3dLanding from "@/assets/project-3d-landing.jpg";
import bushu from "@/assets/Bushu's.png";
import next from "@/assets/next.png";
import can from "@/assets/can.png";
import lux from "@/assets/Lux.png";
import fur from "@/assets/furniture.png";

const projects = [
  {
    id: 1,
    title: "DevSpace Dashboard",
    desc: "A feature-rich developer analytics dashboard with real-time data visualisation, dark/light themes, and interactive charts.",
    tags: ["React", "TypeScript", "Recharts", "Tailwind"],
    color: "hsl(192 100% 50%)",
    demo: "#",
    github: "https://github.com/mahirTheCoder",
    featured: true,
    image: projectDashboard,
  },

  // {
  //   id: 2,
  //   title: "AI Chat Interface",
  //   desc: "Modern conversational UI with streaming responses, code highlighting, markdown rendering and smooth animations.",
  //   tags: ["React", "OpenAI API", "Framer Motion", "Zustand"],
  //   color: "hsl(262 70% 58%)",
  //   demo: "#",
  //   github: "https://github.com/mahirTheCoder",
  //   featured: true,
  //   image: projectAiChat,
  // },
  {
    id: 2,
    title: "Bushu's Wear E-Commerce Store",
    desc: "Full-featured shopping experience with cart management, product filters, payment integration, and mobile-first design.",
    tags: ["React", "TypeScript", "Tailwind", ],
    color: "hsl(142 70% 45%)",
    demo: "https://wear-store.vercel.app/",
    github: "https://github.com/mahirTheCoder/Bushu-s-Wear.git",
    featured: false,
    image: bushu,
  },
  {
    id: 3,
    title: "Nextone E-Commerce Store",
    desc: "Full-featured shopping experience with cart management, product filters, payment integration, and mobile-first design.",
    tags: ["React",  "Tailwind", ],
    color: "hsl(142 70% 45%)",
    demo: "https://nexton-e-commerce-eosin.vercel.app/",
    github: "https://github.com/mahirTheCoder/Nexton-E-commerce.git",
    featured: false,
    image: next,
  },
  {
    id: 4,
    title: "Candle E-Commerce shop",
    desc: "Full-featured shopping experience with cart management, product filters, payment integration, and mobile-first design.",
    tags: ["React", "Tailwind", ],
    color: "hsl(142 70% 45%)",
    demo: "https://candle-xi-tan.vercel.app/",
    github: "https://github.com/mahirTheCoder/candle.git",
    featured: false,
    image: can,
  },
  {
    id: 5,
    title: "LUXDRIVE Landing page ",
    desc: "Drive Premium. Ride in Style Experience luxury cars with effortless booking and unmatched comfort Your perfect ride is just one click away.",
    tags: ["React",  "Vite", "tailwind", ],
    color: "hsl(30 90% 55%)",
    demo: "https://luxdrive-ueuq.vercel.app/",
    github: "https://github.com/mahirTheCoder/LUXDRIVE.git",
    featured: false,
    image: lux,
  },
  {
    id: 6,
    title: "Furniture Landing page",
    desc: " Developed a modern and fully responsive furniture website using HTML, CSS, and JavaScript., Focused on clean UI design, smooth user experience, and cross-device compatibility.",
    tags: ["HTML", "CSS", "JavaScript","Bootstrap", "Responsive Design"],
    color: "hsl(192 80% 55%)",
    demo: "https://mahirthecoder.github.io/project_-furniture/",
    github: "https://github.com/mahirTheCoder/project_-furniture.git",
    featured: false,
    image: fur,
  },
  // {
  //   id: 6,
  //   title: "3D Landing Page",
  //   desc: "Immersive marketing landing page with Three.js background, scroll-triggered reveals, and parallax effects.",
  //   tags: ["React", "Three.js", "GSAP", "Tailwind"],
  //   color: "hsl(340 80% 55%)",
  //   demo: "#",
  //   github: "https://github.com/mahirTheCoder",
  //   featured: false,
  //   image: project3dLanding,
  // },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * 10, y: cx * -10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? "-8px" : "0px"})`,
        transition: hovered ? "transform 0.1s ease" : "transform 0.4s ease",
      }}
      className="relative rounded-2xl overflow-hidden group cursor-pointer h-full flex flex-col"
    >
      {/* Card base */}
      <div
        className="h-full flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "hsl(var(--card))",
          border: hovered
            ? `1px solid ${project.color}55`
            : "1px solid hsl(var(--border))",
          boxShadow: hovered
            ? `0 24px 64px ${project.color}22, 0 8px 32px hsl(220 30% 10% / 0.15)`
            : "var(--shadow-card)",
          transition: "border-color 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        {/* Image area */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.5s ease",
              filter: hovered ? "brightness(1.05)" : "brightness(0.92)",
            }}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${project.color}08 0%, hsl(var(--card)) 100%)`,
            }}
          />
          {/* Color accent bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}44)` }}
          />
          {/* Featured badge */}
          {project.featured && (
            <div
              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-sm"
              style={{
                background: `${project.color}22`,
                color: project.color,
                border: `1px solid ${project.color}44`,
              }}
            >
              ✦ Featured
            </div>
          )}
          {/* Hover CTA overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center gap-3"
                style={{ background: `${project.color}18`, backdropFilter: "blur(2px)" }}
              >
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                  style={{ background: project.color, color: "hsl(var(--primary-foreground))" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={13} /> Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                  style={{
                    background: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={13} /> Code
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-2 gap-2">
            <h3 className="font-display font-bold text-lg text-foreground leading-tight">
              {project.title}
            </h3>
            <motion.div
              animate={{ rotate: hovered ? 45 : 0 }}
              transition={{ duration: 0.25 }}
              className="flex-shrink-0 mt-0.5"
              style={{ color: project.color }}
            >
              <ArrowUpRight size={18} />
            </motion.div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
            {project.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-mono rounded-md"
                style={{
                  background: "hsl(var(--muted))",
                  color: "hsl(var(--muted-foreground))",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionHeading
        tag=" projects"
        title="What I've"
        highlight="Built"
        subtitle="A collection of projects that showcase my skills, creativity, and passion for great software."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
      <motion.div
        className="text-center mt-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <a
          href="https://github.com/mahirTheCoder"
          target="_blank"
          rel="noreferrer"
          className="btn-neon inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-medium"
          style={{ color: "hsl(var(--primary))" }}
        >
          <Github size={16} />
          View All on GitHub
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
