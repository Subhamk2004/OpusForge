"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addTemplate } from "@/store/slices/Templates";
import { useDispatch } from "react-redux";

export default function useTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  let dispatch = useDispatch();

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const response = await fetch("/api/user/templates", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch templates");
        }
        const data = await response.json();
        dispatch(addTemplate(data));
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
