/* App.js */
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { authService } from './api/fbase';
import Nav from './components/Nav';
import DetailPage from './routes/DetailPage';
import Login from './routes/Login';
import MainPage from './routes/MainPage';
import Profile from './routes/Profile';
import SearchPage from './routes/SearchPage';
import './styles/App.css';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null); // 로그인한 사용자의 정보
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        // User is signed in
        setIsLoggedIn(user);
        setUserObj(user);
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  /* 중첩라우팅 */
  /* 변경되는 곳에만 Outlet 사용 */
  function Layout() {
    return (
      <div>
        <Nav init={init} userObj={userObj} isLoggedIn={Boolean(isLoggedIn)} />
        <Outlet />
      </div>
    );
  }
  return (
    <div className='app'>
      <Routes>
        {isLoggedIn ? (
          <Route path='/' element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path=':movieId' element={<DetailPage />} />
            <Route path='search' element={<SearchPage />} />

            {/* index : localhost:3000/ , 부모의 주소 상속받음 */}
            {/* :movieId : localhost:3000/movieId값 */}
            {/* serach : localhost:3000/serach */}
          </Route>
        ) : (
          <Route path='/' element={<Login />} />
        )}

        <Route path='/profile' element={<Profile userObj={userObj} />} />
      </Routes>
    </div>
  );
}
export default App;
