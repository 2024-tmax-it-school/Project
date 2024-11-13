import React, { useEffect } from "react";

import "./CommentItem.css";
import { useState } from "react";

import Rating from "@mui/material/Rating";
import axiosInstance from "utils/axiosInstance";

export default function CommentItem({ reviewItem, getReviews }) {
  const loggedInID = sessionStorage.getItem("user_id");

  const { user_id, movie_id, comment, rate } = reviewItem;

  const [isEdit, setIsEdit] = useState(false);

  const [reviewData, setReviewData] = useState({
    user_id: user_id,
    movie_id: movie_id,
    comment: comment,
    rate: rate,
  });

  useEffect(() => {
    setReviewData(reviewItem);
  }, [reviewItem]);

  const handleChangeRate = (_, newRate) => {
    setReviewData((prev) => ({
      ...prev,
      rate: newRate,
    }));
  };

  const handleChangeComment = (event) => {
    setReviewData((prev) => ({
      ...prev,
      comment: event.target.value,
    }));
  };

  const editReview = async () => {
    console.log(reviewData);

    await axiosInstance.post(`/detail/${movie_id}/edit`, reviewData);
    getReviews();
    setReviewData(reviewItem);
  };

  const handleClickEdit = () => {
    if (isEdit) {
      editReview();
    }
    setIsEdit((prev) => !prev);
  };

  const handleClickDelete = async () => {
    await axiosInstance.post(`/detail/${movie_id}/delete`, reviewData);
    getReviews();
  };

  return (
    <div className="CommentItem">
      <div className="reviewWrapper">
        <div className="reviewHeader">
          <span className="userName">{user_id}</span>
          {isEdit ? (
            <Rating
              name="simple-controlled"
              value={reviewData.rate}
              onChange={handleChangeRate}
            />
          ) : (
            <Rating value={rate} readOnly />
          )}
          {loggedInID === user_id && (
            <>
              <button className="editButton" onClick={handleClickEdit}>
                {isEdit ? "수정완료" : "수정하기"}
              </button>

              <button className="deleteButton" onClick={handleClickDelete}>
                삭제하기
              </button>
            </>
          )}
        </div>
        <div className="reviewContent">
          {isEdit ? (
            <textarea
              value={reviewData.comment}
              placeholder={"리뷰를 수정하세요"}
              className="commentInput"
              onChange={handleChangeComment}
            />
          ) : (
            comment
          )}
        </div>
      </div>
    </div>
  );
}
