import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers can't create a review!"));

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this gig!")
      );

    //TODO: check if the user purchased the gig.

    // const count = await Review.countDocuments({
    //   userId: req.userId,
    //   gigId: req.body.gigId,
    // });

    // if (count == 0)
    //   return next(createError(403, "You are not allowed to add review!"));

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id); // Use findById instead of find
    if (!review) {
      return res.status(404).send("Review not found."); // Handle if review is not found
    }
    console.log(req);
    if (req.userId !== review.userId.toString()) {
      return res.status(403).send("You can delete only your review!"); // Return response instead of calling next
    }
    await Review.findByIdAndDelete(req.params.id); // Use req.params._id instead of req.body._id
    res.status(200).send("Review deleted.");
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};
