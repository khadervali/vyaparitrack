import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Lightbulb, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const JobOpeningCard = ({ title, location, type, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay }}
    className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-xl glassmorphism"
  >
    <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
    <div className="flex items-center text-sm text-muted-foreground mb-3">
      <MapPin className="w-4 h-4 mr-2" /> {location}
      <span className="mx-2">|</span>
      <Briefcase className="w-4 h-4 mr-2" /> {type}
    </div>
    <p className="text-foreground/80 mb-4 text-sm leading-relaxed">{description}</p>
    <Button variant="outline" size="sm" asChild>
      <a href={`mailto:careers@vyaparitrack.com?subject=Application for ${title}`}>Apply Now</a>
    </Button>
  </motion.div>
);

const CareersPage = () => {
  const jobOpenings = [
    {
      title: "Senior Frontend Developer (React)",
      location: "Remote / Bangalore",
      type: "Full-time",
      description: "We are looking for an experienced React developer to join our core team. You will be responsible for developing and maintaining key features of the VyapariTrack platform, ensuring high performance and responsiveness.",
      delay: 0.1,
    },
    {
      title: "Backend Developer (Node.js/Supabase)",
      location: "Remote / Bangalore",
      type: "Full-time",
      description: "Seeking a skilled backend developer proficient in Node.js and ideally with Supabase experience. You'll work on building robust APIs, managing database schemas, and ensuring platform scalability.",
      delay: 0.2,
    },
    {
      title: "UI/UX Designer",
      location: "Bangalore (Hybrid)",
      type: "Full-time",
      description: "Join us to shape the user experience of VyapariTrack. You'll be creating intuitive interfaces, conducting user research, and working closely with developers to implement designs.",
      delay: 0.3,
    },
    {
      title: "Customer Success Manager",
      location: "Remote",
      type: "Full-time",
      description: "Help our vendors succeed! You'll be responsible for onboarding new users, providing support, and gathering feedback to improve our platform.",
      delay: 0.4,
    }
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
          <Briefcase className="h-12 w-12 text-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-primary mb-4"
        >
          Join Our Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-foreground/80 max-w-2xl mx-auto"
        >
          At VyapariTrack, we're building the future of inventory management. We're looking for passionate, innovative individuals to help us achieve our mission. Explore our open positions and find your place with us.
        </motion.p>
      </header>

      <div className="container mx-auto max-w-4xl">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Why Work With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <Lightbulb className="w-10 h-10 text-primary" />, title: "Innovate", description: "Work on cutting-edge technology and solve real-world problems for businesses." },
              { icon: <Users className="w-10 h-10 text-primary" />, title: "Collaborate", description: "Be part of a supportive and dynamic team that values diverse perspectives." },
              { icon: <Briefcase className="w-10 h-10 text-primary" />, title: "Grow", description: "Opportunities for professional development and career advancement in a fast-growing company." },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl shadow-lg bg-card dark:bg-card/80 glassmorphism"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-foreground/80 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Current Openings</h2>
          {jobOpenings.length > 0 ? (
            <div className="space-y-8">
              {jobOpenings.map((job) => (
                <JobOpeningCard
                  key={job.title}
                  title={job.title}
                  location={job.location}
                  type={job.type}
                  description={job.description}
                  delay={job.delay}
                />
              ))}
            </div>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-lg text-muted-foreground p-8 bg-card dark:bg-card/80 rounded-lg shadow-md glassmorphism"
            >
              We don't have any open positions at the moment, but we're always interested in hearing from talented individuals. Feel free to send your resume to <a href="mailto:careers@vyaparitrack.com" className="text-primary hover:underline">careers@vyaparitrack.com</a>.
            </motion.p>
          )}
        </section>
        
        <section className="text-center mt-20 py-10">
            <p className="text-lg text-foreground/80 max-w-xl mx-auto mb-6">
                Can't find a role that fits? We're always on the lookout for exceptional talent.
            </p>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="mailto:careers@vyaparitrack.com?subject=General Application">Submit Your Resume</a>
            </Button>
        </section>
      </div>
    </div>
  );
};

export default CareersPage;