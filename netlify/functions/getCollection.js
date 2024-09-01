import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

export const handler = async (event) => {
  try {
    const db = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = db.collection("groups");
    const results = await collection.find({}).limit(10).toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(results),
    }
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: error.toString() };
  }
}