import { dummyData } from "./dummyData";

import "./Ranking.css";
import MovieItem from "./MovieItem/MovieItem";
import { useNavigate } from "react-router-dom";

export default function Ranking() {
  const navigate = useNavigate();

  const handleClickMovieItem = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="Ranking">
      <div className="movie_container">
        {dummyData.map((movie) => (
          <div onClick={() => handleClickMovieItem(movie.movie_id)}>
            <MovieItem detail={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
