"use client";
import useAssets from "@/hooks/useAssets";
import useAuth from "@/hooks/useAuth.js";
import useTemplates from "@/hooks/useTemplates";
import usePortfolios from "@/hooks/usePortfolios";
import { useSelector } from "react-redux";

export default function AuthMiddleware({ children }) {
  let { isAuthenticated } = useSelector((state) => state.user);
  let { loading } = useAuth();
  let { templates, loading: templatesLoading } = useTemplates();
  let { assets, loading: assetsLoading } = useAssets();
  let { portfolios, loading: portfoliosLoading } = usePortfolios();
  return children;
}
