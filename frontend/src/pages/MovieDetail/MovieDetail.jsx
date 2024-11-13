import React, { useEffect, useState } from "react";

import "./MovieDetail.css";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import axiosInstance from "utils/axiosInstance";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CommentItem from "./CommentItem/CommentItem";

export default function MovieDetail() {
  const location = useLocation();
  const movieId = location.pathname.split("/")[2];

  const [movieDetail, setMovieDetail] = useState({
    movie_id: "",
    movie_name: "",
    release_date: "",
    take: "",
    attendance: "",
    screen: "",
    screenings: "",
    representative_nationality: "",
    nationality: "",
    genre: [],
    distributor: "",
    description: "",
    avg_rate: 1,
  });
  const [reviews, setReviews] = useState([]);
  const [userInfo, setUserInfo] = useState({
    id: "test",
    name: "김김김",
    favorite: [],
  });
  const [isEdit, setIsEdit] = useState(false);

  const [reviewData, setReviewData] = useState({
    user_id: "",
    movie_id: "",
    comment: "",
    rate: 0,
  });

  const getDetail = async () => {
    const response = await axiosInstance.get(`/detail?movie_id=${movieId}`);

    if (response.data) {
      setMovieDetail(response.data);
    }
  };

  const getReviews = async () => {
    const response = await axiosInstance.get(
      `/detail/${movieId}?movie_id=${movieId}`
    );
    if (response.data) {
      setReviews(response.data.reviews ?? []);
    }
  };

  const getUserInfo = () => {
    const user_id = sessionStorage.getItem("user_id");

    if (user_id) {
      const getUser = async () => {
        const response = await axiosInstance.get(`my_page?user_id=${user_id}`);

        setUserInfo({
          id: response.data.id,
          name: response.data.name,
          favorite: response.data.favorite,
        });
      };

      getUser();
    }
  };

  const handleChangeRate = (_, newRate) => {
    setReviewData((prev) => ({
      ...prev,
      rate: newRate,
    }));
  };

  const handleChangeComment = (e) => {
    setReviewData((prev) => ({
      ...prev,
      comment: e.target.value,
    }));
  };

  const handleClickWrite = async () => {
    const response = await axiosInstance.post(`/detail/${movieId}/register`, {
      user_id: userInfo.id,
      movie_id: movieId,
      comment: reviewData.comment,
      rate: reviewData.rate,
    });

    if (response.data.message) {
      alert(response.data.message);
    }

    if (response.data.success) {
      getReviews();
    }

    setIsEdit(false);
    setReviewData({
      user_id: "",
      movie_id: "",
      comment: "",
      rate: 0,
    });
  };

  useEffect(() => {
    getDetail();
    getReviews();
  }, [movieId]);

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="MovieDetail">
      <div className="cover">
        <img
          className="coverImage"
          src={process.env.PUBLIC_URL + `/images/${movieDetail.movie_id}.jpg`}
          alt="pageCover"
        />
        <div className="backdrop" />
      </div>

      <div className="content">
        <div className="topSection">
          <div className="poster">
            <img
              className="posterImage"
              src={
                process.env.PUBLIC_URL + `/images/${movieDetail.movie_id}.jpg`
              }
              alt="poster"
            />
          </div>

          <div className="infoContainer">
            <h1>{movieDetail.movie_name}</h1>

            <div className="infoSections">
              <div className="infoWrapper">
                <span>개봉일: {movieDetail.release_date}</span>
                <span>누적 관객: {movieDetail.attendance}</span>
                <span>국가: {movieDetail.representative_nationality}</span>
                <span>배급사: {movieDetail.distributor}</span>
              </div>

              <div className="rateContainer">
                <span>평점</span>

                <Rating
                  name="read-only"
                  value={movieDetail.avg_rate}
                  size="large"
                  icon={
                    <StarIcon
                      style={{ width: "60", height: "60" }}
                      fontSize="inherit"
                    />
                  }
                  emptyIcon={
                    <StarIcon
                      style={{
                        color: "#ffff",
                        opacity: "0.55",
                        width: "60",
                        height: "60",
                      }}
                      fontSize="inherit"
                    />
                  }
                  readOnly
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#ff6d75",
                    },
                  }}
                />
              </div>

              <Button
                variant="text"
                onClick={() => {
                  setIsEdit(true);
                }}
                endIcon={<ModeEditIcon />}
                size="large"
                sx={{
                  width: "150px",
                  height: "80px",
                  color: "#fff",
                  fontSize: "18px",
                  display: "flex",
                  alignSelf: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                리뷰 작성
              </Button>
            </div>
          </div>
        </div>
        <div className="horizontalLine" />

        {isEdit && (
          <>
            <div className="commentContainer">
              <div className="commentWrapper">
                <div className="commentRate">
                  <span>별점</span>
                  <Rating
                    name="simple-controlled"
                    value={reviewData.rate}
                    onChange={handleChangeRate}
                  />
                </div>

                <textarea
                  className="commentInput"
                  onChange={handleChangeComment}
                />
              </div>

              <Button
                variant="contained"
                onClick={handleClickWrite}
                sx={{
                  color: "#fff",
                  fontSize: "16px",
                  width: "150px",
                  height: "40px",
                }}
              >
                작성 완료
              </Button>
            </div>
          </>
        )}

        <div className="reviewContainer">
          {reviews.map((item) => (
            <div key={item}>
              <CommentItem reviewItem={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
