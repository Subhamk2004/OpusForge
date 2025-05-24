"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function checkAuth() {
  const router = useRouter();
  let pathname = usePathname();
  const publicUrls = [
    "/",
    "/login",
    "/features",
    "/about",
    "/contact",
    "/signup",
  ];
  const authenticatedUrls = ["/user", "/dashboard", "/settings"];
  useEffect(() => {
    async function checkAuthIn() {
      try {
        const response = await fetch("/api/auth/loginStatus", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Not authenticated");
        }
        const data = await response.json();
        console.log("Authentication status:", data);
        if (!data.isLoggedIn) {
          if (pathname.includes("/user")) {
            router.push("/login");
          }
        } else {
            if(!pathname.includes("/user")){
                router.push("/user");
            }
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        if (pathname.includes("/user")) {
          router.push("/login");
        }
      }
    }
    checkAuthIn();
  }, [router, pathname]);
}
