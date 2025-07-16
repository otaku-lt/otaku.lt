import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data/communities/communities.yaml');
    console.log('Reading communities from:', filePath);
    
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = yaml.load(fileContents);
    
    console.log('Successfully loaded', Array.isArray(data) ? data.length : 0, 'communities');
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error reading communities file:', error);
    return new Response(JSON.stringify({ error: 'Failed to load communities' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
