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
          <TextField id="bid" label="Your bid (€)" variant="outlined" />
          <IconButton className="!rounded-sm !mx-4">Bid</IconButton>
        </CardActions>
      </div>
    </Card>
  );
};
