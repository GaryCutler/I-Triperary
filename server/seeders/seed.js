const db = require('../config/connection');
const { User } = require('../models');
const cleanDB = require('./cleanDB');
const userSeeds = require('./userSeeds.json');

const seedDatabase = async () => {
  try {
    await cleanDB('user', 'users');
    await User.create(userSeeds);

    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    db.close();
  }
};

db.once('open', seedDatabase);
