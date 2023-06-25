import { Request, Response, NextFunction } from "express";
import { MongoClient, ObjectId } from "mongodb";

const uri =
  "mongodb+srv://test:test@valosweb-cluster.9bo7mqx.mongodb.net/?retryWrites=true&w=majority";

const getItems = async (req: Request, res: Response, next: NextFunction) => {
  const client = new MongoClient(uri);
  try {
    const database = client.db("auction");
    const items = database.collection("items");

    const member = await items
      .find(
        {},
        {
          limit: 10,
        }
      )
      .toArray();

    return res.status(200).json({
      data: member,
    });
  } finally {
    await client.close();
  }
};

const getCurrentAuction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const client = new MongoClient(uri);
  try {
    const database = client.db("auction");
    const items = database.collection("items");

    const item = await items.find(
      {},
      {
        limit: 1,
      }
    );

    return res.status(200).json({
      data: item,
    });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

const fetchCurrentAuction = async (client: MongoClient, id: string) => {
  try {
    const database = client.db("auction");
    const items = database.collection("items");

    const item = await items.findOne({ _id: new ObjectId(id) });

    return item;
  } catch (err) {
    console.log(err);
  }
};

const updateBid = async (
  client: MongoClient,
  id: string,
  newValue: number,
  highestBidder: string,
  lastBid: string
) => {
  try {
    const database = client.db("auction");
    const items = database.collection("items");

    const filter = { _id: new ObjectId(id) };
    const update = {
      $set: {
        actualPrice: newValue,
        highestBidder: highestBidder,
        lastBid: lastBid,
      },
    };

    await items.updateOne(filter, update);

    return;
  } catch (err) {
    console.log(err);
  }
};

const closeBid = async (client: MongoClient, id: string) => {
  try {
    const database = client.db("auction");
    const items = database.collection("items");

    const filter = { _id: new ObjectId(id) };
    const update = {
      $set: {
        sold: true,
      },
    };

    await items.updateOne(filter, update);

    return;
  } catch (err) {
    console.log(err);
  }
};

export default {
  getCurrentAuction,
  getItems,
  updateBid,
  fetchCurrentAuction,
  closeBid,
};
