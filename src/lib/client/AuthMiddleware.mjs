"use client";
import checkAuth from "@/hooks/useAuth.mjs";

export default function AuthMiddleware({ children }) {
    checkAuth();
  return children;
}
