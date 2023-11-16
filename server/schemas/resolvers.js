const { User, Destination, Itinerary, PackingItem, PackingList} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth'); 

const resolvers = {
  Query: {
    user: async (_, { userId }) => {
      return await User.findById(userId);
    },
    itinerary: async (parent, { itineraryId }) => {
      return await Itinerary.findById(itineraryId);
    },
    dashboard: async (_, { userId }) => {
        const upcomingTrips = await Itinerary.find({ 'user._id': userId, startDate: { $gt: new Date() } });
        const pastTrips = await Itinerary.find({ 'user._id': userId, endDate: { $lt: new Date() } });
        return { upcomingTrips, pastTrips };
    },
    chat: (_, { message }) => {
      return `Chat response for message: ${message}`;
    },
    me: async (_, __, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('User not authenticated');
    },
  },

  Mutation: {
    addUser: async (_, { username:name, email, password }) => {
      const newUser = await User.create({name, email, password, trips: [] });
      const token = signToken(newUser);
      return { token: token, user: newUser };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email, password });
      console.log(user);
      if (user) {
        return { user };
      }
      throw new Error('Incorrect email or password');
    },
    addDestination: async (_, { itineraryId, name, quantity }) => {
      const destination = await Destination.create({ name, quantity, location: '', activities: [] });
      const itinerary = await Itinerary.findById(itineraryId);
      if (itinerary) {
        itinerary.destinations.push(destination);
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
        { $push: { items: packingItem } },
        { new: true}
      );
      return packingList;
    },
    updatePackingItem: async (_, { packingListId, packed }) => {
      const packingList = await PackingList.findById(packingListId);
      if (packingList) {
        packingList.items[0].packed = packed;
        await packingList.save();
        return packingList.items[0];
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
