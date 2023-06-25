import { IAcutionCard } from "@/components/elements/AuctionCard";
import { Layout } from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Watch } from "react-loader-spinner";

export default function Auction() {
  const [data, setData] = useState<IAcutionCard[] | undefined>([]);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:6060/items");
        const json = await response.json();
        setData(json.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <Layout title={"Auction"}>
      <div className="flex h-[80vh] mx-10">
        <div className="flex items-center justify-center w-full">
          <div className="px-20 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {!data ||
              (data.length === 0 && (
                <div className="absolute top-0 left-0 backdrop-blur-3xl h-[100vh] w-[100vw]">
                  <Watch
                    height="80"
                    width="80"
                    radius="48"
                    color="#f59e0b"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    visible={true}
                    wrapperClass="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              ))}
            {data &&
              data.map((item) => {
                return (
                  <Link href={`/auction/${item._id}`} key={item._id}>
                    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-amber-100">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full !object-contain mix-blend-multiply"
                      />
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{name}</div>
                        <p className="text-gray-700 text-base">
                          Starting Price: ${item.startPrice}
                        </p>
                        {item.sold && <p className="text-red-500">Sold</p>}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="bg-slate-700 rounded-md py-2"></div>
      </div>
    </Layout>
  );
}
