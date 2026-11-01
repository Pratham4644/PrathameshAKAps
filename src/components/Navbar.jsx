import { useState, useEffect, useRef, useCallback } from "react";
import { RESUME_URL } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastY = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const updateScrollState = () => {
      const y = window.scrollY;
      setScrolled(y > 25);
      setHidden(!menuOpen && y > lastY.current && y > 140);
      lastY.current = y;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? Math.round((y / scrollableHeight) * 100) : 0;
      setScrollProgress(Math.max(0, Math.min(100, progress)));
    };

    lastY.current = window.scrollY;
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(document.documentElement);
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [menuOpen]);

  const updateActiveSection = useCallback(() => {
    const sections = ["hero", ...NAV_LINKS.map((link) => link.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const focusLine = window.innerHeight * 0.35;
    const currentSection = sections.find((section) => {
      const bounds = section.getBoundingClientRect();
      return bounds.top <= focusLine && bounds.bottom > focusLine;
    });

    if (currentSection) setActive(currentSection.id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: "-30% 0px -65% 0px",
      threshold: 0,
    });
    const sections = ["hero", ...NAV_LINKS.map((link) => link.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    sections.forEach((section) => observer.observe(section));
    updateActiveSection();

    return () => observer.disconnect();
  }, [updateActiveSection]);

  const handleNav = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      <div
        className="scroll-progress-track"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={scrollProgress}
      >
        <span style={{ width: `${scrollProgress}%` }} />
      </div>
      <header className={`nav-header${scrolled ? " nav-scrolled" : ""}${hidden ? " nav-hidden" : ""}`}>
        <nav className="nav-inner">
          <a
            href="#hero"
            className="nav-logo"
            aria-label="Go to page top"
            aria-current={active === "hero" ? "location" : undefined}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth",
              });
            }}
          >
            <span className="logo-symbol">&lt;PS /&gt;</span>
          </a>

          <ul className="nav-links-desktop">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link-item${active === link.href.replace("#", "") ? " is-active" : ""}`}
                  aria-current={active === link.href.slice(1) ? "location" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-nav-resume"
            >
              Resume ↗
            </a>
            <button
              className={`hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <span /><span /><span />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <nav id="mobile-navigation" aria-label="Mobile navigation" className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <div className="mobile-menu-inner">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              aria-current={active === link.href.slice(1) ? "location" : undefined}
              onClick={(e) => {
                e.preventDefault();
                handleNav(link.href);
              }}
            >
              <span className="mobile-idx">0{i + 1}.</span>
              <span>{link.label}</span>
            </a>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d btn-primary mobile-resume-btn"
          >
            Download Resume ↗
          </a>
        </div>
      </nav>
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
