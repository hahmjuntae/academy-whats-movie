/* MainPage.js */
import React from 'react';

import requests from '../api/requests';
import Banner from '../components/Banner';
import Row from '../components/Row';

function MainPage() {
  return (
    <div>
      <Banner />
      <Row title='인기 급상승 영화' id='TN' fetchUrl={requests.fetchTrending} isLargeRow />
      <Row title='평점이 높은영화' id='TR' fetchUrl={requests.fetchTopRated} isLargeRow />
      <Row title='액션 영화' id='AM' fetchUrl={requests.fetchActionMovies} isLargeRow />
      <Row title='로맨스 영화' id='RM' fetchUrl={requests.fetchRomanceMovies} isLargeRow />
      <Row title='공포 영화' id='HM' fetchUrl={requests.fetchHorrorMovies} isLargeRow />
      <Row title='코미디 영화' id='CM' fetchUrl={requests.fetchComedyMovies} isLargeRow />
    </div>
  );
}

export default MainPage;
