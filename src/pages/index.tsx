import { Layout } from "@/components/layout/Layout";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSaveName = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("chatColor", generateRandomColor());
  };

  return (
    <Layout title={"Home"}>
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the AuctiOn Website!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore a wide range of auctions and bid on your favorite items.
        </p>
        <div className="flex items-center">
          <TextField
            id="name"
            type="text"
            label="Your name for bidding"
            variant="outlined"
            value={name}
            onChange={(newValue) => {
              setName(newValue.target.value);
            }}
          />
          <Link href={"/auction"}>
            <button
              className="px-6 py-3 mx-4 bg-amber-500 hover:bg-amber-600 mr-4 text-white rounded-md shadow-lg"
              onClick={handleSaveName}
            >
              To the auction
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
