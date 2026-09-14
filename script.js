// ===== 언어 설정 =====
let currentLang = localStorage.getItem("lang") || "ko";

function t(field) {
  // field: { ko: "...", zh: "..." } 형태의 객체에서 현재 언어 값을 반환
  return field[currentLang] || field.ko;
}

// ===== 데이터: RIASEC 흥미검사 문항 (각 유형 4문항 x 6유형 = 24문항) =====
const QUESTIONS = [
  { code: "R", text: { ko: "기계나 도구를 분해하고 조립하는 것을 좋아합니까?", zh: "你喜欢拆解和组装机械或工具吗？" } },
  { code: "R", text: { ko: "손으로 직접 무언가를 만들거나 고치는 활동을 즐깁니까?", zh: "你喜欢亲手制作或修理东西吗？" } },
  { code: "R", text: { ko: "야외에서 몸을 움직이며 하는 활동을 선호합니까?", zh: "你更喜欢在户外进行身体活动吗？" } },
  { code: "R", text: { ko: "운동, 요리, 목공 등 실습 위주의 활동이 즐겁습니까?", zh: "你喜欢运动、烹饪、木工等以动手实践为主的活动吗？" } },

  { code: "I", text: { ko: "새로운 현상을 관찰하고 원리를 탐구하는 것이 즐겁습니까?", zh: "你喜欢观察新现象并探究其原理吗？" } },
  { code: "I", text: { ko: "복잡한 문제를 논리적으로 분석하는 것을 좋아합니까?", zh: "你喜欢用逻辑分析复杂问题吗？" } },
  { code: "I", text: { ko: "수학이나 과학적 사고를 활용하는 것을 좋아합니까?", zh: "你喜欢运用数学或科学思维吗？" } },
  { code: "I", text: { ko: "실험이나 연구를 통해 답을 찾는 과정이 흥미롭습니까?", zh: "你觉得通过实验或研究寻找答案的过程很有趣吗？" } },

  { code: "A", text: { ko: "새로운 아이디어나 표현 방식을 만들어내는 것이 즐겁습니까?", zh: "你喜欢创造新的想法或表达方式吗？" } },
  { code: "A", text: { ko: "그림, 음악, 글쓰기 등 창작 활동을 좋아합니까?", zh: "你喜欢绘画、音乐、写作等创作活动吗？" } },
  { code: "A", text: { ko: "정해진 규칙보다 자유로운 방식으로 일하는 것을 선호합니까?", zh: "比起既定规则，你更喜欢以自由的方式工作吗？" } },
  { code: "A", text: { ko: "미적 감각을 활용하는 활동에 끌립니까?", zh: "你被需要运用审美感的活动所吸引吗？" } },

  { code: "S", text: { ko: "다른 사람을 가르치거나 돕는 활동이 즐겁습니까?", zh: "你喜欢教导或帮助他人的活动吗？" } },
  { code: "S", text: { ko: "타인의 감정과 고민에 공감하고 함께 해결하려 노력합니까?", zh: "你会共情他人的情绪和烦恼，并努力一起解决吗？" } },
  { code: "S", text: { ko: "봉사활동이나 상담처럼 사람 중심의 일이 좋습니까?", zh: "你喜欢志愿服务或咨询这类以人为中心的工作吗？" } },
  { code: "S", text: { ko: "팀원들과 협력하며 관계를 맺는 것이 즐겁습니까?", zh: "你喜欢与团队成员合作并建立关系吗？" } },

  { code: "E", text: { ko: "사람들을 설득하고 이끄는 리더 역할이 즐겁습니까?", zh: "你喜欢说服并带领他人的领导角色吗？" } },
  { code: "E", text: { ko: "새로운 사업이나 프로젝트를 기획하는 것을 좋아합니까?", zh: "你喜欢策划新的事业或项目吗？" } },
  { code: "E", text: { ko: "목표를 세우고 도전적인 성과를 내는 것에 동기부여를 느낍니까?", zh: "设定目标并取得有挑战性的成果会让你有动力吗？" } },
  { code: "E", text: { ko: "경쟁적인 상황에서 성취감을 느낍니까?", zh: "你在竞争的情境中会感到成就感吗？" } },

  { code: "C", text: { ko: "자료를 체계적으로 정리하고 분류하는 것을 좋아합니까?", zh: "你喜欢系统地整理和分类资料吗？" } },
  { code: "C", text: { ko: "정확한 규칙과 절차를 따르는 일이 편안합니까?", zh: "遵循准确的规则和程序会让你感到自在吗？" } },
  { code: "C", text: { ko: "숫자나 문서를 다루는 꼼꼼한 작업을 잘합니까?", zh: "你擅长处理数字或文件等细致的工作吗？" } },
  { code: "C", text: { ko: "계획적이고 예측 가능한 업무 환경을 선호합니까?", zh: "你更喜欢有计划、可预测的工作环境吗？" } },
];

