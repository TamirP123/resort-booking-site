import { gql }  from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_USERS = gql`
  query getUsers{
    users {
        username
        email
      }
  }
`;

export const QUERY_ROOMS = gql`
  query getRooms{
    rooms {
        _id
        name
        description
        image
        type
        cost
        amenities
        bedrooms
        bathrooms
        displayImages
      }
  }
`;

export const GET_USER_BOOKINGS = gql`
  query GetUserBookings($userId: ID!) {
    getUserBookings(userId: $userId) {
      _id
      checkInDate
      checkOutDate
      totalPrice
      status
      room {
        _id
        name
        description
        image
      }
    }
  }
`;
