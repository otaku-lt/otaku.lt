const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');

// Month name to number mapping
const monthMap = {
  'january': '01', 'february': '02', 'march': '03', 'april': '04',
  'may': '05', 'june': '06', 'july': '07', 'august': '08',
  'september': '09', 'october': '10', 'november': '11', 'december': '12'
};

// Parse date string to YYYY-MM-DD format
function parseDate(dateStr) {
  // If already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  
  // Handle formats like "August 17, 2025"
  const match = dateStr.match(/^(\w+)\s*(\d+)[,\s]+(\d{4})/i);
  if (match) {
    const [, month, day, year] = match;
    const monthNum = monthMap[month.toLowerCase()];
    return `${year}-${monthNum}-${day.padStart(2, '0')}`;
  }
  
  // Handle formats like "September 5-7, 2025"
  const rangeMatch = dateStr.match(/^(\w+)\s*(\d+)[-–]\s*(\d+)[,\s]+(\d{4})/i);
  if (rangeMatch) {
    const [, month, startDay, , year] = rangeMatch;
    const monthNum = monthMap[month.toLowerCase()];
    return `${year}-${monthNum}-${startDay.padStart(2, '0')}`;
  }
  
  console.warn(`Could not parse date: ${dateStr}`);
  return dateStr; // Return as is if we can't parse it
}

// Get the target monthly file path based on the date
function getMonthlyFilePath(dateStr, eventsDir) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date: ${dateStr}`);
    return null;
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return path.join(eventsDir, 'monthly', `${year}-${month}.yaml`);
}

// Read YAML file
async function readYaml(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return yaml.load(content) || [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Write YAML file
async function writeYaml(filePath, data) {
  const content = yaml.dump(data, { lineWidth: -1 });
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf8');
}

// Main function
async function organizeEvents() {
  try {
    const rootDir = path.join(__dirname, '..');
    const eventsDir = path.join(rootDir, 'data', 'events');
    const eventsFile = path.join(eventsDir, 'events.yaml');
    
    // Read the root events file
    const events = await readYaml(eventsFile);
    
    // Group events by month
    const eventsByMonth = new Map();
    
    for (const event of events) {
      // Skip if no date
      if (!event.date) {
        console.warn(`Event ${event.id} has no date, skipping`);
        continue;
      }
      
      // Parse the date
      const dateStr = parseDate(event.date);
      const monthlyFile = getMonthlyFilePath(dateStr, eventsDir);
      
      if (!monthlyFile) {
        console.warn(`Could not determine monthly file for event ${event.id}`);
        continue;
      }
      
      // Update the event's date format
      event.date = dateStr;
      
      // Add to the appropriate monthly file
      if (!eventsByMonth.has(monthlyFile)) {
        eventsByMonth.set(monthlyFile, []);
      }
      eventsByMonth.get(monthlyFile).push(event);
    }
    
    // Write events to their respective monthly files
    for (const [filePath, fileEvents] of eventsByMonth.entries()) {
      // Read existing events from the monthly file
      const existingEvents = await readYaml(filePath);
      
      // Merge with new events, avoiding duplicates by ID
      const existingIds = new Set(existingEvents.map(e => e.id));
      const newEvents = fileEvents.filter(e => !existingIds.has(e.id));
      
      if (newEvents.length > 0) {
        const allEvents = [...existingEvents, ...newEvents];
        await writeYaml(filePath, allEvents);
        console.log(`Updated ${filePath} with ${newEvents.length} new events`);
      } else {
        console.log(`No new events to add to ${filePath}`);
      }
    }
    
    console.log('Event organization complete!');
    
  } catch (error) {
    console.error('Error organizing events:', error);
    process.exit(1);
  }
}

// Run the script
organizeEvents();