// ===== 데이터: 적성 자기평가 문항 (각 유형 2문항 x 6유형 = 12문항) =====
const APTITUDE_QUESTIONS = [
  { code: "R", text: { ko: "나는 몸을 움직이거나 손으로 하는 작업을 남들보다 능숙하게 해낸다.", zh: "我比别人更擅长运用身体或用手完成工作。" } },
  { code: "R", text: { ko: "나는 기계나 장비를 다루는 감각이 좋다는 말을 자주 듣는다.", zh: "我经常被人说很有操作机械或设备的天赋。" } },

  { code: "I", text: { ko: "나는 남들보다 수리·논리적 계산 능력이 뛰어나다.", zh: "我的数理与逻辑运算能力比别人强。" } },
  { code: "I", text: { ko: "나는 복잡한 문제의 원인을 분석하는 데 강점이 있다.", zh: "我擅长分析复杂问题的原因。" } },

  { code: "A", text: { ko: "나는 남들보다 창의적인 아이디어를 잘 떠올린다.", zh: "我比别人更善于产生有创意的想法。" } },
  { code: "A", text: { ko: "나는 글, 그림, 음악 등으로 표현하는 능력이 뛰어나다는 평가를 받는다.", zh: "我在文字、绘画、音乐等表达能力方面获得很高评价。" } },

  { code: "S", text: { ko: "나는 타인의 감정을 잘 공감하고 이해한다.", zh: "我很擅长共情和理解他人的情绪。" } },
  { code: "S", text: { ko: "나는 사람들 사이의 갈등을 조율하는 것을 잘한다.", zh: "我擅长调解人与人之间的矛盾。" } },

  { code: "E", text: { ko: "나는 사람들을 설득하고 이끄는 능력이 뛰어나다.", zh: "我擅长说服和带领他人。" } },
  { code: "E", text: { ko: "나는 새로운 기회를 포착하고 추진하는 힘이 강하다.", zh: "我善于捕捉新机会并推动执行。" } },

  { code: "C", text: { ko: "나는 자료나 일정을 꼼꼼하게 정리하고 관리하는 능력이 뛰어나다.", zh: "我擅长细致地整理和管理资料或日程。" } },
  { code: "C", text: { ko: "나는 규칙과 절차를 정확하게 지키는 것을 잘한다.", zh: "我很擅长准确遵守规则和流程。" } },
];

