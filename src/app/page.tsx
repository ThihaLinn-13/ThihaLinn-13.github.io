"use client";

import React, { useState, useEffect } from 'react';
import { 
  Github, Linkedin, Mail, 
  Terminal, Database, BookOpen, Award, 
  Smartphone, Code2, Cloud, Server, Calendar 
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// --- YOUR DATA ---
const DATA = {
  personal: {
    name: "Thiha Linn",
    role: "Fullstack Developer",
    location: "Yangon, Myanmar",
    email: "thihalinn0004@gmail.com",
    linkedin: "https://www.linkedin.com/in/Thiha-Linn",
    github: "https://github.com/your-username",
    avatar: "/assets/thihlinn.png", 
    summary: "Fullstack Developer with enterprise experience delivering financial and insurance technologies. Specialized in building high-availability backends (Spring Boot, NestJS) and cross-platform frontends. Bilingual professional (English/Mandarin HSK-4) bridging technical communication gaps in international teams."
  },
  skills: {
    backend: ["Java Spring Boot", "Java Servlet", "NestJS", "Node.js", "Microservices", "REST APIs", "Jersey"],
    frontend: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS"],
    mobile: ["Flutter (Dart)", "React Native (Expo)"],
    database: ["PostgreSQL", "Microsoft SQL", "Redis"],
    devops: ["Docker", "Ansible", "CI/CD Pipelines", "Git", "System Monitoring", "Linux"],
  },
  experience: [
    {
      id: 1,
      role: "Fullstack Developer",
      company: "KBZMS General Insurance",
      period: "July 2025 - Present",
      description: [
        "Engineered the Insurance Integration System (KYC) using Java Servlets and Jersey, implementing bank-grade secure API standards.",
        "Architected an Admin Portal (Spring Boot/React) with granular Role-Based Access Control (RBAC), reducing administrative overhead by 40%.",
        "Integrated secure JWT authentication and RESTful APIs for the KBZMS Mini App within KPay."
      ]
    },
    {
      id: 2,
      role: "Fullstack and Mobile Developer",
      company: "Myanmar Information Technology Co., Ltd",
      period: "Jun 2024 - July 2025",
      description: [
        "Built a scalable Workflow Management System (Spring Boot/Angular) capable of handling complex multi-tier approval flows for enterprise clients.",
        "Developed the 'A-365' Attendance App (NestJS/Flutter), optimizing API response times and implementing geo-fencing features."
      ]
    }
  ],
  education: {
    school: "Hmawbi Technological University (HMTU)",
    degree: "B.E. (Information Technology)",
    year: "2021 - Present (Fourth Year)",
    project: "Netflix Clone: High-performance video streaming with Spring Boot & Next.js."
  },
  certifications: [
    "Building A DevOps Culture: A Beginner Guide (Batch 3)",
    "Mobile Developer Class (Batch-2)",
    "Java Developer Class (Batch-7)",
    "Msquare Programming (Batch-2)"
  ],
  languages: [
    "English (Professional)",
    "Mandarin (HSK-4)"
  ]
};

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- COMPONENTS ---

const SectionTitle = ({ title, icon: Icon }: { title: string, icon?: any }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex items-center gap-3 mb-8 border-b border-slate-700 pb-3"
  >
    {Icon && <Icon className="text-blue-400" size={24} />}
    <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
      {title}
    </h2>
  </motion.div>
);

const VerticalList = ({ items }: { items: string[] }) => (
  <motion.div 
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="flex flex-col gap-3"
  >
    {items.map((item, index) => (
      <motion.div key={index} variants={fadeInUp} className="flex items-start gap-3">
         <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
         <span className="text-slate-300 font-medium">{item}</span>
      </motion.div>
    ))}
  </motion.div>
);

const SkillRow = ({ label, items, icon: Icon }: { label: string, items: string[], icon: any }) => (
  <motion.div 
    variants={fadeInUp}
    className="grid md:grid-cols-[160px_1fr] gap-2 md:gap-4 border-b border-slate-700 pb-4 last:border-0"
  >
    <div className="font-bold text-white flex items-center gap-2">
      <Icon size={18} className="text-blue-400" /> {label}
    </div>
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-300">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="font-medium hover:text-blue-400 transition-colors cursor-default">{item}</span>
          {index < items.length - 1 && <span className="text-slate-500 text-sm">|</span>}
        </React.Fragment>
      ))}
    </div>
  </motion.div>
);

