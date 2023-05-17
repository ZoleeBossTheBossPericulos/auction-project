import Image from "next/image";
import Button from "./Button";

interface IAcutionCard {
  name: string;
  startPrice: number;
  actualPrice: number;
  thumbnail: string;
  description?: string;
}

export const AuctionCard = ({
  actualPrice,
  name,
  startPrice,
  thumbnail,
  description,
}: IAcutionCard) => {
  return (
    <div className="bg-[#B7B6C1] w-fit text-black flex flex-col items-center max-w-[400px] px-4 py-2 rounded-md">
      <Image
        src={thumbnail}
        alt={"product-image"}
        width={200}
        height={400}
        className="mix-blend-multiply"
      />
      <h4 className="text-2xl font-semibold drop-shadow-lg shadow-black">
        {name}
      </h4>
      <p className="mt-4 mb-8">{description}</p>

      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center">
          {startPrice === actualPrice ? (
            <p>Starting price:</p>
          ) : (
            <p>Actual price:</p>
          )}
          <Button className="ml-2 !hover:opacity-100" disabled>
            877
          </Button>
        </div>
        <Button>Bid</Button>
      </div>
    </div>
  );
};
