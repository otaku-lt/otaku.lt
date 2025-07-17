// This API route is pre-rendered at build time for static export
export const dynamic = 'force-static';

import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { FAQItem } from '@/types/yurucamp';

// Read the YAML file at build time
async function getFAQ(): Promise<FAQItem[]> {
  const filePath = path.join(process.cwd(), 'data/yurucamp/faq.yaml');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return yaml.load(fileContents) as FAQItem[];
}

export async function GET() {
  try {
    const faq = await getFAQ();
    return new Response(JSON.stringify(faq), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching FAQ data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch FAQ data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
