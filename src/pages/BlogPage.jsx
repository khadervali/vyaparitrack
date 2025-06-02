import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BlogPostCard = ({ title, date, excerpt, imageSrc, slug, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay }}
    className="bg-card dark:bg-card/80 rounded-lg shadow-xl overflow-hidden glassmorphism flex flex-col"
  >
    <img  class="w-full h-48 object-cover" alt={title} src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <div className="flex items-center text-sm text-muted-foreground mb-3">
        <Calendar className="w-4 h-4 mr-2" /> {date}
      </div>
      <p className="text-foreground/80 text-sm leading-relaxed mb-4 flex-grow">{excerpt}</p>
      <Link to={`/blog/${slug}`} className="inline-flex items-center text-sm font-medium text-primary hover:underline self-start">
        Read More <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  </motion.div>
);

const BlogPage = () => {
  const blogPosts = [
    {
      title: "5 Ways VyapariTrack Streamlines GST Compliance for Small Businesses",
      date: "May 20, 2025",
      excerpt: "Navigating GST can be complex. Discover how VyapariTrack simplifies tax calculations, invoice generation, and report filing, saving you time and reducing errors.",
      imageSrc: "GST compliance and VyapariTrack interface",
      slug: "vyaparitrack-gst-compliance",
      delay: 0.1,
    },
    {
      title: "The Power of Multi-Vendor Inventory Management: A Game Changer",
      date: "May 15, 2025",
      excerpt: "Learn how a multi-vendor system like VyapariTrack can provide unparalleled control and efficiency for businesses managing multiple product lines or suppliers.",
      imageSrc: "Abstract multi-vendor inventory concept",
      slug: "multi-vendor-inventory-power",
      delay: 0.2,
    },
    {
      title: "Maximizing Efficiency with Barcode Scanning in VyapariTrack",
      date: "May 10, 2025",
      excerpt: "Explore the benefits of integrating barcode scanning into your inventory process with VyapariTrack, from faster stocktakes to error reduction.",
      imageSrc: "Barcode scanner with VyapariTrack app",
      slug: "barcode-scanning-efficiency",
      delay: 0.3,
    },
     {
      title: "Understanding White-Labeling: Brand Your VyapariTrack Experience",
      date: "May 05, 2025",
      excerpt: "Dive into how VyapariTrack's white-labeling features allow you to present a fully branded inventory solution to your clients or internal teams.",
      imageSrc: "White-label branding options",
      slug: "vyaparitrack-white-labeling",
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
          <Feather className="h-12 w-12 text-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-primary mb-4"
        >
          VyapariTrack Blog
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-foreground/80 max-w-2xl mx-auto"
        >
          Insights, tips, and updates on inventory management, GST compliance, and getting the most out of VyapariTrack.
        </motion.p>
      </header>

      <div className="container mx-auto max-w-5xl">
        {blogPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-10">
            {blogPosts.map((post) => (
              <BlogPostCard
                key={post.slug}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                imageSrc={post.imageSrc}
                slug={post.slug}
                delay={post.delay}
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
            No blog posts yet. Check back soon for updates and insights!
          </motion.p>
        )}
        
        {blogPosts.length > 0 && (
            <div className="text-center mt-16">
                <Button variant="outline" size="lg">
                    Load More Posts
                </Button>
            </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;