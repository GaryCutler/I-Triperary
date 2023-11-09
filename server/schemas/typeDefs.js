const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type User {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    User: User
  }

  type City {
    state: String!
    name: String!
    description: String!
  }
  
  type Query {
    Users: [User]!
    User(UserId: ID!): User
    me: User
    getCityByStateAndName(state: String!, name: String!): City
    chat(message: String!): String
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser: User
  }
`;

module.exports = typeDefs;
