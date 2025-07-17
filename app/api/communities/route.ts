// This API route is pre-rendered at build time for static export
export const dynamic = 'force-static';

// Import the YAML file directly (handled by webpack raw-loader)
import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Define the Community type
type Community = {
  id: string;
  title: string;
  description: string;
  category: string;
  featured?: boolean;
  links: Array<{
    type: string;
    url: string;
  }>;
  features?: string[];
  activity?: string;
};

// Read the YAML file at build time
async function getCommunities(): Promise<Community[]> {
  const filePath = path.join(process.cwd(), 'data/communities/communities.yaml');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return yaml.load(fileContents) as Community[];
}

// Pre-build the communities data
const communitiesPromise = getCommunities();

export async function GET() {
  try {
    const communities = await communitiesPromise;
    return new Response(JSON.stringify(communities), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      },
    });
  } catch (error) {
    console.error('Error in communities API route:', error);
    return new Response(JSON.stringify({ error: 'Failed to load communities' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
