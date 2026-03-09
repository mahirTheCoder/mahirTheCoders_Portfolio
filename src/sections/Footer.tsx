import { Github, Linkedin, Facebook, Heart, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { icon: Github,   label: "GitHub",   href: "https://github.com/mahirTheCoder" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mahirthecoder-nextgen-3b7779369/" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61582661881914" },
];

const navLinks = [
  { label: "Home",       href: "#home" },
  { label: "About",      href: "#about" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services",   href: "#services" },
  { label: "Contact",    href: "#contact" },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    
<section className="Footer">
      <footer
      style={{
        background: "hsl(var(--background-2))",
        borderTop: "1px solid hsl(var(--border))",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="font-display font-bold text-xl mb-3">
              <span className="gradient-text">mahir</span>
              <span className="text-foreground">TheCoder</span>
              <span className="text-primary">_</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              React developer crafting beautiful, performant web experiences. Available for freelance work worldwide.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors py-1 hover:translate-x-0.5 inline-block"
                  style={{ transition: "color 0.2s, transform 0.2s" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">
              Connect
            </h4>
            <div className="flex gap-3 mb-4">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.12 }}
                    transition={{ duration: 0.18 }}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                    style={{
                      background: "hsl(var(--muted))",
                      border: "1px solid hsl(var(--border))",
                    }}
                    title={s.label}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <span className="glow-dot" />
              <span className="text-xs text-muted-foreground">Open to work</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid hsl(var(--border))" }}
        >
          <p className="text-muted-foreground text-xs flex items-center text-center gap-1.5">
          <span>© {new Date().getFullYear()} mahirTheCoder. Made with in React🖤</span>
          </p>


          {/* <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.92 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center btn-neon flex-shrink-0"
            style={{ color: "hsl(var(--primary))" }}
            title="Back to top"
          >
            <ArrowUp size={16} />
            
          </motion.button> */}


        </div>
      </div>
    </footer>
</section>
  );
}
