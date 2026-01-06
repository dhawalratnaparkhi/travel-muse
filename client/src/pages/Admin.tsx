import type { InsertTour } from "@/shared/types";
import { useAuth } from "@/hooks/use-auth";
import { useInquiries } from "@/hooks/use-inquiries";
import { useBookings } from "@/hooks/use-bookings";
import { useTours, useCreateTour, useDeleteTour } from "@/hooks/use-tours";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTourSchema } from "@/shared/client-schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { format } from "date-fns";
import { Plus, Trash2, Loader2, Calendar } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

// Extend schema for form handling (price input as string/number handling)
const tourFormSchema = insertTourSchema.extend({
  price: z.coerce.number(),
  startDate: z.coerce.date(),
});

function CreateTourDialog() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateTour();
  
  const form = useForm({
    resolver: zodResolver(tourFormSchema),
    defaultValues: {
      title: "",
      description: "",
      destination: "",
      price: 0,
      duration: "",
      startDate: new Date(),
      imageUrl: "",
      itinerary: [],
      whatsIncluded: [],
      whatsNotIncluded: []
    }
  });

  function onSubmit(data: any) {
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-white"><Plus className="w-4 h-4 mr-2" /> Add New Tour</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Group Tour</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tour Title</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (Cents)</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (e.g. 5 Days)</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl><Input type="date" {...field} value={field.value ? format(field.value, "yyyy-MM-dd") : ""} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Unsplash)</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating..." : "Create Tour"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function Admin() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { data: inquiries } = useInquiries();
  const { data: bookings } = useBookings();
  const { data: tours } = useTours();
  const { mutate: deleteTour } = useDeleteTour();

  if (isAuthLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You do not have permission to view this page.</p>
          <Button className="mt-6" onClick={() => window.location.href = "/"}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-3xl font-bold text-primary">Admin Dashboard</h1>
          <div className="text-sm text-muted-foreground">Welcome back, {user.username}</div>
        </div>

        <Tabs defaultValue="inquiries" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-xl shadow-sm">
            <TabsTrigger value="inquiries" className="rounded-lg">Custom Inquiries</TabsTrigger>
            <TabsTrigger value="bookings" className="rounded-lg">Tour Bookings</TabsTrigger>
            <TabsTrigger value="tours" className="rounded-lg">Manage Tours</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <CardTitle>Recent Inquiries ({inquiries?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="p-4 font-medium text-gray-500">Name</th>
                        <th className="p-4 font-medium text-gray-500">Destination</th>
                        <th className="p-4 font-medium text-gray-500">Details</th>
                        <th className="p-4 font-medium text-gray-500">Contact</th>
                        <th className="p-4 font-medium text-gray-500">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries?.map((inq) => (
                        <tr key={inq.id} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="p-4 font-medium">{inq.name}</td>
                          <td className="p-4">{inq.destination}</td>
                          <td className="p-4">
                            {inq.adults} Adults, {inq.children} Kids<br/>
                            {inq.duration} Days, {inq.budget}
                          </td>
                          <td className="p-4">
                            {inq.email}<br/>{inq.phone}
                          </td>
                          <td className="p-4 text-gray-500">
                            {format(new Date(inq.createdAt), "MMM dd, yyyy")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Group Bookings ({bookings?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="p-4 font-medium text-gray-500">Customer</th>
                        <th className="p-4 font-medium text-gray-500">Tour ID</th>
                        <th className="p-4 font-medium text-gray-500">Travelers</th>
                        <th className="p-4 font-medium text-gray-500">Contact</th>
                        <th className="p-4 font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings?.map((bk) => (
                        <tr key={bk.id} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="p-4 font-medium">{bk.name}</td>
                          <td className="p-4">#{bk.tourId}</td>
                          <td className="p-4">{bk.travelers} Pax</td>
                          <td className="p-4">
                            {bk.email}<br/>{bk.phone}
                          </td>
                          <td className="p-4">
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full uppercase font-bold">
                              {bk.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tours">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Manage Group Tours</h2>
              <CreateTourDialog />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours?.map((tour) => (
                <Card key={tour.id} className="overflow-hidden">
                  <div className="h-40 bg-gray-200 relative">
                    <img src={tour.imageUrl} alt={tour.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{tour.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{tour.destination}</p>
                    <div className="flex justify-between items-center text-sm mb-4">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {format(new Date(tour.startDate), "MMM dd")}</span>
                      <span className="font-bold text-primary">${tour.price / 100}</span>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this tour?")) {
                          deleteTour(tour.id);
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
