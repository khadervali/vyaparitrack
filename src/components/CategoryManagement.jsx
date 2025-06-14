// src/components/CategoryManagement.jsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', description: 'Electronic devices and accessories' },
    { id: 2, name: 'Clothing', description: 'Apparel and fashion items' },
    { id: 3, name: 'Groceries', description: 'Food and household items' }
  ]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newCategory.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }
    
    // Add category locally (no API call)
    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    setCategories([...categories, { id: newId, ...newCategory }]);
    setNewCategory({ name: '', description: '' });
    
    toast({
      title: "Success",
      description: "Category added successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              name="description"
              value={newCategory.description}
              onChange={handleInputChange}
              placeholder="Enter category description"
            />
          </div>
          <Button type="submit">Add Category</Button>
        </form>
      </div>
      
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        {categories.length > 0 ? (
          <div className="grid gap-2">
            {categories.map(category => (
              <div key={category.id} className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No categories found. Add your first category above.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
