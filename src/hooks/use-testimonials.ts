import { useQuery } from "@tanstack/react-query";
import { getTestimonials, getFeaturedTestimonial, type Testimonial } from "@/lib/landingPageService";

export const useTestimonials = () => {
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useFeaturedTestimonial = () => {
  return useQuery<Testimonial | null>({
    queryKey: ["featuredTestimonial"],
    queryFn: getFeaturedTestimonial,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