// ===== 데이터: 직업 DB (RIASEC 코드 + 가치관 매핑) =====
// values는 백엔드(jobs.json)와 매칭 키를 맞추기 위해 한국어 문자열을 그대로 사용한다.
const JOB_DB = [
  { name: { ko: "데이터 과학자", zh: "数据科学家" }, codes: ["I", "R", "A"], desc: { ko: "데이터를 분석하여 인사이트를 추출하고 의사결정을 돕는다.", zh: "分析数据以提取洞察并辅助决策。" }, values: ["성취감", "높은 보수"] },
  { name: { ko: "심리 상담사", zh: "心理咨询师" }, codes: ["S", "A", "I"], desc: { ko: "타인의 심리적 문제를 상담하고 해결을 돕는다.", zh: "为他人提供心理咨询并协助解决心理问题。" }, values: ["성취감", "안정성"] },
  { name: { ko: "마케팅 기획자", zh: "市场营销策划师" }, codes: ["E", "A", "C"], desc: { ko: "상품/서비스 판매 전략을 수립하고 실행한다.", zh: "制定并执行产品/服务的销售策略。" }, values: ["높은 보수", "성취감"] },
  { name: { ko: "소프트웨어 개발자", zh: "软件开发工程师" }, codes: ["I", "R", "C"], desc: { ko: "프로그램을 설계하고 코딩하여 서비스를 만든다.", zh: "设计并编写程序，开发服务产品。" }, values: ["성취감", "높은 보수"] },
  { name: { ko: "교사", zh: "教师" }, codes: ["S", "A", "E"], desc: { ko: "학생들을 가르치고 성장을 돕는다.", zh: "教导学生并帮助他们成长。" }, values: ["안정성", "성취감"] },
  { name: { ko: "회계사", zh: "会计师" }, codes: ["C", "I", "E"], desc: { ko: "기업의 회계 자료를 작성/검토하고 재무를 관리한다.", zh: "编制/审核企业会计资料并管理财务。" }, values: ["안정성", "높은 보수"] },
  { name: { ko: "그래픽 디자이너", zh: "平面设计师" }, codes: ["A", "R", "I"], desc: { ko: "시각적 콘텐츠를 기획하고 디자인한다.", zh: "策划并设计视觉内容。" }, values: ["성취감"] },
  { name: { ko: "간호사", zh: "护士" }, codes: ["S", "I", "R"], desc: { ko: "환자를 돌보고 의료 처치를 보조한다.", zh: "照顾患者并协助医疗处置。" }, values: ["안정성", "성취감"] },
  { name: { ko: "기계공학 엔지니어", zh: "机械工程师" }, codes: ["R", "I", "C"], desc: { ko: "기계 장치와 시스템을 설계/개발한다.", zh: "设计/开发机械装置与系统。" }, values: ["성취감", "높은 보수"] },
  { name: { ko: "영업 관리자", zh: "销售经理" }, codes: ["E", "S", "C"], desc: { ko: "고객 관계를 관리하고 매출 목표를 달성한다.", zh: "管理客户关系并达成销售目标。" }, values: ["높은 보수", "성취감"] },
  { name: { ko: "작가", zh: "作家" }, codes: ["A", "I", "S"], desc: { ko: "글을 통해 이야기나 정보를 전달한다.", zh: "通过文字传达故事或信息。" }, values: ["성취감"] },
  { name: { ko: "사서", zh: "图书管理员" }, codes: ["C", "S", "I"], desc: { ko: "자료를 분류/정리하고 이용자에게 정보를 제공한다.", zh: "对资料进行分类整理，并向用户提供信息。" }, values: ["안정성"] },
  { name: { ko: "경찰관", zh: "警察" }, codes: ["R", "S", "E"], desc: { ko: "사회 질서를 유지하고 시민의 안전을 지킨다.", zh: "维护社会秩序，保障市民安全。" }, values: ["안정성", "성취감"] },
  { name: { ko: "요리사", zh: "厨师" }, codes: ["R", "A", "E"], desc: { ko: "음식을 조리하고 메뉴를 개발한다.", zh: "烹饪食物并研发菜单。" }, values: ["성취감"] },
  { name: { ko: "사회복지사", zh: "社会工作者" }, codes: ["S", "C", "E"], desc: { ko: "복지 서비스를 기획하고 대상자를 지원한다.", zh: "策划福利服务并为对象提供支持。" }, values: ["안정성", "성취감"] },
  { name: { ko: "행정 공무원", zh: "行政公务员" }, codes: ["C", "S", "R"], desc: { ko: "행정 업무를 처리하고 공공 서비스를 제공한다.", zh: "处理行政事务并提供公共服务。" }, values: ["안정성"] },
  { name: { ko: "배우/연기자", zh: "演员" }, codes: ["A", "E", "S"], desc: { ko: "무대나 영상에서 캐릭터를 연기한다.", zh: "在舞台或影像中饰演角色。" }, values: ["성취감"] },
  { name: { ko: "기업가/창업가", zh: "企业家/创业者" }, codes: ["E", "A", "I"], desc: { ko: "새로운 사업 아이디어를 실현하고 조직을 운영한다.", zh: "实现新的商业构想并经营组织。" }, values: ["높은 보수", "성취감"] },
  { name: { ko: "은행원", zh: "银行职员" }, codes: ["C", "E", "S"], desc: { ko: "금융 상품을 안내하고 고객의 자산 관리를 돕는다.", zh: "介绍金融产品并协助客户进行资产管理。" }, values: ["안정성", "높은 보수"] },
  { name: { ko: "연구원(과학자)", zh: "研究员(科学家)" }, codes: ["I", "R", "C"], desc: { ko: "실험과 연구를 통해 새로운 지식을 탐구한다.", zh: "通过实验与研究探索新知识。" }, values: ["성취감"] },
  { name: { ko: "건축가", zh: "建筑师" }, codes: ["A", "R", "I"], desc: { ko: "건물과 공간을 설계하고 구조를 계획한다.", zh: "设计建筑与空间，规划结构。" }, values: ["성취감", "높은 보수"] },
  { name: { ko: "물리치료사", zh: "物理治疗师" }, codes: ["S", "R", "I"], desc: { ko: "환자의 신체 기능 회복을 돕는 치료를 제공한다.", zh: "提供帮助患者恢复身体机能的治疗。" }, values: ["안정성", "성취감"] },
  { name: { ko: "약사", zh: "药剂师" }, codes: ["I", "C", "S"], desc: { ko: "의약품을 조제하고 복약 지도를 한다.", zh: "配制药品并指导用药。" }, values: ["안정성", "높은 보수"] },
  { name: { ko: "의사", zh: "医生" }, codes: ["I", "S", "R"], desc: { ko: "환자를 진단하고 치료한다.", zh: "诊断并治疗患者。" }, values: ["성취감", "높은 보수"] },
  { name: { ko: "수의사", zh: "兽医" }, codes: ["I", "R", "S"], desc: { ko: "동물을 진료하고 건강을 관리한다.", zh: "诊治动物并管理其健康。" }, values: ["성취감"] },
  { name: { ko: "통계학자/데이터 분석가", zh: "统计学家/数据分析师" }, codes: ["I", "C", "R"], desc: { ko: "데이터를 수집·분석하여 패턴과 인사이트를 도출한다.", zh: "收集并分析数据，得出规律与洞察。" }, values: ["성취감", "높은 보수"] },
  { name: { ko: "번역가/통역사", zh: "翻译/口译员" }, codes: ["A", "S", "I"], desc: { ko: "언어를 매개로 의미와 문화를 전달한다.", zh: "以语言为媒介传递意义与文化。" }, values: ["성취감"] },
  { name: { ko: "패션 디자이너", zh: "服装设计师" }, codes: ["A", "E", "R"], desc: { ko: "의류와 액세서리를 기획하고 디자인한다.", zh: "策划并设计服装与配饰。" }, values: ["성취감"] },
  { name: { ko: "영상 편집자/PD", zh: "视频剪辑师/制片人" }, codes: ["A", "E", "I"], desc: { ko: "영상 콘텐츠를 기획, 촬영, 편집한다.", zh: "策划、拍摄并剪辑影像内容。" }, values: ["성취감"] },
  { name: { ko: "게임 기획자", zh: "游戏策划" }, codes: ["A", "I", "E"], desc: { ko: "게임의 시스템과 스토리를 설계한다.", zh: "设计游戏的系统与故事。" }, values: ["성취감", "높은 보수"] },
  { name: { ko: "UX/UI 디자이너", zh: "UX/UI设计师" }, codes: ["A", "I", "C"], desc: { ko: "사용자 경험을 고려한 서비스 화면을 설계한다.", zh: "设计考虑用户体验的服务界面。" }, values: ["성취감", "높은 보수"] },
  { name: { ko: "음악가/작곡가", zh: "音乐家/作曲家" }, codes: ["A", "I", "R"], desc: { ko: "음악을 작곡하고 연주하여 감성을 표현한다.", zh: "创作并演奏音乐以表达情感。" }, values: ["성취감"] },
  { name: { ko: "사진작가", zh: "摄影师" }, codes: ["A", "R", "E"], desc: { ko: "사진을 통해 순간과 메시지를 기록한다.", zh: "通过照片记录瞬间与信息。" }, values: ["성취감"] },
  { name: { ko: "인테리어 디자이너", zh: "室内设计师" }, codes: ["A", "R", "C"], desc: { ko: "실내 공간을 미적, 기능적으로 설계한다.", zh: "兼顾美观与功能设计室内空间。" }, values: ["성취감", "높은 보수"] },
  { name: { ko: "유치원/초등 교사", zh: "幼儿园/小学教师" }, codes: ["S", "A", "C"], desc: { ko: "어린 학생들을 가르치고 정서적으로 돌본다.", zh: "教导幼儿并照顾其情绪发展。" }, values: ["안정성", "성취감"] },
  { name: { ko: "특수교사", zh: "特殊教育教师" }, codes: ["S", "I", "A"], desc: { ko: "특별한 교육적 지원이 필요한 학생을 가르친다.", zh: "教导需要特别教育支持的学生。" }, values: ["안정성", "성취감"] },
  { name: { ko: "직업상담사/커리어 코치", zh: "职业咨询师/生涯教练" }, codes: ["S", "E", "C"], desc: { ko: "개인의 진로와 취업을 상담하고 지원한다.", zh: "为个人的职业发展与就业提供咨询与支持。" }, values: ["성취감", "안정성"] },
  { name: { ko: "물류/운송 관리자", zh: "物流/运输经理" }, codes: ["C", "R", "E"], desc: { ko: "물류 흐름을 계획하고 운송을 관리한다.", zh: "规划物流流程并管理运输。" }, values: ["안정성", "높은 보수"] },
  { name: { ko: "인사(HR) 담당자", zh: "人力资源(HR)专员" }, codes: ["S", "C", "E"], desc: { ko: "채용, 교육, 조직문화 등 인사 업무를 담당한다.", zh: "负责招聘、培训、组织文化等人事工作。" }, values: ["안정성", "성취감"] },
  { name: { ko: "호텔/관광 매니저", zh: "酒店/旅游经理" }, codes: ["E", "S", "C"], desc: { ko: "숙박·관광 서비스를 기획하고 운영한다.", zh: "策划并运营住宿、旅游服务。" }, values: ["성취감", "높은 보수"] },
  { name: { ko: "부동산 중개인", zh: "房地产经纪人" }, codes: ["E", "C", "S"], desc: { ko: "부동산 매매·임대를 중개하고 상담한다.", zh: "中介房地产买卖、租赁并提供咨询。" }, values: ["높은 보수", "성취감"] },
  { name: { ko: "펀드매니저/금융분석가", zh: "基金经理/金融分析师" }, codes: ["I", "E", "C"], desc: { ko: "투자 자산을 분석하고 운용 전략을 세운다.", zh: "分析投资资产并制定运营策略。" }, values: ["높은 보수", "성취감"] },
  { name: { ko: "보험 설계사", zh: "保险规划师" }, codes: ["E", "C", "S"], desc: { ko: "고객에게 맞는 보험 상품을 설계하고 판매한다.", zh: "为客户设计并销售合适的保险产品。" }, values: ["높은 보수", "안정성"] },
  { name: { ko: "변호사", zh: "律师" }, codes: ["E", "I", "S"], desc: { ko: "법률 문제를 분석하고 의뢰인을 대변한다.", zh: "分析法律问题并代表委托人。" }, values: ["높은 보수", "성취감"] },
  { name: { ko: "정치인/공공정책가", zh: "政治家/公共政策专家" }, codes: ["E", "S", "A"], desc: { ko: "정책을 기획하고 공공의 이익을 대변한다.", zh: "制定政策并代表公众利益。" }, values: ["성취감"] },
  { name: { ko: "PD/광고 기획자", zh: "制作人/广告策划" }, codes: ["E", "A", "C"], desc: { ko: "광고·방송 콘텐츠를 기획하고 제작을 총괄한다.", zh: "策划广告、广播内容并统筹制作。" }, values: ["성취감", "높은 보수"] },
  { name: { ko: "스포츠 트레이너/코치", zh: "体育教练" }, codes: ["R", "S", "E"], desc: { ko: "운동 지도를 통해 신체 능력 향상을 돕는다.", zh: "通过运动指导帮助提升身体能力。" }, values: ["성취감"] },
  { name: { ko: "농업/원예 전문가", zh: "农业/园艺专家" }, codes: ["R", "I", "C"], desc: { ko: "작물을 재배하고 농업 기술을 연구·적용한다.", zh: "种植作物并研究、应用农业技术。" }, values: ["안정성"] },
  { name: { ko: "전기/전자 기술자", zh: "电气/电子技术员" }, codes: ["R", "C", "I"], desc: { ko: "전기·전자 설비를 설치하고 유지보수한다.", zh: "安装并维护电气、电子设备。" }, values: ["안정성", "높은 보수"] },
  { name: { ko: "항공기 조종사/승무원", zh: "飞行员/空乘人员" }, codes: ["R", "S", "E"], desc: { ko: "항공기를 운항하거나 기내 서비스를 제공한다.", zh: "驾驶航空器或提供机上服务。" }, values: ["성취감", "높은 보수"] },
  { name: { ko: "소방관/응급구조사", zh: "消防员/急救员" }, codes: ["R", "S", "I"], desc: { ko: "재난과 응급 상황에서 인명을 구조한다.", zh: "在灾难与紧急情况中救助生命。" }, values: ["안정성", "성취감"] },
  { name: { ko: "군인/장교", zh: "军人/军官" }, codes: ["R", "C", "E"], desc: { ko: "국가 안보 임무를 수행하고 조직을 지휘한다.", zh: "执行国家安全任务并指挥组织。" }, values: ["안정성", "성취감"] },
  { name: { ko: "제빵사/파티시에", zh: "烘焙师/甜点师" }, codes: ["R", "A", "C"], desc: { ko: "빵과 디저트를 만들고 메뉴를 개발한다.", zh: "制作面包和甜点并研发菜单。" }, values: ["성취감"] },
  { name: { ko: "환경 엔지니어", zh: "环境工程师" }, codes: ["I", "R", "C"], desc: { ko: "환경 문제를 분석하고 해결 기술을 설계한다.", zh: "分析环境问题并设计解决技术。" }, values: ["성취감", "안정성"] },
  { name: { ko: "생명공학 연구원", zh: "生物技术研究员" }, codes: ["I", "R", "A"], desc: { ko: "생명과학 기반의 연구와 신기술을 개발한다.", zh: "基于生命科学进行研究并开发新技术。" }, values: ["성취감", "높은 보수"] },
  { name: { ko: "천문학자/기상학자", zh: "天文学家/气象学家" }, codes: ["I", "A", "C"], desc: { ko: "우주 및 기상 현상을 관측하고 연구한다.", zh: "观测并研究宇宙及气象现象。" }, values: ["성취감"] },
  { name: { ko: "빅데이터/AI 엔지니어", zh: "大数据/AI工程师" }, codes: ["I", "C", "R"], desc: { ko: "인공지능 모델을 개발하고 대규모 데이터를 처리한다.", zh: "开发人工智能模型并处理大规模数据。" }, values: ["성취감", "높은 보수"] },
  { name: { ko: "네트워크/보안 전문가", zh: "网络/安全专家" }, codes: ["I", "C", "R"], desc: { ko: "정보 시스템의 네트워크와 보안을 관리한다.", zh: "管理信息系统的网络与安全。" }, values: ["안정성", "높은 보수"] },
  { name: { ko: "세무사/관세사", zh: "税务师/关务师" }, codes: ["C", "I", "E"], desc: { ko: "세무 신고와 관세 업무를 대리하고 자문한다.", zh: "代理并咨询税务申报与关税事务。" }, values: ["안정성", "높은 보수"] },
  { name: { ko: "감정평가사/공인중개사", zh: "资产评估师/房产中介" }, codes: ["C", "E", "I"], desc: { ko: "자산의 가치를 평가하고 거래를 자문한다.", zh: "评估资产价值并为交易提供咨询。" }, values: ["높은 보수", "안정성"] },
];

