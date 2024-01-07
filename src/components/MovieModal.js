/* MovieModal.js */
import React, { useRef } from 'react';

import useOnClickOutside from '../hooks/useOnClickOutside';
import '../styles/MovieModal.css';

function MovieModal({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
  id,
}) {
  vote_average = vote_average.toString().split('').slice(0, 3).join('');

  const ref = useRef();
  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  return (
    <div className='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <img
            className='modal__poster-img'
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt={title ? title : name}
          />
          <span
            className='modal-close'
            onClick={() => {
              setModalOpen(false);
            }}>
            X
          </span>
          <div className='modal__content'>
            <h2 className='modal__title'>{title ? title : name}</h2>
            <p className='modal__details'>
              {release_date ? release_date : first_air_date}
              <span className='modal__user_perc'>100% 일치</span>
            </p>
            <p className='modal__details'> 평점 : {vote_average}</p>
            <p className='modal__overview'> {overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
