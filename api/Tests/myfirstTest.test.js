import bcrypt from "bcrypt";
import { register } from "../controllers/signup.controller";
import User from "../models";
// describe("Grouped Tests", () => {
//   test("test", () => {
//     let a = 1;
//     let b = 1;
//     expect(a + b).toBe(2);
//   });
// });

describe("Signup Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user when all required fields are provided", async () => {
    const mockReq = {
      body: {
        username: "testuser",
        password: "testpassword",
        email: "test@example.com",
        country: "Testland",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const mockHashedPassword = "hashedpassword";

    bcrypt.hashSync = jest.fn().mockReturnValue(mockHashedPassword);
    User.prototype.save = jest.fn();

    await register(mockReq, mockRes);

    expect(bcrypt.hashSync).toHaveBeenCalledWith(mockReq.body.password, 5);
    expect(User.prototype.save).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith("User has been created.");
  });

  // Add more test cases for validation, edge cases, etc.
});
