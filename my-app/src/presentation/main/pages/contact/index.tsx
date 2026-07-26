import './contact.css';

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-glow" />

      <section className="contact-hero">
        <div className="contact-hero-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Get in Touch
        </div>
        <h1 className="contact-title">Connect With Us</h1>
        <p className="contact-desc">
          Have questions, suggestions, or want to contribute? We'd love to hear from you.
        </p>
      </section>

      <section className="contact-channels">
        <div className="channels-grid">
          <a href="https://github.com/whydrf/pure-clean-architecture" target="_blank" rel="noopener noreferrer" className="channel-card">
            <div className="channel-icon channel-github">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <h3>GitHub</h3>
            <p>Star the repo, report issues, or contribute to the project.</p>
            <span className="channel-link">whydrf/pure-clean-architecture</span>
          </a>

          <a href="https://www.npmjs.com/package/@whydrf/eslint-plugin-nava" target="_blank" rel="noopener noreferrer" className="channel-card">
            <div className="channel-icon channel-npm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19V5a2 2 0 012-2h8l6 6v10a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
                <path d="M9 12h6m-6 4h4" />
              </svg>
            </div>
            <h3>NPM Package</h3>
            <p>Install the ESLint plugin for enforcing clean architecture rules.</p>
            <span className="channel-link">@whydrf/eslint-plugin-nava</span>
          </a>

          <a href="https://github.com/whydrf/pure-clean-architecture/issues" target="_blank" rel="noopener noreferrer" className="channel-card">
            <div className="channel-icon channel-issues">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3>Report Issues</h3>
            <p>Found a bug or have a feature request? Open an issue on GitHub.</p>
            <span className="channel-link">github.com/.../issues</span>
          </a>

          <a href="https://github.com/whydrf/pure-clean-architecture/pulls" target="_blank" rel="noopener noreferrer" className="channel-card">
            <div className="channel-icon channel-pr">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <path d="M6 21V9a9 9 0 009 9" />
              </svg>
            </div>
            <h3>Contributions</h3>
            <p>Want to improve the project? Submit a pull request.</p>
            <span className="channel-link">github.com/.../pulls</span>
          </a>
        </div>
      </section>

      <section className="contact-stack">
        <h2 className="section-title">Built With</h2>
        <div className="stack-list">
          <div className="stack-tag">
            <span className="stack-dot" style={{ background: '#61dafb' }} />
            React 19
          </div>
          <div className="stack-tag">
            <span className="stack-dot" style={{ background: '#3178c6' }} />
            TypeScript
          </div>
          <div className="stack-tag">
            <span className="stack-dot" style={{ background: '#646cff' }} />
            Vite
          </div>
          <div className="stack-tag">
            <span className="stack-dot" style={{ background: '#4b32c3' }} />
            Clean Architecture
          </div>
          <div className="stack-tag">
            <span className="stack-dot" style={{ background: '#f7df1e' }} />
            ESLint + Prettier
          </div>
          <div className="stack-tag">
            <span className="stack-dot" style={{ background: '#ff3e00' }} />
            Commander.js
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
