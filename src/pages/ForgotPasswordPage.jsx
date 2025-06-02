import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { MailCheck, ArrowLeft } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call for password reset link
    setTimeout(() => {
      // In a real app, you would call your backend here to send a reset email.
      // For now, we'll just simulate success.
      console.log(`Password reset link requested for: ${email}`);
      toast({
        title: "Request Sent",
        description: "If an account exists for this email, a password reset link has been sent.",
      });
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-150px)] flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/10 to-background dark:from-background dark:via-primary/5 dark:to-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-card shadow-xl rounded-lg glassmorphism"
      >
        <div className="text-center">
          <MailCheck className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-3xl font-bold text-foreground mt-4">Forgot Your Password?</h1>
          {!isSubmitted ? (
            <p className="text-muted-foreground">No worries! Enter your email address below and we'll send you a link to reset your password.</p>
          ) : (
            <p className="text-muted-foreground">Please check your email inbox (and spam folder) for the password reset link. It might take a few minutes to arrive.</p>
          )}
        </div>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/70 dark:bg-input"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <Button variant="outline" onClick={() => setIsSubmitted(false)} className="mt-4">
              Didn't receive it? Resend Link
            </Button>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground">
          <Link to="/login" className="font-semibold text-primary hover:underline inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;