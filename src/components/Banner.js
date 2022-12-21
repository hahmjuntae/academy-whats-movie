/* Banner.js */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// api폴더에서 만든 axios 사용
import axios from '../api/axios';
import requests from '../api/requests';
import '../styles/Banner.css';
import MovieModal from './MovieModal';

function Banner() {
  const [movie, setMovie] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    /* 현재 상영중 영화 정보 가져오기 (20개) */
    const request = await axios.get(requests.fetchNowPlaying);
    // console.log(request);

    /* 20개 영화 중 랜덤으로 1개의 영화 ID를 가져오기 */
    const movieId =
      request.data.results[Math.floor(Math.random() * request.data.results.length + 0)].id; // 랜덤으로 선택한 영화의 id

    /* 특정 영화의 더 상세한 정보를 가져오기 (videos 정보 포함) */
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' }, // 속성 추가해서 가져오기
    });

    // console.log(movieDetail);
    setMovie(movieDetail);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  if (!isClicked) {
    return (
      <header
        className='banner'
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }}>
        <div className='banner__contents'>
          <h1 className='banner__title'>{movie.title || movie.name || movie.original_name}</h1>
          <div className='banner__buttons'>
            {/* 리액트의 성능 향상을 위해 onClick함수 안에 즉시실행함수 작성 */}
            <button className='banner__button play' onClick={() => setIsClicked(true)}>
              재생
            </button>
            <button className='banner__button info' onClick={() => handleClick(movie)}>
              정보 더 보기
            </button>
          </div>
          <p className='banner__description'>
            {movie.overview ? truncate(movie.overview, 200) : '등록 된 정보가 없습니다.'}
          </p>
        </div>
        <div className='banner__fadeBottom'></div>
        {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
      </header>
    );
  } else {
    // console.log(movie.videos.results[0]);
    return (
      <Container>
        <HomeContainer>
          {movie.videos.results[0] ? (
            <>
              <Iframe
                src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?showinfo=0&rel=0&modestbranding=0&controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                allowTransparency='true'
                title='YouTube video player'></Iframe>
              <div className='close_video'>
                <span onClick={() => setIsClicked(false)}>닫기 X</span>
              </div>
            </>
          ) : (
            <div className='close_video'>
              <span onClick={() => setIsClicked(false)}>닫기 X</span>
              <div className='videoNone'>등록된 영상이 없습니다.</div>
            </div>
          )}
        </HomeContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40vh;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #111;
  z-index: -1;
  opacity: 0.65;
  border: none;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Banner;
