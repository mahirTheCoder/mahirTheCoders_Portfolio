import { motion } from "framer-motion";
import { Monitor, Palette, Zap, Code2, Globe, Layers } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";

const services = [
  {
    icon: Monitor,
    title: "React Development",
    desc: "Building scalable, performant React applications with modern patterns, hooks, and best practices.",
    color: "hsl(192 100% 50%)",
    features: ["Custom Hooks", "Component Libraries", "Performance Optimisation", "State Management"],
  },
  {
    icon: Palette,
    title: "UI / UX Design",
    desc: "Translating wireframes and designs into pixel-perfect, accessible, and responsive interfaces.",
    color: "hsl(262 70% 58%)",
    features: ["Responsive Design", "Design Systems", "Accessibility", "Micro-interactions"],
  },
  {
    icon: Zap,
    title: "Performance Tuning",
    desc: "Optimising web apps for speed — code splitting, lazy loading, memoisation, and Lighthouse scores.",
    color: "hsl(48 90% 55%)",
    features: ["Code Splitting", "Lazy Loading", "Web Vitals", "Bundle Analysis"],
  },
  {
    icon: Code2,
    title: "TypeScript Integration",
    desc: "Migrating JavaScript projects to TypeScript and building type-safe, maintainable codebases.",
    color: "hsl(216 80% 58%)",
    features: ["Type Safety", "Interfaces & Generics", "JSDoc Migration", "Strict Mode"],
  },
  {
    icon: Globe,
    title: "API Integration",
    desc: "Seamlessly integrating REST and GraphQL APIs, handling auth flows, and managing server state.",
    color: "hsl(142 70% 45%)",
    features: ["REST / GraphQL", "Authentication", "React Query", "Error Handling"],
  },
  {
    icon: Layers,
    title: "Frontend Architecture",
    desc: "Designing scalable folder structures, monorepos, and CI/CD pipelines for growing teams.",
    color: "hsl(340 80% 55%)",
    features: ["Monorepos", "CI/CD Setup", "Testing (Vitest)", "Code Reviews"],
  },
];

export default function Services() {
  return (
    <SectionWrapper id="services">
      <SectionHeading
        tag="// services"
        title="What I"
        highlight="Offer"
        subtitle="End-to-end frontend expertise — from design system to deployment."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -7, transition: { duration: 0.22 } }}
              className="glass-card rounded-2xl p-6 group"
            >
              {/* Icon */}
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                whileHover={{ scale: 1.12, rotate: 5 }}
                transition={{ duration: 0.22 }}
                style={{
                  background: `${service.color}12`,
                  border: `1px solid ${service.color}28`,
                }}
              >
                <Icon size={24} style={{ color: service.color }} />
              </motion.div>

              <h3 className="font-display font-bold text-xl text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>

              {/* Features list */}
              <ul className="space-y-1.5">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: service.color }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Bottom accent line on hover */}
              <div
                className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(90deg, ${service.color}, ${service.color}33)` }}
              />
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
