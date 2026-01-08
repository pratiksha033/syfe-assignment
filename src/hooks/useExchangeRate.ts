"use client";

import { useEffect, useState } from "react";

const API_URL = "https://open.er-api.com/v6/latest/USD";

export function useExchangeRate() {
  const [rate, setRate] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRate = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(API_URL);
      const data = await res.json();
      setRate(data.rates.INR);
      setLastUpdated(new Date().toLocaleString());
    } catch {
      setError("Failed to fetch exchange rate");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRate();
  }, []);

  return { rate, lastUpdated, loading, error, fetchRate };
}
