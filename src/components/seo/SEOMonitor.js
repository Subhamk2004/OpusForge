"use client"
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const SEOMonitor = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Log page views for SEO monitoring
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: pathname,
        page_title: document.title,
      });

      // Track important SEO events
      if (pathname === '/user/templates/viewTemplate') {
        window.gtag('event', 'portfolio_builder_access', {
          event_category: 'SEO',
          event_label: 'High Priority Page Visit',
        });
      }
    }
  }, [pathname]);

  return null;
};
