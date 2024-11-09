import React, { useState } from "react";
import "./SignUp.css";
import axiosInstance from "utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기서 회원가입 처리 로직을 추가할 수 있습니다.
    console.log("회원가입 정보:", formData);

    const res = await axiosInstance.post("/register", formData);

    if (res.data.success) {
      sessionStorage.setItem("user_id", formData.id);
      navigate("/ranking");
    } else {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }

    console.log(res);
  };

  return (
    <div className="SignUp">
      <div className="signUp-container">
        <h2>회원가입</h2>
        <form className="signUp-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="id">아이디</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
