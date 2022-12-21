const SPOT_REV = "reviews/getSpotReivews";
const USER_REV = "reviews/getUserReviews";
const LOAD_ONE = "reviews/getOneReview";
const DELETE_REV = "reviews/deleteOneReview";

const getSpotReviews = (reviews) => ({
  type: SPOT_REV,
  reviews,
});

const getUserReviews = (reviews) => ({
  type: USER_REV,
  reviews,
});

const getOneReview = (review) => ({
  type: LOAD_ONE,
  review,
});

const deleteReview = (reviewId) => ({
  type: DELETE_REV,
  reviewId,
});

export const getSpotReivewsThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(getSpotReviews(reviews.Reviews));
    return reviews;
  }
};

export const getUserReviewsThunk = () => async (dispatch) => {
  const response = await fetch("/api/reviews/current");

  if (response.ok) {
    const reviews = await response.json();
    dispatch(getUserReviews(reviews.Reviews));
    return reviews;
  }
};

export const getOneReviewThunk = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`);

  if (response.ok) {
    const review = await response.json();
    dispatch(getOneReview(review));
    return review;
  }
};

export const createReviewThunk = (spotId, review) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(getOneReview(review));
    return review;
  }
};

export const editReviewThunk = (review) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${review.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(getOneReview(review));
    return review;
  }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReview(reviewId));
    return response;
  }
};

// change both to dict later
const initialState = { spotReviews: {}, userReviews: {} };

export default function reviewReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case SPOT_REV:
      action.reviews.forEach(
        (review) => (newState.spotReviews[review.id] = review)
      );
      //   return { ...state, spotReviews: action.reviews };
      return newState;
    case USER_REV:
      action.reviews.forEach(
        (review) => (newState.userReviews[review.id] = review)
      );
      return newState;
    // return { ...state, userReviews: action.reviews };
    // case LOAD_ONE:

    case DELETE_REV:
      // change the userReview to a dict
      delete newState.userReviews[action.reviewId];
      return newState;
    default:
      return state;
  }
}