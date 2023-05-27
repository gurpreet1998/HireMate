import createError from "../utils/createError.js";
import mongoose from "mongoose";
import {
  createConversation,
  updateConversation,
  getSingleConversation,
  getConversations,
} from "../controllers/conversation.controller.js";
import Conversation from "../models/conversation.model.js";

jest.mock("http-errors");
jest.mock("../models/conversation.model");

describe("createConversation", () => {
  it("should create a conversation successfully", async () => {
    // Mock request and response objects
    const req = {
      isSeller: true,
      userId: "sellerId",
      body: {
        to: "buyerId",
        gigId: "gigId",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    // Mock the Conversation model
    const savedConversation = {
      // Define the saved conversation object as needed
      // Make sure it matches the Conversation model schema
    };
    const saveMock = jest.spyOn(Conversation.prototype, "save");
    saveMock.mockResolvedValue(savedConversation);

    await createConversation(req, res, next);

    // Verify that the conversation is saved and response is sent with the saved conversation
    expect(saveMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(savedConversation);
  });

  it("should handle errors during conversation creation", async () => {
    // Mock request and response objects
    const req = {
      body: {
        to: "buyerIdValue", // Replace 'buyerIdValue' with the actual value for the buyer ID
        // ... other necessary properties
      },
      isSeller: true, // Set the appropriate value for isSeller
      userId: "sellerIdValue", // Replace 'sellerIdValue' with the actual value for the seller ID
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    // Mock the Conversation model to throw an error
    const saveMock = jest.spyOn(Conversation.prototype, "save");
    saveMock.mockRejectedValue(new Error("Some error"));

    await createConversation(req, res, next);

    // Verify that the error is passed to the next middleware
    expect(saveMock).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe("createConversation", () => {
  it("should create a conversation successfully", async () => {
    const req = {
      isSeller: true,
      userId: "testUserId",
      body: {
        to: "testTo",
        gigId: "testGigId",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    const savedConversation = {
      // Define the saved conversation object
    };

    Conversation.prototype.save.mockResolvedValue(savedConversation);

    await createConversation(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(savedConversation);
    expect(next).not.toHaveBeenCalled();
  });
});

describe("updateConversation", () => {
  it("should update conversation with readBySeller=true if user is a seller", async () => {
    const req = {
      isSeller: true,
      params: {
        id: "testConversationId",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    const updatedConversation = {
      // Define the updated conversation object
    };

    Conversation.findOneAndUpdate.mockResolvedValue(updatedConversation);

    await updateConversation(req, res, next);

    expect(Conversation.findOneAndUpdate).toHaveBeenCalledWith(
      { id: req.params.id },
      { $set: { readBySeller: true } },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(updatedConversation);
    expect(next).not.toHaveBeenCalled();
  });

  it("should update conversation with readByBuyer=true if user is not a seller", async () => {
    const req = {
      isSeller: false,
      params: {
        id: "testConversationId",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    const updatedConversation = {
      // Define the updated conversation object
    };

    Conversation.findOneAndUpdate.mockResolvedValue(updatedConversation);

    await updateConversation(req, res, next);

    expect(Conversation.findOneAndUpdate).toHaveBeenCalledWith(
      { id: req.params.id },
      { $set: { readByBuyer: true } },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(updatedConversation);
    expect(next).not.toHaveBeenCalled();
  });
});

describe("getSingleConversation", () => {
  it("should return the single conversation if it exists", async () => {
    const req = {
      params: {
        id: "testConversationId",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    const conversation = {
      // Define the conversation object
    };

    Conversation.findOne.mockResolvedValue(conversation);

    await getSingleConversation(req, res, next);

    expect(Conversation.findOne).toHaveBeenCalledWith({ id: req.params.id });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(conversation);
    expect(next).not.toHaveBeenCalled();
  });
});
describe("getSingleConversation", () => {
  it("should return the single conversation if it exists", async () => {
    const req = {
      params: {
        id: "testConversationId",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    const conversation = {
      // Define the conversation object
    };

    Conversation.findOne.mockResolvedValue(conversation);

    await getSingleConversation(req, res, next);

    expect(Conversation.findOne).toHaveBeenCalledWith({ id: req.params.id });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(conversation);
    expect(next).not.toHaveBeenCalled();
  });
});
