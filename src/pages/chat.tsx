import ChatSection from "@/components/elements/ChatSection";
import { Layout } from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export type MessageProps = {
  from: string;
  message: string;
  color: string;
};

export default function Home() {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [message, setMessage] = useState<string>("");
  const socket = io("http://localhost:6060", { addTrailingSlash: false });

  useEffect(() => {
    socket.connect();
    socket.on("chatMessage", (newMessage) => {
      console.log(messages);
      setMessages([...messages, newMessage]);
    });
    return () => {
      socket.disconnect();
    };
  }, [messages]);

  return (
    <Layout title={"Chat"}>
      <div className="bg-slate-700 rounded-md py-2 mx-20">
        <ChatSection
          messages={messages}
          message={message}
          handleMessage={setMessage}
          handleSendMessage={() => {
            socket.emit("send-message", {
              message: message,
              from: localStorage.getItem("name"),
              color: generateRandomColor(),
            });
            setMessage("");
          }}
        />
      </div>
    </Layout>
  );
}
