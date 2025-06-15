import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Pencil, Trash2, AlertCircle } from 'lucide-react';
import DataTable from '@/components/ui/data-table';
import api from '@/lib/api';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');
      setCategories(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
      // Use mock data for development
      setCategories([
        { id: 1, name: 'Electronics', description: 'Electronic devices and accessories' },
        { id: 2, name: 'Clothing', description: 'Apparel and fashion items' },
        { id: 3, name: 'Groceries', description: 'Food and household items' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, [name]: value });
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const categoryData = editingCategory || newCategory;
    
    if (!categoryData.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (editingCategory) {
        // Update existing category
        await api.put(`/categories/${editingCategory.id}`, categoryData);
        toast({
          title: "Success",
          description: "Category updated successfully",
        });
        setEditingCategory(null);
      } else {
        // Create new category
        await api.post('/categories', categoryData);
        toast({
          title: "Success",
          description: "Category added successfully",
        });
        setNewCategory({ name: '', description: '' });
      }
      
      // Refresh categories list
      fetchCategories();
    } catch (err) {
      console.error('Error saving category:', err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to save category",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setNewCategory({ name: '', description: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }
    
    try {
      await api.delete(`/categories/${id}`);
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setNewCategory({ name: '', description: '' });
  };

  if (loading && !categories.length) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">
          {editingCategory ? 'Edit Category' : 'Add New Category'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              name="name"
              value={editingCategory ? editingCategory.name : newCategory.name}
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
              value={editingCategory ? editingCategory.description : newCategory.description}
              onChange={handleInputChange}
              placeholder="Enter category description"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit">
              {editingCategory ? 'Update Category' : 'Add Category'}
            </Button>
            {editingCategory && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
      
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        {error && (
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
        
        <DataTable
          data={categories}
          columns={[
            {
              key: 'name',
              header: 'Category Name',
              render: (row) => (
                <div>
                  <h3 className="font-medium">{row.name}</h3>
                  {row.description && (
                    <p className="text-sm text-muted-foreground">{row.description}</p>
                  )}
                </div>
              )
            },
            {
              key: 'actions',
              header: 'Actions',
              className: 'text-right w-24',
              render: (row) => (
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleEdit(row)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(row.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )
            }
          ]}
          searchable={true}
          sortable={true}
          pagination={true}
          pageSize={10}
          loading={loading && !categories.length}
          emptyMessage="No categories found. Add your first category above."
        />
      </div>
    </div>
  );
};

export default CategoryManagement;