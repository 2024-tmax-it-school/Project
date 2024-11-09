import React, { useEffect, useState } from "react";

import "./MovieItem.css";

function MovieItem({ detail }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className={`MovieItem ${isHovered && "hovered "}`}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="hovered">
          <span>{detail.영화명}</span>
          <span>{detail.개봉일}</span>
          <span>{detail.나라}</span>
          <span>{detail.배급사}</span>
        </div>
      )}
    </li>
  );
}

export default MovieItem;
