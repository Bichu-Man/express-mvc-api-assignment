const Course = require('../models/Course');

// Create a new course (POST)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    
    if (!title || !description || !price || !category) {
      return res.status(400).json({ message: 'Please provide all required fields :)' });
    }
    
    const course = await Course.create({ title, description, price, category });
    res.status(201).json({ message: 'Course created successfully :)', course });
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating course :)', error: error.message });
  }
};

// Get all courses (GET)
exports.getCourses = async (req, res) => {
  try {
    // populate() brings in the actual category details instead of just the ID :)
    const courses = await Course.find().populate('category', 'name description');
    res.status(200).json({ message: 'Courses fetched successfully :)', courses });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching courses :)', error: error.message });
  }
};

// Get a single course by ID (GET)
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('category', 'name description');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found :)' });
    }
    
    res.status(200).json({ message: 'Course fetched successfully :)', course });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching course :)', error: error.message });
  }
};

// Update a course (PUT/PATCH)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found :)' });
    }
    
    res.status(200).json({ message: 'Course updated successfully :)', course });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating course :)', error: error.message });
  }
};

// Delete a course (DELETE)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found :)' });
    }
    
    res.status(200).json({ message: 'Course deleted successfully :)' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting course :)', error: error.message });
  }
};