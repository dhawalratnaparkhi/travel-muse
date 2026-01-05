import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Target, Heart, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Founded by passionate explorers, Wanderlust was born from a simple belief: Travel should be transformative, not just a change of location.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
           {/* team meeting planning travel */}
          <div className="order-2 md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" 
              alt="Our Team" 
              className="rounded-3xl shadow-2xl"
            />
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm">Who We Are</span>
            <h2 className="font-display text-4xl font-bold text-primary">Experts in Authentic Travel</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are a team of travel designers, guides, and locals who share a love for the world's most beautiful places. We don't just sell tours; we create memories that last a lifetime.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From the bustling streets of Tokyo to the serene landscapes of Patagonia, our network of local partners ensures you get insider access and authentic experiences everywhere you go.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground">To connect people with the world through meaningful, sustainable, and unforgettable travel experiences.</p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 text-center">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">Our Values</h3>
            <p className="text-muted-foreground">Integrity, passion, and respect for the cultures and environments we visit guide everything we do.</p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 text-center">
             <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">Our Promise</h3>
            <p className="text-muted-foreground">24/7 support, transparent pricing, and quality guaranteed on every single trip.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
