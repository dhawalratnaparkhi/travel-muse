import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type Tour } from "@shared/routes";
import type { InsertTour } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useTours() {
  return useQuery({
    queryKey: [api.tours.list.path],
    queryFn: async () => {
      const res = await fetch(api.tours.list.path);
      if (!res.ok) throw new Error("Failed to fetch tours");
      return api.tours.list.responses[200].parse(await res.json());
    },
  });
}

export function useTour(id: number) {
  return useQuery({
    queryKey: [api.tours.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.tours.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch tour");
      return api.tours.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateTour() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertTour) => {
      const res = await fetch(api.tours.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        const error = await res.json();
        throw new Error(error.message || "Failed to create tour");
      }
      return api.tours.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.tours.list.path] });
      toast({ title: "Success", description: "Tour created successfully" });
    },
    onError: (err) => {
      toast({ 
        title: "Error", 
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "destructive"
      });
    }
  });
}

export function useDeleteTour() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.tours.delete.path, { id });
      const res = await fetch(url, { 
        method: "DELETE",
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to delete tour");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.tours.list.path] });
      toast({ title: "Success", description: "Tour deleted" });
    },
  });
}
