export default function sitemap() {
  const baseUrl = 'https://www.opusforge.tech';
  const currentDate = new Date().toISOString();

  // Static pages with their priorities and change frequencies
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/signin`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    // User dashboard pages (for logged-in users - helps with SEO discovery)
    {
      url: `${baseUrl}/user`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/user/templates`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9, // High priority - this is where users create portfolios
    },
    {
      url: `${baseUrl}/user/templates/viewTemplate`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95, // Highest priority - main portfolio builder
    },
    {
      url: `${baseUrl}/user/templates/aiTemplate`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85, // AI template generator
    },
    {
      url: `${baseUrl}/user/templates/addTemplate`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/user/profile`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/user/assets`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  return staticPages;
}