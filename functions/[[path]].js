// This function handles subdomain routing in production
// It runs on Cloudflare Pages and handles requests before they reach the static files

export async function onRequest(context) {
  // Get the request URL
  const url = new URL(context.request.url);
  const hostname = url.hostname;
  const path = url.pathname;
  
  // Handle korniha.otaku.lt subdomain
  if (hostname === 'korniha.otaku.lt' || hostname.endsWith('.korniha.otaku.lt')) {
    return context.rewrite(`/korniha-band${path}`);
  }
  
  // Handle yurucamp.otaku.lt subdomain
  if (hostname === 'yurucamp.otaku.lt' || hostname.endsWith('.yurucamp.otaku.lt')) {
    return context.rewrite(`/yurucamp${path}`);
  }
  
  // For all other requests, continue with normal routing
  return context.next();
}
