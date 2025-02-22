const User = require('../models/user')

module.exports.registerUserForm = (req, res) => {
    res.render('users/register')
}
module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const newUser = await User.register(user, password)
        req.login(newUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to Yelp Camp!')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', 'User with such email or username name already exists')
        res.redirect('register')
    }
}
module.exports.loginUserForm = (req, res) => {
    res.render('users/login')
}
module.exports.loginUser = async (req, res) => {
    req.flash('success', 'Welcome Back to Yelp Camp!')
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl)
}
module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}