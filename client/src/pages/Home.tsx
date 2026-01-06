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
  if (error) { 
    return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Descriptive comment for Unsplash image */}
        {/* scenic mountain landscape travel adventure */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" 
            alt="Travel Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/90 text-primary text-sm font-bold tracking-wide mb-6 backdrop-blur-sm">
              EXPLORE THE WORLD WITH US
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Journey Beyond <br />
              <span className="text-secondary italic">Expectations</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Curated group tours and bespoke itineraries designed for the modern explorer seeking authenticity and comfort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/custom">
                <Button size="lg" className="bg-secondary text-primary hover:bg-white hover:text-primary font-bold text-lg px-8 py-6 rounded-full shadow-xl shadow-black/10 transition-all transform hover:-translate-y-1">
                  Plan Custom Trip
                </Button>
              </Link>
              <Link href="/tours">
                <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white/10 font-bold text-lg px-8 py-6 rounded-full backdrop-blur-sm transition-all">
                  View Group Tours
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
  
      {/* Services Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-display text-4xl font-bold mb-4">Choose Your Travel Style</h2>
            <p className="text-muted-foreground text-lg">Whether you prefer the camaraderie of a group or the freedom of a solo adventure, we have the perfect option for you.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Custom Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-background rounded-3xl p-8 border border-border/50 shadow-lg shadow-primary/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary mb-6">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl font-bold text-primary mb-4">Customized Trips</h3>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  Tailor-made itineraries built around your interests, dates, and budget. You dream it, we plan every detail.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-secondary" /> Flexible dates & duration
                  </li>
                  <li className="flex items-center gap-3 text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-secondary" /> Hand-picked accommodations
                  </li>
                  <li className="flex items-center gap-3 text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-secondary" /> Private transport & guides
                  </li>
                </ul>
                <Link href="/custom">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90 py-6 text-lg rounded-xl shadow-lg shadow-primary/20">
                    Start Planning <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Group Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-primary text-white rounded-3xl p-8 shadow-xl shadow-primary/20 relative overflow-hidden group"
            >
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-tr-full -ml-16 -mb-16 transition-transform group-hover:scale-125 duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl font-bold mb-4">Group Tours</h3>
                <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                  Join like-minded travelers on carefully crafted fixed-departure trips to the world's most exciting destinations.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-blue-100">
                    <CheckCircle className="w-5 h-5 text-secondary" /> Expert tour leaders
                  </li>
                  <li className="flex items-center gap-3 text-blue-100">
                    <CheckCircle className="w-5 h-5 text-secondary" /> All logistics handled
                  </li>
                  <li className="flex items-center gap-3 text-blue-100">
                    <CheckCircle className="w-5 h-5 text-secondary" /> Make lifelong friends
                  </li>
                </ul>
                <Link href="/tours">
                  <Button className="w-full bg-secondary text-primary hover:bg-white hover:text-primary py-6 text-lg rounded-xl font-bold shadow-lg shadow-black/20">
                    View Upcoming Tours <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-secondary font-bold tracking-wider uppercase text-sm">Upcoming Adventures</span>
              <h2 className="text-primary font-display text-4xl font-bold mt-2">Popular Group Tours</h2>
            </div>
            <Link href="/tours">
              <Button variant="ghost" className="hidden md:flex text-primary hover:text-secondary hover:bg-transparent p-0 font-bold group">
                View All Tours <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-[450px] rounded-3xl bg-white shadow-sm overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))
          ) : !tours || tours.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No upcoming tours at the moment. Check back soon!</p>
              </div>
            ) : (
              tours?.slice(0, 3).map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))
            )}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/tours">
              <Button variant="outline" className="w-full">View All Tours</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-primary text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                Why Travel With <br />
                <span className="text-secondary">Wanderlust?</span>
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                We don't just book trips; we craft experiences. Our deep local knowledge and passion for authentic travel ensure you see the world differently.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 pt-4">
                <div className="space-y-3">
                  <Shield className="w-10 h-10 text-secondary" />
                  <h4 className="font-bold text-xl">100% Trusted</h4>
                  <p className="text-sm text-blue-200">Secure booking and vetted partners worldwide.</p>
                </div>
                <div className="space-y-3">
                  <Star className="w-10 h-10 text-secondary" />
                  <h4 className="font-bold text-xl">Expert Guides</h4>
                  <p className="text-sm text-blue-200">Passionate locals who know the hidden gems.</p>
                </div>
                <div className="space-y-3">
                  <Users className="w-10 h-10 text-secondary" />
                  <h4 className="font-bold text-xl">Small Groups</h4>
                  <p className="text-sm text-blue-200">Intimate experiences with max 12 travelers.</p>
                </div>
                <div className="space-y-3">
                  <Globe className="w-10 h-10 text-secondary" />
                  <h4 className="font-bold text-xl">Sustainable</h4>
                  <p className="text-sm text-blue-200">We support local communities and eco-tourism.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* woman walking on beach sunset */}
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" 
                  className="rounded-2xl transform translate-y-12 shadow-2xl" 
                  alt="Beach"
                />
                {/* hiking mountain trail view */}
                <img 
                  src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&q=80" 
                  className="rounded-2xl transform -translate-y-8 shadow-2xl" 
                  alt="Mountain"
                />
              </div>
              {/* decorative circle */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
