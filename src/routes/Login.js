/* Login.js */
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

import { authService } from '../api/fbase';
import LoginForm from '../components/LoginForm';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  /* onSocialClick */
  /* 소셜버튼 클릭 */
  const onSocialClick = (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    }
    const data = signInWithPopup(authService, provider);
    onAuthStateChanged(authService, (user) => {
      if (user) {
        navigate('/');
      }
    });
  };
  return (
    <div className='login'>
      <div className='background'>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/f669a8f4-de1e-49d7-bb56-c9bd1f4a9069/a0693dae-6fc7-4fe0-988b-b2a5295fff44/KR-ko-20221031-popsignuptwoweeks-perspective_alpha_website_large.jpg'
          alt=''
        />
        <div className='blur'></div>
      </div>
      <div className='logo'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-player-skip-forward'
          width='40'
          height='40'
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
      </div>
      <div className='title'>What's MOVIE?</div>
      <LoginForm className='loginForm' />
      <div className='loginContainer'>
        <div className='loginBtns'>
          <button onClick={onSocialClick} name='google' className='loginBtn'>
            <FcGoogle className='google-icon' /> Google계정으로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
