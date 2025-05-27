"use client"
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import logo from "@/assets/logo1.png";
import AuthMiddleware from "@/lib/client/AuthMiddleware.js";
import { Provider } from "react-redux";
import { store } from '@/store/index'

// export const metadata = {
//   title: "OpusForge",
//   description: "Build your portfolio with OpusForge"
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>OpusForge</title>
        <link rel="icon" href={logo.src} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Provider store={store}>
          <Navbar />
          <AuthMiddleware>
            {children}
          </AuthMiddleware>
        </Provider>
      </body>
    </html>
  );
}
