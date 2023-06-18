import amqp from "amqplib";
import { Server } from "socket.io";

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

  const queue = "chat_queue";

  await channel.assertQueue(queue, { durable: false });
  await channel.consume(queue, (message) => {
    if (message !== null) {
      const content = JSON.parse(message.content.toString());
      console.log("Message received:", content);

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

  const queue = "chat_queue";

  await channel.assertQueue(queue, { durable: false });
  console.log(message);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

  console.log("Message sent:", message);

  await channel.close();
  await connection.close();
};

export { consumeMessages, sendMessage };
