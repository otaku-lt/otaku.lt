// This route needs to be statically generated at build time
export const dynamic = 'force-static';
// This route can be statically exported
// It will be revalidated every hour (3600 seconds)
export const revalidate = 3600; // 1 hour

import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { NextResponse } from 'next/server';


interface SetlistDay {
  day?: number;
  type: 'Japanese' | 'Lithuanian';
}

type Setlist = 'Japanese' | 'Lithuanian' | SetlistDay[];

export interface Event {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  featured: boolean;
  link?: string;
  setlist: Setlist;
}

export async function GET() {
  // Set CORS and cache control headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'
  };

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
    
    return new NextResponse(
      JSON.stringify({
        success: true,
        events: events || []
      }),
      { 
        status: 200,
        headers
      }
    );
  } catch (error) {
    console.error('Error reading events:', error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: 'Failed to load events'
      }),
      {
        status: 500,
        headers
      }
    );
  }
}

// Handle OPTIONS method for CORS preflight
// This is necessary for some browsers and environments
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
