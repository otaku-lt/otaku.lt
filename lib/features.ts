import React, { ReactNode } from 'react';

// Define feature flags
const features = {
  // Enable event calendar features in production
  eventCalendar: true,
  // Upcoming events section (disabled in production)
  upcomingEvents: process.env.NODE_ENV !== 'production',
  // Add more feature flags here as needed
} as const;

type FeatureName = keyof typeof features;

// Check if a feature is enabled
export function isFeatureEnabled(feature: FeatureName): boolean {
  return features[feature] === true;
}

// FeatureFlag component for conditional rendering
interface FeatureFlagProps {
  name: FeatureName;
  children: ReactNode;
  fallback?: ReactNode;
}

export function FeatureFlag({ name, children, fallback = null }: FeatureFlagProps): ReactNode {
  return isFeatureEnabled(name) ? children : fallback;
}
