/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

// Extend the NodeJS namespace with our custom environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_APP_URL: string;
    // Add other environment variables here as needed
  }
}

// This is a workaround for the `env` import in our config files
declare module '@/env' {
  export const env: {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_APP_URL: string;
    // Add other environment variables here as needed
  };
}
