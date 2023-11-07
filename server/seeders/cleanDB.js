const models = require('../models');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    const collection = models[modelName].db.db.collection(collectionName);
    const collectionInfo = await collection.listCollections({ name: collectionName }).toArray();

    if (collectionInfo.length > 0) {
      await collection.drop();
    }
  } catch (error) {
    throw error;
  }
};
