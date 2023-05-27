import { AuctionCard } from "@/components/elements/AuctionCard";
import ChatSection from "@/components/elements/ChatSection";
import { Layout } from "@/components/layout/Layout";
import vintageMirror from "../../public/vintageMirror.jpeg";

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

export default function Auction() {
  const randomMessages = generateRandomMessages(115);

  return (
    <Layout title={"Auction"}>
      <div className="flex h-[80vh] mx-10">
        <div className="flex items-center justify-center w-full basis-2/3">
          <div className="px-20 py-10">
            <AuctionCard
              name={"Vintage mirror"}
              startPrice={73}
              actualPrice={73}
              thumbnail={vintageMirror.src}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            />
          </div>
        </div>
        <div className="bg-slate-700 rounded-md py-2">
          <ChatSection messages={randomMessages} />
        </div>
      </div>
    </Layout>
  );
}
