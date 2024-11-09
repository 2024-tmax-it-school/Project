import React from "react";
import "./UserData.css";

const UserData = ({ user, state, handleInputChange }) => {
  return (
    <div className="UserData">
      <li>
        <span className="title">ID :</span>
        {state ? (
          <span className="value"> {user.id}</span>
        ) : (
          <input
            type="text"
            value={user.id} // id 값 변경
            onChange={(e) => handleInputChange(e, "id")} // id 수정
          />
        )}
      </li>
      <li>
        <span className="title">이름:</span>
        {state ? (
          <span className="value"> {user.name}</span>
        ) : (
          <input
            type="text"
            value={user.name} // 이름 값 변경
            onChange={(e) => handleInputChange(e, "name")} // id 수정
          />
        )}
      </li>
      <li>
        <span className="title">선호:</span>
        {state ? (
          <span className="value"> {user.favorite}</span>
        ) : (
          <input
            type="text"
            value={user.favorite} // 장르 값 변경
            onChange={(e) => handleInputChange(e, "favorite")} // pw 수정
          />
        )}
      </li>
    </div>
  );
};
export default UserData;
