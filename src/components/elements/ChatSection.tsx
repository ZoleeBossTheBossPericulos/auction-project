import { MessageProps } from "@/pages/chat";
import { IconButton, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ChatBubble } from "./ChatBubble";

type ChatSectionProps = {
  messages: MessageProps[];
  message: string;
  handleMessage: (newValue: string) => void;
  handleSendMessage: () => void;
};

const ChatSection: React.FC<ChatSectionProps> = ({
  messages,
  handleMessage,
  handleSendMessage,
  message,
}) => {
  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, [localStorage]);

  return (
    <div className="flex flex-col px-10 min-h-[80vh] justify-between">
      <h1 className="text-xl font-bold mb-2">Chat section</h1>
      <div className="flex flex-col max-h-[55vh] gap-1 overflow-y-auto px-2">
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            from={message.from}
            message={message.message}
            color={message.color}
          />
        ))}
      </div>
      <div className="flex w-full items-center justify-between px-2 mt-1 rounded-md bg-white">
        <TextField
          id="bid"
          label="Your chat message"
          variant="standard"
          className="basis-2/3"
          value={message}
          onChange={(newValue) => handleMessage(newValue.target.value)}
        />
        <IconButton
          className="!rounded-sm !mx-4 basis-1/3"
          onClick={() => handleSendMessage()}
          disabled={name === null || name === ""}
        >
          Send
        </IconButton>
      </div>
    </div>
  );
};

export default ChatSection;
