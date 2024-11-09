import { dummyData } from "./dummyData";

import "./Ranking.css";
import MovieItem from "./MovieItem/MovieItem";

export default function Ranking() {
  return (
    <div className="Ranking">
      <ul className="movie_container">
        {dummyData.map((movie) => (
          <MovieItem detail={movie} />
        ))}
      </ul>
    </div>
  );
}
