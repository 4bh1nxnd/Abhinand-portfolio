export const profile = {
  name: "Abhinand Dilep",
  initials: "AD",
  tagline: "Software, machine learning, and stories in motion.",
  role: "Aspiring software developer · AI/ML engineer · Video editor & videographer",
  location: "Udayamperoor, Ernakulam, Kerala",
  bio: "I’m a final-year Computer Science Engineering student building AI-driven applications, database-backed systems, and web solutions. My work spans Python, machine learning, and deep learning—and beyond the code, professional video editing and videography.",
  email: "abhinanddilep@gmail.com",
  phone: "+91 9961522602",
  phoneHref: "tel:+919961522602",
  availability:
    "Seeking software, Python, AI/ML, and web development opportunities.",
  resume: "/Abhinand-Dilep-Resume.pdf",
  languages: ["English", "Hindi", "Malayalam", "Tamil"],
  socialLinks: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/abhinand-dilep-070637294/",
    },
    { label: "GitHub", url: "https://github.com/abh1nxnd" },
  ],
};

export const categories = [
  "Everything",
  "Development",
  "AI & ML",
  "Video & Film",
] as const;
export type Category = (typeof categories)[number];

export type Project = {
  id: string;
  title: string;
  category: Exclude<Category, "Everything">;
  label: string;
  image: string;
  alt: string;
  aspectRatio: string;
  background: string;
  period?: string;
  description: string;
  highlights: string[];
  role: string;
  tools?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Guardian Net Suite",
    category: "Development",
    label: "Academic project",
    image: "/images/guardian.svg",
    alt: "Illustrative Guardian Net Suite cover featuring a shield and its email analysis, SSH honeypot, and forensic reporting capabilities",
    aspectRatio: "4 / 5",
    background: "#282e25",
    description:
      "An integrated cybersecurity platform bringing an AI-powered email threat analyzer and a Cowrie-based SSH honeypot together in a unified, real-time dashboard.",
    highlights: [
      "Multi-layer email risk scoring using entropy, URL analysis, and LLM analysis.",
      "Automated honeypot IP enrichment with forensic reporting.",
    ],
    role: "Academic project developer",
    tools:
      "Next.js, React, TypeScript, Prisma ORM, SQLite, Python, Docker, Cowrie, Gemini/OpenAI API",
  },
  {
    id: "02",
    title: "Machine learning, hands-on",
    category: "AI & ML",
    label: "60-hour training",
    image: "/images/machine-learning.svg",
    alt: "Illustrative lavender cover for 60 hours of machine learning training at Aesthetix Edutech with a connected-node motif",
    aspectRatio: "4 / 3.8",
    background: "#c4b7e2",
    period: "June 2026",
    description:
      "Completed 60 hours of machine learning training at Aesthetix Edutech, building and evaluating models on real-world datasets.",
    highlights: [
      "Practical training in machine learning, deep learning, computer vision, and natural language processing.",
      "Explored CNNs, RNNs, LLMs, GANs, and Vision Transformers.",
    ],
    role: "ML trainee · Aesthetix Edutech",
    tools: "Python, Pandas, NumPy, Scikit-learn, TensorFlow",
  },
  {
    id: "03",
    title: "Advay Media Crew",
    category: "Video & Film",
    label: "Creative leadership",
    image: "/images/media-crew.svg",
    alt: "Illustrative Advay Media Crew cover with layered frames and the words Frame by Frame, not a still from an actual film",
    aspectRatio: "4 / 5.2",
    background: "#aac6d8",
    description:
      "Co-Lead Videographer and Editor at AMC—Advay Media Crew, combining a technical background with professional video editing and videography.",
    highlights: [
      "Blackmagic Design Certified DaVinci Resolve Editor.",
      "Completed Premiere Pro Essential Training through LinkedIn.",
    ],
    role: "Co-Lead Videographer & Editor",
    tools: "Adobe After Effects, Adobe Premiere Pro, DaVinci Resolve",
  },
  {
    id: "04",
    title: "Freston Analytics",
    category: "Development",
    label: "Internship",
    image: "/images/freston.svg",
    alt: "Illustrative Freston Analytics internship cover with code brackets and the words Build, Learn, Repeat",
    aspectRatio: "4 / 4.5",
    background: "#e8e2d5",
    period: "June–July 2024",
    description:
      "Interned at Freston Analytics Pvt. Ltd., gaining hands-on experience through practical projects and technical training in software and web development.",
    highlights: [
      "Worked with Python, Git, Docker, Linux, cloud technologies, and web development.",
      "Applied software development best practices while strengthening problem-solving, teamwork, project management, and communication.",
    ],
    role: "Intern · Freston Analytics Pvt. Ltd.",
    tools: "Python, Git, Docker, Linux, cloud technologies",
  },
];

export const skills = [
  { title: "Programming", items: ["Python", "C", "Java", "SQL"] },
  {
    title: "AI & machine learning",
    items: ["NumPy", "Pandas", "TensorFlow", "Keras", "Scikit-learn"],
  },
  {
    title: "Development & tools",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma ORM",
      "SQLite",
      "Git",
      "GitHub",
      "Docker",
      "Linux / Ubuntu",
      "VS Code",
      "Google Colab",
      "Overleaf",
    ],
  },
  {
    title: "Visual storytelling",
    items: ["After Effects", "Premiere Pro", "DaVinci Resolve"],
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science Engineering",
    institution: "Toc H Institute of Science and Technology",
    period: "2023–Present",
    result: "CGPA: 5.21",
  },
  {
    degree: "Class 12 · CBSE",
    institution: "Bhavans Vidya Mandir",
    period: "2022–23",
    result: "85%",
  },
  {
    degree: "Class 10 · CBSE",
    institution: "Bhavans Vidya Mandir",
    period: "2020–21",
    result: "83%",
  },
];

export const credentials = [
  {
    title: "DaVinci Resolve Editor",
    issuer: "Blackmagic Design",
    detail: "Certified editor",
  },
  {
    title: "C Programming",
    issuer: "Infosys Springboard",
    detail: "Course / certification",
  },
  {
    title: "Artificial Intelligence Foundation",
    issuer: "Infosys Springboard",
    detail: "Certification",
  },
  {
    title: "Python Programming Workshop",
    issuer: "Aesthetix Edu-Tech",
    detail: "5-day workshop",
  },
  {
    title: "Data Science with Python Workshop",
    issuer: "TechMaghi",
    detail: "Workshop",
  },
  {
    title: "Premiere Pro Essential Training",
    issuer: "LinkedIn",
    detail: "Training",
  },
];

export const coursework = [
  "Object Oriented Programming",
  "Data Structures & Algorithms",
  "Database Management",
  "Operating System",
];

export const activities = [
  "Volunteer, TECHFOSS’26 — Toc H Institute of Science & Technology",
  "Co-Lead Videographer and Editor — AMC, Advay Media Crew",
];
