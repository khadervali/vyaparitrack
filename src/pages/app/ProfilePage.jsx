import React from 'react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold gradient-text">Profile</h1>
      </div>
      
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
        <p className="text-muted-foreground">
          The profile management module is currently under development.
        </p>
      </div>
    </motion.div>
  );
};

export default ProfilePage;