import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/auctionLogo.png";

export const Header = () => {
  return (
    <header className="flex fixed w-full justify-between items-center px-8 py-4 shadow-md bg-transparent">
      <Link href={"/"}>
        <Image
          src={logo.src}
          width={80}
          height={60}
          alt={"logo"}
          className="cursor-pointer hover:opacity-80 object-contain rounded-sm"
        />
      </Link>
      <ul className="flex gap-4 text-[#323836] font-medium">
        <Link href={"/auction"}>
          <li className="hover:opacity-80 px-4 py-2 bg-gradient-to-r from-amber-500 to-slate-700 text-white rounded-3xl">
            Auction
          </li>
        </Link>
        <Link href={"/chat"}>
          <li className="hover:opacity-80 px-4 py-2 bg-gradient-to-r from-amber-500 to-slate-700 text-white rounded-3xl">
            Chat
          </li>
        </Link>
      </ul>
    </header>
  );
};
