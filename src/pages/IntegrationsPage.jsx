import React from 'react';
import { motion } from 'framer-motion';
import { Link2, Zap, Settings } from 'lucide-react';

const IntegrationsPage1 = () => {
  const comingSoonIntegrations = [
    { name: "Tally", description: "Sync your accounting data seamlessly.", icon: <img  alt="Tally ERP 9 Logo" class="w-10 h-10" src="https://images.unsplash.com/photo-1553811527-003e18e83192" /> },
    { name: "Shopify", description: "Connect your e-commerce store for automated inventory updates.", icon: <img  alt="Shopify Logo" class="w-10 h-10" src="https://images.unsplash.com/photo-1657097097106-be38cad7b3e0" /> },
    { name: "Amazon Seller Central", description: "Manage your Amazon inventory and orders directly.", icon: <img  alt="Amazon Seller Central Logo" class="w-10 h-10" src="https://images.unsplash.com/photo-1648091855145-73b112984e19" /> },
    { name: "WooCommerce", description: "Integrate your WordPress e-commerce site.", icon: <img  alt="WooCommerce Logo" class="w-10 h-10" src="https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a" /> },
    { name: "Payment Gateways", description: "Connect with popular Indian payment gateways.", icon: <img  alt="Payment Gateway Icon" class="w-10 h-10" src="https://images.unsplash.com/photo-1626682561863-fdbb965de0dc" /> },
    { name: "Logistics Partners", description: "Streamline shipping with leading logistics providers.", icon: <img  alt="Logistics Icon" class="w-10 h-10" src="https://images.unsplash.com/photo-1584869032754-58d2d1d28aa1" /> },
  ];

  return (
    <div className="min-h-[calc(100vh-150px)] py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block p-4 bg-primary/10 rounded-full mb-6"
        >
          <Link2 className="h-12 w-12 text-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-primary mb-4"
        >
          VyapariTrack Integrations
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-foreground/80 max-w-2xl mx-auto"
        >
          Connect VyapariTrack with your favorite tools and services to streamline your workflow and automate processes. More integrations are coming soon!
        </motion.p>
      </header>

      <div className="container mx-auto max-w-5xl">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Available Integrations</h2>
          <div className="text-center p-8 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism">
            <Zap className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">API Access</h3>
            <p className="text-foreground/80 mb-4">
              For advanced users and custom solutions, VyapariTrack will offer API access (coming soon) allowing you to build your own integrations and connect with any system.
            </p>
            <p className="text-sm text-muted-foreground">
              Our API documentation will be available here once launched.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Coming Soon</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comingSoonIntegrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl shadow-lg bg-card dark:bg-card/80 glassmorphism flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  {integration.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{integration.name}</h3>
                <p className="text-foreground/80 text-sm flex-grow">{integration.description}</p>
                <div className="mt-4 text-xs font-semibold py-1 px-3 bg-yellow-400/20 text-yellow-700 dark:text-yellow-300 rounded-full">
                  Coming Soon
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        <section className="text-center mt-20 py-10">
             <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Request an Integration</h3>
            <p className="text-foreground/80 max-w-lg mx-auto mb-6">
                Don't see an integration you need? Let us know! We're always looking to expand our capabilities based on user feedback.
            </p>
            <a href="mailto:integrations@vyaparitrack.com?subject=Integration Request" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90">
                Suggest an Integration
            </a>
        </section>
      </div>
    </div>
  );
};

export default IntegrationsPage1;