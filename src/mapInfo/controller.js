require('dotenv').config();
const fetch = require('node-fetch');

const getMapTag = (req, res) => {
  console.log(1);
  
  // 검색할 쿼리와 옵션을 설정합니다.
  const query = req.params.tag; // 검색할 쿼리
  const display = 5; // 한 번에 표시할 검색 결과 개수 (기본값: 1, 최댓값: 5)
  const start = 1; // 검색 시작 위치 (기본값: 1, 최댓값: 1)
  const sort = 'random'; // 검색 결과 정렬 방법 (기본값: random)

  console.log(2);

  // 요청 URL을 구성합니다.
  const url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(
    query
  )}&display=${display}&start=${start}&sort=${sort}`;

  console.log(3);

  // 요청을 보내는 함수입니다.
  async function fetchLocalSearch() {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
        }
      });

      console.log(4);

      // 응답이 성공적으로 이루어졌는지 확인합니다.
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(5);

      // 응답을 JSON 형식으로 변환합니다.
      const data = await response.json();

      // 검색 결과를 콘솔에 출력합니다.
      console.log(data);

      // 클라이언트에 JSON 형식으로 응답을 보냅니다.
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data from Naver API' });
    }
  }

  // fetchLocalSearch 함수를 호출합니다.
  fetchLocalSearch();
};

module.exports = {
    getMapTag
};