// ===== 데이터: RIASEC 흥미검사 문항 (각 유형 4문항 x 6유형 = 24문항) =====
const QUESTIONS = [
  { code: "R", text: "기계나 도구를 분해하고 조립하는 것을 좋아합니까?" },
  { code: "R", text: "손으로 직접 무언가를 만들거나 고치는 활동을 즐깁니까?" },
  { code: "R", text: "야외에서 몸을 움직이며 하는 활동을 선호합니까?" },
  { code: "R", text: "운동, 요리, 목공 등 실습 위주의 활동이 즐겁습니까?" },

  { code: "I", text: "새로운 현상을 관찰하고 원리를 탐구하는 것이 즐겁습니까?" },
  { code: "I", text: "복잡한 문제를 논리적으로 분석하는 것을 좋아합니까?" },
  { code: "I", text: "수학이나 과학적 사고를 활용하는 것을 좋아합니까?" },
  { code: "I", text: "실험이나 연구를 통해 답을 찾는 과정이 흥미롭습니까?" },

  { code: "A", text: "새로운 아이디어나 표현 방식을 만들어내는 것이 즐겁습니까?" },
  { code: "A", text: "그림, 음악, 글쓰기 등 창작 활동을 좋아합니까?" },
  { code: "A", text: "정해진 규칙보다 자유로운 방식으로 일하는 것을 선호합니까?" },
  { code: "A", text: "미적 감각을 활용하는 활동에 끌립니까?" },

  { code: "S", text: "다른 사람을 가르치거나 돕는 활동이 즐겁습니까?" },
  { code: "S", text: "타인의 감정과 고민에 공감하고 함께 해결하려 노력합니까?" },
  { code: "S", text: "봉사활동이나 상담처럼 사람 중심의 일이 좋습니까?" },
  { code: "S", text: "팀원들과 협력하며 관계를 맺는 것이 즐겁습니까?" },

  { code: "E", text: "사람들을 설득하고 이끄는 리더 역할이 즐겁습니까?" },
  { code: "E", text: "새로운 사업이나 프로젝트를 기획하는 것을 좋아합니까?" },
  { code: "E", text: "목표를 세우고 도전적인 성과를 내는 것에 동기부여를 느낍니까?" },
  { code: "E", text: "경쟁적인 상황에서 성취감을 느낍니까?" },

  { code: "C", text: "자료를 체계적으로 정리하고 분류하는 것을 좋아합니까?" },
  { code: "C", text: "정확한 규칙과 절차를 따르는 일이 편안합니까?" },
  { code: "C", text: "숫자나 문서를 다루는 꼼꼼한 작업을 잘합니까?" },
  { code: "C", text: "계획적이고 예측 가능한 업무 환경을 선호합니까?" },
];

// ===== 데이터: 적성 자기평가 문항 (각 유형 2문항 x 6유형 = 12문항) =====
// claud.md 3장 "적성 자기평가" 항목 반영 (예: 수리 계산 능력, 공감 능력 등 자기평가 진술문)
const APTITUDE_QUESTIONS = [
  { code: "R", text: "나는 몸을 움직이거나 손으로 하는 작업을 남들보다 능숙하게 해낸다." },
  { code: "R", text: "나는 기계나 장비를 다루는 감각이 좋다는 말을 자주 듣는다." },

  { code: "I", text: "나는 남들보다 수리·논리적 계산 능력이 뛰어나다." },
  { code: "I", text: "나는 복잡한 문제의 원인을 분석하는 데 강점이 있다." },

  { code: "A", text: "나는 남들보다 창의적인 아이디어를 잘 떠올린다." },
  { code: "A", text: "나는 글, 그림, 음악 등으로 표현하는 능력이 뛰어나다는 평가를 받는다." },

  { code: "S", text: "나는 타인의 감정을 잘 공감하고 이해한다." },
  { code: "S", text: "나는 사람들 사이의 갈등을 조율하는 것을 잘한다." },

  { code: "E", text: "나는 사람들을 설득하고 이끄는 능력이 뛰어나다." },
  { code: "E", text: "나는 새로운 기회를 포착하고 추진하는 힘이 강하다." },

  { code: "C", text: "나는 자료나 일정을 꼼꼼하게 정리하고 관리하는 능력이 뛰어나다." },
  { code: "C", text: "나는 규칙과 절차를 정확하게 지키는 것을 잘한다." },
];

