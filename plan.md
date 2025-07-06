# otaku.lt Development Plan

## Phase 1: Foundation Setup ✅ COMPLETED
1. **Choose Tech4. **Community Engagement**:
   - Add a Discord widget or invite link.
   - Gamification: Earn badges for event submissions or photo uploads.
   - Voting system for "Best cosplay" or "Top karaoke performance."

5. **Enhanced Media Integration**:
   - Real photo/video galleries for all events.
   - Image upload and management system.
   - Video embedding from YouTube/TikTok.
   - Social media feed integration.ck** ✅:
   - ✅ Framework: Next.js 13.5.1 with App Router (React-based for fast, dynamic pages).
   - ✅ Styling: Tailwind CSS for modern, responsive design.
   - ✅ Hosting: Ready for Vercel or Netlify deployment.
   - ✅ shadcn/ui: Fully integrated comprehensive component library.
   - ✅ TypeScript: Configured and implemented throughout.
   - ✅ Additional packages: React Hook Form, Zod validation, Lucide icons, date-fns, etc.

2. **Initial Pages** ✅:
   - ✅ **Homepage**: Complete with hero section, featured events, and community links.
   - ✅ **Events**: Event listing with filtering and search (calendar view pending).
   - ✅ **Idol Stage**: Blog-style page with tabs and content sections.
   - ✅ **YuruCamp**: Complete with FAQ, schedule, gallery, and about sections.
   - ✅ **Korniha Band**: Band page with members, songs, and gigs sections.
   - ✅ **Communities**: Directory page for community links.
   - ✅ **Contact**: Contact page structure.
   - ✅ **Submit**: Event submission form page.

3. **Basic Features** ✅:
   - ✅ Responsive design for desktop and mobile with hamburger menu.
   - ✅ Navigation bar and footer with links to all pages.
   - ✅ Professional gradient design theme (pink/purple/blue).
   - ✅ SEO metadata and optimization.
   - ✅ Modern card-based layouts throughout.

---

## Phase 2: Core Features 🚧 IN PROGRESS
1. **Event Submission System** 🔄:
   - ✅ Basic form structure created in `/app/submit/page.tsx`.
   - ⏳ Add form validation with React Hook Form + Zod (packages already installed).
   - ⏳ Add premoderation logic (e.g., admin approval before publishing).
   - ⏳ Backend integration for form submissions.
   - ⏳ Optional: Login via Discord/Google for submissions.

2. **Event Calendar** 🔄:
   - ✅ Events page with filtering and search functionality.
   - ⏳ Integrate a calendar library (e.g., `react-calendar` or `fullcalendar`).
   - ⏳ Calendar view alongside existing list view.
   - ✅ Allow filtering by event type (anime, gaming, music, etc.) - already implemented.

3. **Dynamic Content Management** 🔄:
   - ⏳ Convert hardcoded events to dynamic data source.
   - ⏳ Database/CMS integration for events, articles, and community links.
   - ⏳ Admin interface for content management.

4. **Idol Stage & YuruCamp Pages** 🔄:
   - ✅ Page structure and navigation completed.
   - ⏳ Add real past event articles with photos and videos.
   - ⏳ Include a timeline of editions (e.g., Winter 2024, Autumn 2023).
   - ⏳ Create functional sign-up form for YuruCamp participants.
   - ⏳ Real photo galleries (currently placeholder content).

5. **Community Links** 🔄:
   - ✅ Directory page structure created.
   - ⏳ Populate with real Discord servers, Facebook groups, YouTube channels, and Reddit threads.
   - ⏳ Add icons and links for easy navigation.
   - ⏳ Community submission/verification system.

6. **Working Forms & Functionality** 🔄:
   - ⏳ Newsletter signup functionality (form exists but not functional).
   - ⏳ Contact form email integration.
   - ⏳ Form success/error handling and user feedback.

---

## Phase 3: Advanced Features ⏳ PLANNED
1. **Interactive Pixel Map**:
   - Create a stylized map of otaku-related locations in Lithuania.
   - Add pins for shops, cafés, and event venues.
   - Include floating icons for online spaces (e.g., Discord servers).

2. **Artist Party Page**:
   - Gallery of works from past events.
   - Artist spotlight section with bios and links to their socials.
   - Registration form for artists to join future events.

3. **Enhanced Korniha Band Page** 🔄:
   - ✅ Band member bios and basic info completed.
   - ⏳ Embed YouTube or SoundCloud for music samples.
   - ⏳ Archive of past gigs and performances with real data.
   - ⏳ Ticket booking integration.

4. **Community Engagement**:
   - Add a Discord widget or invite link.
   - Gamification: Earn badges for event submissions or photo uploads.
   - Voting system for “Best cosplay” or “Top karaoke performance.”

---

## Phase 4: Marketing & Growth ⏳ PLANNED
1. **SEO Optimization** 🔄:
   - ✅ Basic meta tags and SEO structure implemented.
   - ⏳ Use keywords like "anime events Lithuania" and "otaku Lithuania."
   - ⏳ Optimize meta tags and alt text for images.
   - ⏳ Structured data markup for events.
   - ⏳ Performance optimization and Core Web Vitals.

2. **Social Media Integration**:
   - Share event announcements and recaps on Instagram, Facebook, and TikTok.
   - Embed YouTube Shorts or videos directly on the site.
   - Social sharing buttons for events and articles.

3. **Newsletter** 🔄:
   - ✅ Newsletter signup form exists on homepage.
   - ⏳ Create a monthly newsletter for upcoming events and exclusive previews.
   - ⏳ Email service integration (Resend, Mailchimp, etc.).
   - ⏳ Add a sign-up popup after event submissions or article reads.

4. **Partnerships**:
   - Collaborate with Discord servers, FB groups, and YouTube creators.
   - Offer co-branded events (e.g., karaoke nights or artist showcases).

5. **Analytics & Tracking**:
   - Google Analytics or Vercel Analytics integration.
   - Event tracking for user interactions.
   - Performance monitoring and optimization.

---

## Phase 5: Maintenance & Expansion ⏳ PLANNED
1. **Analytics**:
   - Track website visitors, event submissions, and social media engagement.
   - Use tools like Google Analytics or Vercel Analytics.

2. **Content Updates**:
   - Regularly post new articles, event recaps, and community highlights.
   - Expand the pixel map as new locations or communities emerge.

3. **Future Features**:
   - Add a merch store for otaku.lt-branded items.
   - Create a forum or discussion board for community interaction.

---

## Current Priority Tasks (Phase 2 Focus)

### High Priority 🔥
1. **Calendar Integration** - Add react-calendar to events page
2. **Form Functionality** - Make contact and submission forms work
3. **Dynamic Content** - Replace hardcoded data with manageable content
4. **Database Setup** - Choose and implement content management solution

### Medium Priority 📋
1. **Real Content Population** - Add actual community links, past events
2. **Image Management** - Real photo galleries and upload system
3. **Email Integration** - Newsletter and contact form emails
4. **Admin Interface** - Content management dashboard

### Technical Debt 🔧
1. **Form Validation** - Implement proper validation throughout
2. **Error Handling** - Add proper error states and loading states
3. **Performance** - Image optimization and loading improvements
4. **Testing** - Add unit and integration tests

---

Let me know which specific task you'd like to tackle first! The foundation is excellent and ready for Phase 2 implementation.
