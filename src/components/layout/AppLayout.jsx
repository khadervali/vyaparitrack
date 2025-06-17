import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import UserNav from '../UserNav';
import { ModeToggle } from '../ModeToggle';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../ui/dialog';

const AppLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b px-4 md:px-6 flex items-center justify-between bg-background">
          {/* Left side - Mobile Menu Button */}
          <div className="flex items-center">
            <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DialogTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 max-w-[300px] h-full" side="left">
                <Sidebar />
              </DialogContent>
            </Dialog>
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-4 ml-auto">
            <ModeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;