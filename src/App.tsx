import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Scene3D } from './components/Scene3D'
import { ScrollScene3D } from './components/ScrollScene3D'

interface Project {
  title: string
  status: 'development' | 'completed'
  description: string
  technologies: string[]
  githubUrl: string
}

interface Experience {
  title: string
  company: string
  location: string
  period: string
  responsibilities: string[]
}

interface Education {
  degree: string
  institution: string
  period: string
  courses?: string[]
}

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) {
        return saved === 'dark'
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return true
  })
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track mouse position for cursor interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Update hero background parallax
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        heroRef.current.style.setProperty('--mouse-x', `${x}%`)
        heroRef.current.style.setProperty('--mouse-y', `${y}%`)
        
        // Also update mouse position in pixels for grid transform
        const xPx = e.clientX - rect.left
        const yPx = e.clientY - rect.top
        heroRef.current.style.setProperty('--mouse-x-px', `${xPx}px`)
        heroRef.current.style.setProperty('--mouse-y-px', `${yPx}px`)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const projects: Project[] = [
    {
      title: 'Recipe Almanac',
      status: 'development',
      description: 'This is the Recipe Almanac, a digital recipe book you can share, browse and write your own. I am tired of recipe pages that just want your email to add you to mailing list or want you to pay for a subscription or just covered in ads. This page will never have any of those and is here to be every cook\'s and baker\'s recipe book.',
      technologies: ['React', 'Node.js', 'Database'],
      githubUrl: 'https://github.com/moayed-abdalla/Recipe_Almanac'
    },
    {
      title: 'PyBI Dash',
      status: 'development',
      description: 'Dynamic KPI Dashboard Builder (Streamlit App). A "full-stack" Python application built with Streamlit that allows business analysts and data engineers to quickly build and customize a KPI dashboard by uploading their own data. Features include data upload (CSV/Excel), multiple chart types, interactive configuration, and responsive dark/light mode.',
      technologies: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
      githubUrl: 'https://github.com/moayed-abdalla/PyBI_2.0'
    },
    {
      title: 'Portfolio',
      status: 'completed',
      description: 'Personal portfolio website showcasing my projects, experience, and skills. Built with React and TypeScript with modern animations and responsive design.',
      technologies: ['React', 'TypeScript', 'CSS'],
      githubUrl: 'https://github.com/moayed-abdalla/portfolio'
    },
    {
      title: 'OpenStreetMap Data Scraping & Clustering',
      status: 'completed',
      description: 'Multi-threaded processing algorithm for solar and wind data scraping and clustering from OpenStreetMap. (Under NDA)',
      technologies: ['Python', 'Multi-threading', 'Data Scraping', 'Clustering'],
      githubUrl: 'https://github.com/moayed-abdalla'
    },
    {
      title: 'New York Coffee Chain Data Study',
      status: 'completed',
      description: 'Transactional data study and dashboard built on Python (pandas) using Streamlit and Plotly to analyze coffee chain performance and provide business insights.',
      technologies: ['Python', 'Pandas', 'Streamlit', 'Plotly', 'Data Analysis'],
      githubUrl: 'https://github.com/moayed-abdalla'
    },
    {
      title: 'Cookie Shop Full Stack Website',
      status: 'completed',
      description: 'Full stack e-commerce website built with JavaScript, React, and Node.js using SQL for data management on Supabase.',
      technologies: ['JavaScript', 'React', 'Node.js', 'SQL', 'Supabase'],
      githubUrl: 'https://github.com/moayed-abdalla'
    }
  ]

  const experiences: Experience[] = [
    {
      title: 'Technical Manager',
      company: 'Impact Fundry',
      location: 'London (Hybrid)',
      period: 'July 2025 – Ongoing',
      responsibilities: [
        'Project management and team coordination, using agile methodology to optimise company workflows',
        'Developing and maintaining websites and backend automation systems',
        'Tracking company internal and external metrics, building dashboards and advising on business direction based on data'
      ]
    },
    {
      title: 'Data Engineer',
      company: 'Ambrrr',
      location: 'Singapore (Remote)',
      period: 'October 2022 – June 2025',
      responsibilities: [
        'Built and maintained complex ETL pipelines using Python, REST APIs, and SQL to streamline data flow and integration',
        'Developed backend analytics logic and contributed to DevOps workflows to improve application performance and deployment efficiency',
        'Designed and delivered insightful data visualizations and dashboards to support product and operational decision-making'
      ]
    },
    {
      title: 'Data Manager Internship',
      company: 'Quizona',
      location: 'Malaysia',
      period: 'June 2021 - November 2021',
      responsibilities: [
        'Managed and organized data to ensure accuracy and accessibility for users and team members, additionally developed KPI dashboards for review of metrics',
        'Developed project scraping algorithm to recognise and filter data into usable forms for use within the app',
        'Constructed model questions to enhance the educational content of the application'
      ]
    }
  ]

  const education: Education[] = [
    {
      degree: 'Master of Business Analytics',
      institution: 'O. P. Jindal Global University',
      period: '2025 – 2026',
      courses: ['Advanced Business Analytics', 'Big Data Analytics', 'Managing People & Organizations', 'Financial Management', 'DB Management', 'Financial Accounting']
    },
    {
      degree: 'Bachelor of Mechanical Engineering',
      institution: 'University of Southampton',
      period: '2020 – 2024',
      courses: ['Finite Element Analysis', 'Materials and Manufacturing', 'Engineering Design and Management', 'Thermodynamics', 'Design and Computing']
    }
  ]


  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">Moayed</div>
          <button 
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
          <button 
            className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          {isMenuOpen && (
            <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
          )}
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#hero" className={activeSection === 'hero' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Projects</a>
            <a href="#experience" className={activeSection === 'experience' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Experience</a>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="hero" 
        ref={(el) => {
          sectionsRef.current['hero'] = el
          heroRef.current = el
        }} 
        className="hero"
      >
        <div className="hero-background">
          <div className="grid-overlay"></div>
          <div className="data-particles"></div>
          <div className="cursor-interaction"></div>
        </div>
        <div className="hero-3d-container">
          <Scene3D scrollY={scrollY} />
        </div>
        <div className="hero-content">
          <h1 className="hero-name">
            Moayed Abdalla
          </h1>
          <p className="hero-description">
            Data Engineer • Business Analyst • Technical Manager
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Get in Touch</a>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={(el) => (sectionsRef.current['about'] = el)} className="section about">
        <div className="section-3d-container">
          <ScrollScene3D scrollY={scrollY} sectionOffset={heroRef.current?.offsetHeight || 0} />
        </div>
        <div className="container">
          <h2 className="section-title">
            01. About Me
          </h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Dynamic and results-driven professional with a unique blend of technical expertise and 
                business acumen. My background started with mechanical engineering, and shifted over 
                time into a Data and Programming field and now in Business Analytics.
              </p>
              <p>
                This provides a strong foundation in both data-driven problem-solving and strategic business 
                operations. As a Technical Manager, I have successfully led projects that optimize company 
                workflows, track key metrics, and advise on business strategy through advanced analytics.
              </p>
              <p>
                My hands-on experience in data engineering, from building ETL pipelines to creating insightful 
                dashboards, is complemented by a proven ability to lead teams, manage projects, and communicate 
                effectively with executives and clients across diverse cultural environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={(el) => (sectionsRef.current['projects'] = el)} className="section projects">
        <div className="section-3d-container">
          <ScrollScene3D scrollY={scrollY} sectionOffset={(heroRef.current?.offsetHeight || 0) + (sectionsRef.current['about']?.offsetHeight || 0)} />
        </div>
        <div className="container">
          <h2 className="section-title">
            02. Projects
          </h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className={`project-card ${project.status}`}>
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span className={`project-status ${project.status}`}>
                    {project.status === 'development' ? 'In Development' : 'Completed'}
                  </span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-github-link"
                >
                  <span className="github-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </span>
                  GitHub
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={(el) => (sectionsRef.current['experience'] = el)} className="section experience">
        <div className="section-3d-container">
          <ScrollScene3D 
            scrollY={scrollY} 
            sectionOffset={
              (heroRef.current?.offsetHeight || 0) + 
              (sectionsRef.current['about']?.offsetHeight || 0) + 
              (sectionsRef.current['projects']?.offsetHeight || 0)
            } 
          />
        </div>
        <div className="container">
          <h2 className="section-title">
            03. Experience
          </h2>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{exp.title}</h3>
                    <span className="timeline-company">{exp.company}</span>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-location">{exp.location}</span>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <ul className="timeline-responsibilities">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" ref={(el) => (sectionsRef.current['education'] = el)} className="section education">
        <div className="container">
          <h2 className="section-title">
            04. Education
          </h2>
          <div className="education-grid">
            {education.map((edu, index) => (
              <div key={index} className="education-card">
                <h3>{edu.degree}</h3>
                <p className="education-institution">{edu.institution}</p>
                <p className="education-period">{edu.period}</p>
                {edu.courses && (
                  <div className="education-courses">
                    <strong>Key courses:</strong>
                    <ul>
                      {edu.courses.map((course, i) => (
                        <li key={i}>{course}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={(el) => (sectionsRef.current['contact'] = el)} className="section contact">
        <div className="container">
          <h2 className="section-title">
            05. Get In Touch
          </h2>
          <div className="contact-content">
            <p className="contact-description">
              I'm always open to discussing new opportunities, interesting projects, or just having a conversation about data, engineering, or technology.
            </p>
            <div className="contact-info">
              <a href="mailto:moayed.h.abdalla@gmail.com" className="contact-item">
                <span className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <span>moayed.h.abdalla@gmail.com</span>
              </a>
              <a href="tel:+966501907661" className="contact-item">
                <span className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <span>+966 50 190 7661</span>
              </a>
              <a href="https://linkedin.com/in/moayed-abdalla/" target="_blank" rel="noopener noreferrer" className="contact-item">
                <span className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </span>
                <span>https://linkedin.com/in/moayed-abdalla/</span>
              </a>
              <a href="https://github.com/moayed-abdalla" target="_blank" rel="noopener noreferrer" className="contact-item">
                <span className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </span>
                <span>https://github.com/moayed-abdalla</span>
              </a>
              <div className="contact-item">
                <span className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <span>Jeddah, Saudi Arabia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Moayed Abdalla. Built with React & TypeScript.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