// ===== 데이터: 직업 DB (RIASEC 코드 + 가치관 매핑) =====
const JOB_DB = [
  { name: "데이터 과학자", codes: ["I", "R", "A"], desc: "데이터를 분석하여 인사이트를 추출하고 의사결정을 돕는다.", values: ["성취감", "높은 보수"] },
  { name: "심리 상담사", codes: ["S", "A", "I"], desc: "타인의 심리적 문제를 상담하고 해결을 돕는다.", values: ["성취감", "안정성"] },
  { name: "마케팅 기획자", codes: ["E", "A", "C"], desc: "상품/서비스 판매 전략을 수립하고 실행한다.", values: ["높은 보수", "성취감"] },
  { name: "소프트웨어 개발자", codes: ["I", "R", "C"], desc: "프로그램을 설계하고 코딩하여 서비스를 만든다.", values: ["성취감", "높은 보수"] },
  { name: "교사", codes: ["S", "A", "E"], desc: "학생들을 가르치고 성장을 돕는다.", values: ["안정성", "성취감"] },
  { name: "회계사", codes: ["C", "I", "E"], desc: "기업의 회계 자료를 작성/검토하고 재무를 관리한다.", values: ["안정성", "높은 보수"] },
  { name: "그래픽 디자이너", codes: ["A", "R", "I"], desc: "시각적 콘텐츠를 기획하고 디자인한다.", values: ["성취감"] },
  { name: "간호사", codes: ["S", "I", "R"], desc: "환자를 돌보고 의료 처치를 보조한다.", values: ["안정성", "성취감"] },
  { name: "기계공학 엔지니어", codes: ["R", "I", "C"], desc: "기계 장치와 시스템을 설계/개발한다.", values: ["성취감", "높은 보수"] },
  { name: "영업 관리자", codes: ["E", "S", "C"], desc: "고객 관계를 관리하고 매출 목표를 달성한다.", values: ["높은 보수", "성취감"] },
  { name: "작가", codes: ["A", "I", "S"], desc: "글을 통해 이야기나 정보를 전달한다.", values: ["성취감"] },
  { name: "사서", codes: ["C", "S", "I"], desc: "자료를 분류/정리하고 이용자에게 정보를 제공한다.", values: ["안정성"] },
  { name: "경찰관", codes: ["R", "S", "E"], desc: "사회 질서를 유지하고 시민의 안전을 지킨다.", values: ["안정성", "성취감"] },
  { name: "요리사", codes: ["R", "A", "E"], desc: "음식을 조리하고 메뉴를 개발한다.", values: ["성취감"] },
  { name: "사회복지사", codes: ["S", "C", "E"], desc: "복지 서비스를 기획하고 대상자를 지원한다.", values: ["안정성", "성취감"] },
  { name: "행정 공무원", codes: ["C", "S", "R"], desc: "행정 업무를 처리하고 공공 서비스를 제공한다.", values: ["안정성"] },
  { name: "배우/연기자", codes: ["A", "E", "S"], desc: "무대나 영상에서 캐릭터를 연기한다.", values: ["성취감"] },
  { name: "기업가/창업가", codes: ["E", "A", "I"], desc: "새로운 사업 아이디어를 실현하고 조직을 운영한다.", values: ["높은 보수", "성취감"] },
  { name: "은행원", codes: ["C", "E", "S"], desc: "금융 상품을 안내하고 고객의 자산 관리를 돕는다.", values: ["안정성", "높은 보수"] },
  { name: "연구원(과학자)", codes: ["I", "R", "C"], desc: "실험과 연구를 통해 새로운 지식을 탐구한다.", values: ["성취감"] },
  { name: "건축가", codes: ["A", "R", "I"], desc: "건물과 공간을 설계하고 구조를 계획한다.", values: ["성취감", "높은 보수"] },
  { name: "물리치료사", codes: ["S", "R", "I"], desc: "환자의 신체 기능 회복을 돕는 치료를 제공한다.", values: ["안정성", "성취감"] },
  { name: "약사", codes: ["I", "C", "S"], desc: "의약품을 조제하고 복약 지도를 한다.", values: ["안정성", "높은 보수"] },
  { name: "의사", codes: ["I", "S", "R"], desc: "환자를 진단하고 치료한다.", values: ["성취감", "높은 보수"] },
  { name: "수의사", codes: ["I", "R", "S"], desc: "동물을 진료하고 건강을 관리한다.", values: ["성취감"] },
  { name: "통계학자/데이터 분석가", codes: ["I", "C", "R"], desc: "데이터를 수집·분석하여 패턴과 인사이트를 도출한다.", values: ["성취감", "높은 보수"] },
  { name: "번역가/통역사", codes: ["A", "S", "I"], desc: "언어를 매개로 의미와 문화를 전달한다.", values: ["성취감"] },
  { name: "패션 디자이너", codes: ["A", "E", "R"], desc: "의류와 액세서리를 기획하고 디자인한다.", values: ["성취감"] },
  { name: "영상 편집자/PD", codes: ["A", "E", "I"], desc: "영상 콘텐츠를 기획, 촬영, 편집한다.", values: ["성취감"] },
  { name: "게임 기획자", codes: ["A", "I", "E"], desc: "게임의 시스템과 스토리를 설계한다.", values: ["성취감", "높은 보수"] },
  { name: "UX/UI 디자이너", codes: ["A", "I", "C"], desc: "사용자 경험을 고려한 서비스 화면을 설계한다.", values: ["성취감", "높은 보수"] },
  { name: "음악가/작곡가", codes: ["A", "I", "R"], desc: "음악을 작곡하고 연주하여 감성을 표현한다.", values: ["성취감"] },
  { name: "사진작가", codes: ["A", "R", "E"], desc: "사진을 통해 순간과 메시지를 기록한다.", values: ["성취감"] },
  { name: "인테리어 디자이너", codes: ["A", "R", "C"], desc: "실내 공간을 미적, 기능적으로 설계한다.", values: ["성취감", "높은 보수"] },
  { name: "유치원/초등 교사", codes: ["S", "A", "C"], desc: "어린 학생들을 가르치고 정서적으로 돌본다.", values: ["안정성", "성취감"] },
  { name: "특수교사", codes: ["S", "I", "A"], desc: "특별한 교육적 지원이 필요한 학생을 가르친다.", values: ["안정성", "성취감"] },
  { name: "직업상담사/커리어 코치", codes: ["S", "E", "C"], desc: "개인의 진로와 취업을 상담하고 지원한다.", values: ["성취감", "안정성"] },
  { name: "물류/운송 관리자", codes: ["C", "R", "E"], desc: "물류 흐름을 계획하고 운송을 관리한다.", values: ["안정성", "높은 보수"] },
  { name: "인사(HR) 담당자", codes: ["S", "C", "E"], desc: "채용, 교육, 조직문화 등 인사 업무를 담당한다.", values: ["안정성", "성취감"] },
  { name: "호텔/관광 매니저", codes: ["E", "S", "C"], desc: "숙박·관광 서비스를 기획하고 운영한다.", values: ["성취감", "높은 보수"] },
  { name: "부동산 중개인", codes: ["E", "C", "S"], desc: "부동산 매매·임대를 중개하고 상담한다.", values: ["높은 보수", "성취감"] },
  { name: "펀드매니저/금융분석가", codes: ["I", "E", "C"], desc: "투자 자산을 분석하고 운용 전략을 세운다.", values: ["높은 보수", "성취감"] },
  { name: "보험 설계사", codes: ["E", "C", "S"], desc: "고객에게 맞는 보험 상품을 설계하고 판매한다.", values: ["높은 보수", "안정성"] },
  { name: "변호사", codes: ["E", "I", "S"], desc: "법률 문제를 분석하고 의뢰인을 대변한다.", values: ["높은 보수", "성취감"] },
  { name: "정치인/공공정책가", codes: ["E", "S", "A"], desc: "정책을 기획하고 공공의 이익을 대변한다.", values: ["성취감"] },
  { name: "PD/광고 기획자", codes: ["E", "A", "C"], desc: "광고·방송 콘텐츠를 기획하고 제작을 총괄한다.", values: ["성취감", "높은 보수"] },
  { name: "스포츠 트레이너/코치", codes: ["R", "S", "E"], desc: "운동 지도를 통해 신체 능력 향상을 돕는다.", values: ["성취감"] },
  { name: "농업/원예 전문가", codes: ["R", "I", "C"], desc: "작물을 재배하고 농업 기술을 연구·적용한다.", values: ["안정성"] },
  { name: "전기/전자 기술자", codes: ["R", "C", "I"], desc: "전기·전자 설비를 설치하고 유지보수한다.", values: ["안정성", "높은 보수"] },
  { name: "항공기 조종사/승무원", codes: ["R", "S", "E"], desc: "항공기를 운항하거나 기내 서비스를 제공한다.", values: ["성취감", "높은 보수"] },
  { name: "소방관/응급구조사", codes: ["R", "S", "I"], desc: "재난과 응급 상황에서 인명을 구조한다.", values: ["안정성", "성취감"] },
  { name: "군인/장교", codes: ["R", "C", "E"], desc: "국가 안보 임무를 수행하고 조직을 지휘한다.", values: ["안정성", "성취감"] },
  { name: "제빵사/파티시에", codes: ["R", "A", "C"], desc: "빵과 디저트를 만들고 메뉴를 개발한다.", values: ["성취감"] },
  { name: "환경 엔지니어", codes: ["I", "R", "C"], desc: "환경 문제를 분석하고 해결 기술을 설계한다.", values: ["성취감", "안정성"] },
  { name: "생명공학 연구원", codes: ["I", "R", "A"], desc: "생명과학 기반의 연구와 신기술을 개발한다.", values: ["성취감", "높은 보수"] },
  { name: "천문학자/기상학자", codes: ["I", "A", "C"], desc: "우주 및 기상 현상을 관측하고 연구한다.", values: ["성취감"] },
  { name: "빅데이터/AI 엔지니어", codes: ["I", "C", "R"], desc: "인공지능 모델을 개발하고 대규모 데이터를 처리한다.", values: ["성취감", "높은 보수"] },
  { name: "네트워크/보안 전문가", codes: ["I", "C", "R"], desc: "정보 시스템의 네트워크와 보안을 관리한다.", values: ["안정성", "높은 보수"] },
  { name: "세무사/관세사", codes: ["C", "I", "E"], desc: "세무 신고와 관세 업무를 대리하고 자문한다.", values: ["안정성", "높은 보수"] },
  { name: "감정평가사/공인중개사", codes: ["C", "E", "I"], desc: "자산의 가치를 평가하고 거래를 자문한다.", values: ["높은 보수", "안정성"] },
];

const RIASEC_NAMES = { R: "현실형", I: "탐구형", A: "예술형", S: "사회형", E: "진취형", C: "관습형" };

// ===== 데이터: 성격 성향(MBTI-lite) 8문항 (4개 지표 x 2문항) =====
const MBTI_QUESTIONS = [
  { pole: "E", text: "여러 사람과 함께 활동할 때 에너지가 생긴다." },
  { pole: "I", text: "혼자 생각을 정리하는 시간이 꼭 필요하다." },
  { pole: "S", text: "구체적이고 현실적인 정보를 바탕으로 판단하는 것을 선호한다." },
  { pole: "N", text: "가능성과 새로운 아이디어를 상상하는 것이 즐겁다." },
  { pole: "T", text: "결정을 내릴 때 논리와 사실을 우선적으로 고려한다." },
  { pole: "F", text: "결정을 내릴 때 사람들의 감정과 관계를 우선적으로 고려한다." },
  { pole: "J", text: "계획을 세우고 그대로 진행하는 것이 편안하다." },
  { pole: "P", text: "상황에 따라 유연하게 대응하는 것을 선호한다." },
];

// 성향 그룹별 진로 연관 설명 (claud.md B안 반영)
const MBTI_GROUP_DESC = {
  NF: "사람들의 성장을 지원하고 창의적인 일을 선호하는 성향입니다. (교육, 상담, 예술 분야와 잘 맞습니다)",
  NT: "시스템을 설계하고 전략적으로 문제를 해결하는 것을 선호하는 성향입니다. (연구, 공학, 기획 분야와 잘 맞습니다)",
  SJ: "체계적이고 조직적인 환경에서 전통과 규칙을 중시하는 성향입니다. (행정, 관리, 안정적인 직무와 잘 맞습니다)",
  SP: "현실적이고 즉각적인 문제 해결을 선호하며 자유로운 활동을 즐기는 성향입니다. (스포츠, 예술, 서비스 분야와 잘 맞습니다)",
};

