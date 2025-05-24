"use client";
import useAuth from "@/hooks/useAuth.js";

export default function AuthMiddleware({ children }) {
    useAuth();
  return children;
}