// name(ko) -> {name, desc} 조회용 맵. 백엔드(/api/recommend)가 한국어 데이터만 돌려줘도
// 프론트에서 언어에 맞게 다시 표시할 수 있도록 한다.
const JOB_I18N_MAP = new Map(JOB_DB.map((j) => [j.name.ko, j]));

function displayJob(job) {
  const local = JOB_I18N_MAP.get(job.name) || null;
  return {
    name: local ? t(local.name) : job.name,
    desc: local ? t(local.desc) : job.desc,
    codes: job.codes,
  };
}

const RIASEC_NAMES = {
  R: { ko: "현실형", zh: "现实型" },
  I: { ko: "탐구형", zh: "研究型" },
  A: { ko: "예술형", zh: "艺术型" },
  S: { ko: "사회형", zh: "社会型" },
  E: { ko: "진취형", zh: "企业型" },
  C: { ko: "관습형", zh: "常规型" },
};

const VALUE_LABELS = {
  "성취감": { ko: "성취감", zh: "成就感" },
  "안정성": { ko: "안정성", zh: "稳定性" },
  "높은 보수": { ko: "높은 보수", zh: "高薪酬" },
};

// ===== 데이터: 성격 성향(MBTI-lite) 8문항 (4개 지표 x 2문항) =====
const MBTI_QUESTIONS = [
  { pole: "E", text: { ko: "여러 사람과 함께 활동할 때 에너지가 생긴다.", zh: "和很多人一起活动时我会更有活力。" } },
  { pole: "I", text: { ko: "혼자 생각을 정리하는 시간이 꼭 필요하다.", zh: "我需要独自整理思绪的时间。" } },
  { pole: "S", text: { ko: "구체적이고 현실적인 정보를 바탕으로 판단하는 것을 선호한다.", zh: "我更喜欢基于具体、现实的信息做判断。" } },
  { pole: "N", text: { ko: "가능성과 새로운 아이디어를 상상하는 것이 즐겁다.", zh: "我喜欢想象可能性和新点子。" } },
  { pole: "T", text: { ko: "결정을 내릴 때 논리와 사실을 우선적으로 고려한다.", zh: "做决定时我会优先考虑逻辑和事实。" } },
  { pole: "F", text: { ko: "결정을 내릴 때 사람들의 감정과 관계를 우선적으로 고려한다.", zh: "做决定时我会优先考虑他人的情感和关系。" } },
  { pole: "J", text: { ko: "계획을 세우고 그대로 진행하는 것이 편안하다.", zh: "制定计划并按计划执行会让我感到自在。" } },
  { pole: "P", text: { ko: "상황에 따라 유연하게 대응하는 것을 선호한다.", zh: "我更喜欢根据情况灵活应对。" } },
];

