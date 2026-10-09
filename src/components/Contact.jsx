import { useState } from "react";
import { EMAIL, LOCATION, SOCIAL_LINKS, FULL_NAME } from "../data/content";
import { use3DTilt } from "../hooks/use3DTilt";

const SOCIAL_ICONS = {
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  LeetCode: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  ),
  Kaggle: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.331z" />
    </svg>
  ),
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const cardTilt = use3DTilt(10, 1100);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="section section-contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="section-subtitle">
            Open for full-time AI/ML Engineering roles, research collaborations, and production consulting.
          </p>
        </div>

        <div className="contact-grid-3d">
          {/* Left Column: 3D Terminal Card */}
          <div
            ref={cardTilt.ref}
            onMouseMove={cardTilt.onMouseMove}
            onMouseEnter={cardTilt.onMouseEnter}
            onMouseLeave={cardTilt.onMouseLeave}
            className="card-3d contact-card-3d"
          >
            <div className="card-glare" />
            <div className="card-header-simple">
              <span className="tag-neural">DIRECT TRANSMISSION</span>
              <span className="mono-subtext">STATUS: READY</span>
            </div>

            <div className="contact-info-list">
              <div className="contact-info-row">
                <span className="info-key">NAME:</span>
                <span className="info-val">{FULL_NAME}</span>
              </div>
              <div className="contact-info-row">
                <span className="info-key">EMAIL:</span>
                <span className="info-val text-cyan">{EMAIL}</span>
              </div>
              <div className="contact-info-row">
                <span className="info-key">LOCATION:</span>
                <span className="info-val">{LOCATION}</span>
              </div>
              <div className="contact-info-row">
                <span className="info-key">LATENCY:</span>
                <span className="info-val text-emerald">&lt; 24h Response Rate</span>
              </div>
            </div>

            <div className="contact-cta-area">
              <button className="btn-3d btn-primary btn-copy-email" onClick={copyEmail}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  width="18"
                  height="18"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                <span>{copied ? "✓ Copied to Clipboard!" : "Copy Email Address"}</span>
              </button>

              <a
                href={`mailto:${EMAIL}`}
                className="btn-3d btn-glass btn-send-email"
              >
                <span>Open Mail Client ↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Social Portals */}
          <div className="social-portals-col">
            <h3 className="sub-heading-3d">DEVELOPER PROFILES</h3>
            <div className="social-portals-grid">
              {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-portal-card-3d"
                >
                  <div className="portal-icon-wrap">{SOCIAL_ICONS[name]}</div>
                  <div className="portal-text-wrap">
                    <span className="portal-name">{name}</span>
                    <span className="portal-sub">View Verified Profile</span>
                  </div>
                  <span className="portal-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="footer-simple">
        <div className="container footer-content">
          <div className="footer-brand">
            <span className="brand-logo">&lt;PS /&gt;</span>
            <span className="brand-desc">Prathamesh Shinde • AI/ML Developer</span>
          </div>
          <div className="footer-meta">
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
