/* eslint-disable global-require */
module.exports = (app) => {
  const admin = require('../controllers/adminController.js');
  // const employee = require('../controllers/employeeController.js');
  // const review = require('../controllers/reviewController.js');
  // const feedback = require('../controllers/feedbackController.js');

  const router = require('express').Router();

  // Login admin
  router.post('/login', admin.login);

  // Logout admin
  router.get('/logout', admin.logout);

  // Retrieve all employees
  router.get('/employees', admin.findAllEmployeesAdmin);

  // Create new employee
  router.post('/employee', admin.createEmployeeAdmin);

  // Delete an employee with id
  router.delete('/employee/:id', admin.deleteEmployeeAdmin);

  // // Retrieve an employee with id
  // router.get('/employee/:id', employees.findEmployeeAdmin);

  // // Update an employee with id
  // router.put('/employee/:id', employees.updateEmployeeAdmin);
  // // Retrieve all reviews
  // router.get('/reviews', reviews.findAllReviewsAdmin);

  // // Assign employees to participate in another employee's performance review
  // router.post('/review', reviews.createReviewAdmin);

  // // Retrieve a review with id (also to see its feedbacks)
  // router.get('/review/:id', reviews.findReviewAdmin);

  // // Update a feedback with id
  // router.put('/feedback/:id', feedbacks.updateFeedbackAdmin);

  app.use('/api/admin', router);
};
