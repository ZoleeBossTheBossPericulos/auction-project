import { AuctionCard, IAcutionCard } from "@/components/elements/AuctionCard";
import { Layout } from "@/components/layout/Layout";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export default function Auction() {
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
      setData(auctionData[0]);
    });
  }, []);

  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, [localStorage]);

  return (
    <Layout title={"Auction"}>
      <h1 className="text-2xl mx-4 text-center font-bold py-4">
        {name === null || name === ""
          ? "Please enter your name on the homepage to bid!"
          : `Welcome ${name}! Place your bid!`}
      </h1>
      <div className="flex h-[80vh] mx-10">
        <div className="flex items-center justify-center w-full">
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
