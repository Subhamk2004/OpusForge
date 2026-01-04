export const getOptimizedImageProps = (src, alt, priority = false) => ({
  src,
  alt,
  priority,
  quality: 85,
  placeholder: 'blur',
  blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+pX7Dw==',
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
});

// Dynamic import helper for code splitting
export const loadComponentAsync = (componentPath) => {
  return dynamic(() => import(componentPath), {
    loading: () => <div className="animate-pulse bg-gray-200 h-8 w-full rounded"></div>,
    ssr: false,
  });
};

// Font preload helper
export const preloadFonts = () => {
  const fonts = [
    '/fonts/Sora-Regular.ttf',
    '/fonts/Sora-Bold.ttf',
  ];
  
  fonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font;
    link.as = 'font';
    link.type = 'font/ttf';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};