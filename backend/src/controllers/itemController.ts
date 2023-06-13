import { Request, Response, NextFunction } from "express";
import { MongoClient } from "mongodb";

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

// updating a post
const updateMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const client = new MongoClient(uri);
  try {
    const database = client.db("Gym");
    const movies = database.collection("Members");

    const movie = await movies
      .find(
        { name: req.body.name },
        {
          limit: 10,
        }
      )
      .toArray();

    return res.status(200).json({
      data: movie,
    });
  } finally {
    await client.close();
  }
};

// adding a post
const addMember = async (req: Request, res: Response, next: NextFunction) => {
  const client = new MongoClient(uri);
  try {
    const database = client.db("Gym");
    const movies = database.collection("Members");

    const movie = await movies
      .find(
        { name: req.body.name },
        {
          limit: 10,
        }
      )
      .toArray();

    return res.status(200).json({
      data: movie,
    });
  } finally {
    await client.close();
  }
};

const fetchCurrentAuction = async () => {
  const client = new MongoClient(uri);
  try {
    const database = client.db("auction");
    const items = database.collection("items");

    const item = await items
      .find(
        {},
        {
          limit: 1,
        }
      )
      .toArray();

    return item;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

const updateBid = async (
  name: string,
  newValue: number,
  highestBidder: string,
  lastBid: string
) => {
  const client = new MongoClient(uri);
  try {
    const database = client.db("auction");
    const items = database.collection("items");

    const filter = { name: name };
    const update = {
      $set: {
        actualPrice: newValue,
        highestBidder: highestBidder,
        lastBid: lastBid,
      },
    };

    await items.updateOne(filter, update);

    return;
  } finally {
    await client.close();
  }
};

export default {
  addMember,
  updateMember,
  getCurrentAuction,
  getItems,
  updateBid,
  fetchCurrentAuction,
};
