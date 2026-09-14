# 자기 탐색 & 직업 추천 프로그램

`claud.md`의 기획을 바탕으로 만든 웹앱입니다. 프론트엔드는 정적 파일만으로도 동작하고,
Node.js 백엔드(`server.js`)를 함께 실행하면 채점·매칭 로직이 서버 API로도 처리됩니다.

## 파일 구성

- `index.html` / `style.css` / `script.js` — 프론트엔드 (시작 → 흥미검사 24문항 → 적성 자기평가 12문항 → 가치관 선택 → 성격 성향 8문항 → 결과)
- `jobs.json` — 직업 DB 원본 데이터 (현재는 직접 구성한 60개 직업 샘플)
- `server.js` — Express 백엔드. `/api/jobs`, `/api/recommend` 제공
- `lib/jobMatcher.js` — 채점·매칭 알고리즘 (서버에서 사용, script.js와 동일 로직)
- `lib/dataSource.js` — 직업 데이터 소스 어댑터 (로컬 jobs.json ↔ 커리어넷 API 전환 지점)
- `package.json` — 백엔드 의존성(Express) 정의

## 실행 방법

### 1) 프론트엔드만 (백엔드 없이)

`index.html`을 더블클릭해서 열면 바로 동작합니다. `script.js`는 `/api/recommend` 호출을 시도했다가
실패하면 자동으로 브라우저 내 로컬 로직으로 대체하므로, 백엔드가 없어도 완전히 동작합니다.

### 2) 백엔드까지 포함해서 실행 (권장)

> ⚠️ 이 작업 환경에는 **Node.js와 git이 설치되어 있지 않아** 아래 명령을 제가 직접 실행/검증하지 못했습니다.
> Node.js(https://nodejs.org)를 설치한 뒤 아래 순서로 직접 실행해 확인해주세요.

```powershell
npm install
npm start
```

브라우저에서 `http://localhost:3000` 접속. 이제 `script.js`가 `/api/recommend`를 호출해
서버 쪽 채점·매칭 로직을 사용합니다.

## 알려진 한계 (claud.md 대비 미구현/미검증 사항)

1. **실제 공공데이터 미연동**: 커리어넷(CareerNet)·워크넷(WorkNet) 실데이터를 아직 가져오지 않았습니다.
   `lib/dataSource.js`에 `CAREERNET_API_KEY` 환경변수를 설정하면 커리어넷 API를 우선 시도하도록
   구조는 만들어 두었지만, **실제 엔드포인트 경로와 응답 필드명은 이 환경에서 네트워크 호출로
   검증하지 못했습니다.** 사용 전 반드시 커리어넷 오픈API 공식 문서를 확인하고
   `lib/dataSource.js`의 `mapCareerNetItem()` / 엔드포인트 URL을 맞춰야 합니다.
2. **백엔드 미실행/미검증**: `server.js`, `lib/jobMatcher.js`, `lib/dataSource.js` 코드는 작성했지만,
   이 환경에 Node.js가 없어 `npm install` / `npm start` / API 응답을 직접 실행해 검증하지 못했습니다.
   문법 오류가 없는지는 확인했으나, 실제 구동 확인은 Node.js가 설치된 환경에서 필요합니다.
3. **배포 미완료**: git이 설치되어 있지 않아 커밋도 만들지 못했습니다. git 설치 후:
   ```powershell
   git init
   git add .
   git commit -m "init"
   git branch -M main
   git remote add origin <저장소 URL>
   git push -u origin main
   ```
   프론트엔드만 배포하려면 GitHub Pages/Netlify 등에 정적 파일 그대로 올리면 되고,
   백엔드까지 배포하려면 Node.js를 지원하는 호스팅(Render, Railway, Fly.io 등)이 필요합니다.
   (계정 생성/실제 배포는 사용자 본인 확인이 필요한 작업입니다.)

## 기능 요약

- 흥미(RIASEC) 24문항 + 적성 자기평가 12문항 → 가중 합산(흥미 1.0, 적성 0.5)으로 핵심 코드 산출
- 가치관 선택(성취감/안정성/높은 보수) → 직업 매칭 가중치에 반영
- 성격 성향(MBTI-lite) 8문항 → NF/NT/SJ/SP 그룹별 진로 설명 제공
- 결과 복사(클립보드) / 인쇄·PDF 저장 버튼
- 백엔드(Express) API로 채점·매칭 로직 이전 가능, 없으면 프론트엔드 로컬 로직으로 자동 대체
- 커리어넷 실데이터 연동을 위한 어댑터 구조 마련 (`lib/dataSource.js`)