// ===== 상태 =====
let currentIndex = 0;
const answers = new Array(QUESTIONS.length).fill(null);
let aptIndex = 0;
const aptAnswers = new Array(APTITUDE_QUESTIONS.length).fill(null);
let selectedValue = null;
let mbtiIndex = 0;
const mbtiAnswers = new Array(MBTI_QUESTIONS.length).fill(null);

// ===== DOM =====
const screens = {
  intro: document.getElementById("screen-intro"),
  quiz: document.getElementById("screen-quiz"),
  aptitude: document.getElementById("screen-aptitude"),
  values: document.getElementById("screen-values"),
  mbti: document.getElementById("screen-mbti"),
  result: document.getElementById("screen-result"),
};

function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  screens[name].classList.add("active");
}

// ===== 검사 화면 =====
function renderQuestion() {
  const q = QUESTIONS[currentIndex];
  document.getElementById("question-code").textContent = `[${RIASEC_NAMES[q.code]} · ${q.code}]`;
  document.getElementById("question-text").textContent = q.text;
  document.getElementById("progress-text").textContent = `${currentIndex + 1} / ${QUESTIONS.length}`;
  document.getElementById("progress-fill").style.width = `${(currentIndex / QUESTIONS.length) * 100}%`;
  document.getElementById("btn-back").style.display = currentIndex === 0 ? "none" : "block";
}

