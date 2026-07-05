import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, ChevronUp, ExternalLink } from "lucide-react";
import { FileText } from "lucide-react";
/* ── DATA ─────────────────────────────────────────────────── */

const projects = [
  {
    id: "01",
    title: "Vendicity",
    subtitle: "SME Decision Support System",
    type: "Capstone · Full Stack",
    year: "2026",
    stack: ["ASP.NET Core", "Blazor", "PostgreSQL", "Docker", "AWS"],
    description:
      "Cloud-hosted SME platform with multi-role auth, inventory management, and business analytics. Built with a real client through the full SDLC — from requirements gathering to deployment.",
    link: null,
    featured: true,
  },
  {
    id: "02",
    title: "SupplierINV",
    subtitle: "Supplier Inventory Web App",
    type: "ASP.NET MVC · C#",
    year: "2025",
    stack: ["ASP.NET MVC", "C#", "SQL Server"],
    description:
      "MVC web application for supplier and inventory management with CRUD operations and role-based access.",
    link: "https://github.com/chrisaph/SupplierINV_MVC_ASPNET",
  },
  {
    id: "03",
    title: "ExpenseLog",
    subtitle: "Expense Tracker Web App",
    type: "ASP.NET Razor · C#",
    year: "2025",
    stack: ["ASP.NET Razor Pages", "C#", "SQL Server"],
    description:
      "Razor Pages web app for personal and business expense tracking with dashboard and reporting features.",
    link: "https://github.com/chrisaph/ExpenseLog_Razorpage_ASPNET",
  },
  {
    id: "04",
    title: "EvalTrack",
    subtitle: "Professor Evaluation System",
    type: "Django MVT · Python",
    year: "2026",
    stack: ["Python", "Django", "PostgreSQL"],
    description:
      "Full-stack Django app for academic evaluation tracking with admin dashboard and report generation.",
    link: "https://github.com/chrisaph/EvalTrack_Python_Django",
  },
  {
    id: "05",
    title: "MerMitchTV",
    subtitle: "Android Streaming App",
    type: "Kotlin · Android",
    year: "2025",
    stack: ["Kotlin", "Jetpack Compose", "Android"],
    description:
      "Native Android app for TV show streaming using Kotlin in IntelliJ IDEA with custom UI components.",
    link: "https://github.com/chrisaph/MerMitchTV_Kotlin_Intellij_AndroidApp",
  },
  {
    id: "06",
    title: "IPOPHIL",
    subtitle: "Government IP Office Prototype",
    type: "TypeScript · Figma",
    year: "2026",
    stack: ["TypeScript", "HTML/CSS", "Figma"],
    description:
      "Front-end prototype for the Intellectual Property Office of the Philippines, designed from Figma mockups.",
    link: "https://github.com/chrisaph/IPOPHIL-uiuxdes-prototype",
  },
  {
    id: "07",
    title: "TV Similarity",
    subtitle: "Data Mining with Python",
    type: "Jupyter Notebook · ML",
    year: "2025",
    stack: ["Python", "Pandas", "Scikit-learn"],
    description:
      "Data mining project analyzing TV show similarity using machine learning techniques in Jupyter Notebook.",
    link: "https://github.com/chrisaph/tv-show-similarity-merano-manalog-data-mining",
  },
  {
    id: "08",
    title: "RPG Generator",
    subtitle: "DevOps on Linux VM",
    type: "DevOps · Linux",
    year: "2026",
    stack: ["Linux", "Bash", "Python", "VM"],
    description:
      "Development operations project running an RPG generator system on a Linux virtual machine environment.",
    link: "https://github.com/chrisaph/rpg_generator",
  },
  {
    id: "09",
    title: "Personal Watchlist",
    subtitle: "Python on Jupyter Notebook",
    type: "Python · Jupyter Notebook",
    year: "2025",
    stack: ["Python", "Jupyter Notebook"],
    description:
      "Development operations project running an RPG generator system on a Linux virtual machine environment.",
    link: "https://github.com/chrisaph/PersonalWatchlist",
  },
  {
    id: "What's Next?",
    title: "Future Projects",
    subtitle: "",
    type: "",
    year: "",
    stack: ["FUTUREEEEEEEEE!!!! - Squidward"],
    description:
      "The future hasn't been written yet. No one's has. Your future is whatever you make it. So make it a good one. - Doc Brown, Back to the Future Part III",
    link: "https://github.com/chrisaph",
  },
];

