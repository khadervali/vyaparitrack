import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ListChecks, Zap } from 'lucide-react';

const UpdateCard = ({ version, date, title, changes, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay }}
    className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-xl glassmorphism mb-8"
  >
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-2xl font-semibold text-primary">{title} - v{version}</h2>
      <span className="text-sm text-muted-foreground">{date}</span>
    </div>
    <ul className="list-disc list-inside space-y-2 pl-4 text-foreground/80">
      {changes.map((change, index) => (
        <li key={index}>{change}</li>
      ))}
    </ul>
  </motion.div>
);

const UpdatesPage = () => {
  const updates = [
    {
      version: "1.0.0",
      date: "May 23, 2025",
      title: "VyapariTrack Launched!",
      changes: [
        "Initial release of VyapariTrack platform.",
        "Core features: Inventory Management, Sales & Purchase, GST Billing.",
        "Multi-vendor architecture with subdomain support.",
        "Basic Reporting and User Role Management.",
        "Dark/Light theme and initial UI customization options.",
      ],
      delay: 0.1,
    },
    {
      version: "0.1.0",
      date: "May 15, 2025",
      title: "Pre-Launch: Core Pages & Auth",
      changes: [
        "Landing page, About, Contact, Features, Pricing pages developed.",
        "Terms of Service and Privacy Policy pages added.",
        "User Login and Signup functionality implemented using localStorage.",
        "Dark mode set as default theme.",
        "Basic dashboard placeholder created.",
      ],
      delay: 0.2,
    },
    {
      version: "0.0.1",
      date: "May 10, 2025",
      title: "Project Initialization",
      changes: [
        "Project setup with Vite, React, TailwindCSS.",
        "Basic project structure and navigation implemented.",
        "Landing page concept and initial design.",
      ],
      delay: 0.3,
    },
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
          <Rocket className="h-12 w-12 text-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-primary mb-4"
        >
          Platform Updates & Changelog
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-foreground/80 max-w-2xl mx-auto"
        >
          Stay informed about the latest features, improvements, and bug fixes in VyapariTrack. We're constantly working to make our platform better for you.
        </motion.p>
      </header>

      <div className="container mx-auto max-w-3xl">
        {updates.map((update) => (
          <UpdateCard
            key={update.version}
            version={update.version}
            date={update.date}
            title={update.title}
            changes={update.changes}
            delay={update.delay}
          />
        ))}
        
        <motion.div 
            className="text-center mt-16 p-8 bg-secondary/20 dark:bg-primary/5 rounded-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5}}
        >
            <Zap className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Future Updates</h3>
            <p className="text-foreground/80">
                We are actively developing new features including advanced analytics, third-party integrations (Tally, Shopify), API access, and more. Keep an eye on this page for exciting announcements!
            </p>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdatesPage;