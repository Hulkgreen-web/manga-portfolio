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
  name: "Ton Nom",
  socials: [
    { name: 'GitHub', url: 'https://github.com', icon: Github },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
    { name: 'Twitter', url: 'https://twitter.com', icon: Twitter },
    { name: 'Email', url: 'mailto:contact@tondomaine.com', icon: Mail },
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
    { name: 'React', category: 'Frontend', icon: Layout },
    { name: 'TypeScript', category: 'Frontend', icon: Code2 },
    { name: 'Tailwind CSS', category: 'Frontend', icon: Layout },
    { name: 'Node.js', category: 'Backend', icon: Database },
    { name: 'PostgreSQL', category: 'Backend', icon: Database },
    { name: 'Docker', category: 'Outils', icon: Code2 },
    { name: 'React Native', category: 'Mobile', icon: Smartphone },
  ] as Skill[],
  experiences: [
    {
      company: "Tech Solutions",
      translationKey: "techsolutions",
      period: "2022 - common.present",
    },
    {
      company: "Startup Innov",
      translationKey: "startupinnov",
      period: "2020 - 2022",
    },
  ] as Experience[],
};
