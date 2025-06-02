import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: 'https://facebook.com/vyaparitrack', label: 'Facebook' },
    { icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com/vyaparitrack', label: 'Twitter' },
    { icon: <Linkedin className="h-5 w-5" />, href: 'https://linkedin.com/company/vyaparitrack', label: 'LinkedIn' },
    { icon: <Instagram className="h-5 w-5" />, href: 'https://instagram.com/vyaparitrack', label: 'Instagram' },
  ];

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', path: '/features' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Integrations', path: '/integrations' },
        { name: 'Updates', path: '/updates' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Blog', path: '/blog' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'API Documentation', path: '/api-docs' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
      ],
    },
  ];

  return (
    <footer className="bg-background/80 dark:bg-background/60 border-t border-border/70 py-12 text-foreground/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 dark:to-blue-300">
                VyapariTrack
              </span>
            </Link>
            <p className="text-sm">
              The ultimate SaaS multi-vendor inventory management system. Streamline your operations, from stock to GST billing, all in one platform.
            </p>
             <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-foreground/70 hover:text-primary transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <p className="font-semibold text-foreground mb-4">{section.title}</p>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/70 pt-8 text-center md:text-left">
          <p className="text-sm">
            &copy; {currentYear} VyapariTrack.com. All rights reserved. A product by Khader Vali.
          </p>
          <p className="text-xs mt-1 text-foreground/60">
            Built for efficient inventory management across India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;