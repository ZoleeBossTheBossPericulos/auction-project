import { Layout } from "@/components/layout/Layout";

export default function Home() {
  return (
    <Layout title={"Home"}>
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the AuctiOn Website!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore a wide range of auctions and bid on your favorite items.
        </p>
        <div>
          <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 mr-4 text-white rounded-md shadow-lg">
            Get Started
          </button>
          <button className="px-6 py-3 bg-slate-500 hover:bg-slate-600 text-white rounded-md shadow-lg">
            Log in
          </button>
        </div>
      </div>
    </Layout>
  );
}
