"use client"
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// SEO data for different pages
const seoData = {
  '/': {
    title: 'OpusForge - One-Click Portfolio Creation for Developers & IT Professionals',
    description: 'Transform your professional story into stunning portfolios in minutes. AI-powered resume parsing, GitHub integration, auto-deployment, and expertly crafted templates for developers.',
    keywords: 'portfolio builder, developer portfolio, IT professional portfolio, GitHub integration, AI resume parser, one-click deployment, portfolio templates',
    ogTitle: 'OpusForge - One-Click Portfolio Creation',
    ogDescription: 'Transform your professional story into stunning portfolios in minutes with AI-powered tools and GitHub integration.',
  },
  '/about': {
    title: 'About OpusForge - Empowering Developer Careers',
    description: 'Learn how OpusForge revolutionizes portfolio creation for developers and IT professionals with AI-powered tools, seamless GitHub integration, and professional templates.',
    keywords: 'about OpusForge, developer tools, portfolio platform, GitHub integration, AI resume parsing',
    ogTitle: 'About OpusForge - Developer Portfolio Platform',
    ogDescription: 'Discover how OpusForge helps developers and IT professionals create stunning portfolios effortlessly.',
  },
  '/contact': {
    title: 'Contact OpusForge - Get Support & Assistance',
    description: 'Need help with your portfolio? Contact the OpusForge team for support with GitHub integration, deployment, templates, or general assistance.',
    keywords: 'contact OpusForge, portfolio support, GitHub integration help, deployment assistance, technical support',
    ogTitle: 'Contact OpusForge Support',
    ogDescription: 'Get expert help with your developer portfolio creation and deployment.',
  },
  '/demo': {
    title: 'Live Demo - OpusForge Portfolio Builder',
    description: 'Experience OpusForge in action! Try our live demo to see how quickly you can create professional portfolios with AI-powered resume parsing and real-time editing.',
    keywords: 'OpusForge demo, portfolio builder demo, live preview, portfolio creation demo, developer portfolio demo',
    ogTitle: 'OpusForge Live Demo',
    ogDescription: 'Try OpusForge now! See how easy it is to create stunning developer portfolios in minutes.',
  },
  '/features': {
    title: 'Features - OpusForge Portfolio Builder',
    description: 'Discover OpusForge features: One-click creation, GitHub integration, AI resume parsing, auto-deployment, centralized asset management, and live preview editing.',
    keywords: 'OpusForge features, GitHub integration, AI resume parser, auto deployment, portfolio templates, asset management',
    ogTitle: 'OpusForge Features - Complete Portfolio Solution',
    ogDescription: 'Explore all the powerful features that make OpusForge the best choice for developer portfolios.',
  },
  '/signin': {
    title: 'Sign In - OpusForge Portfolio Builder',
    description: 'Sign in to OpusForge to access your portfolio dashboard, manage templates, deploy to GitHub, and organize your professional assets.',
    keywords: 'OpusForge login, sign in, portfolio access, GitHub OAuth, developer login',
    ogTitle: 'Sign In to OpusForge',
    ogDescription: 'Access your OpusForge dashboard to manage and deploy your professional portfolio.',
  },
  '/privacy': {
    title: 'Privacy Policy - OpusForge',
    description: 'Learn how OpusForge protects your data, handles GitHub integration, manages uploaded assets, and ensures your privacy while building portfolios.',
    keywords: 'OpusForge privacy policy, data protection, GitHub integration privacy, asset security',
    ogTitle: 'OpusForge Privacy Policy',
    ogDescription: 'Understanding how we protect your data and ensure privacy in portfolio creation.',
  },
  '/terms': {
    title: 'Terms of Service - OpusForge',
    description: 'Read OpusForge terms of service covering portfolio creation, GitHub integration, asset management, deployment services, and platform usage.',
    keywords: 'OpusForge terms of service, usage terms, GitHub integration terms, portfolio platform terms',
    ogTitle: 'OpusForge Terms of Service',
    ogDescription: 'Terms and conditions for using OpusForge portfolio creation platform.',
  },
  '/user': {
    title: 'Dashboard - OpusForge Portfolio Management',
    description: 'Manage your portfolios, templates, assets, and GitHub deployments from your OpusForge dashboard. Track portfolio performance and organize career materials.',
    keywords: 'OpusForge dashboard, portfolio management, template editor, asset manager, GitHub deployment',
    ogTitle: 'OpusForge Dashboard',
    ogDescription: 'Your central hub for managing portfolios, templates, and professional assets.',
  },
  '/user/profile': {
    title: 'Profile Management - OpusForge',
    description: 'Manage your OpusForge profile, update personal information, configure GitHub integration, and customize your portfolio preferences.',
    keywords: 'OpusForge profile, user profile, GitHub integration, profile settings, portfolio preferences',
    ogTitle: 'Manage Your OpusForge Profile',
    ogDescription: 'Update your profile settings and configure your portfolio preferences.',
  },
  '/user/templates': {
    title: 'Portfolio Templates - OpusForge',
    description: 'Browse and customize professional portfolio templates designed for developers and IT professionals. Create custom templates or use AI-powered generation.',
    keywords: 'portfolio templates, developer templates, IT professional templates, custom templates, AI template generation',
    ogTitle: 'OpusForge Portfolio Templates',
    ogDescription: 'Professional templates designed specifically for developers and IT professionals.',
  },
  '/user/assets': {
    title: 'Asset Management - OpusForge',
    description: 'Manage your professional assets including resumes, certificates, cover letters, and project files. Centralized storage with Cloudinary integration.',
    keywords: 'asset management, resume storage, certificate storage, professional documents, Cloudinary integration',
    ogTitle: 'OpusForge Asset Management',
    ogDescription: 'Organize and manage all your professional assets in one secure location.',
  },
  // ADD THESE TO YOUR seoData object in DynamicSEO.js

  '/user/templates/viewTemplate': {
    title: 'Portfolio Builder & Template Editor - OpusForge | Create Developer Portfolios',
    description: 'Live portfolio builder and template editor. Create stunning developer portfolios with real-time preview, drag-and-drop editing, mobile-responsive design, and one-click GitHub deployment.',
    keywords: 'portfolio builder, template editor, developer portfolio maker, live preview editor, portfolio creator, GitHub portfolio, responsive portfolio builder, portfolio template customizer, developer showcase builder',
    ogTitle: 'Live Portfolio Builder - Create Your Developer Portfolio Now',
    ogDescription: 'Build professional developer portfolios with our live template editor. Real-time preview, mobile-responsive, GitHub deployment ready.',
  },

  '/user/templates/addTemplate': {
    title: 'Create Custom Portfolio Template - OpusForge Template Builder',
    description: 'Design custom portfolio templates from scratch. Advanced template builder for developers with code editor, live preview, responsive design tools, and template sharing.',
    keywords: 'custom portfolio template, template builder, portfolio template creator, custom developer template, template designer, portfolio theme builder',
    ogTitle: 'Custom Portfolio Template Builder',
    ogDescription: 'Create unique portfolio templates from scratch with our advanced template builder.',
  },

  '/user/templates/aiTemplate': {
    title: 'AI Portfolio Generator - Auto-Create Developer Portfolios | OpusForge',
    description: 'Generate professional portfolios instantly with AI. Upload your resume and let our AI create optimized portfolio templates tailored for developers and IT professionals.',
    keywords: 'AI portfolio generator, AI portfolio builder, automated portfolio creation, AI resume to portfolio, machine learning portfolio, AI developer portfolio, smart portfolio generator',
    ogTitle: 'AI-Powered Portfolio Generator',
    ogDescription: 'Let AI create your perfect developer portfolio from your resume in minutes.',
  },

  '/user/profile/completeProfile': {
    title: 'Complete Your Developer Profile - OpusForge Setup',
    description: 'Complete your developer profile setup. Add GitHub integration, upload professional assets, configure deployment settings, and customize your portfolio preferences.',
    keywords: 'developer profile setup, GitHub integration setup, portfolio profile, developer onboarding, portfolio configuration, professional profile completion',
    ogTitle: 'Complete Your Developer Profile',
    ogDescription: 'Set up your developer profile and configure GitHub integration for seamless portfolio deployment.',
  }
  // Add more pages as needed
};

