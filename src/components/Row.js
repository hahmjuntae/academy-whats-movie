/* Row.js */
import React, { useEffect, useState } from 'react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import axios from '../api/axios';
import '../styles/Row.css';
import MovieModal from './MovieModal';

function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    // console.log(request);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className='row'>
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop 기능 사용 여부
        breakpoints={{
          1378: {
            slidesPerView: 8, // 한 번에 보이는 슬라이드 개수
            slidesPerGroup: 8, // 몇개씩 슬라이드 할지
          },
          998: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        navigation // arrow 버튼 사용 유무
        pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
      >
        {/* <div className='slider'> */}
        {/* <div
            className='slider__arrow left'
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}>
            <span className='arrow'>{'<'}</span>
          </div> */}
        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <SwiperSlide>
              <img
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                key={movie.id}
                loading=''
                alt={movie.title || movie.name || movie.original_name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
        {/* <div
            className='slider__arrow right'
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}>
            <span className='arrow'>{'>'}</span>
          </div> */}
        {/* </div> */}
      </Swiper>
      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </section>
  );
}

export default Row;
