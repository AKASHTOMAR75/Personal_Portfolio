import React, { useEffect, useRef, useState } from 'react';
import './index.css';

function App() {
  const typingRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // 1. Typing Effect
    const words = ['AI/ML Engineer.', 'Generative AI Dev.', 'Python Specialist.', 'Tech Enthusiast.'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let timeoutId = null;
    
    function typeEffect() {
      if (!typingRef.current) return;
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typingRef.current.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
      } else {
        typingRef.current.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
      }
      
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingDelay = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingDelay = 500;
      }
      
      timeoutId = setTimeout(typeEffect, typingDelay);
    }
    
    timeoutId = setTimeout(typeEffect, 1000);

    // 2. Navbar scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // 3. Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach(el => observer.observe(el));

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      hiddenElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <div className="bg-effects">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="logo">Akash<span>.AI</span></a>
          <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#skills" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
            <a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
            <a href="#experience" onClick={() => setIsMobileMenuOpen(false)}>Experience</a>
          </div>
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-content hidden-element">
            <div className="status-badge">
              <span className="pulse-dot"></span> Open to AI/ML Roles
            </div>
            <h2 className="greeting">Hello, I am</h2>
            <h1 className="name">Akash <span className="gradient-text">Tomar</span></h1>
            <div className="typing-container">
              <span id="typing-text" ref={typingRef}></span><span className="cursor">_</span>
            </div>
            <p className="hero-desc">
              B.Tech IT Student focused on Generative AI, LLMs, and Machine Learning. I build intelligent systems and data-driven solutions.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="Akash_122_Resume.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">
                <i className="fas fa-file-pdf"></i> View Resume
              </a>
            </div>
          </div>
          <div className="hero-visual hidden-element">
            <div className="glass-terminal">
              <div className="terminal-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="terminal-title">akash@ai-workspace ~ python model.py</span>
              </div>
              <div className="terminal-body">
                <p className="cmd">{">>> import torch"}</p>
                <p className="cmd">{">>> from transformers import AutoModelForCausalLM"}</p>
                <p className="cmd">{">>> model = AutoModelForCausalLM.from_pretrained('llm-future')"}</p>
                <p className="cmd">{">>> print(model.generate(prompt='Building the future...'))"}</p>
                <p className="output">"Creating robust AI systems with RAG, agents, and data analytics."</p>
                <p className="cmd blinking-cursor-terminal">_</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <div className="section-header hidden-element">
            <h2>About Me</h2>
            <div className="divider"></div>
          </div>
          <div className="about-content hidden-element">
            <div className="about-text glass-card">
              <h3 className="gradient-text">Engineering Intelligent Solutions</h3>
              <p>I am a B.Tech Information Technology student with a CGPA of 8.0, deeply passionate about Generative AI, Large Language Models (LLMs), and Machine Learning.</p>
              <p>My journey involves hands-on experience with Retrieval-Augmented Generation (RAG), prompt engineering, chatbot development, and data analytics through various academic projects and industry internships.</p>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-num">8.0</span>
                  <span className="stat-label">CGPA</span>
                </div>
                <div className="stat">
                  <span className="stat-num">5+</span>
                  <span className="stat-label">Key Projects</span>
                </div>
                <div className="stat">
                  <span className="stat-num">2</span>
                  <span className="stat-label">Internships</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills">
          <div className="section-header hidden-element">
            <h2>Technical Arsenal</h2>
            <div className="divider"></div>
          </div>
          <div className="skills-grid">
            <div className="skill-card glass-card hidden-element">
              <div className="skill-icon"><i className="fas fa-brain"></i></div>
              <h3>Generative AI & LLMs</h3>
              <ul className="skill-list">
                <li><span>Retrieval-Augmented Generation (RAG)</span></li>
                <li><span>Prompt Engineering & Chatbots</span></li>
                <li><span>Multi-Agent Systems</span></li>
                <li><span>OpenAI API & Transformers</span></li>
                <li><span>Model Fine-Tuning</span></li>
              </ul>
            </div>
            <div className="skill-card glass-card hidden-element">
              <div className="skill-icon"><i className="fas fa-code"></i></div>
              <h3>Programming</h3>
              <ul className="skill-list">
                <li><span>Python</span></li>
                <li><span>C / C++</span></li>
                <li><span>JavaScript</span></li>
                <li><span>HTML5 & CSS3</span></li>
              </ul>
            </div>
            <div className="skill-card glass-card hidden-element">
              <div className="skill-icon"><i className="fas fa-chart-network"></i></div>
              <h3>ML & Data Science</h3>
              <ul className="skill-list">
                <li><span>Machine Learning & Deep Learning</span></li>
                <li><span>Data Analytics & Visualization</span></li>
                <li><span>Pandas & NumPy</span></li>
                <li><span>Matplotlib & Seaborn</span></li>
              </ul>
            </div>
            <div className="skill-card glass-card hidden-element">
              <div className="skill-icon"><i className="fas fa-tools"></i></div>
              <h3>Tools & Platforms</h3>
              <ul className="skill-list">
                <li><span>Git & GitHub</span></li>
                <li><span>Streamlit</span></li>
                <li><span>Jupyter Notebook & Kaggle</span></li>
                <li><span>VS Code</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects">
          <div className="section-header hidden-element">
            <h2>Featured Projects</h2>
            <div className="divider"></div>
          </div>
          <div className="projects-container">
            <div className="project-card glass-card hidden-element">
              <div className="project-info">
                <span className="project-tags">Python • Streamlit • Pandas • NumPy</span>
                <h3>Multi-Task Interactive Dashboard</h3>
                <p>Built an interactive multi-task dashboard in Streamlit to handle multiple data operations from a single interface. Processed and cleaned datasets before rendering results, visualizing trends with Matplotlib.</p>
              </div>
            </div>
            <div className="project-card glass-card hidden-element">
              <div className="project-info">
                <span className="project-tags">Python • API Integration • Tkinter</span>
                <h3>Weather App</h3>
                <p>Developed an application fetching live weather data. Integrated a weather API for real-time temperature, humidity, and condition data, presented via a simple, user-friendly interface.</p>
              </div>
            </div>
            <div className="project-card glass-card hidden-element">
              <div className="project-info">
                <span className="project-tags">Python • Hardware Interfacing</span>
                <h3>Automatic Remote Car</h3>
                <p>Built a remote-controlled car combining electronic components with software movement-control logic. Wrote Python-based control logic to translate remote commands into motor movements.</p>
              </div>
            </div>
            <div className="project-card glass-card hidden-element">
              <div className="project-info">
                <span className="project-tags">Python • File Handling</span>
                <h3>Books Library Management System</h3>
                <p>Developed a system to store and manage book records. Implemented add, search, and issue operations with persistent file handling across sessions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Education Section */}
        <section id="experience" className="timeline-section">
          <div className="timeline-container">
            <div className="timeline-col">
              <div className="section-header hidden-element">
                <h2>Experience</h2>
                <div className="divider"></div>
              </div>
              <div className="timeline">
                <div className="timeline-item hidden-element">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content glass-card">
                    <h4>Web Development Intern (JavaScript)</h4>
                    <h5>EWB Company</h5>
                    <span className="date">September 2026 – Present</span>
                    <p>Built and tested web functionality using JavaScript. Gained practical exposure to real-world development, debugging, and teamwork.</p>
                  </div>
                </div>
                <div className="timeline-item hidden-element">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content glass-card">
                    <h4>Intern</h4>
                    <h5>CodoMax</h5>
                    <span className="date">August 2026 – September 2026</span>
                    <p>Applied programming skills to practical, hands-on tasks during a one-month industry internship.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="timeline-col">
              <div className="section-header hidden-element">
                <h2>Education & Certifications</h2>
                <div className="divider"></div>
              </div>
              <div className="timeline">
                <div className="timeline-item hidden-element">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content glass-card">
                    <h4>B.Tech in Information Technology</h4>
                    <h5>Rajasthan Technical University (RTU), Kota</h5>
                    <span className="date">CGPA: 8.0 / 10</span>
                  </div>
                </div>
                <div className="timeline-item hidden-element">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content glass-card">
                    <h4>Certifications & Achievements</h4>
                    <ul className="cert-list">
                      <li>IBM – Troubleshoot Your Code using IBM Bob</li>
                      <li>Generative AI Certification & Python Certification</li>
                      <li>Tally Certification</li>
                      <li>Represented at West Zone level (2 times) in Handball.</li>
                      <li>Won college-level tournaments in Handball, Cricket.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <h2 className="gradient-text">Let's Connect</h2>
          <p>Email: akashtomar5048@gmail.com | Mobile: 9389589124</p>
          <div className="social-links">
            <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-github"></i></a>
          </div>
          <p className="copyright">© 2026 Akash Tomar. Designed with <i className="fas fa-heart" style={{color: 'var(--accent-1)'}}></i></p>
        </div>
      </footer>
    </>
  );
}

export default App;