export default function DynamicSEO() {
  const pathname = usePathname();

  useEffect(() => {
    // Get SEO data for current page, fallback to home page data
    const currentSEO = seoData[pathname] || seoData['/'];

    // Update document title
    document.title = currentSEO.title;

    // Update meta description
    updateMetaTag('description', currentSEO.description);
    updateMetaTag('keywords', currentSEO.keywords);

    // Update Open Graph tags
    updateMetaTag('og:title', currentSEO.ogTitle, 'property');
    updateMetaTag('og:description', currentSEO.ogDescription, 'property');
    updateMetaTag('og:url', `https://www.opusforge.tech${pathname}`, 'property');

    // Update Twitter Card tags
    updateMetaTag('twitter:title', currentSEO.ogTitle);
    updateMetaTag('twitter:description', currentSEO.ogDescription);

    // Update canonical URL
    updateCanonicalUrl(`https://www.opusforge.tech${pathname}`);

  }, [pathname]);

  return null; // This component doesn't render anything
}

// Helper function to update meta tags
function updateMetaTag(name, content, attribute = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);

  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
}

// Helper function to update canonical URL
function updateCanonicalUrl(url) {
  let canonical = document.querySelector('link[rel="canonical"]');

  if (canonical) {
    canonical.setAttribute('href', url);
  } else {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', url);
    document.head.appendChild(canonical);
  }
}