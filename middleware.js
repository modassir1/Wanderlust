const Listings = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require('./schema.js');
const Review = require("./models/review.js")

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listing!");
        res.redirect("/login");
    }
    next();
}

module.exports.savRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listings.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not owner of this listings");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { err } = listingSchema.validate(req.body);
    if (err) {
        throw new ExpressError(400, err);
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    let { err } = reviewSchema.validate(req.body);
    if (err) {
        throw new ExpressError(400, err)
    }
    else (
        next()
    )
}

module.exports.isReviewAuthor = async (req, res, next) => {
    try{
        let { id, reviewId } = req.params;
        let review = await Review.findById(reviewId);
        if (!review.author.equals(res.locals.currUser._id)) {
            req.flash("error", "You are not author of this review");
            return res.redirect(`/listings/${id}`);
        }
    
        next();
    }
    catch(err){
        console.log(err)
    }
}

