const { User, Room, Booking } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
// Having issues with my API key via .env This is a free provided key from Stripe, typically would NOT put a secret key explicity like below.
const stripe = require('stripe')('sk_test_51Pss2CC5VCV0wby5a0zQ6Apnw4Iy8Mx8kfkDD0iPgZ9YK99zBVg47LDqLqjvbbaSKwYVCOXMzxg5gbfXyz73bGiI00N0awVH2o');



const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('Not authenticated');
    },
    rooms: async () => {
      return Room.find();
    },
    getUserBookings: async (_, { userId }) => {
      return await Booking.find({ user: userId }).populate('room');
    },
    getBooking: async (_, { bookingId }) => {
      return await Booking.findById(bookingId).populate('user').populate('room');
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = signToken(user);
      return { token, user };
    },
    addRoom: async (parent, { name, description, image, type, cost }) => {
      return Room.create({ name, description, image, type, cost });
    },
    createPaymentIntent: async (_, { amount }) => {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'usd',
        });

        return {
          clientSecret: paymentIntent.client_secret,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    createBooking: async (_, { userId, roomId, checkInDate, checkOutDate, totalPrice }) => {
      // Create new booking
      const booking = await Booking.create({
        user: userId,
        room: roomId,
        checkInDate,
        checkOutDate,
        totalPrice,
        status: 'Confirmed'
      });

      // Add booking to user
      await User.findByIdAndUpdate(userId, { $push: { bookings: booking._id } });

      return booking;
    },
    updateBooking: async (_, { bookingId, status }) => {
      return await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
    },
    deleteBooking: async (_, { bookingId }) => {
      const booking = await Booking.findById(bookingId);

      if (booking) {
        // Remove booking from user's bookings array
        await User.findByIdAndUpdate(booking.user, { $pull: { bookings: bookingId } });

        await Booking.findByIdAndDelete(bookingId);
      }

      return booking;
    }
  },
};

module.exports = resolvers;
