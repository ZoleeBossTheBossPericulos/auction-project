import { Server, Socket } from "socket.io";
import { MongoClient } from "mongodb";
import { sendMessage } from "../broker/rabbitmq";
import controller from "../controllers/itemController";
import moment from "moment";
// 6379 redis port

const cache = async (id: string, client: MongoClient, redisCli: any) => {
  const data = await redisCli.get(id);

  if (data !== null) {
    return data;
  }
  const auctionData = await controller.fetchCurrentAuction(client, id);

  return auctionData;
};

function startInterval(
  id: string,
  socket: Socket,
  client: MongoClient,
  redisCli: any
) {
  const interval = setInterval(async () => {
    const data = JSON.parse(await cache(id, client, redisCli));
    const currentTime = moment().valueOf();
    const targetTime = moment(data.lastBid).valueOf() + 60000;
    const difference = targetTime - currentTime;

    if (difference > 0) {
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      console.log({
        ...data,
        lastBid: minutes * 60 + seconds,
      });

      socket.to(id).emit("send-data-refreshed", {
        ...data,
        lastBid: minutes * 60 + seconds,
      });
    } else {
      await controller.closeBid(client, id);
      const auctionDataRefreshed = await controller.fetchCurrentAuction(
        client,
        id
      );
      socket.to(id).emit("send-data-refreshed", auctionDataRefreshed);
      clearInterval(interval);
    }
  }, 1000);

  return () => {
    clearInterval(interval);
  };
}

export const socketFunctions = async (
  io: Server,
  client: MongoClient,
  redisCli: any
) => {
  await redisCli.connect();
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
      const lastBidDate = new Date().toISOString();

      await controller.updateBid(
        client,
        arg.id,
        arg.newBidValue,
        arg.highestBidder,
        lastBidDate
      );
      const auctionDataRefreshed = await controller.fetchCurrentAuction(
        client,
        arg.id
      );

      await redisCli.set(arg.id, JSON.stringify(auctionDataRefreshed));

      startInterval(arg.id, socket, client, redisCli);
    });

    socket.on("send-message", async (message) => {
      await sendMessage(message);
    });
  });
};
