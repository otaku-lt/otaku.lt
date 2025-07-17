// This API route is pre-rendered at build time for static export
export const dynamic = 'force-static';

import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { ScheduleDay } from '@/types/yurucamp';

// Read the YAML file at build time
async function getSchedule(): Promise<ScheduleDay[]> {
  const filePath = path.join(process.cwd(), 'data/yurucamp/schedule.yaml');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return yaml.load(fileContents) as ScheduleDay[];
}

export async function GET() {
  try {
    const schedule = await getSchedule();
    return new Response(JSON.stringify(schedule), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching schedule data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch schedule data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
