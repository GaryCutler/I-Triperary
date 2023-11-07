const db = require('../config/connection');
const { Profile } = require('../models');
const cleanDB = require('./cleanDB');
const profileSeeds = require('./profileSeeds.json');

const seedDatabase = async () => {
  try {
    await cleanDB('Profile', 'profiles');
    await Profile.create(profileSeeds);

    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    db.close();
  }
};

db.once('open', seedDatabase);
