/* LoginForm.js */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authService } from '../api/fbase';

function AuthForm() {
  const [newAccount, setNewAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /* onSubmit */
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      let data;
      if (newAccount) {
        // create new account
        data = await createUserWithEmailAndPassword(authService, email, password);
        navigate('/');
      } else {
        // log in
        data = await signInWithEmailAndPassword(authService, email, password);
        navigate('/');
      }
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        setError('이미 사용중인 이메일입니다.');
      } else if (error.message === 'Firebase: Error (auth/wrong-password).') {
        setError('비밀번호가 틀렸습니다.');
      } else if (error.message === 'Firebase: Error (auth/user-not-found).') {
        setError('등록되지 않은 이메일입니다.');
      } else if (
        error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'
      ) {
        setError('비밀번호는 최소 6자 이상으로 설정해야 합니다.');
      }
    }
  };

  /* onChange */
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  /* toggleAccount */
  const toggleAccount = () => {
    setNewAccount((prev) => !prev); // 이전 값을 받아 논리 연산자를 사용하여 부정으로 변환
  };

  return (
    <>
      <form onSubmit={onSubmit} className='container'>
        <input
          type='email'
          placeholder='이메일'
          name='email'
          value={email}
          required
          onChange={onChange}
          className='loginInput'
        />
        <input
          type='password'
          placeholder='비밀번호'
          name='password'
          value={password}
          required
          onChange={onChange}
          className='loginInput'
        />
        <input
          type='submit'
          value={newAccount ? '계정 생성' : '로그인'}
          className='loginInput loginSubmit'
        />
        {error && <span className='loginError'>{error}</span>}
      </form>
      <span onClick={toggleAccount} className='loginSwitch'>
        {newAccount ? '로그인' : '계정 생성'}
      </span>
    </>
  );
}

export default AuthForm;
