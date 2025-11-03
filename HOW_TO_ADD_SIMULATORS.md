# 🚀 시뮬레이터 추가 가이드 (자동 배포)

## ✨ 자동 배포 구조

GitHub에 파일만 push하면 **자동으로 빌드되고 Firebase에 배포**됩니다!

```
GitHub Push → GitHub Actions → 빌드 → Firebase 배포 → 웹사이트 업데이트
```

---

## 📝 시뮬레이터 I 추가 방법

### **파일 위치:** `plasma-sim/src/PlasmaSimulatorI.jsx`

### **작업 순서:**

1. **GitHub에서 파일 열기**
   - https://github.com/jonghyeuk/test_plasma
   - `plasma-sim/src/PlasmaSimulatorI.jsx` 파일 클릭
   - "Edit this file" (연필 아이콘) 클릭

2. **Placeholder 코드 전체 삭제**
   - 현재 있는 모든 코드를 삭제

3. **시뮬레이터 코드 붙여넣기**
   ```jsx
   import React, { useState, useEffect, useRef } from 'react';
   import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

   // 여기에 PlasmaSimulator.js의 코드를 붙여넣기

   const PlasmaSimulatorI = () => {
     // ... 시뮬레이터 코드 ...
   };

   export default PlasmaSimulatorI;
   ```

4. **중요: 컴포넌트 이름 변경**
   - `const PlasmaSimulator = ()` → `const PlasmaSimulatorI = ()`
   - `export default PlasmaSimulator` → `export default PlasmaSimulatorI`

5. **Commit & Push**
   - "Commit changes" 버튼 클릭
   - Commit message: "Add PlasmaSimulatorI code"

6. **자동 배포 확인**
   - GitHub → Actions 탭에서 배포 진행 확인
   - 2-3분 후 https://plasma-simulator.web.app 에서 확인

---

## 📝 시뮬레이터 II 추가 방법

### **파일 위치:** `plasma-sim/src/PlasmaSimulatorII.jsx`

### **작업 순서:**

1. **GitHub에서 파일 열기**
   - `plasma-sim/src/PlasmaSimulatorII.jsx` 파일 클릭
   - "Edit this file" 클릭

2. **Placeholder 코드 전체 삭제**

3. **시뮬레이터 코드 붙여넣기**
   ```jsx
   import React, { useState, useEffect, useRef } from 'react';
   import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

   // 여기에 PlasmasimulatorII.js의 코드를 붙여넣기

   const PlasmaSimulatorII = () => {
     // ... 시뮬레이터 코드 ...
   };

   export default PlasmaSimulatorII;
   ```

4. **중요: 컴포넌트 이름 변경**
   - `const PlasmaSimulator = ()` → `const PlasmaSimulatorII = ()`
   - `export default PlasmaSimulator` → `export default PlasmaSimulatorII`

5. **Commit & Push**
   - "Commit changes" 버튼 클릭
   - Commit message: "Add PlasmaSimulatorII code"

6. **자동 배포 확인**
   - 2-3분 후 웹사이트에서 확인

---

## ⚠️ 주의사항

### **1. import 문 유지**
```jsx
// 이 줄들은 반드시 파일 맨 위에 있어야 합니다
import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
```

### **2. 컴포넌트 이름 정확히 변경**
- ❌ `const PlasmaSimulator = ()`
- ✅ `const PlasmaSimulatorI = ()` 또는 `const PlasmaSimulatorII = ()`

### **3. export 문 확인**
```jsx
// 파일 맨 아래
export default PlasmaSimulatorI;  // 시뮬레이터 I
export default PlasmaSimulatorII; // 시뮬레이터 II
```

### **4. .js → .jsx 파일**
- 원본 파일이 `.js`여도 걱정 마세요
- GitHub의 `.jsx` 파일에 코드를 복사하면 됩니다

---

## 🔍 배포 상태 확인

### **GitHub Actions에서 확인**
1. GitHub 저장소 → **Actions** 탭 클릭
2. 최근 workflow 실행 확인
3. ✅ 초록색 체크: 배포 성공
4. ❌ 빨간색 X: 배포 실패 (에러 확인)

### **웹사이트에서 확인**
- https://plasma-simulator.web.app
- 좌측 사이드바에서 시뮬레이터 I, II 클릭

---

## 🐛 문제 해결

### **배포가 실패하는 경우**

1. **빌드 에러 확인**
   - GitHub Actions 로그 확인
   - 에러 메시지 읽기

2. **자주 발생하는 에러**
   - 컴포넌트 이름 불일치
   - import 문 누락
   - JSX 문법 오류
   - export 문 누락

3. **해결 방법**
   - 파일을 다시 수정
   - Commit & Push
   - 자동으로 재배포됨

---

## 📊 파일 구조

```
plasma-sim/src/
  ├── App.jsx                    ← 메인 네비게이션 (수정 불필요)
  ├── PlasmaSimulatorI.jsx       ← 여기에 시뮬레이터 I 코드 추가
  ├── PlasmaSimulatorII.jsx      ← 여기에 시뮬레이터 II 코드 추가
  └── PlasmaSimulatorIII.jsx     ← 이미 완성됨 (수정 불필요)
```

---

## 🎯 요약

1. ✅ GitHub에서 파일 편집
2. ✅ 코드 복사 & 붙여넣기
3. ✅ 컴포넌트 이름 변경
4. ✅ Commit & Push
5. ✅ 2-3분 대기
6. ✅ 웹사이트에서 확인!

**로컬 개발 환경 필요 없음!**
GitHub 웹 인터페이스에서 모든 작업 가능합니다! 🎉
