import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const services = [
  {
    number: '01',
    title: 'Copy-editing',
    description: 'A careful edit for clarity, consistency and tone. Your meaning stays yours; the reading gets easier.'
  },
  {
    number: '02',
    title: 'Proofreading',
    description: 'A final check for spelling, punctuation, grammar and small slips before a document goes out.'
  },
  {
    number: '03',
    title: 'Document structure',
    description: 'A clearer order for headings, sections and key points, so readers can find what they need.'
  }
];

const steps = [
  ['01', 'Share a sample', 'Send a short piece and a little context about who will read it.'],
  ['02', 'Agree a scope', 'We outline the work, timing and handoff before anything begins.'],
  ['03', 'Review and hand off', 'You receive the edited document and a clear note on what changed.']
];

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="masthead">
        <a className="wordmark" href="#top" aria-label="Plainword home">
          PLAINWORD<span>Independent editorial service</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#services"><span>01</span> Services</a>
          <a href="#process"><span>02</span> Process</a>
          <a href="#next-step"><span>03</span> Next step</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <p className="eyebrow hero-context">Editorial support<br />for small organizations</p>
          <h1 id="hero-title">Clear writing.<br />Useful work.</h1>
          <div className="hero-note">
            <span className="signal" aria-hidden="true" />
            <p>Careful editing and structure for the words your business relies on.</p>
            <a href="#services">See how I can help <span aria-hidden="true">↓</span></a>
          </div>
          <p className="hero-edition">Plain language / thoughtful detail</p>
        </section>

        <section className="services section-rule" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">01 / Services</p>
            <h2 id="services-title">The right level<br />of editorial help.</h2>
            <p className="section-intro">Choose a focused check or bring a draft that needs a clearer shape.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" key={service.number}>
                <span className="row-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="process section-rule" id="process" aria-labelledby="process-title">
          <div className="process-heading">
            <p className="eyebrow">02 / Process</p>
            <h2 id="process-title">A clear way forward.</h2>
          </div>
          <div className="steps">
            {steps.map(([number, title, description]) => (
              <article className="step" key={number}>
                <span className="row-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="practical section-rule" aria-labelledby="practical-title">
          <div className="practical-title">
            <p className="eyebrow">A practical note</p>
            <h2 id="practical-title">Start small.</h2>
          </div>
          <details>
            <summary>What should I share first?</summary>
            <p>A short sample is enough to begin. Add a sentence about its purpose, audience and deadline; the next step is to agree a specific scope before any work starts.</p>
          </details>
        </section>

        <section className="next-step" id="next-step" aria-labelledby="next-title">
          <p className="eyebrow">03 / Next step</p>
          <div className="next-grid">
            <h2 id="next-title">Bring one page<br />into focus.</h2>
            <div className="next-copy">
              <p>Choose a short sample that would benefit from a careful read. Use it to decide what kind of help would be useful.</p>
              <p className="demo-note">This is a fictional service demonstration. No message is sent here; a real service would provide a verified way to share a sample.</p>
              <a href="#top" className="return-link">Return to the top <span aria-hidden="true">↑</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>PLAINWORD / Editorial service</span>
        <span>Clear writing for useful work</span>
        <span className="footer-mark" aria-hidden="true">PW—01</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
