import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We're here to help! Whether you have questions about a tour or need support, our team is ready to assist.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">
          
          <div className="p-10 md:p-14 bg-secondary/10">
            <h3 className="font-display text-3xl font-bold text-primary mb-8">Contact Information</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary shadow-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary">Call Us</h4>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri: 9am - 6pm EST</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary">Email Us</h4>
                  <p className="text-muted-foreground">hello@wanderlust.com</p>
                  <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary">Visit Us</h4>
                  <p className="text-muted-foreground">123 Adventure Ave, Suite 400</p>
                  <p className="text-muted-foreground">New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 md:p-14">
            <h3 className="font-display text-3xl font-bold text-primary mb-2">Send Message</h3>
            <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you shortly.</p>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="Your message here..." className="min-h-[120px]" />
              </div>
              <Button className="w-full bg-primary text-white hover:bg-primary/90 h-12 text-lg">
                Send Message <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
