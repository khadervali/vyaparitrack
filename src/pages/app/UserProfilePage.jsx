import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Edit3, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const UserProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  const { toast } = useToast();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('vyaparitrack_currentUser'));
    if (user) {
      setCurrentUser(user);
      setFormData({ fullName: user.fullName, email: user.email, phone: user.phone || '' });
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('vyaparitrack_users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...formData };
      localStorage.setItem('vyaparitrack_users', JSON.stringify(users));
      localStorage.setItem('vyaparitrack_currentUser', JSON.stringify(users[userIndex]));
      setCurrentUser(users[userIndex]);
      toast({ title: "Profile Updated", description: "Your profile details have been saved." });
      setIsEditing(false);
    } else {
      toast({ title: "Error", description: "Could not update profile.", variant: "destructive" });
    }
  };
  
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast({ title: "Error", description: "New passwords do not match.", variant: "destructive" });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast({ title: "Error", description: "New password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('vyaparitrack_users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id && u.password === passwordData.currentPassword);
    if (userIndex !== -1) {
      users[userIndex].password = passwordData.newPassword;
      localStorage.setItem('vyaparitrack_users', JSON.stringify(users));
      localStorage.setItem('vyaparitrack_currentUser', JSON.stringify(users[userIndex])); // Update current user if password changes affect session
      toast({ title: "Password Changed", description: "Your password has been updated successfully." });
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } else {
      toast({ title: "Error", description: "Incorrect current password.", variant: "destructive" });
    }
  };


  if (!currentUser) return <p>Loading profile...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit3 className="mr-2 h-4 w-4" />}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
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
                <Label htmlFor="fullName" className="flex items-center"><User className="mr-2 h-4 w-4 text-muted-foreground" />Full Name</Label>
                <Input id="fullName" value={formData.fullName} onChange={handleInputChange} disabled={!isEditing} className="mt-1 bg-background/70 dark:bg-input disabled:opacity-70" />
              </div>
              <div>
                <Label htmlFor="email" className="flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground" />Email Address</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing} className="mt-1 bg-background/70 dark:bg-input disabled:opacity-70" />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center"><Phone className="mr-2 h-4 w-4 text-muted-foreground" />Phone Number (Optional)</Label>
                <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} disabled={!isEditing} placeholder="e.g., +91 XXXXX XXXXX" className="mt-1 bg-background/70 dark:bg-input disabled:opacity-70" />
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end">
                <Button type="submit">Save Profile</Button>
              </div>
            )}
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
              <Label htmlFor="currentPassword" className="flex items-center"><Lock className="mr-2 h-4 w-4 text-muted-foreground" />Current Password</Label>
              <Input id="currentPassword" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} required className="mt-1 bg-background/70 dark:bg-input" />
            </div>
            <div>
              <Label htmlFor="newPassword" className="flex items-center"><Lock className="mr-2 h-4 w-4 text-muted-foreground" />New Password</Label>
              <Input id="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} required className="mt-1 bg-background/70 dark:bg-input" />
            </div>
            <div>
              <Label htmlFor="confirmNewPassword" className="flex items-center"><Lock className="mr-2 h-4 w-4 text-muted-foreground" />Confirm New Password</Label>
              <Input id="confirmNewPassword" type="password" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} required className="mt-1 bg-background/70 dark:bg-input" />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Change Password</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg glassmorphism">
        <CardHeader>
          <CardTitle className="text-xl">Two-Factor Authentication (2FA)</CardTitle>
          <CardDescription>Enhance your account security by enabling 2FA. (Coming Soon)</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This feature will allow you to add an extra layer of security to your account using an authenticator app or SMS codes.</p>
            <Button variant="outline" className="mt-4" disabled>Enable 2FA (Soon)</Button>
        </CardContent>
      </Card>

    </motion.div>
  );
};

export default UserProfilePage;