import { useParams } from "wouter";
import { useTour } from "@/hooks/use-tours";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema } from "@shared/schema";
import { useCreateBooking } from "@/hooks/use-bookings";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Check, X, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { z } from "zod";

const formSchema = insertBookingSchema.extend({
  travelers: z.coerce.number().min(1, "At least 1 traveler required"),
});

export default function GroupTourDetails() {
  const { id } = useParams();
  const { data: tour, isLoading } = useTour(Number(id));
  const { mutate, isPending } = useCreateBooking();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tourId: Number(id),
      name: "",
      email: "",
      phone: "",
      travelers: 1,
      message: "",
    },
  });

  function onSubmit(data: any) {
    mutate({ ...data, tourId: Number(id) }, {
      onSuccess: () => form.reset()
    });
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-primary"><Loader2 className="animate-spin w-12 h-12" /></div>;
  }

  if (!tour) {
    return <div className="min-h-screen flex items-center justify-center">Tour not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[60vh]">
        <img src={tour.imageUrl} alt={tour.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12 text-white">
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="bg-secondary text-primary font-bold px-3 py-1 rounded-full text-sm">
              Group Tour
            </span>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {format(new Date(tour.startDate), "MMMM dd, yyyy")}
            </span>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" /> {tour.duration}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">{tour.title}</h1>
          <div className="flex items-center gap-2 text-xl opacity-90">
            <MapPin className="w-5 h-5 text-secondary" /> {tour.destination}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary mb-6">About this Trip</h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {tour.description}
              </p>
            </div>

            {/* Itinerary */}
            {tour.itinerary && Array.isArray(tour.itinerary) && tour.itinerary.length > 0 && (
              <div>
                <h2 className="font-display text-3xl font-bold text-primary mb-8">Itinerary</h2>
                <div className="space-y-8 border-l-2 border-primary/10 ml-3 pl-8 relative">
                  {tour.itinerary.map((day: any, idx: number) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-secondary border-4 border-white shadow-sm" />
                      <h4 className="font-bold text-xl text-primary mb-2">Day {day.day}: {day.title}</h4>
                      <p className="text-muted-foreground">{day.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {/* Included */}
              <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                <h3 className="font-bold text-xl mb-4 text-green-800">What's Included</h3>
                <ul className="space-y-3">
                  {tour.whatsIncluded?.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not Included */}
              <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                <h3 className="font-bold text-xl mb-4 text-red-800">What's Not Included</h3>
                <ul className="space-y-3">
                  {tour.whatsNotIncluded?.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6 shadow-xl border-t-4 border-t-secondary">
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Price per person</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold text-primary">${tour.price / 100}</span>
                    <span className="text-gray-500">USD</span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold mb-4">Book Your Spot</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 234 567 8900" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="travelers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Travelers</FormLabel>
                          <FormControl>
                            <Input type="number" min={1} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Requests</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Dietary restrictions, allergies, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-secondary text-primary font-bold hover:bg-secondary/90 text-lg h-12"
                      disabled={isPending}
                    >
                      {isPending ? "Sending..." : "Request Booking"}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      No payment required now. We'll contact you to confirm details.
                    </p>
                  </form>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
