import { useQuery } from "@tanstack/react-query";
import { getLandingStats, type LandingStats } from "@/lib/landingPageService";

export const useLandingStats = () => {
  return useQuery<LandingStats | null>({
    queryKey: ["landingStats"],
    queryFn: getLandingStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

