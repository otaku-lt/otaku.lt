import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { NextResponse } from 'next/server';

interface EventDay {
  day?: number;
  title: string;
  songs: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  featured: boolean;
  setlist: EventDay[];
}

export async function GET() {
  try {
    console.log('Reading events from YAML file...');
    const filePath = path.join(process.cwd(), 'data/events/korniha.yaml');
    console.log('File path:', filePath);
    
    const fileContents = await fs.readFile(filePath, 'utf8');
    console.log('File contents length:', fileContents.length);
    
    const events = yaml.load(fileContents) as Event[];
    console.log('Parsed events:', events);
    
    if (!Array.isArray(events)) {
      throw new Error('Invalid events data format');
    }
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error reading events:', error);
    return NextResponse.json(
      { error: 'Failed to load events', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
