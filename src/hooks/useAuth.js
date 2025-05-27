"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/slices/User";

export default function useAuth() {
  let [loading, setLoading] = useState(false);
  const router = useRouter();
  let pathname = usePathname();
  let dispatch = useDispatch();
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
        setLoading(true);
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
        // console.log("Authentication status:", data);
        if (!data.isLoggedIn) {
          if (pathname.includes("/user")) {
            router.push("/login");
          }
        } else {
          dispatch(loginUser(data.userData));
          if (!pathname.includes("/user")) {
            router.push("/user");
          }
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        if (pathname.includes("/user")) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    }
    checkAuthIn();
  }, [router, pathname]);

  return { loading };
}
