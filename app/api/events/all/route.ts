// This route needs to be statically generated at build time
export const dynamic = 'force-static';
// This route can be statically exported
// It will be revalidated every hour (3600 seconds)
export const revalidate = 3600; // 1 hour

import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { NextResponse } from 'next/server';

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  status: 'upcoming' | 'past' | 'cancelled';
  featured?: boolean;
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
    const filePath = path.join(process.cwd(), 'data/events/events.yaml');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const events = yaml.load(fileContents) as Event[];

    return new NextResponse(JSON.stringify(events), {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Error reading events:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to load events' }), {
      status: 500,
      headers
    });
  }
}

// Handle OPTIONS method for CORS preflight
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
