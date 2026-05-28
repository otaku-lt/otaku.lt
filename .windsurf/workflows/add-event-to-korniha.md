---
description: Add a new event to the Korniha band events page
---

## Add Event to Korniha Band

### 1. Gather Event Details
- User provides event information (title, date, time, location, description, link, image)
- **User input takes priority** over scraped data
- If user says "copy from event calendar" or similar:
  - Find the event in `data/events/monthly/YYYY-MM.yaml`
  - Copy all fields from there (title, date, time, location, description, image path, link)
  - Reuse the **same image path** — do not download a new image
- If a link to an external image is provided, download it to the standard events image location

### 2. Determine Data File
- Korniha events are stored in: `data/events/korniha.yaml`
- This is a single file, not split by month

### 3. Get Unique Event ID
- Search `data/events/korniha.yaml` for the highest existing ID
- Use:
  ```bash
  grep "^  id:" data/events/korniha.yaml | awk '{print $2}' | sort -n | tail -1
  ```
- New event ID = max ID + 1
- **Verify uniqueness** before assigning:
  ```bash
  grep "id: <NEW_ID>" data/events/korniha.yaml
  ```
- If result is empty, the ID is safe to use. If not, increment and check again.
- IDs in korniha.yaml are separate from monthly event IDs (they have their own sequence)

### 4. Determine Setlist Type
**Ask the user for setlist type UNLESS one of these applies:**
- User explicitly states "Lithuanian" or "Japanese and Lithuanian" in their request
- Event is **in Lithuania** → default to **"Lithuanian"** (most common)
- Event is **abroad** (outside Lithuania) → default to **"Japanese"** (no need to ask)
- If user says "Japanese and Lithuanian" or "mixed" → use **"Japanese & Lithuanian"**

If unsure, ask: "What setlist type? (Japanese, Lithuanian, or Japanese & Lithuanian)"

### 5. Download Event Image (if new image needed)
- Only download if user provided a new image URL
- Save to: `public/images/events/YYYY/MM/YYYY-MM-event-slug.jpg`
- Create directory: `mkdir -p public/images/events/YYYY/MM`
- If copying from calendar event, reuse the **same image path** from that event

### 6. Build Event YAML Entry
```yaml
- id: <UNIQUE_ID>
  title: "<Event Title>"
  date: "YYYY-MM-DD"
  time: "HH:MM"  # or "All day"
  location: "Venue, City"
  description: |
    <Event description>
  link: "https://..."
  setlist:
    type: "<Japanese|Lithuanian|Japanese & Lithuanian>"
  featured: <true|false>
  image: "/images/events/YYYY/MM/YYYY-MM-event-slug.jpg"
```

### 7. Add to korniha.yaml
- Append the event entry to `data/events/korniha.yaml`
- Maintain chronological order if possible
- Ensure YAML indentation is correct (2 spaces)

### 8. Commit Changes
```bash
git add data/events/korniha.yaml
# Only add image if it's a new download, not if reusing existing path
git add public/images/events/YYYY/MM/YYYY-MM-event-slug.jpg  # if new image
git commit -m "Add <Event Name> to Korniha band events

- Date: <date>
- Location: <location>
- Setlist: <type>"
```

### Special Cases
- **Copying from calendar**: When user says "add the event that's already in the calendar", reuse all fields including the image path. Do not download a new image.
- **Setlist for multi-day events**: Same rules apply — Lithuania = Lithuanian, abroad = Japanese
- **Featured**: Usually `true` for upcoming major performances
