import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout/MainLayout";
import Ranking from "./pages/Ranking/Ranking";
import MyPage from "./pages/MyPage/MyPage";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/ranking" />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/detail/:id" element={<MovieDetail />} />
            <Route path="/signin" element={<MovieDetail />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
