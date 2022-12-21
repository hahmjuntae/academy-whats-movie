/* Nav.js */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/Nav.css';

function Nav({ init, userObj, isLoggedIn }) {
  const [show, setShow] = useState(false);
  const [serachValue, setSerachValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(userObj);

    window.addEventListener('scroll', () => {
      // console.log('window.scrollY : ', window.scrollY);
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    /* return 구문 : 이 컴포넌트를 더 이상 사용하지 않을 경우 사용. 해당 이벤트를 지운다. */
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  const onChange = (e) => {
    setSerachValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <nav className={`nav ${show && 'nav__black'}`}>
      <span className='nav__logo' onClick={() => navigate('/')}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-player-skip-forward'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path d='M4 5v14l12 -7z'></path>
          <line x1='20' y1='5' x2='20' y2='19'></line>
        </svg>
      </span>
      <input
        type='search'
        value={serachValue}
        onChange={onChange}
        placeholder='검색어를 입력하세요.'
        className='nav__input'
        autoFocus
      />
      {isLoggedIn ? (
        <img
          src={userObj.photoURL}
          alt=''
          className='nav__avatar empty'
          onClick={() => navigate('/profile')}
        />
      ) : (
        <span className='nav__login' onClick={() => navigate('/login')}>
          로그인
        </span>
      )}
    </nav>
  );
}

export default Nav;
