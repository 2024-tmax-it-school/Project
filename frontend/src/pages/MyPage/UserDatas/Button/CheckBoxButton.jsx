import React from "react";
import "./ButtonStyle.css";

const CheckBoxButton = ({ favorite, handleCheckboxChange, state }) => {
  const categories = [
    { id: "Action", label: "액션" },
    { id: "Fantasy", label: "판타지" },
    { id: "Horror", label: "공포" },
    { id: "Thriller", label: "스릴러" },
    { id: "Blockbuster", label: "블록버스트" },
    { id: "Romance", label: "로멘스" },
  ];

  const handleChange = (e) => {
    const { id, checked } = e.target;
    handleCheckboxChange(id, checked); // 부모로 상태 변경 요청
  };

  return (
    <div>
      {categories.map((category) => {
        // state가 true일 때는 체크된 항목만 렌더링
        if (state) {
          // 상태가 true일 때는 체크된 항목만 표시
          return favorite.includes(category.id) ? (
            <span className="checkBoxStyle" key={category.id}>
              <label htmlFor={category.id}>{category.label}</label>
            </span>
          ) : null;
        } else {
          // 상태가 false일 때는 모든 체크박스를 표시
          return (
            <span className="checkBoxStyle" key={category.id}>
              <label htmlFor={category.id}>{category.label}</label>
              <input
                type="checkbox"
                id={category.id}
                name={category.id}
                checked={favorite.includes(category.id)} // 체크 여부
                onChange={handleChange} // 체크박스 상태 변경 핸들러 전달
              />
            </span>
          );
        }
      })}
    </div>
  );
};

export default CheckBoxButton;
