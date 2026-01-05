import { Link, useLocation } from "wouter";
import { Menu, X, Phone, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Group Tours", href: "/tours" },
    { name: "Custom Trip", href: "/custom" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  if (user?.isAdmin) {
    navLinks.push({ name: "Admin Dashboard", href: "/admin" });
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-primary p-2 rounded-lg">
                  <span className="text-secondary font-bold text-xl">W</span>
                </div>
                <span className="font-display font-bold text-2xl text-primary tracking-tight">
                  Wanderlust<span className="text-secondary">.</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span className={`text-sm font-medium transition-colors hover:text-secondary cursor-pointer ${
                  location === link.href ? "text-primary font-bold" : "text-gray-600"
                }`}>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
             {user ? (
               <div className="flex items-center text-sm text-gray-500 gap-2">
                 <User className="h-4 w-4" />
                 {user.username}
               </div>
             ) : (
                <a href="/api/login" className="text-sm font-medium text-primary hover:underline">
                  Login
                </a>
             )}
            <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold shadow-md shadow-secondary/20 rounded-full px-6">
              <Phone className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top-5">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span 
                  className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${
                    location === link.href 
                      ? "bg-primary/5 text-primary" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </span>
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <Button className="w-full bg-secondary text-primary font-bold">
                Call Us Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
