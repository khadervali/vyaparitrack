import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Edit3, Save, Building, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    company: '',
    role: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Get user data from token
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Parse token payload
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const userId = tokenPayload.user.id;
        const userRole = localStorage.getItem('userRole');
        
        // In a real app, you would fetch user details from API
        // For now, we'll use mock data based on token info
        const userData = {
          id: userId,
          username: tokenPayload.user.username || 'User',
          email: tokenPayload.user.email || 'user@example.com',
          phone: '+91 98765 43210', // Mock data
          company: 'VyapariTrack Inc.', // Mock data
          role: userRole || 'Vendor Staff'
        };
        
        setCurrentUser(userData);
        setFormData({
          username: userData.username,
          email: userData.email,
          phone: userData.phone || '',
          company: userData.company || '',
          role: userData.role
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error",
          description: "Failed to load user profile data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, toast]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, you would make an API call here
      // For now, we'll simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      // Update local user data
      const updatedUser = { ...currentUser, ...formData };
      setCurrentUser(updatedUser);
      
      toast({ 
        title: "Profile Updated", 
        description: "Your profile details have been saved successfully." 
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({ 
        title: "Error", 
        description: "Could not update profile. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast({ 
        title: "Error", 
        description: "New passwords do not match.", 
        variant: "destructive" 
      });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast({ 
        title: "Error", 
        description: "New password must be at least 6 characters.", 
        variant: "destructive" 
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, you would make an API call here
      // For now, we'll simulate a successful password change
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      toast({ 
        title: "Password Changed", 
        description: "Your password has been updated successfully." 
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (error) {
      console.error('Error changing password:', error);
      toast({ 
        title: "Error", 
        description: "Could not change password. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg text-muted-foreground">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit3 className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleProfileUpdate} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>

      <Card className="shadow-lg glassmorphism">
        <CardHeader>
          <CardTitle className="text-xl">Personal Information</CardTitle>
          <CardDescription>View and update your personal details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="username" className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />Username
                </Label>
                <Input 
                  id="username" 
                  value={formData.username} 
                  onChange={handleInputChange} 
                  disabled={!isEditing || loading} 
                  className="mt-1 bg-background/70 dark:bg-input disabled:opacity-70" 
                />
              </div>
              <div>
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />Email Address
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  disabled={!isEditing || loading} 
                  className="mt-1 bg-background/70 dark:bg-input disabled:opacity-70" 
                />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />Phone Number
                </Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  disabled={!isEditing || loading} 
                  placeholder="e.g., +91 98765 43210" 
                  className="mt-1 bg-background/70 dark:bg-input disabled:opacity-70" 
                />
              </div>
              <div>
                <Label htmlFor="company" className="flex items-center">
                  <Building className="mr-2 h-4 w-4 text-muted-foreground" />Company
                </Label>
                <Input 
                  id="company" 
                  value={formData.company} 
                  onChange={handleInputChange} 
                  disabled={!isEditing || loading} 
                  className="mt-1 bg-background/70 dark:bg-input disabled:opacity-70" 
                />
              </div>
              <div>
                <Label htmlFor="role" className="flex items-center">
                  <Shield className="mr-2 h-4 w-4 text-muted-foreground" />Role
                </Label>
                <Input 
                  id="role" 
                  value={formData.role} 
                  disabled={true} 
                  className="mt-1 bg-background/70 dark:bg-input disabled:opacity-70" 
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-lg glassmorphism">
        <CardHeader>
          <CardTitle className="text-xl">Change Password</CardTitle>
          <CardDescription>Update your account password for better security.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div>
              <Label htmlFor="currentPassword" className="flex items-center">
                <Lock className="mr-2 h-4 w-4 text-muted-foreground" />Current Password
              </Label>
              <Input 
                id="currentPassword" 
                type="password" 
                value={passwordData.currentPassword} 
                onChange={handlePasswordChange} 
                required 
                disabled={loading}
                className="mt-1 bg-background/70 dark:bg-input" 
              />
            </div>
            <div>
              <Label htmlFor="newPassword" className="flex items-center">
                <Lock className="mr-2 h-4 w-4 text-muted-foreground" />New Password
              </Label>
              <Input 
                id="newPassword" 
                type="password" 
                value={passwordData.newPassword} 
                onChange={handlePasswordChange} 
                required 
                disabled={loading}
                className="mt-1 bg-background/70 dark:bg-input" 
              />
            </div>
            <div>
              <Label htmlFor="confirmNewPassword" className="flex items-center">
                <Lock className="mr-2 h-4 w-4 text-muted-foreground" />Confirm New Password
              </Label>
              <Input 
                id="confirmNewPassword" 
                type="password" 
                value={passwordData.confirmNewPassword} 
                onChange={handlePasswordChange} 
                required 
                disabled={loading}
                className="mt-1 bg-background/70 dark:bg-input" 
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? 'Changing Password...' : 'Change Password'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg glassmorphism">
        <CardHeader>
          <CardTitle className="text-xl">Account Preferences</CardTitle>
          <CardDescription>Manage your account settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Notifications</h3>
            <p className="text-muted-foreground mb-4">Configure how you receive notifications from the system.</p>
            <div className="space-x-2">
              <Button variant="outline" disabled>Email Notifications</Button>
              <Button variant="outline" disabled>In-App Notifications</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Two-Factor Authentication (2FA)</h3>
            <p className="text-muted-foreground mb-4">Enhance your account security by enabling 2FA.</p>
            <Button variant="outline" disabled>Enable 2FA</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserProfilePage;