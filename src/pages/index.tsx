import { Layout } from "@/components/layout/Layout";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout title={"Home"}>
      <h1>Home</h1>
    </Layout>
  );
}
