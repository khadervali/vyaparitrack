import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from './PublicHeader';

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">V</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  VyapariTrack
                </span>
              </Link>
              <p className="text-foreground/80 text-sm">
                Empowering businesses with smart inventory management solutions.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/features" className="text-foreground/80 hover:text-foreground text-sm">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-foreground/80 hover:text-foreground text-sm">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/updates" className="text-foreground/80 hover:text-foreground text-sm">
                    Updates
                  </Link>
                </li>
                <li>
                  <Link to="/integrations" className="text-foreground/80 hover:text-foreground text-sm">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-foreground/80 hover:text-foreground text-sm">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-foreground/80 hover:text-foreground text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-foreground/80 hover:text-foreground text-sm">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-foreground/80 hover:text-foreground text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="text-foreground/80 hover:text-foreground text-sm">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-foreground/80 hover:text-foreground text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-foreground/80 hover:text-foreground text-sm">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-foreground/60 text-sm">
                © {new Date().getFullYear()} VyapariTrack. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <Link to="/privacy" className="text-foreground/60 hover:text-foreground text-sm">
                  Privacy
                </Link>
                <Link to="/terms" className="text-foreground/60 hover:text-foreground text-sm">
                  Terms
                </Link>
                <Link to="/contact" className="text-foreground/60 hover:text-foreground text-sm">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout; 