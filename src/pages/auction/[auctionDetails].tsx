import { AuctionCard, IAcutionCard } from "@/components/elements/AuctionCard";
import { Layout } from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";

export default function Auction() {
  const [data, setData] = useState<IAcutionCard | undefined>();
  const [name, setName] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();

  // state ami megnezi, hogy van e valasza a socketnek, dep. array

  useEffect(() => {
    socketInitializer();

    return () => {
      socket && socket.disconnect();
    };
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");

    setSocket(io("http://localhost:6060"));
  }

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.connect();

    socket.emit("join-room", { roomId: router.asPath.split("/").pop() });
    // socket.emit("get-data", {
    //   id: router.asPath.split("/").pop(),
    // });
    socket.on("send-data-refreshed", (auctionData: any) => {
      setData(auctionData);
    });
  }, [socket]);

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
                _id={data._id}
                name={data.name}
                startPrice={data.startPrice}
                actualPrice={data.actualPrice}
                thumbnail={data.thumbnail}
                onBid={(newBid: number) => {
                  console.log(socket);
                  if (!socket) {
                    return;
                  }
                  console.log(newBid);
                  socket.emit("raise", {
                    newBidValue: newBid,
                    id: data._id,
                    highestBidder: localStorage.getItem("name"),
                  });
                }}
                description={data.description}
                disabled={name === null || name === ""}
                sold={data.sold}
                highestBidder={data.highestBidder}
                lastBid={data.lastBid}
                onTimeUp={(id: string) => {
                  if (!socket) {
                    return;
                  }

                  socket.emit("close-bid", {
                    id: id,
                  });
                }}
              />
            )}
          </div>
        </div>
        <div className="bg-slate-700 rounded-md py-2"></div>
      </div>
    </Layout>
  );
}
