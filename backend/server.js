const express = require('express');         // 1
const axios = require('axios');             // 2
const cors = require('cors');               // 3

const app = express();                      // 4
app.use(cors());                            // 5

// 6) 종목별 일봉 데이터 프록시 엔드포인트
app.get('/api/chart/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;         // 7
    const { period1, period2, interval } = req.query; // 8
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`; // 9
    const response = await axios.get(url, { params: { interval, period1, period2 } }); // 10
    res.json(response.data);               // 11
  } catch (err) {
    res.status(500).json({ error: err.toString() }); // 12
  }
});

const PORT = process.env.PORT || 4000;     // 13
app.listen(PORT, () => console.log(`Proxy at http://localhost:${PORT}`)); // 14
