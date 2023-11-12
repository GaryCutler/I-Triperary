const { AuthenticationError } = require('../models'); 

const users = [];
const itineraries = [];
const destinations = [];
const activities = [];
const packingLists = [];

const resolvers = {
  Query: {
    user: (_, { userId }) => {
      return users.find(user => user._id === userId);
    },
    itinerary: (_, { itineraryId }) => {
      return itineraries.find(itinerary => itinerary.id === itineraryId);
    },
    dashboard: (_, { userId }) => {
      return {
        upcomingTrips: itineraries.filter(itinerary => itinerary.user._id === userId && new Date(itinerary.startDate) > new Date()),
        pastTrips: itineraries.filter(itinerary => itinerary.user._id === userId && new Date(itinerary.endDate) < new Date())
      };
    },
    chat: (_, { message }) => {
      return `Chat response for message: ${message}`;
    },
    me: (_, __, context) => {
      if (context.user) {
        return users.find(user => user._id === context.user._id);
      }
      throw new AuthenticationError('User not authenticated');
    },
  },
  Mutation: {
    addUser: (_, { name, email, password }) => {
      const newUser = { _id: String(users.length + 1), name, email, password, trips: [] };
      users.push(newUser);
      return { token: 'your-auth-token', User: newUser };
    },
    login: (_, { email, password }) => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        return { token: 'your-auth-token', User: user };
      }
      throw new AuthenticationError('Incorrect email or password');
    },
    addDestination: (_, { itineraryId, name, quantity }) => {
      const destination = { id: String(destinations.length + 1), name, quantity, location: '', activities: [] };
      destinations.push(destination);
      const itinerary = itineraries.find(it => it.id === itineraryId);
      if (itinerary) {
        itinerary.destinations.push(destination);
        return destination;
      }
      throw new Error('Itinerary not found');
    },
    addActivity: (_, { name, location, description }) => {
      const newActivity = { id: String(activities.length + 1), name, location, description };
      activities.push(newActivity);
      return newActivity;
    },
    addActivityToDestination: (_, { destinationId, activityId }) => {
      const destination = destinations.find(dest => dest.id === destinationId);
      const activity = activities.find(act => act.id === activityId);
      if (destination && activity) {
        destination.activities.push(activity);
        return destination;
      }
      throw new Error('Destination or activity not found');
    },
    addPackingItem: (_, { itineraryID, name, quantity }) => {
      const packingItem = { id: String(packingLists.length + 1), name, quantity, packed: false };
      packingLists.push(packingItem);
      return packingItem;
    },
    updatePackingItem: (_, { itemId, packed }) => {
      const packingItem = packingLists.find(item => item.id === itemId);
      if (packingItem) {
        packingItem.packed = packed;
        return packingItem;
      }
      throw new Error('Packing item not found');
    },
    addItinerary: (_, { userId, startDate, endDate }) => {
      const user = users.find(u => u._id === userId);
      if (user) {
        const newItinerary = { id: String(itineraries.length + 1), user, startDate, endDate, destinations: [], packingList: [] };
        itineraries.push(newItinerary);
        user.trips.push(newItinerary);
        return newItinerary;
      }
      throw new Error('User not found');
    },
    addDestinationToItinerary: (_, { itineraryId, destinationId }) => {
      const itinerary = itineraries.find(it => it.id === itineraryId);
      const destination = destinations.find(dest => dest.id === destinationId);
      if (itinerary && destination) {
        itinerary.destinations.push(destination);
        return itinerary;
      }
      throw new Error('Itinerary or destination not found');
    },
    addItemToPackingList: (_, { itineraryId, itemId }) => {
      const itinerary = itineraries.find(it => it.id === itineraryId);
      const packingItem = packingLists.find(item => item.id === itemId);
      if (itinerary && packingItem) {
        itinerary.packingList.push(packingItem);
        return itinerary;
      }
      throw new Error('Itinerary or packing item not found');
    },
    deleteDestination: (_, { itineraryId, name, quantity }) => {
      const itinerary = itineraries.find(it => it.id === itineraryId);
      
      if (itinerary) {
        const destinationIndex = itinerary.destinations.findIndex(dest => dest.name === name && dest.quantity === quantity);
        
        if (destinationIndex !== -1) {
          const deletedDestination = itinerary.destinations.splice(destinationIndex, 1)[0];
          return deletedDestination;
        } else {
          throw new Error('Destination not found in the itinerary');
        }
      } else {
        throw new Error('Itinerary not found');
      }
    },
  },
};

module.exports = resolvers;
