export const generateSearchConsoleVerification = () => {
  // Add your Google Search Console verification meta tag
  return {
    'google-site-verification': 'your-google-search-console-verification-code',
    'bing-site-verification': 'your-bing-webmaster-verification-code',
    'yandex-verification': 'your-yandex-verification-code',
  };
};

// Schema for better search understanding
export const generateBreadcrumbSchema = (pathname) => {
  const baseUrl = 'https://www.opusforge.tech';
  const pathParts = pathname.split('/').filter(Boolean);
  
  if (pathParts.length === 0) return null;
  
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    }
  ];
  
  let currentPath = baseUrl;
  pathParts.forEach((part, index) => {
    currentPath += `/${part}`;
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": part.charAt(0).toUpperCase() + part.slice(1),
      "item": currentPath
    });
  });
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };
};