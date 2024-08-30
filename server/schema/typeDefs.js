const typeDefs = `
type Booking {
  _id: ID!
  user: User!
  room: Room!
  checkInDate: String!
  checkOutDate: String!
  totalPrice: Int
  status: String!
}

type User {
  _id: ID!
  username: String!
  email: String!
  bookings: [Booking!]!
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
    displayImages: [String]
  }

type Query {
  users: [User]
  user(username: String!): User
  me: User
  rooms: [Room]
  getUserBookings(userId: ID!): [Booking!]!
  getBooking(bookingId: ID!): Booking
}

type Auth {
  token: ID
  user: User
}

type PaymentIntentResponse {
    clientSecret: String!
  }

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addRoom(name: String!, description: String!, image: String!, type: String!, cost: Int!): Room
  createPaymentIntent(amount: Int!): PaymentIntentResponse!
  createBooking(userId: ID!, roomId: ID!, checkInDate: String!, checkOutDate: String!, totalPrice: Int!): Booking!
  updateBooking(bookingId: ID!, status: String!): Booking!
  deleteBooking(bookingId: ID!): Booking!
}
`;

module.exports = typeDefs