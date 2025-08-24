"use client"
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import logo from "@/assets/logo1.png";
import AuthMiddleware from "@/lib/client/AuthMiddleware.js";
import { Provider } from "react-redux";
import { store } from '@/store/index'
import Footer from "@/components/other/Footer";
import DynamicSEO from "@/components/seo/DynamicSEO";
import StructuredData from "@/components/seo/StructuredData";
import { WebVitals } from "@/components/analytics/WebVitals";
import { ResourcePreloader } from "@/components/performance/ResourcePreloader";

// export const metadata = {
//   title: "OpusForge",
//   description: "Build your portfolio with OpusForge"
// };

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style dangerouslySetInnerHTML={{
          __html: `
            .hero-section{min-height:100vh;display:flex;align-items:center}
            .navbar{position:fixed;top:0;width:100%;z-index:1000}
            body{margin:0;font-family:'Sora',sans-serif}
          `
        }} />


        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />


        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />



        {/* Basic SEO */}
        <title>OpusForge - Build Your Professional Portfolio</title>
        <meta name="description" content="Transform your professional story into stunning portfolios in minutes. AI-powered resume parsing, GitHub integration, auto-deployment, and expertly crafted templates for developers." />
        <meta name="keywords" content="portfolio builder, developer portfolio, GitHub integration, AI resume parser" />

        <meta name="author" content="OpusForge" />

        {/* Open Graph (Social Media) */}
        <meta property="og:title" content="OpusForge - Build Your Professional Portfolio" />
        <meta property="og:description" content="Create stunning professional portfolios with OpusForge. Showcase your work, skills, and achievements." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.opusforge.tech" />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="OpusForge - Build Your Professional Portfolio" />
        <meta name="twitter:description" content="Create stunning professional portfolios with OpusForge." />
        <meta name="twitter:image" content="/twitter-image.jpg" />

        <link rel="canonical" href="https://www.opusforge.tech" />

        <link rel="icon" href={logo.src} />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}

      </head>
      <body>
        <Provider store={store}>
          <DynamicSEO />
          <StructuredData />
          <WebVitals />
          <ResourcePreloader />
          <Navbar />
          <AuthMiddleware>
            {children}
          </AuthMiddleware>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}