const { User, Destination, Itinerary, PackingItem, PackingList} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth'); 

const resolvers = {
  Query: {
    user: async (_, { userId }) => {
      return await User.find(user => user._id === userId);
    },
    itinerary: async (parent, { itineraryId }) => {
      return await Itinerary.find(itinerary => itinerary.id === itineraryId);
    },
    dashboard: (_, { userId }) => {
      return {
        upcomingTrips: Itinerary.filter(itinerary => itinerary.user._id === userId && new Date(itinerary.startDate) > new Date()),
        pastTrips: Itinerary.filter(itinerary => itinerary.user._id === userId && new Date(itinerary.endDate) < new Date())
      };
    },
    chat: (_, { message }) => {
      return `Chat response for message: ${message}`;
    },
    me: async (_, __, context) => {
      if (context.user) {
        return User.find(user => user._id === context.user._id);
      }
      throw new AuthenticationError('User not authenticated');
    },
  },

  Mutation: {
    addUser: async (_, { name, email, password }) => {
      const newUser = { _id: String(users.length + 1), name, email, password, trips: [] };
      User.push(newUser);
      const token = signToken(newUser);
      return { token: token, user: newUser };
    },
    login: async (_, { email, password }) => {
      const user = await User.find(u => u.email === email && u.password === password);
      if (user) {
        return { user };
      }
      throw new AuthenticationError('Incorrect email or password');
    },
    addDestination: (_, { itineraryId, name, quantity }) => {
      const destination = { id: String(Destination.length + 1), name, quantity, location: '', activities: [] };
      Destination.push(destination);
      const itinerary = Itinerary.find(it => it.id === itineraryId);
      if (itinerary) {
        itinerary.Destination.push(destination);
        return destination;
      }
      throw new Error('Itinerary not found');
    },

    // We can propably use it in the future
    // addActivity: (_, { name, location, description }) => {
    //   const newActivity = { id: String(activities.length + 1), name, location, description };
    //   activities.push(newActivity);
    //   return newActivity;
    // },
    
    addActivityToDestination: (_, { destinationId, activityId }) => {
      const destination = Destination.find(dest => dest.id === destinationId);
      const activity = activities.find(act => act.id === activityId);
      if (destination && activity) {
        destination.activities.push(activity);
        return destination;
      }
      throw new Error('Destination or activity not found');
    },
    addPackingItem: async (_, { packingListId, name, quantity }) => {
      const packingItem = { name, quantity, packed: false };
      const packingList = await PackingList.updateOne(
        { _id: packingListId }, 
        { $push: {items: packingItem} },
        { new: true}
      );
      return packingList;
    },
    updatePackingItem: async (_, { packingListId, name, quantity, packed }) => {
      const packingList = await PackingList.findById(packingListId);
      const packingItem = {

      }
      if (packingItem) {
        packingItem.packed = packed;
        return packingItem;
      }
      throw new Error('Packing item not found');
    },
    addItinerary: async (_, { userId, startDate, endDate }) => {
      const user = await User.findById(userId);
      if (user) {
        const newItinerary = { user, startDate, endDate, destinations: [], packingList: [] };
        const itinerary = await Itinerary.create(newItinerary);
        if (user.trips && user.trips.length > 0) {
          user.trips.push(itinerary);
        } else {
          user.trips = [itinerary];
        }
        user.save();
        return itinerary;
      }
      throw new Error('User not found');
    },
    addDestinationToItinerary: async (_, { itineraryId, destinationId }) => {
      const itinerary = await Itinerary.find(it => it.id === itineraryId);
      const destination = await Destination.find(dest => dest.id === destinationId);
      if (itinerary && destination) {
        itinerary.Destination.push(destination);
        return itinerary;
      }
      throw new Error('Itinerary or destination not found');
    },
    addItemToPackingList: async (_, { itineraryId, itemId }) => {
      const itinerary = await Itinerary.find(it => it.id === itineraryId);
      const packingItem = await PackingList.find(item => item.id === itemId);
      if (itinerary && packingItem) {
        itinerary.PackingList.push(packingItem);
        return itinerary;
      }
      throw new Error('Itinerary or packing item not found');
    },
    deleteDestination: async (_, { itineraryId, name, quantity }) => {
      const itinerary = await Itinerary.find(it => it.id === itineraryId);
      
      if (itinerary) {
        const destinationIndex = itinerary.Destination.findIndex(dest => dest.name === name && dest.quantity === quantity);
        
        if (destinationIndex !== -1) {
          const deletedDestination = itinerary.Destination.splice(destinationIndex, 1)[0];
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
