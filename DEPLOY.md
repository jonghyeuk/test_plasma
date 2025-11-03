# Firebase Hosting 배포 가이드

## 프로젝트 정보
- **프로젝트 이름:** Plasma-simulator
- **프로젝트 ID:** plasma-simulator
- **프로젝트 번호:** 1039084125366

## 배포 방법

### 방법 1: 로컬에서 수동 배포 (추천)

```bash
# 1. Firebase CLI 로그인
firebase login

# 2. 프로젝트 빌드
cd plasma-sim
npm install
npm run build
cd ..

# 3. Firebase에 배포
firebase deploy

# 배포 완료 후 URL이 표시됩니다:
# https://plasma-simulator.web.app
# https://plasma-simulator.firebaseapp.com
```

### 방법 2: GitHub Actions 자동 배포

#### 2-1. Firebase Service Account 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. 프로젝트 선택: `plasma-simulator`
3. 프로젝트 설정 → 서비스 계정 탭
4. "새 비공개 키 생성" 클릭
5. JSON 파일 다운로드

#### 2-2. GitHub Secret 설정

1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. Name: `FIREBASE_SERVICE_ACCOUNT_PLASMA_SIMULATOR`
4. Value: 다운로드한 JSON 파일 전체 내용 붙여넣기
5. "Add secret" 클릭

#### 2-3. 자동 배포 활성화

이제 `main` 브랜치 또는 현재 브랜치에 푸시하면 자동으로 배포됩니다!

```bash
git push origin claude/explore-local-files-011CUkG4z3Rkw62W9TsBH124
```

## 배포 확인

배포 후 다음 URL에서 확인:
- **메인 URL:** https://plasma-simulator.web.app
- **보조 URL:** https://plasma-simulator.firebaseapp.com

## 파일 구조

```
test_plasma/
├── firebase.json              # Firebase Hosting 설정
├── .firebaserc               # Firebase 프로젝트 ID
├── .github/
│   └── workflows/
│       └── firebase-hosting.yml  # 자동 배포 워크플로우
└── plasma-sim/
    └── dist/                 # 빌드된 파일 (배포 대상)
```

## 문제 해결

### Firebase CLI가 설치되지 않은 경우
```bash
npm install -g firebase-tools
```

### 권한 오류가 발생하는 경우
```bash
firebase login --reauth
```

### 빌드 오류가 발생하는 경우
```bash
cd plasma-sim
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 추가 설정

### 커스텀 도메인 연결
1. Firebase Console → Hosting
2. "도메인 추가" 클릭
3. 안내에 따라 DNS 설정

### SSL 인증서
- Firebase Hosting은 자동으로 무료 SSL 인증서를 제공합니다

## 참고 자료
- [Firebase Hosting 문서](https://firebase.google.com/docs/hosting)
- [Firebase CLI 문서](https://firebase.google.com/docs/cli)
