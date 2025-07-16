import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export interface CommunityLink {
  type: string;
  url: string;
}

export interface Community {
  id: number;
  title: string;
  description: string;
  category: string;
  members: number;
  featured: boolean;
  links: CommunityLink[];
}

let cachedCommunities: Community[] | null = null;

export function getCommunities(): Community[] {
  if (cachedCommunities) {
    return cachedCommunities;
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'communities', 'otaku-lt.yaml');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const communities = yaml.load(fileContents) as Community[];
    
    // Cache the communities for subsequent calls
    cachedCommunities = communities;
    return communities;
  } catch (error) {
    console.error('Error loading communities from YAML:', error);
    return [];
  }
}

export function getFeaturedCommunities(limit: number = 3): Community[] {
  const communities = getCommunities();
  return communities.filter(community => community.featured).slice(0, limit);
}
