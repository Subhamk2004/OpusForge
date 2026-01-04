"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useDemo() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const response = await fetch("/api/user/templates?isDemo=true", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch templates");
        }
        const data = await response.json();
        // console.log("Fetched templates:", data);
        setTemplates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, [router]);

  return { templates, loading, error };
}