// 성향 그룹별 진로 연관 설명 (claud.md B안 반영)
const MBTI_GROUP_DESC = {
  NF: { ko: "사람들의 성장을 지원하고 창의적인 일을 선호하는 성향입니다. (교육, 상담, 예술 분야와 잘 맞습니다)", zh: "倾向于支持他人成长、喜欢富有创造性的工作。(适合教育、咨询、艺术领域)" },
  NT: { ko: "시스템을 설계하고 전략적으로 문제를 해결하는 것을 선호하는 성향입니다. (연구, 공학, 기획 분야와 잘 맞습니다)", zh: "倾向于设计系统、以战略方式解决问题。(适合研究、工程、企划领域)" },
  SJ: { ko: "체계적이고 조직적인 환경에서 전통과 규칙을 중시하는 성향입니다. (행정, 관리, 안정적인 직무와 잘 맞습니다)", zh: "在系统化、有组织的环境中重视传统与规则。(适合行政、管理及稳定型职务)" },
  SP: { ko: "현실적이고 즉각적인 문제 해결을 선호하며 자유로운 활동을 즐기는 성향입니다. (스포츠, 예술, 서비스 분야와 잘 맞습니다)", zh: "倾向于现实、即时地解决问题，并享受自由的活动。(适合体育、艺术、服务领域)" },
};

