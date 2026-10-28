const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title :)'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a course description :)'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a course price :)'],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category', 
    required: [true, 'Please specify a category for this course :)'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);