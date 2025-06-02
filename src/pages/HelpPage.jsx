import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Search, BookOpen, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AccordionItem = ({ title, children, isOpen, onToggle }) => (
  <div className="border-b border-border">
    <button
      className="flex justify-between items-center w-full py-5 px-6 text-left text-lg font-medium text-foreground hover:bg-accent/50 dark:hover:bg-accent/30 transition-colors"
      onClick={onToggle}
    >
      {title}
      {isOpen ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
    </button>
    {isOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6 text-foreground/80 bg-background dark:bg-card/50 leading-relaxed">
          {children}
        </div>
      </motion.div>
    )}
  </div>
);


const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openAccordion, setOpenAccordion] = useState(null);

  const faqs = [
    {
      question: "How do I add a new product to my inventory?",
      answer: "To add a new product, navigate to the 'Inventory' section from your dashboard, then click on 'Products'. You'll find an 'Add New Product' button. Fill in the required details like product name, SKU, category, purchase price, sale price, initial stock quantity, and GST details. Click 'Save' to add the product.",
    },
    {
      question: "How can I generate a GST-compliant invoice?",
      answer: "Go to the 'Sales' section and click on 'Create Invoice'. Select the customer, add products/services, and VyapariTrack will automatically calculate GST (CGST, SGST, IGST) based on your settings and the customer's location. Review the invoice and click 'Generate & Send'.",
    },
    {
      question: "How do I manage staff access and permissions?",
      answer: "As a Vendor Admin, go to 'Settings' and then 'Staff Management'. You can add new staff members and assign them roles (e.g., Inventory Manager, Sales Staff). For each role, you can customize permissions for different modules like Purchase, Sales, Inventory, and Reports.",
    },
    {
      question: "What if I forget my password?",
      answer: "On the login page, click the 'Forgot Password?' link. Enter your registered email address, and we'll send you instructions on how to reset your password.",
    },
    {
      question: "How does multi-branch management work?",
      answer: "If your plan supports multiple branches, you can add and manage them under 'Settings' > 'Branch Management'. You can then track inventory, sales, and staff specific to each branch, or view consolidated reports.",
    },
    {
      question: "Can I customize invoice templates?",
      answer: "Yes, VyapariTrack allows customization of invoice templates. Go to 'Settings' > 'Templates' > 'Invoice Templates'. You can choose from pre-designed templates and customize them with your logo, brand colors, and specific fields.",
    }
  ];
  
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="min-h-[calc(100vh-150px)] py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block p-4 bg-primary/10 rounded-full mb-6"
        >
          <HelpCircle className="h-12 w-12 text-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-primary mb-4"
        >
          VyapariTrack Help Center
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8"
        >
          Welcome to our support hub. Find answers to common questions, explore tutorials, and get help with VyapariTrack.
        </motion.p>
        <motion.div 
            initial={{ opacity: 0, scale:0.9 }}
            animate={{ opacity: 1, scale:1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-xl mx-auto relative"
        >
          <Input 
            type="search" 
            placeholder="Search for help articles, FAQs..." 
            className="pl-10 pr-4 py-3 text-base bg-background/80 dark:bg-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
        </motion.div>
      </header>

      <div className="container mx-auto max-w-4xl">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Frequently Asked Questions</h2>
          {filteredFaqs.length > 0 ? (
            <div className="bg-card dark:bg-card/80 rounded-lg shadow-xl overflow-hidden glassmorphism">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  title={faq.question}
                  isOpen={openAccordion === index}
                  onToggle={() => toggleAccordion(index)}
                >
                  {faq.answer}
                </AccordionItem>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No FAQs match your search term. Try a different query or browse our categories.</p>
          )}
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x:-30 }}
            whileInView={{ opacity: 1, x:0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay:0.2 }}
            className="p-8 bg-card dark:bg-card/80 rounded-lg shadow-xl glassmorphism text-center"
          >
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">User Guides & Tutorials</h3>
            <p className="text-foreground/80 mb-4">
              Explore step-by-step guides and video tutorials to master VyapariTrack features. (Coming Soon)
            </p>
            <Button variant="outline" disabled>Browse Guides (Soon)</Button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x:30 }}
            whileInView={{ opacity: 1, x:0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay:0.3 }}
            className="p-8 bg-card dark:bg-card/80 rounded-lg shadow-xl glassmorphism text-center"
          >
            <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">Contact Support</h3>
            <p className="text-foreground/80 mb-4">
              Can't find what you're looking for? Our support team is ready to assist you.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="mailto:support@vyaparitrack.com">Email Support</a>
            </Button>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;