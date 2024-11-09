import React, { useEffect, useState } from "react";
import "./MyPage.css";
import UserData from "./UserDatas/UserData";
import UpDateButton from "./UserDatas/Button/UpDateButton";
import profileImage from "assets/profile.png";
import axiosInstance from "utils/axiosInstance";
import { Favorite } from "@material-ui/icons";

export default function MyPage() {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    favorite: [],
  });

  const [state, setState] = useState(true); // 수정 가능 여부
  const [text, setText] = useState("프로필 수정");

  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id");

    if (user_id) {
      const getUser = async () => {
        const response = await axiosInstance(`my_page?user_id=${user_id}`);

        console.log(response.data);

        setUserData({
          id: response.data.id,
          name: response.data.name,
          favorite: response.data.favorite,
        });
      };

      getUser();
    }
  }, []);

  // 외부 JSON 파일에서 데이터 로드
  useEffect(() => {
    // fetch를 사용해 외부 JSON 파일에서 데이터 가져오기
    fetch("/data/userData.json")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data); // 가져온 데이터를 userData 상태에 저장
      })
      .catch((error) =>
        console.error("데이터를 가져오는 데 실패했습니다.", error)
      );
  }, []);

  const userUpdate = () => {
    if (state) {
      setText("수정 완료");
      setState(false); // 수정 불가로 설정
    } else {
      setText("프로필 수정");
      setState(true); // 수정 가능으로 설정
      handleUpDate();
    }
  };

  const handleUpDate = async () => {
    await axiosInstance.post("/edit", userData);
  };

  // input 값 변경 시 호출
  const handleInputChange = (newValue, field) => {
    // const newValue = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      [field]: newValue, // 해당 필드만 수정
    }));
  };

  useEffect(() => {
    console.log("userData", userData);
  }, [userData]);

  // 체크박스 상태 변경 시 호출
  const handleCheckboxChange = (id, checked) => {
    setUserData((prevData) => {
      const updatedFavorites = checked
        ? [...prevData.favorite, id] // 체크하면 추가
        : prevData.favorite.filter((category) => category !== id); // 체크 해제하면 제거
      return { ...prevData, favorite: updatedFavorites };
    });
  };

  return (
    <div className="MyPage">
      <h1>마이페이지</h1>
      <div className="container">
        <div className="Path">
          <img src={profileImage} alt="profile" />
          <h4>프로필</h4>
        </div>
        <div className="UserData">
          <UserData
            user={userData} // dummyData를 객체로 넘김
            state={state}
            handleInputChange={handleInputChange} // input 변경 시 처리
          />
        </div>
      </div>
      <UpDateButton text={text} userUpdate={userUpdate} />
    </div>
  );
}
