"use client";
import useAssets from "@/hooks/useAssets";
import useAuth from "@/hooks/useAuth.js";
import useTemplates from "@/hooks/useTemplates";
import { useSelector } from "react-redux";

export default function AuthMiddleware({ children }) {
  let { isAuthenticated } = useSelector((state) => state.user);
  useAuth();
  useTemplates();
  useAssets();
  return children;
}
