import React, { useState } from 'react';             // 1
import { fetchDaily } from '../api/finance';         // 2
import { exportToExcel } from '../utils/excel';      // 3

export default function StockExporter() {
  const [symbol, setSymbol] = useState('005930.KS'); // 4
  const [startDate, setStartDate] = useState('2025-01-01'); // 5
  const [endDate, setEndDate] = useState('2025-09-15');     // 6
  const [data, setData] = useState([]);               // 7
  const [loading, setLoading] = useState(false);      // 8

  // 9) 데이터 조회 핸들러
  const handleFetch = async () => {
    setLoading(true);                                 // 10
    try {
      const result = await fetchDaily(symbol, startDate, endDate); // 11
      setData(result);                                // 12
    } catch {
      alert('데이터 조회 실패');                      // 13
    } finally {
      setLoading(false);                              // 14
    }
  };

  // 15) 엑셀 내보내기 핸들러
  const handleExport = () => {
    if (!data.length) return alert('먼저 데이터를 조회하세요'); // 16
    exportToExcel(data, `${symbol}_daily`);                // 17
  };

  // 18) UI 렌더링
  return (
    <div className="exporter">
      <h2>국내 증시 일봉 데이터 엑셀 추출</h2>
      <div className="inputs">
        <label>
          종목 코드:
          <input value={symbol} onChange={e => setSymbol(e.target.value)} />
        </label>
        <label>
          시작일:
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </label>
        <label>
          종료일:
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </label>
      </div>
      <div className="buttons">
        <button onClick={handleFetch} disabled={loading}>
          {loading ? '조회 중...' : '데이터 조회'}
        </button>
        <button onClick={handleExport}>엑셀 내보내기</button>
      </div>
    </div>
  );
}
