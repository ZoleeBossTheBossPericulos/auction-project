import { Layout } from "@/components/layout/Layout";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout title={"Chat"}>
      <h1>Chat</h1>
    </Layout>
  );
}