document.getElementById("btn-start").addEventListener("click", () => {
  currentIndex = 0;
  answers.fill(null);
  renderQuestion();
  showScreen("quiz");
});

document.getElementById("scale-buttons").addEventListener("click", (e) => {
  const btn = e.target.closest(".scale-btn");
  if (!btn) return;
  answers[currentIndex] = Number(btn.dataset.value);
  if (currentIndex < QUESTIONS.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    document.getElementById("progress-fill").style.width = "100%";
    aptIndex = 0;
    aptAnswers.fill(null);
    renderAptQuestion();
    showScreen("aptitude");
  }
});

document.getElementById("btn-back").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
});

// ===== 적성 자기평가 화면 =====
function renderAptQuestion() {
  const q = APTITUDE_QUESTIONS[aptIndex];
  document.getElementById("apt-question-code").textContent = `[${RIASEC_NAMES[q.code]} · ${q.code}]`;
  document.getElementById("apt-question-text").textContent = q.text;
  document.getElementById("apt-progress-text").textContent = `${aptIndex + 1} / ${APTITUDE_QUESTIONS.length}`;
  document.getElementById("apt-progress-fill").style.width = `${(aptIndex / APTITUDE_QUESTIONS.length) * 100}%`;
  document.getElementById("btn-apt-back").style.display = aptIndex === 0 ? "none" : "block";
}

document.getElementById("apt-scale-buttons").addEventListener("click", (e) => {
  const btn = e.target.closest(".scale-btn");
  if (!btn) return;
  aptAnswers[aptIndex] = Number(btn.dataset.value);
  if (aptIndex < APTITUDE_QUESTIONS.length - 1) {
    aptIndex++;
    renderAptQuestion();
  } else {
    document.getElementById("apt-progress-fill").style.width = "100%";
    showScreen("values");
  }
});

document.getElementById("btn-apt-back").addEventListener("click", () => {
  if (aptIndex > 0) {
    aptIndex--;
    renderAptQuestion();
  }
});

// ===== 가치관 화면 =====
document.getElementById("value-options").addEventListener("click", (e) => {
  const btn = e.target.closest(".value-btn");
  if (!btn) return;
  selectedValue = btn.dataset.value;
  mbtiIndex = 0;
  mbtiAnswers.fill(null);
  renderMbtiQuestion();
  showScreen("mbti");
});

// ===== 성격 성향(MBTI-lite) 화면 =====
function renderMbtiQuestion() {
  const q = MBTI_QUESTIONS[mbtiIndex];
  document.getElementById("mbti-question-text").textContent = q.text;
  document.getElementById("mbti-progress-text").textContent = `${mbtiIndex + 1} / ${MBTI_QUESTIONS.length}`;
  document.getElementById("mbti-progress-fill").style.width = `${(mbtiIndex / MBTI_QUESTIONS.length) * 100}%`;
  document.getElementById("btn-mbti-back").style.display = mbtiIndex === 0 ? "none" : "block";
}

