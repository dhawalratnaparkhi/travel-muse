import type { InsertTour } from "@/shared/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { routes } from "@/shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useInquiries() {
  return useQuery({
    queryKey: [api.inquiries.list.path],
    queryFn: async () => {
      const res = await fetch(api.inquiries.list.path, { credentials: "include" });
      if (res.status === 401) throw new Error("Unauthorized");
      if (!res.ok) throw new Error("Failed to fetch inquiries");
      return api.inquiries.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateInquiry() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const res = await fetch(api.inquiries.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit inquiry");
      }
      return api.inquiries.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({ 
        title: "Inquiry Sent!", 
        description: "We'll get back to you shortly with a custom plan." 
      });
    },
    onError: (err) => {
      toast({ 
        title: "Submission Failed", 
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive"
      });
    }
  });
}
