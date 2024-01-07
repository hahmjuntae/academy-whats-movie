/* DetailPage.js */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../api/axios';
import '../styles/DetailPage.css';

function DetailPage() {
  const [movie, setMovie] = useState({});

  let { movieId } = useParams();
  // console.log('movieId :', movieId);
  // console.log('useParams :', useParams());

  const fetchData = async () => {
    const request = await axios.get(`/movie/${movieId}`);
    // console.log('request :', request);
    setMovie(request.data);
  };

  useEffect(() => {
    fetchData();
  }, [movieId]);

  if (!movie) {
    return <div>...Loading</div>;
  } else {
    console.log(movie);
    return (
      <section className='detail'>
        {movie?.backdrop_path ? (
          <img
            className='detail__poster'
            src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            alt='poster'
          />
        ) : (
          ''
        )}
        <div className='detail__info'>
          {movie?.backdrop_path ? (
            <>
              <img
                className='detail__info-poster'
                src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                alt='poster'
              />
              <h1 className='detail__title'>{movie.title}</h1>
              <span
                className='detail__close'
                onClick={() => {
                  window.history.back();
                }}>
                X
              </span>
              <div className='date'>{movie.release_date}</div>
            </>
          ) : (
            ''
          )}
          <div className='overview'>
            {movie.overview ? movie.overview : '등록된 정보가 없습니다.'}
          </div>
        </div>
      </section>
    );
  }
}

export default DetailPage;
