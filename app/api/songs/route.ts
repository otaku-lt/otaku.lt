// This route needs to be statically generated at build time
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { NextResponse } from 'next/server';

export interface Song {
  title: string;
  original: string;
  artist?: string;
  type: 'ost' | 'game' | 'citypop' | 'jpop' | 'vocaloid';
  languages: ('jp' | 'lt' | 'en')[];
  featured: boolean;
  alt_title?: string;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data/songs/korniha.yaml');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const songs = yaml.load(fileContents) as Song[];
    
    if (!Array.isArray(songs)) {
      throw new Error('Invalid songs data format');
    }
    
    return NextResponse.json(songs);
  } catch (error) {
    console.error('Error reading songs:', error);
    return NextResponse.json(
      { error: 'Failed to load songs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
