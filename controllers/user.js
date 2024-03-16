const User = require("../models/user")

module.exports.renderSignupForm = (req, res) => {
    res.render('users/signup.ejs');
}

module.exports.signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = await User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                next(err)
            }
            req.flash("success", "Welcome to WonderLust");
            res.redirect("/listings");
        })
    }
    catch (er) {
        req.flash("error", er.message);
        res.redirect("/signup")
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs")
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to wounderlust!, You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "You have been logged out!");
        res.redirect("/listings");
    })
}