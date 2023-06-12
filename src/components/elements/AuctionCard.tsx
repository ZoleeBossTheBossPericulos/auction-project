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
  name: string;
  startPrice: number;
  actualPrice: number;
  thumbnail: string;
  onBid: (newBid: number) => void;
  description?: string;
  disabled: boolean;
}

export const AuctionCard = ({
  actualPrice,
  name,
  startPrice,
  thumbnail,
  description,
  onBid,
  disabled,
}: IAcutionCard) => {
  const [bidValue, setBidValue] = useState<number>(0);

  return (
    <Card className="shadow-md !bg-amber-100">
      <CardHeader title={name} subheader={new Date().toDateString()} />
      <CardMedia
        component="img"
        image={thumbnail}
        alt={name}
        className="max-h-72 !object-contain"
      />
      <CardContent>
        <Typography variant="body2" className="max-h-24 overflow-y-auto">
          {description}
        </Typography>
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
            disabled={disabled}
          />
          <IconButton
            className="!rounded-sm !mx-4"
            onClick={() => {
              onBid(bidValue);
            }}
          >
            Bid
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
};
