# Landing Page Backend Setup

This document describes the backend infrastructure for the TechKnots landing page.

## Overview

The landing page backend uses **Firebase Firestore** for data storage and retrieval. All data is fetched dynamically from Firestore collections.

## Firestore Collections

### 1. `landingStats` (Document: `current`)
Stores the landing page statistics:
```typescript
{
  activeLearners: number;
  courses: number;
  codingChallenges: number;
  expertInstructors: number;
  lastUpdated: Timestamp;
}
```

### 2. `testimonials` (Collection)
Stores user testimonials:
```typescript
{
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  featured?: boolean;
  approved?: boolean;
  createdAt: Timestamp;
}
```

### 3. `newsletterSubscriptions` (Collection)
Stores newsletter email subscriptions:
```typescript
{
  email: string;
  source?: string;
  subscribedAt: Timestamp;
}
```

### 4. `contactSubmissions` (Collection)
Stores contact form submissions:
```typescript
{
  name: string;
  email: string;
  message: string;
  subject?: string;
  submittedAt: Timestamp;
}
```

### 5. `analytics` (Collection)
Tracks landing page analytics:
```typescript
{
  event: string; // "landing_page_view" | "cta_click"
  ctaType?: string;
  timestamp: Timestamp;
  path: string;
  userAgent?: string;
}
```

## Setup Instructions

### 1. Firebase Firestore Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database**
4. Create the following collections and documents:

#### Create `landingStats` Collection
- Create a document with ID: `current`
- Add fields:
  - `activeLearners` (number): 10000
  - `courses` (number): 500
  - `codingChallenges` (number): 1000
  - `expertInstructors` (number): 50
  - `lastUpdated` (timestamp): Current time

#### Create `testimonials` Collection
- Add documents with the following fields:
  - `name` (string)
  - `role` (string)
  - `image` (string) - URL to profile image
  - `content` (string)
  - `rating` (number) - 1-5
  - `featured` (boolean) - Set to `true` for one testimonial
  - `approved` (boolean) - Set to `true` for all visible testimonials
  - `createdAt` (timestamp)

#### Firestore Security Rules

Add these rules to your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Landing stats - read only for all
    match /landingStats/{document} {
      allow read: if true;
      allow write: if false; // Only admins via admin panel
    }
    
    // Testimonials - read approved only, write requires auth
    match /testimonials/{testimonialId} {
      allow read: if resource.data.approved == true;
      allow write: if request.auth != null;
    }
    
    // Newsletter - anyone can write, read requires auth
    match /newsletterSubscriptions/{subscriptionId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if false;
    }
    
    // Contact submissions - anyone can write, read requires auth
    match /contactSubmissions/{submissionId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if false;
    }
    
    // Analytics - anyone can write, read requires auth
    match /analytics/{analyticsId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if false;
    }
  }
}
```

## API Services

### `landingPageService.ts`

Provides the following functions:

- `getLandingStats()` - Fetches current statistics
- `getTestimonials()` - Fetches all approved testimonials
- `getFeaturedTestimonial()` - Fetches the featured testimonial
- `subscribeToNewsletter(email, source)` - Subscribes email to newsletter
- `submitContactForm(data)` - Submits contact form
- `trackLandingPageView()` - Tracks page view analytics
- `trackCTAClick(ctaType)` - Tracks CTA button clicks

## React Hooks

### `useLandingStats()`
Fetches and caches landing page statistics with React Query.

### `useTestimonials()`
Fetches and caches all approved testimonials.

### `useFeaturedTestimonial()`
Fetches the featured testimonial.

### `useNewsletterSubscription()`
Mutation hook for subscribing to newsletter with toast notifications.

## Usage Example

```typescript
import { useLandingStats } from "@/hooks/use-landing-stats";
import { useTestimonials } from "@/hooks/use-testimonials";

function MyComponent() {
  const { data: stats, isLoading } = useLandingStats();
  const { data: testimonials } = useTestimonials();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <p>Active Learners: {stats?.activeLearners}</p>
      <p>Testimonials: {testimonials?.length}</p>
    </div>
  );
}
```

## Fallback Data

If Firestore is unavailable or returns no data, the components will use fallback hardcoded data to ensure the page always renders correctly.

## Updating Statistics

To update landing page statistics, modify the `current` document in the `landingStats` collection in Firestore. The changes will be reflected on the landing page within 5 minutes (cache time).

## Admin Panel Integration

For managing testimonials and viewing analytics, integrate with the existing admin dashboard at `/admin-dashboard`.

