import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TourCard } from "@/components/TourCard";
import { useTours } from "@/hooks/use-tours";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function GroupTours() {
  const { data: tours, isLoading } = useTours();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="bg-primary pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">Upcoming Group Tours</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
            Join our carefully curated small group adventures. Designed for connection, comfort, and unforgettable memories.
          </p>
        </div>
      </div>

      {/* List */}
      <div className="container mx-auto px-4 py-20">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[450px] rounded-3xl bg-white shadow-sm overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : tours?.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
            <h3 className="text-2xl font-bold text-primary mb-2">No Tours Available Yet</h3>
            <p className="text-muted-foreground">We're finalizing our upcoming schedule. Please check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours?.map((tour, idx) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <TourCard tour={tour} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
