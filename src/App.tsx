import { useEffect, useRef, useState } from 'react'
import './App.css'

interface Project {
  title: string
  status: 'development' | 'completed'
  description: string
  technologies: string[]
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
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

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
      technologies: ['React', 'Node.js', 'Database']
    },
    {
      title: 'PyBI Dash',
      status: 'development',
      description: 'Dynamic KPI Dashboard Builder (Streamlit App). A "full-stack" Python application built with Streamlit that allows business analysts and data engineers to quickly build and customize a KPI dashboard by uploading their own data. Features include data upload (CSV/Excel), multiple chart types, interactive configuration, and responsive dark/light mode.',
      technologies: ['Python', 'Streamlit', 'Pandas', 'Plotly']
    },
    {
      title: 'OpenStreetMap Data Scraping & Clustering',
      status: 'completed',
      description: 'Multi-threaded processing algorithm for solar and wind data scraping and clustering from OpenStreetMap.',
      technologies: ['Python', 'Multi-threading', 'Data Scraping', 'Clustering']
    },
    {
      title: 'New York Coffee Chain Data Study',
      status: 'completed',
      description: 'Transactional data study and dashboard built on Python (pandas) using Streamlit and Plotly to analyze coffee chain performance and provide business insights.',
      technologies: ['Python', 'Pandas', 'Streamlit', 'Plotly', 'Data Analysis']
    },
    {
      title: 'Cookie Shop Full Stack Website',
      status: 'completed',
      description: 'Full stack e-commerce website built with JavaScript, React, and Node.js using SQL for data management on Supabase.',
      technologies: ['JavaScript', 'React', 'Node.js', 'SQL', 'Supabase']
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
      period: '2019 – 2024',
      courses: ['Finite Element Analysis', 'Materials and Manufacturing', 'Engineering Design and Management', 'Thermodynamics', 'Design and Computing']
    }
  ]

  const skills = {
    'Data Engineering': ['AWS (Data pipeline Automation, Cloud Computing, DevOps)', 'Data Scraping', 'Data Cleaning', 'Building ETL pipelines', 'Postgres (RDBMS)'],
    'Business Analytics': ['Data Visualization', 'Big Data Analytics', 'Financial Management', 'Machine Learning', 'KPI dashboards with python', 'Looker Studio', 'Tableau'],
    'Programming': ['Python', 'SQL (PostgreSQL)', 'JavaScript', 'Swift'],
    'Computing': ['Version Control (Git)', 'GitHub', 'Excel (Advanced)', 'Microsoft Office Suite'],
    'Engineering Design': ['SolidWorks', 'Ansys', '3D Printing (FDM/SLA)', 'Engineering Drawings'],
    'Project Management': ['Agile Methodology', 'Team coordination', 'Six Sigma Methodology']
  }

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">Moayed</div>
          <div className="nav-links">
            <a href="#hero" className={activeSection === 'hero' ? 'active' : ''}>Home</a>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
            <a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>Experience</a>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
            <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" ref={(el) => (sectionsRef.current['hero'] = el)} className="hero">
        <div className="hero-background">
          <div className="grid-overlay"></div>
          <div className="data-particles"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-name">
            <span className="name-line">Moayed</span>
            <span className="name-line">Abdalla</span>
          </h1>
          <div className="hero-subtitle">
            <span className="typing-text">Data Engineer</span>
            <span className="cursor">|</span>
          </div>
          <p className="hero-description">
            Transforming data into insights • Building scalable solutions • Engineering excellence
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
        <div className="container">
          <h2 className="section-title">
            <span className="title-number">01.</span>
            About Me
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
              <div className="about-highlights">
                <div className="highlight-item">
                  <span className="highlight-number">5+</span>
                  <span className="highlight-label">Years Experience</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-number">10+</span>
                  <span className="highlight-label">Projects Completed</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-number">3</span>
                  <span className="highlight-label">Companies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={(el) => (sectionsRef.current['experience'] = el)} className="section experience">
        <div className="container">
          <h2 className="section-title">
            <span className="title-number">02.</span>
            Experience
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

      {/* Projects Section */}
      <section id="projects" ref={(el) => (sectionsRef.current['projects'] = el)} className="section projects">
        <div className="container">
          <h2 className="section-title">
            <span className="title-number">03.</span>
            Projects
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" ref={(el) => (sectionsRef.current['education'] = el)} className="section education">
        <div className="container">
          <h2 className="section-title">
            <span className="title-number">04.</span>
            Education
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

      {/* Skills Section */}
      <section id="skills" ref={(el) => (sectionsRef.current['skills'] = el)} className="section skills">
        <div className="container">
          <h2 className="section-title">
            <span className="title-number">05.</span>
            Skills
          </h2>
          <div className="skills-grid">
            {Object.entries(skills).map(([category, items], index) => (
              <div key={index} className="skill-category">
                <h3>{category}</h3>
                <div className="skill-items">
                  {items.map((item, i) => (
                    <span key={i} className="skill-item">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={(el) => (sectionsRef.current['contact'] = el)} className="section contact">
        <div className="container">
          <h2 className="section-title">
            <span className="title-number">06.</span>
            Get In Touch
          </h2>
          <div className="contact-content">
            <p className="contact-description">
              I'm always open to discussing new opportunities, interesting projects, or just having a conversation about data, engineering, or technology.
            </p>
            <div className="contact-info">
              <a href="mailto:moayed.h.abdalla@gmail.com" className="contact-item">
                <span className="contact-icon">✉</span>
                <span>moayed.h.abdalla@gmail.com</span>
              </a>
              <a href="tel:+966501907661" className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+966 50 190 7661</span>
              </a>
              <a href="https://linkedin.com/in/moayed-abdalla/" target="_blank" rel="noopener noreferrer" className="contact-item">
                <span className="contact-icon">💼</span>
                <span>LinkedIn</span>
              </a>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
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
