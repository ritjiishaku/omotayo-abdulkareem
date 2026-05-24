export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  tools: string[];
  outcome: string;
  featured: boolean;
  image: string;
}
