import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart3, IndianRupee, Users, ShieldCheck, Zap, Settings, Package, RotateCcw, BellDot, FileText, Palette, Code2, Smartphone } from 'lucide-react';

const FeatureHighlightCard = ({ icon, title, description, delay }) => (
  <motion.div
    className="p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card dark:bg-card/80 glassmorphism"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-6 mx-auto">
      {React.cloneElement(icon, { className: "w-8 h-8" })}
    </div>
    <h3 className="text-2xl font-semibold mb-3 text-center text-foreground">{title}</h3>
    <p className="text-foreground/80 text-sm text-center leading-relaxed">{description}</p>
  </motion.div>
);

const FeaturesPage = () => {
  const coreFeatures = [
    {
      icon: <Package />,
      title: 'Inventory Management',
      description: 'Add, edit, and delete products/services. Manage stock in/out, internal transfers between branches, and get low stock alerts. Advanced features include barcode/QR scanning, lot/batch tracking, expiry date tracking, serial number tracking, FIFO/LIFO valuation, composite items, and unit conversion.',
    },
    {
      icon: <IndianRupee />,
      title: 'Sales & Purchase',
      description: 'Create and manage Purchase Orders (PO) and Sales Orders (SO). Generate professional invoices with automatic GST calculation (CGST, SGST, IGST). Handle returns and refunds efficiently. Inventory auto-updates on every sale or purchase.',
    },
    {
      icon: <FileText />,
      title: 'GST Billing & Accounting',
      description: 'Full HSN/SAC code support with configurable default GST percentages. Generate GSTR-compliant reports (Excel/CSV export). Basic accounting features include Ledger, Balance Sheet, Profit & Loss, and Tax Summary.',
    },
    {
      icon: <Users />,
      title: 'Multi-Vendor & Access Control',
      description: 'Each vendor operates in an isolated environment with unique subdomains (e.g., vendorname.vyaparitrack.com). Manage multiple branches per vendor. Role-Based Access Control (RBAC) allows Vendor Admins to define staff permissions for modules like Purchase, Sales, Inventory, and Reports. Supports multi-account access for users managing multiple vendors.',
    },
    {
      icon: <Palette />,
      title: 'UI/UX & Customization',
      description: 'Responsive, mobile-first design with a toggle for Dark/Light themes. Per-vendor customization options: upload your logo, set brand colors (especially for CTAs), and customize invoice & email templates. Supports local multilingual UI (excluding RTL).',
    },
    {
      icon: <ShieldCheck />,
      title: 'White Labeling',
      description: 'Offer a fully branded experience with custom domain mapping (e.g., billing.yourshop.com). Send branded email alerts and customize the UI via the admin panel to reflect vendor-specific branding.',
    },
    {
      icon: <BarChart3 />,
      title: 'Reporting & Analytics',
      description: 'Access a comprehensive dashboard with Key Performance Indicators (KPIs) tailored for each user role. Generate detailed reports: Stock Summary, Sales Summary, Purchase Summary, Low Stock Items, Tax Reports, and Profit & Loss. Export reports to Excel, CSV, or PDF format.',
    },
    {
      icon: <BellDot />,
      title: 'Notifications & Alerts',
      description: 'Receive real-time notifications via Email, In-app, and WhatsApp. Configurable alert types include Stock Alerts, PO/SO Confirmations, Invoice Reminders, and Subscription Reminders. Vendors can customize their notification settings.',
    },
    {
      icon: <Settings />,
      title: 'Subscription & Billing Management',
      description: 'Flexible pricing models: Yearly or Half-Yearly subscriptions. A Freemium Trial (duration set by Super Admin) is available. Manual renewal process with lockout after expiry and timely renewal alerts. Super Admin manages all plans and subscriptions.',
    },
    {
      icon: <Zap />,
      title: 'Security & Compliance',
      description: 'Enhanced security with Two-Factor Authentication (2FA). Comprehensive Audit Logs track all user actions. Adherence to data privacy compliance, including the Indian Digital Personal Data Protection Act (DPDPA). Employs encrypted data storage and secure session handling.',
    },
  ];

  const futureFeatures = [
     { icon: <Code2 />, title: "API Access", description: "Provide API access for vendors to integrate VyapariTrack with their existing systems and third-party applications." },
     { icon: <RotateCcw />, title: "Third-Party Integrations", description: "Seamless integrations with popular platforms like Tally, Shopify, Amazon, and other e-commerce or accounting software." },
     { icon: <Smartphone />, title: "Offline/Desktop Support", description: "Enable offline access or a dedicated desktop application for enhanced flexibility and uninterrupted work." },
  ];


  return (
    <div className="min-h-[calc(100vh-150px)] py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold text-primary mb-4"
        >
          VyapariTrack Features
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-foreground/80 max-w-3xl mx-auto"
        >
          Explore the comprehensive suite of tools designed to revolutionize your inventory management, billing, and overall business operations. VyapariTrack is built for efficiency, compliance, and growth.
        </motion.p>
      </header>

      <div className="container mx-auto">
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Core Functionalities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <FeatureHighlightCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </section>
        
        <section className="mb-16 py-12 bg-primary/5 dark:bg-primary/10 rounded-xl">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Upcoming Enhancements</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {futureFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="p-6 rounded-lg bg-card dark:bg-card/70 shadow-lg text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/20 text-primary rounded-full mb-4 mx-auto">
                    {React.cloneElement(feature.icon, { className: "w-6 h-6" })}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-foreground/70 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
             <p className="text-center text-foreground/70 mt-10 text-sm">
                VyapariTrack is constantly evolving. These features are planned for future releases to further enhance your business management experience.
            </p>
          </div>
        </section>

        <section className="text-center py-12">
            <motion.h2 
                initial={{ opacity: 0, y:20 }}
                whileInView={{ opacity: 1, y:0 }}
                viewport={{ once: true }}
                transition={{ duration:0.6 }}
                className="text-3xl font-bold text-foreground mb-6">
                Ready to Experience the Power of VyapariTrack?
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y:20 }}
                whileInView={{ opacity: 1, y:0 }}
                viewport={{ once: true }}
                transition={{ duration:0.6, delay:0.2 }}
                className="text-lg text-foreground/80 max-w-xl mx-auto mb-8">
                Take control of your business operations like never before. Sign up for a free trial or contact us for a demo.
            </motion.p>
            <motion.div 
                initial={{ opacity: 0, scale:0.8 }}
                whileInView={{ opacity: 1, scale:1 }}
                viewport={{ once: true }}
                transition={{ duration:0.5, delay:0.4 }}
                className="flex justify-center space-x-4">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link to="/signup">Start Free Trial</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                    <Link to="/contact">Request a Demo</Link>
                </Button>
            </motion.div>
        </section>

      </div>
    </div>
  );
};

export default FeaturesPage;