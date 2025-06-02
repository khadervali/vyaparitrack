import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    // Simulate API call (replace with actual API endpoint)
    try {
      // const response = await fetch('YOUR_CONTACT_API_ENDPOINT', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error('Network response was not ok.');
      
      // Simulate success after 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({ title: "Message Sent!", description: "Thank you for contacting us. We'll get back to you soon." });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({ title: "Error", description: "Failed to send message. Please try again later.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const contactDetails = [
    { icon: <Mail className="w-6 h-6 text-primary" />, text: "support@vyaparitrack.com", href: "mailto:support@vyaparitrack.com", label: "Email Support" },
    { icon: <Phone className="w-6 h-6 text-primary" />, text: "+91-9876543210", href: "tel:+919876543210", label: "Phone Support (Mon-Fri, 9am-6pm IST)" },
    { icon: <MapPin className="w-6 h-6 text-primary" />, text: "123 Business Hub, Tech Park, Bangalore, India", href: "#", label: "Our Office Address" },
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
          Get In Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-foreground/80 max-w-2xl mx-auto"
        >
          We're here to help! Whether you have questions about features, pricing, or need support, feel free to reach out to us.
        </motion.p>
      </header>

      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-card dark:bg-card/80 rounded-xl shadow-xl glassmorphism space-y-6"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
            {contactDetails.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h3 className="font-medium text-foreground">{item.label}</h3>
                  {item.href === "#" ? (
                     <p className="text-muted-foreground">{item.text}</p>
                  ) : (
                    <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {item.text}
                    </a>
                  )}
                </div>
              </div>
            ))}
             <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Business Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM (IST)</p>
                <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 bg-card dark:bg-card/80 rounded-xl shadow-xl glassmorphism"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="mt-1 bg-background/70 dark:bg-input" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required className="mt-1 bg-background/70 dark:bg-input" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" type="text" placeholder="Regarding..." value={formData.subject} onChange={handleChange} required className="mt-1 bg-background/70 dark:bg-input" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message here..." value={formData.message} onChange={handleChange} required rows={5} className="mt-1 bg-background/70 dark:bg-input" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                {isLoading ? 'Sending...' : (<><Send className="w-4 h-4 mr-2" /> Send Message</>)}
              </Button>
            </form>
          </motion.div>
        </div>
        
        <motion.div 
            initial={{ opacity:0, y:50}}
            whileInView={{ opacity:1, y:0}}
            viewport={{ once:true, amount:0.2}}
            transition={{ duration:0.7, delay:0.3}}
            className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground text-center mb-6">Our Location</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl border border-border">
                 <iframe 
                    src="https://www.openstreetmap.org/export/embed.html?bbox=77.5011%2C12.8993%2C77.7011%2C13.0993&layer=mapnik&marker=12.9993%2C77.6011" 
                    className="w-full h-full"
                    style={{ border:0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="VyapariTrack Office Location Map"
                ></iframe>
            </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ContactPage;