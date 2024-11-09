import React, { useEffect, useState } from "react";
import "./MyPage.css";
import UserData from "./UserDatas/UserData";
import UpDateButton from "./UserDatas/Button/UpDateButton";
import profileImage from "assets/profile.png";

// 기본 데이터를 로컬 스토리지에서 가져오거나 없으면 기본 데이터 사용
export default function MyPage() {
  // 로컬 스토리지에서 가져오거나 기본값 설정
  const [dummyData, setDummyData] = useState(() => {
    const savedData = localStorage.getItem("dummyData");
    return savedData
      ? JSON.parse(savedData)
      : [{ id: 123, name: "성민혁", favorite: ["로맨스", "코미디"] }]; // 배열로 초기화
  });

  const [state, setState] = useState(true); // 수정 가능 여부
  const [text, setText] = useState("프로필 수정");

  // dummyData 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("dummyData", JSON.stringify(dummyData));
  }, [dummyData]);

  const userUpdate = () => {
    if (state) {
      setText("수정 완료");
      setState(false); // 수정 불가로 설정
    } else {
      setText("프로필 수정");
      setState(true); // 수정 가능으로 설정
    }
  };

  // input 값 변경 시 호출
  const handleInputChange = (e, field) => {
    const newValue = e.target.value;
    setDummyData((prevData) => {
      return { ...prevData, [field]: newValue }; // 객체의 속성 수정
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
            user={dummyData} // dummyData를 객체로 넘김
            state={state}
            handleInputChange={handleInputChange} // input 변경 시 처리
          />
        </div>
      </div>
      <UpDateButton text={text} userUpdate={userUpdate} />
    </div>
  );
}
