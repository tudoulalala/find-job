// ===== 백엔드 API 서버 (claud.md 로드맵 4단계 반영) =====
// 정적 파일(index.html/style.css/script.js)을 서빙하면서,
// 점수 계산·직업 DB 조회 로직을 /api 엔드포인트로도 제공한다.
// 프론트엔드(script.js)는 이 서버가 떠 있으면 API를 우선 사용하고,
// 서버가 없으면(파일을 그냥 더블클릭해서 연 경우) 내장된 로컬 로직으로 자동 대체된다.

const express = require("express");
const path = require("path");
const { computeScoresFrom, topTwoCodes, matchJobs, combineInterestAndAptitude } = require("./lib/jobMatcher");
const { getJobs } = require("./lib/dataSource");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// 직업 DB 조회 (커리어넷 연동 시 자동으로 실데이터, 아니면 로컬 jobs.json)
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await getJobs();
    res.json({ jobs });
  } catch (err) {
    res.status(500).json({ error: "직업 데이터를 불러오지 못했습니다." });
  }
});

/**
 * POST /api/recommend
 * body: {
 *   interestAnswers: number[24],  // RIASEC 흥미 문항 응답
 *   aptitudeAnswers: number[12],  // 적성 자기평가 문항 응답
 *   value: "성취감" | "안정성" | "높은 보수"
 * }
 * 문항 코드 매핑은 questionCodes로 함께 전달받아 프론트/백엔드 데이터가 어긋나지 않게 한다.
 */
app.post("/api/recommend", async (req, res) => {
  try {
    const { interestQuestions, interestAnswers, aptitudeQuestions, aptitudeAnswers, value } = req.body;

    if (!Array.isArray(interestQuestions) || !Array.isArray(aptitudeQuestions)) {
      return res.status(400).json({ error: "문항 데이터가 올바르지 않습니다." });
    }

    const interestScores = computeScoresFrom(interestQuestions, interestAnswers);
    const aptitudeScores = computeScoresFrom(aptitudeQuestions, aptitudeAnswers);
    const combinedScores = combineInterestAndAptitude(interestScores, aptitudeScores);

    const topCodes = topTwoCodes(interestScores);
    const topAptCodes = topTwoCodes(aptitudeScores);
    const combinedTopCodes = topTwoCodes(combinedScores);

    const jobs = await getJobs();
    const recommendations = matchJobs(jobs, combinedTopCodes, value);

    res.json({
      interestScores,
      aptitudeScores,
      topCodes,
      topAptCodes,
      combinedTopCodes,
      recommendations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "추천 계산 중 오류가 발생했습니다." });
  }
});

// Vercel 등 서버리스 환경에서는 이 모듈을 그대로 핸들러로 사용하고,
// 로컬(`node server.js`)에서 직접 실행할 때만 포트를 열어 리슨한다.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
  });
}

module.exports = app;
