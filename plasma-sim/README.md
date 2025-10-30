# 반도체 공정 플라즈마 시뮬레이터 (Plasma Simulator)

React로 구현된 인터랙티브 플라즈마 시뮬레이터입니다.

## 🚀 로컬에서 UI 확인하기

### 1단계: 개발 서버 실행

```bash
cd plasma-sim
npm run dev
```

### 2단계: 브라우저에서 접속

서버가 시작되면 다음과 같은 메시지가 표시됩니다:

```
VITE v7.1.12  ready in 273 ms

➜  Local:   http://localhost:5174/
➜  Network: http://192.168.x.x:5174/
```

**로컬에서 접속**: http://localhost:5174/

**다른 기기에서 접속**: Network에 표시된 IP 주소 사용

### 포트 변경하기

`vite.config.js` 파일에서 포트 번호를 변경할 수 있습니다:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // 원하는 포트 번호로 변경
    host: true,
  },
})
```

또는 명령어로 직접 지정:

```bash
npm run dev -- --port 3000
```

## 🎨 구현된 기능

### 1. DC 플라즈마 원리
- 3단계 애니메이션 (양이온 이동, 2차 전자 방출, 이온화 반응)
- Sheath 형성 메커니즘 시각화
- Plasma Potential vs Floating Potential

### 2. RF 플라즈마 원리
- 실시간 RF 파형 (13.56 MHz)
- Sheath Potential 변화 애니메이션
- 이온 충돌 시각화

### 3. 주파수 효과
- RF 주파수 조절 (0.1 ~ 100 MHz)
- RF 파워 제어 (50 ~ 1000 W)
- 전극 면적비 조절
- Self-bias 계산

### 4. 드바이렝스 (Debye Length)
- 전자 밀도 및 온도 조절
- 실시간 드바이렝스 계산
- 준중성 조건 확인

### 5. 전자 온도
- 전자 온도, 가스 압력, RF 파워 제어
- 이온화율 시뮬레이션
- 활성종 밀도 계산

## 📦 기술 스택

- **React 18** - UI 프레임워크
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **SVG Animations** - 플라즈마 애니메이션

## 🔧 설치 및 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 📁 프로젝트 구조

```
plasma-sim/
├── src/
│   ├── PlasmaSimulator.jsx  # 메인 컴포넌트
│   ├── App.jsx
│   ├── index.css            # Tailwind CSS
│   └── main.jsx
├── vite.config.js           # Vite 설정 (포트 설정)
├── tailwind.config.js
└── package.json
```

## 🌐 다른 프로젝트에 통합하기

### 컴포넌트만 복사하는 경우:

1. `PlasmaSimulator.jsx` 파일을 복사
2. Tailwind CSS가 설정되어 있는지 확인
3. React 프로젝트에서 import하여 사용:

```jsx
import PlasmaSimulator from './PlasmaSimulator'

function App() {
  return <PlasmaSimulator />
}
```

### 전체 프로젝트 이동:

```bash
# plasma-sim 폴더를 다른 프로젝트 위치로 복사
cp -r plasma-sim /path/to/your/project/

# 의존성 설치
cd /path/to/your/project/plasma-sim
npm install

# 실행
npm run dev
```

## 🔍 문제 해결

### 포트가 이미 사용 중인 경우

```bash
# 다른 포트로 실행
npm run dev -- --port 3000
```

또는 `vite.config.js`에서 포트 변경

### 브라우저에서 접속이 안 되는 경우

1. 서버가 정상 실행되었는지 확인
2. 방화벽 설정 확인
3. http://localhost:5174/ 대신 http://127.0.0.1:5174/ 시도

## 📝 라이선스

MIT
