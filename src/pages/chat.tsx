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
  const [name, setName] = useState<string | null>(null);
  const socket = io("http://localhost:6060");

  socket.on("chatMessage", (newMessage) => {
    setMessages([...messages, newMessage]);
  });

  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, [localStorage]);

  return (
    <Layout title={"Chat"}>
      <h1 className="text-2xl mx-4">
        {name === null || name === ""
          ? `Please enter your name on home to bid!`
          : `Welcome ${name}! Place your bid!`}
      </h1>
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
            console.log("asdas");
            setMessage("");
          }}
        />
      </div>
    </Layout>
  );
}
