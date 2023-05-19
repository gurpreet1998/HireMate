import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
//import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUI from "swagger-ui-express";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HireMate API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8800/",
      },
    ],
    components: {
      schemas: {
        UserRegistration: {
          type: "object",
          properties: {
            username: {
              type: "string",
            },
            password: {
              type: "string",
            },
            email: {
              type: "string",
            },
            country: {
              type: "string",
            },
          },
          example: {
            username: "example_user",
            password: "admin",
            email: "example@example.com",
            country: "USA",
          },
        },
        UserLogin: {
          type: "object",
          properties: {
            username: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
          example: {
            username: "example_user",
            password: "admin",
          },
        },

        Error: {
          type: "object",
          properties: {
            code: {
              type: "integer",
            },
            message: {
              type: "string",
            },
          },
          example: {
            code: 400,
            message: "Bad request",
          },
        },
      },
    },
  },
  apis: ["./routes/*js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerSpec));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
//app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});
