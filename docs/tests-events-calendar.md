# Event Calendar Tests

Tests for the main events calendar page (`otaku.lt/events`).

## Data Validation (`scripts/validate-events.ts`)

Run before every build/PR via CI. Validates all event YAML files:

- **Unique IDs globally** — no duplicate IDs across all `data/events/monthly/*.yaml`
- **Required fields** — `id`, `title`, `date`, `location` must be present
- **Image existence** — every `image` path must exist in `public/images/`
- **Date format** — valid ISO date strings
- **Category validity** — must match known categories in `config/event-categories.ts`

## Playwright E2E Tests (`tests/events-calendar.spec.ts`)

### Homepage
- Loads with featured events section visible

### Calendar View (`/events`)
- FullCalendar component renders
- Month navigation (prev/next) changes the displayed month

### Event Interaction
- Clicking a calendar event opens a modal
- Modal contains the correct event title
- Deep-link `?event=ID-slug` opens the correct modal directly

### Filtering & Search
- Category filter buttons update the event list
- Search input filters events by title/description

### List View
- Switching to List View renders events in a grid layout

## Future additions (not bare minimum)
- Visual regression (screenshots)
- Mobile viewport testing
- Performance / Lighthouse
