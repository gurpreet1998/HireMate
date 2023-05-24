import createError from "http-errors";
import jwt from "jsonwebtoken";
import { login } from "../controllers/auth.controller";
import User from "../models/user.model";
import bcrypt from "bcrypt";

jest.mock("bcrypt", () => ({
  compareSync: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "mockedToken"),
}));

jest.mock("../models/user.model", () => ({
  findOne: jest.fn(),
}));

describe("login", () => {
  test("should handle errors", async () => {
    const req = {
      body: {
        username: "testuser",
        password: "testpassword",
      },
    };

    const res = {
      cookie: jest.fn(),
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    const error = new Error("Some error");

    User.findOne.mockRejectedValue(error);

    await login(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
    expect(next).toHaveBeenCalledWith(error);
    expect(res.cookie).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });
  test("should fail to log in with incorrect credentials", async () => {
    const req = {
      body: {
        username: "testuser",
        password: "incorrectpassword",
      },
    };

    const res = {
      cookie: jest.fn(),
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    const user = {
      username: "testuser",
      password: "hashedpassword", // Replace with the actual hashed password
      // Add other properties of the user
    };

    User.findOne.mockResolvedValue(user);
    bcrypt.compareSync.mockReturnValue(false); // Simulate incorrect password

    await login(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
    expect(bcrypt.compareSync).toHaveBeenCalledWith(
      "incorrectpassword",
      user.password
    );
    expect(jwt.sign).not.toHaveBeenCalled();
    expect(res.cookie).not.toHaveBeenCalled();
    //expect(res.send).toHaveBeenCalledWith("Invalid credentials");
    //expect(next).not.toHaveBeenCalled();
  });
});
