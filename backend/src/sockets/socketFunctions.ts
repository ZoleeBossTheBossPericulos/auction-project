import { Server } from "socket.io";
import { sendMessage } from "../broker/rabbitmq";
import controller from "../controllers/itemController";

export const socketFunctions = async (io: Server) => {
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

    socket.on("send-message", async (message) => {
      await sendMessage(message);
      io.emit("chatMessage", message);
    });
  });
};
