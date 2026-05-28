---
description: Add a new event to the otaku.lt events calendar
---

## Add Event to Calendar

### 1. Gather Event Details
- User provides event information (title, date, time, location, description, link, image URL)
- **User input takes priority** over scraped data
- If a link is provided, attempt to scrape additional info from it (dates, venue, description), but confirm with user before using scraped data

### 2. Determine Data File
- Events are stored in `data/events/monthly/YYYY-MM.yaml`
- Based on event date, identify the correct monthly YAML file
- If the file doesn't exist, create it

### 3. Get Unique Event ID
- Search ALL monthly YAML files in `data/events/monthly/` for the highest existing ID
- Use `grep` + `awk` to find max ID: `grep -r "^  id:" data/events/monthly/ | awk '{print $2}' | sort -n | tail -1`
- New event ID = max ID + 1
- **Critical**: IDs must be unique globally across all monthly files

### 4. Download Event Image
- If user provides an image URL, download it to: `public/images/events/YYYY/MM/YYYY-MM-event-slug.jpg`
- Create the directory if it doesn't exist: `mkdir -p public/images/events/YYYY/MM`
- Use `curl -o` to download the image
- If image is a Facebook/Instagram CDN URL, it may expire — download immediately
- If copying from an existing event, reuse the same image path

### 5. Build Event YAML Entry
```yaml
- id: <UNIQUE_ID>
  title: '<Event Title>'
  date: 'YYYY-MM-DD'
  time: 'HH:MM'  # or 'All day' for multi-day events
  endDate: 'YYYY-MM-DD'  # only for multi-day events
  location: 'Venue Name, City'
  category: <convention|screening|concert|meetup|cosplay|other>
  description: |
    <Event description>
  featured: <true|false>
  organizer: '<Organizer Name>'
  link: 'https://...'
  image: '/images/events/YYYY/MM/YYYY-MM-event-slug.jpg'
```

### 6. Add to Monthly YAML
- Append the event entry to the correct `data/events/monthly/YYYY-MM.yaml`
- Maintain chronological order if possible
- Ensure YAML indentation is correct (2 spaces)

### 7. Commit Changes
```bash
git add data/events/monthly/YYYY-MM.yaml public/images/events/YYYY/MM/YYYY-MM-event-slug.jpg
git commit -m "Add <Event Name> to events calendar

- Date: <date>
- Location: <location>
- Category: <category>"
```

### Special Cases
- **Screenings with multiple dates/cinemas**: Use `screenings[]` array instead of single date/time
  ```yaml
  screenings:
    - date: 'YYYY-MM-DD'
      time: 'HH:MM'
      cinema: 'Cinema Name'
  ```
- **Multi-day events**: Use `endDate` field
- **Events with multiple booking links**: Use `links[]` array
  ```yaml
  links:
    - name: 'Venue Name'
      url: 'https://...'
  ```
