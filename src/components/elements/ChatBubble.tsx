interface IChatBubble {
  color: string;
  from: string;
  message: string;
}

export const ChatBubble = ({ color, from, message }: IChatBubble) => {
  return (
    <div className="flex items-center mb-4">
      <div
        className={`rounded-lg p-2 bg-${color}-500 text-white`}
        style={{ backgroundColor: color }}
      >
        {message}
      </div>
      <div className="ml-2 text-gray-500"> - {from}</div>
    </div>
  );
};
