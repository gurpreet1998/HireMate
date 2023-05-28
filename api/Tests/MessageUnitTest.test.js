import createError from "http-errors";
import Message from "../models/message.model";
import Conversation from "../models/conversation.model";
import { createMessage, getMessages } from "../controllers/message.controller";

jest.mock("http-errors");
jest.mock("../models/message.model");
jest.mock("../models/conversation.model");

describe("createMessage", () => {
  it("should create a message successfully", async () => {
    const req = {
      body: {
        conversationId: "testConversationId",
        desc: "Test message",
      },
      userId: "testUserId",
      isSeller: true,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    const savedMessage = {
      // Define the saved message object
    };

    const updatedConversation = {
      // Define the updated conversation object
    };

    Message.prototype.save.mockResolvedValue(savedMessage);
    Conversation.findOneAndUpdate.mockResolvedValue(updatedConversation);

    await createMessage(req, res, next);

    expect(Message.prototype.save).toHaveBeenCalledWith();
    expect(Conversation.findOneAndUpdate).toHaveBeenCalledWith(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: true,
          readByBuyer: false,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(savedMessage);
    expect(next).not.toHaveBeenCalled();
  });
});

describe("getMessages", () => {
  it("should return messages for a conversation", async () => {
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

    const messages = [
      // Define the messages array
    ];

    Message.find.mockResolvedValue(messages);

    await getMessages(req, res, next);

    expect(Message.find).toHaveBeenCalledWith({
      conversationId: req.params.id,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(messages);
    expect(next).not.toHaveBeenCalled();
  });
});
describe("getMessages", () => {
  it("should return messages for a conversation", async () => {
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

    const messages = [
      // Define the messages array
    ];

    Message.find.mockResolvedValue(messages);

    await getMessages(req, res, next);

    expect(Message.find).toHaveBeenCalledWith({
      conversationId: req.params.id,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(messages);
    expect(next).not.toHaveBeenCalled();
  });
});
describe("getMessages", () => {
  it("should return messages for a conversation", async () => {
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

    const messages = [
      // Define the messages array
    ];

    Message.find.mockResolvedValue(messages);

    await getMessages(req, res, next);

    expect(Message.find).toHaveBeenCalledWith({
      conversationId: req.params.id,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(messages);
    expect(next).not.toHaveBeenCalled();
  });
});
describe("getMessages", () => {
  it("should return messages for a conversation", async () => {
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

    const messages = [
      // Define the messages array
    ];

    Message.find.mockResolvedValue(messages);

    await getMessages(req, res, next);

    expect(Message.find).toHaveBeenCalledWith({
      conversationId: req.params.id,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(messages);
    expect(next).not.toHaveBeenCalled();
  });
});
