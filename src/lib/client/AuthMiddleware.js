"use client";
import useAuth from "@/hooks/useAuth.js";
import useTemplates from "@/hooks/useTemplates";
import { useSelector } from "react-redux";

export default function AuthMiddleware({ children }) {
  let { isAuthenticated } = useSelector((state) => state.user);
  let { loading } = useAuth();
  let { templates, loading: templatesLoading } = useTemplates();
  return children;
}
