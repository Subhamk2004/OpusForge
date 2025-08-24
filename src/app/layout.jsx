"use client"
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import logo from "@/assets/logo1.png";
import AuthMiddleware from "@/lib/client/AuthMiddleware.js";
import { Provider } from "react-redux";
import { store } from '@/store/index'
import Footer from "@/components/other/Footer";

// export const metadata = {
//   title: "OpusForge",
//   description: "Build your portfolio with OpusForge"
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Basic SEO */}
        <title>OpusForge - Build Your Professional Portfolio</title>
        <meta name="description" content="Create stunning professional portfolios with OpusForge. Showcase your work, skills, and achievements with our easy-to-use portfolio builder." />
        <meta name="keywords" content="portfolio builder, professional portfolio, showcase work, career portfolio, OpusForge" />
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

        <link rel="icon" href={logo.src} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FMY04M3BCN"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FMY04M3BCN');
            `,
          }}
        />
      </head>
      <body>
        <Provider store={store}>
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