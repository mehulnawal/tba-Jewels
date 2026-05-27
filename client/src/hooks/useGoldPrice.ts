import { useQuery } from "@tanstack/react-query";
import { GOLD_API } from "../constants/assets";
import { GoldRates } from "../types";

export function useGoldPrice() {
  return useQuery<GoldRates>({
    queryKey: ["goldPrice"],
    queryFn: async () => {
      const response = await fetch(GOLD_API.endpoint);
      // This is now safe — server will never return 304 again
      if (!response.ok) {
        throw new Error(`Gold API error: ${response.status}`);
      }
      return response.json();
    },
    staleTime: 0,
    refetchInterval: GOLD_API.refetchMs,
    retry: 2,
    retryDelay: 3000,
  });
}
