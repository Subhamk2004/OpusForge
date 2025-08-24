"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const StructuredData = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Remove existing structured data
    const existingScripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    existingScripts.forEach((script) => script.remove());

    // Get structured data based on current page
    const structuredData = getStructuredDataForPage(pathname);

    if (structuredData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(structuredData, null, 2);
      document.head.appendChild(script);
    }
  }, [pathname]);

  return null;
};

function getStructuredDataForPage(pathname) {
  const baseUrl = "https://www.opusforge.tech";

  // Base organization data (appears on all pages)
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "OpusForge",
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Portfolio Builder",
    operatingSystem: "Web Browser",
    url: baseUrl,
    logo: `${baseUrl}/assets/logo1.png`,
    description:
      "AI-powered portfolio builder for developers and IT professionals with GitHub integration and one-click deployment",
    author: {
      "@type": "Organization",
      name: "OpusForge",
      url: baseUrl,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "AI-powered resume parsing",
      "GitHub integration",
      "One-click deployment",
      "Professional templates",
      "Real-time editing",
      "Mobile-responsive design",
      "Asset management",
      "Live preview",
      "No code portfolio creation",
      "Automatic updates",
      "Easy",
      "Time saving"
    ],
    screenshot: `${baseUrl}/assets/hero1.png`,
    softwareVersion: "1.0",
    downloadUrl: baseUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
    },
  };

  // Page-specific structured data
  switch (pathname) {
    case "/":
      return {
        "@context": "https://schema.org",
        "@graph": [
          organizationData,
          {
            "@type": "WebSite",
            name: "OpusForge",
            url: baseUrl,
            description:
              "One-click portfolio creation for developers and IT professionals",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${baseUrl}/search?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@type": "Service",
            name: "Portfolio Creation Service",
            description:
              "Professional portfolio creation with AI-powered tools",
            provider: {
              "@type": "Organization",
              name: "OpusForge",
            },
            areaServed: "Worldwide",
            audience: {
              "@type": "Audience",
              audienceType: "Developers and IT Professionals",
            },
          },
        ],
      };

    case "/features":
      return {
        "@context": "https://schema.org",
        "@graph": [
          organizationData,
          {
            "@type": "ItemList",
            name: "OpusForge Features",
            description:
              "Complete list of OpusForge portfolio builder features",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "One-Click Portfolio Creation",
                description:
                  "Transform your professional story into stunning portfolios in minutes",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "GitHub Integration & Auto-Deployment",
                description:
                  "Seamless GitHub OAuth, repository creation, and instant deployment",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "AI-Powered Resume Parsing",
                description:
                  "Automatic extraction and filling of portfolio details from resumes",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Live Preview & Real-Time Editing",
                description:
                  "Instant visual feedback with mobile-responsive previews",
              },
              {
                "@type": "ListItem",
                position: 5,
                name: "Centralized Asset Management",
                description:
                  "Secure storage and organization of professional materials",
              },
            ],
          },
        ],
      };

    case "/user/templates/viewTemplate":
      return {
        "@context": "https://schema.org",
        "@graph": [
          organizationData,
          {
            "@type": "CreativeWork",
            name: "Portfolio Template Editor",
            description:
              "Live portfolio builder and template editor with real-time preview",
            creator: {
              "@type": "Organization",
              name: "OpusForge",
            },
            about: {
              "@type": "Thing",
              name: "Portfolio Creation",
            },
            audience: {
              "@type": "Audience",
              audienceType: "Software Developers",
            },
          },
          {
            "@type": "WebApplication",
            name: "Portfolio Builder",
            applicationCategory: "DesignApplication",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            description:
              "Interactive portfolio builder with drag-and-drop editing and live preview",
            featureList: [
              "Real-time preview",
              "Responsive design",
              "Template customization",
              "GitHub deployment",
              "Asset integration",
            ],
          },
        ],
      };

    case "/user/templates/aiTemplate":
      return {
        "@context": "https://schema.org",
        "@graph": [
          organizationData,
          {
            "@type": "SoftwareApplication",
            name: "AI Portfolio Generator",
            applicationCategory: "DesignApplication",
            description: "AI-powered portfolio generation from resume data",
            featureList: [
              "Resume parsing with AI",
              "Automatic template generation",
              "Smart content optimization",
              "Professional layout suggestions",
            ],
            softwareHelp: {
              "@type": "CreativeWork",
              name: "AI Portfolio Generation Guide",
              description:
                "How to use AI to create professional portfolios from resumes",
            },
          },
        ],
      };

    case "/about":
      return {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        mainEntity: organizationData,
        description:
          "Learn about OpusForge and our mission to revolutionize portfolio creation for developers",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".about-description"],
        },
      };

    case "/contact":
      return {
        "@context": "https://schema.org",
        "@graph": [
          organizationData,
          {
            "@type": "ContactPage",
            mainEntity: {
              "@type": "Organization",
              name: "OpusForge",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                availableLanguage: "English",
                areaServed: "Worldwide",
              },
            },
          },
        ],
      };

    case "/demo":
      return {
        "@context": "https://schema.org",
        "@graph": [
          organizationData,
          {
            "@type": "VideoObject",
            name: "OpusForge Live Demo",
            description:
              "Interactive demonstration of OpusForge portfolio builder",
            thumbnailUrl: `${baseUrl}/assets/hero1.png`,
            uploadDate: "2024-01-01",
            duration: "PT5M",
            embedUrl: `${baseUrl}/demo`,
            interactionCount: "500",
          },
        ],
      };

    default:
      return organizationData;
  }
}

export default StructuredData;
