import Head from "next/head";
import { ReactNode } from "react";
import { Header } from "./Header";

interface ILayout {
  title: string;
  description?: string;
  children: ReactNode;
}

export const Layout = ({ title, description, children }: ILayout) => {
  return (
    <main>
      <Head>
        <title>{title}</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        {description && <meta name="description" content={description} />}
      </Head>
      <Header />
      <div className="bg-gradient-to-l from-amber-100 to-slate-700 min-h-screen pt-28">
        {children}
      </div>
    </main>
  );
};
