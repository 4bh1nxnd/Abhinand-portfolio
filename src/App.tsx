import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Columns2,
  Download,
  Grid2X2,
  Mail,
  MapPin,
  Search,
  X,
} from "lucide-react";
import {
  activities,
  categories,
  coursework,
  credentials,
  education,
  profile,
  projects,
  skills,
} from "./portfolio";
import type { Category, Project } from "./portfolio";
import { filterProjects, isExternalLink } from "./gallery";

type Panel =
  | { kind: "project"; project: Project }
  | { kind: "about" | "contact" | "resume" };

function Monogram({ className = "" }: { className?: string }) {
  return (
    <span className={`monogram ${className}`} aria-hidden="true">
      {profile.initials}
    </span>
  );
}

function useColumnCount(compact: boolean) {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  if (width < 640) return 2;
  if (width < 1000) return 3;
  return compact ? 5 : 4;
}

function PortfolioDialog({
  panel,
  onClose,
  onContact,
}: {
  panel: Panel | null;
  onClose: () => void;
  onContact: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (panel && !dialog.current?.open) dialog.current?.showModal();
    if (!panel && dialog.current?.open) dialog.current?.close();
    if (panel) closeButton.current?.focus();
  }, [panel]);

  useEffect(() => {
    if (!panel) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [panel]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  const heading =
    panel?.kind === "project"
      ? panel.project.title
      : panel?.kind === "about"
        ? "A little about me."
        : panel?.kind === "contact"
          ? "Let’s make something."
          : "The bigger picture.";

  return (
    <dialog
      ref={dialog}
      className={`portfolio-dialog ${panel?.kind === "project" ? "project-dialog" : ""}`}
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {panel && (
        <div className="dialog-content">
          <button
            ref={closeButton}
            className="icon-button dialog-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={19} />
          </button>
          {panel.kind === "project" ? (
            <>
              <div
                className="project-preview"
                style={{ background: panel.project.background }}
              >
                <img src={panel.project.image} alt={panel.project.alt} />
              </div>
              <div className="project-detail">
                <div className="eyebrow">
                  {panel.project.category} <span> / </span> {panel.project.id}
                </div>
                <h2 id="dialog-title">{heading}</h2>
                <span className="placeholder-label">{panel.project.label}</span>
                <p className="detail-description">
                  {panel.project.description}
                </p>
                <ul className="project-highlights">
                  {panel.project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <dl className="project-meta">
                  <div>
                    <dt>Role</dt>
                    <dd>{panel.project.role}</dd>
                  </div>
                  {panel.project.period && (
                    <div>
                      <dt>When</dt>
                      <dd>{panel.project.period}</dd>
                    </div>
                  )}
                  {panel.project.tools && (
                    <div>
                      <dt>Made with</dt>
                      <dd>{panel.project.tools}</dd>
                    </div>
                  )}
                </dl>
                {isExternalLink(panel.project.url) ? (
                  <a
                    className="dark-button"
                    href={panel.project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit project <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <p className="placeholder-hint">
                    Illustrative cover—not an actual project screenshot.
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="text-panel">
              <Monogram className="panel-monogram" />
              <div className="eyebrow">
                {panel.kind === "about"
                  ? "THE PERSON BEHIND THE PIXELS"
                  : panel.kind === "contact"
                    ? "START A CONVERSATION"
                    : "LEARNING, QUALIFICATIONS & COMMUNITY"}
              </div>
              <h2 id="dialog-title">{heading}</h2>
              {panel.kind === "about" && (
                <>
                  <p className="about-name">Hi, I’m {profile.name}.</p>
                  <p className="profile-copy">{profile.bio}</p>
                  <dl className="about-meta">
                    <div>
                      <dt>What I do</dt>
                      <dd>{profile.role}</dd>
                    </div>
                    <div>
                      <dt>
                        <MapPin size={13} /> Based in
                      </dt>
                      <dd>{profile.location}</dd>
                    </div>
                    <div>
                      <dt>Right now</dt>
                      <dd>{profile.availability}</dd>
                    </div>
                  </dl>
                  <p className="profile-languages">
                    <span>Languages</span>
                    {profile.languages.join(" · ")}
                  </p>
                  <div className="profile-actions">
                    <button className="dark-button" onClick={onContact}>
                      Let’s connect <ArrowUpRight size={16} />
                    </button>
                    <a className="resume-link" href={profile.resume} download>
                      Download résumé <Download size={15} />
                    </a>
                  </div>
                </>
              )}
              {panel.kind === "contact" && (
                <>
                  <p className="panel-intro">
                    A new idea, a collaboration, or just a hello.
                    <br />
                    There’s always room for a good conversation.
                  </p>
                  {profile.email ? (
                    <div className="email-block">
                      <a href={`mailto:${profile.email}`}>
                        {profile.email} <ArrowUpRight size={22} />
                      </a>
                      <button
                        className="icon-button"
                        onClick={copyEmail}
                        aria-label={
                          copied ? "Email copied" : "Copy email address"
                        }
                      >
                        {copied ? <Check size={18} /> : <Mail size={18} />}
                      </button>
                      <span role="status" className="sr-only">
                        {copied ? "Email address copied" : ""}
                      </span>
                    </div>
                  ) : (
                    <div className="email-placeholder">
                      <Mail size={20} />
                      <span>[Your email address]</span>
                      <small>Contact details coming soon.</small>
                    </div>
                  )}
                  <a className="phone-link" href={profile.phoneHref}>
                    {profile.phone}
                    <ArrowUpRight size={14} />
                  </a>
                  <div className="social-links">
                    {profile.socialLinks.map((link) =>
                      isExternalLink(link.url) ? (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.label}
                          <ArrowUpRight size={14} />
                        </a>
                      ) : (
                        <span key={link.label}>
                          {link.label}
                          <small>Coming soon</small>
                        </span>
                      ),
                    )}
                    <a href={profile.resume} download>
                      Résumé <Download size={14} />
                    </a>
                  </div>
                </>
              )}
              {panel.kind === "resume" && (
                <>
                  <p className="panel-intro">
                    Courses, certifications, and the communities I’m part of.
                  </p>
                  <a className="dark-button" href={profile.resume} download>
                    Download résumé <Download size={16} />
                  </a>
                  <div className="note-list">
                    {credentials.map((credential) => (
                      <article key={credential.title}>
                        <span className="eyebrow">{credential.issuer}</span>
                        <h3>{credential.title}</h3>
                        <p>{credential.detail}</p>
                      </article>
                    ))}
                  </div>
                  <div className="resume-extra">
                    <h3>Coursework</h3>
                    <p>{coursework.join(" · ")}</p>
                    <h3>Community & creative work</h3>
                    <ul>
                      {activities.map((activity) => (
                        <li key={activity}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}

export default function App() {
  const [category, setCategory] = useState<Category>("Everything");
  const [query, setQuery] = useState("");
  const [compact, setCompact] = useState(false);
  const [panel, setPanel] = useState<Panel | null>(null);
  const count = useColumnCount(compact);
  const work = useRef<HTMLElement>(null);
  const results = filterProjects(projects, category, query);
  const columns = Array.from({ length: count }, (_, column) =>
    results.filter((_, index) => index % count === column),
  );

  function goToWork() {
    setPanel(null);
    work.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  }

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <header className="site-header">
        <a className="brand" href="#" aria-label={`${profile.name}, home`}>
          <Monogram className="brand-monogram" />
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <button className={!panel ? "nav-active" : ""} onClick={goToWork}>
            Work
          </button>
          <button
            className={panel?.kind === "about" ? "nav-active" : ""}
            onClick={() => setPanel({ kind: "about" })}
          >
            About
          </button>
          <button
            className={panel?.kind === "resume" ? "nav-active" : ""}
            onClick={() => setPanel({ kind: "resume" })}
          >
            Résumé <span className="nav-note-dot" />
          </button>
        </nav>
        <button
          className="contact-button"
          onClick={() => setPanel({ kind: "contact" })}
        >
          Let’s talk <ArrowUpRight size={15} />
        </button>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-eyebrow">
            <span className="status-dot" /> DEVELOPER · AI/ML · VISUAL
            STORYTELLER
          </div>
          <h1 id="hero-title">
            {profile.name}
            <span className="name-period">.</span>
          </h1>
          <p>{profile.tagline}</p>
          <button
            className="hero-scroll"
            onClick={goToWork}
            aria-label="Explore selected work"
          >
            <ArrowDown size={17} />
          </button>
          <span className="hero-side-note">Code meets creativity.</span>
          <span className="hero-side-number">
            KERALA, INDIA <span>↘</span>
          </span>
        </section>

        <section
          id="work"
          ref={work}
          className="work-section"
          aria-labelledby="work-title"
        >
          <div className="section-topline">
            <h2 id="work-title">
              Work & experience{" "}
              <span>({projects.length.toString().padStart(2, "0")})</span>
            </h2>
            <span className="collection-note">
              Building, learning & creating <ArrowDown size={12} />
            </span>
          </div>
          <div className="gallery-toolbar">
            <div
              className="filters"
              role="group"
              aria-label="Filter work by category"
            >
              {categories.map((item) => (
                <button
                  key={item}
                  aria-pressed={category === item}
                  className={category === item ? "filter active" : "filter"}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="gallery-tools">
              <label className="search-field">
                <Search size={15} />
                <input
                  aria-label="Search work"
                  placeholder="Find something..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                {query && (
                  <button
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                  >
                    <X size={13} />
                  </button>
                )}
              </label>
              <span className="tool-divider" />
              <div
                className="view-controls"
                role="group"
                aria-label="Gallery density"
              >
                <button
                  className={!compact ? "selected" : ""}
                  aria-label="Comfortable gallery"
                  aria-pressed={!compact}
                  onClick={() => setCompact(false)}
                >
                  <Columns2 size={16} />
                </button>
                <button
                  className={compact ? "selected" : ""}
                  aria-label="Compact gallery"
                  aria-pressed={compact}
                  onClick={() => setCompact(true)}
                >
                  <Grid2X2 size={16} />
                </button>
              </div>
            </div>
          </div>
          <p className="sr-only" role="status">
            {results.length} {results.length === 1 ? "entry" : "entries"} shown
          </p>
          {results.length ? (
            <div
              className={`gallery ${compact ? "gallery-compact" : ""}`}
              style={{
                gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
              }}
            >
              {columns.map((column, index) => (
                <div className="gallery-column" key={index}>
                  {column.map((project) => (
                    <article className="project-card" key={project.id}>
                      <button
                        className="project-image"
                        style={{
                          aspectRatio: project.aspectRatio,
                          background: project.background,
                        }}
                        onClick={() => setPanel({ kind: "project", project })}
                        aria-label={`Open ${project.title}, ${project.label.toLowerCase()}`}
                      >
                        <img
                          src={project.image}
                          alt={project.alt}
                          loading={Number(project.id) <= 4 ? "eager" : "lazy"}
                          decoding="async"
                        />
                        <span className="image-label">{project.category}</span>
                        <span className="image-open">
                          <ArrowUpRight size={20} />
                        </span>
                      </button>
                      <div className="project-caption">
                        <button
                          onClick={() => setPanel({ kind: "project", project })}
                        >
                          {project.title}
                        </button>
                        <span>{project.id}</span>
                      </div>
                      <p className="project-category">
                        {project.category} <span>·</span> {project.label}
                      </p>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={28} />
              <h3>Nothing here. Yet.</h3>
              <p>Try a different word, or take another look at everything.</p>
              <button
                className="dark-button"
                onClick={() => {
                  setQuery("");
                  setCategory("Everything");
                }}
              >
                <ArrowLeft size={15} /> Back to everything
              </button>
            </div>
          )}
          <div className="collection-bottom">
            <p>From code to the cutting room.</p>
            <span className="placeholder-label">
              Illustrated covers · résumé-backed entries
            </span>
          </div>
        </section>

        <section className="about-strip">
          <span className="eyebrow">BEYOND THE WORK</span>
          <div>
            <h2>Code, models & moving pictures.</h2>
            <p>
              Final-year Computer Science Engineering student, AI/ML enthusiast,
              and Co-Lead Videographer & Editor at Advay Media Crew.
            </p>
          </div>
          <button
            className="round-link"
            onClick={() => setPanel({ kind: "about" })}
          >
            A little about me <ArrowRight size={17} />
          </button>
        </section>
        <section
          className="background-section"
          aria-label="Education and technical skills"
        >
          <div className="education-column">
            <span className="eyebrow">THE FOUNDATION</span>
            <h2>Always learning.</h2>
            <div className="education-list">
              {education.map((item) => (
                <article key={item.degree}>
                  <span className="education-period">{item.period}</span>
                  <h3>{item.degree}</h3>
                  <p>{item.institution}</p>
                  <span className="education-result">{item.result}</span>
                </article>
              ))}
            </div>
          </div>
          <div className="skills-column">
            <span className="eyebrow">THE TOOLKIT</span>
            <h2>What I work with.</h2>
            {skills.map((group) => (
              <div className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <section className="contact-section">
          <div>
            <span className="eyebrow">GOOD THINGS START WITH A HELLO</span>
            <h2>Have something in mind?</h2>
          </div>
          <button onClick={() => setPanel({ kind: "contact" })}>
            Let’s talk <ArrowUpRight size={34} />
          </button>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#">
          <Monogram className="footer-monogram" />
          <span>{profile.name}</span>
        </a>
        <a className="footer-resume" href={profile.resume} download>
          Download résumé <Download size={12} />
        </a>
        <span>© {new Date().getFullYear()}</span>
      </footer>
      <PortfolioDialog
        panel={panel}
        onClose={() => setPanel(null)}
        onContact={() => setPanel({ kind: "contact" })}
      />
    </>
  );
}
