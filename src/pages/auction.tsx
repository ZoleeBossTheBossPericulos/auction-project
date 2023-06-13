import { AuctionCard, IAcutionCard } from "@/components/elements/AuctionCard";
import { Layout } from "@/components/layout/Layout";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

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
  // const randomMessages = generateRandomMessages(115);

  // const fetcher = async (url: string) => {
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   return data;
  // };

  // const { data } = useSWR(
  //   `${process.env.NEXT_PUBLIC_API_URL as string}/items`,
  //   fetcher
  // );
  const [data, setData] = useState<IAcutionCard | undefined>();
  const [name, setName] = useState<string | null>(null);
  const socket = io("http://localhost:6060");

  socket.on("send-data2", (auctionData) => {
    setData(auctionData[0]);
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server");
    });
    socket.on("send-data", (auctionData) => {
      console.log(auctionData);
      setData(auctionData[0]);
    });
  }, []);

  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, [localStorage]);

  return (
    <Layout title={"Auction"}>
      <h1 className="text-2xl mx-4">
        {name === null || name === ""
          ? `Please enter your name on home to bid!`
          : `Welcome ${name}! Place your bid!`}
      </h1>
      <div className="flex h-[80vh] mx-10">
        <div className="flex items-center justify-center w-full basis-2/3">
          <div className="px-20 py-10">
            {data && (
              <AuctionCard
                name={data.name}
                startPrice={data.startPrice}
                actualPrice={data.actualPrice}
                thumbnail={data.thumbnail}
                onBid={(newBid: number) => {
                  socket.emit("raise", {
                    newBidValue: newBid,
                    name: "Desk",
                    highestBidder: localStorage.getItem("name"),
                    lastBid: new Date().toISOString(),
                  });
                }}
                description={data.description}
                disabled={name === null || name === ""}
                sold={data.sold}
                highestBidder={data.highestBidder}
                lastBid={data.lastBid}
              />
            )}
          </div>
        </div>
        <div className="bg-slate-700 rounded-md py-2"></div>
      </div>
    </Layout>
  );
}
