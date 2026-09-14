// ===== 공용 매칭 로직 (Node 백엔드에서 사용) =====
// script.js의 matchJobs()와 동일한 알고리즘을 서버 측에서도 재사용할 수 있도록 CommonJS 모듈로 분리했다.
// jobs.json을 데이터 소스로 사용하며, 실제 서비스에서는 dataSource.js를 통해
// 커리어넷 등 외부 API 응답으로 교체할 수 있다.

function computeScoresFrom(questions, responses) {
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  questions.forEach((q, i) => {
    scores[q.code] += responses[i] || 0;
  });
  return scores;
}

function topTwoCodes(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return [sorted[0][0], sorted[1][0]];
}

/**
 * 1순위 코드 일치 +3점, 2순위 코드 일치 +2점, 가치관 일치 +1점으로 가중치를 둬 정렬한다.
 * (claud.md 3장 "매칭 룰" 반영)
 */
function matchJobs(jobDb, topCodes, value) {
  const scored = jobDb
    .map((job) => {
      let score = 0;
      if (job.codes.includes(topCodes[0])) score += 3;
      if (job.codes.includes(topCodes[1])) score += 2;
      if (value && job.values.includes(value)) score += 1;
      return { job, score };
    })
    .filter((item) => item.score >= 3);

  scored.sort((a, b) => b.score - a.score);
  return scored.map((item) => item.job);
}

function combineInterestAndAptitude(interestScores, aptitudeScores) {
  const combined = {};
  Object.keys(interestScores).forEach((code) => {
    combined[code] = interestScores[code] + (aptitudeScores[code] || 0) * 0.5;
  });
  return combined;
}

module.exports = {
  computeScoresFrom,
  topTwoCodes,
  matchJobs,
  combineInterestAndAptitude,
};
