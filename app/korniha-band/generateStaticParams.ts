// This file is used to generate static params for the korniha-band page
// It's separated from the page component to avoid conflicts with 'use client' directive

export function generateStaticParams() {
  // Return an array of all the paths you want to pre-render
  return [
    { slug: ['korniha-band'] },
  ];
}
