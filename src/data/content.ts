import {
  Atom,
  Smartphone,
  Server,
  Database,
  GitBranch,
  Boxes,
  Zap,
  Layers,
  Cpu,
  Cloud,
  Figma,
  Terminal,
  Globe,
  Shield,
  Lock,
  Gauge,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface TechItem {
  name: string;
  icon: LucideIcon;
  category: "frontend" | "mobile" | "backend" | "database" | "state" | "tools";
  color: string;
  blurb: { en: string; ar: string };
}

export const techStack: TechItem[] = [
  {
    name: "React.js",
    icon: Atom,
    category: "frontend",
    color: "#61dafb",
    blurb: {
      en: "Building scalable and responsive web applications.",
      ar: "تطوير تطبيقات ويب متجاوبة وقابلة للتوسع.",
    },
  },
  {
    name: "Next.js",
    icon: Layers,
    category: "frontend",
    color: "#ffffff",
    blurb: {
      en: "SEO-friendly applications with SSR and SSG support.",
      ar: "تطبيقات محسّنة لمحركات البحث تدعم SSR و SSG.",
    },
  },
  {
    name: "TypeScript",
    icon: Boxes,
    category: "frontend",
    color: "#3178c6",
    blurb: {
      en: "Type-safe and maintainable applications.",
      ar: "تطبيقات آمنة وقابلة للصيانة باستخدام TypeScript.",
    },
  },
  {
    name: "Tailwind CSS",
    icon: Zap,
    category: "frontend",
    color: "#06b6d4",
    blurb: {
      en: "Modern utility-first responsive design.",
      ar: "تصميم حديث ومتجاوب يعتمد على Tailwind CSS.",
    },
  },
  {
    name: "React Native",
    icon: Smartphone,
    category: "mobile",
    color: "#61dafb",
    blurb: {
      en: "Cross-platform mobile applications for iOS and Android.",
      ar: "تطبيقات جوال متعددة المنصات لأنظمة iOS و Android.",
    },
  },
  {
    name: "Node.js",
    icon: Server,
    category: "backend",
    color: "#83cd29",
    blurb: {
      en: "Building scalable backend services and APIs.",
      ar: "بناء خدمات خلفية وواجهات برمجة قابلة للتوسع.",
    },
  },
  {
    name: "Express.js",
    icon: Server,
    category: "backend",
    color: "#ffffff",
    blurb: {
      en: "REST API development using Express.js.",
      ar: "تطوير REST APIs باستخدام Express.js.",
    },
  },
  {
    name: "PostgreSQL",
    icon: Database,
    category: "database",
    color: "#336791",
    blurb: {
      en: "Relational database design and optimization.",
      ar: "تصميم وتحسين قواعد البيانات العلائقية.",
    },
  },
  {
    name: "Prisma ORM",
    icon: Database,
    category: "database",
    color: "#5a67d8",
    blurb: {
      en: "Type-safe database access with Prisma.",
      ar: "الوصول الآمن لقواعد البيانات باستخدام Prisma.",
    },
  },
  {
    name: "MongoDB",
    icon: Database,
    category: "database",
    color: "#47A248",
    blurb: {
      en: "Flexible NoSQL database for scalable applications.",
      ar: "قاعدة بيانات NoSQL مرنة لبناء تطبيقات قابلة للتوسع.",
    },
  },
  {
    name: "Socket.IO",
    icon: Zap,
    category: "backend",
    color: "#ffffff",
    blurb: {
      en: "Real-time communication and live updates.",
      ar: "التواصل الفوري والتحديثات المباشرة.",
    },
  },
  {
    name: "Zod",
    icon: GitBranch,
    category: "backend",
    color: "#3b82f6",
    blurb: {
      en: "Runtime schema validation for robust applications.",
      ar: "التحقق من صحة البيانات أثناء التشغيل.",
    },
  },
  {
    name: "Firebase",
    icon: Shield,
    category: "backend",
    color: "#FFCA28",
    blurb: {
      en: "Firebase Authentication, Google Sign-In and FCM push notifications.",
      ar: "Firebase Authentication وتسجيل الدخول عبر Google والإشعارات الفورية باستخدام FCM.",
    },
  },
  {
    name: "Vite",
    icon: Zap,
    category: "frontend",
    color: "#646cff",
    blurb: {
      en: "Fast development experience with Vite.",
      ar: "بيئة تطوير سريعة باستخدام Vite.",
    },
  },
  {
    name: "Storyblok CMS",
    icon: Globe,
    category: "tools",
    color: "#09b3af",
    blurb: {
      en: "Headless CMS integration for dynamic content management.",
      ar: "تكامل نظام إدارة المحتوى Storyblok لإدارة المحتوى الديناميكي.",
    },
  },
  {
    name: "Git",
    icon: GitBranch,
    category: "tools",
    color: "#f05032",
    blurb: {
      en: "Version control and collaborative development workflows.",
      ar: "إدارة الإصدارات والعمل التعاوني باستخدام Git.",
    },
  },
  {
    name: "Figma",
    icon: Figma,
    category: "tools",
    color: "#f24e1e",
    blurb: {
      en: "UI design systems and prototyping.",
      ar: "تصميم واجهات المستخدم والنماذج الأولية.",
    },
  },
  {
    name: "Cloud & Deployment",
    icon: Cloud,
    category: "tools",
    color: "#3b82f6",
    blurb: {
      en: "Application deployment and cloud integrations.",
      ar: "نشر التطبيقات والتكامل مع الخدمات السحابية.",
    },
  },
  {
    name: "Redux Toolkit",
    icon: Boxes,
    category: "state",
    color: "#764ABC",
    blurb: {
      en: "Predictable and scalable state management.",
      ar: "إدارة حالة التطبيقات بطريقة قابلة للتوسع.",
    },
  },
  {
    name: "MobX",
    icon: Boxes,
    category: "state",
    color: "#FF9955",
    blurb: {
      en: "Reactive state management for complex applications.",
      ar: "إدارة حالة تفاعلية للتطبيقات المعقدة.",
    },
  },
  {
    name: "MobX State Tree",
    icon: Boxes,
    category: "state",
    color: "#FFB347",
    blurb: {
      en: "Structured and scalable state management with MobX.",
      ar: "إدارة حالة منظمة وقابلة للتوسع باستخدام MobX.",
    },
  },
  {
    name: "Zustand",
    icon: Boxes,
    category: "state",
    color: "#8B5CF6",
    blurb: {
      en: "Lightweight and flexible state management solution.",
      ar: "حل خفيف ومرن لإدارة حالة التطبيقات.",
    },
  },
  {
    name: "SWR",
    icon: Globe,
    category: "state",
    color: "#000000",
    blurb: {
      en: "Efficient data fetching and caching for modern applications.",
      ar: "جلب البيانات وتخزينها المؤقت بكفاءة للتطبيقات الحديثة.",
    },
  },
  {
    name: "TanStack Query",
    icon: Database,
    category: "state",
    color: "#FF4154",
    blurb: {
      en: "Efficient server-state management, caching, and data synchronization.",
      ar: "إدارة حالة البيانات القادمة من الخادم مع التخزين المؤقت والمزامنة بكفاءة.",
    },
  },
  {
    name: "Context API",
    icon: Boxes,
    category: "state",
    color: "#61DAFB",
    blurb: {
      en: "Built-in React state sharing solution.",
      ar: "حل مدمج في React لمشاركة وإدارة الحالة.",
    },
  },
  {
    name: "JWT Authentication",
    icon: Lock,
    category: "backend",
    color: "#F59E0B",
    blurb: {
      en: "Secure authentication and authorization implementation.",
      ar: "تنفيذ أنظمة المصادقة والتفويض الآمنة.",
    },
  },
];

export interface ProjectData {
  key: string;
  gradient: string;
  accent: string;
  screenshot: string;
  screenshots?: string[];
  liveUrl: string;
  githubUrl: string;
  techs: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

export const projects: ProjectData[] = [
  {
    key: "whl",
    gradient: "from-blue-500 via-cyan-500 to-blue-600",
    accent: "#3b82f6",
    screenshot: "/projects/whl/1.png",
    screenshots: [
      "/projects/whl/1.png",
      "/projects/whl/2.png",
      "/projects/whl/3.png",
      "/projects/whl/4.png",
      "/projects/whl/5.png",
    ],
    liveUrl: "https://www.whitehouselaundry.com/",
    githubUrl: "#",
    techs: [
      "React.js",
      "React Native",
      "REST APIs",
      "Firebase",
      "Redux",
      "MobX",
      "Expo EAS",
    ],
    stats: [
      {
        label: "Platforms",
        value: "Web + Mobile",
      },
      {
        label: "Business Modules",
        value: "5+",
      },
    ],
  },

  {
    key: "snass",
    gradient: "from-purple-500 via-pink-500 to-purple-600",
    accent: "#8b5cf6",
    screenshot: "/projects/snass/1.png",
    screenshots: [
      "/projects/snass/1.png",
      "/projects/snass/2.png",
      "/projects/snass/3.png",
    ],
    liveUrl: "https://sarensnass.com/",
    githubUrl: "#",
    techs: ["React.js", "Tailwind CSS", "Storyblok CMS", "SEO"],
    stats: [
      {
        label: "CMS",
        value: "Storyblok",
      },
      {
        label: "SEO",
        value: "Optimized",
      },
    ],
  },

  {
    key: "hardcastle",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    accent: "#10b981",
    screenshot: "/projects/hardcastle/1.png",
    screenshots: ["/projects/hardcastle/1.png", "/projects/hardcastle/2.png"],
    liveUrl: "https://hardcastleadvisory.com/",
    githubUrl: "#",
    techs: ["React.js", "Tailwind CSS", "Storyblok CMS", "SEO"],
    stats: [
      {
        label: "SEO",
        value: "Optimized",
      },
      {
        label: "Performance",
        value: "High",
      },
    ],
  },

  {
    key: "aics",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    accent: "#f59e0b",
    screenshot: "/projects/aics/1.png",
    screenshots: [],
    liveUrl: "#",
    githubUrl: "#",
    techs: ["React.js", "Storyblok CMS", "REST APIs", "SEO"],
    stats: [
      {
        label: "CMS",
        value: "Storyblok",
      },
      {
        label: "Architecture",
        value: "Responsive",
      },
    ],
  },

  {
    key: "insight",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
    accent: "#ec4899",
    screenshot: "/projects/insight/1.png",
    screenshots: [],
    liveUrl: "#",
    githubUrl: "#",
    techs: ["React.js", "Tailwind CSS", "REST APIs", "Responsive UI"],
    stats: [
      {
        label: "UI",
        value: "Responsive",
      },
      {
        label: "Performance",
        value: "Optimized",
      },
    ],
  },

  {
    key: "ecommerce",
    gradient: "from-indigo-500 via-violet-500 to-purple-600",
    accent: "#6366f1",
    screenshot: "/projects/ecommerce/1.png",
    screenshots: [
      "/projects/ecommerce/1.png",
      "/projects/ecommerce/2.png",
      "/projects/ecommerce/3.png",
      "/projects/ecommerce/4.png",
      "/projects/ecommerce/5.png",
      "/projects/ecommerce/6.png",
      "/projects/ecommerce/7.png",
      "/projects/ecommerce/8.png",
      "/projects/ecommerce/9.png",
      "/projects/ecommerce/10.png",
      "/projects/ecommerce/11.png",
      "/projects/ecommerce/12.png",
      "/projects/ecommerce/13.png",
      "/projects/ecommerce/14.png",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/Anif23/e-commerce",
    techs: [
      "React.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "TanStack Query",
      "Zustand",
      "Socket.IO",
      "PayPal API",
    ],
    stats: [
      {
        label: "Payments",
        value: "PayPal",
      },
      {
        label: "State",
        value: "Zustand",
      },
    ],
  },
];

export interface TimelineItem {
  key: "fe" | "app" | "fs" | "mca" | "bca";
  type: "work" | "education";
  dateKey: string;
  titleKey: string;
  companyKey: string;
  descKey: string;
}

export const timeline: TimelineItem[] = [
  {
    key: "bca",
    type: "education",
    dateKey: "timeline.bca_date",
    titleKey: "timeline.bca_title",
    companyKey: "timeline.bca_company",
    descKey: "",
  },
  {
    key: "mca",
    type: "education",
    dateKey: "timeline.mca_date",
    titleKey: "timeline.mca_title",
    companyKey: "timeline.mca_company",
    descKey: "",
  },
  {
    key: "fe",
    type: "work",
    dateKey: "timeline.fe_date",
    titleKey: "timeline.fe_title",
    companyKey: "timeline.fe_company",
    descKey: "timeline.fe_desc",
  },
  {
    key: "app",
    type: "work",
    dateKey: "timeline.app_date",
    titleKey: "timeline.app_title",
    companyKey: "timeline.app_company",
    descKey: "timeline.app_desc",
  },
  {
    key: "fs",
    type: "work",
    dateKey: "timeline.fs_date",
    titleKey: "timeline.fs_title",
    companyKey: "timeline.fs_company",
    descKey: "timeline.fs_desc",
  },
];

export interface ProblemItem {
  key:
    | "payment"
    | "realtime"
    | "tracking"
    | "performance"
    | "api"
    | "auth"
    | "mobile"
    | "state";
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  color: string;
}

export const problems: ProblemItem[] = [
  {
    key: "payment",
    icon: Zap,
    titleKey: "problems.payment.title",
    descKey: "problems.payment.desc",
    color: "#10b981",
  },
  {
    key: "realtime",
    icon: Zap,
    titleKey: "problems.realtime.title",
    descKey: "problems.realtime.desc",
    color: "#3b82f6",
  },
  {
    key: "tracking",
    icon: Layers,
    titleKey: "problems.tracking.title",
    descKey: "problems.tracking.desc",
    color: "#8b5cf6",
  },
  {
    key: "performance",
    icon: Gauge,
    titleKey: "problems.performance.title",
    descKey: "problems.performance.desc",
    color: "#06b6d4",
  },
  {
    key: "mobile",
    icon: Smartphone,
    titleKey: "problems.mobile.title",
    descKey: "problems.mobile.desc",
    color: "#f59e0b",
  },
  {
    key: "state",
    icon: Workflow,
    titleKey: "problems.state.title",
    descKey: "problems.state.desc",
    color: "#ec4899",
  },
];

export interface Badge {
  key: string;
  icon: LucideIcon;
  label: { en: string; ar: string };
  color: string;
}

export const badges: Badge[] = [
  {
    key: "realtime",
    icon: Zap,
    label: { en: "Real-Time Specialist", ar: "متخصص الوقت الفعلي" },
    color: "#3b82f6",
  },
  {
    key: "fullstack",
    icon: Layers,
    label: { en: "Full Stack Engineer", ar: "مهندس متكامل" },
    color: "#8b5cf6",
  },
  {
    key: "mobile",
    icon: Smartphone,
    label: { en: "Mobile Developer", ar: "مطور جوال" },
    color: "#06b6d4",
  },
  {
    key: "api",
    icon: Server,
    label: { en: "API Architect", ar: "معماري API" },
    color: "#10b981",
  },
  {
    key: "perf",
    icon: Cpu,
    label: { en: "Performance Optimizer", ar: "مُحسّن الأداء" },
    color: "#f59e0b",
  },
  {
    key: "typesafe",
    icon: Shield,
    label: { en: "Type-Safe Coder", ar: "مُبرمج آمن نوعياً" },
    color: "#ec4899",
  },
];

export interface DevStat {
  key: string;
  value: number;
  suffix?: string;
  decimals?: number;
  icon: LucideIcon;
  color: string;
  labelKey: string;
}

export const devStats: DevStat[] = [
  {
    key: "years",
    value: 3,
    suffix: "+",
    icon: Layers,
    color: "#3b82f6",
    labelKey: "dashboard.years_exp",
  },
  {
    key: "projects",
    value: 12,
    suffix: "+",
    icon: Atom,
    color: "#8b5cf6",
    labelKey: "dashboard.projects",
  },
  {
    key: "tech",
    value: 16,
    suffix: "+",
    icon: Cpu,
    color: "#06b6d4",
    labelKey: "dashboard.technologies",
  },
  {
    key: "repos",
    value: 24,
    suffix: "+",
    icon: GitBranch,
    color: "#10b981",
    labelKey: "dashboard.repos",
  },
  {
    key: "commits",
    value: 1240,
    suffix: "+",
    icon: Terminal,
    color: "#f59e0b",
    labelKey: "dashboard.commits",
  },
  {
    key: "coffees",
    value: 2847,
    suffix: "",
    icon: Zap,
    color: "#ec4899",
    labelKey: "dashboard.coffees",
  },
];

export interface Certification {
  key: string;
  title: { en: string; ar: string };
  issuer: { en: string; ar: string };
  date: string;
  color: string;
}

export const certifications: Certification[] = [
  {
    key: "mca",
    title: {
      en: "Master of Computer Applications (MCA)",
      ar: "ماجستير تطبيقات الحاسوب (MCA)",
    },
    issuer: { en: "Anna University", ar: "جامعة آنا" },
    date: "2020 – 2022",
    color: "#3b82f6",
  },
  {
    key: "bca",
    title: {
      en: "Bachelor of Computer Applications (BCA)",
      ar: "بكالوريوس تطبيقات الحاسوب (BCA)",
    },
    issuer: {
      en: "Manonmaniam Sundaranar University",
      ar: "جامعة مانونمانيام سوندارانار",
    },
    date: "2017 – 2020",
    color: "#8b5cf6",
  },
];

export const codeSnippets = {
  react: `import { useState, useEffect } from 'react';

interface Order {
  id: string;
  status: 'pending' | 'shipped' | 'delivered';
  total: number;
}

export function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <ul>
      {orders.map(order => (
        <li key={order.id}>
          {order.id} — {order.status}
        </li>
      ))}
    </ul>
  );
}`,
  node: `import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const app = express();

const orderSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

app.post('/api/orders', auth, async (req, res) => {
  const { productId, quantity } = orderSchema.parse(req.body);
  
  const order = await prisma.order.create({
    data: { productId, quantity, userId: req.userId },
  });
  
  io.emit('order:created', order);
  res.json(order);
});`,
  postgres: `-- Schema for a scalable e-commerce platform
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'pending',
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);`,
};

export const CONTACT = {
  email: "mohamedanif32@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohamed-puhari-anif-y-787801254",
  github: "https://github.com/Anif23",
  whatsapp: "https://wa.me/917373873954",
  portfolio: "https://anif-portfolio-app.vercel.app/",
};

export const PROFILE_IMAGE = "/my_pic.jpg";

export const COFFEE_COUNT = 2847;
