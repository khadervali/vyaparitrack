import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import { Menu } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const PublicHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left side - Logo */}
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

        {/* Right side - Navigation */}
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/features" className="text-foreground/80 hover:text-foreground transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-foreground/80 hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/blog" className="text-foreground/80 hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link to="/help" className="text-foreground/80 hover:text-foreground transition-colors">
              Help
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
            <ModeToggle />
          </div>

          {/* Mobile Menu */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link to="/features" className="text-foreground/80 hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link to="/pricing" className="text-foreground/80 hover:text-foreground transition-colors">
                  Pricing
                </Link>
                <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
                  About
                </Link>
                <Link to="/blog" className="text-foreground/80 hover:text-foreground transition-colors">
                  Blog
                </Link>
                <Link to="/help" className="text-foreground/80 hover:text-foreground transition-colors">
                  Help
                </Link>
                <div className="pt-4 border-t">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="w-full justify-start mt-2" asChild>
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </div>
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader; 