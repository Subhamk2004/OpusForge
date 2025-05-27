"use client";
import useAuth from "@/hooks/useAuth.js";
import { useSelector } from "react-redux";

export default function AuthMiddleware({ children }) {
  let { isAuthenticated } = useSelector((state) => state.user);
  // if (isAuthenticated) return children;
  let { loading } = useAuth();
  // if (loading) {
  //   return (
  //     <div className="w-screen h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
  //       <p className="text-gray-500 mt-4">Loading...</p>
  //     </div>
  //   );
  // }
  return children;
}
