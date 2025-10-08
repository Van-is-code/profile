import React, { useEffect, useState } from 'react'
import { Code, Mail, Phone, MapPin, Github, Download, X, Calendar, Briefcase, GraduationCap, Target, Award, ChevronRight } from 'lucide-react'

// Load language content dynamically
async function loadLang(lang) {
  if (lang === 'vi') return (await import('./data/vi.json')).default
  return (await import('./data/en.json')).default
}

// Main App
export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
  const [portfolioData, setPortfolioData] = useState(null)
  const [showCV, setShowCV] = useState(false)

  useEffect(() => {
    let mounted = true
    loadLang(lang).then((d) => {
      if (mounted) setPortfolioData(d)
    })
    localStorage.setItem('lang', lang)
    return () => { mounted = false }
  }, [lang])

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading...</div>
    )
  }

  const Home = ({ onViewCV }) => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-block mb-4 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                  <span className="text-blue-400 text-sm font-medium">👋 {lang === 'en' ? 'Hello' : 'Xin chào'}!</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4">
                  {portfolioData.personal.name}
                </h1>
                <p className="text-xl lg:text-2xl text-blue-400 mb-6 font-medium">
                  {portfolioData.personal.title}
                </p>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl">
                  {portfolioData.about}
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <button
                    onClick={onViewCV}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    {lang === 'en' ? 'View full CV' : 'Xem CV đầy đủ'} <ChevronRight size={20} />
                  </button>
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    <Mail size={20} /> {lang === 'en' ? 'Contact' : 'Liên hệ'}
                  </a>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                  <img
                    src={portfolioData.personal.avatar}
                    alt={portfolioData.personal.name}
                    className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl border-4 border-blue-500/20 relative z-10 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">{lang === 'en' ? 'Skills & Technologies' : 'Kỹ năng & Công nghệ'}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Backend */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all">
                <h3 className="text-2xl font-bold text-blue-400 mb-6">Backend Development</h3>
                <div className="space-y-5">
                  {portfolioData.skills.backend.map((skill, i) => (
                    <div key={i} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-white mb-1.5">{skill.name}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{skill.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frontend */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all">
                <h3 className="text-2xl font-bold text-green-400 mb-6">Frontend Development</h3>
                <div className="space-y-5">
                  {portfolioData.skills.frontend.map((skill, i) => (
                    <div key={i} className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-white mb-1.5">{skill.name}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{skill.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-all">
                <h3 className="text-2xl font-bold text-purple-400 mb-6">Tools & Technologies</h3>
                <div className="space-y-5">
                  {portfolioData.skills.tools.map((skill, i) => (
                    <div key={i} className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-white mb-1.5">{skill.name}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{skill.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">{lang === 'en' ? 'Featured Projects' : 'Dự án nổi bật'}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {portfolioData.projects.map((project, idx) => (
                <div
                  key={idx}
                  className={`bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 group ${project.github ? 'cursor-pointer' : ''}`}
                  role={project.github ? 'link' : undefined}
                  tabIndex={project.github ? 0 : undefined}
                  onClick={project.github ? () => window.open(project.github, '_blank', 'noopener,noreferrer') : undefined}
                  onKeyDown={project.github ? (e) => { if (e.key === 'Enter' || e.key === ' ') { window.open(project.github, '_blank', 'noopener,noreferrer') } } : undefined}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-gray-400">{project.subtitle}</p>
                    </div>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={24} />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} /> {project.period}
                    </span>
                    <span>|</span>
                    <span>{project.role}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-2">
                    {project.highlights.slice(0, 3).map((highlight, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                        <ChevronRight size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-8">{lang === 'en' ? 'Contact' : 'Liên hệ'}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex flex-col items-center gap-3 p-6 bg-slate-900/50 border border-slate-700 rounded-xl hover:border-blue-500/50 transition-all"
              >
                <Mail className="text-blue-400" size={32} />
                <span className="text-white font-medium">Email</span>
                <span className="text-gray-400 text-sm">{portfolioData.personal.email}</span>
              </a>
              <a
                href={`tel:${portfolioData.personal.phone}`}
                className="flex flex-col items-center gap-3 p-6 bg-slate-900/50 border border-slate-700 rounded-xl hover:border-blue-500/50 transition-all"
              >
                <Phone className="text-blue-400" size={32} />
                <span className="text-white font-medium">{lang === 'en' ? 'Phone' : 'Điện thoại'}</span>
                <span className="text-gray-400 text-sm">{portfolioData.personal.phone}</span>
              </a>
              <div className="flex flex-col items-center gap-3 p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
                <MapPin className="text-blue-400" size={32} />
                <span className="text-white font-medium">{lang === 'en' ? 'Address' : 'Địa chỉ'}</span>
                <span className="text-gray-400 text-sm text-center">{portfolioData.personal.address}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const CVPage = ({ onClose }) => {
    const handleDownload = () => window.print()

    return (
      <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
        <div className="min-h-screen py-8">
          <div className="max-w-5xl mx-auto">
            {/* Header Controls */}
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center print:hidden sticky top-0 z-10 rounded-t-lg shadow-lg">
              <h2 className="text-xl font-bold">CV - {portfolioData.personal.name}</h2>
              <div className="flex gap-4">
                <a
                  href={`/src/data/Thực tập sinh phát triển phần mềm.pdf`}
                  download="Thuc_tap_sinh_phat_trien_phan_mem.pdf"
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
                >
                  <Download size={20} /> {lang === 'en' ? 'Download CV (PDF)' : 'Tải CV (PDF)'}
                </a>
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 px-6 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors font-medium"
                >
                  <X size={20} /> {lang === 'en' ? 'Close' : 'Đóng'}
                </button>
              </div>
            </div>

            {/* CV Content */}
            <div id="cv-content" className="bg-white shadow-2xl rounded-b-lg">
              {/* Header with Photo */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
                <div className="flex items-center gap-8">
                  <img
                    src={portfolioData.personal.avatar}
                    alt={portfolioData.personal.name}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">{portfolioData.personal.name}</h1>
                    <p className="text-xl mb-4 text-blue-100">{portfolioData.personal.title}</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{portfolioData.personal.dob}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        <span>{portfolioData.personal.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={16} />
                        <span>{portfolioData.personal.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{portfolioData.personal.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10">
                {/* Objectives */}
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Target size={24} className="text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">{lang === 'en' ? 'CAREER OBJECTIVES' : 'MỤC TIÊU NGHỀ NGHIỆP'}</h2>
                  </div>
                  <div className="ml-9 space-y-3">
                    {portfolioData.objectives.map((obj, idx) => (
                      <div key={idx} className="flex gap-3">
                        <span className="text-blue-600 font-bold mt-1">•</span>
                        <p className="text-gray-700 leading-relaxed">{obj}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap size={24} className="text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">{lang === 'en' ? 'EDUCATION' : 'HỌC VẤN'}</h2>
                  </div>
                  <div className="ml-9">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{portfolioData.education.school}</h3>
                    <p className="text-gray-600 italic mb-1">{portfolioData.education.period}</p>
                    <p className="text-blue-600 font-semibold mb-3">{portfolioData.education.major}</p>
                    <ul className="space-y-2">
                      {portfolioData.education.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex gap-3 text-gray-700">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* Skills */}
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Code size={24} className="text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">{lang === 'en' ? 'SKILLS' : 'KỸ NĂNG'}</h2>
                  </div>
                  <div className="ml-9 grid md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">Backend</h3>
                      <div className="space-y-3">
                        {portfolioData.skills.backend.map((skill, i) => (
                          <div key={i}>
                            <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                            <p className="text-sm text-gray-600">{skill.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">Frontend</h3>
                      <div className="space-y-3">
                        {portfolioData.skills.frontend.map((skill, i) => (
                          <div key={i}>
                            <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                            <p className="text-sm text-gray-600">{skill.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">Tools</h3>
                      <div className="space-y-3">
                        {portfolioData.skills.tools.map((skill, i) => (
                          <div key={i}>
                            <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                            <p className="text-sm text-gray-600">{skill.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Projects */}
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase size={24} className="text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">{lang === 'en' ? 'PROJECTS' : 'DỰ ÁN'}</h2>
                  </div>
                  <div className="ml-9 space-y-6">
                    {portfolioData.projects.map((project, idx) => (
                      <div key={idx} className="border-l-4 border-blue-600 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{project.name} - {project.subtitle}</h3>
                            <p className="text-gray-600 text-sm">
                              {project.period} | {project.team} | <span className="text-blue-600 font-semibold">{project.role}</span>
                            </p>
                            {project.github && (
                              <a href={project.github} className="text-blue-600 text-xs hover:underline" target="_blank" rel="noopener noreferrer">
                                {project.github}
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{project.description}</p>
                        <div className="mb-2">
                          <span className="font-semibold text-gray-900">{lang === 'en' ? 'Technologies' : 'Công nghệ'}: </span>
                          <span className="text-gray-700">{project.tech.join(', ')}</span>
                        </div>
                        <ul className="space-y-1">
                          {project.highlights.map((highlight, i) => (
                            <li key={i} className="text-gray-700 text-sm flex gap-2">
                              <span className="text-blue-600">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Experience */}
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase size={24} className="text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">{lang === 'en' ? 'WORK EXPERIENCE' : 'KINH NGHIỆM LÀM VIỆC'}</h2>
                  </div>
                  <div className="ml-9 space-y-5">
                    {portfolioData.experience.map((exp, idx) => (
                      <div key={idx} className="border-l-4 border-gray-400 pl-4">
                        <h3 className="text-lg font-bold text-gray-900">{exp.company}</h3>
                        <p className="text-gray-600 italic text-sm mb-2">{exp.position} | {exp.period}</p>
                        <ul className="space-y-1">
                          {exp.description.map((desc, i) => (
                            <li key={i} className="text-gray-700 text-sm flex gap-2">
                              <span className="text-blue-600">•</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Hobbies */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Award size={24} className="text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">{lang === 'en' ? 'HOBBIES' : 'SỞ THÍCH'}</h2>
                  </div>
                  <div className="ml-9 space-y-2">
                    {portfolioData.hobbies.map((hobby, idx) => (
                      <div key={idx} className="flex gap-3">
                        <span className="text-blue-600 font-bold mt-1">•</span>
                        <p className="text-gray-700">{hobby}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Code className="text-blue-400" size={24} />
              <span className="text-white font-bold text-xl">Van-is-code</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
                className="px-3 py-1 bg-slate-800 text-white rounded-md"
                aria-label="Toggle language"
              >
                {lang === 'en' ? 'VI' : 'EN'}
              </button>
              <button
                onClick={() => setShowCV(true)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <Download size={18} /> {lang === 'en' ? 'View CV' : 'Xem CV'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        <Home onViewCV={() => setShowCV(true)} />
      </div>

      {/* CV Modal */}
      {showCV && <CVPage onClose={() => setShowCV(false)} />}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p className="mb-2">© 2025 {portfolioData.personal.name}. All rights reserved.</p>
          <p className="text-sm">Made with React + Tailwind CSS ❤️</p>
        </div>
      </footer>

      {/* Print Styles */}
      <style>{`
        @media print {
          /* hide everything except CV content */
          body * {
            visibility: hidden;
          }
          /* keep UI controls hidden when printing */
          .print\:hidden {
            display: none !important;
          }
          /* make the CV content and its children visible */
          #cv-content, #cv-content * {
            visibility: visible;
          }
          /* ensure the CV content lays out naturally for multi-page printing */
          #cv-content {
            position: relative !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
          }
          @page {
            margin: 1.5cm;
            size: A4;
          }
        }
      `}</style>
    </div>
  )
}
