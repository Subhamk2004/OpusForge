"use client";
import checkAuth from "@/hooks/checkAuth.mjs";

export default function AuthMiddleware({ children }) {
    checkAuth();
  return children;
}
