import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import api from '@/lib/api';

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState(''); // Change from 'Vendor Admin'
  const [roles, setRoles] = useState([]); // Change from 'Vendor Admin'
  const { toast } = useToast();
  const navigate = useNavigate();
  const hasFetchedRoles = useRef(false);

  useEffect(() => {
    // Prevent duplicate fetch in React 18 Strict Mode
    if (hasFetchedRoles.current) return; // Prevent duplicate fetch in React 18 Strict Mode
    hasFetchedRoles.current = true;

    console.log('useEffect is running');
    const fetchRoles = async () => {

        try {
          console.log('Fetching roles from API...');
          const response = await api.get('/auth/roles'); // Use the api instance
          if (response.status < 200 || response.status >= 300) {
             // Handle non-2xx status codes if needed, though axios usually throws for 4xx/5xx
             throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setRoles(data);
        } catch (error) {
          console.error('Error fetching roles:', error);
          // Optionally show a toast or error message to the user
          toast({
            title: "Error",
            description: "Failed to load roles. Please try again later.",
            variant: "destructive",
          });
        }
      };

      fetchRoles();
    }, []); // The empty dependency array ensures this runs only once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!fullName || !email || !password || !confirmPassword) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      setIsLoading(false);
      return false;
    } else if (password !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
      setIsLoading(false);
      return false;
    } else if (password.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters long.", variant: "destructive" });
      setIsLoading(false);
      return false;
    } else if (!agreedToTerms) {
      toast({ title: "Error", description: "You must agree to the terms and conditions.", variant: "destructive" });
      setIsLoading(false);
      return;
    }
      

    try {
      console.log('Sending signup request with data:', {
        username: fullName,
        email,
        password: '***hidden***',
        role
      });
      
      const response = await api.post('/auth/signup', {
          username: fullName,
          email: email,
          password: password,
          role: role,
        });
      const data = response.data;

      if (response.ok) {
        toast({ title: "Account Created", description: data.message || "Your VyapariTrack account has been successfully created." });
        navigate('/login');
      } else {
        toast({ title: "Error", description: data.message || "Failed to create account. Please try again.", variant: "destructive" });
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({ title: "Error", description: "An error occurred during signup. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
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
          <UserPlus className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-3xl font-bold text-foreground mt-4">Create Your Account</h1>
          <p className="text-muted-foreground">Join VyapariTrack and streamline your business.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="bg-background/70 dark:bg-input mt-1" />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-background/70 dark:bg-input mt-1" />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-background/70 dark:bg-input border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required // Add required attribute if needed
            >
              <option value="">Select a role</option> {/* Add a default option */}
              {roles.map((roleOption) => (
                <option key={roleOption.id} value={roleOption.name}>
                  {roleOption.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-background/70 dark:bg-input" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground hover:text-primary" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
            </div>
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative mt-1">
              <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="bg-background/70 dark:bg-input" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground hover:text-primary" aria-label={showConfirmPassword ? "Hide password" : "Show password"}>{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} />
            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground">
              I agree to the <Link to="/terms" className="text-primary hover:underline">Terms and Conditions</Link>
            </label>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;