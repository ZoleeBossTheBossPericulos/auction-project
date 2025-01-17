import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

export interface IAcutionCard {
  _id: string;
  name: string;
  startPrice: number;
  actualPrice: number;
  thumbnail: string;
  onBid: (newBid: number) => void;
  description?: string;
  disabled: boolean;
  sold: boolean;
  highestBidder: string;
  lastBid: number;
  onTimeUp: (name: string) => void;
}

export const AuctionCard = ({
  actualPrice,
  name,
  startPrice,
  thumbnail,
  description,
  onBid,
  disabled,
  highestBidder,
  sold,
  lastBid,
}: IAcutionCard) => {
  const [bidValue, setBidValue] = useState<number>(0);

  return (
    <Card className="shadow-md !bg-amber-100">
      <CardHeader title={name} subheader={new Date().toDateString()} />
      <CardMedia
        component="img"
        image={thumbnail}
        alt={name}
        className="max-h-72 !object-contain mix-blend-multiply"
      />
      <CardContent>
        <Typography variant="body2" className="max-h-24 overflow-y-auto">
          {description}
        </Typography>
        <Typography
          variant="body2"
          className={`max-h-24 overflow-y-auto ${
            highestBidder === localStorage.getItem("name") && "text-green-600"
          }`}
        >
          Highest bid: {highestBidder}
        </Typography>
        <div className="flex flex-col">
          {lastBid && !isNaN(lastBid % 60) && (
            <span className={`${lastBid % 60 < 20 && "text-red-500"}`}>
              Remaining time to bid: {lastBid % 60}s
            </span>
          )}

          {sold && (
            <span
              className={`max-h-24 overflow-y-auto ${
                highestBidder === localStorage.getItem("name") &&
                "text-green-600"
              }`}
            >
              {name} has been sold! {highestBidder} won this auction!
            </span>
          )}
        </div>
      </CardContent>
      <div className="flex justify-between">
        <CardActions disableSpacing>
          <IconButton
            className="!rounded-sm hover:!bg-white !text-base"
            disableRipple
            disableFocusRipple
            disableTouchRipple
          >
            {actualPrice > startPrice ? "Actual price: " : "Starting price: "}
            {actualPrice > startPrice ? actualPrice : startPrice}€
          </IconButton>
        </CardActions>
        <CardActions disableSpacing>
          <TextField
            id="bid"
            type="number"
            InputProps={{
              inputProps: {
                min: actualPrice + 1,
              },
            }}
            label="Your bid (€)"
            variant="outlined"
            value={bidValue}
            onChange={(newValue) => {
              setBidValue(Number(newValue.target.value));
            }}
            disabled={disabled || sold}
          />
          {!disabled && !sold && (
            <IconButton
              className="!rounded-sm !mx-4"
              onClick={() => {
                onBid(bidValue);
              }}
            >
              Bid
            </IconButton>
          )}
        </CardActions>
      </div>
    </Card>
  );
};