document.getElementById("mbti-scale-buttons").addEventListener("click", (e) => {
  const btn = e.target.closest(".scale-btn");
  if (!btn) return;
  mbtiAnswers[mbtiIndex] = Number(btn.dataset.value);
  if (mbtiIndex < MBTI_QUESTIONS.length - 1) {
    mbtiIndex++;
    renderMbtiQuestion();
  } else {
    document.getElementById("mbti-progress-fill").style.width = "100%";
    computeAndShowResult();
  }
});

document.getElementById("btn-mbti-back").addEventListener("click", () => {
  if (mbtiIndex > 0) {
    mbtiIndex--;
    renderMbtiQuestion();
  }
});

function computeMbtiType() {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  MBTI_QUESTIONS.forEach((q, i) => {
    scores[q.pole] += mbtiAnswers[i] || 0;
  });
  const type =
    (scores.E >= scores.I ? "E" : "I") +
    (scores.S >= scores.N ? "S" : "N") +
    (scores.T >= scores.F ? "T" : "F") +
    (scores.J >= scores.P ? "J" : "P");
  return type;
}

function mbtiGroupOf(type) {
  const n = type[1] === "N";
  const f = type[2] === "F";
  const j = type[3] === "J";
  if (n && !f) return "NT";
  if (n && f) return "NF";
  if (!n && j) return "SJ";
  return "SP";
}

// ===== 결과 계산 =====
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

// 백엔드(/api/recommend)가 떠 있으면 그쪽 결과를 쓰고, 없으면(정적 파일로 열었을 때)
// 브라우저 내 로컬 로직으로 자동 대체한다 (claud.md 로드맵 4단계 "백엔드 개발" 반영).
async function getRecommendations(combinedTopCodes, value) {
  try {
    const res = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        interestQuestions: QUESTIONS,
        interestAnswers: answers,
        aptitudeQuestions: APTITUDE_QUESTIONS,
        aptitudeAnswers: aptAnswers,
        value,
      }),
    });
    if (!res.ok) throw new Error("API 응답 오류");
    const data = await res.json();
    return data.recommendations;
  } catch (err) {
    // 백엔드 미실행(file:// 로 직접 열었거나 서버 다운) 시 로컬 매칭으로 폴백
    return matchJobs(combinedTopCodes, value);
  }
}

async function computeAndShowResult() {
  const interestScores = computeScoresFrom(QUESTIONS, answers);
  const aptitudeScores = computeScoresFrom(APTITUDE_QUESTIONS, aptAnswers);
  const topCodes = topTwoCodes(interestScores);
  const topAptCodes = topTwoCodes(aptitudeScores);

  // 흥미(가중치 1) + 적성(가중치 0.5)를 합산해 직업 매칭용 종합 코드를 산출 (claud.md 3장 반영)
  const combinedScores = {};
  Object.keys(interestScores).forEach((code) => {
    combinedScores[code] = interestScores[code] + aptitudeScores[code] * 0.5;
  });
  const combinedTopCodes = topTwoCodes(combinedScores);

  renderChart(interestScores, "riasec-chart");
  document.getElementById("top-codes").textContent =
    topCodes.map((c) => `${RIASEC_NAMES[c]}(${c})`).join(", ");

  renderChart(aptitudeScores, "aptitude-chart");
  document.getElementById("top-apt-codes").textContent =
    topAptCodes.map((c) => `${RIASEC_NAMES[c]}(${c})`).join(", ");

  document.getElementById("top-value").textContent = selectedValue;

  const mbtiType = computeMbtiType();
  const mbtiGroup = mbtiGroupOf(mbtiType);
  document.getElementById("top-mbti").textContent = mbtiType;
  document.getElementById("mbti-desc").textContent = MBTI_GROUP_DESC[mbtiGroup];

  allRecommendations = await getRecommendations(combinedTopCodes, selectedValue);
  visibleJobCount = JOB_PAGE_SIZE;
  renderJobList(allRecommendations);

  lastResult = {
    codeLabel: topCodes.map((c) => `${RIASEC_NAMES[c]}(${c})`).join(", "),
    aptLabel: topAptCodes.map((c) => `${RIASEC_NAMES[c]}(${c})`).join(", "),
    value: selectedValue,
    mbtiType,
    mbtiDesc: MBTI_GROUP_DESC[mbtiGroup],
    jobs: allRecommendations,
  };

  showScreen("result");
}

