/* SearchPage.js */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from '../api/axios';
import { useDebounce } from '../hooks/useDebounce';
import '../styles/SearchPage.css';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  /* 현재 URL에서 정보 가져오기 */
  // console.log(useLocation());

  const useQuery = () => {
    /* location의 search속성에서 paramas값 가져오기 */
    return new URLSearchParams(useLocation().search);
  };

  /* params중에서 q속성만 가져오기 */
  let query = useQuery();
  const searchTerm = query.get('q');

  /* useDebounce hook함수를 거쳐 0.5초동안 searchTerm의 새로운 값이 없다면 새로 변수에 할당 */
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  /* q속성이 있을 경우에만 실행 */
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]); // q속성이 변경 될 때마다 재렌더링

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      // console.log(request);
      setSearchResults(request.data.results);
    } catch (error) {
      // console.log(error);
    }
  };
  // console.log(searchResults);

  const renderSearchResults = () => {
    return searchResults.length > 0 ? ( // 검색어가 있는지 삼항연산자 사용
      debouncedSearchTerm ? (
        <section className='search-container'>
          {searchResults.map((movie) => {
            if (movie.backdrop_path !== null && movie.media_type !== 'person') {
              const movieImageUrl = 'https://image.tmdb.org/t/p/w400' + movie?.backdrop_path;
              return (
                <div className='movie' key={movie.id}>
                  <div
                    className='movie__column-poster'
                    onClick={() => {
                      navigate(`/${movie.id}`);
                    }}>
                    <img
                      src={movieImageUrl}
                      className='movie__poster'
                      alt={movie.title || movie.name || movie.original_name}
                    />
                    <div className='poster__detail'>
                      <h3 className='poster__detail-title'>{movie.title}</h3>
                      <p className='poster__detail-date'>{movie.release_date}</p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </section>
      ) : (
        navigate('/')
      )
    ) : debouncedSearchTerm ? (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>검색어 "{debouncedSearchTerm}" 에 맞는 결과가 없습니다.</p>
        </div>
      </section>
    ) : (
      navigate('/')
    );
  };

  return renderSearchResults();
}

export default SearchPage;
