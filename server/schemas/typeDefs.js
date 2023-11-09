const typeDefs = gql `
  type User {
    _id: ID
    name: String!
    email: String!
    password: String!
    trips: [Itinerary!]!
  }

  type Auth {
    token: ID!
    User: User
  }

  type Destination {
    id: ID!
    name: String!
    location: String!
    activities: [String!]!
  }

  type Activity {
    id: ID!
    name: String!
    location: String!
    description: String!
  }

  type Itinerary {
    id: ID!
    user: User!
    destinations: [Destination!]!
    startDate: String!
    endDate: String!
    packingList: PackingList!
  }

  type TripDashboard {
    upcomingTrips: [Itinerary!]!
    pastTrips: [Itinerary!]!
  }  
  
  type Query {
    user(userId: ID!): User
    itinerary(itineraryId: ID!): Itinerary
    dashboard(userId: ID!): TripDashboard
    chat(message: String): String
    me: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDestination(itineraryId: ID!, name: String! quantity: Int!): Destination
    addPackingItem(itineraryID: ID!, name: String!, quantity: Int!): PackingItem
    updatePackingItem(itemId: ID!, packed: Boolean!): PackingItem
    addItinerary(userId: ID!, startDate: String!, endDate: String!): Itinerary
    addDestinationToItinerary(itineraryId: ID!, destinationId: ID!): Itinerary
    addItemToPackingList(itineraryId: ID!, itemId: ID!): PackingList
  }
`;

module.exports = typeDefs;
