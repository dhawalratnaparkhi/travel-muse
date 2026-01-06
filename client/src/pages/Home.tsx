import { Link } from "wouter";
import { ArrowRight, Globe, Users, Shield, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTours } from "@/hooks/use-tours";
import { TourCard } from "@/components/TourCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: tours, isLoading, error } = useTours();

  // ✅ SAFE FALLBACK IF BACKEND IS NOT AVAILABLE
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Travel Muse
          </h1>
          <p className="text-muted-foreground text-lg">
            Backend is not connected yet. Frontend is live.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // ✅ NORMAL HOMEPAGE RENDER
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
            alt="Travel Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/90 text-primary text-sm font-bold mb-6">
              EXPLORE THE WORLD WITH US
            </span>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Journey Beyond <br />
              <span className="text-secondary italic">Expectations</span>
            </h1>

            <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-10">
              Curated group tours and bespoke itineraries designed for modern explorers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/custom">
                <Button size="lg" className="bg-secondary text-primary">
                  Plan Custom Trip
                </Button>
              </Link>

              <Link href="/tours">
                <Button size="lg" variant="outline" className="text-white border-white">
                  View Group Tours
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED TOURS */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12">
            Popular Group Tours
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-[450px] bg-white rounded-3xl p-6">
                  <Skeleton className="h-64 w-full" />
                </div>
              ))
            ) : !tours || tours.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground">
                No upcoming tours right now.
              </div>
            ) : (
              tours.slice(0, 3).map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Why Travel With <span className="text-secondary">Us?</span>
            </h2>
            <p className="text-blue-100 mb-8">
              We craft experiences, not just trips.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Shield className="text-secondary mb-2" />
                <h4 className="font-bold">Trusted</h4>
              </div>
              <div>
                <Star className="text-secondary mb-2" />
                <h4 className="font-bold">Expert Guides</h4>
              </div>
              <div>
                <Users className="text-secondary mb-2" />
                <h4 className="font-bold">Small Groups</h4>
              </div>
              <div>
                <Globe className="text-secondary mb-2" />
                <h4 className="font-bold">Sustainable</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
