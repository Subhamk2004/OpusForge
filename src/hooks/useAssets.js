"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAsset } from "@/store/slices/Assets";

export default function useAssets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAssets() {
      try {
        const response = await fetch("/api/assets/fetch", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch assets");
        }
        const data = await response.json();
        console.log("Assets data is ", data);

        dispatch(addAsset(data));
        setAssets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAssets();
  }, [router]);

  return { assets, loading, error };
}
