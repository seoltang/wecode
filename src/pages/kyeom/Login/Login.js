import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';

const Form = () => {
  const [inputState, setInputState] = useState({
    id: '',
    password: '',
  });

  const handleInput = event => {
    const { name, value } = event.target;
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = event => {
    event.preventDefault();

    fetch('http://172.30.1.55:8002/signin', {
      method: 'POST',
      body: JSON.stringify({
        name: inputState.id,
        email: inputState.id,
        password: inputState.password,
        phone_number: '010-1234-5678',
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'SUCCESS') {
          console.log(res);
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('email', inputState.id);
        }
      });

    // sessionStorage.setItem('id', inputState.id);
    navigate('/main-Kyeom');
  };

  const isLoginValid =
    inputState.id.length >= 5 && inputState.password.length >= 8;

  return (
    <form name="login" onSubmit={handleSubmit}>
      <input
        className="id"
        name="id"
        type="text"
        placeholder="전화번호, 사용자 이름 또는 이메일"
        onInput={handleInput}
      />
      <input
        className="password"
        name="password"
        type="password"
        placeholder="비밀번호"
        onInput={handleInput}
      />
      <button className="submit" type="submit" disabled={!isLoginValid}>
        로그인
      </button>
    </form>
  );
};

const LoginKyeom = () => {
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1 className="logo">westagram</h1>
        <Form />
        <div className="forget-pw">
          <Link to="">비밀번호를 잊으셨나요?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginKyeom;
