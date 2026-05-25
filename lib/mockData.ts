import { Project } from "@/types/project";
import { Experience } from "@/types/experience";
import { Skill } from "@/types/skill";

export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export interface Service {
  title: string;
  description: string;
}

export interface GeneralInfo {
  name: string;
  role: string;
  tagline: string;
  bioSummary: string;
  bioDetailed: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  linkedin: string;
  stats: { label: string; value: string }[];
}

export const generalInfo: GeneralInfo = {
  name: "Omotayo Abdulkareem",
  role: "AI Automation Engineer",
  tagline: "AI Automation Engineer — designing workflow automation systems, AI agents, and business process automation that eliminate bottlenecks and scale operations.",
  bioSummary: "AI Automation Engineer specializing in workflow automation systems, AI agent development, CRM automation, and business process automation. I design production-ready automation systems that eliminate manual bottlenecks, reduce human error, and save thousands of operational hours.",
  bioDetailed: "With deep expertise in workflow automation and systems integration, I specialize in connecting disparate SaaS platforms, building custom AI agents (RAG, LLM chains), and orchestrating seamless data pipelines. I believe automation isn't about replacing humans—it's about freeing them up to focus on high-leverage strategic growth.",
  email: "omolinks@gmail.com",
  phone: "+2347036175998",
  whatsapp: "+2347036175998",
  location: "Lagos, Nigeria (Remote)",
  linkedin: "https://www.linkedin.com/in/omotayo-abdulkareem",
  stats: [
    { label: "Hours Saved / Month", value: "250+" },
    { label: "Successful Automations", value: "50+" },
    { label: "AI Agents Built", value: "15+" },
    { label: "API Integrations Done", value: "100+" }
  ]
};

export const services: Service[] = [
  {
    title: "AI Workflow Automation",
    description: "Connect your marketing, sales, and operations tools into a unified, self-running pipeline. Automate repetitive tasks across platforms so your team focuses on high-impact work, not manual data entry."
  },
  {
    title: "CRM Automation",
    description: "Keep your customer data clean, synced, and actionable. Automate lead capture, follow-up sequences, deal stage updates, and reporting across your entire sales pipeline."
  },
  {
    title: "AI Chatbots & Agents",
    description: "Deploy intelligent assistants that handle customer inquiries, qualify leads, and route complex requests to your team. Available on your website, WhatsApp, or Slack."
  },
  {
    title: "Business Process Automation",
    description: "Map out your manual bottlenecks and replace them with reliable automated workflows. From invoice processing to employee onboarding, reduce errors and cut processing time by 80%."
  },
  {
    title: "API Integrations",
    description: "Connect apps that weren't built to talk to each other. Build custom bridges between your CRM, email, accounting, and operations tools for seamless data flow across your entire stack."
  }
];

export const skills: Skill[] = [
  { name: "OpenAI", category: "AI & LLMs", level: 95 },
  { name: "Prompt Engineering", category: "AI & LLMs", level: 92 },
  { name: "Anthropic Claude", category: "AI & LLMs", level: 88 },
  { name: "LangChain", category: "AI & LLMs", level: 85 },
  { name: "Vector Databases", category: "AI & LLMs", level: 80 },
  { name: "Embeddings & RAG", category: "AI & LLMs", level: 82 },
  { name: "n8n", category: "Automation", level: 95 },
  { name: "Zapier", category: "Automation", level: 92 },
  { name: "Make", category: "Automation", level: 90 },
  { name: "Webhook Automation", category: "Automation", level: 88 },
  { name: "Workflow Orchestration", category: "Automation", level: 85 },
  { name: "Scheduled Jobs & CRON", category: "Automation", level: 80 },
  { name: "Python", category: "Scripting & Automation", level: 90 },
  { name: "JavaScript", category: "Scripting & Automation", level: 92 },
  { name: "TypeScript", category: "Scripting & Automation", level: 88 },
  { name: "Node.js", category: "Scripting & Automation", level: 86 },
  { name: "Next.js", category: "Scripting & Automation", level: 85 },
  { name: "FastAPI", category: "Scripting & Automation", level: 80 },
  { name: "REST APIs", category: "Data & APIs", level: 95 },
  { name: "GraphQL", category: "Data & APIs", level: 85 },
  { name: "Webhooks", category: "Data & APIs", level: 92 },
  { name: "JSON / XML", category: "Data & APIs", level: 90 },
  { name: "PostgreSQL", category: "Data & APIs", level: 88 },
  { name: "Supabase", category: "Data & APIs", level: 85 },
];

export const experiences: Experience[] = [
  {
    company: "Freelance / Automation Lab",
    role: "Lead AI Automation Consultant",
    period: "Jan 2024 - Present",
    description: "Designed and deployed 40+ custom automations on Make.com and Zapier for international clients.\nBuilt custom AI lead extraction pipelines using OpenAI GPT-4o, increasing response rates by 250%.\nCreated a Slack-based operations hub syncing tasks, invoicing, and contracts.\nDeveloped a custom RAG chatbot connected to Pinecone, reducing ticket load by 45%."
  },
  {
    company: "Vortex Tech Solutions",
    role: "Systems Integration Engineer",
    period: "Jun 2022 - Dec 2023",
    description: "Architected automated integration pipelines connecting client ERP systems with CRM platforms.\nBuilt secure webhook receivers with retry queues and automated error notification systems.\nLed migration of legacy support pipeline into automated Zendesk/HubSpot dashboard.\nDesigned custom automation scripts for Zapier and Make to eliminate manual data entry."
  },
  {
    company: "Synergy Software",
    role: "Integration Engineer",
    period: "Feb 2020 - May 2022",
    description: "Built automated reporting dashboards and workflow tools connecting Stripe, Twilio, and SendGrid APIs.\nDesigned automated data pipelines and optimized database queries for real-time business intelligence.\nDeveloped RESTful integration endpoints for third-party platform connectivity.\nLed automation-focused sprint planning and code review processes."
  }
];