const skillGroups = [
  {
    label: "Languages",
    skills: ["C#", "Python", "JavaScript", "TypeScript", "Kotlin", "SQL", "HTML / CSS"],
  },
  {
    label: "Frameworks",
    skills: ["ASP.NET Core", "Blazor", "Django", "React", "Razor Pages", "Jetpack Compose"],
  },
  {
    label: "Databases",
    skills: ["SQL Server", "PostgreSQL", "SQLite", "Firebase"],
  },
  {
    label: "DevOps & Cloud",
    skills: ["Docker", "AWS", "Linux", "Git / GitHub", "Render", "Railway"],
  },
  {
    label: "Tools & Design",
    skills: ["Figma", "Jupyter", "PowerBI", "Unity", "Arduino", "Trello", "Jira"],
  },
  {
    label: "Professional",
    skills: ["Project Leadership", "Client Collaboration", "Agile / Scrum", "Research", "Presentations"],
  },
];

const awards = [
  { title: "Benilde Hackathon 3.0", detail: "1st Place Winner", date: "Apr 2026", top: true },
  { title: "First Honors Dean's List", detail: "3.75 GPA · 4th Year", date: "Mar 2026" },
  { title: "First Honors Dean's List", detail: "3.75 GPA · 3rd Year", date: "Oct 2025" },
  { title: "First Honors Dean's List", detail: "3.58 GPA · 3rd Year", date: "May 2025" },
  { title: "Second Honors Dean's List", detail: "3.13 GPA · 1st Year", date: "Mar 2023" },
  { title: "IT Python Certified Practitioner", detail: "Certiport Certification", date: "2026" },
];

/* ── HOOKS ────────────────────────────────────────────────── */

