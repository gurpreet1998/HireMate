import { register } from "../controllers/auth.controller";
import bcrypt from "bcrypt";
import User from "../models/user.model";

jest.mock("../models/user.model"); // Mock the User model

describe("User Registration", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock implementations before each test
  });

  it("registers a new user", async () => {
    // Mock the bcrypt.hashSync method
    bcrypt.hashSync = jest.fn().mockReturnValue("mockHashedPassword");

    const req = {
      body: {
        username: "Gurpreet",
        email: "gsingh@gma.com",
        password: "Ytetete",
        country: "USA",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await register(req, res);

    expect(bcrypt.hashSync).toHaveBeenCalledWith(req.body.password, 5);
    expect(User.prototype.save).toHaveBeenCalledTimes(1);
    expect(User.prototype.save).toHaveBeenCalledWith(); // No arguments passed
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith("User has been created.");
  });

  it("handles errors during user registration", async () => {
    // Mock the bcrypt.hashSync method to throw an error
    bcrypt.hashSync = jest.fn().mockImplementation(() => {
      throw new Error("bcrypt error");
    });

    const req = {
      body: {
        username: "Gurpreet",
        email: "gsingh@gma.com",
        password: "Ytetete",
        country: "USA",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    await register(req, res, next);

    expect(bcrypt.hashSync).toHaveBeenCalledWith(req.body.password, 5);
    expect(User.prototype.save).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe("User Registration", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock implementations before each test
  });

  it("registers a new user", async () => {
    // Mock the bcrypt.hashSync method
    bcrypt.hashSync = jest.fn().mockReturnValue("mockHashedPassword");

    const req = {
      body: {
        username: "Gurpreet",
        email: "gsingh@gma.com",
        password: "Ytetete",
        country: "USA",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await register(req, res);

    expect(bcrypt.hashSync).toHaveBeenCalledWith(req.body.password, 5);
    expect(User.prototype.save).toHaveBeenCalledTimes(1);
    expect(User.prototype.save).toHaveBeenCalledWith(); // No arguments passed
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith("User has been created.");
  });

  it("handles errors during user registration", async () => {
    // Mock the bcrypt.hashSync method to throw an error
    bcrypt.hashSync = jest.fn().mockImplementation(() => {
      throw new Error("bcrypt error");
    });

    const req = {
      body: {
        username: "Gurpreet",
        email: "gsingh@gma.com",
        password: "Ytetete",
        country: "USA",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    await register(req, res, next);

    expect(bcrypt.hashSync).toHaveBeenCalledWith(req.body.password, 5);
    expect(User.prototype.save).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
