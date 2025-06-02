import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Database, Lock, FileKey } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="min-h-[calc(100vh-150px)] py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block p-4 bg-primary/10 rounded-full mb-6"
        >
          <Shield className="h-12 w-12 text-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-primary mb-4"
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-foreground/80 max-w-2xl mx-auto"
        >
          Your privacy is important to us. This Privacy Policy explains how VyapariTrack collects, uses, and protects your personal information in compliance with Indian laws, including the Digital Personal Data Protection Act (DPDPA).
        </motion.p>
         <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-muted-foreground mt-2"
        >
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </motion.p>
      </header>

      <div className="container mx-auto max-w-4xl space-y-10">
        <motion.section
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
            <FileKey className="h-6 w-6 mr-3 text-primary" /> 1. Information We Collect
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-2">
            We collect information to provide and improve our Service. The types of information we may collect include:
          </p>
          <ul className="list-disc list-inside text-foreground/80 space-y-1 pl-4">
            <li><strong>Personal Identification Information:</strong> Name, email address, phone number, business name, GSTIN, and other contact details when you register for an account or use our services.</li>
            <li><strong>Vendor Data:</strong> Information related to your inventory, products, services, sales, purchases, customers, suppliers, and financial transactions, including GST details, HSN/SAC codes, and invoice data that you input or upload to the Service.</li>
            <li><strong>Usage Data:</strong> Information on how the Service is accessed and used (e.g., IP address, browser type, browser version, pages visited, time and date of visit, time spent on pages, and other diagnostic data).</li>
            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information.</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
            <Database className="h-6 w-6 mr-3 text-primary" /> 2. How We Use Your Information
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-2">
            VyapariTrack uses the collected data for various purposes:
          </p>
          <ul className="list-disc list-inside text-foreground/80 space-y-1 pl-4">
            <li>To provide and maintain our Service, including processing transactions, managing inventory, and generating GST-compliant invoices and reports.</li>
            <li>To manage your account and provide customer support.</li>
            <li>To notify you about changes to our Service or your subscription.</li>
            <li>To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li>
            <li>To improve our Service, including through monitoring usage and analyzing trends.</li>
            <li>For billing, account management, and other administrative matters.</li>
            <li>To comply with legal obligations, such as GST reporting and DPDPA requirements.</li>
            <li>To send periodic emails regarding your order or other products and services, if you have opted in to receive them.</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
            <Lock className="h-6 w-6 mr-3 text-primary" /> 3. Data Security and Storage
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-2">
            The security of your data is critical to us. We implement a variety of security measures, including data encryption and secure session handling, to maintain the safety of your personal information and vendor data when you enter, submit, or access your information.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-2">
            Your vendor data is siloed, meaning it is isolated from other vendors' data. We use reputable third-party cloud services (such as Supabase, if you choose to integrate) for data storage, which adhere to high security standards. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy and to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws, such as GST record-keeping requirements), resolve disputes, and enforce our legal agreements and policies.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Sharing and Disclosure</h2>
           <p className="text-foreground/80 leading-relaxed mb-2">
            We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information or sensitive Vendor Data unless we provide users with advance notice or as described below:
          </p>
           <ul className="list-disc list-inside text-foreground/80 space-y-1 pl-4">
            <li><strong>Service Providers:</strong> We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services (e.g., payment processing, data storage, analytics) or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</li>
            <li><strong>Legal Requirements:</strong> VyapariTrack may disclose your Personal Data in the good faith belief that such action is necessary to comply with a legal obligation (such as GST authorities or requirements under DPDPA), protect and defend the rights or property of VyapariTrack, prevent or investigate possible wrongdoing in connection with the Service, protect the personal safety of users of the Service or the public, or protect against legal liability.</li>
            <li><strong>Business Transfers:</strong> If VyapariTrack is involved in a merger, acquisition or asset sale, your Personal Data may be transferred. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your Data Protection Rights (DPDPA Compliance)</h2>
          <p className="text-foreground/80 leading-relaxed mb-2">
            VyapariTrack is committed to complying with the Indian Digital Personal Data Protection Act (DPDPA). As a user, you have certain rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside text-foreground/80 space-y-1 pl-4">
            <li><strong>Right to Access:</strong> You have the right to request copies of your personal data.</li>
            <li><strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
            <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>Right to Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            <li><strong>Right to Withdraw Consent:</strong> Where we rely on your consent to process personal data, you have the right to withdraw consent at any time.</li>
            <li><strong>Right to Grievance Redressal:</strong> You have the right to lodge a complaint with us regarding any DPDPA non-compliance.</li>
          </ul>
          <p className="text-foreground/80 leading-relaxed mt-2">
            To exercise any of these rights, please contact us at <a href="mailto:privacy@vyaparitrack.com" className="text-primary hover:underline">privacy@vyaparitrack.com</a>. We will respond to your request within a reasonable timeframe as stipulated by the DPDPA.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. Children's Privacy</h2>
          <p className="text-foreground/80 leading-relaxed">
            Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Changes to This Privacy Policy</h2>
          <p className="text-foreground/80 leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "last updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
          <p className="text-foreground/80 leading-relaxed">
            If you have any questions about this Privacy Policy or our data protection practices, please contact our Data Protection Officer at:
            <br />
            Email: <a href="mailto:privacy@vyaparitrack.com" className="text-primary hover:underline">privacy@vyaparitrack.com</a>
            <br />
            Address: [Your Company Address, if applicable, or c/o Khader Vali]
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default PrivacyPage;