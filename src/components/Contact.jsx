import { useRef, useState } from "react";
import SceneSection from "./SceneSection";
import { EMAIL, FULL_NAME, SOCIAL_LINKS } from "../data/content";

export default function Contact() {
  const [toast, setToast] = useState("");
  const toastTimer = useRef(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2400);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      showToast("Copied");
    } catch {
      showToast("Copy the address from the email button");
    }
  };

  const sendMail = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio note from ${form.name || "visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <SceneSection id="contact">
      <article className="scene-copy">
        <p className="mono-label">05 — Contact</p>
        <h2>
          Send a <em className="accent-cyan">signal</em>
        </h2>
        <p className="contact-lead">Open to AI/ML engineering roles. Graduating 2027.</p>
        <div className="email-row">
          <a className="btn btn-primary" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <button type="button" className="btn btn-ghost" onClick={copyEmail}>
            Copy
          </button>
        </div>
        <p className="toast" role="status">{toast}</p>
        <form className="contact-form" onSubmit={sendMail}>
          <label>
            <span className="visually-hidden">Name</span>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </label>
          <label>
            <span className="visually-hidden">Email</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </label>
          <label>
            <span className="visually-hidden">Message</span>
            <textarea
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              required
            />
          </label>
          <button type="submit" className="btn btn-primary">Send email</button>
        </form>
        <footer className="footer-row">
          {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
              {name}
            </a>
          ))}
          <span>(c) 2026 {FULL_NAME}</span>
          <a href="#hero">Back to top</a>
        </footer>
      </article>
    </SceneSection>
  );
}
