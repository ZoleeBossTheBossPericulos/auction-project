import { Server } from "socket.io";
import { MongoClient } from "mongodb";
import { sendMessage } from "../broker/rabbitmq";
import controller from "../controllers/itemController";

export const socketFunctions = async (io: Server, client: MongoClient) => {
  io.on("connect", async (socket) => {
    socket.on("join-room", async (arg) => {
      socket.join(arg.roomId);
      const auctionData = await controller.fetchCurrentAuction(
        client,
        arg.roomId
      );
      socket.to(arg.roomId).emit("send-data-refreshed", auctionData);
    });

    socket.on("get-data", async (arg) => {
      const auctionData = await controller.fetchCurrentAuction(client, arg.id);
      socket.to(arg.id).emit("send-data-refreshed", auctionData);
    });

    socket.on("raise", async (arg) => {
      console.log(arg);
      await controller.updateBid(
        client,
        arg.id,
        arg.newBidValue,
        arg.highestBidder,
        new Date().toISOString()
      );
      const auctionDataRefreshed = await controller.fetchCurrentAuction(
        client,
        arg.id
      );
      socket.to(arg.id).emit("send-data-refreshed", {
        ...auctionDataRefreshed,
        actualPrice: arg.newBidValue,
      });
    });

    socket.on("close-bid", async (arg) => {
      await controller.closeBid(client, arg.id);
      const auctionDataRefreshed = await controller.fetchCurrentAuction(
        client,
        arg.id
      );
      socket.to(arg.id).emit("send-data-refreshed", auctionDataRefreshed);
    });

    socket.on("send-message", async (message) => {
      await sendMessage(message);
      io.emit("chatMessage", message);
    });
  });
};
