import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Palette, FileText as FileTextIcon, Shield, Building, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const SettingsSection = ({ title, description, children }) => (
  <Card className="shadow-md glassmorphism">
    <CardHeader>
      <CardTitle className="text-xl">{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'Account', icon: <User className="mr-2 h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="mr-2 h-5 w-5" /> },
    { id: 'branding', label: 'Branding', icon: <Palette className="mr-2 h-5 w-5" /> },
    { id: 'templates', label: 'Templates', icon: <FileTextIcon className="mr-2 h-5 w-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="mr-2 h-5 w-5" /> },
    { id: 'branches', label: 'Branches', icon: <Building className="mr-2 h-5 w-5" /> },
    { id: 'staff', label: 'Staff Management', icon: <Users className="mr-2 h-5 w-5" /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <SettingsSection title="Vendor Account Settings" description="Manage your primary vendor account details.">
            <form className="space-y-6">
              <div>
                <Label htmlFor="vendorName">Vendor/Business Name</Label>
                <Input id="vendorName" defaultValue="My Awesome Store" className="mt-1 bg-background/70 dark:bg-input" />
              </div>
              <div>
                <Label htmlFor="vendorEmail">Contact Email</Label>
                <Input id="vendorEmail" type="email" defaultValue="contact@mystore.com" className="mt-1 bg-background/70 dark:bg-input" />
              </div>
              <div>
                <Label htmlFor="vendorPhone">Phone Number</Label>
                <Input id="vendorPhone" type="tel" defaultValue="+91-9876543210" className="mt-1 bg-background/70 dark:bg-input" />
              </div>
              <div>
                <Label htmlFor="gstin">GSTIN</Label>
                <Input id="gstin" defaultValue="29ABCDE1234F1Z5" className="mt-1 bg-background/70 dark:bg-input" />
              </div>
              <Button type="submit">Save Account Changes</Button>
            </form>
          </SettingsSection>
        );
      case 'notifications':
        return (
          <SettingsSection title="Notification Preferences" description="Control how you receive alerts and updates.">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md bg-secondary/30 dark:bg-secondary/20">
                <Label htmlFor="emailNotificationsStock">Email for Low Stock Alerts</Label>
                <Checkbox id="emailNotificationsStock" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 rounded-md bg-secondary/30 dark:bg-secondary/20">
                <Label htmlFor="inAppNotificationsSales">In-App for New Sales</Label>
                <Checkbox id="inAppNotificationsSales" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 rounded-md bg-secondary/30 dark:bg-secondary/20">
                <Label htmlFor="whatsappNotificationsInvoice">WhatsApp for Invoice Reminders</Label>
                <Checkbox id="whatsappNotificationsInvoice" />
              </div>
              <Button>Save Notification Settings</Button>
            </div>
          </SettingsSection>
        );
      case 'branding':
         return (
          <SettingsSection title="Branding & White-Labeling" description="Customize the look and feel for your vendors.">
             <form className="space-y-6">
                <div>
                    <Label htmlFor="logoUpload">Upload Logo</Label>
                    <Input id="logoUpload" type="file" className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                    <p className="text-xs text-muted-foreground mt-1">Recommended size: 200x80px, PNG or JPG.</p>
                </div>
                 <div>
                    <Label htmlFor="primaryColor">Primary Brand Color</Label>
                    <Input id="primaryColor" type="color" defaultValue="#2563EB" className="mt-1 h-10 w-full p-1" />
                </div>
                <div>
                    <Label htmlFor="customDomain">Custom Domain (e.g., billing.yourshop.com)</Label>
                    <Input id="customDomain" placeholder="billing.yourshop.com" className="mt-1 bg-background/70 dark:bg-input" />
                     <p className="text-xs text-muted-foreground mt-1">Requires DNS configuration. Contact support for assistance.</p>
                </div>
                <Button type="submit">Save Branding</Button>
             </form>
          </SettingsSection>
        );
      // Add more cases for other tabs
      default:
        return <SettingsSection title={tabs.find(t => t.id === activeTab)?.label || "Settings"}><p className="text-muted-foreground">Content for {tabs.find(t => t.id === activeTab)?.label} will be here.</p></SettingsSection>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-1/4 lg:w-1/5">
          <Card className="p-4 shadow-md glassmorphism">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'secondary' : 'ghost'}
                  className="w-full justify-start text-left"
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  {tab.label}
                </Button>
              ))}
            </nav>
          </Card>
        </aside>

        <main className="flex-1 md:w-3/4 lg:w-4/5">
          {renderTabContent()}
        </main>
      </div>
    </motion.div>
  );
};

export default SettingsPage;