// This route needs to be statically generated at build time
export const dynamic = 'force-static';
// This route can be statically exported
// It will be revalidated every hour (3600 seconds)
export const revalidate = 3600; // 1 hour

import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { NextResponse } from 'next/server';
import { Event } from '@/types/event';

// Helper function to parse date string into Date object
function parseDate(dateStr: string): Date {
  return new Date(dateStr);
}

// Get all event files in the monthly directory
async function getEventFiles() {
  const eventsDir = path.join(process.cwd(), 'data/events/monthly');
  try {
    const files = await fs.readdir(eventsDir);
    return files.filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));
  } catch (error) {
    console.error('Error reading events directory:', error);
    return [];
  }
}

// Read and parse events from a file
async function readEventsFromFile(filename: string): Promise<Event[]> {
  try {
    const filePath = path.join(process.cwd(), 'data/events/monthly', filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = yaml.load(fileContents);
    
    if (!Array.isArray(data)) {
      console.error(`Invalid data format in ${filename}: expected an array of events`);
      return [];
    }
    
    // Ensure all required fields are present
    return data.map(event => {
      // Handle comma-separated categories
      let categories: string[] = [];
      if (event.category) {
        // If category contains commas, split it into multiple categories
        if (typeof event.category === 'string' && event.category.includes(',')) {
          categories = event.category.split(',').map((cat: string) => cat.trim());
        } else {
          // Single category
          categories = [event.category];
        }
      }
      
      return {
        id: event.id || '',
        title: event.title || 'Untitled Event',
        date: event.date || new Date().toISOString(),
        time: event.time,
        endDate: event.endDate,
        location: event.location || 'Location not specified',
        description: event.description || '',
        featured: Boolean(event.featured),
        status: event.status || 'upcoming',
        link: event.link,
        category: categories[0] || event.category, // Primary category
        categories: categories.length > 1 ? categories : undefined, // Only set if multiple categories
        image: event.image
      };
    });
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return [];
  }
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
    console.log('Reading events from monthly YAML files...');
    
    // Get all event files
    const eventFiles = await getEventFiles();
    console.log(`Found ${eventFiles.length} event files`);
    
    // Read and combine all events
    const allEvents = await Promise.all(
      eventFiles.map(file => readEventsFromFile(file))
    );
    
    // Flatten the array of events and sort by date
    const events = allEvents
      .flat()
      .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());
    
    console.log(`Loaded ${events.length} events`);
    
    return NextResponse.json(
      { success: true, events },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Error processing events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load events' },
      { status: 500, headers }
    );
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
