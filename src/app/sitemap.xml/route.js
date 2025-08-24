const baseUrl = 'https://www.opusforge.tech';
const currentDate = new Date().toISOString();

const staticPages = [
  { url: baseUrl, changeFrequency: 'weekly', priority: 1.0 },
  { url: `${baseUrl}/features`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${baseUrl}/demo`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${baseUrl}/contact`, changeFrequency: 'yearly', priority: 0.6 },
  { url: `${baseUrl}/signin`, changeFrequency: 'yearly', priority: 0.5 },
  { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.4 },
  { url: `${baseUrl}/terms`, changeFrequency: 'yearly', priority: 0.4 },
  { url: `${baseUrl}/user`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${baseUrl}/user/templates`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${baseUrl}/user/templates/viewTemplate`, changeFrequency: 'daily', priority: 0.95 },
  { url: `${baseUrl}/user/templates/aiTemplate`, changeFrequency: 'weekly', priority: 0.85 },
  { url: `${baseUrl}/user/templates/addTemplate`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${baseUrl}/user/profile`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${baseUrl}/user/assets`, changeFrequency: 'weekly', priority: 0.7 },
];

// Export a single GET function — this is required by Next.js App Router
export async function GET() {
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `<url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