// ===== 언어 전환 =====
function applyStaticI18n() {
  document.documentElement.lang = currentLang === "zh" ? "zh" : "ko";
  document.querySelectorAll("[data-ko]").forEach((el) => {
    const value = currentLang === "zh" ? el.dataset.zh : el.dataset.ko;
    if (value == null) return;
    el.innerHTML = value;
  });
  document.querySelectorAll(".lang-tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
}

function rerenderCurrentScreen() {
  // 현재 활성화된 화면에 맞는 동적 콘텐츠만 다시 그린다.
  if (screens.quiz.classList.contains("active")) renderQuestion();
  else if (screens.aptitude.classList.contains("active")) renderAptQuestion();
  else if (screens.mbti.classList.contains("active")) renderMbtiQuestion();
  else if (screens.result.classList.contains("active")) rerenderResult();
}

document.getElementById("lang-tabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".lang-tab");
  if (!btn || btn.dataset.lang === currentLang) return;
  currentLang = btn.dataset.lang;
  localStorage.setItem("lang", currentLang);
  applyStaticI18n();
  rerenderCurrentScreen();
});

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
  document.getElementById("question-code").textContent = `[${t(RIASEC_NAMES[q.code])} · ${q.code}]`;
  document.getElementById("question-text").textContent = t(q.text);
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
  document.getElementById("apt-question-code").textContent = `[${t(RIASEC_NAMES[q.code])} · ${q.code}]`;
  document.getElementById("apt-question-text").textContent = t(q.text);
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
  document.getElementById("mbti-question-text").textContent = t(q.text);
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
// 문항 텍스트는 백엔드 채점에 쓰이지 않으므로 언어와 무관하게 한국어 코드 매핑만 전달한다.
async function getRecommendations(combinedTopCodes, value) {
  try {
    const res = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        interestQuestions: QUESTIONS.map((q) => ({ code: q.code })),
        interestAnswers: answers,
        aptitudeQuestions: APTITUDE_QUESTIONS.map((q) => ({ code: q.code })),
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

  const mbtiType = computeMbtiType();

  allRecommendations = await getRecommendations(combinedTopCodes, selectedValue);
  visibleJobCount = JOB_PAGE_SIZE;

  lastResult = {
    interestScores,
    aptitudeScores,
    topCodes,
    topAptCodes,
    value: selectedValue,
    mbtiType,
    jobs: allRecommendations,
  };

  rerenderResult();
  showScreen("result");
}

// 저장된 lastResult를 현재 언어로 다시 그린다 (언어 전환 시에도 재사용).
function rerenderResult() {
  if (!lastResult) return;

  renderChart(lastResult.interestScores, "riasec-chart");
  document.getElementById("top-codes").textContent =
    lastResult.topCodes.map((c) => `${t(RIASEC_NAMES[c])}(${c})`).join(", ");

  renderChart(lastResult.aptitudeScores, "aptitude-chart");
  document.getElementById("top-apt-codes").textContent =
    lastResult.topAptCodes.map((c) => `${t(RIASEC_NAMES[c])}(${c})`).join(", ");

  document.getElementById("top-value").textContent = t(VALUE_LABELS[lastResult.value] || { ko: lastResult.value, zh: lastResult.value });

  const mbtiGroup = mbtiGroupOf(lastResult.mbtiType);
  document.getElementById("top-mbti").textContent = lastResult.mbtiType;
  document.getElementById("mbti-desc").textContent = t(MBTI_GROUP_DESC[mbtiGroup]);

  renderJobList(lastResult.jobs);
}

// ===== 결과 저장/공유 =====
let lastResult = null;

function buildResultText() {
  if (!lastResult) return "";
  const codeLabel = lastResult.topCodes.map((c) => `${t(RIASEC_NAMES[c])}(${c})`).join(", ");
  const aptLabel = lastResult.topAptCodes.map((c) => `${t(RIASEC_NAMES[c])}(${c})`).join(", ");
  const valueLabel = t(VALUE_LABELS[lastResult.value] || { ko: lastResult.value, zh: lastResult.value });
  const mbtiGroup = mbtiGroupOf(lastResult.mbtiType);
  const jobLines = lastResult.jobs
    .slice(0, 8)
    .map((j) => {
      const dj = displayJob(j);
      return `- ${dj.name} (${dj.codes.join("/")}): ${dj.desc}`;
    })
    .join("\n");

  if (currentLang === "zh") {
    return [
      "[ 自我探索与职业推荐结果 ]",
      `核心兴趣代码: ${codeLabel}`,
      `核心能力代码: ${aptLabel}`,
      `重要价值观: ${valueLabel}`,
      `性格倾向: ${lastResult.mbtiType} - ${t(MBTI_GROUP_DESC[mbtiGroup])}`,
      "",
      "推荐职业列表:",
      jobLines,
    ].join("\n");
  }

  return [
    "[ 자기 탐색 & 직업 추천 결과 ]",
    `핵심 흥미 코드: ${codeLabel}`,
    `핵심 적성 코드: ${aptLabel}`,
    `중요 가치관: ${valueLabel}`,
    `성격 성향: ${lastResult.mbtiType} - ${t(MBTI_GROUP_DESC[mbtiGroup])}`,
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
    toast.textContent = currentLang === "zh" ? "结果已复制到剪贴板！" : "결과가 클립보드에 복사되었습니다!";
  } catch (err) {
    toast.textContent = currentLang === "zh" ? "复制失败，请检查浏览器权限。" : "복사에 실패했습니다. 브라우저 권한을 확인해주세요.";
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
  // 로컬 폴백 시에는 이름이 한국어 원본(job.name.ko)이 되도록 맞춰준다.
  return scored.map((item) => ({ ...item.job, name: item.job.name.ko, desc: item.job.desc.ko }));
}

const JOB_PAGE_SIZE = 8;
let allRecommendations = [];
let visibleJobCount = JOB_PAGE_SIZE;

function renderJobList(jobs) {
  const container = document.getElementById("job-list");
  const moreWrap = document.getElementById("job-more-wrap");
  container.innerHTML = "";
  if (jobs.length === 0) {
    container.innerHTML = `<p>${currentLang === "zh" ? "未找到符合条件的职业，请重新测试。" : "조건에 맞는 직업을 찾지 못했습니다. 다시 검사해보세요."}</p>`;
    moreWrap.innerHTML = "";
    return;
  }
  const visibleJobs = jobs.slice(0, visibleJobCount);
  visibleJobs.forEach((job) => {
    const dj = displayJob(job);
    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <h4>${dj.name}</h4>
      <p>${dj.desc}</p>
      <div class="job-tags">
        ${dj.codes.map((c) => `<span class="job-tag">${c}</span>`).join("")}
      </div>
    `;
    container.appendChild(card);
  });

  moreWrap.innerHTML = "";
  if (visibleJobCount < jobs.length) {
    const moreBtn = document.createElement("button");
    moreBtn.className = "btn btn-ghost";
    moreBtn.id = "btn-more-jobs";
    moreBtn.textContent =
      currentLang === "zh"
        ? `查看更多 (还有${jobs.length - visibleJobCount}个)`
        : `더 보기 (${jobs.length - visibleJobCount}개 남음)`;
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

// ===== 초기화 =====
applyStaticI18n();
