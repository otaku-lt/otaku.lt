# Calendar Date Selection Bug - Critical Data Flow Issue

## Problem
When clicking on an event in the calendar, the modal was defaulting to the first screening date instead of highlighting the clicked date.

## Root Causes (in order of data flow)

### 1. useCalendarEvents Hook Issue (CRITICAL)
**File**: `/hooks/useCalendarEvents.ts` line 38-39

**Problem**: The hook was setting `originalEvent: event`, which overwrote the carefully crafted `originalEvent` from `calendarEvents` that contained the date string.

**Solution**: 
```typescript
// WRONG - overwrites the originalEvent
originalEvent: event

// CORRECT - preserves the originalEvent from extendedProps
originalEvent: event.extendedProps?.originalEvent || event
```

### 2. Event ID Comparison Issue
**File**: `/app/events/page.tsx` line 366-370

**Problem**: The `useEffect` was comparing full event IDs (e.g., "16-d10") against base IDs (e.g., "16"), causing it to overwrite `selectedEvent` and lose `selectedScreeningDate`.

**Solution**:
```typescript
// Strip -d and -s suffixes before comparing
const selectedEventBaseId = selectedEvent?.id?.toString().split('-d')[0].split('-s')[0];

if (!isModalOpen || !selectedEvent || selectedEventBaseId !== eventId) {
  // Only update if it's a different event
}
```

### 3. Data Type Preservation
**File**: `/app/events/page.tsx` line 282-295

**Problem**: Need to preserve `date` as a string (YYYY-MM-DD format) through the entire data flow, not as a Date object.

**Solution**: In `calendarEvents` creation, explicitly set `date: event.date` in `extendedProps.originalEvent` AFTER spreading the event:
```typescript
extendedProps: {
  originalEvent: {
    ...event, // Spread first
    // Then override to ensure date is preserved as string
    date: event.date,
    // ... other properties
  }
}
```

## Key Data Flow

```
1. expandedEventsForCalendar (app/events/page.tsx)
   └─> Creates events with string dates for each screening date
   └─> Event: { id: "16-d10", date: "2025-10-10", ... }

2. calendarEvents (app/events/page.tsx)
   └─> Converts to FullCalendar format
   └─> Preserves string date in extendedProps.originalEvent
   └─> CalendarEvent: { start: Date, extendedProps: { originalEvent: { date: "2025-10-10" } } }

3. useCalendarEvents (hooks/useCalendarEvents.ts)
   └─> Processes events for FullCalendar
   └─> MUST preserve extendedProps.originalEvent (not overwrite it!)
   └─> Returns: { extendedProps: { originalEvent: { date: "2025-10-10" } } }

4. handleCalendarEventClick (app/events/page.tsx)
   └─> Extracts original.date from extendedProps
   └─> Passes as selectedScreeningDate
   └─> Event: { date: "2025-10-10", selectedScreeningDate: "2025-10-10" }

5. EventModal (components/events/EventModal.tsx)
   └─> Receives selectedScreeningDate prop
   └─> Highlights the correct date
```

## Debug Strategy

When date selection fails, check these in order:

1. **Check `original.date` in `handleCalendarEventClick`**
   ```typescript
   console.log('original.date:', original?.date);
   // Should be: "2025-10-10" (string)
   // NOT: undefined or Date object
   ```

2. **Check `selectedScreeningDate` being passed to EventModal**
   ```typescript
   console.log('selectedScreeningDate:', selectedScreeningDate);
   // Should be: "2025-10-10" (string)
   // NOT: null or undefined
   ```

3. **Check if modal is being re-rendered with undefined props**
   ```typescript
   // In EventModal
   console.log('selectedScreeningDate prop:', selectedScreeningDate);
   // If it's correct first, then becomes undefined = useEffect is overwriting
   ```

4. **Check the data flow at each step**
   - Add logging in `expandedEventsForCalendar` to verify date format
   - Add logging in `calendarEvents` to verify extendedProps.originalEvent
   - Add logging in `useCalendarEvents` to verify originalEvent preservation
   - Add logging in `handleCalendarEventClick` to verify date extraction

## Common Mistakes to Avoid

1. **Don't overwrite `originalEvent` in `useCalendarEvents`**
   - Always preserve `event.extendedProps?.originalEvent` if it exists

2. **Don't compare full event IDs with base IDs**
   - Always strip `-d` and `-s` suffixes when comparing IDs

3. **Don't convert dates to Date objects unnecessarily**
   - Keep dates as strings (YYYY-MM-DD) throughout the data flow
   - Only convert to Date objects when needed for FullCalendar's `start`/`end` properties

4. **Don't let useEffect overwrite selectedEvent**
   - Always check if the modal is already open with the same event before updating

## Testing Checklist

- [ ] Click on an event with multiple screenings on different dates
- [ ] Verify the modal shows the clicked date in the header
- [ ] Verify the screenings for that date are highlighted with pink background
- [ ] Verify cinema sections with screenings on that date are auto-expanded
- [ ] Click on different dates of the same event - each should highlight correctly
- [ ] Close and reopen the modal - date should persist
- [ ] Check browser console for any "undefined" or "null" date warnings

## Related Files

- `/hooks/useCalendarEvents.ts` - Processes calendar events
- `/app/events/page.tsx` - Main events page with calendar
- `/components/events/EventModal.tsx` - Modal that displays event details
- `/components/Calendar.tsx` - Calendar component wrapper
- `/types/event.ts` - Event type definitions

## Last Updated
October 30, 2025 - Bug fixed and documented
