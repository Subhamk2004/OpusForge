export default function robots() {
  const baseUrl = 'https://www.opusforge.tech';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/', // Allow main site
          '/_next/static/', // Allow Next.js static JS/CSS
          '/_next/image',   // Allow images served by next/image
        ],
        disallow: [
          '/api/',                 // Hide API endpoints
          '/user/profile/edit',    // Private user data
          '/user/assets',          // Optional: if you want to protect assets
          '/confidential/',        // Sensitive files
        ],
      },
      {
        userAgent: 'GPTBot', // OpenAI's web crawler
        disallow: '/user/',  // Protect user data from AI training
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/user/',
      },
      {
        userAgent: 'CCBot', // Common Crawl
        disallow: '/user/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/user/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/user/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
