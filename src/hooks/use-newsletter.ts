import { useMutation } from "@tanstack/react-query";
import { subscribeToNewsletter } from "@/lib/landingPageService";
import { useToast } from "@/hooks/use-toast";

export const useNewsletterSubscription = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ email, source }: { email: string; source?: string }) =>
      subscribeToNewsletter(email, source),
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Success!",
          description: data.message,
        });
      } else {
        toast({
          title: "Already Subscribed",
          description: data.message,
          variant: "default",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    },
  });
};

