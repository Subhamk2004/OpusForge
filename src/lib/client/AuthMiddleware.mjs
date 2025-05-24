"use client";
import useAuth from "@/hooks/useAuth.mjs";

export default function AuthMiddleware({ children }) {
    useAuth();
  return children;
}
