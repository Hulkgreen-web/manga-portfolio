import { Github, Linkedin, Mail, Twitter, ExternalLink, Code2, Database, Layout, Smartphone } from 'lucide-react';

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
}

export const portfolioData = {
  name: "Arnaud BOUILLON",
  email: "abouillon1802@gmail.com",
  socials: [
    { name: 'GitHub', url: 'https://github.com', icon: Github },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
    { name: 'Email', url: 'mailto:abouillon1802@gmail.com', icon: Mail },
  ],
  projects: [
    {
      id: 1,
      translationKey: "ecommerce",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop",
      tags: ["React", "TypeScript", "Tailwind", "Stripe"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: 2,
      translationKey: "taskmanager",
      image: "https://images.unsplash.com/photo-1454165833767-027ffea9e778?q=80&w=1000&auto=format&fit=crop",
      tags: ["React", "DND-Kit", "Supabase"],
      githubUrl: "https://github.com",
    },
  ] as Project[],
  skills: [
    { name: 'Java / Springboot', category: 'Backend', icon: Database },
    { name: 'Node.js', category: 'Backend', icon: Database },
    { name: 'ASP.NET', category: 'Backend', icon: Database },
    { name: 'SQL', category: 'Backend', icon: Database },
    { name: 'JavaScript', category: 'Frontend', icon: Code2 },
    { name: 'HTML / CSS', category: 'Frontend', icon: Layout },
    { name: 'Python', category: 'Backend', icon: Database },
    { name: 'C', category: 'Backend', icon: Database },
  ] as Skill[],
  experiences: [
    {
      company: "I-CITY Bruxelles",
      translationKey: "icity",
      period: "Juillet 2023 - Aout 2023",
    },
    {
      company: "Institut Sacré-Coeur Mons",
      translationKey: "sacrecoeur",
      period: "Février 2022",
    },
  ] as Experience[],
};
