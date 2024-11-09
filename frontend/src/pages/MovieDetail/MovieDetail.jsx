import React from "react";

import "./MovieDetail.css";

export default function MovieDetail() {
  const movieDetail = {
    movie_id: "1",
    movie_name: "명량",
    release_date: "2014-07-30",
    take: "135762515310",
    attendance: "17616371",
    screeyarnn: "1587",
    screenings: "188730",
    representative_nationality: "한국",
    nationality: "한국",
    distributor: "(주)씨제이이엔엠",
  };

  return (
    <div className="MovieDetail">
      <div className="poster">
        <img
          className="posterImage"
          src={process.env.PUBLIC_URL + `/images/${movieDetail.movie_id}.jpg`}
          alt="poster"
        />
      </div>

      <div className="infoContainer">
        <h1>{movieDetail.movie_name}</h1>
      </div>
    </div>
  );
}
