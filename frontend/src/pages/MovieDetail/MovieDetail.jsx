import React, { useEffect, useState } from "react";

import "./MovieDetail.css";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import axiosInstance from "utils/axiosInstance";
import { useLocation } from "react-router-dom";

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

  const getDetail = async () => {
    const response = await axiosInstance(`/detail?movie_id=${movieId}`);

    if (response.data) {
      setMovieDetail(response.data);
    }
  };

  useEffect(() => {
    getDetail();
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
            </div>
          </div>
        </div>
        <div className="horizontalLine" />
      </div>
    </div>
  );
}
