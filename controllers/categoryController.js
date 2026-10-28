const Category = require('../models/Category');

// Create a new category (POST)
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Please provide a category name :)' });
    }
    
    const category = await Category.create({ name, description });
    res.status(201).json({ message: 'Category created successfully :)', category });
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating category :)', error: error.message });
  }
};

// Get all categories (GET)
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ message: 'Categories fetched successfully :)', categories });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching categories :)', error: error.message });
  }
};

// Get a single category by ID (GET)
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found :)' });
    }
    
    res.status(200).json({ message: 'Category fetched successfully :)', category });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching category :)', error: error.message });
  }
};

// Update a category (PUT/PATCH)
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found :)' });
    }
    
    res.status(200).json({ message: 'Category updated successfully :)', category });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating category :)', error: error.message });
  }
};

// Delete a category (DELETE)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found :)' });
    }
    
    res.status(200).json({ message: 'Category deleted successfully :)' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting category :)', error: error.message });
  }
};