/** source/server.ts */
import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import itemRoutes from "./routes/items";
import { Server } from "socket.io";
import controller from "./controllers/itemController";

const router: Express = express();

/** Logging */
router.use(morgan("dev"));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});

/** Routes */
router.use("/", itemRoutes);

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const socketFunctions = async () => {
  io.on("connect", async (socket) => {
    const auctionData = await controller.fetchCurrentAuction();
    socket.emit("send-data", auctionData);

    socket.on("raise", async (arg) => {
      await controller.updateBid(
        arg.name,
        arg.newBidValue,
        arg.highestBidder,
        arg.lastBid
      );
      const auctionData2 = await controller.fetchCurrentAuction();
      socket.broadcast.emit("send-data2", {
        ...auctionData2,
        actualPrice: arg.newBidValue,
      });
    });
  });
};

socketFunctions().catch(console.error);

httpServer.listen(PORT, () =>
  console.log(`The server is running on porta ${PORT}`)
);
