import React, { useEffect, useState } from "react";
import "./UserData.css";
import CheckBoxButton from "./Button/CheckBoxButton";

const UserData = ({ user, state, handleInputChange }) => {
  const [favorite, setFavorite] = useState(user.favorite);

  useEffect(() => {
    setFavorite(user.favorite);
  }, [user]);

  const handleCheckboxChange = (id, checked) => {
    const oldFavorite = [...favorite];

    const newFavorite = checked
      ? [...oldFavorite, id]
      : oldFavorite.filter((category) => category !== id);

    setFavorite(newFavorite);
    handleInputChange(newFavorite, "favorite");
  };

  return (
    <div className="UserData">
      <li>
        <span className="title">ID :</span>
        <span className="value"> {user.id}</span>
      </li>
      <li>
        <span className="title">이름:</span>
        {state ? (
          <span className="value"> {user.name}</span>
        ) : (
          <input
            type="text"
            value={user.name} // 이름 값 변경
            onChange={(e) => handleInputChange(e.target.value, "name")} // 이름 수정
          />
        )}
      </li>
      <li>
        <span className="title">선호:</span>
        <CheckBoxButton
          favorite={favorite} // favorite 배열을 자식으로 전달
          handleCheckboxChange={handleCheckboxChange} // 체크박스 상태 변경 핸들러 전달
          state={state} // state 값 전달
        />
      </li>
    </div>
  );
};

export default UserData;
