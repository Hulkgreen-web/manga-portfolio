import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Mail, Code2, Database, Layout, Server, Terminal, Cpu, Smartphone, GitBranch, Layers } from 'lucide-react';

export interface Project {
  id: number;
  translationKey: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Outils' | 'Mobile';
  icon: LucideIcon;
}

export interface Experience {
  company: string;
  translationKey: string;
  period?: string;
  roleType?: string;
  tags?: string[];
}

export const portfolioData = {
  name: "Arnaud BOUILLON",
  title: "Développeur Full Stack",
  email: "abouillon1802@gmail.com",
  socials: [
    { name: 'GitHub', url: 'https://github.com/Hulkgreen-web', icon: Github },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/arnaud-bouillon-91419435b', icon: Linkedin },
    { name: 'Email', url: 'mailto:abouillon1802@gmail.com', icon: Mail },
  ],
  projects: [
    {
      id: 1,
      translationKey: "myplan",
      image: "/images/projects/myplan_screen.webp",
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      githubUrl: "https://github.com/Hulkgreen-web/MyPlan",
      liveUrl: "https://myplanweb.netlify.app/",
    },
    {
      id: 2,
      translationKey: "web-skeleton",
      image: "",
      tags: ["React", "TypeScript", "Monorepo", "Vite", "Tailwind CSS", "Fastify"],
      githubUrl: "https://github.com/Hulkgreen-web/web-skeleton",
    },
    {
      id: 3,
      translationKey: "poke-native",
      image: "",
      tags: ["React Native", "Expo", "TypeScript", "TanStack Query", "Reanimated"],
      githubUrl: "https://github.com/Hulkgreen-web/poke-native",
    },
    {
      id: 4,
      translationKey: "codefighter",
      image: "",
      tags: ["C++17", "SFML 2.5", "CMake", "Python"],
      githubUrl: "https://github.com/mehdi-apdev/CodeFighter",
    },
    {
      id: 5,
      translationKey: "doctor-js",
      image: "",
      tags: ["Node.js", "CLI", "DevOps", "TypeScript"],
      githubUrl: "https://github.com/Hulkgreen-web/doctor-js",
    },
    {
      id: 6,
      translationKey: "fastapi-cicd",
      image: "",
      tags: ["Python", "FastAPI", "PostgreSQL", "Docker", "CI/CD"],
      githubUrl: "https://github.com/Hulkgreen-web/learn-ci-cd",
    },
  ] as Project[],
  skills: [
    { name: 'Java / Spring Boot', category: 'Backend', icon: Server },
    { name: 'Node.js / Express', category: 'Backend', icon: Server },
    { name: 'ASP.NET Core', category: 'Backend', icon: Layers },
    { name: 'SQL & PostgreSQL', category: 'Backend', icon: Database },
    { name: 'Python', category: 'Backend', icon: Terminal },
    { name: 'C / C++', category: 'Backend', icon: Cpu },
    { name: 'React & Next.js', category: 'Frontend', icon: Code2 },
    { name: 'TypeScript / JS', category: 'Frontend', icon: Code2 },
    { name: 'Tailwind CSS / HTML5', category: 'Frontend', icon: Layout },
    { name: 'Git & GitHub', category: 'Outils', icon: GitBranch },
    { name: 'Docker / CI-CD', category: 'Outils', icon: Terminal },
    { name: 'React PWA', category: 'Mobile', icon: Smartphone },
  ] as Skill[],
  experiences: [
    {
      company: "I-care Group",
      translationKey: "icare",
      tags: ["React PWA", "Fastify", "MongoDB"],
    },
    {
      company: "Triptyk SRL",
      translationKey: "triptyk",
      tags: ["Node.js", "Fastify", "n8n", "Ember.js"],
    },
    {
      company: "I-CITY Bruxelles",
      translationKey: "icity",
      tags: ["Java", "Scrum / Agile", "Git"],
    },
    {
      company: "Institut Sacré-Coeur Mons",
      translationKey: "sacrecoeur",
      tags: ["Enseignement", "Pédagogie & Vulgarisation", "Communication", "Anglais"],
    },
  ] as Experience[],
};

