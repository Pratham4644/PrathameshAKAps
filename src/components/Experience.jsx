import { MODEL_PERFORMANCE, ACHIEVEMENTS, EXPERIENCES, CERTIFICATIONS } from "../data/content";
import { use3DTilt } from "../hooks/use3DTilt";
import SectionReveal, { RevealGroup, RevealItem } from "./SectionReveal";

function ExperienceCard({ exp }) {
  const tilt = use3DTilt(8, 1000);
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseEnter={tilt.onMouseEnter}
      onMouseLeave={tilt.onMouseLeave}
      className="card-3d exp-card-3d"
    >
      <div className="card-glare" />
      <div className="exp-card-header">
        <div>
          <h4 className="exp-role-title">{exp.title}</h4>
          <p className="exp-company-name">{exp.company}</p>
        </div>
        <div className="exp-right-meta">
          <span className="exp-duration-badge">{exp.duration}</span>
          {exp.certificateUrl && (
            <a
              href={exp.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="exp-cert-btn"
            >
              Verify Credential ↗
            </a>
          )}
        </div>
      </div>
      <ul className="exp-points-list">
        {exp.description.map((d, i) => (
          <li key={i}>
            <span className="exp-point-arrow">▹</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
      <div className="exp-tags-cloud">
        {exp.tags.map((t) => (
          <span key={t} className="tech-badge">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <SectionReveal id="experience" className="section section-experience">
      <RevealGroup className="container">
        <RevealItem className="section-header">
          <h2 className="section-title">
            Experience &amp; <span className="text-gradient">Benchmarks</span>
          </h2>
          <p className="section-subtitle">
            Empirical validation, professional engagements, and state-level accolades.
          </p>
        </RevealItem>

        {/* 3D Glass Model Benchmark Telemetry Table */}
        <RevealItem>
        <div className="card-3d benchmark-card-3d">
          <div className="card-header-simple">
            <span className="tag-neural">EMPIRICAL BENCHMARKS &amp; ACCURACY MATRIX</span>
            <span className="mono-subtext">VALIDATION_SPLIT_v2</span>
          </div>
          <div className="table-responsive">
            <table className="benchmark-table">
              <thead>
                <tr>
                  <th>TASK / DOMAIN</th>
                  <th>ARCHITECTURE</th>
                  <th>DATASET</th>
                  <th>PRIMARY METRIC</th>
                  <th>BENCHMARK RESULT</th>
                </tr>
              </thead>
              <tbody>
                {MODEL_PERFORMANCE.map((row) => (
                  <tr key={row.task}>
                    <td className="td-task">{row.task}</td>
                    <td className="td-algo">{row.algorithm}</td>
                    <td className="td-dataset">{row.dataset}</td>
                    <td className="td-metric">{row.metric}</td>
                    <td className="td-score">
                      <span className="score-pill">{row.score}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </RevealItem>

        {/* Professional Experience */}
        <RevealItem className="experience-block">
          <h3 className="sub-heading-3d">INDUSTRY ENGAGEMENT</h3>
          <RevealGroup className="exp-list-container">
            {EXPERIENCES.map((exp) => (
              <RevealItem key={exp.company}>
                <ExperienceCard exp={exp} />
              </RevealItem>
            ))}
          </RevealGroup>
        </RevealItem>

        {/* Honors & Hackathon Wins */}
        <RevealItem className="achievements-block">
          <h3 className="sub-heading-3d">HONORS &amp; COMPETITIONS</h3>
          <RevealGroup className="achievements-grid-3d">
            {ACHIEVEMENTS.map((ach, i) => (
              <RevealItem key={ach.title} className="card-3d ach-card-3d">
                <div className="card-glare" />
                <div className="ach-top-meta">
                  <span className="ach-trophy">🏆</span>
                  <span className="ach-rank-tag">RANK #{i + 1}</span>
                </div>
                <h4 className="ach-title-text">{ach.title}</h4>
                <p className="ach-desc-text">{ach.detail}</p>
                {ach.url && (
                  <a
                    href={ach.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ach-link-btn"
                  >
                    View Verification ↗
                  </a>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        </RevealItem>

        {/* Certifications */}
        <RevealItem className="certifications-block">
          <h3 className="sub-heading-3d">LICENSES &amp; CERTIFICATIONS</h3>
          <RevealGroup className="certs-grid-3d">
            {CERTIFICATIONS.map((cert) => (
              <RevealItem
                key={cert.title}
                className="cert-card-3d"
              >
                <a href={cert.url} target="_blank" rel="noopener noreferrer">
                  <div className="cert-meta-row">
                    <span className="cert-issuer-badge">{cert.issuer}</span>
                    <span className="cert-arrow">↗</span>
                  </div>
                  <h4 className="cert-title-text">{cert.title}</h4>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </RevealItem>
      </RevealGroup>
    </SectionReveal>
  );
}
