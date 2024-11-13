import "./Ranking.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "utils/axiosInstance";

import MovieItem from "./MovieItem/MovieItem";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export default function Ranking() {
  const navigate = useNavigate();

  const [sort, setSort] = useState("movie_name");
  const [reverse, setReverse] = useState(0);

  const [items, setItems] = useState([]);

  const getItems = async () => {
    const response = await axiosInstance(
      `/rank?sort=${sort}&reverse=${reverse}`
    );

    if (response?.data && response.data.length > 0) {
      setItems(response.data);
    }
  };

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const handleChangeReverse = (event) => {
    setReverse(event.target.value);
  };
  const handleClickMovieItem = (id) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    getItems();
  }, [sort, reverse]);

  return (
    <div className="Ranking">
      <div className="header">
        <div className="select">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">정렬 기준</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="정렬 기준"
              onChange={handleChangeSort}
            >
              <MenuItem value={"movie_name"}>이름</MenuItem>
              <MenuItem value={"movie_id"}>순위</MenuItem>
              <MenuItem value={"avg_rate"}>별점</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">순서</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={reverse}
              label="순서"
              onChange={handleChangeReverse}
            >
              <MenuItem value={0}>높은 순</MenuItem>
              <MenuItem value={1}>낮은 순</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="movie_container">
        {items.map((movie) => (
          <div onClick={() => handleClickMovieItem(movie.movie_id)}>
            <MovieItem detail={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
