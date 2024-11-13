import React from "react";

import "./CommentItem.css";
import { useState } from "react";

import Rating from "@mui/material/Rating";
import axiosInstance from "utils/axiosInstance";

export default function CommentItem({ reviewItem }) {
  const loggedInID = sessionStorage.getItem("user_id");

  const { user_id, movie_id, comment, rate } = reviewItem;

  const [isEdit, setIsEdit] = useState(false);

  const [reviewData, setReviewData] = useState({
    user_id: user_id,
    movie_id: movie_id,
    comment: comment,
    rate: rate,
  });

  const handleChangeRate = (_, newRate) => {
    setReviewData((prev) => ({
      ...prev,
      rate: newRate,
    }));
  };

  const handleChangeComment = (value) => {
    setReviewData((prev) => ({
      ...prev,
      comment: value,
    }));
  };

  const editReview = async () => {
    await axiosInstance.post(`/detail/${movie_id}/edit`, {
      user_id: user_id,
      movie_id: movie_id,
      comment: reviewData.comment,
      rate: reviewData.rate,
    });
  };

  const handleClickEdit = () => {
    if (isEdit) {
      editReview();
    }
    setIsEdit((prev) => !prev);
  };

  return (
    <div className="reviewWrapper">
      <div className="reviewHeader">
        <span className="userName">{user_id}</span>
        {isEdit ? (
          <Rating
            name="simple-controlled"
            value={rate}
            onChange={handleChangeRate}
          />
        ) : (
          <Rating value={rate} readOnly />
        )}
        {loggedInID === user_id && (
          <button className="editButton" onClick={handleClickEdit}>
            {isEdit ? "수정완료" : "수정하기"}
          </button>
        )}
      </div>
      <div className="reviewContent">
        {isEdit ? (
          <textarea
            placeholder={reviewData.comment}
            className="commentInput"
            onChange={handleChangeComment}
          />
        ) : (
          comment
        )}
      </div>
    </div>
  );
}
