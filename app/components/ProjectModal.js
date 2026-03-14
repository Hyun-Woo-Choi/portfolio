import Image from 'next/image';

export default function ProjectModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Project details"
      onClick={onClose}
    >
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close project details">
          ✕
        </button>

        {item.type === 'company' ? (
          <>
            <div className="detail-section">
              <p className="project-label">Company</p>
              <p className="modal-company">{item.company}</p>
              <p className="project-meta">
                {item.role} · {item.period}
              </p>
              <p className="project-meta">{item.location}</p>
              <p className="project-summary">{item.overview}</p>
            </div>

            <div className="detail-section">
              <p className="project-label">Projects / Responsibilities</p>
              <div className="modal-work-list">
                {item.projects.map((project) => (
                  <article key={project.id} className="modal-work-card">
                    <h3>{project.projectName}</h3>
                    <p className="project-summary">{project.summary}</p>

                    {project.image ? (
                      <div className="modal-image-wrap">
                        <Image
                          src={project.image}
                          alt={`${project.projectName} outcome`}
                          width={760}
                          height={420}
                          priority
                        />
                      </div>
                    ) : null}

                    <ul className="outcome-list">
                      {project.outcomes.map((outcome) => (
                        <li key={outcome}>{outcome}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="detail-section">
              <p className="project-label">Side Project</p>
              <h3>{item.projectName}</h3>
              {item.period ? <p className="project-meta">{item.period}</p> : null}
              <p className="project-summary">{item.summary}</p>
            </div>

            {item.image ? (
              <div className="modal-image-wrap">
                <Image src={item.image} alt={`${item.projectName} outcome`} width={760} height={420} priority />
              </div>
            ) : (
              <p className="image-fallback">Image not provided for this project. Outcomes are listed in text below.</p>
            )}

            <div className="detail-section">
              <p className="project-label">Outcome Highlights</p>
              <ul className="outcome-list">
                {item.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
