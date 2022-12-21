const SPOT_BOOKING = "bookings/getSpotBookings";
const USER_BOOKING = "bookings/getUserBookings";
const LOAD_ONE = "bookings/getOneBooking";
const CANCEL = "bookings/cancelBooking";

const getSpotBookings = (bookings) => ({
  type: SPOT_BOOKING,
  bookings,
});

const getUserBookings = (bookings) => ({
  type: USER_BOOKING,
  bookings,
});

const getOneBooking = (booking) => ({
  type: LOAD_ONE,
  booking,
});

const cancelBooking = (bookingId) => ({
  type: CANCEL,
  bookingId,
});

export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/bookings`);

  if (response.ok) {
    const bookings = await response.json();
    dispatch(getSpotBookings(bookings.Bookings));
    return bookings;
  }
};

export const getUserBookingsThunk = () => async (dispatch) => {
  const response = await fetch("/api/bookings/current");

  if (response.ok) {
    const bookings = await response.json();
    dispatch(getUserBookings(bookings.Bookings));
    return bookings;
  }
};

export const getOneBookingThunk = (bookingId) => async (dispatch) => {
  const response = await fetch(`/api/bookings/${bookingId}`);

  if (response.ok) {
    const booking = await response.json();
    dispatch(getOneBooking(booking));
    return booking;
  }
};

export const createBookingThunk = (spotId, booking) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });

  if (response.ok) {
    const booking = await response.json();
    dispatch(getOneBooking(booking));
    return booking;
  }
};

export const editReviewThunk = (booking) => async (dispatch) => {
  const response = await fetch(`/api/bookings/${booking.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });

  if (response.ok) {
    const booking = await response.json();
    dispatch(getOneBooking(booking));
    return booking;
  }
};

export const cancelBookingThunk = (bookingId) => async (dispatch) => {
  const response = await fetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(cancelBooking(reviewId));
    return response;
  }
};

const initialState = { spotBookings: {}, userBookings: {} };

export default function reviewReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case SPOT_BOOKING:
      action.bookings.forEach(
        (booking) => (newState.spotBookings[booking.id] = booking)
      );
      //   return { ...state, spotReviews: action.reviews };
      return newState;
    case USER_BOOKING:
      action.bookings.forEach(
        (booking) => (newState.userBookings[booking.id] = booking)
      );
      return newState;
    // return { ...state, userReviews: action.reviews };
    // case LOAD_ONE:

    case CANCEL:
      // change the userReview to a dict
      delete newState.userBookings[action.bookingId];
      return newState;
    default:
      return state;
  }
}
