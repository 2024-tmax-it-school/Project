import React, { useEffect } from "react";

import "./MovieDetail.css";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import axiosInstance from "utils/axiosInstance";

export default function MovieDetail() {
  const movieDetail = {
    movie_id: "1",
    movie_name: "명량",
    release_date: "2014-07-30",
    take: "135762515310",
    attendance: "17616371",
    screen: "1587",
    screenings: "188730",
    representative_nationality: "한국",
    nationality: "한국",
    genre: ["Fantasy", "Action"],
    distributor: "(주)씨제이이엔엠",
    description:
      "조선의 명장 이순신이 13척의 배로 일본의 330척 대군을 상대한 실제 역사적 배경을 바탕으로 한 영화.",
    avg_rate: 4,
  };

  const getTest = async () => {
    const res = await axiosInstance.get(
      "http://localhost:8080/rank?sort=movie_name&reverse=0"
    );

    axiosInstance.get("");
    axiosInstance.post("/url", {
      id: "aaa",
      pw: "aaa",
    });

    console.log(res);
  };

  useEffect(() => {
    getTest();
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
        <div className="poster">
          <img
            className="posterImage"
            src={process.env.PUBLIC_URL + `/images/${movieDetail.movie_id}.jpg`}
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

        <div className="horizontalLine" />
      </div>
    </div>
  );
}
