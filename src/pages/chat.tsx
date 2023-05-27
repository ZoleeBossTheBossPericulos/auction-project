import ChatSection from "@/components/elements/ChatSection";
import { Layout } from "@/components/layout/Layout";

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateRandomMessages = (count: number) => {
  const messages = [];
  const senders = ["Alice", "Bob", "Charlie"];
  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.";

  for (let i = 0; i < count; i++) {
    const randomSender = senders[Math.floor(Math.random() * senders.length)];
    const randomMessage = loremIpsum.substring(
      0,
      Math.floor(Math.random() * 50) + 10
    );
    const randomColor = generateRandomColor();

    messages.push({
      from: randomSender,
      message: randomMessage,
      color: randomColor,
    });
  }

  return messages;
};

export default function Home() {
  const randomMessages = generateRandomMessages(115);

  return (
    <Layout title={"Chat"}>
      <div className="bg-slate-700 rounded-md py-2 mx-20">
        <ChatSection messages={randomMessages} />
      </div>
    </Layout>
  );
}
