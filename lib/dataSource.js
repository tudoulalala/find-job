// ===== 직업 데이터 소스 어댑터 =====
// 기본값: jobs.json (직접 구성한 60개 직업 샘플 데이터)
// CAREERNET_API_KEY 환경변수가 설정되면 커리어넷 오픈API에서 직업 데이터를 가져와
// 동일한 스키마({ name, codes, desc, values })로 변환해 사용한다.
//
// ⚠️ 주의: 아래 커리어넷 연동 코드는 실제 네트워크 호출로 검증되지 않았다.
// 이 개발 환경은 외부 API를 호출할 네트워크 권한이 없어 응답 스키마를 직접 확인하지 못했다.
// 실제 사용 전 반드시 커리어넷 오픈API 공식 문서(https://www.career.go.kr/cnet/front/openapi/openApiExplorer.do)에서
// 엔드포인트 경로, 요청 파라미터, 응답 필드명을 재확인하고 아래 매핑 함수(mapCareerNetItem)를 맞춰야 한다.

const fs = require("fs");
const path = require("path");

const LOCAL_JOBS_PATH = path.join(__dirname, "..", "jobs.json");

function loadLocalJobs() {
  const raw = fs.readFileSync(LOCAL_JOBS_PATH, "utf-8");
  return JSON.parse(raw);
}

// 커리어넷 API 응답 1건을 우리 직업 스키마로 변환한다.
// TODO: 실제 응답 필드명이 다를 경우 이 함수만 수정하면 된다.
function mapCareerNetItem(item) {
  return {
    name: item.job_nm || item.name,
    codes: (item.riasec_code || "").split("").filter(Boolean),
    desc: item.job_desc || item.description || "",
    values: item.job_values || [],
  };
}

async function fetchFromCareerNet(apiKey) {
  const endpoint = process.env.CAREERNET_API_URL ||
    "https://www.career.go.kr/cnet/openapi/getJobList"; // TODO: 공식 문서 기준으로 확인 필요

  const res = await fetch(`${endpoint}?apiKey=${encodeURIComponent(apiKey)}&perPage=100`);
  if (!res.ok) {
    throw new Error(`CareerNet API 요청 실패: ${res.status}`);
  }
  const data = await res.json();
  const items = data.jobs || data.items || [];
  return items.map(mapCareerNetItem);
}

/**
 * 직업 목록을 반환한다.
 * - CAREERNET_API_KEY가 설정되어 있으면 커리어넷 API를 우선 시도하고,
 *   실패하면(네트워크 오류, 키 미검증 등) 로컬 jobs.json으로 안전하게 폴백한다.
 * - 설정되어 있지 않으면 바로 로컬 데이터를 사용한다.
 */
async function getJobs() {
  const apiKey = process.env.CAREERNET_API_KEY;
  if (!apiKey) {
    return loadLocalJobs();
  }
  try {
    const jobs = await fetchFromCareerNet(apiKey);
    if (Array.isArray(jobs) && jobs.length > 0) return jobs;
    return loadLocalJobs();
  } catch (err) {
    console.warn("[dataSource] CareerNet API 연동 실패, 로컬 데이터로 대체합니다:", err.message);
    return loadLocalJobs();
  }
}

module.exports = { getJobs, loadLocalJobs };
