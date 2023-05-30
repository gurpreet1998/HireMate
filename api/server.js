import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
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
const corsConfig = {
  //origin: "http://localhost:5173",
  origin: [
    "http://20.246.175.59",
    "http://20.127.253.108",
    "http://localhost:5173",
  ],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Access-Control-Allow-Origin",
  ],
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.set("trust proxy", true);
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HireMate API Documentation",
      version: "1.0.0",
    },
    // servers: [
    //   {
    //     // url: "http://localhost:8800/",
    //   },
    // ],
    components: {
      schemas: {
        reviewModel: {
          type: "object",
          properties: {
            gigId: {
              type: String,
              required: true,
            },

            star: {
              type: Number,
              required: true,
              enum: [1, 2, 3, 4, 5],
            },
            desc: {
              type: String,
              required: true,
            },
          },
        },
        gigModel: {
          type: "object",
          properties: {
            title: {
              type: String,
              required: true,
            },
            desc: {
              type: String,
              required: true,
            },
            totalStars: {
              type: Number,
              default: 0,
            },
            starNumber: {
              type: Number,
              default: 0,
            },
            cat: {
              type: String,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
            cover: {
              type: String,
              required: true,
            },
            images: {
              type: [String],
              required: false,
            },
            userId: {
              type: String,
              required: true,
            },
            shortTitle: {
              type: String,
              required: true,
            },
            shortDesc: {
              type: String,
              required: true,
            },
            deliveryTime: {
              type: Number,
              required: true,
            },
            revisionNumber: {
              type: Number,
              required: true,
            },
            features: {
              type: [String],
              required: false,
            },
            sales: {
              type: Number,
              default: 0,
            },
          },
        },

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
        Order: {
          type: "object",
          properties: {
            gigId: {
              type: "string",
              required: true,
            },
            img: {
              type: "string",
              required: false,
            },
            title: {
              type: "string",
              required: true,
            },
            price: {
              type: "number",
              required: true,
            },
            sellerId: {
              type: "string",
              required: true,
            },
            buyerId: {
              type: "string",
              required: true,
            },
            isCompleted: {
              type: "boolean",
              default: false,
            },
            payment_intent: {
              type: "string",
              required: true,
            },
          },
          example: {
            gigId: "example_gig_id",
            img: "example_image_url",
            title: "Example Order",
            price: 50,
            sellerId: "example_seller_id",
            buyerId: "example_buyer_id",
            isCompleted: false,
            payment_intent: "example_payment_intent",
          },
        },
        Message: {
          type: "object",
          properties: {
            conversationId: {
              type: "string",
              required: true,
            },
            userId: {
              type: "string",
              required: true,
            },
            desc: {
              type: "string",
              required: true,
            },
          },
          example: {
            conversationId: "example_conversation_id",
            userId: "example_user_id",
            desc: "Example message description",
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
app.use("/api/orders", orderRoute);
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
