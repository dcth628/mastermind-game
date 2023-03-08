import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/review";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { getSpotDetail } from "../../store/spot";
import './ReviewCreate.css'

const CreateReviewFrom = ({ spotId , disabled}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");

    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            spotId: spotId,
            review,
            stars
        };

        let createdReview = await dispatch(createReview(newReview));
        if (createdReview) {
            closeModal();
            history.push(`/spots/${spotId}`);
        };
       dispatch(getSpotDetail(spotId))
    };

    const onChange = (e) => {
        setStars(e);
        // const number = e.target.value;
        // setRating(parseInt(number));
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
        // history.push('/api/spots')
    };

    return (
        <section className="new-review-form-holder">
            <form className="create-review-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Write a review"
                    required
                    value={review}
                    onChange={updateReview} />
                <input
                    type="number"
                    placeholder="stars"
                    disabled={disabled}
                    required
                    value={stars}
                    onChange={updateStars} />

                {/* <div className="rating-input">
                    <div onMouseEnter={disabled === false ? () => setStars(1) : () => setStars(stars)}
                        onMouseLeave={() => setStars(stars)}
                        className={
                            stars >= 1
                                ? "filled"
                                : "empty"
                        }
                        onClick={() => onChange(1)}
                    >
                    <i className="fa fa-heart"></i>
                    </div>
                    <div onMouseEnter={disabled === false ? () => setStars(2) : () => setStars(stars)}
                        onMouseLeave={() => setStars(stars)}
                        className={
                            stars >= 1
                                ? "filled"
                                : "empty"
                        }
                        onClick={() => onChange(2)}
                    >
                    <i className="fa fa-heart"></i>
                    </div>
                    <div onMouseEnter={disabled === false ? () => setStars(3) : () => setStars(stars)}
                        onMouseLeave={() => setStars(stars)}
                        className={
                            stars >= 1
                                ? "filled"
                                : "empty"
                        }
                        onClick={() => onChange(3)}
                    >
                    <i className="fa fa-heart"></i>
                    </div>
                    <div onMouseEnter={disabled === false ? () => setStars(4) : () => setStars(stars)}
                        onMouseLeave={() => setStars(stars)}
                        className={
                            stars >= 1
                                ? "filled"
                                : "empty"
                        }
                        onClick={() => onChange(4)}
                    >
                    <i className="fa fa-heart"></i>
                    </div>
                    <div onMouseEnter={disabled === false ? () => setStars(5) : () => setStars(stars)}
                        onMouseLeave={() => setStars(stars)}
                        className={
                            stars >= 1
                                ? "filled"
                                : "empty"
                        }
                        onClick={() => onChange(5)}
                    >
                    <i className="fa fa-heart"></i>
                    </div>
                </div> */}
                <button type="submit">Create new Review</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
};

export default CreateReviewFrom;
