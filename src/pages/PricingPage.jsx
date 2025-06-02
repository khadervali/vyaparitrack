import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingCard = ({ plan, price, features, popular, yearlyPrice, delay }) => (
  <motion.div
    className={`p-8 rounded-xl shadow-xl relative overflow-hidden border-2 ${popular ? 'border-primary dark:border-primary' : 'border-border dark:border-border/50'} bg-card dark:bg-card/80 glassmorphism`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay }}
  >
    {popular && (
      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-bl-lg shadow-md">
        POPULAR
      </div>
    )}
    <div className="text-center mb-6">
      <h2 className={`text-3xl font-bold ${popular ? 'text-primary' : 'text-foreground'}`}>{plan.name}</h2>
      <p className="text-muted-foreground mt-1">{plan.description}</p>
    </div>
    <div className="text-center mb-8">
      <span className="text-5xl font-extrabold text-foreground">{price}</span>
      <span className="text-muted-foreground">/month</span>
      {yearlyPrice && <p className="text-sm text-green-600 dark:text-green-400 mt-1">({yearlyPrice}/year - Save 2 months!)</p>}
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <CheckCircle className={`w-5 h-5 mr-3 ${feature.included ? 'text-green-500' : 'text-muted-foreground/50'}`} />
          <span className={`${feature.included ? 'text-foreground' : 'text-muted-foreground/70 line-through'}`}>{feature.text}</span>
        </li>
      ))}
    </ul>
    <Button className={`w-full ${popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'}`} size="lg">
      Choose Plan
    </Button>
  </motion.div>
);

const PricingPage = () => {
  const pricingPlans = [
    {
      name: 'Free Trial',
      description: 'Explore core features',
      price: '₹0',
      features: [
        { text: 'Up to 10 Products', included: true },
        { text: 'Basic Inventory Tracking', included: true },
        { text: '1 User Account', included: true },
        { text: 'Limited GST Invoicing', included: true },
        { text: 'Email Support', included: true },
        { text: 'Multi-branch support', included: false },
        { text: 'White-labeling', included: false },
        { text: 'Advanced Reporting', included: false },
      ],
      icon: <Star />,
      delay: 0.1
    },
    {
      name: 'Basic Vendor',
      description: 'For small businesses',
      price: '₹499',
      yearlyPrice: '₹4990',
      features: [
        { text: 'Up to 100 Products', included: true },
        { text: 'Full Inventory Tracking', included: true },
        { text: 'Up to 3 User Accounts', included: true },
        { text: 'Unlimited GST Invoicing', included: true },
        { text: 'Priority Email Support', included: true },
        { text: 'Limited Multi-branch (2)', included: true },
        { text: 'Basic White-labeling', included: false },
        { text: 'Standard Reporting', included: true },
      ],
      icon: <Zap />,
      popular: true,
      delay: 0.2
    },
    {
      name: 'Professional Vendor',
      description: 'For growing businesses',
      price: '₹999',
      yearlyPrice: '₹9990',
      features: [
        { text: 'Unlimited Products', included: true },
        { text: 'Full Inventory Tracking + Advanced', included: true },
        { text: 'Up to 10 User Accounts', included: true },
        { text: 'Unlimited GST Invoicing & GSTR', included: true },
        { text: 'Phone & Email Support', included: true },
        { text: 'Full Multi-branch support', included: true },
        { text: 'Full White-labeling & Custom Domain', included: true },
        { text: 'Advanced Reporting & Analytics', included: true },
      ],
      icon: <Shield />,
      delay: 0.3
    },
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
          Flexible Pricing for Every Business
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-foreground/80 max-w-2xl mx-auto"
        >
          Choose the perfect plan that fits your needs. All plans are GST compliant and designed to help you grow. Yearly plans offer significant savings!
        </motion.p>
      </header>

      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              price={plan.price}
              features={plan.features}
              popular={plan.popular}
              yearlyPrice={plan.yearlyPrice}
              delay={plan.delay}
            />
          ))}
        </div>

        <motion.section 
            initial={{ opacity: 0}}
            whileInView={{ opacity: 1}}
            viewport={{ once: true, amount:0.3}}
            transition={{ duration:0.8, delay:0.5}}
            className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-secondary/20 dark:from-primary/10 dark:to-background/30 rounded-xl shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Super Admin & Enterprise Solutions</h3>
          <p className="text-foreground/80 mb-6 max-w-xl mx-auto">
            For larger organizations or specific platform-wide requirements, the Super Admin manages overall plans and subscriptions. Custom enterprise solutions can be tailored. Please contact us for bespoke needs.
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link to="/contact">Contact Sales</Link>
          </Button>
        </motion.section>

        <section className="mt-16 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Frequently Asked Questions</h3>
            <div className="max-w-3xl mx-auto space-y-6 text-left">
                {[
                    {q: "Is there a setup fee?", a: "No, there are no setup fees on any of our plans. You can get started with our free trial right away."},
                    {q: "Can I change my plan later?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be pro-rated."},
                    {q: "What payment methods do you accept?", a: "We accept all major credit cards, debit cards, UPI, and net banking through our secure payment gateway."},
                    {q: "Is my data secure with VyapariTrack?", a: "Absolutely. We prioritize data security with encryption, regular backups, and compliance with Indian data protection laws."},
                    {q: "What happens after the free trial ends?", a: "You'll be prompted to choose a paid plan to continue using the service. Your data will remain intact."}
                ].map((faq, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount:0.3 }}
                        transition={{ duration:0.5, delay: index * 0.1 + 0.3 }}
                        className="p-4 bg-card dark:bg-card/80 rounded-lg shadow-md glassmorphism"
                    >
                        <p className="font-semibold text-primary">{faq.q}</p>
                        <p className="text-sm text-foreground/80 mt-1">{faq.a}</p>
                    </motion.div>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
};

export default PricingPage;