import createError from "http-errors";
import { createGig, deleteGig } from "../controllers/gig.controller";
import Gig from "../models/gig.model";

jest.mock("../models/gig.model", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("createGig", () => {
  test("should create a gig successfully when request is from a seller", async () => {
    const req = {
      isSeller: true,
      userId: "seller123",
      body: {
        title: "Test Gig",
        desc: "Test gig description",
        cat: "Test Category",
        price: 10,
        cover: "test-cover.jpg",
        shortTitle: "Test",
        shortDesc: "Short description",
        deliveryTime: 3,
        revisionNumber: 2,
      },
    };

    const savedGig = {
      _id: "gig123",
      userId: req.userId,
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    Gig.prototype.save = jest.fn().mockResolvedValue(savedGig);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await createGig(req, res, next);

    expect(Gig.prototype.save).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(savedGig);
    expect(next).not.toHaveBeenCalled();
  });

  // test("should return a 403 Forbidden error when request is not from a seller", async () => {
  //   const req = {
  //     isSeller: false,
  //   };

  //   const res = {
  //     status: jest.fn(),
  //     send: jest.fn(),
  //   };

  //   const next = jest.fn();

  //   await createGig(req, res, next);

  //   expect(res.status).toHaveBeenCalledWith(403);
  //   expect(next).toHaveBeenCalledWith(expect.any(Error));
  //   expect(next.mock.calls[0][0].status).toBe(403);
  //   expect(next.mock.calls[0][0].message).toBe(
  //     "Only Sellers can create a gig!"
  //   );
  // });

  test("should handle errors and pass them to the next middleware", async () => {
    const req = {
      isSeller: true,
      userId: "seller123",
      body: {
        title: "Test Gig",
        desc: "Test gig description",
        cat: "Test Category",
        price: 10,
        cover: "test-cover.jpg",
        shortTitle: "Test",
        shortDesc: "Short description",
        deliveryTime: 3,
        revisionNumber: 2,
      },
    };

    const error = new Error("Some error");

    Gig.prototype.save = jest.fn().mockRejectedValue(error);

    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await createGig(req, res, next);

    expect(Gig.prototype.save).toHaveBeenCalledWith();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("deleteGig", () => {
  test("should delete the gig when request is from the gig owner", async () => {
    const gigId = "gig123";
    const userId = "user123";

    const req = {
      params: { id: gigId },
      userId: userId,
    };

    const gig = {
      _id: gigId,
      userId: userId,
    };

    Gig.findById = jest.fn().mockResolvedValue(gig);
    Gig.findByIdAndDelete = jest.fn().mockResolvedValue();

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const next = jest.fn();

    await deleteGig(req, res, next);

    expect(Gig.findById).toHaveBeenCalledWith(gigId);
    expect(Gig.findByIdAndDelete).toHaveBeenCalledWith(gigId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Gig has been deleted!");
    expect(next).not.toHaveBeenCalled();
  });

  test("should handle errors and pass them to the next middleware", async () => {
    const gigId = "gig123";
    const userId = "user123";

    const req = {
      params: { id: gigId },
      userId: userId,
    };

    const gig = {
      _id: gigId,
      userId: userId,
    };

    const error = new Error("Some error");

    Gig.findById = jest.fn().mockResolvedValue(gig);
    Gig.findByIdAndDelete = jest.fn().mockRejectedValue(error);

    const res = {
      status: jest.fn(),
      send: jest.fn(),
    };

    const next = jest.fn();

    await deleteGig(req, res, next);

    expect(Gig.findById).toHaveBeenCalledWith(gigId);
    expect(Gig.findByIdAndDelete).toHaveBeenCalledWith(gigId);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });
});
describe("deleteGig", () => {
  test("should delete the gig when request is from the gig owner", async () => {
    const gigId = "gig123";
    const userId = "user123";

    const req = {
      params: { id: gigId },
      userId: userId,
    };

    const gig = {
      _id: gigId,
      userId: userId,
    };

    Gig.findById = jest.fn().mockResolvedValue(gig);
    Gig.findByIdAndDelete = jest.fn().mockResolvedValue();

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const next = jest.fn();

    await deleteGig(req, res, next);

    expect(Gig.findById).toHaveBeenCalledWith(gigId);
    expect(Gig.findByIdAndDelete).toHaveBeenCalledWith(gigId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Gig has been deleted!");
    expect(next).not.toHaveBeenCalled();
  });

  test("should handle errors and pass them to the next middleware", async () => {
    const gigId = "gig123";
    const userId = "user123";

    const req = {
      params: { id: gigId },
      userId: userId,
    };

    const gig = {
      _id: gigId,
      userId: userId,
    };

    const error = new Error("Some error");

    Gig.findById = jest.fn().mockResolvedValue(gig);
    Gig.findByIdAndDelete = jest.fn().mockRejectedValue(error);

    const res = {
      status: jest.fn(),
      send: jest.fn(),
    };

    const next = jest.fn();

    await deleteGig(req, res, next);

    expect(Gig.findById).toHaveBeenCalledWith(gigId);
    expect(Gig.findByIdAndDelete).toHaveBeenCalledWith(gigId);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });
});
