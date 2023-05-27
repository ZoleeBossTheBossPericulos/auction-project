import { AuctionCard } from "@/components/elements/AuctionCard";
import { Layout } from "@/components/layout/Layout";
import { Inter } from "next/font/google";
import vintageMirror from "../../public/vintageMirror.jpeg";

const inter = Inter({ subsets: ["latin"] });

export default function Auction() {
  return (
    <Layout title={"Auction"}>
      <div className="flex">
        <div className="flex items-center justify-center w-full basis-2/3 h-full">
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
        <div>Chat</div>
      </div>
    </Layout>
  );
}
