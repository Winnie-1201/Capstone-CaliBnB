import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import { getUserBookingsThunk } from "../../../store/bookings";
import ReviewForm from "../CreateReviewForm";
import "./index.css";

function ReviewsToWrite() {
  const dispatch = useDispatch();
  const history = useHistory();

  // const [showReviewModal, setReviewModal] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const userBookings = useSelector((state) => state.bookings.userBookings);
  const userReviews = useSelector((state) => state.reviews.userReviews);

  useEffect(() => {
    dispatch(getUserBookingsThunk()).then(() => setLoaded(true));
  }, [dispatch]);

  //   console.log("user bookings", userBookings);
  //   console.log("user reviews", userReviews);
  let reviewsToWrite = [];
  if (
    loaded &&
    Object.values(userBookings).length > Object.values(userReviews).length
  ) {
    const pastBooking = Object.values(userBookings).filter(
      (booking) => new Date(booking.end) < new Date()
    );
    let spotReviewed = [];
    let spotBooked = [];
    for (let key in userReviews) {
      spotReviewed.push(userReviews[key].spot.id);
    }
    // console.log("spot reviewed id", spotReviewed, typeof spotReviewed[0]);

    for (let i in pastBooking) {
      if (!spotReviewed.includes(pastBooking[i].spotInfo.id)) {
        reviewsToWrite.push(pastBooking[i]);
      }
    }
    // for (let key in userBookings) {
    //   console.log(
    //     "key in userbookings and type",
    //     userBookings[key].spotInfo.id,
    //     typeof userBookings[key].spotInfo.id,
    //     spotReviewed,
    //     spotReviewed.includes(userBookings[key].spotInfo.id)
    //   );
    //   if (!spotReviewed.includes(userBookings[key].spotInfo.id)) {
    //     reviewsToWrite.push(userBookings[key]);
    //   }
    // }

    // for (let i in spotBooked) {
    //   if (!spotReviewed.includes(spotBooked[i])) {
    //     reviewsToWrite.push()
    //   }
    // }
    console.log("spot that need to be review", reviewsToWrite);
  }

  return (
    loaded && (
      <>
        {reviewsToWrite.length > 0 ? (
          <>
            {reviewsToWrite.map((booking) => (
              <div className="flex-column" key={booking.id}>
                <div className="rtr-block flex">
                  <div className="rtr-block-left">
                    <div
                      className="rtr-link-to-ds"
                      onClick={() =>
                        history.push(`/spots/${booking.spotInfo.id}`)
                      }
                    >
                      <img
                        src={booking.spotInfo.images[0].url}
                        className="rtr-spot-img"
                      />
                    </div>
                    <button
                      className="rtr-review-bt"
                      onClick={() =>
                        history.push(`/bookings/${booking.id}/review`)
                      }
                      //   onClick={() => setReviewModal(true)}
                    >
                      <span>Leave a review</span>
                    </button>

                    {/* {showReviewModal && (
                      <Modal onClose={() => setReviewModal(false)}>
                        <ReviewForm
                          type={"create"}
                          spotId={booking.spotInfo.id}
                          setReviewModal={setReviewModal}
                        />
                      </Modal>
                    )} */}
                  </div>
                  <div className="rtr-block-right">
                    {/* <div className="rtr-right-text" */}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="mb-16 mt-8">
            <span>
              Nobody to review right now. Looks like it's time for another trip!
            </span>
          </div>
        )}
      </>
    )
  );
}

export default ReviewsToWrite;
