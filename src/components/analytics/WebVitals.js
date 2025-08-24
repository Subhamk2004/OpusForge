"use client"
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Only send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      // Send to Google Analytics
      const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
      if (GA_MEASUREMENT_ID && window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }

      // Console log for debugging (remove in production)
      // console.log('Web Vital:', {
      //   name: metric.name,
      //   value: metric.value,
      //   rating: metric.rating,
      //   delta: metric.delta,
      //   id: metric.id,
      // });
    }
  });

  return null;
}