import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, BarChart3, Users, ShieldCheck, Zap, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';
import PublicHeader from '@/components/layout/PublicHeader';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card/90 dark:bg-card/70 glassmorphism"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
    <p className="text-foreground/80 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const LandingPage = () => {
  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Comprehensive Inventory Tracking',
      description: 'Manage products, stock levels, transfers, and get low stock alerts. Supports barcode, batch, and expiry tracking.',
      delay: 0.1,
    },
    {
      icon: <IndianRupee className="w-6 h-6" />,
      title: 'GST-Compliant Billing',
      description: 'Generate GST invoices effortlessly with automatic tax calculations (CGST, SGST, IGST) and HSN/SAC code support.',
      delay: 0.2,
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Multi-Vendor & Staff Management',
      description: 'Isolated vendor environments with role-based access control for staff. Manage multiple branches seamlessly.',
      delay: 0.3,
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Sales & Purchase Automation',
      description: 'Streamline purchase orders, sales orders, and automatically update inventory on transactions.',
      delay: 0.4,
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'White-Labeling & Customization',
      description: 'Personalize the platform with your brand logo, colors, custom domain, and branded communications.',
      delay: 0.5,
    },
     {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Actionable Reporting',
      description: 'Gain insights with dashboards and detailed reports on stock, sales, purchases, and GST. Export to Excel/CSV.',
      delay: 0.6,
    },
  ];

  return (
    <div className="overflow-x-hidden">
      <PublicHeader />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-40 min-h-[85vh] flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 filter blur-md"
          src="/assets/inventory-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-blue-600/70 to-sky-500/70 dark:from-primary/60 dark:via-blue-700/60 dark:to-sky-600/60 opacity-80 dark:opacity-70 z-10"></div>
        {/* Content */}
        <div className="container mx-auto relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8">
                <span className="block text-white leading-tight">The Future of Inventory Management is Here.</span>
                <span className="block text-yellow-300 dark:text-yellow-400 mt-3">Welcome to VyapariTrack.</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 dark:text-white/80 mb-12 max-w-2xl leading-relaxed">
                Empower your business with a cutting-edge SaaS multi-vendor inventory system. Track, manage, and grow with GST-compliant billing, white-labeling, and robust analytics.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-primary-foreground font-semibold shadow-xl px-8 py-3 text-lg" asChild>
                    <Link to="/signup">Get Started For Free</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white/80 hover:bg-white/10 hover:text-white px-8 py-3 text-lg" asChild>
                    <Link to="/features">Learn More</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            {/* Right side - Empty for now, or you can add floating elements if needed */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-background dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need, <span className="text-primary">All in One Place</span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              VyapariTrack offers a comprehensive suite of tools to streamline your business operations from inventory to billing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={feature.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works / Benefits Section */}
      <section className="py-16 md:py-24 bg-secondary/20 dark:bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simplify Your Business <span className="text-primary">Instantly</span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Discover how VyapariTrack transforms complex tasks into simple, automated processes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {[
              { title: "Sign Up & Setup", description:"Quickly create your vendor account, configure basic settings, and start adding your products or services in minutes.", colorClass:"bg-green-500/10 text-green-500", delay:0.1},
              { title: "Manage & Track", description:"Utilize powerful tools for inventory, sales, purchases, and GST billing. Monitor everything in real-time with intuitive dashboards.", colorClass:"bg-blue-500/10 text-blue-500", delay:0.2},
              { title: "Grow & Scale", description:"Leverage insights from reports, customize your branding, and expand your operations with ease as your business flourishes.", colorClass:"bg-purple-500/10 text-purple-500", delay:0.3}
            ].map((step, index) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: step.delay }}
              className="p-8 rounded-xl shadow-lg bg-card dark:bg-card/80 glassmorphism flex flex-col"
            >
              <div className={`flex items-center justify-center w-16 h-16 ${step.colorClass} rounded-full mb-6 text-3xl font-bold mx-auto`}>{index + 1}</div>
              <h3 className="text-xl font-semibold mb-3 text-center text-foreground">{step.title}</h3>
              <p className="text-foreground/80 text-sm text-center leading-relaxed flex-grow">{step.description}</p>
            </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Image Showcase Section */}
      <section className="py-16 md:py-24 bg-background dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Intuitive Interface, <span className="text-primary">Powerful Control</span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Experience a clean, responsive design that makes managing your business a pleasure, not a chore.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <img   
                className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-video" 
                alt="VyapariTrack Dashboard Screenshot"
                src="https://images.unsplash.com/photo-1686061592689-312bbfb5c055" />
            </motion.div>
            <div className="space-y-6">
              {[
                { title: "Mobile-First Design", text: "Access and manage your business on any device, anytime, anywhere with our fully responsive platform.", icon: <CheckCircle className="text-green-500 w-5 h-5" /> },
                { title: "Customizable Themes", text: "Choose between light and dark modes, and tailor brand colors to match your unique identity.", icon: <CheckCircle className="text-green-500 w-5 h-5" /> },
                { title: "User-Friendly Navigation", text: "Find what you need quickly with a clear, organized, and intuitive layout designed for ease of use.", icon: <CheckCircle className="text-green-500 w-5 h-5" /> },
                { title: "Actionable Insights", text: "Visual dashboards and comprehensive reports provide clear insights to make informed decisions.", icon: <CheckCircle className="text-green-500 w-5 h-5" /> },
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-card/60 dark:bg-card/40 hover:bg-card/80 dark:hover:bg-card/60 transition-colors duration-300"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 mt-1 p-2 bg-primary/10 rounded-full">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="contact" className="py-20 md:py-28 bg-gradient-to-r from-primary via-blue-600 to-sky-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">Ready to Transform Your Business?</h2>
            <p className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of businesses already streamlining their operations with VyapariTrack. Take control of your inventory, sales, and billing like never before.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-primary-foreground font-semibold shadow-xl px-12 py-4 text-xl" asChild>
                <Link to="/signup">Start Your Free Trial Now</Link>
              </Button>
            </motion.div>
            <p className="mt-8 text-sm opacity-90">No credit card required. Cancel anytime. Full support included.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;