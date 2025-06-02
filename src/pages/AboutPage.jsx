import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Lightbulb, Building2 } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-[calc(100vh-150px)] py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold text-primary mb-4"
        >
          About VyapariTrack
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-foreground/80 max-w-2xl mx-auto"
        >
          Empowering businesses with smart, streamlined inventory and GST management solutions. Discover our journey, mission, and the values that drive us.
        </motion.p>
      </header>

      <div className="container mx-auto">
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                className="rounded-xl shadow-2xl w-full h-auto object-cover"
                alt="Team collaborating on VyapariTrack software"
               src="https://images.unsplash.com/photo-1692914274476-0e6920cc80cf" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
              <p className="text-foreground/80 leading-relaxed">
                VyapariTrack was born from a simple observation: many businesses, especially small to medium enterprises in India, struggle with managing their inventory efficiently and navigating complex GST regulations. Founded by Khader Vali, a visionary with a passion for technology and business solutions, VyapariTrack aims to bridge this gap. We set out to create a powerful, yet user-friendly SaaS platform that simplifies these critical operations, allowing businesses to focus on what they do best – growth.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Our journey began with extensive research and collaboration with business owners to understand their core pain points. This user-centric approach remains at the heart of our development process, ensuring VyapariTrack is not just a tool, but a true partner in business success.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="mb-16 py-12 bg-card/50 dark:bg-card/30 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 md:order-2"
            >
              <h2 className="text-3xl font-bold text-foreground">Our Mission & Vision</h2>
              <div className="flex items-start space-x-4">
                <Target className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Mission</h3>
                  <p className="text-foreground/80">To provide an intuitive, comprehensive, and affordable inventory and GST management platform that empowers businesses of all sizes to achieve operational excellence and compliance with ease.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Lightbulb className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Vision</h3>
                  <p className="text-foreground/80">To be the leading SaaS provider for business management solutions in India and beyond, recognized for innovation, reliability, and unwavering commitment to customer success.</p>
                </div>
              </div>
            </motion.div>
             <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="md:order-1"
            >
              <img 
                className="rounded-xl shadow-2xl w-full h-auto object-cover"
                alt="Abstract representation of mission and vision"
               src="https://images.unsplash.com/photo-1614717295997-5959e57472e5" />
            </motion.div>
          </div>
        </section>

        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-10">Why Choose VyapariTrack?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Users className="w-10 h-10 text-primary" />, title: "User-Centric Design", description: "Built with your needs in mind for an intuitive experience." },
              { icon: <Building2 className="w-10 h-10 text-primary" />, title: "Comprehensive Features", description: "All-in-one solution for inventory, sales, purchases, and GST." },
              { icon: <Target className="w-10 h-10 text-primary" />, title: "Scalability", description: "Grows with your business, from startup to enterprise." },
              { icon: <Lightbulb className="w-10 h-10 text-primary" />, title: "Indian GST Expertise", description: "Stay compliant with built-in GST features tailored for India." },
              { icon: <Users className="w-10 h-10 text-primary" />, title: "Dedicated Support", description: "We're here to help you succeed every step of the way." },
              { icon: <Building2 className="w-10 h-10 text-primary" />, title: "Secure & Reliable", description: "Your data is safe with our robust security measures." },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="p-6 rounded-xl shadow-lg bg-card dark:bg-card/80 glassmorphism"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/80 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        <section className="text-center py-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Meet the Founder</h2>
            <div className="max-w-sm mx-auto bg-card dark:bg-card/70 p-6 rounded-lg shadow-xl glassmorphism">
                <img 
                    className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md"
                    alt="Khader Vali, Founder of VyapariTrack"
                 src="https://images.unsplash.com/photo-1544212408-c711b7c19b92" />
                <h3 className="text-xl font-bold text-primary">Khader Vali</h3>
                <p className="text-foreground/80 mt-2">
                    "My goal with VyapariTrack is to empower Indian businesses with the technology they need to thrive in a competitive market. We are committed to continuous innovation and customer satisfaction."
                </p>
            </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;