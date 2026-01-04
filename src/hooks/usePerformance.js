"use client"
import { useEffect, useState } from 'react';

export const usePerformance = () => {
  const [metrics, setMetrics] = useState({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
  });

  useEffect(() => {
    // Import web-vitals dynamically to reduce bundle size
    import('web-vitals').then(({ getCLS, getFCP, getFID, getLCP, getTTFB }) => {
      getCLS((metric) => setMetrics(prev => ({ ...prev, cls: metric.value })));
      getFCP((metric) => setMetrics(prev => ({ ...prev, fcp: metric.value })));
      getFID((metric) => setMetrics(prev => ({ ...prev, fid: metric.value })));
      getLCP((metric) => setMetrics(prev => ({ ...prev, lcp: metric.value })));
      getTTFB((metric) => setMetrics(prev => ({ ...prev, ttfb: metric.value })));
    });
  }, []);

  return metrics;
};
