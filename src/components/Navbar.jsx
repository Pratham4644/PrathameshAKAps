import { useEffect, useRef, useState } from "react";
import AmbientAudio from "./AmbientAudio";
import { NAV_LINKS, RESUME_URL } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Navbar({ activeScene }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const closeRef = useRef(null);
  const activeId = ["hero", ...NAV_LINKS.map((link) => link.href.slice(1))][activeScene - 1];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const handleNav = (href) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { immediate: prefersReducedMotion });
      return;
    }
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <header className={`nav-header${scrolled ? " nav-scrolled" : ""}`}>
      <nav className="nav-inner" aria-label="Primary navigation">
        <a
          href="#hero"
          className="nav-logo"
          onClick={(event) => {
            event.preventDefault();
            handleNav("#hero");
          }}
        >
          PS.
        </a>
        <ul className="nav-links-desktop">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link-item${activeId === link.href.slice(1) ? " is-active" : ""}`}
                onClick={(event) => {
                  event.preventDefault();
                  handleNav(link.href);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <AmbientAudio />
          <a href={RESUME_URL} className="btn-nav-resume" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
          <button
            ref={closeRef}
            className="hamburger"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} hidden={!menuOpen}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-nav-link"
            onClick={(event) => {
              event.preventDefault();
              handleNav(link.href);
            }}
          >
            {link.label}
          </a>
        ))}
        <a href={RESUME_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </div>
    </header>
  );
}
