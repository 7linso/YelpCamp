const Review = require('../models/review')
const Campground = require('../models/campground')

module.exports.postReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    review.author = req.user._id
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash('success', 'Congrats! You added your Review to this Campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}
module.exports.deleteReview = async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.review_id } })
    await Review.findByIdAndDelete(req.params.review_id)
    req.flash('success', 'You deleted your Review')
    res.redirect(`/campgrounds/${req.params.id}`)
}
