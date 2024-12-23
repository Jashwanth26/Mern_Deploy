const express = require('express');
const router = express.Router();
const devuserController = require('../controllers/devuserController');
const middleware = require('../middleware/middleware');

// Register route
router.post('/register', devuserController.registerUser);

// Login route
router.post('/login', devuserController.loginUser);

// Get all profiles route
router.get('/allprofiles', middleware, devuserController.getAllProfiles);

// Get my profile route
router.get('/myprofile', middleware, devuserController.getMyProfile);

router.post('/forgot-password', devuserController.forgotPassword);
router.post('/validate-otp',devuserController.validateOtp);
router.post('/reset-password',devuserController.resetPassword);

module.exports = router;
