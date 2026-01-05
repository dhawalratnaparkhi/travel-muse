import { useQuery, useMutation } from "@tanstack/react-query";
import { api, type Booking } from "@shared/routes";
import type { InsertBooking } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useBookings() {
  return useQuery({
    queryKey: [api.bookings.list.path],
    queryFn: async () => {
      const res = await fetch(api.bookings.list.path, { credentials: "include" });
      if (res.status === 401) throw new Error("Unauthorized");
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return api.bookings.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateBooking() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertBooking) => {
      const res = await fetch(api.bookings.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to book tour");
      }
      return api.bookings.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({ 
        title: "Booking Request Sent!", 
        description: "Check your email for confirmation details." 
      });
    },
    onError: (err) => {
      toast({ 
        title: "Booking Failed", 
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive"
      });
    }
  });
}
