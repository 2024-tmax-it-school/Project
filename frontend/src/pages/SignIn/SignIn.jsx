import React, { useState } from "react";
import "./SignIn.css";
import axiosInstance from "utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

    const res = await axiosInstance.post("/login", formData);

    if (res.data.success) {
      sessionStorage.setItem("user_id", formData.id);

      navigate("/ranking");
    } else {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="SignIn">
      <div className="SignIn-container">
        <h2>로그인</h2>
        <form className="SignIn-form" onSubmit={handleSubmit}>
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
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
