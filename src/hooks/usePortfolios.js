"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setPortfolios } from "@/store/slices/Portfolios";
import { useDispatch } from "react-redux";

export default function usePortfolios() {
  const [portfolios, setPortfoliosState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  let dispatch = useDispatch();

  useEffect(() => {
    async function fetchPortfolios() {
      try {
        const response = await fetch("/api/user/portfolio", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          
        });
        if (!response.ok) {
          throw new Error("Failed to fetch portfolios");
        }
        const data = await response.json();
        console.log("Fetched portfolios:", data);
        
        dispatch(setPortfolios(data));
        setPortfoliosState(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolios();
  }, [router]);

  return { portfolios, loading, error };
}
