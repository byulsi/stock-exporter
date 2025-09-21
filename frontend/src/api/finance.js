import axios from 'axios';              // 1

// 2) 프록시 경로 사용
const BASE_URL = '/api/chart';          // 3

// 4) 일봉·거래량 조회 함수
export async function fetchDaily(symbol, startDate, endDate) {
  const params = {                       // 5
    interval: '1d',
    period1: Math.floor(new Date(startDate).getTime() / 1000),
    period2: Math.floor(new Date(endDate).getTime() / 1000)
  };
  const response = await axios.get(`${BASE_URL}/${symbol}`, { params }); // 6
  const result = response.data.chart.result[0];  // 7
  const ts = result.timestamp;                   // 8
  const q = result.indicators.quote[0];          // 9
  // 10) 날짜·가격·거래량 배열로 매핑
  return ts.map((t, i) => ({
    date: new Date(t * 1000).toISOString().slice(0, 10),
    open: q.open[i],
    high: q.high[i],
    low: q.low[i],
    close: q.close[i],
    volume: q.volume[i]
  }));
}
