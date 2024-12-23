const reviewmodel = require('../models/reviewmodel');
const devuser = require('../models/devusermodel');

// Add a review
exports.addReview = async (req, res) => {
    try {
        const { taskworker, rating } = req.body;

        // Check for missing fields
        if (!taskworker || !rating) {
            return res.status(400).send('Taskworker and Rating are required');
        }
        if (isNaN(rating)) {
            return res.status(400).send('Rating must be a number');
        }

        const exist = await devuser.findById(req.user.id);
        if (!exist) {
            return res.status(404).send('Task provider not found');
        }

        const newReview = new reviewmodel({
            taskprovider: exist.fullname,
            taskworker,
            rating,
        });

        await newReview.save();
        return res.status(200).send('Review updated successfully');
    } catch (err) {
        console.log(err);
        res.status(400).send('Server error');
    }
};

// Get reviews by taskworker
exports.getMyReviews = async (req, res) => {
    try {
        let allreviews = await reviewmodel.find();
        let myreviews = allreviews.filter(
            (review) => review.taskworker.toString() === req.user.id.toString()
        );
        return res.status(200).json(myreviews);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
};

exports.getReviewsByTaskWorker = async (req, res) => {
    try {
        const { taskworkerId } = req.params;

        // Validate taskworkerId
        if (!taskworkerId) {
            return res.status(400).send('Taskworker ID is required');
        }

        // Find all reviews for the specific taskworker
        const reviews = await reviewmodel.find({ taskworker: taskworkerId });

        // If no reviews are found
        if (!reviews || reviews.length === 0) {
            return res.status(404).send('No reviews found for this taskworker');
        }

        return res.status(200).json(reviews);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
};
