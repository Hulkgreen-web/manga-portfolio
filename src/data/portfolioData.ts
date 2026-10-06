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
  icon: any;
}

export interface Experience {
  company: string;
  translationKey: string;
  period: string;
  roleType?: string;
}

export const portfolioData = {
  name: "Arnaud BOUILLON",
  title: "Développeur Full Stack",
  email: "abouillon1802@gmail.com",
  socials: [
    { name: 'GitHub', url: 'https://github.com/Hulkgreen-web', icon: Github },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
    { name: 'Email', url: 'mailto:abouillon1802@gmail.com', icon: Mail },
  ],
  projects: [
    {
      id: 1,
      translationKey: "myplan",
      image: "/images/projects/myplan_screen.webp",
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      githubUrl: "https://github.com/Hulkgreen-web/MyPlan",
      liveUrl: "https://example.com",
    },
    {
      id: 2,
      translationKey: "taskmanager",
      image: "",
      tags: ["React", "DND-Kit", "Supabase", "TypeScript"],
      githubUrl: "https://github.com",
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
    { name: 'React Native', category: 'Mobile', icon: Smartphone },
  ] as Skill[],
  experiences: [
    {
      company: "Triptyk SRL",
      translationKey: "triptyk",
      period: "Février 2026 - Mai 2026",
    },
    {
      company: "I-CITY Bruxelles",
      translationKey: "icity",
      period: "Juillet 2023 - Août 2023",
    },
    {
      company: "Institut Sacré-Coeur Mons",
      translationKey: "sacrecoeur",
      period: "Février 2022",
    },
  ] as Experience[],
};

