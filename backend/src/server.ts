/** source/server.ts */
import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import itemRoutes from "./routes/items";

import { socketFunctions } from "./sockets/socketFunctions";
import { Server } from "socket.io";
import { consumeMessages } from "./broker/rabbitmq";
import { MongoClient } from "mongodb";

const router: Express = express();

router.use(morgan("dev"));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});

router.use("/", itemRoutes);

router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const uri =
  "mongodb+srv://test:test@valosweb-cluster.9bo7mqx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

socketFunctions(io, client).catch(console.error);
consumeMessages(io).catch(console.error);

httpServer.listen(PORT, () =>
  console.log(`The server is running on porta ${PORT}`)
);
