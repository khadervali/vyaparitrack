import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tag, PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const { toast } = useToast();

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "Failed to load categories.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle add category
  const handleAddCategory = async () => {
    try {
      await api.post('/categories', newCategory);
      toast({
        title: "Success",
        description: "Category added successfully.",
      });
      setIsAddDialogOpen(false);
      setNewCategory({ name: '', description: '' });
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        title: "Error",
        description: "Failed to add category.",
        variant: "destructive",
      });
    }
  };

  // Handle edit category
  const handleEditCategory = async () => {
    try {
      await api.put(`/categories/${editingCategory.id}`, editingCategory);
      toast({
        title: "Success",
        description: "Category updated successfully.",
      });
      setIsEditDialogOpen(false);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      toast({
        title: "Error",
        description: "Failed to update category.",
        variant: "destructive",
      });
    }
  };

  // Handle delete category
  const handleDeleteCategory = async () => {
    try {
      await api.delete(`/categories/${deletingCategory.id}`);
      toast({
        title: "Success",
        description: "Category deleted successfully.",
      });
      setIsDeleteDialogOpen(false);
      setDeletingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Error",
        description: "Failed to delete category.",
        variant: "destructive",
      });
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Product Categories</h1>
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground" 
          onClick={() => setIsAddDialogOpen(true)}
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Category
        </Button>
      </div>

      <Card className="shadow-lg glassmorphism">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Organize your products with categories</CardDescription>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search categories..." 
                className="pl-10 bg-background/70 dark:bg-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-foreground">
              <thead className="text-xs text-muted-foreground uppercase bg-accent/50 dark:bg-accent/20">
                <tr>
                  <th scope="col" className="px-6 py-3">Category Name</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3 text-right">Products</th>
                  <th scope="col" className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-muted-foreground">Loading categories...</td>
                  </tr>
                ) : filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <tr key={category.id} className="border-b dark:border-border/50 hover:bg-accent/30 dark:hover:bg-accent/10">
                      <td className="px-6 py-4 font-medium whitespace-nowrap">
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 mr-2 text-primary" />
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">{category.description || 'No description'}</td>
                      <td className="px-6 py-4 text-right">{category.productCount || 0}</td>
                      <td className="px-6 py-4 text-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary hover:text-primary/80"
                          onClick={() => {
                            setEditingCategory(category);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive/80"
                          onClick={() => {
                            setDeletingCategory(category);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-muted-foreground">
                      {searchTerm ? 'No categories match your search.' : 'No categories found. Add your first one!'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new category to organize your products.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category details.
            </DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="edit-description"
                  value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Category Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {deletingCategory && (
            <p className="py-4">
              You are about to delete the category: <strong>{deletingCategory.name}</strong>
            </p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default CategoriesPage;