import React, { useEffect, useState } from "react";

import "./MovieItem.css";

function MovieItem({ detail }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="MovieItem"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        // src={process.env.PUBLIC_URL + `/images/${detail.movie_id}.jpg`}
        src={process.env.PUBLIC_URL + `/images/test.jpg`}
        alt="movieImage"
      />
      {isHovered && (
        <div className="hovered">
          <div className="titleContainer">
            <span className="title">{detail.movie_name}</span>
            <span className="date">개봉일: {detail.release_date}</span>
          </div>

          <div className="detailContainer">
            <span>{detail.nationality}</span>
            <span>{detail.distributor}</span>
          </div>
        </div>
      )}
    </li>
  );
}

export default MovieItem;
