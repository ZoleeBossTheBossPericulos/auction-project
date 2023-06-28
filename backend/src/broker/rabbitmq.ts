import amqp from "amqplib";
import { Server } from "socket.io";

const exchange = "chat";
const queue = "chat_queue";

const consumeMessages = async (io: Server) => {
  const connection = await amqp.connect(
    {},
    {
      clientProperties: {
        connection_name: "amqp-reciver",
      },
    }
  );

  const channel = await connection.createChannel();

  await channel.assertExchange(exchange, "fanout");
  await channel.assertQueue(queue, { durable: false });
  await channel.bindQueue(queue, exchange, "");

  await channel.consume(queue, (message) => {
    if (message !== null) {
      const content = JSON.parse(message.content.toString());

      if (typeof content !== "string") {
        io.emit("chatMessage", content);
      }

      channel.ack(message);
    }
  });
};

const sendMessage = async (message) => {
  const connection = await amqp.connect(
    {},
    {
      clientProperties: {
        connection_name: "amqp-sender",
      },
    }
  );

  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, "fanout");
  channel.publish(exchange, "", Buffer.from(JSON.stringify(message)));

  await channel.close();
  await connection.close();
};

export { consumeMessages, sendMessage };
