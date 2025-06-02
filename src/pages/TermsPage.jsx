import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, UserCheck, AlertTriangle } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="min-h-[calc(100vh-150px)] py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block p-4 bg-primary/10 rounded-full mb-6"
        >
          <FileText className="h-12 w-12 text-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-primary mb-4"
        >
          Terms of Service
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-foreground/80 max-w-2xl mx-auto"
        >
          Please read these Terms of Service carefully before using VyapariTrack. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
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
            <UserCheck className="h-6 w-6 mr-3 text-primary" /> 1. Acceptance of Terms
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            By accessing or using VyapariTrack ("Service"), operated by Khader Vali ("Us", "We", or "Our"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
            <ShieldCheck className="h-6 w-6 mr-3 text-primary" /> 2. Accounts and Vendor Responsibilities
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-2">
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-2">
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Each vendor is responsible for the accuracy and legality of the data they input into the system, including but not limited to product information, sales data, purchase data, and GST-related information. VyapariTrack is a platform provider and is not responsible for the content or accuracy of vendor data.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
            <AlertTriangle className="h-6 w-6 mr-3 text-destructive" /> 3. Service Use and Restrictions
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-2">
            The Service provides multi-vendor SaaS inventory management, including inventory tracking, sales and purchase management, and GST-compliant billing. You agree not to use the Service for any unlawful purpose or in any way that interrupts, damages, or impairs the service.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-2">
            You may not decompile, reverse engineer, or otherwise attempt to obtain the source code of the Service. You are responsible for ensuring that your use of the Service complies with all applicable local, state, national, and international laws and regulations, including Indian GST laws and the Digital Personal Data Protection Act (DPDPA).
          </p>
           <p className="text-foreground/80 leading-relaxed">
            White-labeling features are provided as part of certain subscription plans. Misuse of white-labeling features, such as impersonating another brand without authorization, is strictly prohibited.
          </p>
        </motion.section>

         <motion.section
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
             4. Subscriptions and Billing
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-2">
            Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a yearly or half-yearly basis, depending on the type of subscription plan you select when purchasing a Subscription.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-2">
            VyapariTrack offers a freemium trial, the duration of which is determined by the Super Admin. Subscriptions are renewed manually. We will provide you with reasonable notice prior to the expiry of your subscription. Failure to renew will result in restricted access to the Service.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            All fees are exclusive of all taxes, levies, or duties imposed by taxing authorities, and you shall be responsible for payment of all such taxes, levies, or duties, including GST.
          </p>
        </motion.section>


        <motion.section
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. Intellectual Property</h2>
          <p className="text-foreground/80 leading-relaxed">
            The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Khader Vali and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Khader Vali.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. Termination</h2>
          <p className="text-foreground/80 leading-relaxed">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation Of Liability</h2>
          <p className="text-foreground/80 leading-relaxed">
            In no event shall Khader Vali, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">8. Governing Law</h2>
          <p className="text-foreground/80 leading-relaxed">
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to Terms</h2>
          <p className="text-foreground/80 leading-relaxed">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-card dark:bg-card/80 rounded-lg shadow-lg glassmorphism"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact Us</h2>
          <p className="text-foreground/80 leading-relaxed">
            If you have any questions about these Terms, please contact us at: <a href="mailto:support@vyaparitrack.com" className="text-primary hover:underline">support@vyaparitrack.com</a>
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default TermsPage;