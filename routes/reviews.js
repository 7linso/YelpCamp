const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')
const { validateReview, isReviewAuthor, isLoggedIn } = require('../middleware')
const reviews = require('../controllers/reviews')

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.postReview))
router.delete('/:review_id', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router