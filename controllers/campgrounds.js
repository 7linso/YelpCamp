const Campground = require('../models/campground')

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find()
    res.render('campgrounds/index', { campgrounds })
}
module.exports.newCampgroundForm = (req, res) => {
    res.render('campgrounds/new')
}
module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
        .populate({ path: 'reviews', populate: { path: 'author' } })
        .populate('author')
    if (!campground) {
        req.flash('error', 'This Campground no longer exists')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground })
}
module.exports.editCampgroundForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
        req.flash('error', 'This Campground no longer exists')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground })
}

module.exports.newCampground = async (req, res) => {
    const campground = new Campground(req.body.campground)
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.author = req.user._id
    await campground.save()
    req.flash('success', 'Congrats! You added your Campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}
module.exports.editCampground = async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success', 'You made changes to your Campground!')
    res.redirect(`/campgrounds/${id}`)
}
module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'You deleted your Campground')
    res.redirect(`/campgrounds`)
}