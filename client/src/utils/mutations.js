import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ROOM = gql`
  mutation addRoom($name: String!, $description: String!, $image: String!, $type: String!, $cost: Int!) {
    addRoom(name: $name, description: $description, image: $image, type: $type, cost: $cost) {
      name
      description
      image
      type
      cost
    }
  }
`;

export const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($amount: Int!) {
    createPaymentIntent(amount: $amount) {
      clientSecret
    }
  }
`;

export const CREATE_BOOKING = gql`
  mutation createBooking(
    $userId: ID!
    $roomId: ID!
    $checkInDate: String!
    $checkOutDate: String!
    $totalPrice: Int!
  ) {
    createBooking(
      userId: $userId
      roomId: $roomId
      checkInDate: $checkInDate
      checkOutDate: $checkOutDate
      totalPrice: $totalPrice
    ) {
      _id
      checkInDate
      checkOutDate
      totalPrice
      status
    }
  }
`;

export const UPDATE_BOOKING = gql`
  mutation updateBooking($bookingId: ID!, $status: String!) {
    updateBooking(bookingId: $bookingId, status: $status) {
      _id
      status
    }
  }
`;

export const DELETE_BOOKING = gql`
  mutation deleteBooking($bookingId: ID!) {
    deleteBooking(bookingId: $bookingId) {
      _id
    }
  }
`;

