const typeDefs = `
type User {
  _id: ID
  username: String!
  email: String!
  password: String!
}

type Room {
    _id: ID
    name: String
    description: String
    image: String
    type: String
    cost: Int
    amenities: [String]
    bedrooms: Int
    bathrooms: Int
  }

type Query {
  users: [User]
  user(username: String!): User
  me: User
  rooms: [Room]
}

type Auth {
  token: ID
  user: User
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addRoom(name: String!, description: String!, image: String!, type: String!, cost: Int!): Room
}
`;

module.exports = typeDefs