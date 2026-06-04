/**
 * Event Data Validation Script
 *
 * Validates all event YAML files for:
 * - Unique IDs across monthly files
 * - Unique IDs within korniha.yaml
 * - Required fields present
 * - Image paths exist on disk
 * - Category values are valid
 * - Date formats are valid ISO dates
 *
 * Exit code 0 = all valid
 * Exit code 1 = validation errors found
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const MONTHLY_DIR = path.join(process.cwd(), 'data', 'events', 'monthly');
const KORNIHA_FILE = path.join(process.cwd(), 'data', 'events', 'korniha.yaml');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'events');

const VALID_CATEGORIES = new Set([
  'gaming', 'music', 'screening', 'workshop', 'meetup',
  'convention', 'camping', 'social', 'other', 'concert',
  'presentation', 'cosplay', 'party'
]);

interface ValidationError {
  file: string;
  eventIndex: number;
  eventTitle?: string;
  message: string;
}

const errors: ValidationError[] = [];
const warnings: ValidationError[] = [];

function addError(file: string, eventIndex: number, message: string, eventTitle?: string) {
  errors.push({ file, eventIndex, message, eventTitle });
}

function addWarning(file: string, eventIndex: number, message: string, eventTitle?: string) {
  warnings.push({ file, eventIndex, message, eventTitle });
}

function validateEvent(event: any, file: string, index: number): string | undefined {
  const title = event.title || '(untitled)';
  const hasScreenings = Array.isArray(event.screenings) && event.screenings.length > 0;

  // Required fields
  if (event.id === undefined || event.id === null || event.id === '') {
    addError(file, index, 'Missing or empty "id" field', title);
  }
  if (!event.title) {
    addError(file, index, 'Missing "title" field', title);
  }

  // Date: required at top level unless screenings array provides dates
  if (!event.date && !hasScreenings) {
    addError(file, index, 'Missing "date" field', title);
  } else if (event.date) {
    const d = new Date(event.date);
    if (isNaN(d.getTime())) {
      addError(file, index, `Invalid date format: "${event.date}"`, title);
    }
  }

  // Location: required at top level unless screenings array provides cinemas
  if (!event.location && !hasScreenings) {
    addError(file, index, 'Missing "location" field', title);
  }

  // Category validation (supports comma-separated)
  if (event.category) {
    const cats = String(event.category).toLowerCase().split(',').map(c => c.trim());
    for (const cat of cats) {
      if (!VALID_CATEGORIES.has(cat)) {
        addWarning(file, index, `Unknown category: "${event.category}"`, title);
        break;
      }
    }
  }

  // Screenings validation
  if (hasScreenings) {
    for (let j = 0; j < event.screenings.length; j++) {
      const s = event.screenings[j];
      if (!s.date) {
        addError(file, index, `Screening #${j + 1} missing "date" field`, title);
      } else {
        const sd = new Date(s.date);
        if (isNaN(sd.getTime())) {
          addError(file, index, `Screening #${j + 1} invalid date: "${s.date}"`, title);
        }
      }
      if (!s.cinema) {
        addError(file, index, `Screening #${j + 1} missing "cinema" field`, title);
      }
    }
  }

  // Image path validation
  if (event.image) {
    const imagePath = event.image.startsWith('/')
      ? path.join(process.cwd(), 'public', event.image)
      : path.join(process.cwd(), 'public', event.image);

    if (!fs.existsSync(imagePath)) {
      addError(file, index, `Image not found: "${event.image}"`, title);
    }
  } else {
    addWarning(file, index, 'No image specified', title);
  }

  // endDate validation
  if (event.endDate) {
    const ed = new Date(event.endDate);
    if (isNaN(ed.getTime())) {
      addError(file, index, `Invalid endDate format: "${event.endDate}"`, title);
    }
  }

  return title;
}

function validateMonthlyFiles() {
  const files = fs.readdirSync(MONTHLY_DIR)
    .filter(f => f.endsWith('.yaml'))
    .sort();

  const allIds = new Map<number, { file: string; title: string }>();

  for (const file of files) {
    const filePath = path.join(MONTHLY_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    let events: any[];

    try {
      events = yaml.load(content) as any[] || [];
    } catch (e) {
      addError(file, 0, `YAML parse error: ${(e as Error).message}`);
      continue;
    }

    if (!Array.isArray(events)) {
      addError(file, 0, 'Root YAML element is not an array');
      continue;
    }

    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const title = validateEvent(event, file, i);

      // ID uniqueness across all monthly files
      if (event.id !== undefined && event.id !== null && event.id !== '') {
        const idNum = Number(event.id);
        if (!isNaN(idNum)) {
          if (allIds.has(idNum)) {
            const other = allIds.get(idNum)!;
            addError(file, i, `Duplicate ID ${idNum} (also in ${other.file}: "${other.title}")`, title);
          } else {
            allIds.set(idNum, { file, title: title || '(untitled)' });
          }
        }
      }
    }
  }
}

function validateKornihaFile() {
  if (!fs.existsSync(KORNIHA_FILE)) {
    addError('korniha.yaml', 0, 'File not found');
    return;
  }

  const content = fs.readFileSync(KORNIHA_FILE, 'utf-8');
  let events: any[];

  try {
    events = yaml.load(content) as any[] || [];
  } catch (e) {
    addError('korniha.yaml', 0, `YAML parse error: ${(e as Error).message}`);
    return;
  }

  if (!Array.isArray(events)) {
    addError('korniha.yaml', 0, 'Root YAML element is not an array');
    return;
  }

  const kornihaIds = new Set<number>();

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const title = validateEvent(event, 'korniha.yaml', i);

    if (event.id !== undefined && event.id !== null && event.id !== '') {
      const idNum = Number(event.id);
      if (!isNaN(idNum)) {
        if (kornihaIds.has(idNum)) {
          addError('korniha.yaml', i, `Duplicate ID ${idNum} within korniha.yaml`, title);
        } else {
          kornihaIds.add(idNum);
        }
      }
    }
  }
}

function printResults() {
  const totalErrors = errors.length;
  const totalWarnings = warnings.length;

  if (totalWarnings > 0) {
    console.log(`\n⚠️  ${totalWarnings} warning(s):\n`);
    for (const w of warnings) {
      console.log(`  [${w.file}] Event #${w.eventIndex + 1}${w.eventTitle ? ` "${w.eventTitle}"` : ''}: ${w.message}`);
    }
  }

  if (totalErrors > 0) {
    console.log(`\n❌ ${totalErrors} error(s):\n`);
    for (const e of errors) {
      console.log(`  [${e.file}] Event #${e.eventIndex + 1}${e.eventTitle ? ` "${e.eventTitle}"` : ''}: ${e.message}`);
    }
    console.log(`\nValidation failed.\n`);
    process.exit(1);
  }

  console.log('\n✅ All event data validated successfully.\n');
  process.exit(0);
}

// Main
validateMonthlyFiles();
validateKornihaFile();
printResults();
