const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const middleware = require('../middleware/middleware');

// Add review route
router.post('/addreview', middleware, reviewController.addReview);

// Get reviews by taskworker
router.get('/myreview', middleware, reviewController.getMyReviews);

// Get reviews for a specific taskworker by their ID
router.get('/:taskworkerId', reviewController.getReviewsByTaskWorker);

module.exports = router;
