import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    const model = models[modelName];
    const nativeDb = model?.db?.db;

    if (!nativeDb) {
      throw new Error(`Database reference not found on model: ${modelName}`);
    }

    const modelExists = await nativeDb.listCollections({ name: collectionName }).toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}; 