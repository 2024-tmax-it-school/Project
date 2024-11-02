import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Ranking from "./pages/Ranking/Ranking";
import MyPage from "./pages/MyPage/MyPage";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import MainLayout from "./layout/MainLayout/MainLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/detail" element={<MovieDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
