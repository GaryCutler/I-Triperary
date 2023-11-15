// const { gql } = require('apollo-server');
// const typeDefs = gql`
const typeDefs = `
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    trips: [Itinerary]
  }

  type Auth {
    token: ID
    user: User
  }

  type Destination {
    _id: ID!
    name: String
    location: String
    activities: [Activity]
  }

  type Activity {
    _id: ID!
    name: String
    location: String
    description: String
  }

  type PackingItem {
    _id: ID!
    name: String!
    quantity: Int!
    packed: Boolean!
  }

  type PackingList {
    _id: ID
    items: [PackingItem]
  }

  type Itinerary {
    _id: ID!
    destinations: [Destination]
    startDate: String
    endDate: String
    packingList: PackingList
  }

  type TripDashboard {
    upcomingTrips: [Itinerary]
    pastTrips: [Itinerary]
  }  
  
  type Query {
    user(userId: ID!): User
    itinerary(itineraryId: ID!): Itinerary
    dashboard(userId: ID!): TripDashboard
    chat(message: String): String
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDestination(itineraryId: ID!, name: String!, location: String!): Destination
    addPackingItem(itineraryID: ID!, name: String!, quantity: Int!): PackingItem
    updatePackingItem(itemId: ID!, packed: Boolean!): PackingItem
    addItinerary(userId: ID!, startDate: String!, endDate: String!): Itinerary
    addDestinationToItinerary(itineraryId: ID!, destinationId: ID!): Itinerary
    addItemToPackingList(itineraryId: ID!, itemId: ID!): PackingList
    addActivityToDestination(destinationId: ID!, activityId: ID!): Destination
    deleteDestination(itineraryId: ID!, name: String!, quantity: Int!): Destination
  }
`;

module.exports = typeDefs;
