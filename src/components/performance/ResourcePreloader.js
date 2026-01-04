"use client"
import { useEffect } from 'react';

export const ResourcePreloader = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = [
      { href: '/assets/hero1.png', as: 'image' },
      { href: '/assets/logo1.png', as: 'image' },
      { href: 'https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap', as: 'style' },
    ];

    preloadResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.as === 'image') {
        link.type = 'image/png';
      }
      document.head.appendChild(link);
    });

    // Prefetch important pages
    const prefetchPages = ['/user', '/features', '/contact'];
    prefetchPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  }, []);

  return null;
};