const TypingAnimation = ({ text, speed = 100 }: { text: string, speed?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};

const NavLink = ({ href, label }: { href: string, label: string }) => (
  <a 
    href={href} 
    className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors uppercase tracking-wide cursor-pointer"
  >
    {label}
  </a>
);

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add('dark');
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 selection:bg-blue-500/30">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-slate-700 bg-slate-950/90">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#summary" className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
            THIHA LINN<span className="text-blue-400">.</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#summary" label="Summary" />
            <NavLink href="#skills" label="Skills" />
            <NavLink href="#experience" label="Experience" />
            <NavLink href="#education" label="Education" />
            <NavLink href="#certifications" label="Certifications" />
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        
        {/* HERO SECTION */}
        {/* mb-32 changed to mb-24 */}
        <section id="summary" className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 mb-24 scroll-mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-white">
              {DATA.personal.name}
            </h1>
            <h2 className="text-xl md:text-2xl text-blue-400 font-semibold mb-6 h-8">
              <TypingAnimation text={DATA.personal.role} speed={80} />
            </h2>
            <p className="text-lg leading-relaxed mb-8 max-w-2xl text-slate-400">
              {DATA.personal.summary}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${DATA.personal.email}`} 
                className="flex items-center gap-2 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-medium transition-all hover:bg-slate-800 hover:text-white hover:border-slate-500"
              >
                <Mail size={18} /> Send Email
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={DATA.personal.github} 
                target="_blank" 
                className="flex items-center gap-2 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-medium transition-all hover:bg-slate-800 hover:text-white hover:border-slate-500"
              >
                <Github size={18} /> GitHub
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={DATA.personal.linkedin} 
                target="_blank" 
                className="flex items-center gap-2 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-medium transition-all hover:bg-slate-800 hover:text-white hover:border-slate-500"
              >
                <Linkedin size={18} /> LinkedIn
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0 relative"
          >
             <div className="absolute inset-0 bg-blue-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
             <img 
               src={DATA.personal.avatar} 
               alt="Avatar" 
               className="relative w-full h-full object-cover rounded-3xl shadow-2xl border-2 border-slate-800"
             />
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        {/* mb-32 changed to mb-24 */}
        <section id="skills" className="mb-24 scroll-mt-28">
          <SectionTitle title="Technical Skills" icon={Terminal} />
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <SkillRow label="Backend" items={DATA.skills.backend} icon={Server} />
            <SkillRow label="Frontend" items={DATA.skills.frontend} icon={Code2} />
            <SkillRow label="Mobile" items={DATA.skills.mobile} icon={Smartphone} />
            <SkillRow label="DevOps" items={DATA.skills.devops} icon={Cloud} />
            <SkillRow label="Database" items={DATA.skills.database} icon={Database} />
          </motion.div>
        </section>

        {/* EXPERIENCE SECTION */}
        {/* mb-32 changed to mb-24 */}
        <section id="experience" className="mb-24 scroll-mt-28">
          <SectionTitle title="Experience" icon={Database} />
          <div className="space-y-12">
            {DATA.experience.map((job) => (
              <motion.div 
                key={job.id} 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row gap-4 md:gap-10 border-l-2 border-slate-800 pl-6 md:pl-0 md:border-none"
              >
                <div className="md:w-1/4 flex-shrink-0">
                  <h3 className="text-lg font-bold text-white">
                    {job.company}
                  </h3>
                  <p className="text-sm font-mono mt-1 text-slate-400">
                    {job.period}
                  </p>
                </div>
                <div className="md:w-3/4">
                  <h4 className="text-xl font-bold text-blue-400 mb-3">{job.role}</h4>
                  <ul className="space-y-3">
                    {job.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-3 leading-relaxed">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-slate-500"></span>
                        <span className="text-slate-300">
                          {desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EDUCATION & CERTS */}
        {/* space-y-32 changed to space-y-24 */}
        <div className="space-y-24">
          
          {/* Education Section */}
          <section id="education" className="scroll-mt-28">
            <SectionTitle title="Education" icon={BookOpen} />
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row gap-4 md:gap-10 border-l-2 border-slate-800 pl-6 md:pl-0 md:border-none"
            >
              
              {/* Left Column: School & Year */}
              <div className="md:w-1/4 flex-shrink-0">
                <h3 className="text-lg font-bold text-white">
                  {DATA.education.school}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-slate-400 font-mono text-sm">
                  <Calendar size={14} />
                  <span>{DATA.education.year}</span>
                </div>
              </div>

              {/* Right Column: Degree & Details */}
              <div className="md:w-3/4">
                <h4 className="text-xl font-bold text-blue-400 mb-3">
                  {DATA.education.degree}
                </h4>
                
                <ul className="space-y-3">
                   <li className="flex items-start gap-3 leading-relaxed">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-slate-500"></span>
                      <span className="text-slate-300">
                        <span className="text-white font-medium">Final Year Project:</span> {DATA.education.project}
                      </span>
                   </li>

                   <li className="flex items-start gap-3 leading-relaxed">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-slate-500"></span>
                      <span className="text-slate-300">
                        <span className="text-white font-medium">Languages:</span> {DATA.languages.join(", ")}
                      </span>
                   </li>
                </ul>
              </div>

            </motion.div>
          </section>

          {/* Certifications Section */}
          <section id="certifications" className="scroll-mt-28">
            <SectionTitle title="Certifications" icon={Award} />
            <VerticalList items={DATA.certifications} />
          </section>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t py-10 text-center border-slate-800 bg-slate-950 text-slate-500">
        <p className="text-sm">
          © {new Date().getFullYear()} {DATA.personal.name}. All rights reserved.
        </p>
      </footer>

    </div>
  );
}