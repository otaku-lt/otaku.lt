# Korniha Band Page Tests

Tests for the Korniha band page (`otaku.lt/korniha`).

## Data Validation (`scripts/validate-events.ts`)

Same validation script covers Korniha events:

- **Unique IDs within `korniha.yaml`** — no duplicate IDs in the band's own file
- **Required fields** — `id`, `title`, `date`, `location` must be present
- **Image existence** — every `image` path must exist in `public/images/`
- **Date format** — valid ISO date strings

## Playwright E2E Tests (`tests/korniha.spec.ts`)

### Page Load
- `/korniha` loads with event list visible
- Page heading contains "Korniha"

### Event Cards
- At least one event card is displayed
- Event cards show date in `YYYY-MM-DD` format
- Event cards show location

### Event Interaction
- Clicking an event card opens details (modal or navigation)

### Homepage Link
- Homepage contains a link to `/korniha`

## Running with Docker

Uses `.devcontainer/docker-compose.test.yml`:

```bash
# Data validation (covers korniha.yaml too)
npm run test:docker:data

# E2E tests
npm run test:docker:e2e
```

**Colima note**: Ensure Colima is running (`colima status` or `colima start`).

## Future additions (not bare minimum)
- Setlist display verification
- Featured event highlighting
- Mobile viewport testing
