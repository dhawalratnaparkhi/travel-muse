import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plane, Star, Calendar as CalendarIcon, Wallet } from "lucide-react";
import { z } from "zod";

const formSchema = insertInquirySchema.extend({
  duration: z.coerce.number().min(1),
  adults: z.coerce.number().min(1),
  children: z.coerce.number(),
});

export default function CustomizedTour() {
  const { mutate, isPending } = useCreateInquiry();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      destination: "",
      duration: 7,
      adults: 2,
      children: 0,
      budget: "Standard",
      hotelPreference: "4 Star",
      transportPreference: "Flight",
      startDate: "",
      specialRequirements: "",
    },
  });

  function onSubmit(data: any) {
    mutate(data, {
      onSuccess: () => form.reset()
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="relative py-24 bg-primary overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Plan Your Dream Trip</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
            Tell us about your perfect vacation, and our travel experts will craft a personalized itinerary just for you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 pb-24 relative z-20">
        <Card className="max-w-4xl mx-auto p-8 md:p-12 shadow-2xl rounded-3xl border-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm">1</span>
                  Your Details
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
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
                        <FormControl><Input placeholder="john@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input placeholder="+1 234 567 890" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Trip Details */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm">2</span>
                  Trip Preferences
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Where do you want to go?</FormLabel>
                        <FormControl><Input placeholder="e.g. Italy, Japan, Bali" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Start Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input className="pl-10" placeholder="e.g. June 2024 or Specific Date" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Days</FormLabel>
                        <FormControl><Input type="number" min={1} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="adults"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adults</FormLabel>
                        <FormControl><Input type="number" min={1} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="children"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Children</FormLabel>
                        <FormControl><Input type="number" min={0} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Style & Budget */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm">3</span>
                  Style & Comfort
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <Wallet className="w-4 h-4 mr-2 text-gray-400" />
                              <SelectValue placeholder="Select budget" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Standard">Standard (Good Value)</SelectItem>
                            <SelectItem value="Premium">Premium (Comfort+)</SelectItem>
                            <SelectItem value="Luxury">Luxury (Top Tier)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hotelPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hotel Preference</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <Star className="w-4 h-4 mr-2 text-gray-400" />
                              <SelectValue placeholder="Select hotel type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="3 Star">3 Star / Boutique</SelectItem>
                            <SelectItem value="4 Star">4 Star</SelectItem>
                            <SelectItem value="5 Star">5 Star / Resort</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="transportPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Transport</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <Plane className="w-4 h-4 mr-2 text-gray-400" />
                              <SelectValue placeholder="Select transport" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Flight">Flight</SelectItem>
                            <SelectItem value="Train">Train</SelectItem>
                            <SelectItem value="Private Car">Private Car</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="specialRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Any special requirements? (Dietary, Accessibility, etc.)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us more about what would make this trip perfect..." 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-secondary text-primary font-bold hover:bg-secondary/90 h-14 text-lg shadow-xl"
                disabled={isPending}
              >
                {isPending ? "Submitting Request..." : "Request My Free Quote"}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
