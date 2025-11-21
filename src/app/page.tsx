import React from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Download, Code2, Database, Smartphone, Server } from 'lucide-react';



const DATA = {
  personal: {
    name: "Thiha Linn",
    title: "Fullstack Developer",
    summary: "Fullstack developer with experience in workflow management systems, attendance apps, and insurance KYC systems. Skilled in Java, Spring Boot, Angular, React, and Flutter. Experienced in building secure, scalable, and user-friendly applications. Passionate about delivering reliable systems that enhance efficiency and business value.",
    email: "thihalinn0004@gmail.com",
    phone: "09778628450",
    location: "Yangon, Myanmar",
    linkedin: "https://www.linkedin.com/in/Thiha-Linn",
    github: "https://github.com/ThihaLinn-13", // Update this!
  },
  skills: {
    backend: ["Java (Spring Boot)", "Java (Servlet)", "NodeJs (NestJs)", "NextJs"],
    frontend: ["React", "Angular"],
    mobile: ["Dart (Flutter)", "React Native (Expo)"],
    database: ["Postgres SQL", "Microsoft SQL"]
  },
  experience: [
    {
      id: 1,
      role: "Fullstack Developer",
      company: "KBZMS General Insurance",
      period: "July 2025 - Present",
      description: [
        "Developed Insurance Integration System (KYC) with Java Servlet backend using Jersey, implementing secure APIs.",
        "Built an Admin Portal with Spring Boot backend and React frontend, implementing user, role, and menu access control.",
        "Implemented JWT authentication and APIs for the KBZMS Mini App in KPay."
      ]
    },
    {
      id: 2,
      role: "Fullstack and Mobile Developer",
      company: "Myanmar Information Technology Co., Ltd",
      period: "Jun 2024 - July 2025",
      description: [
        "Developed a Workflow Management System using Spring Boot and Angular, with approval flows, role-based access, and API integration.",
        "Developed the Attendance App (A-365) with backend in NestJS and frontend in Flutter, implementing REST APIs, authentication, and role-based access."
      ]
    }
  ],
  education: {
    school: "Hmawbi Technological University (HMTU)",
    degree: "B.E. (Information Technology)",
    period: "2021 - Present (Fourth Year Student)",
    project: "Developed a movie streaming platform (Netflix clone) using Spring Boot for the backend and Next.js for the frontend, implementing user authentication and content browsing."
  },
  languages: ["English", "Mandarin (HSK-4)"],
  certifications: ["Java Developer class batch-7", "Msquare Programming batch-2"]
};

const Section = ({ children, id, className = "" }: { children: React.ReactNode, id?: string, className?: string }) => (
  <section id={id} className={`py-16 px-6 md:px-12 max-w-5xl mx-auto ${className}`}>
    {children}
  </section>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold text-slate-800 mb-8 border-l-4 border-blue-600 pl-4">
    {children}
  </h2>
);

const SkillCard = ({ title, icon: Icon, skills }: { title: string, icon: any, skills: string[] }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-4 text-blue-700">
      <Icon size={24} />
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, idx) => (
        <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-slate-900 to-blue-900 text-white pb-20 pt-24 px-6">
        <div className="max-w-5xl mx-auto md:flex items-center justify-between">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-blue-500/20 rounded-full text-blue-200 text-sm font-medium mb-2 border border-blue-500/30">
              Available for Hire
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              {DATA.personal.name}
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 font-light max-w-xl">
              {DATA.personal.title}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href={`mailto:${DATA.personal.email}`} className="flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Mail size={20} /> Contact Me
              </a>
              <a href={DATA.personal.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors border border-blue-700">
                <Linkedin size={20} /> LinkedIn
              </a>
            </div>
          </div>
          
          {/* Abstract Avatar / Placeholder if no image */}
          <div className="hidden md:flex justify-center items-center mt-8 md:mt-0">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                 {/* Replace this span with <img src="/your-photo.jpg" /> once you have the file */}
                <span className="text-4xl font-bold text-white">{DATA.personal.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Summary Section */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100">
          <p className="text-lg text-slate-600 leading-relaxed">
            {DATA.personal.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <MapPin size={16} /> {DATA.personal.location}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} /> {DATA.personal.phone}
            </div>
          </div>
        </div>
      </div>

      <Section id="skills">
        <SectionTitle>Technical Skills</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SkillCard title="Backend" icon={Server} skills={DATA.skills.backend} />
          <SkillCard title="Frontend" icon={Code2} skills={DATA.skills.frontend} />
          <SkillCard title="Mobile" icon={Smartphone} skills={DATA.skills.mobile} />
          <SkillCard title="Database" icon={Database} skills={DATA.skills.database} />
        </div>
      </Section>

      <Section id="experience" className="bg-white rounded-3xl my-8">
        <SectionTitle>Professional Experience</SectionTitle>
        <div className="space-y-12">
          {DATA.experience.map((job) => (
            <div key={job.id} className="relative border-l-2 border-slate-200 pl-8 pb-2">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 rounded-full ring-4 ring-white"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-900">{job.role}</h3>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit mt-1 md:mt-0">
                  {job.period}
                </span>
              </div>
              <div className="text-slate-700 font-medium mb-4">{job.company}</div>
              <ul className="space-y-2">
                {job.description.map((item, i) => (
                  <li key={i} className="text-slate-600 leading-relaxed flex gap-2">
                    <span className="text-blue-400 mt-1.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="education">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <SectionTitle>Education</SectionTitle>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full">
               <h3 className="text-lg font-bold text-slate-900">{DATA.education.school}</h3>
               <p className="text-blue-700 font-medium">{DATA.education.degree}</p>
               <p className="text-slate-500 text-sm mt-1">{DATA.education.period}</p>
               
               <div className="mt-6 pt-6 border-t border-slate-100">
                 <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Notable Project</h4>
                 <div className="bg-slate-50 p-4 rounded-lg">
                   <p className="font-bold text-slate-800 mb-1">Netflix Clone</p>
                   <p className="text-slate-600 text-sm">{DATA.education.project}</p>
                 </div>
               </div>
            </div>
          </div>

          <div>
            <SectionTitle>Additional Info</SectionTitle>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full flex flex-col gap-6">
               
               <div>
                 <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Languages</h4>
                 <div className="flex flex-wrap gap-2">
                   {DATA.languages.map((lang, i) => (
                     <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-lg border border-emerald-100">
                       {lang}
                     </span>
                   ))}
                 </div>
               </div>

               <div>
                 <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Certifications</h4>
                 <ul className="space-y-2">
                   {DATA.certifications.map((cert, i) => (
                     <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        {cert}
                     </li>
                   ))}
                 </ul>
               </div>

            </div>
          </div>
        </div>
      </Section>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-1">{DATA.personal.name}</h2>
            <p>{DATA.personal.title}</p>
          </div>
          <div className="flex gap-6">
            <a href={DATA.personal.github} className="hover:text-white transition-colors"><Github /></a>
            <a href={DATA.personal.linkedin} className="hover:text-white transition-colors"><Linkedin /></a>
            <a href={`mailto:${DATA.personal.email}`} className="hover:text-white transition-colors"><Mail /></a>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-slate-600">
          © {new Date().getFullYear()} {DATA.personal.name}. Built with Next.js & Tailwind.
        </div>
      </footer>

    </div>
  );
}