function useFadeUp(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── MICRO-COMPONENTS ─────────────────────────────────────── */

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useFadeUp();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ReadingProgress({ scrolled }: { scrolled: boolean }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div
  className={`fixed top-0 left-0 right-0 z-[70] h-[3px] pointer-events-none transition-colors duration-300 ${
    scrolled ? "bg-background/95 backdrop-blur-md" : "bg-transparent"
  }`}
>
      <div
        className="h-full bg-accent transition-[width] duration-75"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function Ticker() {
  const words = [
    "C# · .NET", "Python", "Django", "Blazor", "PostgreSQL",
    "Docker", "AWS", "Kotlin", "Android", "TypeScript", "React",
    "Linux", "DevOps", "Figma", "PowerBI", "Arduino", "Machine Learning",
  ];
  const all = [...words, ...words];
  return (
    <div className="overflow-hidden bg-[#0F0D08] border-y-0 select-none" aria-hidden>
      <div
        className="flex items-center gap-12 py-4 whitespace-nowrap"
        style={{ animation: "ticker 28s linear infinite", display: "inline-flex" }}
      >
        {all.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-4 text-[10px] tracking-[0.32em] uppercase"
            style={{ fontFamily: "'Space Mono', monospace", color: "rgba(237,232,208,0.55)" }}
          >
            <span className="block w-1 h-1 rounded-full" style={{ background: "#C84B2F" }} />
            {w}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:.35; } }
      `}</style>
    </div>
  );
}

function SectionTag({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-16">
      <span
        className="text-[9px] tracking-[0.4em] uppercase"
        style={{ fontFamily: "'Space Mono', monospace", color: "#C84B2F" }}
      >
        {num}
      </span>
      <div className="w-8 h-px bg-foreground/20" />
      <span
        className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {label}
      </span>
      <div className="flex-1 h-px bg-foreground/10" />
    </div>
  );
}

/* ── MAIN APP ──────────────────────────────────────────────── */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navLinks = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Work" },
    { id: "awards", label: "Awards" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      setShowTop(window.scrollY > 700);
      const ids = ["hero", ...navLinks.map((n) => n.id)];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <ReadingProgress scrolled={scrolled} />

      {/* ── BACK TO TOP ── */}
      <button
        onClick={() => scrollTo("hero")}
        aria-label="Back to top"
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center border border-foreground/20 bg-background text-foreground hover:bg-foreground hover:text-background transition-all duration-300 shadow-lg ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <ChevronUp size={16} />
      </button>

      {/* ════════════════════════ NAV ════════════════════════ */}
      <nav
        className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-foreground/8 shadow-sm" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          {/* logo mark */}
          <button
            onClick={() => scrollTo("hero")}
            className="group flex items-baseline gap-1"
          >
            <span
            className="text-[22px] font-black leading-none tracking-tight transition-colors"
            style={{
              fontFamily: "'Fraunces', serif",
              color: scrolled ? "inherit" : "#EDE8D0",
            }}
          >
            CM
          </span>
          <span
            className={`text-[9px] tracking-[0.3em] uppercase transition-colors ${
              scrolled ? "text-muted-foreground group-hover:text-accent" : "text-[#ffffff]"
            }`}
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            ·dev
          </span>
          </button>

          {/* desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative text-[10px] tracking-[0.25em] uppercase transition-colors pb-0.5 group"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  color: activeSection === link.id ? "#C84B2F" : "inherit",
                  opacity: activeSection === link.id ? 1 : 0.55,
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 h-px transition-all duration-300"
                  style={{
                    background: "#C84B2F",
                    width: activeSection === link.id ? "100%" : "0%",
                  }}
                />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollTo("contact")}
              className="group relative overflow-hidden text-[9px] tracking-[0.2em] uppercase bg-foreground text-background px-5 py-2.5 transition-all duration-300"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">
                Let's Talk
              </span>
              <span className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </button>
          </div>

          {/* hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300 ${
                scrolled ? "bg-foreground" : "bg-[#EDE8D0]"
              } ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300 ${
                scrolled ? "bg-foreground" : "bg-[#EDE8D0]"
              } ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300 ${
                scrolled ? "bg-foreground" : "bg-[#EDE8D0]"
              } ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>

        {/* mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? "max-h-96" : "max-h-0"}`}
        >
          <div className="bg-background border-b border-foreground/10 px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left flex items-center gap-4 transition-colors"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(1.5rem, 5vw, 2rem)",
                  fontWeight: 300,
                  color: activeSection === link.id ? "#C84B2F" : "inherit",
                }}
              >
                <span
                  className="text-[9px] tracking-[0.3em] uppercase"
                  style={{ fontFamily: "'Space Mono', monospace", color: "#C84B2F", opacity: 0.7 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-end"
        style={{ background: "#0F0D08" }}
      >
        {/* faint grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(237,232,208,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(237,232,208,.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* decorative corner brackets */}
        <div className="absolute top-20 left-6 md:left-12 w-8 h-8 border-t-2 border-l-2 border-accent/30 pointer-events-none" />
        <div className="absolute top-20 right-6 md:right-12 w-8 h-8 border-t-2 border-r-2 border-accent/30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-16 pt-32">
          {/* availability */}
          <FadeUp delay={100}>
            <div className="mb-8">
              <span
                className="inline-flex items-center gap-3 text-[9px] tracking-[0.28em] uppercase border px-4 py-2"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  color: "rgba(237,232,208,0.6)",
                  borderColor: "rgba(237,232,208,0.12)",
                  background: "rgba(237,232,208,0.04)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  style={{ animation: "blink 2s ease-in-out infinite" }}
                />
                Available for OJT · Aug / Sep 2026 · 400+ hrs
              </span>
            </div>
          </FadeUp>

          {/* name — the centerpiece */}
          <FadeUp delay={200}>
            <h1
              className="leading-[0.86] tracking-[-0.02em] mb-2"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(4rem, 14vw, 11rem)",
                fontWeight: 900,
                color: "#EDE8D0",
              }}
            >
              Christian
            </h1>
            <h1
              className="leading-[0.86] tracking-[-0.02em] mb-10"
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontSize: "clamp(4rem, 14vw, 11rem)",
                fontWeight: 300,
                color: "#C84B2F",
              }}
            >
              Merano.
            </h1>
          </FadeUp>

          {/* bottom row */}
          <FadeUp delay={380}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t pt-8" style={{ borderColor: "rgba(237,232,208,0.1)" }}>
              <div>
                <p
                  className="text-sm font-light mb-1"
                  style={{ color: "rgba(237,232,208,0.55)" }}
                >
                  Full-Stack Developer &amp; UI/UX Designer
                </p>
                <p
                  className="text-[10px] tracking-[0.24em] uppercase"
                  style={{ fontFamily: "'Space Mono', monospace", color: "rgba(237,232,208,0.55)" }}
                >
                  BS Information Systems · De La Salle–CSB · Taguig, PH
                </p>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-6">                <a
                  href="https://github.com/chrisaph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "rgba(237,232,208,0.4)" }}
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/christian-merano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "rgba(237,232,208,0.4)" }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <button
                  onClick={() => scrollTo("contact")}
                  className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase border px-5 py-2.5 transition-all duration-300 hover:bg-accent hover:border-accent"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    color: "rgba(237,232,208,0.7)",
                    borderColor: "rgba(237,232,208,0.18)",
                  }}
                >
                  Say Hello <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* scroll nudge */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25"
          aria-hidden
        >
          
          <span
            className="text-[8px] tracking-[0.4em] uppercase rotate-0"
            style={{ fontFamily: "'Space Mono', monospace", color: "#ffffffff" }}
          >
            Proverbs 16:9
          </span>
        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ══════════════════════ BODY ══════════════════════ */}
      <main className="bg-background">

        {/* ── ABOUT ── */}
        <section id="about" className="max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36">
          <FadeUp>
            <SectionTag num="01" label="About" />
          </FadeUp>

          <div className="grid md:grid-cols-[1fr_380px] gap-16 md:gap-24 items-start">
            <FadeUp delay={100}>
              <div>
                <h2
                  className="mb-8 leading-tight"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(2rem, 5vw, 3.25rem)",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Building things that{" "}
                  <em style={{ color: "#C84B2F", fontStyle: "italic" }}>actually work</em>
                  {" "}— from database to UI.
                </h2>

                <p className="text-muted-foreground leading-[1.85] mb-5 max-w-prose text-[15px]">
                  I'm a 4th-year BS Information Systems student at De La Salle–College of Saint Benilde currently residing in Taguig. I build full-stack web applications, design UI/UX prototypes, and tinker with DevOps pipelines as well as Embedded Systems.
                </p>

                <p className="text-muted-foreground leading-[1.85] max-w-prose text-[15px]">
                  My capstone project Vendicity, a cloud-hosted SME Decision Support System, was built alongside a real client which taught me that good software starts with good listening. Available for OJT positions starting August/September 2026.
                </p>
              </div>

              <div className="flex justify-center mt-8">
                <a
                  href="/BS-InformationSystems_Merano_Christian.pdf"
                  download
                  className="group inline-flex items-center gap-3 border border-foreground/15 px-8 py-4 hover:border-accent hover:bg-accent transition-all duration-300"
                >
                  <FileText
                    size={18}
                    className="group-hover:text-background transition-colors duration-300"
                  />

                  <span
                    className="text-[12px] tracking-[0.2em] uppercase group-hover:text-background transition-colors duration-300"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    Download Resume
                  </span>
                </a>
              </div>
            </FadeUp>

            {/* stat block */}
            <FadeUp delay={220}>
              <div className="grid grid-cols-2 gap-px border border-foreground/10" style={{ background: "rgba(28,25,20,0.08)" }}>
                {[
                  { n: "04", label: "Dean's List awards" },
                  { n: "3.75", label: "Top GPA" },
                  { n: "400+", label: "OJT hours req." },
                  { n: "20+", label: "Projects built" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-background p-7 flex flex-col gap-1"
                  >
                    <span
                      className="block text-4xl font-black leading-none tracking-tight"
                      style={{ fontFamily: "'Fraunces', serif", color: "#C84B2F" }}
                    >
                      {stat.n}
                    </span>
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* education card */}
              <div className="mt-4 border border-foreground/10 p-6">
                <span
                  className="block text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-3"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  Education
                </span>
                <p className="font-semibold text-sm leading-snug mb-1">
                  BS Information Systems
                </p>
                <p className="text-muted-foreground text-[13px]">
                  De La Salle–College of Saint Benilde
                </p>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-2"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  2022 – 2026 · Manila, Philippines
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="h-px bg-foreground/8" />
        </div>

        {/* ── SKILLS ── */}
        <section id="skills" className="max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36">
          <FadeUp>
            <SectionTag num="02" label="Expertise" />
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-0 border border-foreground/10">
            {skillGroups.map((group, i) => (
              <FadeUp key={group.label} delay={i * 60}>
                <div
                  className="p-8 border-b border-r border-foreground/10 group hover:bg-foreground/[0.03] transition-colors duration-300"
                  style={{
                    borderRight: i % 2 === 0 ? undefined : "none",
                    borderBottom: i >= skillGroups.length - 2 ? "none" : undefined,
                  }}
                >
                  <span
                    className="block text-[9px] tracking-[0.35em] uppercase mb-4"
                    style={{ fontFamily: "'Space Mono', monospace", color: "#C84B2F" }}
                  >
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    {group.skills.map((skill, si) => (
                      <span key={skill}>
                        <span className="text-[14px] font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                          {skill}
                        </span>
                        {si < group.skills.length - 1 && (
                          <span className="text-foreground/25 mx-1 text-xs">/</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="h-px bg-foreground/8" />
        </div>

        {/* ── PROJECTS ── */}
        <section id="projects" className="py-28 md:py-36">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <FadeUp>
              <SectionTag num="03" label="Selected Work" />
            </FadeUp>
          </div>

          {/* ── featured project ── */}
          <FadeUp delay={100}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-6">
              <div
                className="relative overflow-hidden group cursor-default"
                style={{ background: "#0F0D08" }}
              >
                {/* faint grid */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.04]"
                  style={{
                    backgroundImage: "linear-gradient(rgba(237,232,208,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(237,232,208,.8) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                  }}
                />

                <div className="relative z-10 p-10 md:p-16">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="text-[9px] tracking-[0.35em] uppercase"
                          style={{ fontFamily: "'Space Mono', monospace", color: "#C84B2F" }}
                        >
                          Featured · 01
                        </span>
                        <span
                          className="text-[9px] tracking-[0.28em] uppercase px-3 py-1 border"
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            color: "rgba(237,232,208,0.4)",
                            borderColor: "rgba(237,232,208,0.12)",
                          }}
                        >
                          Capstone · 2026
                        </span>
                      </div>
                      <h3
                        className="leading-none tracking-tight mb-2"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
                          fontWeight: 700,
                          color: "#EDE8D0",
                        }}
                      >
                        Vendicity
                      </h3>
                      <p
                        className="text-lg font-light"
                        style={{ color: "rgba(237,232,208,0.45)" }}
                      >
                        SME Decision Support System
                      </p>
                    </div>

                    <div className="md:text-right">
                      <div
                        className="inline-flex flex-wrap gap-2 md:justify-end"
                      >
                        {["ASP.NET Core", "Blazor", "PostgreSQL", "Docker", "AWS"].map((t) => (
                          <span
                            key={t}
                            className="text-[9px] tracking-[0.2em] uppercase px-2.5 py-1"
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              color: "rgba(237,232,208,0.45)",
                              background: "rgba(237,232,208,0.06)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-[15px] leading-[1.85] max-w-2xl mb-10"
                    style={{ color: "rgba(237,232,208,0.55)" }}
                  >
                    Cloud-hosted SME platform with multi-role auth, inventory management, and business analytics. Built with a real client through the full SDLC from requirements gathering to production deployment on AWS.
                  </p>

                  <div
                    className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase"
                    style={{ fontFamily: "'Space Mono', monospace", color: "rgba(237,232,208,0.28)" }}
                  >
                    <span className="w-4 h-px bg-current" />
                    Private repository · Client engagement
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* ── project grid ── */}
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/8 border border-foreground/8">
              {projects.filter((p) => !p.featured).map((project, i) => (
                <FadeUp key={project.id} delay={i * 60}>
                  <div className="bg-background p-8 h-full group relative flex flex-col hover:bg-[#0F0D08] transition-colors duration-500 cursor-default">
                    <div className="flex items-start justify-between mb-6">
                      <span
                        className="text-[44px] font-black leading-none tracking-tight text-foreground/8 group-hover:text-accent/20 transition-colors duration-500"
                        style={{ fontFamily: "'Fraunces', serif" }}
                      >
                        {project.id}
                      </span>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-100 group-hover:opacity-100 transition-opacity duration-300 p-2 hover:text-accent"
                          style={{ color: "#654d00ff" }}
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <ExternalLink size={19} />
                        </a>
                      )}
                    </div>

                    <h4
                      className="mb-1 leading-tight group-hover:text-background transition-colors duration-500"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: "1.4rem",
                        fontWeight: 600,
                      }}
                    >
                      {project.title}
                    </h4>
                    <p
                      className="text-[12px] tracking-[0.18em] uppercase mb-4 group-hover:text-background/50 transition-colors duration-500"
                      style={{ fontFamily: "'Space Mono', monospace", color: "#C84B2F" }}
                    >
                      {project.year}
                    </p>
                    <p className="text-[13px] text-muted-foreground leading-[1.75] mb-6 flex-1 group-hover:text-background/55 transition-colors duration-500">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.stack.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] tracking-[0.18em] uppercase px-2 py-0.5 border border-foreground/10 text-muted-foreground group-hover:border-background/10 group-hover:text-background/40 transition-colors duration-500"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase opacity-70 group-hover:opacity-100 transition-all duration-300 hover:gap-3"
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          color: "#C84B2F",
                        }}
                      >
                        View on GitHub <ArrowUpRight size={11} />
                      </a>
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="h-px bg-foreground/8" />
        </div>

        {/* ── AWARDS ── */}
        <section id="awards" className="max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36">
          <FadeUp>
            <SectionTag num="04" label="Recognition" />
          </FadeUp>

          <div className="grid md:grid-cols-[1fr_1fr] gap-16">
            {/* awards list */}
            <FadeUp delay={100}>
              <div>
                <h3
                  className="mb-10 leading-tight"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                    fontWeight: 400,
                  }}
                >
                  Awards &amp; Certifications
                </h3>

                <div className="flex flex-col">
                  {awards.map((award, i) => (
                    <div
                      key={i}
                      className="group flex items-start justify-between gap-4 py-5 border-b border-foreground/10 last:border-0 hover:bg-foreground/[0.03] -mx-4 px-4 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        {award.top && (
                          <span
                            className="mt-0.5 text-[8px] tracking-[0.3em] uppercase px-2 py-0.5 shrink-0"
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              background: "#C84B2F",
                              color: "#EDE8D0",
                            }}
                          >
                            1st
                          </span>
                        )}
                        <div>
                          <p className="text-[14px] font-medium leading-snug mb-0.5">
                            {award.title}
                          </p>
                          <p
                            className="text-[11px] text-muted-foreground tracking-wide"
                            style={{ fontFamily: "'Space Mono', monospace" }}
                          >
                            {award.detail}
                          </p>
                        </div>
                      </div>
                      <span
                        className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground shrink-0 mt-0.5"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        {award.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* right col — philosophy / values */}
            <FadeUp delay={220}>
              <div className="flex flex-col gap-6 pt-0 md:pt-[4.5rem]">
                <div className="border border-foreground/10 p-8">
                  <span
                    className="block text-[9px] tracking-[0.35em] uppercase text-accent mb-4"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    Academic Standing
                  </span>
                  <p
                    className="text-[3rem] font-black leading-none mb-2 tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    3.75
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Top GPA - First Honors Dean's Lister for consecutive terms. Consistently ranked in the top percentile of the BS Information Systems program.
                  </p>
                </div>

                <div className="border border-foreground/10 p-8">
                  <span
                    className="block text-[9px] tracking-[0.35em] uppercase text-accent mb-4"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    Hackathon Winner
                  </span>
                  <p
                    className="text-[1.6rem] font-bold leading-tight mb-2"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Benilde Hackathon 3.0
                  </p>
                  <p className="text-muted-foreground text-sm">
                    1st Place in a competitive 72-hour hackathon against multiple teams of all courses and professors who are not event organizers. My submission included budget assessments, a logo, and technical specifications such as hosting, language, development environment, and timelines from my knowledge as an Information Systems student.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="h-px bg-foreground/8" />
        </div>

        {/* ── CONTACT ── */}
        <section id="contact" className="max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-40">
          <FadeUp>
            <SectionTag num="05" label="Contact" />
          </FadeUp>

          <FadeUp delay={100}>
            <h2
              className="leading-[0.88] tracking-tight mb-4"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(3.5rem, 11vw, 9rem)",
                fontWeight: 900,
              }}
            >
              Let's
            </h2>
            <h2
              className="leading-[0.88] tracking-tight mb-12"
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontSize: "clamp(3.5rem, 11vw, 9rem)",
                fontWeight: 300,
                color: "#C84B2F",
              }}
            >
              Connect.
            </h2>
          </FadeUp>

          <FadeUp delay={220}>
            <p className="text-muted-foreground text-[15px] leading-[1.85] max-w-lg mb-12">
              Looking for OJT placement starting August or September 2026 (400+ hours). Open to full-stack, backend, or UI/UX roles. Let's build something good together.
            </p>

            <div className="flex flex-col gap-4">
              <a
              href="mailto:christianmerano26@gmail.com"
              className="group inline-flex items-center gap-3 border border-foreground/15 px-6 py-5 hover:border-accent hover:bg-accent transition-all duration-300 max-w-full overflow-hidden"
            >
              <Mail size={18} />

              <span
                className="flex-1 text-center text-[10px] sm:text-[12px] tracking-[0.15em] uppercase break-all"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                christianmerano26@gmail.com
              </span>

              <ArrowUpRight size={14} />
            </a>

              <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                <a
                  href="https://github.com/chrisaph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <Github size={14} />
                  chrisaph
                </a>
                <span className="text-foreground/15">·</span>
                <a
                  href="https://www.linkedin.com/in/christian-merano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <Linkedin size={14} />
                  christian-merano
                </a>
              </div>
            </div>
          </FadeUp>
        </section>
      </main>

      {/* ══════════════════════ FOOTER ══════════════════════ */}
      <footer
        className="relative overflow-hidden"
        style={{ background: "#0F0D08" }}
      >
        {/* giant CM watermark */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none select-none leading-none"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(12rem, 30vw, 26rem)",
            fontWeight: 900,
            color: "rgba(237,232,208,0.04)",
            lineHeight: 0.8,
            transform: "translate(8%, 10%)",
          }}
          aria-hidden
        >
          CM
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <span
              className="block text-[2rem] font-black tracking-tight mb-2"
              style={{ fontFamily: "'Fraunces', serif", color: "#EDE8D0" }}
            >
              Christian Merano
            </span>
            <span
              className="text-[9px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Space Mono', monospace", color: "rgba(237,232,208,0.28)" }}
            >
              Full-Stack Developer · UI/UX Designer
            </span>
          </div>

          <div className="text-right">
            <p
              className="text-[9px] tracking-[0.25em] uppercase mb-1"
              style={{ fontFamily: "'Space Mono', monospace", color: "rgba(237,232,208,0.22)" }}
            >
              © {new Date().getFullYear()} · Built with React
            </p>
            <button
              onClick={() => scrollTo("hero")}
              className="text-[9px] tracking-[0.25em] uppercase hover:text-accent transition-colors"
              style={{ fontFamily: "'Space Mono', monospace", color: "rgba(237,232,208,0.22)" }}
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
