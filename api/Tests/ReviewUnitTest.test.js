import createError from "http-errors";
import { createReview } from "../controllers/review.controller";
import Review from "../models/review.model";
import mongoose from "mongoose";

describe("Review API", () => {
  let req, res, next;
  const existingReview = {
    _id: "existingReviewId",
    userId: "existingUserId",
    gigId: "existingGigId",
    desc: "Existing review description",
    star: 4,
  };

  beforeEach(() => {
    req = {
      isSeller: false,
      userId: "testUserId",
      body: {
        gigId: "testGigId",
        desc: "Test review description",
        star: 5,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not allow sellers to create a review", async () => {
    req.isSeller = true;

    const findOneMock = jest.spyOn(Review, "findOne"); // Mock Review.findOne function
    findOneMock.mockResolvedValue(null); // Mock the response of Review.findOne

    await createReview(req, res, next);

    expect(next).toHaveBeenCalledWith(
      createError(403, "Sellers can't create a review!")
    );
    expect(findOneMock).not.toHaveBeenCalled(); // Verify that Review.findOne is not called

    findOneMock.mockRestore(); // Restore the original implementation of Review.findOne
  });

  it("should prevent creating a duplicate review", async () => {
    Review.findOne = jest.fn().mockResolvedValue(existingReview);

    await createReview(req, res, next);

    expect(Review.findOne).toHaveBeenCalledWith(
      expect.objectContaining({
        gigId: req.body.gigId,
        userId: req.userId,
      })
    );
    expect(next).toHaveBeenCalledWith(
      createError(403, "You have already created a review for this gig!")
    );
  });
  it("should prevent user from creating a duplicate review for a gig", async () => {
    req.isSeller = false; // User is not a seller

    const existingReview = {
      /* Existing review object for the user and gig */
    };

    const findOneMock = jest.spyOn(Review, "findOne"); // Mock Review.findOne function
    findOneMock.mockResolvedValue(existingReview); // Mock the response of Review.findOne

    await createReview(req, res, next);

    expect(next).toHaveBeenCalledWith(
      createError(403, "You have already created a review for this gig!")
    );
    expect(Review.findOne).toHaveBeenCalled(); // Verify that Review.findOne is called

    findOneMock.mockRestore(); // Restore the original implementation of Review.findOne
  });
});
