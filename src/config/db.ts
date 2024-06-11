import mongoose from "mongoose";

async function db(database_uri: string): Promise<void> {
  try {
    await mongoose.connect(database_uri);
  } catch (error) {
    throw Error(error as string);
  }
}

export default db;
