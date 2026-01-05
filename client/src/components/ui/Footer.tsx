import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-lg">
                <span className="text-secondary font-bold text-xl">W</span>
              </div>
              <span className="font-display font-bold text-2xl text-white">
                Wanderlust
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Crafting unforgettable journeys for the modern explorer. Experience the world with comfort, style, and authentic connections.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="bg-white/10 hover:bg-secondary p-2 rounded-full transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-secondary p-2 rounded-full transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-secondary p-2 rounded-full transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-secondary">Explore</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/"><span className="hover:text-secondary cursor-pointer transition-colors">Home</span></Link></li>
              <li><Link href="/about"><span className="hover:text-secondary cursor-pointer transition-colors">About Us</span></Link></li>
              <li><Link href="/tours"><span className="hover:text-secondary cursor-pointer transition-colors">Group Tours</span></Link></li>
              <li><Link href="/custom"><span className="hover:text-secondary cursor-pointer transition-colors">Custom Trips</span></Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-secondary">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-secondary">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                <span>123 Adventure Ave, Suite 400<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span>hello@wanderlust.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Wanderlust Travel Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
