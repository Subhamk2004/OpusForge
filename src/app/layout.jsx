import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import logo from "@/assets/logo1.png";
import AuthMiddleware from "@/lib/client/AuthMiddleware.mjs";

export const metadata = {
  title: "OpusForge",
  description: "Build your portfolio with OpusForge"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={logo.src} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <AuthMiddleware>
          {children}
        </AuthMiddleware>
      </body>
    </html>
  );
}