// ===== 결과 저장/공유 =====
let lastResult = null;

function buildResultText() {
  if (!lastResult) return "";
  const jobLines = lastResult.jobs
    .slice(0, 8)
    .map((j) => `- ${j.name} (${j.codes.join("/")}): ${j.desc}`)
    .join("\n");
  return [
    "[ 자기 탐색 & 직업 추천 결과 ]",
    `핵심 흥미 코드: ${lastResult.codeLabel}`,
    `핵심 적성 코드: ${lastResult.aptLabel}`,
    `중요 가치관: ${lastResult.value}`,
    `성격 성향: ${lastResult.mbtiType} - ${lastResult.mbtiDesc}`,
    "",
    "추천 직업 목록:",
    jobLines,
  ].join("\n");
}

document.getElementById("btn-copy").addEventListener("click", async () => {
  const text = buildResultText();
  const toast = document.getElementById("copy-toast");
  try {
    await navigator.clipboard.writeText(text);
    toast.textContent = "결과가 클립보드에 복사되었습니다!";
  } catch (err) {
    toast.textContent = "복사에 실패했습니다. 브라우저 권한을 확인해주세요.";
  }
  setTimeout(() => (toast.textContent = ""), 3000);
});

document.getElementById("btn-print").addEventListener("click", () => {
  window.print();
});

function renderChart(scores, containerId) {
  const maxScore = Math.max(...Object.values(scores), 1);
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  Object.entries(scores).forEach(([code, score]) => {
    const row = document.createElement("div");
    row.className = "riasec-row";
    row.innerHTML = `
      <span class="riasec-label">${code}</span>
      <div class="riasec-bar-bg">
        <div class="riasec-bar-fill" style="width:${(score / maxScore) * 100}%"></div>
      </div>
      <span class="riasec-score">${score}</span>
    `;
    container.appendChild(row);
  });
}

function matchJobs(topCodes, value) {
  // 1순위 코드가 포함된 직업 우선 매칭, 2순위 코드 포함 여부 및 가치관 일치 여부로 정렬
  const scored = JOB_DB.map((job) => {
    let score = 0;
    if (job.codes.includes(topCodes[0])) score += 3;
    if (job.codes.includes(topCodes[1])) score += 2;
    if (job.values.includes(value)) score += 1;
    return { job, score };
  }).filter((item) => item.score >= 3); // 최소한 1순위 코드는 일치해야 함

  scored.sort((a, b) => b.score - a.score);
  return scored.map((item) => item.job);
}

const JOB_PAGE_SIZE = 8;
let allRecommendations = [];
let visibleJobCount = JOB_PAGE_SIZE;

function renderJobList(jobs) {
  const container = document.getElementById("job-list");
  const moreWrap = document.getElementById("job-more-wrap");
  container.innerHTML = "";
  if (jobs.length === 0) {
    container.innerHTML = `<p>조건에 맞는 직업을 찾지 못했습니다. 다시 검사해보세요.</p>`;
    moreWrap.innerHTML = "";
    return;
  }
  const visibleJobs = jobs.slice(0, visibleJobCount);
  visibleJobs.forEach((job) => {
    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <h4>${job.name}</h4>
      <p>${job.desc}</p>
      <div class="job-tags">
        ${job.codes.map((c) => `<span class="job-tag">${c}</span>`).join("")}
      </div>
    `;
    container.appendChild(card);
  });

  moreWrap.innerHTML = "";
  if (visibleJobCount < jobs.length) {
    const moreBtn = document.createElement("button");
    moreBtn.className = "btn btn-ghost";
    moreBtn.id = "btn-more-jobs";
    moreBtn.textContent = `더 보기 (${jobs.length - visibleJobCount}개 남음)`;
    moreBtn.addEventListener("click", () => {
      visibleJobCount += JOB_PAGE_SIZE;
      renderJobList(allRecommendations);
    });
    moreWrap.appendChild(moreBtn);
  }
}

// ===== 다시 시작 =====
document.getElementById("btn-restart").addEventListener("click", () => {
  currentIndex = 0;
  answers.fill(null);
  aptIndex = 0;
  aptAnswers.fill(null);
  selectedValue = null;
  mbtiIndex = 0;
  mbtiAnswers.fill(null);
  visibleJobCount = JOB_PAGE_SIZE;
  showScreen("intro");
});
