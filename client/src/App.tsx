import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import CustomTour from "@/pages/CustomizedTour";
import GroupTours from "@/pages/GroupTours";
import GroupTourDetails from "@/pages/GroupTourDetails";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";

import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

// Auth Check Component
function AdminRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary w-10 h-10"/></div>;

  // Ideally redirect here if not admin, but the page handles unauthorized UI itself for better UX
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/custom" component={CustomTour} />
      <Route path="/tours" component={GroupTours} />
      <Route path="/tours/:id" component={GroupTourDetails} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      
      {/* Admin Route */}
      <Route path="/admin">
        {() => <AdminRoute component={Admin} />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
