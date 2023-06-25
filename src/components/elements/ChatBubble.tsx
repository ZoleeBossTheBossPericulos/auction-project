interface IChatBubble {
  color: string;
  from: string;
  message: string;
  isMine: boolean;
}

export const ChatBubble = ({ color, from, message, isMine }: IChatBubble) => {
  return (
    <div
      className={`flex relative items-center mb-4 ${isMine && "justify-end"}`}
    >
      <div
        className={`rounded-lg p-2 bg-${color}-500 text-white`}
        style={{ backgroundColor: color }}
      >
        {message}
      </div>
      {!isMine && <div className="ml-2 text-gray-500"> - {from}</div>}
    </div>
  );
};
