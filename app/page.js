'use client';

import { useEffect, useState } from 'react';
import ProjectModal from './components/ProjectModal';
import portfolioData from './data.json';

const { companyWork, education, profile, sideProjects } = portfolioData;
const linkedinUrl = profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`;
const githubUrl = profile.github
  ? profile.github.startsWith('http')
    ? profile.github
    : `https://${profile.github}`
  : '';

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const hasOddCompanyCount = companyWork.length % 2 === 1;
  const visibleCompanies = hasOddCompanyCount && !showAllCompanies ? companyWork.slice(0, -1) : companyWork;
  const hiddenCompany = hasOddCompanyCount ? companyWork[companyWork.length - 1] : null;
  const chronologicalCompanies = [...companyWork].reverse();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    const initialTheme = savedTheme || (mediaQuery.matches ? 'light' : 'dark');
    setTheme(initialTheme);

    if (savedTheme) return;

    const onThemeChange = (event) => {
      setTheme(event.matches ? 'light' : 'dark');
    };

    mediaQuery.addEventListener('change', onThemeChange);
    return () => mediaQuery.removeEventListener('change', onThemeChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!selectedItem) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedItem(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedItem]);

  return (
    <main className="site-wrap">
      <div className="theme-bar">
        <div className="theme-toggle" role="tablist" aria-label="Theme switcher">
          <button
            type="button"
            className={theme === 'dark' ? 'theme-chip is-active' : 'theme-chip'}
            onClick={() => setTheme('dark')}
            aria-pressed={theme === 'dark'}
          >
            Night
          </button>
          <button
            type="button"
            className={theme === 'light' ? 'theme-chip is-active' : 'theme-chip'}
            onClick={() => setTheme('light')}
            aria-pressed={theme === 'light'}
          >
            Day
          </button>
        </div>
      </div>

      <section className="hero card hero-card">
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="lead">{profile.intro}</p>

        <div className="contact-links">
          <a href={linkedinUrl} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          {githubUrl ? (
            <a href={githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
          ) : null}
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </section>

      <section className="card accent-card">
        <h2>Skills</h2>
        <p className="section-note">
          Core strengths, tools, and working areas that define how I build and deliver.
        </p>
        <ul className="interest-list">
          {profile.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="card company-shell">
        <div className="section-head">
          <h2>Company</h2>
          <p className="section-note">Open a company to see the projects and work delivered there.</p>
        </div>

        <div className="company-timeline" aria-label="Career timeline">
          {chronologicalCompanies.map((company) => (
            <button
              key={company.id}
              type="button"
              className="timeline-item"
              onClick={() => setSelectedItem({ type: 'company', ...company })}
              aria-label={`Open work for ${company.company}`}
            >
              <div className="timeline-rail" aria-hidden="true">
                <span className="timeline-dot" />
              </div>
              <div className="timeline-copy">
                <p className="timeline-company">{company.company}</p>
                <p className="timeline-role">{company.role}</p>
                <p className="timeline-period">{company.period}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="project-grid company-grid">
          {visibleCompanies.map((company) => (
            <button
              key={company.id}
              className="project-card"
              onClick={() => setSelectedItem({ type: 'company', ...company })}
              aria-label={`Open work for ${company.company}`}
            >
              <div className="project-block">
                <p className="project-company">{company.company}</p>
                <p className="project-meta">{company.role}</p>
                <p className="project-meta">{company.period}</p>
                <p className="project-meta">{company.location}</p>
                <p className="project-summary">{company.overview}</p>
              </div>
              <span className="project-cta">View company work</span>
            </button>
          ))}
        </div>

        {hiddenCompany && !showAllCompanies ? (
          <div className="company-expand-wrap">
            <button
              type="button"
              className="expand-button"
              onClick={() => setShowAllCompanies(true)}
              aria-expanded={showAllCompanies}
            >
              View more company experience
            </button>
          </div>
        ) : null}

        {hiddenCompany && showAllCompanies ? (
          <div className="company-extra">
            <button
              className="project-card company-card-single"
              onClick={() => setSelectedItem({ type: 'company', ...hiddenCompany })}
              aria-label={`Open work for ${hiddenCompany.company}`}
            >
              <div className="project-block">
                <p className="project-company">{hiddenCompany.company}</p>
                <p className="project-meta">{hiddenCompany.role}</p>
                <p className="project-meta">{hiddenCompany.period}</p>
                <p className="project-meta">{hiddenCompany.location}</p>
                <p className="project-summary">{hiddenCompany.overview}</p>
              </div>
              <span className="project-cta">View company work</span>
            </button>
          </div>
        ) : null}
      </section>

      <section className="card">
        <div className="section-head">
          <h2>Side Projects</h2>
          <p className="section-note">Browse independent projects separately from company work.</p>
        </div>

        <div className="project-grid side-project-grid">
          {sideProjects.map((project) => (
            <button
              key={project.id}
              className="project-card"
              onClick={() => setSelectedItem({ type: 'side-project', ...project })}
              aria-label={`Open side project ${project.projectName}`}
            >
              <div className="project-block">
                <h3>{project.projectName}</h3>
                {project.period ? <p className="project-meta">{project.period}</p> : null}
                <p className="project-summary">{project.summary}</p>
              </div>
              <span className="project-cta">View project</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="section-head">
          <h2>Education</h2>
          <p className="section-note">Formal education, training, and relevant programs.</p>
        </div>
        <div className="education-list">
          {education.map((item) => (
            <article key={item.id} className="education-item">
              <div className="education-head">
                <h3>{item.institution}</h3>
                <p className="education-period">{item.period}</p>
              </div>
              <p className="education-course">{item.course}</p>
              <p className="project-summary">{item.details}</p>
            </article>
          ))}
        </div>
      </section>

      <ProjectModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </main>
  );
}
