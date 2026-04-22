const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();

const PORT = process.env.PORT || 3000;

// 👉 여기에 네 API 키 넣기
const API_KEY = "7578d97feec449a28b001c18538d22ed";

app.get("/meal", async (req, res) => {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth()+1).padStart(2,'0');
  const d = String(today.getDate()).padStart(2,'0');
  const date = `${y}${m}${d}`;

  const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530049&MLSV_YMD=${date}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.json({ error: "failed" });
  }
});

app.listen(PORT, () => {
  console.log("서버 실행됨");
});
