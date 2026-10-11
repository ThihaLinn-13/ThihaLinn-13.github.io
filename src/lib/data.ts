/**
 * Single source of truth for all portfolio content.
 * Edit content here — never inside the section components.
 */

export type ExperienceItem = {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
};

export type SkillLevel = {
  key: string;
  label: string;
  value: number;
};

export const DATA = {
  intro: {
    greeting: "Hello",
    name: "My name is Thiha Linn",
    role: "I am a Full-Stack and Mobile Developer",
    welcome: "Welcome to my portfolio",
  },

  personal: {
    name: "Thiha Linn",
    role: "Mobile and Fullstack Developer",
    location: "Yangon, Myanmar",
    email: "thihalinn0004@gmail.com",
    linkedin: "https://www.linkedin.com/in/Thiha-Linn",
    github: "https://github.com/ThihaLinn-13",
    avatar: "/assets/thihlinn.png",
    summary: [
      "I'm a Full-Stack Developer with 2+ years of professional experience building web applications and business solutions. I work with Java, Spring Boot, NestJS, React, and Angular to develop REST APIs, secure authentication systems, and practical user-focused applications.",
      "My experience includes developing KPay Mini Apps for Personal Accident and Travel Insurance, building insurance premium calculators, and working on the A365 Attendance App. I enjoy solving technical problems, learning new technologies, and building reliable applications that meet real business needs.",
    ],
  },

  skills: {
    backend: [
      "Java Spring Boot",
      "Java Servlet",
      "NestJS",
      "Node.js",
      "Microservices",
      "REST APIs",
      "Jersey",
    ],
    frontend: ["React", "Next.js", "Angular", "TypeScript"],
    mobile: ["Flutter (Dart)", "React Native (Expo)"],
    database: ["PostgreSQL", "Microsoft SQL", "MySQL", "Redis"],
    devops: [
      "Docker",
      "Ansible",
      "CI/CD Pipelines",
      "Git",
      "System Monitoring",
      "Linux",
    ],
  },

  /** Self-assessed proficiency (0-100) rendered by the radar chart. */
  skillLevels: [
    { key: "backend", label: "Backend", value: 90 },
    { key: "frontend", label: "Frontend", value: 82 },
    { key: "mobile", label: "Mobile", value: 75 },
    { key: "database", label: "Database", value: 80 },
    { key: "devops", label: "DevOps", value: 55 },
  ] satisfies SkillLevel[],

  experience: [
    {
      id: 1,
      role: "Full-Stack Developer",
      company: "KBZMS General Insurance",
      period: "July 2025 - October 2026",
      description: [
        "Developed and maintained KYC integration APIs using Java Servlet and Jersey to support secure insurance workflows.",
        "Developed an Admin Portal using Spring Boot and React, implementing JWT authentication, role-based access control (RBAC), and administrative APIs for user, role, menu, and insurance management.",
        "Developed the KBZMS Insurance Mini App, featuring Travel Protect and Personal Accident insurance products integrated with the KPay payment gateway.",
      ],
    },
    {
      id: 2,
      role: "Full-Stack & Mobile Developer",
      company: "Myanmar Information Technology Co., Ltd.",
      period: "June 2024 - July 2025",
      description: [
        "Developed a Workflow Management System using Spring Boot and Angular, implementing approval workflows, role-based access control, JWT authentication, and API integrations.",
        "Developed the A365 Attendance App using NestJS for the backend and Flutter for the mobile frontend, implementing REST APIs, authentication, and role-based access control.",
      ],
    },
  ] satisfies ExperienceItem[],

  education: {
    school: "Hmawbi Technological University (HMTU)",
    degree: "Bachelor of Engineering (B.E.) in Information Technology",
    year: "2021 - Present | Fifth-Year Student",
    projects: [
      "Movie Streaming Platform: Developed a Netflix-inspired streaming platform using Spring Boot and Next.js, featuring user authentication and dynamic content browsing.",
      "Car Rental Application: Built a car rental application using Next.js and Supabase, featuring authentication, database management, and interactive vehicle browsing.",
    ],
  },

  certifications: [
    "Building A DevOps Culture: A Beginner Guide (Batch 3)",
    "Mobile Developer Class (Batch-2)",
    "Java Developer Class (Batch-7)",
    "Msquare Programming (Batch-2)",
  ],

  languages: ["English (Intermediate)", "Mandarin (HSK-4)"],
};

export const NAV_LINKS = [
  { href: "#summary", label: "Summary" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
] as const;