export const projects: Project[] = [
  {
    id: "1",
    slug: "autoreach-outreach-engine",
    title: "AutoReach: AI-Powered Outreach Engine",
    category: "AI & Automation",
    summary: "An autonomous B2B outreach pipeline that researches prospects, writes hyper-personalized icebreakers, and handles automated follow-ups.",
    problem: "The client's sales team spent over 20 minutes researching each prospect before emailing, limiting daily outreach to just 15 highly-tailored messages per rep.",
    solution: "Designed a Make.com workflow triggered when a new lead enters Airtable. An automated scraper fetches prospect homepage content, an LLM chain identifies pain points and drafts personalized outreach, then Smartlead schedules the email and HubSpot is updated.",
    tools: ["Make.com", "OpenAI API", "Smartlead API", "HubSpot CRM", "Airtable"],
    outcome: "Reduced research time from 20 minutes to under 20 seconds per lead.\nIncreased email open rate by 34% and response rate by 2.5x.\nScaled outreach from 15 to 150 leads/day per rep.",
    featured: true,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800",
    demoUrl: "https://www.youtube.com/watch?v=demo-autoreach"
  },
  {
    id: "2",
    slug: "docusense-invoice-pipeline",
    title: "DocuSense: Intelligent Invoice Processor",
    category: "Intelligent Document Processing",
    summary: "An automated document processor using OCR and GPT-4o to parse financial receipts and sync with Google Sheets and Slack.",
    problem: "Contractors sent invoices in various formats (PDFs, PNGs, Word docs). An accountant had to manually verify totals and enter them into spreadsheets.",
    solution: "Built a Python FastAPI webhook server. Documents uploaded to Google Drive or Slack trigger GPT-4o analysis with structured JSON output. Validated data is appended to Google Sheets, and Slack confirmation cards allow approve/reject actions.",
    tools: ["Python", "FastAPI", "OpenAI GPT-4o", "Google Sheets API", "Slack Webhooks"],
    outcome: "Automated 92% of incoming invoices without manual entry.\nAccounting workload reduced by 12 hours weekly.\nDocument validation errors reduced to nearly 0%.",
    featured: true,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
    demoUrl: "https://www.youtube.com/watch?v=demo-docusense"
  },
  {
    id: "3",
    slug: "supportsync-chat-agent",
    title: "SupportSync: RAG Support Bot",
    category: "AI Chatbots",
    summary: "An AI support agent integrated with WhatsApp and Pinecone vector database to resolve customer tickets dynamically.",
    problem: "Support staff was overwhelmed by repetitive questions, leading to response times over 4 hours for high-priority inquiries.",
    solution: "Created an ingestion pipeline that stores help docs as vector chunks in Pinecone. Twilio webhooks trigger a serverless LLM router that retrieves relevant context and responds on WhatsApp. Complex queries create Zendesk tickets automatically.",
    tools: ["Next.js", "Pinecone DB", "LangChain", "OpenAI API", "Twilio WhatsApp"],
    outcome: "Resolved 42% of support queries automatically.\nResponse time dropped from 4.2 hours to 3 seconds.\nCustomer satisfaction score improved by 18 points.",
    featured: true,
    image: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?q=80&w=800",
    demoUrl: "https://www.youtube.com/watch?v=demo-supportsync"
  },
  {
    id: "4",
    slug: "dataflow-shopify-bridge",
    title: "DataFlow: Shopify to ERP Connector",
    category: "E-Commerce Operations",
    summary: "A robust middleware bridging Shopify orders, inventory databases, and QuickBooks accounting automatically.",
    problem: "The client suffered from overselling because Shopify inventory took up to 6 hours to sync with the warehouse. Financial reporting discrepancies from manual entry.",
    solution: "Configured real-time order sync using webhooks and Node.js scripts. Every order triggers inventory reductions across all channels. Order lines are formatted into QuickBooks invoices automatically with email receipts.",
    tools: ["Zapier", "Node.js", "Shopify API", "QuickBooks API", "PostgreSQL"],
    outcome: "Reduced inventory sync delays from 6 hours to under 3 seconds.\nEliminated overselling, saving $4,000/month in cancellations.\nSaved accounting 8 hours of reconciliation work weekly.",
    featured: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    role: "COO, GrowthScale Media",
    text: "Omotayo transformed our operations. We went from a chaotic mess of manual spreadsheets to a fully automated pipeline. Our team is now saving over 30 hours every single week."
  },
  {
    name: "David Chen",
    role: "Founder, OmniStore Brand",
    text: "The WhatsApp customer assistant resolves half of our customer queries instantly. The Shopify integration is flawless. We saw ROI within the first two weeks."
  },
  {
    name: "Marcus Vance",
    role: "VP of Sales, ApexLead Solutions",
    text: "Our outbound email volume quadrupled while maintaining high response rates, thanks to the AI personalization engine. Omotayo is structured, communicative, and exceptionally skilled."
  }
];
