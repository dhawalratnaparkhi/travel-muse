import { Link } from "wouter";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Tour } from "@shared/routes";
import { format } from "date-fns";

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img 
          src={tour.imageUrl || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"} 
          alt={tour.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <Badge className="absolute top-4 right-4 z-20 bg-secondary text-primary font-bold hover:bg-secondary/90">
          Group Tour
        </Badge>
        <div className="absolute bottom-4 left-4 z-20 text-white">
          <p className="text-sm font-medium opacity-90 mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {format(new Date(tour.startDate), "MMM dd, yyyy")}
          </p>
          <h3 className="font-display text-xl font-bold leading-tight">{tour.destination}</h3>
        </div>
      </div>
      
      <CardHeader className="pt-6 pb-2">
        <h3 className="font-display text-xl font-bold text-primary group-hover:text-secondary transition-colors">
          {tour.title}
        </h3>
      </CardHeader>
      
      <CardContent className="pb-4 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {tour.description}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0 pb-6 flex items-center justify-between border-t border-gray-100 mt-auto px-6 py-4 bg-gray-50/50">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Starting from</span>
          <span className="font-display text-lg font-bold text-primary">${tour.price / 100}</span>
        </div>
        
        <Link href={`/tours/${tour.id}`}>
          <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm cursor-pointer">
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
}
