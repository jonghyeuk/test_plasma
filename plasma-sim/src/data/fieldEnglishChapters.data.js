/* AUTO-GENERATED — 반도체 현장 실무영어 chapter content (deepened + fab-register enrich). Do not hand-edit. */
export const CONTENT_CHAPTERS = [
 {
  "id": "w1",
  "title": "오리엔테이션 · 기본 용어",
  "slides": [
   {
    "type": "story",
    "icon": "🏭",
    "title": "첫 출근 · 화면 앞에 서다",
    "text": "입사 첫날, 선배가 당신을 장비 앞으로 데려간다. 눈앞의 큰 화면(**HMI, Human-Machine Interface**)에는 온통 영어다. **CHAMBER A — IDLE**, **PRESS START TO BEGIN CYCLE**, 그리고 빨간 글씨로 **INTERLOCK ACTIVE**. 선배가 묻는다. \"지금 이 장비, 돌려도 되는 상태야?\" 신입에게 필요한 영어는 작문도, 유창한 회화도 아니다. 화면 한 줄, 매뉴얼 한 문장을 **정확히 읽어내는(read)** 힘이다. 이 읽는 힘은 현장에서 바로 쓰일 뿐 아니라, 나중에 **정비·설비 엔지니어**로 성장할수록 더 큰 무기가 된다. 오늘은 그 첫걸음으로, 장비와 화면 전반에 두루 쓰이는 기초 용어와 화면 읽는 법을 넓게 살펴본다.",
    "art": "hmi"
   },
   {
    "type": "scene",
    "title": "오늘의 현장 · 상황 설정",
    "where": "입사 첫날, 클린룸 안 — 처음 보는 장비 앞. 방진복을 입고 선배 뒤를 따라간다.",
    "tool": "장비 조작 화면(HMI)과 큰 모니터. 온통 영어다.",
    "situation": "선배가 화면을 가리키며 묻는다. \"이 장비, 지금 돌려도 되는 상태야?\"",
    "meet": [
     "상태어 IDLE / RUN",
     "경고문 DO NOT OPEN",
     "SP / PV 값",
     "버튼 RUN·ABORT"
    ],
    "goal": "화면 한 줄을 \"지금 무엇을 해도 되는가\"로 읽어내기.",
    "bg": "w1"
   },
   {
    "type": "read",
    "title": "왜 '현장 영어'인가 — 쓰기가 아니라 판단",
    "intro": "이 수업의 목표는 영어를 '작성'하는 것이 아니라, 이미 영어로 쓰인 정보를 정확히 '읽고 판단'하는 것이다.",
    "paras": [
     "반도체 장비의 대부분은 미국·일본·유럽 제조사가 만든다. 그래서 화면 글자, 버튼 이름, 경고문, **operating manual**이 모두 영어로 고정되어 있다. 한국어 번역본이 있어도, 실제 화면과 로그(log)는 영어 원문이 기준이다.",
     "현장에서 영어를 잘못 읽으면 곧바로 사고로 이어진다. **DO NOT OPEN**(열지 마시오)를 **DO OPEN**으로 착각하거나, **HIGH VACUUM**(고진공) 상태에서 문을 열면 장비 손상·안전사고가 난다. 즉 영어 읽기는 안전 그 자체다.",
     "우리가 연습할 문장은 대부분 **imperative(명령문)**·**short label(짧은 라벨)**·**warning note(경고문)** 형태다. 문학적 영어가 아니라, 짧고 반복되는 실무 영어이므로 패턴만 익히면 빠르게 강해진다.",
     "따라서 이 수업은 문법 시험이나 영작문이 아니다. '이 영어가 무슨 뜻인가', '지금 눌러도 되는가', '이 경고는 무엇을 금지하는가'를 판단하는 **reading & judging** 훈련이다."
    ],
    "figs": [
     {
      "kind": "sticker",
      "level": "danger",
      "en": "DO NOT OPEN — HIGH VACUUM",
      "ko": "열지 마시오 — 고진공 상태",
      "cap": "현장 경고문은 대부분 이런 명령문(imperative)."
     }
    ]
   },
   {
    "type": "read",
    "title": "영어는 어디에서 나타나는가 — 세 곳",
    "intro": "현장에서 영어를 만나는 통로는 크게 세 가지다. 각각 성격이 다르므로 읽는 방식도 다르다.",
    "paras": [
     "첫째, **HMI/GUI 화면**. 장비를 조작하는 터치스크린이다. 여기엔 **status(상태)**, **buttons(버튼)**, **alarms(경보)**가 짧은 영어 단어로 표시된다. 예: **RUN**, **IDLE**, **ABORT**, **PROCESSING…**. 한 단어의 뜻이 곧 장비의 현재 상태다.",
     "둘째, **operating manual / SOP(Standard Operating Procedure)**. 장비를 어떻게 켜고, 어떻게 웨이퍼를 넣고, 문제가 나면 어떻게 하는지 단계별로 적힌 문서다. 대부분 번호가 붙은 **step-by-step imperative** 문장이다.",
     "셋째, **work instruction(작업 지시문)**. 반장·엔지니어가 붙여 놓은 그날그날의 지시다. 예: **Run PM on Tool 3 before shift end.** 짧지만 '누가·무엇을·언제'가 압축되어 있어 정확한 해석이 중요하다.",
     "세 통로 모두 공통 어휘를 공유한다. 그래서 오늘 배우는 기초 용어 하나가 화면·매뉴얼·지시문 세 곳에서 동시에 통한다. 기초 용어를 넓게 깔아두는 것이 오늘의 목적이다."
    ],
    "figs": [
     {
      "kind": "buttons",
      "items": [
       [
        "RUN",
        "go"
       ],
       [
        "IDLE",
        "n"
       ],
       [
        "ABORT",
        "stop"
       ]
      ],
      "cap": "화면 하단 버튼 — 색과 단어를 함께 읽는다."
     },
     {
      "kind": "note",
      "title": "WORK INSTRUCTION",
      "en": "Confirm [IDLE] before loading the wafer.",
      "ko": "웨이퍼 넣기 전 IDLE 확인."
     }
    ]
   },
   {
    "type": "read",
    "title": "HMI 화면의 구조 읽기",
    "intro": "낯선 장비 화면도 구조는 비슷하다. 어디에 무엇이 있는지 '틀'을 알면 처음 보는 화면도 읽을 수 있다.",
    "paras": [
     "화면 상단(top bar)에는 보통 **tool ID**와 **current status**가 있다. 예: **TOOL EQP-204 | STATUS: IDLE**. 여기만 봐도 '이 장비가 지금 놀고 있는지, 돌고 있는지'를 안다.",
     "가운데(main view)에는 장비 내부를 본뜬 그림, 즉 **schematic/diagram**이 있다. **chamber**, **valve**, **pump** 같은 부품이 그림으로 표시되고, 각 부품 옆에 실시간 숫자(온도·압력)가 뜬다.",
     "숫자에는 두 가지가 있다. **setpoint(목표값)**과 **actual/PV(현재값, Process Value)**. 예: **Temp SP 250°C / PV 248°C**. 둘의 차이를 읽으면 장비가 목표에 도달했는지 판단할 수 있다.",
     "하단(bottom/footer)에는 조작 버튼과 **alarm banner(경보 띠)**가 있다. 색이 중요하다. 보통 **green=normal**, **yellow=warning**, **red=alarm/fault**. 색과 영어 라벨을 함께 읽는 습관이 필요하다.",
     "정리하면 '상단=무엇/무슨 상태, 가운데=어디가 어떤 값, 하단=무엇을 눌러 무엇을 막는가'. 이 세 질문으로 어떤 화면이든 스캔하라."
    ],
    "figs": [
     {
      "kind": "note",
      "title": "COLOR CODE",
      "en": "Green = normal · Yellow = warning · Red = alarm.",
      "ko": "초록=정상, 노랑=주의, 빨강=경보."
     },
     {
      "kind": "meter",
      "name": "Chamber Pressure",
      "sp": "5.0",
      "pv": "5.0",
      "unit": "Torr",
      "state": "ok",
      "note": "SP(목표)와 PV(현재)가 같으면 안정."
     }
    ]
   },
   {
    "type": "read",
    "title": "숫자 · 단위 · 상태 표시 읽기",
    "intro": "현장 영어의 절반은 단어가 아니라 '숫자와 단위'다. 단위를 오독하면 판단 전체가 틀어진다.",
    "paras": [
     "온도는 **°C**, 압력은 **Torr / mTorr / Pa**, 유량(가스량)은 **sccm(standard cubic centimeter per minute)**, 전력은 **W(watt)**, 고주파는 **MHz**로 표시된다. 단위를 먼저 확인한 뒤 숫자를 읽어야 한다.",
     "진공 상태는 숫자로도, 라벨로도 나온다. **ATM(대기압)**, **rough vacuum**, **high vacuum**. 예: **1.0E-6 Torr** 같은 지수 표기는 '10의 마이너스 6승 Torr = 아주 높은 진공'을 뜻한다.",
     "상태 라벨은 대개 대문자 한 단어다. **IDLE(대기)**, **RUN/PROCESSING(진행중)**, **DONE/COMPLETE(완료)**, **ABORT(중단)**, **FAULT/ERROR(고장)**. 이 단어만으로 '지금 개입해도 되는가'를 판단한다.",
     "타이밍 표현도 자주 나온다. **elapsed time(경과 시간)**, **remaining(남은 시간)**, **cycle time(1회 처리 시간)**. 예: **REMAINING 00:45** = 45초 남음.",
     "숫자 색·깜빡임도 정보다. 값이 **out of range(범위 이탈)**면 빨간색으로 바뀌거나 깜빡인다. 숫자+단위+색을 한 세트로 읽는 것이 프로의 습관이다."
    ]
   },
   {
    "type": "read",
    "title": "현장 영어의 진짜 문체 — 완전문장이 아니다",
    "intro": "교과서 영어와 현장 영어는 '문체(register)'가 다르다. 현장은 짧고 딱딱하다. 이 문체에 익숙해지는 것이 핵심이다.",
    "paras": [
     "화면 버튼·명령은 **한 단어 동사**다. 완전한 문장이 아니라 **Pump / Vent / Purge / Abort / Accept / Reset** 처럼 딱 떨어진다. '가스를 배출하시겠습니까?'가 아니라 그냥 **Purge**.",
     "알람은 문장이 아니라 **상태 조각(status fragment)**으로 뜬다. \"The pressure is not correct\"가 아니라 **Pressure out of spec**, \"There is a problem with the interlock\"가 아니라 **Interlock not satisfied**.",
     "숫자는 항상 **단위와 붙어서** 나온다. **0.1 Torr**, **50 sccm**, **13.56 MHz**, **1500 W**. 값만 읽지 말고 단위까지 한 세트로 읽어야 판단이 된다.",
     "기록(로그)은 **주어를 생략한 과거형**이다. \"I found a leak and I replaced the o-ring\"가 아니라 **Found leak, replaced O-ring, tool back up**. 짧게 끊어 읽는 연습이 필요하다.",
     "정리: 현장 영어 = **짧은 명령형 + 상태 조각 + 숫자·단위 + 끊어진 과거형 로그**. 예쁜 완전문장을 기대하지 말 것. 이 딱딱함 자체가 현장의 표준이다."
    ]
   },
   {
    "type": "read",
    "title": "영어 작업 지시문(imperative) 문장 구조",
    "intro": "매뉴얼과 지시문의 문장은 거의 다 명령문이다. 명령문의 뼈대를 알면 빠르고 정확하게 읽힌다.",
    "paras": [
     "명령문은 주어(you)를 생략하고 **동사로 시작**한다. 예: **Press START.**, **Close the door.**, **Check the pressure.** 첫 단어(동사)가 '무엇을 하라'는 지시의 핵심이다.",
     "금지·경고는 **DO NOT / NEVER / DO NOT ...**로 시작한다. 예: **Do not open the chamber during processing.** 'Do not' 뒤의 동사를 반드시 확인하라 — 그것이 하면 안 되는 행동이다.",
     "조건은 **If / When / Before / After / Until**로 붙는다. 예: **Before opening, vent the chamber to ATM.** '먼저 무엇을 한 뒤에' 라는 순서를 이 접속사가 알려준다.",
     "주의 등급은 단어로 구분된다. **NOTE(참고)** < **CAUTION(주의, 경미한 손상)** < **WARNING(경고, 부상 위험)** < **DANGER(위험, 즉각적 위험)**. 등급 단어를 먼저 보고 긴장도를 조절하라.",
     "지시문엔 대상이 짧게 온다. 예: **Run PM on Tool 3.** = 'Tool 3에 대해 PM(예방정비)을 실시하라'. '동사 + 대상 + 조건'의 3조각으로 끊어 읽는 연습을 하자."
    ]
   },
   {
    "type": "acr",
    "title": "약어",
    "intro": "현장 영어는 약어 천지다. 오늘은 화면·매뉴얼·지시문에서 가장 자주 마주치는 기본 약어를 넓게 익힌다.",
    "items": [
     {
      "ab": "HMI",
      "full": "Human-Machine Interface",
      "ko": "사람이 장비를 조작하는 화면/조작부. GUI라고도 부른다."
     },
     {
      "ab": "SOP",
      "full": "Standard Operating Procedure",
      "ko": "표준 작업 절차서. 단계별 지시가 적힌 문서."
     },
     {
      "ab": "FOUP",
      "full": "Front Opening Unified Pod",
      "ko": "웨이퍼를 담아 옮기는 밀폐 용기(카세트)."
     },
     {
      "ab": "PM",
      "full": "Preventive Maintenance",
      "ko": "예방 정비. 고장 전에 주기적으로 하는 점검·청소."
     },
     {
      "ab": "RF",
      "full": "Radio Frequency",
      "ko": "고주파. 플라즈마를 만드는 데 쓰는 전력."
     },
     {
      "ab": "ESD",
      "full": "Electrostatic Discharge",
      "ko": "정전기 방전. 웨이퍼·소자를 망가뜨리는 위험 요소."
     },
     {
      "ab": "EMO",
      "full": "Emergency Off",
      "ko": "비상 정지. 누르면 장비 전원을 즉시 차단하는 버튼."
     },
     {
      "ab": "PV",
      "full": "Process Value",
      "ko": "현재 측정값(실제값). 목표값(setpoint)과 짝을 이룬다."
     }
    ]
   },
   {
    "type": "glossary",
    "title": "기초 용어 (1) 장비 · 구성",
    "intro": "장비의 '몸'을 이루는 부품·구성 용어. 화면 그림(schematic)과 매뉴얼에 그림·라벨로 계속 등장한다.",
    "items": [
     {
      "en": "Tool",
      "ko": "장비",
      "d": "반도체 공정을 수행하는 한 대의 설비 전체를 부르는 현장 표현.",
      "ex": "Tool EQP-204 is down for PM."
     },
     {
      "en": "Chamber",
      "ko": "챔버(반응실)",
      "d": "웨이퍼가 실제로 공정 처리되는 밀폐된 내부 공간.",
      "ex": "Load the wafer into the chamber and close the door."
     },
     {
      "en": "Module",
      "ko": "모듈",
      "d": "장비를 이루는 기능 단위(예: 이송 모듈, 공정 모듈).",
      "ex": "The transfer module moves wafers between chambers."
     },
     {
      "en": "Load Port",
      "ko": "로드 포트",
      "d": "FOUP(웨이퍼 용기)를 장비에 올려놓는 자리.",
      "ex": "Place the FOUP on Load Port 1 until it clicks."
     },
     {
      "en": "Wafer",
      "ko": "웨이퍼",
      "d": "반도체 소자를 만드는 얇고 둥근 실리콘 판.",
      "ex": "Do not touch the wafer surface with bare hands."
     }
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — 화면(HMI) 읽기",
    "doc": {
     "name": "EQP-204 Operating Manual",
     "no": "OM-204",
     "sec": "2.1",
     "rev": "B",
     "page": "2-3"
    },
    "heading": "2.1  Reading the Main Screen (HMI)",
    "steps": [
     "Check the top bar for the Tool ID and current STATUS.",
     "Confirm the status reads [IDLE] before any operation.",
     {
      "t": "Read the alarm banner at the bottom of the screen.",
      "note": {
       "kind": "note",
       "en": "A red banner means the tool cannot start."
      }
     },
     "Compare each value: SP (setpoint) vs PV (process value)."
    ],
    "callout": {
     "kind": "warning",
     "en": "Do NOT press START while INTERLOCK ACTIVE is displayed."
    },
    "fig": "See Fig. 2-1: Main screen layout.",
    "gloss": [
     [
      "setpoint (SP)",
      "목표값"
     ],
     [
      "process value (PV)",
      "현재값"
     ],
     [
      "interlock",
      "안전 연동(잠금)"
     ],
     [
      "idle",
      "대기 상태"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (1)",
    "intro": "아래 영어 표시/문장의 '뜻'을 고르시오. (읽고 판단하기)",
    "questions": [
     {
      "prompt": "화면에 'Tool EQP-204 is down.' 이라고 떴다. 무슨 뜻인가?",
      "opts": [
       "장비가 아래층에 있다",
       "장비가 멈춰 있다(가동 불가/정지 상태)",
       "장비 가격이 내렸다"
      ],
      "ans": 1
     },
     {
      "prompt": "'Load the wafer into the chamber.' 에서 지시하는 동작은?",
      "opts": [
       "웨이퍼를 챔버 안에 넣어라",
       "챔버를 웨이퍼 위에 올려라",
       "웨이퍼를 챔버 밖으로 꺼내라"
      ],
      "ans": 0
     },
     {
      "prompt": "'Place the FOUP on Load Port 1.' 에서 FOUP은 무엇인가?",
      "opts": [
       "장비를 끄는 버튼",
       "웨이퍼를 담아 옮기는 밀폐 용기",
       "청소 도구"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "기초 용어 (2) 상태 · 제어 · HMI 버튼",
    "intro": "화면에서 '지금 무엇을 해도 되는가'를 판단하게 해주는 상태·제어 용어. HMI 버튼과 상태 라벨의 핵심이다.",
    "items": [
     {
      "en": "Idle",
      "ko": "대기(유휴)",
      "d": "장비가 켜져 있으나 아무 공정도 하지 않는 상태.",
      "ex": "The tool is idle and ready to start."
     },
     {
      "en": "Interlock",
      "ko": "인터록(안전 연동)",
      "d": "위험 조건이면 동작을 막는 안전 잠금. 걸려 있으면 시작이 안 된다.",
      "ex": "The door interlock is active; the tool will not start."
     },
     {
      "en": "Abort",
      "ko": "중단",
      "d": "진행 중인 공정을 즉시 멈추는 명령/버튼.",
      "ex": "Press ABORT to stop the current cycle immediately."
     },
     {
      "en": "Acknowledge",
      "ko": "확인(경보 수신 처리)",
      "d": "발생한 경보를 '봤다'고 처리해 표시를 정리하는 조작.",
      "ex": "Acknowledge the alarm before you continue."
     },
     {
      "en": "Recipe",
      "ko": "레시피(공정 조건 세트)",
      "d": "온도·압력·시간 등 공정 조건을 묶어 저장한 설정.",
      "ex": "Select the correct recipe before starting the run."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (2)",
    "intro": "화면/버튼의 영어를 읽고 올바른 판단을 고르시오.",
    "questions": [
     {
      "prompt": "'The door interlock is active; the tool will not start.' 상황을 옳게 판단한 것은?",
      "opts": [
       "문 안전 잠금이 걸려서 지금은 시작되지 않는다",
       "문이 자동으로 열린다",
       "인터록이 있어 더 빨리 시작된다"
      ],
      "ans": 0
     },
     {
      "prompt": "공정 도중 문제가 생겨 즉시 멈춰야 한다. 눌러야 할 버튼은?",
      "opts": [
       "IDLE",
       "ABORT",
       "RECIPE"
      ],
      "ans": 1
     },
     {
      "prompt": "'The tool is idle and ready to start.' 이 화면이 뜻하는 것은?",
      "opts": [
       "장비가 고장 났다",
       "장비가 대기 상태라 시작할 수 있다",
       "장비가 이미 돌고 있다"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "장비 상태어 — 현장 표준(SEMI E10)",
    "intro": "장비의 '지금 상태'는 대시보드·인계 로그에 표준 단어로 뜬다. IDLE/RUN 만으로는 부족하다.",
    "items": [
     {
      "en": "Productive",
      "ko": "생산 중",
      "d": "실제로 웨이퍼를 처리하며 돈을 버는 상태.",
      "ex": "The tool is productive and running lots."
     },
     {
      "en": "Standby",
      "ko": "대기",
      "d": "켜져 있고 정상이지만 지금은 일을 안 하는 상태.",
      "ex": "The tool is in standby, ready for the next lot."
     },
     {
      "en": "Engineering",
      "ko": "엔지니어링(시험) 모드",
      "d": "정상 생산이 아니라 시험·평가 목적으로 쓰는 상태.",
      "ex": "Chamber B is in engineering mode for a test run."
     },
     {
      "en": "Scheduled Down",
      "ko": "계획 정지",
      "d": "예방 정비(PM)처럼 미리 잡아둔 정지.",
      "ex": "The tool is scheduled down for PM this morning."
     },
     {
      "en": "Unscheduled Down",
      "ko": "비계획 정지",
      "d": "고장·이상으로 갑자기 멈춘 정지.",
      "ex": "Etcher 3 is unscheduled down after an RF fault."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 — 장비 상태어",
    "intro": "대시보드/인계 로그의 상태 단어를 읽고 판단하시오.",
    "questions": [
     {
      "prompt": "인계 로그에 'Tool scheduled down for PM.' 무슨 뜻인가?",
      "opts": [
       "예방 정비를 위해 미리 잡아둔 정지 상태",
       "고장으로 갑자기 멈춤",
       "정상 생산 중"
      ],
      "ans": 0
     },
     {
      "prompt": "'Unscheduled down' 과 'Scheduled down' 의 차이는?",
      "opts": [
       "둘 다 같은 뜻",
       "Unscheduled=고장 등 갑작스런 정지, Scheduled=미리 계획된 정지",
       "Unscheduled가 더 안전한 상태"
      ],
      "ans": 1
     },
     {
      "prompt": "'The tool is in standby.' 가 뜻하는 것은?",
      "opts": [
       "장비가 고장났다",
       "켜져 있고 정상이지만 지금은 일하지 않는 대기 상태",
       "웨이퍼를 처리하는 중"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "기초 용어 (3) 공정 · 계측 · 안전",
    "intro": "공정 조건과 진공·가스, 안전을 다루는 용어. 숫자·단위와 함께 화면에 뜨는 값들의 이름이다.",
    "items": [
     {
      "en": "Setpoint",
      "ko": "설정값(목표값)",
      "d": "장비가 도달하려는 목표 수치(온도·압력 등).",
      "ex": "The temperature setpoint is 250°C."
     },
     {
      "en": "Flow Rate",
      "ko": "유량",
      "d": "가스가 흐르는 양. 보통 sccm 단위로 표시.",
      "ex": "Set the gas flow rate to 100 sccm."
     },
     {
      "en": "Pressure",
      "ko": "압력",
      "d": "챔버 내부의 압력. Torr/mTorr/Pa 단위로 표시.",
      "ex": "Check that the chamber pressure is below 5 mTorr."
     },
     {
      "en": "Vent",
      "ko": "벤트(대기압 복귀)",
      "d": "진공 챔버에 기체를 넣어 대기압으로 되돌리는 것. 문 열기 전 필수.",
      "ex": "Vent the chamber to ATM before opening the door."
     },
     {
      "en": "Purge",
      "ko": "퍼지(치환/불어내기)",
      "d": "불활성 가스로 내부의 잔류 가스를 밀어내는 것.",
      "ex": "Purge the line with N2 for 30 seconds."
     }
    ],
    "figs": [
     {
      "kind": "meter",
      "name": "Chamber Temp",
      "sp": "250",
      "pv": "248",
      "unit": "°C",
      "state": "ok"
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (3)",
    "intro": "매뉴얼 문장을 읽고 뜻/순서를 판단하시오.",
    "questions": [
     {
      "prompt": "'Vent the chamber to ATM before opening the door.' 올바른 순서는?",
      "opts": [
       "문을 먼저 열고 벤트한다",
       "벤트로 대기압을 만든 뒤 문을 연다",
       "문을 열 필요가 없다"
      ],
      "ans": 1
     },
     {
      "prompt": "'The temperature setpoint is 250°C.' 에서 250°C는 무엇인가?",
      "opts": [
       "현재 측정된 실제 온도",
       "장비가 도달하려는 목표 온도",
       "최대 허용 압력"
      ],
      "ans": 1
     },
     {
      "prompt": "'Check that the chamber pressure is below 5 mTorr.' 는 무엇을 확인하라는 것인가?",
      "opts": [
       "챔버 압력이 5 mTorr보다 낮은지 확인",
       "챔버 온도가 5도인지 확인",
       "가스 유량이 5 sccm인지 확인"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "manual",
    "mtitle": "OPERATING PROCEDURE — WAFER LOADING",
    "paras": [
     "1. Verify that the tool status shows IDLE before you begin.",
     "1. 시작 전에 장비 상태가 IDLE(대기)로 표시되는지 확인하라. — 다른 상태면 아직 개입하면 안 된다.",
     "2. Place the FOUP on the load port and wait for the clamp to lock.",
     "2. FOUP을 로드 포트에 올리고 클램프가 잠길 때까지 기다려라. — '기다려라'가 지시의 핵심.",
     "3. On the HMI, select the correct recipe for this lot.",
     "3. HMI에서 이 로트(lot)에 맞는 올바른 recipe를 선택하라. — 잘못된 레시피 선택은 공정 불량으로 직결된다.",
     "4. Press START. The status will change to PROCESSING.",
     "4. START를 눌러라. 상태가 PROCESSING(진행중)으로 바뀐다. — 상태 변화로 정상 시작을 확인.",
     "5. Do not open the chamber door while the tool is PROCESSING.",
     "5. 장비가 PROCESSING인 동안에는 챔버 문을 열지 마라. — 'Do not open'은 절대 금지."
    ]
   },
   {
    "type": "manual",
    "mtitle": "SAFETY — WARNINGS & CAUTIONS",
    "paras": [
     "WARNING: High voltage present. Do not remove the RF cover during operation.",
     "경고: 고전압이 흐른다. 가동 중에는 RF 커버를 제거하지 마라. — WARNING은 '부상 위험' 등급.",
     "CAUTION: Wear ESD wrist strap before handling any wafer.",
     "주의: 웨이퍼를 다루기 전 ESD(정전기) 손목 밴드를 착용하라. — 정전기가 소자를 파괴한다.",
     "DANGER: In an emergency, press the EMO button to cut all power immediately.",
     "위험: 비상시 EMO 버튼을 눌러 모든 전원을 즉시 차단하라. — DANGER는 최고 등급, 즉각 조치.",
     "NOTE: If the chamber is under high vacuum, vent to ATM before opening.",
     "참고: 챔버가 고진공 상태면 열기 전에 대기압(ATM)으로 벤트하라. — 순서를 지키지 않으면 장비 손상."
    ]
   },
   {
    "type": "manual",
    "mtitle": "HMI SCREEN GUIDE — STATUS & ALARMS",
    "paras": [
     "The top bar shows the Tool ID and the current status (IDLE, RUN, or FAULT).",
     "상단 바에는 Tool ID와 현재 상태(IDLE, RUN, FAULT)가 표시된다. — 화면을 볼 때 여기부터 읽어라.",
     "A green banner means normal. A red banner means an active alarm.",
     "초록색 띠는 정상, 빨간색 띠는 활성 경보를 뜻한다. — 색이 곧 1차 신호다.",
     "When an alarm appears, read the alarm text and press ACK to acknowledge it.",
     "경보가 뜨면 경보 문구를 읽고 ACK를 눌러 확인 처리하라. — 원인 파악이 먼저, 그다음 ACK.",
     "If PV differs greatly from the setpoint, notify the process engineer.",
     "현재값(PV)이 설정값(setpoint)과 크게 다르면 공정 엔지니어에게 알려라. — 임의 조작 금지, 보고가 원칙."
    ],
    "figs": [
     {
      "kind": "hmi",
      "tool": "TOOL EQP-204",
      "status": "IDLE",
      "state": "idle",
      "rows": [
       [
        "CHAMBER A",
        "READY"
       ],
       [
        "Temp",
        "SP 250 / PV 248°C",
        "ok"
       ],
       [
        "Pressure",
        "5.0 Torr"
       ]
      ],
      "banner": {
       "level": "danger",
       "en": "INTERLOCK ACTIVE",
       "ko": "인터락 작동 — 지금은 시작 불가"
      },
      "cap": "HMI 화면: 상단=장비ID·상태, 가운데=값, 아래=경보 띠."
     }
    ]
   },
   {
    "type": "sim",
    "which": "partDiagram",
    "mode": "tool",
    "intro": "아래는 장비의 주요 부품이 영어 라벨과 함께 표시된 부품 도해(part diagram)다. 각 부품을 눌러 영어 이름과 뜻을 확인해 보자. chamber, load port, module, valve, pump 같은 오늘 배운 용어가 화면 그림에서 실제로 어디를 가리키는지 눈으로 익히는 것이 목표다. '이 라벨이 장비의 어느 부분인가'를 스스로 짚어 보라."
   },
   {
    "type": "sim",
    "which": "chamber",
    "mode": "chamberHmi",
    "intro": "아래는 챔버(chamber) 내부 상태를 보여주는 모의 HMI 화면이다. status 라벨(IDLE/PROCESSING), pressure와 temperature의 setpoint·PV, 그리고 alarm 색을 직접 바꿔 보며 '지금 문을 열어도 되는가', '지금 시작해도 되는가'를 판단해 보자. 진공 상태에서 vent 없이 문을 열면 어떤 경고가 뜨는지도 확인해 보라."
   },
   {
    "type": "comm",
    "items": [
     {
      "sit": "외국인 엔지니어가 장비 상태를 물어본다",
      "q": {
       "en": "Is Tool EQP-204 idle right now? I need to run a test.",
       "ko": "지금 EQP-204 장비 대기 상태인가요? 테스트를 돌려야 해서요."
      },
      "a": {
       "en": "Yes, it shows IDLE on the HMI. It's ready to start.",
       "ko": "네, HMI에 IDLE로 떠 있어요. 시작할 수 있는 상태입니다."
      }
     },
     {
      "sit": "빨간 경보가 떠 있다",
      "q": {
       "en": "There's a red alarm banner. What does it say?",
       "ko": "빨간 경보 띠가 떠 있네요. 뭐라고 적혀 있나요?"
      },
      "a": {
       "en": "It says 'DOOR INTERLOCK ACTIVE.' The door isn't fully closed, so it won't start.",
       "ko": "'DOOR INTERLOCK ACTIVE'라고 되어 있어요. 문이 완전히 안 닫혀서 시작이 안 됩니다."
      }
     },
     {
      "sit": "챔버 문을 열려고 한다",
      "q": {
       "en": "Can I open the chamber now to check the wafer?",
       "ko": "지금 챔버를 열어서 웨이퍼를 확인해도 될까요?"
      },
      "a": {
       "en": "Not yet. The chamber is under vacuum. We have to vent it to ATM first.",
       "ko": "아직 안 돼요. 챔버가 진공 상태예요. 먼저 대기압으로 벤트해야 합니다."
      }
     }
    ]
   },
   {
    "type": "wrap",
    "title": "오늘의 정리",
    "points": [
     "현장 영어의 목표는 작문이 아니라 **읽고 판단하기(read & judge)** — 안전과 직결된다.",
     "영어는 **HMI 화면**, **operating manual/SOP**, **work instruction** 세 곳에서 공통 어휘로 나타난다.",
     "화면은 '상단=상태, 가운데=부품/값(setpoint vs PV), 하단=버튼/경보 색'의 틀로 읽는다.",
     "상태 라벨(**IDLE/RUN/ABORT/FAULT**)과 경고 등급(**NOTE<CAUTION<WARNING<DANGER**)만 알아도 판단력이 생긴다.",
     "명령문은 **동사로 시작**, 금지는 **Do not**, 순서는 **before/after/until** 로 읽는다.",
     "핵심 기초 용어 15개(Tool·Chamber·Interlock·Setpoint·Vent 등)와 약어(HMI·FOUP·PM·RF·ESD·EMO)를 확보했다."
    ],
    "done": "1주차 완료! 이제 낯선 영어 화면을 봐도 **'지금 무엇을, 왜, 눌러도 되는가'**를 스스로 묻고 읽어낼 첫 도구를 갖췄습니다. 다음 주부터 장비별로 더 깊이 들어갑니다."
   }
  ]
 },
 {
  "id": "w2",
  "title": "장비 구성요소",
  "slides": [
   {
    "type": "story",
    "icon": "🏭",
    "title": "새 장비 앞에 선 첫날",
    "text": "당신은 오늘 처음으로 식각(**etch**) 장비 앞에 배정되었습니다. 선배 엔지니어가 장비 문을 열자 은색 원통, 굵은 파이프, 반짝이는 밸브들이 눈에 들어옵니다. 선배는 손으로 각 부분을 가리키며 영어로 말합니다. \"This is the **chamber**, and below it is the **turbo pump**. Watch the **gate valve** — never open it under atmosphere.\" 화면(**HMI**)에는 **Chamber Pressure**, **Pump Speed**, **MFC Flow**, **RF Power** 같은 영어 단어가 실시간으로 바뀝니다. 한국어 설명서는 어디에도 없습니다. 모든 부품 이름, 모든 경고문, 모든 버튼이 영어입니다. 부품 이름을 영어로 읽고 그 역할을 이해하는 순간, 당신은 비로소 이 장비를 '다룰' 수 있게 됩니다. 오늘 우리는 식각·증착 장비의 핵심 구성요소 7가지 — **Chamber**, **Pump**, **Gate Valve**, **Gas Line**, **MFC**, **RF Generator**, **Wafer Chuck** — 를 영어 이름과 역할, 그리고 매뉴얼·화면에서의 표기법으로 배웁니다.",
    "art": "parts"
   },
   {
    "type": "scene",
    "title": "오늘의 현장 · 상황 설정",
    "where": "장비 뒤편, 커버를 열어 둔 정비 구역.",
    "tool": "챔버·펌프·밸브·MFC·RF 제너레이터 — 장비를 이루는 부품들.",
    "situation": "선배가 부품을 하나씩 가리키며 영어 이름과 명판(nameplate)을 읽어 준다.",
    "meet": [
     "부품 명판 TURBO PUMP",
     "상태 라벨 ON / OPEN",
     "경고 HOT SURFACE",
     "MFC · 유량 sccm"
    ],
    "goal": "장비 구성요소의 영어 이름과 그 역할을 연결하기.",
    "bg": "w2"
   },
   {
    "type": "read",
    "title": "왜 진공이 필요한가: Chamber의 존재 이유",
    "intro": "식각·증착 공정은 대부분 진공(**vacuum**) 상태의 밀폐 공간 안에서 일어납니다. 그 공간이 바로 **chamber**입니다.",
    "paras": [
     "**Chamber(챔버, 반응실)**는 웨이퍼가 실제로 공정을 받는 밀폐 금속 용기입니다. 매뉴얼에서는 흔히 **process chamber** 또는 **reaction chamber**라고 표기하며, 웨이퍼를 넣고 빼는 옆방을 **load lock chamber**라고 부릅니다.",
     "왜 진공인가? 공기 중의 산소·수분·먼지 분자가 웨이퍼 표면에 붙으면 반응이 오염됩니다. 그래서 챔버를 **base pressure(기저 압력)** 수준까지 비운 뒤 공정 가스만 정확히 넣습니다. 화면에서 **Chamber Pressure**가 **1.0E-6 Torr**처럼 지수 표기로 보이면 '매우 낮은 압력 = 좋은 진공'이라는 뜻입니다.",
     "챔버 벽은 보통 알루미늄(**aluminum**)에 특수 코팅을 하며, 플라즈마에 노출되는 소모성 부품을 **chamber liner** 또는 **consumable parts**라고 합니다. 매뉴얼의 **PM(Preventive Maintenance)** 항목에서 자주 등장합니다.",
     "챔버 상태를 나타내는 영어 표기를 반드시 구분하세요: **Vented(대기압 노출됨)**, **Pumping(배기 중)**, **Base Pressure Reached(기저 압력 도달)**, **Process Ready(공정 준비 완료)**. 이 단어를 잘못 읽으면 대기압 상태에서 밸브를 여는 사고로 이어질 수 있습니다.",
     "챔버 벽 온도도 중요합니다. 화면의 **Wall Temp** 또는 **Chamber Temp**는 부산물(**by-product**)이 벽에 응축되지 않도록 일정하게 유지되어야 하며, 낮으면 **flaking(박리)** 파티클 문제가 생깁니다."
    ],
    "figs": [
     {
      "kind": "sticker",
      "level": "caution",
      "en": "VACUUM — KEEP DOOR CLOSED",
      "ko": "진공 — 도어 닫힘 유지"
     }
    ]
   },
   {
    "type": "read",
    "title": "배기계 (1): Turbo Pump와 Roughing Pump",
    "intro": "챔버를 진공으로 만드는 장치가 펌프(**pump**)입니다. 식각 장비는 보통 두 종류의 펌프를 직렬로 사용합니다.",
    "paras": [
     "**Roughing pump(러핑 펌프, 저진공 펌프)**는 대기압(760 Torr)에서 시작해 챔버를 대략 mTorr 수준까지 초벌로 비웁니다. 매뉴얼에서는 **dry pump** 또는 **backing pump**라는 이름으로도 나옵니다.",
     "**Turbo pump(터보 펌프, Turbomolecular pump)**는 러핑 펌프가 만든 진공을 이어받아 고진공(**high vacuum**)까지 끌어내립니다. 내부의 수만 rpm으로 도는 날개(**rotor blades**)가 가스 분자를 쳐내는 원리입니다. 화면의 **Turbo Speed 100% / 27,000 rpm**이 정상 회전 표시입니다.",
     "순서가 생명입니다. 터보 펌프는 반드시 러핑 펌프로 **foreline(배기 배관)** 쪽 압력을 충분히 낮춘 뒤에만 가속(**spin up**)해야 합니다. 대기압에서 터보를 돌리면 날개가 손상됩니다. 매뉴얼의 경고문 **Do NOT start the turbo pump against atmosphere**가 이 뜻입니다.",
     "펌프 상태 영어 표기: **Spinning Up(가속 중)**, **At Speed / Normal(정상 속도)**, **Spinning Down(감속 중)**, **Fault(고장)**. **Pump Fault** 알람이 뜨면 즉시 공정을 멈추고(**abort**) 보고해야 합니다.",
     "펌프에서 나온 배기 가스는 유해할 수 있어 **abatement / scrubber(배기가스 처리장치)**를 거쳐 처리됩니다. 매뉴얼에서 **exhaust** 관련 항목과 함께 자주 언급됩니다."
    ],
    "figs": [
     {
      "kind": "sticker",
      "level": "info",
      "en": "TURBO PUMP · TMP-803",
      "ko": "터보펌프 — 명판(nameplate)",
      "cap": "장비 곳곳의 명판·라벨도 영어다."
     }
    ]
   },
   {
    "type": "read",
    "title": "배기계 (2): Gate Valve와 Foreline",
    "intro": "펌프와 챔버 사이에는 진공을 지키는 관문, 게이트 밸브(**gate valve**)가 있습니다.",
    "paras": [
     "**Gate valve(게이트 밸브)**는 챔버와 터보 펌프 사이를 여닫는 큰 판형 밸브입니다. 열면(**Open**) 챔버가 펌프에 연결되어 배기되고, 닫으면(**Close/Closed**) 챔버가 펌프로부터 격리(**isolate**)됩니다.",
     "밸브 상태를 화면에서 정확히 읽어야 합니다: **Open**, **Closed**, **Opening/Closing(동작 중)**, **Interlocked(인터록으로 잠김)**. **Interlocked**는 안전 조건이 맞지 않아 밸브가 움직이지 않도록 소프트웨어가 막고 있다는 뜻입니다.",
     "**Throttle valve(스로틀 밸브)**는 게이트 밸브와 유사하지만 '얼마나' 여는지를 조절해 챔버 압력을 원하는 값으로 제어하는 밸브입니다. 화면에서 **Throttle Position 45%**처럼 백분율로 표시되며 **pressure control** 항목과 함께 나옵니다.",
     "**Foreline(포어라인)**은 터보 펌프 출구와 러핑 펌프를 잇는 배관입니다. 매뉴얼의 **Foreline Pressure** 값이 높으면 러핑 펌프 성능 저하나 배관 막힘을 의심합니다.",
     "핵심 안전 규칙: 챔버가 **Vented(대기압)** 상태일 때 게이트 밸브를 열면 대기가 터보 펌프로 밀려들어 파손됩니다. 그래서 대부분의 장비는 **interlock(인터록, 안전 연동)** 으로 이를 물리적·소프트웨어적으로 차단합니다."
    ],
    "figs": [
     {
      "kind": "note",
      "title": "CAUTION",
      "en": "Do not close the [gate valve] while pumping.",
      "ko": "배기 중 게이트밸브를 닫지 마시오."
     }
    ]
   },
   {
    "type": "read",
    "title": "가스 공급계: Gas Line과 MFC",
    "intro": "공정에 필요한 반응 가스는 정확한 유량으로 챔버에 들어가야 합니다. 그 통로가 가스 라인(**gas line**), 유량을 재는 장치가 **MFC**입니다.",
    "paras": [
     "**Gas line(가스 라인)**은 가스 실린더에서 챔버까지 이어지는 배관입니다. 여러 가스가 각각의 라인으로 오다가 챔버 직전에 합쳐지며, 매뉴얼에서는 각 라인을 **Gas 1, Gas 2** 또는 **Ar line, CF4 line**처럼 가스 이름으로 부릅니다.",
     "**MFC(Mass Flow Controller, 질량 유량 제어기)**는 각 가스가 초당 몇 sccm(**standard cubic centimeter per minute**) 흐르는지 정밀하게 제어합니다. 화면에서 **MFC1 Set 50 sccm / Actual 49.8 sccm**처럼 설정값(**Setpoint**)과 실제값(**Actual/Readback**)이 나란히 표시됩니다.",
     "설정값과 실제값의 차이가 크면 문제 신호입니다. **MFC not following setpoint**나 **Flow Alarm**은 라인 막힘, 가스 부족, MFC 고장을 의미할 수 있습니다.",
     "가스 라인을 열고 닫는 밸브를 **isolation valve** 또는 **pneumatic valve**라 하며, 화면에서 각 가스별로 **On/Off** 상태로 나타납니다. 공정 전후 라인에 남은 가스를 불활성 가스로 밀어내는 동작을 **purge(퍼지)**라고 합니다.",
     "**showerhead(샤워헤드)**는 챔버 상부에서 가스를 웨이퍼 위로 고르게 뿌려주는 다공성 전극판입니다. 증착·식각의 균일도(**uniformity**)를 좌우하는 핵심 부품으로 매뉴얼 PM 항목에 자주 등장합니다.",
     "안전상 독성·가연성 가스는 **toxic gas**, **flammable gas**로 표기되며, 관련 경고문에는 항상 **PPE(개인 보호구)** 착용과 **gas detector** 확인이 함께 나옵니다."
    ],
    "figs": [
     {
      "kind": "meter",
      "name": "Mass Flow (Ar)",
      "sp": "20",
      "pv": "20",
      "unit": "sccm",
      "state": "ok"
     }
    ]
   },
   {
    "type": "read",
    "title": "플라즈마와 웨이퍼: RF Generator와 Wafer Chuck",
    "intro": "식각·플라즈마 증착은 가스를 플라즈마(**plasma**) 상태로 만들어 반응시킵니다. 그 에너지원이 **RF generator**, 웨이퍼를 붙잡는 판이 **wafer chuck**입니다.",
    "paras": [
     "**RF generator(RF 발생기)**는 고주파(**Radio Frequency**, 흔히 13.56 MHz) 전력을 챔버 전극에 공급해 가스를 이온화(**ionize**)하여 플라즈마를 만듭니다. 화면의 **RF Power 500 W**, **Forward Power**, **Reflected Power**가 핵심 표시값입니다.",
     "**Forward power(전방 전력)**는 챔버로 보낸 전력, **Reflected power(반사 전력)**는 챔버가 받아들이지 못하고 되돌아온 전력입니다. 반사 전력이 높으면 에너지가 낭비되고 발생기가 손상될 수 있어, **matching network(매칭 네트워크, 정합기)**가 이를 최소화하도록 자동 조정합니다.",
     "화면에서 **Reflected Power < 5 W**면 정상, 값이 크게 튀면 **matching fault**나 플라즈마 불안정(**plasma unstable**)을 의심합니다.",
     "**Wafer chuck(웨이퍼 척, 웨이퍼 받침)**은 공정 중 웨이퍼를 고정하는 판입니다. 정전기 힘으로 붙잡는 것을 **ESC(Electrostatic Chuck, 정전 척)**라 하며, 화면에서 **Chuck Clamp On/Off**로 표시됩니다.",
     "웨이퍼는 플라즈마 때문에 뜨거워지므로 척 뒷면으로 헬륨을 흘려 온도를 식힙니다. 이를 **backside gas** 또는 **He backside cooling**이라 하며 **Backside Pressure / He Flow** 값으로 관리합니다.",
     "안전: 플라즈마 공정 중에는 고전압·고주파가 흐르므로 매뉴얼에 **RF ON**, **High Voltage** 경고와 함께 챔버 문을 열지 말라는 지시가 반드시 붙습니다."
    ],
    "figs": [
     {
      "kind": "sticker",
      "level": "danger",
      "en": "RF ON — HIGH VOLTAGE",
      "ko": "RF 작동 — 고전압"
     },
     {
      "kind": "meter",
      "name": "RF Power",
      "sp": "1500",
      "pv": "1490",
      "unit": "W",
      "state": "ok"
     }
    ]
   },
   {
    "type": "read",
    "title": "매뉴얼과 HMI 화면에서 부품 읽는 법",
    "intro": "같은 부품도 매뉴얼(문서)과 HMI(화면)에서 표기가 다를 수 있습니다. 현장에서 헷갈리지 않도록 표기 습관을 익힙니다.",
    "paras": [
     "부품 이름은 화면에서 **약어**로 줄어드는 경우가 많습니다. Mass Flow Controller → **MFC**, Electrostatic Chuck → **ESC**, Gate Valve → **GV**, Turbo Pump → **TMP** 또는 **Turbo**. 약어를 원래 이름과 연결해 기억해야 합니다.",
     "상태(status)는 보통 색과 영어 단어로 함께 표시됩니다. 초록 **Ready/Normal**, 노랑 **Warning**, 빨강 **Alarm/Fault/Error**. 단어를 못 읽으면 색만으로 판단하게 되어 위험합니다.",
     "값에는 항상 **단위(unit)**가 붙습니다. 압력은 **Torr / mTorr / Pa**, 유량은 **sccm / slm**, 전력은 **W(watt)**, 온도는 **degC**, 속도는 **rpm / %**. 숫자만 보지 말고 단위까지 함께 읽는 습관이 중요합니다.",
     "동작을 지시하는 버튼은 명령형 동사입니다: **Pump / Vent / Purge / Open / Close / Start / Abort / Reset**. 이들은 곧바로 장비를 움직이므로 뜻을 정확히 알아야 합니다.",
     "매뉴얼 문장은 대부분 명령문(**imperative**)으로 시작합니다. 'Verify...', 'Ensure...', 'Do not...', 'Confirm...'로 시작하는 문장은 '반드시 확인/금지'의 안전 지시라는 신호입니다.",
     "정리하면, 현장에서 부품을 다룬다는 것은 결국 '부품의 영어 이름 + 상태 단어 + 값과 단위 + 명령 동사'를 한눈에 읽어내는 능력입니다."
    ]
   },
   {
    "type": "acr",
    "title": "약어",
    "intro": "이번 장에서 반드시 알아야 할 장비 부품·화면 약어입니다. 원래 영어 이름과 함께 익히세요.",
    "items": [
     {
      "ab": "MFC",
      "full": "Mass Flow Controller",
      "ko": "질량 유량 제어기 — 가스 유량을 정밀 제어"
     },
     {
      "ab": "RF",
      "full": "Radio Frequency",
      "ko": "고주파 — 플라즈마 생성용 전력(보통 13.56 MHz)"
     },
     {
      "ab": "ESC",
      "full": "Electrostatic Chuck",
      "ko": "정전 척 — 정전기 힘으로 웨이퍼 고정"
     },
     {
      "ab": "GV",
      "full": "Gate Valve",
      "ko": "게이트 밸브 — 챔버와 펌프 사이를 여닫음"
     },
     {
      "ab": "TMP",
      "full": "Turbomolecular Pump",
      "ko": "터보 펌프 — 고진공 배기"
     },
     {
      "ab": "HMI",
      "full": "Human Machine Interface",
      "ko": "운전 화면 — 장비 상태 표시·조작 인터페이스"
     },
     {
      "ab": "PM",
      "full": "Preventive Maintenance",
      "ko": "예방 정비 — 소모성 부품 교체 등 정기 점검"
     },
     {
      "ab": "sccm",
      "full": "Standard Cubic Centimeter per Minute",
      "ko": "표준 유량 단위 — 분당 표준 세제곱센티미터"
     }
    ],
    "figs": [
     {
      "kind": "hmi",
      "tool": "VACUUM SYSTEM",
      "status": "RUN",
      "state": "run",
      "rows": [
       [
        "Turbo Pump",
        "ON"
       ],
       [
        "Gate Valve",
        "OPEN"
       ],
       [
        "MFC Ar",
        "20 sccm"
       ]
      ]
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (1): 챔버와 배기계",
    "intro": "챔버와 진공 배기 계통의 핵심 부품 영어 이름입니다. 예문을 소리 내어 읽어 보세요.",
    "items": [
     {
      "en": "chamber",
      "ko": "챔버, 반응실",
      "d": "웨이퍼가 공정을 받는 밀폐 진공 용기",
      "ex": "The process chamber must reach base pressure before starting the recipe."
     },
     {
      "en": "turbo pump",
      "ko": "터보 펌프",
      "d": "고속 회전 날개로 고진공을 만드는 펌프",
      "ex": "Wait until the turbo pump is at full speed before opening the gate valve."
     },
     {
      "en": "roughing pump",
      "ko": "러핑 펌프, 저진공 펌프",
      "d": "대기압에서 챔버를 초벌로 배기하는 펌프",
      "ex": "The roughing pump pulls the chamber down to the milliTorr range."
     },
     {
      "en": "gate valve",
      "ko": "게이트 밸브",
      "d": "챔버와 펌프 사이를 여닫아 진공을 격리하는 밸브",
      "ex": "Never open the gate valve while the chamber is vented."
     },
     {
      "en": "foreline",
      "ko": "포어라인, 배기 배관",
      "d": "터보 펌프 출구와 러핑 펌프를 잇는 배관",
      "ex": "A high foreline pressure may indicate a clogged exhaust line."
     }
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — 터보펌프 조립",
    "doc": {
     "name": "ETCH-2000 Assembly Manual",
     "no": "AM-2000",
     "sec": "3.1",
     "rev": "C",
     "page": "3-4"
    },
    "heading": "3.1  Installing the Turbo Pump",
    "steps": [
     "Verify the part number matches the BOM: [TMP-803].",
     {
      "t": "Mount the pump to the foreline flange.",
      "note": {
       "kind": "caution",
       "en": "Use a new copper gasket; do not reuse the old one."
      }
     },
     "Tighten the flange bolts to 15 N·m in a cross pattern.",
     {
      "t": "Connect the controller cable and the cooling water line.",
      "note": {
       "kind": "note",
       "en": "Match the connector labels: PUMP / CTRL."
      }
     },
     "Run the leak test before powering on (see 3.2)."
    ],
    "callout": {
     "kind": "warning",
     "en": "Do NOT power the pump before the leak test passes."
    },
    "fig": "See Fig. 3-1: Foreline flange assembly.",
    "gloss": [
     [
      "BOM",
      "부품표(Bill of Materials)"
     ],
     [
      "flange",
      "플랜지(연결부)"
     ],
     [
      "gasket",
      "개스킷(밀봉재)"
     ],
     [
      "leak test",
      "누설 검사"
     ]
    ]
   },
   {
    "type": "mansample",
    "variant": "parts",
    "title": "매뉴얼 표본 — 부품 리스트(BOM)",
    "doc": {
     "name": "ETCH-2000 · Spare Parts List",
     "no": "SP-2000",
     "rev": "C"
    },
    "heading": "Section 3 — Vacuum Assembly · Spare Parts",
    "cols": [
     "Item",
     "Part No.",
     "Description",
     "Qty",
     "Lead time"
    ],
    "rows": [
     [
      "1",
      "TMP-803",
      "Turbo pump, 800 L/s",
      "1",
      "6 wks"
     ],
     [
      "2",
      "GSK-40CU",
      "Copper gasket, CF40",
      "10",
      "in stock"
     ],
     [
      "3",
      "VLV-GT63",
      "Gate valve, DN63",
      "1",
      "8 wks"
     ],
     [
      "4",
      "MFC-100AR",
      "Mass flow controller, Ar 100 sccm",
      "2",
      "4 wks"
     ]
    ],
    "callout": {
     "kind": "note",
     "en": "\"Lead time\" = time from order to delivery. \"in stock\" ships now."
    },
    "gloss": [
     [
      "part no.",
      "부품 번호"
     ],
     [
      "qty",
      "수량 (quantity)"
     ],
     [
      "lead time",
      "납기"
     ],
     [
      "in stock",
      "재고 있음"
     ]
    ]
   },
   {
    "type": "mansample",
    "variant": "email",
    "title": "매뉴얼 표본 — 공급사에 견적 메일",
    "from": "j.kim@fab.example.com",
    "to": "sales@vac-supply.example.com",
    "subject": "RFQ — Turbo pump TMP-803 and CF40 gaskets",
    "sign": "Best regards,\nJ. Kim\nEquipment Assembly, Fab 2",
    "gloss": [
     [
      "RFQ",
      "견적 요청(Request for Quotation)"
     ],
     [
      "quotation",
      "견적"
     ],
     [
      "unit price",
      "단가"
     ],
     [
      "datasheet",
      "규격서"
     ]
    ],
    "lines": [
     "Dear Sales Team,",
     "We are assembling an ETCH-2000 tool and need a [quotation] for the following parts:",
     "· TMP-803 turbo pump — qty 1",
     "· GSK-40CU copper gasket (CF40) — qty 10",
     "Could you please confirm the [unit price], [lead time], and whether the pump is [in stock]?",
     "We would also appreciate the [datasheet] for the TMP-803."
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (1)",
    "intro": "다음 영어 표현의 의미를 고르세요.",
    "questions": [
     {
      "prompt": "화면에 'Chamber Pressure: Base Pressure Reached'가 떴습니다. 무슨 뜻일까요?",
      "opts": [
       "챔버가 기저 압력(충분한 진공)에 도달했다",
       "챔버 압력이 너무 높아 경고 상태다",
       "챔버 문이 열려 대기압이다"
      ],
      "ans": 0
     },
     {
      "prompt": "매뉴얼 문장 'Never open the gate valve while the chamber is vented.'가 금지하는 상황은?",
      "opts": [
       "챔버가 진공일 때 밸브를 여는 것",
       "챔버가 대기압일 때 게이트 밸브를 여는 것",
       "펌프가 정상 속도일 때 밸브를 여는 것"
      ],
      "ans": 1
     },
     {
      "prompt": "'The turbo pump is spinning up.'의 의미는?",
      "opts": [
       "터보 펌프가 고장났다",
       "터보 펌프가 정지했다",
       "터보 펌프가 가속(회전 상승) 중이다"
      ],
      "ans": 2
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (2): 가스 공급과 플라즈마",
    "intro": "가스 공급계와 RF 관련 부품 용어입니다. 값·단위 표현에도 주목하세요.",
    "items": [
     {
      "en": "gas line",
      "ko": "가스 라인",
      "d": "가스 실린더에서 챔버까지 이어지는 배관",
      "ex": "Purge the gas line with argon before switching process gases."
     },
     {
      "en": "MFC (Mass Flow Controller)",
      "ko": "질량 유량 제어기",
      "d": "가스 유량을 sccm 단위로 정밀 제어하는 장치",
      "ex": "MFC1 is set to 50 sccm but the actual flow reads 30 sccm."
     },
     {
      "en": "RF generator",
      "ko": "RF 발생기",
      "d": "고주파 전력을 공급해 플라즈마를 생성하는 장치",
      "ex": "The RF generator output is set to 500 watts of forward power."
     },
     {
      "en": "matching network",
      "ko": "매칭 네트워크, 정합기",
      "d": "반사 전력을 최소화하도록 임피던스를 맞추는 회로",
      "ex": "The matching network automatically tunes to keep reflected power low."
     },
     {
      "en": "showerhead",
      "ko": "샤워헤드",
      "d": "가스를 웨이퍼 위로 고르게 분사하는 다공성 전극판",
      "ex": "Inspect the showerhead for clogged holes during preventive maintenance."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (2)",
    "intro": "다음 화면·매뉴얼 표현의 의미를 고르세요.",
    "questions": [
     {
      "prompt": "화면에 'MFC1 Set 50 sccm / Actual 30 sccm'가 보입니다. 무엇을 의심해야 할까요?",
      "opts": [
       "설정값과 실제 유량이 다르므로 라인 막힘·가스 부족 등 문제 가능",
       "완전히 정상이며 아무 조치도 필요 없다",
       "RF 전력이 너무 높다는 뜻이다"
      ],
      "ans": 0
     },
     {
      "prompt": "'Reflected Power' 값이 크게 높아졌습니다. 무슨 의미일까요?",
      "opts": [
       "챔버로 전력이 잘 전달되고 있다",
       "전력이 되돌아와 낭비·손상 위험이 있다(정합 이상 가능)",
       "가스 유량이 정상이라는 뜻이다"
      ],
      "ans": 1
     },
     {
      "prompt": "매뉴얼의 'Purge the gas line with argon.'에서 purge의 의미는?",
      "opts": [
       "가스 라인을 새 가스로 교체 설치하라",
       "불활성 가스로 라인 안의 잔류 가스를 밀어내라",
       "가스 라인을 완전히 막아라"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (3): 웨이퍼 척과 압력 제어",
    "intro": "웨이퍼 고정·냉각과 압력 제어 관련 용어입니다.",
    "items": [
     {
      "en": "wafer chuck",
      "ko": "웨이퍼 척",
      "d": "공정 중 웨이퍼를 고정하는 받침판",
      "ex": "Confirm the wafer chuck clamp is ON before igniting the plasma."
     },
     {
      "en": "electrostatic chuck (ESC)",
      "ko": "정전 척",
      "d": "정전기 힘으로 웨이퍼를 붙잡는 척",
      "ex": "The electrostatic chuck holds the wafer flat during the etch step."
     },
     {
      "en": "backside gas",
      "ko": "백사이드 가스(헬륨 냉각)",
      "d": "척 뒷면에 헬륨을 흘려 웨이퍼를 냉각하는 방식",
      "ex": "Backside gas pressure is low, which may cause wafer overheating."
     },
     {
      "en": "throttle valve",
      "ko": "스로틀 밸브",
      "d": "여는 정도를 조절해 챔버 압력을 제어하는 밸브",
      "ex": "The throttle valve moves to 45% to hold the chamber at 20 mTorr."
     },
     {
      "en": "interlock",
      "ko": "인터록, 안전 연동",
      "d": "안전 조건이 안 맞으면 동작을 막는 보호 기능",
      "ex": "The gate valve is interlocked because the chamber is still vented."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (3)",
    "intro": "다음 표현의 의미를 고르세요.",
    "questions": [
     {
      "prompt": "화면에 'Gate Valve: Interlocked'가 표시됩니다. 무슨 뜻일까요?",
      "opts": [
       "게이트 밸브가 완전히 열려 있다",
       "안전 조건 불충족으로 밸브 동작이 막혀 있다",
       "게이트 밸브가 고장나 교체가 필요하다"
      ],
      "ans": 1
     },
     {
      "prompt": "'Backside gas pressure is low.'라는 알람의 실질적 위험은?",
      "opts": [
       "웨이퍼 냉각이 부족해 과열될 수 있다",
       "챔버 진공이 너무 좋아진다",
       "RF 전력이 자동으로 올라간다"
      ],
      "ans": 0
     },
     {
      "prompt": "'Confirm the chuck clamp is ON before igniting the plasma.'가 지시하는 순서는?",
      "opts": [
       "플라즈마를 켠 뒤 척을 잡아라",
       "척으로 웨이퍼를 고정한 것을 확인한 뒤 플라즈마를 켜라",
       "척과 플라즈마는 순서가 상관없다"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "manual",
    "mtitle": "OPERATING PROCEDURE — CHAMBER PUMP-DOWN",
    "paras": [
     "1. Confirm the chamber door is fully closed and the seal is clean.",
     "1. 챔버 문이 완전히 닫혔는지, 실링면(seal)이 깨끗한지 확인한다.",
     "2. Verify the roughing pump is running and the foreline pressure is stable.",
     "2. 러핑 펌프가 작동 중이고 포어라인 압력이 안정적인지 확인한다.",
     "3. Press PUMP to begin evacuating the chamber to milliTorr range.",
     "3. PUMP 버튼을 눌러 챔버를 mTorr 수준까지 배기하기 시작한다.",
     "4. Do NOT start the turbo pump against atmosphere. Wait until the foreline pressure is below the crossover setpoint.",
     "4. 대기압 상태에서 터보 펌프를 가동하지 말 것. 포어라인 압력이 교차(crossover) 설정값 아래로 내려갈 때까지 기다린다.",
     "5. When the turbo pump reaches full speed, the gate valve may open automatically.",
     "5. 터보 펌프가 정상 속도에 도달하면 게이트 밸브가 자동으로 열릴 수 있다.",
     "6. Wait for the status to change to 'Base Pressure Reached' before loading the recipe.",
     "6. 상태가 'Base Pressure Reached'로 바뀐 뒤에 레시피를 불러온다."
    ]
   },
   {
    "type": "manual",
    "mtitle": "WORK INSTRUCTION — GAS LINE & MFC CHECK",
    "paras": [
     "Ensure all gas isolation valves are closed before opening the manual cylinder valve.",
     "실린더 수동 밸브를 열기 전에 모든 가스 차단(isolation) 밸브가 닫혀 있는지 확인한다.",
     "Set each MFC to its recipe setpoint and confirm the actual (readback) value matches within tolerance.",
     "각 MFC를 레시피 설정값으로 맞추고, 실제값(readback)이 허용 오차 내에서 일치하는지 확인한다.",
     "If the MFC does not follow its setpoint, check for a clogged line or an empty gas cylinder.",
     "MFC가 설정값을 따라가지 못하면 라인 막힘이나 가스 실린더 소진을 점검한다.",
     "After the process, purge the gas lines with the inert gas for the specified time.",
     "공정 종료 후 지정된 시간 동안 불활성 가스로 가스 라인을 퍼지한다."
    ]
   },
   {
    "type": "manual",
    "mtitle": "SAFETY NOTES — RF & VACUUM HAZARDS",
    "paras": [
     "WARNING: High voltage and RF energy are present when RF power is ON. Do not open the chamber lid.",
     "경고: RF 전원이 켜져 있을 때는 고전압과 RF 에너지가 존재한다. 챔버 뚜껑을 열지 말 것.",
     "CAUTION: Never open the gate valve while the chamber is vented. This can destroy the turbo pump.",
     "주의: 챔버가 대기압(vented)일 때 게이트 밸브를 열지 말 것. 터보 펌프가 파손될 수 있다.",
     "NOTE: Some process gases are toxic or flammable. Verify the gas detector is active and wear required PPE.",
     "참고: 일부 공정 가스는 독성·가연성이다. 가스 감지기가 작동 중인지 확인하고 필수 보호구(PPE)를 착용한다.",
     "If any Alarm or Fault appears, abort the process and notify the equipment engineer immediately.",
     "Alarm 또는 Fault가 뜨면 공정을 중단(abort)하고 즉시 장비 엔지니어에게 알린다."
    ]
   },
   {
    "type": "sim",
    "which": "partDiagram",
    "intro": "아래 부품 다이어그램에서 식각·증착 장비의 구성요소들이 어떻게 배치되는지 살펴보세요. Chamber, Turbo Pump, Gate Valve, Gas Line, MFC, RF Generator, Wafer Chuck의 영어 이름과 위치를 하나씩 클릭해 확인하고, 가스가 들어오는 경로(위쪽 showerhead)와 배기되는 경로(아래쪽 gate valve → turbo pump)의 방향을 머릿속으로 그려 보세요."
   },
   {
    "type": "sim",
    "which": "devicePanel",
    "mode": "parts",
    "intro": "아래는 실제 장비의 HMI 운전 화면을 본뜬 패널입니다. Chamber Pressure, Turbo Speed, MFC Set/Actual, RF Forward/Reflected Power, Chuck Clamp 같은 영어 표시값을 직접 읽어 보세요. 값과 단위(Torr, sccm, W, rpm, %)를 함께 확인하고, 초록 Normal · 노랑 Warning · 빨강 Alarm 상태 단어가 무엇을 뜻하는지 판단하는 연습을 하세요."
   },
   {
    "type": "sim",
    "which": "chamber",
    "mode": "pumpdown",
    "intro": "아래 챔버 시뮬레이션에서 pump-down 절차를 순서대로 따라해 보세요. 먼저 챔버가 Vented 상태임을 확인하고, PUMP를 눌러 배기하며 Chamber Pressure가 낮아지는 것을 관찰하세요. 터보 펌프가 At Speed가 된 뒤 Gate Valve가 열리고 'Base Pressure Reached'가 표시될 때까지 각 단계의 영어 상태 표기가 어떻게 바뀌는지 읽어 보세요. 대기압에서 게이트 밸브를 열면 왜 위험한지도 함께 떠올리세요."
   },
   {
    "type": "comm",
    "items": [
     {
      "sit": "외국인 엔지니어가 챔버 압력이 안 떨어진다며 도움을 요청한다.",
      "q": {
       "en": "The chamber pressure isn't going down. Can you check the roughing pump for me?",
       "ko": "챔버 압력이 안 떨어져요. 러핑 펌프 좀 확인해 줄래요?"
      },
      "a": {
       "en": "Sure. The roughing pump is running, but the foreline pressure looks high. There may be a leak or a clogged line.",
       "ko": "네. 러핑 펌프는 돌고 있는데 포어라인 압력이 높아 보여요. 누설이나 라인 막힘일 수 있어요."
      }
     },
     {
      "sit": "엔지니어가 게이트 밸브가 열리지 않는다고 말한다.",
      "q": {
       "en": "The gate valve won't open. The screen just says 'Interlocked.' What does that mean?",
       "ko": "게이트 밸브가 안 열려요. 화면에 그냥 'Interlocked'라고만 떠요. 무슨 뜻이죠?"
      },
      "a": {
       "en": "It means the safety condition isn't met. The chamber is still vented, so the interlock blocks the valve to protect the turbo pump.",
       "ko": "안전 조건이 안 맞는다는 뜻이에요. 챔버가 아직 대기압이라서, 터보 펌프를 보호하려고 인터록이 밸브를 막고 있어요."
      }
     },
     {
      "sit": "RF 전력의 반사 전력이 높아 엔지니어가 원인을 묻는다.",
      "q": {
       "en": "The reflected power keeps spiking. Do you know why?",
       "ko": "반사 전력이 계속 치솟아요. 이유를 알아요?"
      },
      "a": {
       "en": "The matching network may not be tuning well, or the plasma is unstable. Let's check the RF power and the matching status first.",
       "ko": "매칭 네트워크가 정합을 잘 못 잡거나 플라즈마가 불안정한 것 같아요. 먼저 RF 전력과 매칭 상태부터 확인해 봐요."
      }
     }
    ]
   },
   {
    "type": "wrap",
    "title": "정리 및 마무리",
    "points": [
     "식각·증착 장비의 7대 구성요소: **Chamber(반응실)**, **Turbo/Roughing Pump(펌프)**, **Gate Valve(게이트 밸브)**, **Gas Line(가스 라인)**, **MFC(질량 유량 제어기)**, **RF Generator(RF 발생기)**, **Wafer Chuck(웨이퍼 척)**.",
     "챔버는 진공이 있어야 청정 공정이 가능하며, 화면의 **Vented / Pumping / Base Pressure Reached** 상태 단어를 정확히 읽어야 한다.",
     "터보 펌프는 반드시 러핑 펌프로 초벌 배기한 뒤 가동하며, **대기압에서 게이트 밸브를 열면 절대 안 된다(interlock의 이유)**.",
     "가스는 **MFC**가 sccm 단위로 제어하고, **Setpoint와 Actual 값 차이**는 문제 신호다.",
     "**RF Forward/Reflected Power**와 **matching network**, 그리고 **wafer chuck·ESC·backside gas**의 역할을 이해했다.",
     "부품은 화면에서 **약어·상태 단어·값과 단위·명령 동사**로 나타나며, 이를 함께 읽는 것이 현장 실무의 핵심이다."
    ],
    "done": "수고했습니다. 이제 당신은 장비 앞에서 **부품의 영어 이름을 읽고 그 역할과 상태를 판단**할 수 있습니다. 다음 시간에는 이 부품들이 실제 공정 레시피 안에서 어떻게 움직이는지 배웁니다. **You can now read the machine — not just look at it.**"
   }
  ]
 },
 {
  "id": "w3",
  "title": "운전 절차",
  "slides": [
   {
    "type": "story",
    "icon": "🕹️",
    "title": "초록불이 켜지기 전에는 손대지 마라",
    "text": "야간 근무 첫날, 선배가 장비 앞에서 말한다. \"화면에 **READY** 초록불 뜨기 전에는 절대 **START** 누르지 마.\" 신입은 웨이퍼 카세트를 **load port**에 올리고 **START**를 눌렀다. 장비는 곧바로 **pump down**을 시작했고, 압력계 숫자가 빠르게 떨어졌다. 하지만 아직 **base pressure**에 도달하지 못했는데 **transfer valve**를 열려고 하자, 화면에 붉은 글씨로 **INTERLOCK: base pressure not reached** 가 떴다. 선배가 웃으며 말한다. \"장비는 영어로 너한테 계속 말을 걸어. **load, evacuate, pump down, purge, vent, start, stop, unload** — 이 명령어들과 상태 표시만 정확히 읽으면, 절차는 반쯤 끝난 거야.\" 오늘 우리는 장비가 화면과 매뉴얼로 건네는 그 영어를 읽고, 지금 어떤 상태인지 스스로 판단하는 법을 배운다.",
    "art": "green"
   },
   {
    "type": "scene",
    "title": "오늘의 현장 · 상황 설정",
    "where": "웨이퍼를 넣는 로드포트(load port) 앞.",
    "tool": "조작 패널과 작업 절차서(SOP).",
    "situation": "오늘 첫 로트를 직접 돌려 본다. 순서를 하나라도 틀리면 안 된다.",
    "meet": [
     "절차 명령문 Load·Evacuate·Start",
     "초록불 규칙",
     "버튼 PRESS START",
     "도어 경고"
    ],
    "goal": "번호 붙은 절차 문장을 순서대로 정확히 따라 읽기.",
    "bg": "w3"
   },
   {
    "type": "read",
    "title": "운전 절차란 무엇인가 — 전체 시퀀스 읽기",
    "intro": "장비 운전은 정해진 순서(sequence)를 따라 진행됩니다. 각 단계가 영어 명령어 한 단어로 표시되므로, 순서와 의미를 함께 이해해야 합니다.",
    "paras": [
     "반도체 공정 장비의 기본 흐름은 대개 **load → evacuate(pump down) → process → purge → vent → unload** 순서로 진행됩니다. 각 단계는 화면에서 영어 동사 하나로 표시되므로, 이 여섯~여덟 단어가 사실상 '운전 절차의 목차'입니다.",
     "**load**는 웨이퍼(또는 카세트)를 장비 안으로 넣는 단계이고, **unload**는 공정이 끝난 뒤 다시 꺼내는 단계입니다. 화면 버튼이 **LOAD / UNLOAD**로 구분되어 있어, 눌러야 할 방향을 반드시 확인해야 합니다.",
     "**evacuate**와 **pump down**은 사실상 같은 뜻으로, 챔버 안의 공기를 빼내 진공을 만드는 단계입니다. 매뉴얼에 따라 **Evacuate the chamber** 또는 **Pump down the load lock**처럼 표현이 달라질 뿐, 하는 일은 같습니다.",
     "공정이 끝나면 **purge**(질소로 내부 가스 치환)와 **vent**(대기압으로 되돌림)를 거쳐야 문을 안전하게 열 수 있습니다. 이 순서를 건너뛰면 위험하거나 장비가 **interlock**으로 막힙니다.",
     "**start**와 **stop**은 시퀀스 전체를 시작/정지시키는 상위 명령입니다. 화면의 **START** 버튼은 '준비가 끝났으니 순서대로 진행하라', **STOP**은 '지금 진행 중인 동작을 멈춰라'를 의미합니다.",
     "핵심은 '지금 장비가 시퀀스의 어느 단계에 있는가'를 화면 영어로 읽어내는 것입니다. 단계 이름을 모르면 다음에 무엇을 눌러야 하는지 판단할 수 없습니다."
    ],
    "figs": [
     {
      "kind": "step",
      "title": "SOP · LOAD & RUN",
      "items": [
       [
        "Confirm the tool is [IDLE].",
        "장비가 IDLE인지 확인"
       ],
       [
        "[Load] the wafer.",
        "웨이퍼 로드"
       ],
       [
        "[Evacuate] the chamber.",
        "챔버 배기"
       ],
       [
        "Press [START] to begin the cycle.",
        "START 눌러 시작"
       ]
      ],
      "cap": "작업 절차서(SOP)는 번호가 붙은 명령문."
     }
    ]
   },
   {
    "type": "read",
    "title": "진공 만들기 — pump down / evacuate 의 물리적 의미",
    "intro": "왜 챔버를 진공으로 만드는지, 그리고 화면의 압력 숫자를 어떻게 읽는지 이해하면 절차 판단이 쉬워집니다.",
    "paras": [
     "대부분의 반도체 공정은 진공(**vacuum**)에서 진행됩니다. 공기 중 산소·수분·먼지가 웨이퍼 표면을 오염시키거나 반응을 방해하기 때문에, **pump down**으로 이런 잔류 기체를 제거해야 합니다.",
     "**pump down**은 보통 두 단계로 나뉩니다. 먼저 러핑 펌프로 대기압에서 중간 진공까지 내리는 **rough vacuum** 단계, 그다음 터보/크라이오 펌프로 고진공까지 내리는 **high vacuum** 단계입니다. 화면에서 압력이 급격히 떨어지다가 천천히 내려가는 구간이 이 전환점입니다.",
     "압력 단위는 주로 **Torr**, **mTorr**, 또는 **Pa**로 표시됩니다. 예를 들어 **760 Torr**는 대기압, **5.0E-6 Torr**는 고진공을 뜻합니다. 지수 표기 **E-6**은 '×10의 -6승'이므로 숫자가 작을수록 진공도가 높습니다.",
     "장비가 도달할 수 있는 가장 낮은 안정 압력을 **base pressure**라고 합니다. 공정을 시작하려면 이 **base pressure**에 도달해야 하며, 그렇지 않으면 오염이나 공정 불량이 발생합니다.",
     "화면에는 흔히 **Pumping...**, **Evacuating...**, 또는 진행 막대(progress bar)가 표시됩니다. 이 표시는 '아직 진공 만드는 중이니 기다려라'는 뜻이며, 이때 밸브를 강제로 열면 안 됩니다.",
     "압력이 목표값 근처에서 더 이상 내려가지 않고 멈추면(예: **leak**이나 배기 이상), 화면에 **base pressure not reached**나 경고가 뜹니다. 이 영어를 읽고 '지금 시작하면 안 된다'고 판단할 수 있어야 합니다."
    ]
   },
   {
    "type": "read",
    "title": "purge 와 vent — 가스 치환과 안전",
    "intro": "공정이 끝난 뒤 문을 열기까지의 절차입니다. purge와 vent를 혼동하면 위험하므로 정확히 구분합니다.",
    "paras": [
     "**purge**는 챔버 안에 남은 공정 가스(독성·가연성일 수 있음)를 질소(**N2**) 같은 불활성 가스로 밀어내 치환하는 단계입니다. 매뉴얼에 **Purge the chamber with N2**처럼 나옵니다.",
     "**vent**는 진공 상태의 챔버를 다시 대기압(**atmosphere**)으로 되돌리는 단계입니다. 진공 상태에서는 문이 압력차로 열리지 않으므로, **vent**로 압력을 맞춰야 안전하게 개방할 수 있습니다.",
     "순서가 중요합니다. 보통 **purge**로 위험 가스를 먼저 제거한 뒤 **vent**로 대기압을 만듭니다. 이 순서를 바꾸면 유해 가스가 작업 공간으로 새어 나올 수 있습니다.",
     "화면에는 **Venting to atmosphere...** 또는 **N2 purge in progress**가 표시되며, 완료되면 **Vent complete** 또는 **Door unlocked** 같은 메시지가 뜹니다. 이 완료 표시를 확인한 뒤에만 문을 엽니다.",
     "펌프가 아직 돌고 있을 때 **vent**하면 펌프 손상이나 오일 역류가 생길 수 있으므로, 매뉴얼의 **Never vent while the pump is running** 같은 경고문을 반드시 읽고 지켜야 합니다.",
     "**vent** 후에는 압력계(**gauge**)가 대기압(약 **760 Torr**)을 가리키는지 눈으로 확인하는 것이 마지막 판단 기준입니다. 숫자와 화면 메시지가 일치해야 안전합니다."
    ],
    "figs": [
     {
      "kind": "note",
      "title": "WORK INSTRUCTION",
      "en": "Do not open the door until the cycle is [complete].",
      "ko": "사이클 완료 전 도어를 열지 마시오."
     }
    ]
   },
   {
    "type": "read",
    "title": "READY 상태와 base pressure — '지금 시작해도 되는가' 판단",
    "intro": "운전 절차에서 가장 중요한 판단은 '시작 가능 상태인지'를 읽는 것입니다. 이 판단 기준을 정리합니다.",
    "paras": [
     "장비가 공정을 시작할 준비가 되면 화면에 **READY** 표시가 뜨거나 상태 램프가 초록색으로 바뀝니다. 이 **READY**는 여러 조건이 모두 충족됐다는 종합 신호입니다.",
     "**READY**가 뜨려면 보통 ① **base pressure** 도달, ② 온도·유량 등 **setpoint** 도달, ③ 문·밸브의 **interlock** 해제, ④ 이전 단계 정상 완료가 모두 만족되어야 합니다. 하나라도 어긋나면 **NOT READY**로 남습니다.",
     "**base pressure**에 도달했는지는 압력 숫자로 판단합니다. 예를 들어 목표가 **< 5.0E-6 Torr**인데 화면이 **2.0E-4 Torr**를 가리키면, 아직 두 자릿수 이상 높으므로 '아직 준비 안 됨'입니다.",
     "장비가 대기 중이지만 공정 중은 아닌 상태를 **idle** 또는 **standby**라고 표시합니다. **idle**은 '문제는 없지만 아직 START 전'이라는 뜻으로, **READY**와는 다릅니다.",
     "**START** 버튼이 회색(비활성)으로 흐려져 있으면 아직 조건이 안 맞은 것입니다. 버튼이 활성화되고 **READY**가 초록불일 때만 실제로 시작할 수 있습니다.",
     "정리하면, 작업자는 '숫자(**base pressure/setpoint**) + 상태표시(**READY/interlock**) + 버튼 활성 여부'를 함께 읽고 나서 시작 여부를 판단해야 합니다. 하나만 보고 판단하면 오조작으로 이어집니다."
    ],
    "figs": [
     {
      "kind": "sticker",
      "level": "caution",
      "en": "WAIT FOR GREEN LIGHT",
      "ko": "초록불 켜질 때까지 대기"
     }
    ]
   },
   {
    "type": "read",
    "title": "명령문(imperative) 읽기 — 작업 지시문의 문법",
    "intro": "매뉴얼과 작업 지시서(work instruction)는 대부분 명령문입니다. 명령문의 형태를 알면 '무엇을 하라는지'가 즉시 보입니다.",
    "paras": [
     "작업 지시문은 주어 없이 동사로 시작하는 **imperative(명령문)** 형태가 기본입니다. 예: **Load the cassette.** / **Press START.** / **Pump down the chamber.** — 앞에 'You'가 생략된 '~하라'는 지시입니다.",
     "금지·주의는 부정 명령문으로 표현됩니다. **Do not open the door.**(문을 열지 마라), **Never vent while pumping.**(배기 중 벤트 금지). **Do not / Never**로 시작하면 '하면 안 되는 것'이므로 특히 주의해서 읽습니다.",
     "확인을 요구하는 동사도 자주 나옵니다. **Ensure ~**, **Verify ~**, **Confirm ~**, **Check ~**는 모두 '~인지 반드시 확인하라'는 뜻입니다. 예: **Verify the gauge reads atmospheric pressure.**",
     "조건은 **If ~, (then) ...** 구조로 옵니다. 예: **If the sequence stalls, press STOP.**(시퀀스가 멈추면 STOP을 눌러라). **If / When / Before / After**로 시작하는 부분은 '언제 그 동작을 하는가'를 알려줍니다.",
     "경고 등급 단어의 세기를 구분해야 합니다. **NOTE**(참고) < **CAUTION**(주의, 경미한 손상 가능) < **WARNING**(경고, 부상 위험) < **DANGER**(위험, 심각·치명적). 등급이 높을수록 반드시 그대로 따릅니다.",
     "순서 지시에는 번호와 **then / next / after that**가 함께 쓰입니다. **Purge with N2, then vent to atmosphere.** 처럼 **then**의 앞뒤 순서를 뒤바꾸지 않도록 읽습니다."
    ]
   },
   {
    "type": "read",
    "title": "HMI / GUI 화면 텍스트 읽기",
    "intro": "장비의 상태는 대부분 영어 화면(HMI/GUI)으로 표시됩니다. 버튼·표시등·메시지의 영어를 유형별로 익힙니다.",
    "paras": [
     "화면의 조작 버튼은 동사 한두 단어입니다: **START / STOP / LOAD / UNLOAD / PUMP / VENT / PURGE / ABORT**. 버튼이 진하면 활성(누를 수 있음), 흐리면 비활성(지금은 못 누름)을 뜻합니다.",
     "상태 표시등(status lamp)의 색은 관례가 있습니다. 초록 = **READY / RUNNING(정상)**, 노랑 = **IDLE / STANDBY / WARNING(대기·주의)**, 빨강 = **ALARM / FAULT / STOP(이상·정지)**. 색과 영어 단어를 함께 읽습니다.",
     "진행 중 상태는 현재진행형 또는 '...'으로 표시됩니다: **Pumping...**, **Evacuating...**, **Venting...**, **Processing...**. 이 표시가 있으면 '동작 중이니 기다려라'는 의미입니다.",
     "확인을 요구하는 팝업(**prompt**)이 뜹니다: **Confirm to continue?** 또는 **Are you sure you want to vent?** — 여기서 **OK/Yes**는 진행, **Cancel/No**는 취소입니다. 내용을 읽지 않고 누르면 안 됩니다.",
     "수치 표시는 보통 **현재값(actual)**과 **목표값(setpoint)**이 나란히 나옵니다. 예: **Pressure: 8.0E-5 / SP 5.0E-6 Torr**. 왼쪽이 지금, 오른쪽이 도달해야 할 값입니다.",
     "이상 메시지는 짧은 영어 코드/문장으로 뜹니다: **INTERLOCK ACTIVE**, **BASE PRESSURE NOT REACHED**, **DOOR OPEN**, **GAS FLOW LOW**. 이 문장을 그대로 읽고 원인을 판단하는 것이 현장 영어의 핵심 능력입니다."
    ],
    "figs": [
     {
      "kind": "buttons",
      "items": [
       [
        "PRESS START",
        "go"
       ],
       [
        "PROCESSING…",
        "n"
       ],
       [
        "DONE",
        "n"
       ]
      ]
     },
     {
      "kind": "hmi",
      "tool": "EQP-311",
      "status": "IDLE",
      "state": "idle",
      "rows": [
       [
        "State",
        "IDLE → READY"
       ],
       [
        "Wafer",
        "LOADED"
       ]
      ]
     }
    ]
   },
   {
    "type": "acr",
    "title": "약어",
    "intro": "화면과 매뉴얼에 자주 등장하는 약어입니다. 뜻을 알아야 상태를 즉시 판단할 수 있습니다.",
    "items": [
     {
      "ab": "HMI",
      "full": "Human Machine Interface",
      "ko": "작업자-장비 조작 화면(터치패널 등)"
     },
     {
      "ab": "GUI",
      "full": "Graphical User Interface",
      "ko": "그래픽 사용자 인터페이스 화면"
     },
     {
      "ab": "LL",
      "full": "Load Lock",
      "ko": "로드락 — 진공을 유지한 채 웨이퍼를 넣고 빼는 중간 챔버"
     },
     {
      "ab": "N2",
      "full": "Nitrogen",
      "ko": "질소 — purge/vent에 쓰이는 불활성 가스"
     },
     {
      "ab": "SP",
      "full": "Set Point",
      "ko": "설정값(목표값) — 도달해야 할 압력·온도·유량"
     },
     {
      "ab": "PV",
      "full": "Process Value",
      "ko": "현재값 — 실제 측정된 값"
     },
     {
      "ab": "EMO",
      "full": "Emergency Off",
      "ko": "비상 정지 — 즉시 전원을 차단하는 버튼"
     },
     {
      "ab": "PM",
      "full": "Preventive Maintenance",
      "ko": "예방 정비 — 장비 정지 후 점검·교체"
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 운전 명령어 (1)",
    "intro": "장비 화면과 매뉴얼에서 가장 자주 누르고 읽는 기본 동사입니다.",
    "items": [
     {
      "en": "load",
      "ko": "로드하다(넣다)",
      "d": "웨이퍼나 카세트를 장비 안으로 넣는 동작",
      "ex": "Load the wafer cassette onto the load port."
     },
     {
      "en": "unload",
      "ko": "언로드하다(꺼내다)",
      "d": "공정이 끝난 웨이퍼를 장비에서 꺼내는 동작",
      "ex": "After processing, unload the wafers from the chamber."
     },
     {
      "en": "evacuate",
      "ko": "배기하다(진공을 만들다)",
      "d": "챔버 안의 공기를 빼내 진공 상태로 만드는 것",
      "ex": "Evacuate the chamber before starting the process."
     },
     {
      "en": "pump down",
      "ko": "펌프로 진공을 내리다",
      "d": "펌프를 돌려 챔버 압력을 낮추는 배기 동작(evacuate와 동의)",
      "ex": "Pump down the load lock until it reaches base pressure."
     }
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — 로드 & 운전",
    "doc": {
     "name": "EQP-311 Operating Manual",
     "no": "OM-311",
     "sec": "4.2",
     "rev": "A",
     "page": "4-5"
    },
    "heading": "4.2  Loading a Wafer and Starting a Cycle",
    "steps": [
     "Confirm the tool STATUS is [IDLE] and the green light is ON.",
     "Place the wafer on the load port and press [LOAD].",
     {
      "t": "Press EVACUATE and wait until the chamber is under vacuum.",
      "note": {
       "kind": "note",
       "en": "The READY lamp turns on when base pressure is reached."
      }
     },
     "Select the recipe, then press [START] to begin the cycle.",
     {
      "t": "Do not open the door until the cycle is COMPLETE.",
      "note": {
       "kind": "warning",
       "en": "Opening the door during RUN aborts the process and may scrap the wafer."
      }
     }
    ],
    "gloss": [
     [
      "load port",
      "웨이퍼 투입구"
     ],
     [
      "evacuate",
      "배기(진공화)"
     ],
     [
      "recipe",
      "공정 레시피"
     ],
     [
      "complete",
      "완료"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "확인 문제 (1)",
    "intro": "화면·매뉴얼의 영어 명령을 올바르게 해석하세요.",
    "questions": [
     {
      "prompt": "매뉴얼에 'Pump down the chamber.'라고 되어 있습니다. 무엇을 하라는 뜻입니까?",
      "opts": [
       "챔버 안의 공기를 빼내 진공을 만들라",
       "챔버에 가스를 채우라",
       "챔버 문을 열라"
      ],
      "ans": 0
     },
     {
      "prompt": "'Unload the wafers'는 어떤 동작입니까?",
      "opts": [
       "웨이퍼를 장비에 넣는다",
       "웨이퍼를 장비에서 꺼낸다",
       "웨이퍼를 세척한다"
      ],
      "ans": 1
     },
     {
      "prompt": "'Evacuate'와 사실상 같은 뜻으로 쓰이는 표현은?",
      "opts": [
       "Vent",
       "Purge",
       "Pump down"
      ],
      "ans": 2
     }
    ]
   },
   {
    "type": "glossary",
    "title": "가스·압력 관련 용어 (2)",
    "intro": "진공을 만들고 다시 대기압으로 돌리는 과정에서 반드시 구분해야 할 용어입니다.",
    "items": [
     {
      "en": "purge",
      "ko": "퍼지(가스 치환)",
      "d": "챔버 내 잔류 가스를 질소 등 불활성 가스로 밀어내 치환하는 것",
      "ex": "Purge the chamber with N2 before venting."
     },
     {
      "en": "vent",
      "ko": "벤트(대기압 복귀)",
      "d": "진공 챔버를 다시 대기압으로 되돌려 문을 열 수 있게 하는 것",
      "ex": "Vent the chamber to atmosphere before opening the door."
     },
     {
      "en": "base pressure",
      "ko": "도달 진공도(기저 압력)",
      "d": "장비가 도달할 수 있는 가장 낮은 안정 압력; 공정 시작 기준",
      "ex": "Wait until the chamber reaches base pressure of 5.0E-6 Torr."
     },
     {
      "en": "vacuum",
      "ko": "진공",
      "d": "대기압보다 낮게 기체를 제거한 상태",
      "ex": "The process must run under high vacuum."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 문제 (2)",
    "intro": "다음 영어 표현의 의미를 고르세요.",
    "questions": [
     {
      "prompt": "'Purge the chamber with N2, then vent to atmosphere.' 올바른 순서 해석은?",
      "opts": [
       "먼저 대기압으로 벤트한 뒤 질소로 퍼지한다",
       "먼저 질소로 퍼지한 뒤 대기압으로 벤트한다",
       "퍼지와 벤트를 동시에 한다"
      ],
      "ans": 1
     },
     {
      "prompt": "화면에 'base pressure not reached'가 떴습니다. 지금 상황은?",
      "opts": [
       "목표 진공도에 아직 도달하지 못했다",
       "이미 진공이 완성되어 시작 가능하다",
       "가스 공급이 완료되었다"
      ],
      "ans": 0
     },
     {
      "prompt": "'Vent to atmosphere'는 챔버를 어떤 상태로 만드는 것입니까?",
      "opts": [
       "더 높은 진공으로 배기한다",
       "대기압으로 되돌린다",
       "온도를 올린다"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "제어·상태 용어 (3)",
    "intro": "시퀀스를 시작·정지시키고 상태를 판단할 때 읽는 단어입니다.",
    "items": [
     {
      "en": "start",
      "ko": "시작(시퀀스 개시)",
      "d": "준비 완료 후 운전 시퀀스를 순서대로 진행시키는 상위 명령",
      "ex": "Press START to begin the automatic sequence."
     },
     {
      "en": "stop",
      "ko": "정지",
      "d": "진행 중인 동작을 멈추는 명령(비상정지와는 구분)",
      "ex": "If the sequence stalls, press STOP and notify the engineer."
     },
     {
      "en": "ready",
      "ko": "준비 완료 상태",
      "d": "모든 조건이 충족되어 공정을 시작할 수 있는 상태",
      "ex": "Do not start until the READY indicator turns green."
     },
     {
      "en": "interlock",
      "ko": "인터록(안전 잠금)",
      "d": "안전 조건이 안 맞으면 동작을 강제로 막는 보호 장치",
      "ex": "The transfer valve is blocked by an interlock until base pressure is reached."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 문제 (3)",
    "intro": "상태 표시를 읽고 올바르게 판단하세요.",
    "questions": [
     {
      "prompt": "화면에 'READY' 초록불이 아직 켜지지 않았습니다. 올바른 행동은?",
      "opts": [
       "바로 START를 눌러 공정을 시작한다",
       "조건이 충족될 때까지 기다린 뒤 시작한다",
       "문을 열고 웨이퍼를 꺼낸다"
      ],
      "ans": 1
     },
     {
      "prompt": "'INTERLOCK ACTIVE' 메시지의 의미로 맞는 것은?",
      "opts": [
       "안전 조건 미충족으로 동작이 잠겨 있다",
       "정비가 완료되었다",
       "공정이 정상 종료되었다"
      ],
      "ans": 0
     },
     {
      "prompt": "매뉴얼의 'If the sequence stalls, press STOP.'는 언제 STOP을 누르라는 뜻입니까?",
      "opts": [
       "시퀀스가 멈추거나 진행되지 않을 때",
       "공정이 정상적으로 끝났을 때",
       "웨이퍼를 넣기 전에 항상"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "glossary",
    "title": "화면·계기 용어 (4)",
    "intro": "HMI 화면의 숫자·팝업·계기를 읽을 때 필요한 용어입니다.",
    "items": [
     {
      "en": "setpoint",
      "ko": "설정값(목표값)",
      "d": "장비가 도달해야 할 목표 압력·온도·유량 값",
      "ex": "The pressure setpoint is 5.0E-6 Torr."
     },
     {
      "en": "gauge",
      "ko": "게이지(계기)",
      "d": "압력 등을 측정해 숫자로 보여주는 계기",
      "ex": "Verify the gauge reads atmospheric pressure before opening the door."
     },
     {
      "en": "abort",
      "ko": "중단(강제 취소)",
      "d": "진행 중인 동작을 즉시 취소하는 것",
      "ex": "Press ABORT to cancel the current sequence."
     },
     {
      "en": "confirm",
      "ko": "확인(진행 승인)",
      "d": "팝업에서 동작을 계속할지 승인하는 것",
      "ex": "The screen asks: Confirm to continue? Press OK to proceed."
     }
    ],
    "figs": [
     {
      "kind": "sticker",
      "level": "warn",
      "en": "ABORT STOPS THE CYCLE",
      "ko": "ABORT는 사이클을 중단시킨다"
     }
    ]
   },
   {
    "type": "manual",
    "mtitle": "OPERATING PROCEDURE — STARTUP SEQUENCE",
    "paras": [
     "1. Load the wafer cassette onto the load port and confirm the carrier is properly seated.",
     "웨이퍼 카세트를 로드 포트에 올리고, 캐리어가 제대로 안착되었는지 확인하라. (load = 넣기, confirm = 확인)",
     "2. Press START to begin the automatic evacuation sequence.",
     "START를 눌러 자동 배기 시퀀스를 시작하라. (evacuation = pump down 과 동일)",
     "3. Pump down the load lock until the chamber reaches base pressure (< 5.0E-6 Torr).",
     "챔버가 base pressure(5.0×10⁻⁶ Torr 미만)에 도달할 때까지 로드락을 배기하라. 숫자가 목표값 아래로 내려가야 한다.",
     "4. Wait for the READY indicator to turn green before proceeding.",
     "다음 단계로 넘어가기 전에 READY 표시등이 초록으로 바뀔 때까지 기다려라. (READY = 시작 가능 상태)",
     "5. Do NOT open the transfer valve until base pressure is achieved.",
     "base pressure에 도달하기 전에는 트랜스퍼 밸브를 열지 마라. (Do NOT = 금지, 인터록으로 막힐 수 있음)"
    ]
   },
   {
    "type": "manual",
    "mtitle": "SHUTDOWN & VENT — NOTES AND WARNINGS",
    "paras": [
     "To unload the wafers, first purge the chamber with N2, then vent to atmosphere.",
     "웨이퍼를 꺼내려면, 먼저 질소(N2)로 챔버를 퍼지한 뒤 대기압으로 벤트하라. 순서를 지켜야 한다.",
     "NOTE: Purging replaces residual process gas with inert N2 before the chamber is vented.",
     "참고: 퍼지는 벤트 전에 잔류 공정 가스를 불활성 질소로 치환하는 과정이다. (NOTE = 참고 수준)",
     "WARNING: Never vent the chamber while the vacuum pump is still running.",
     "경고: 진공 펌프가 아직 돌고 있는 동안에는 절대로 챔버를 벤트하지 마라. 펌프 손상·역류 위험. (WARNING = 부상/손상 위험)",
     "CAUTION: Verify the gauge reads atmospheric pressure before opening the door.",
     "주의: 문을 열기 전에 게이지가 대기압을 가리키는지 확인하라. (CAUTION = 주의)",
     "If the sequence stalls or an alarm appears, press STOP and notify the shift engineer.",
     "시퀀스가 멈추거나 알람이 뜨면, STOP을 누르고 교대 엔지니어에게 알려라. (스스로 임의 조작하지 말 것)"
    ]
   },
   {
    "type": "sim",
    "which": "devicePanel",
    "mode": "procedure",
    "intro": "아래 조작 패널(device panel) 시뮬레이터에서 실제 HMI처럼 버튼과 상태 표시를 조작해 보세요. START, PUMP, PURGE, VENT, STOP 버튼의 영어와 압력 숫자, READY 표시등을 함께 보면서 '지금 눌러도 되는 버튼은 무엇인지'를 판단하는 연습을 합니다. base pressure에 도달하기 전에는 다음 단계 버튼이 흐리게(비활성) 표시되는 것을 직접 확인하세요."
   },
   {
    "type": "sim",
    "which": "equipment",
    "mode": "sequence",
    "intro": "아래 장비(equipment) 시뮬레이터에서 load → pump down → base pressure 도달 → READY → process → purge → vent → unload 의 전체 운전 절차를 순서대로 실행해 보세요. 각 단계에서 화면에 뜨는 영어 메시지(Pumping..., base pressure reached, Venting..., Door unlocked 등)를 읽고, 지금 장비가 시퀀스의 어느 단계에 있는지 스스로 말해 보는 것이 목표입니다."
   },
   {
    "type": "comm",
    "items": [
     {
      "sit": "외국인 엔지니어가 챔버가 시작 가능한 진공에 도달했는지 묻는다.",
      "q": {
       "en": "Can you check if the chamber has reached base pressure yet?",
       "ko": "챔버가 base pressure에 도달했는지 확인해 줄래요?"
      },
      "a": {
       "en": "Not yet. The gauge still reads 2.0E-4 Torr, so it is still pumping down.",
       "ko": "아직요. 게이지가 아직 2.0×10⁻⁴ Torr를 가리켜서, 아직 배기 중입니다."
      }
     },
     {
      "sit": "엔지니어가 공정을 시작해도 되는지 확인한다.",
      "q": {
       "en": "Is the tool ready to start the process now?",
       "ko": "지금 장비가 공정을 시작할 준비가 됐나요?"
      },
      "a": {
       "en": "Yes. The READY lamp is green and base pressure is stable, so we can press START.",
       "ko": "네. READY 램프가 초록이고 base pressure도 안정적이라, START를 눌러도 됩니다."
      }
     },
     {
      "sit": "웨이퍼를 꺼내기 전, 벤트 절차를 확인한다.",
      "q": {
       "en": "Before we unload, did you purge the chamber first?",
       "ko": "언로드하기 전에, 챔버를 먼저 퍼지했나요?"
      },
      "a": {
       "en": "Yes, I purged with N2 first, then vented to atmosphere. The gauge now reads 760 Torr.",
       "ko": "네, 먼저 N2로 퍼지한 뒤 대기압으로 벤트했습니다. 지금 게이지는 760 Torr를 가리킵니다."
      }
     }
    ]
   },
   {
    "type": "wrap",
    "title": "정리 — 운전 절차 영어 읽기",
    "points": [
     "운전 시퀀스의 뼈대: **load → evacuate(pump down) → process → purge → vent → unload**. 각 단계는 영어 동사 하나로 표시된다.",
     "**pump down / evacuate**는 진공 만들기, **purge**는 질소 가스 치환, **vent**는 대기압 복귀. purge 먼저, vent 나중 순서를 지킨다.",
     "시작 판단 3요소: 숫자(**base pressure / setpoint**) + 상태표시(**READY / interlock**) + 버튼 활성 여부를 함께 읽는다.",
     "작업 지시문은 명령문이다. **Do not / Never**는 금지, **Verify / Ensure / Confirm**은 확인, **NOTE < CAUTION < WARNING < DANGER** 순으로 경고가 강해진다.",
     "화면 메시지 **base pressure not reached / INTERLOCK ACTIVE / Venting... / Door unlocked** 를 그대로 읽고 현재 상태를 판단하는 것이 현장 영어의 핵심이다."
    ],
    "done": "이제 여러분은 장비가 화면과 매뉴얼로 건네는 영어를 읽고, **START를 눌러도 되는지 스스로 판단**할 수 있습니다. 초록불이 켜지기 전에는 손대지 않는다 — 그 판단이 곧 안전입니다. **수고하셨습니다!**"
   }
  ]
 },
 {
  "id": "w4",
  "title": "진공·가스 로그",
  "slides": [
   {
    "type": "story",
    "icon": "🌀",
    "title": "새벽 3시, 챔버 압력이 흔들린다",
    "text": "야간 근무 중인 신입 기술자 민준. 담당하는 식각(etch) 장비의 HMI 화면에 노란 경고가 뜬다. **Chamber Pressure: 12.4 mTorr (SP 10.0)** 그리고 그 아래 **UNSTABLE**. 옆에는 가스 라인 로그가 흐른다. **Ar Flow: 48 sccm / SP 50 sccm — OUT OF RANGE**. 민준은 순간 얼어붙는다. 이 숫자들이 정상인지, 지금 라인을 멈춰야 하는지 판단해야 한다. 값을 '읽는' 것과 '정상/이상을 판단하는' 것은 다르다. 오늘 우리는 **vacuum & gas log**를 읽고, **set point**와 **actual value**의 차이를 해석하고, **stable/unstable**, **out of range** 같은 상태어를 근거로 정상과 이상을 가려내는 법을 배운다.",
    "art": "pressure"
   },
   {
    "type": "scene",
    "title": "오늘의 현장 · 상황 설정",
    "where": "새벽 3시, 야간 근무 모니터링 데스크.",
    "tool": "진공·가스 로그 화면과 압력 게이지.",
    "situation": "챔버 압력이 5.0에서 5.8 Torr로 흔들린다. 로그를 읽어 원인을 찾아야 한다.",
    "meet": [
     "SP / PV 계기",
     "로그 DRIFT · out of spec",
     "N2 퍼지 상태",
     "FAULT 배너"
    ],
    "goal": "시간순 로그와 숫자를 읽어 \"정상 / 이탈\"을 판단하기.",
    "bg": "w4"
   },
   {
    "type": "read",
    "title": "왜 진공과 가스를 로그로 감시하는가",
    "intro": "반도체 공정은 대부분 저압(진공) 환경에서 진행되며, 압력과 유량이 결과를 결정합니다.",
    "paras": [
     "박막 증착(deposition)과 식각(etch)은 챔버 내부를 **vacuum** 상태로 만든 뒤 정해진 **process pressure**에서 진행됩니다. 압력이 조금만 달라져도 막의 두께·균일도(uniformity)가 흔들립니다.",
     "공정 가스는 정확한 비율과 양으로 들어가야 하므로 **MFC (Mass Flow Controller)**가 유량을 제어하고, 그 값이 로그에 **flow rate**로 기록됩니다.",
     "장비는 목표값인 **set point (SP)**와 실제 측정값인 **actual value (PV, process value)**를 나란히 보여줍니다. 두 값의 차이(**deviation**)가 정상 판단의 핵심 단서입니다.",
     "로그는 단순한 숫자 나열이 아니라 시간에 따른 **trend**입니다. 값이 **stable**하게 유지되는지, 아니면 **drift**하거나 **spike**가 있는지를 봐야 합니다.",
     "HMI/GUI 화면과 영문 매뉴얼은 이 상태를 영어 단어로 표시합니다: **STABLE / UNSTABLE / OUT OF RANGE / IN RANGE / OK / ALARM**. 이 단어를 못 읽으면 값을 봐도 판단할 수 없습니다."
    ]
   },
   {
    "type": "read",
    "title": "압력 단위와 유량 단위 읽기",
    "intro": "로그의 숫자는 반드시 단위와 함께 읽어야 의미가 생깁니다.",
    "paras": [
     "압력 단위 **Torr**와 **mTorr**: 1 Torr = 1000 mTorr입니다. 공정 압력은 보통 mTorr 단위이며, 예: **10 mTorr**는 0.010 Torr입니다. 단위를 착각하면 1000배 차이가 납니다.",
     "참고로 대기압은 약 **760 Torr**이고, 진공 공정은 그보다 훨씬 낮은 mTorr 영역에서 이뤄집니다. 낮을수록 '더 강한 진공(high vacuum)'입니다.",
     "유량 단위 **sccm (standard cubic centimeters per minute)**: 표준 조건에서 1분당 흘러가는 가스 부피입니다. 예: **Ar 50 sccm**은 아르곤이 분당 50 표준 cc로 흐른다는 뜻입니다.",
     "큰 유량은 **slm (standard liters per minute)**로도 표기됩니다. 1 slm = 1000 sccm. 로그에서 단위가 sccm인지 slm인지 먼저 확인하세요.",
     "로그에서 값과 단위, 그리고 SP/PV 위치를 함께 읽는 습관이 중요합니다. 예: **Pressure PV 9.8 mTorr / SP 10.0 mTorr** → 목표 10에 거의 도달, 정상 범위."
    ],
    "figs": [
     {
      "kind": "meter",
      "name": "Chamber Pressure",
      "sp": "5.0",
      "pv": "5.8",
      "unit": "Torr",
      "state": "high",
      "note": "PV가 SP보다 높음 → out of range."
     },
     {
      "kind": "meter",
      "name": "Base Pressure",
      "sp": "1E-6",
      "pv": "1E-6",
      "unit": "Torr",
      "state": "ok"
     }
    ]
   },
   {
    "type": "read",
    "title": "정상과 이상, 무엇으로 판단하는가",
    "intro": "판단은 감이 아니라 로그가 주는 명시적 신호로 합니다.",
    "paras": [
     "**Set point vs actual value**: 실제값이 목표값 근처에서 허용 오차(**tolerance**) 안에 있으면 정상입니다. 예: SP 50 sccm, PV 49 sccm은 보통 정상, PV 30 sccm은 이상입니다.",
     "**Deviation(편차)**이 허용 범위를 넘으면 장비는 **OUT OF RANGE** 또는 **DEVIATION ALARM**을 띄웁니다. 이는 '값이 목표에서 너무 벗어났다'는 명확한 이상 신호입니다.",
     "**STABLE vs UNSTABLE**: 값이 시간에 따라 일정하면 stable, 위아래로 요동치면 unstable입니다. UNSTABLE은 누설(**leak**), MFC 이상, 밸브 문제의 초기 징후일 수 있습니다.",
     "**Warning vs Alarm**: 색으로도 구분됩니다. 보통 노랑=**warning**(주의), 빨강=**alarm/interlock**(즉시 조치·정지). 색과 단어를 함께 읽어야 대응 수준을 압니다.",
     "판단 순서: (1) 단위 확인 → (2) SP와 PV 비교 → (3) 상태어(STABLE/OUT OF RANGE 등) 확인 → (4) 색/알람 등급 확인. 이 순서를 지키면 새벽 3시에도 흔들리지 않습니다."
    ],
    "figs": [
     {
      "kind": "hmi",
      "tool": "EQP-204",
      "status": "FAULT",
      "state": "fault",
      "rows": [
       [
        "Pressure",
        "5.8 Torr",
        "high"
       ],
       [
        "Setpoint",
        "5.0 Torr"
       ]
      ],
      "banner": {
       "level": "warn",
       "en": "PRESSURE OUT OF RANGE",
       "ko": "압력 범위 이탈"
      }
     },
     {
      "kind": "alarm",
      "level": "warn",
      "code": "W-0455",
      "en": "PRESSURE DRIFT — CHECK LEAK",
      "ko": "압력 드리프트 — 누설 확인"
     }
    ]
   },
   {
    "type": "read",
    "title": "로그를 시간 흐름으로 읽기 (trend)",
    "intro": "한 순간의 값보다 시간에 따른 변화가 이상을 더 빨리 알려줍니다.",
    "paras": [
     "로그에는 **timestamp**(시각)가 함께 찍힙니다. 예: **03:12:04 Pressure 10.1 mTorr STABLE**. 언제 이상이 시작됐는지 추적하려면 시각을 함께 봐야 합니다.",
     "**Ramp**: 값이 목표까지 서서히 올라가거나 내려가는 정상 구간입니다. 램프 중에는 SP와 PV가 다른 것이 정상일 수 있습니다.",
     "**Settling**: 값이 목표에 도달해 안정되는 과정입니다. settling이 끝나 **STABLE**이 되기 전에는 공정을 시작하지 않습니다.",
     "**Spike**와 **drift**는 다릅니다. spike는 순간 급등, drift는 서서히 벗어남입니다. 로그 트렌드를 보면 둘을 구분해 원인을 좁힐 수 있습니다.",
     "정상 로그는 SP 근처에서 PV가 평평하게 STABLE로 유지됩니다. 이상 로그는 편차 확대, UNSTABLE, OUT OF RANGE, 색 변화가 시간 순으로 나타납니다."
    ],
    "figs": [
     {
      "kind": "log",
      "title": "VACUUM LOG",
      "lines": [
       "03:00  P = 5.0 Torr  OK",
       "03:12  P = 5.8 Torr  [DRIFT]",
       "03:15  ALARM: pressure [out of spec]"
      ],
      "cap": "로그(log)는 시간순 기록 — 짧은 영어와 숫자."
     }
    ]
   },
   {
    "type": "acr",
    "title": "약어",
    "intro": "진공·가스 로그 화면에서 자주 나오는 약어입니다.",
    "items": [
     {
      "ab": "SP",
      "full": "Set Point",
      "ko": "목표값 (설정값)"
     },
     {
      "ab": "PV",
      "full": "Process Value",
      "ko": "실제 측정값 (actual value)"
     },
     {
      "ab": "MFC",
      "full": "Mass Flow Controller",
      "ko": "질량 유량 제어기 (가스 유량 제어)"
     },
     {
      "ab": "sccm",
      "full": "Standard Cubic Centimeters per Minute",
      "ko": "표준 분당 세제곱센티미터 (유량 단위)"
     },
     {
      "ab": "slm",
      "full": "Standard Liters per Minute",
      "ko": "표준 분당 리터 (1 slm = 1000 sccm)"
     },
     {
      "ab": "OOR",
      "full": "Out Of Range",
      "ko": "허용 범위 벗어남 (이상)"
     }
    ],
    "figs": [
     {
      "kind": "meter",
      "name": "Gas Flow (Ar)",
      "sp": "20",
      "pv": "14",
      "unit": "sccm",
      "state": "warn"
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (1) — 값과 상태",
    "intro": "로그의 숫자와 상태를 읽는 데 꼭 필요한 용어입니다.",
    "items": [
     {
      "en": "set point",
      "ko": "설정값·목표값",
      "d": "장비가 도달하려는 목표 수치.",
      "ex": "The pressure set point for this recipe is 10 mTorr."
     },
     {
      "en": "actual value",
      "ko": "실제 측정값",
      "d": "센서가 지금 재고 있는 현재 값 (PV).",
      "ex": "The actual value is 9.8 mTorr, close to the set point."
     },
     {
      "en": "deviation",
      "ko": "편차",
      "d": "목표값과 실제값의 차이.",
      "ex": "A large deviation from the set point triggers an alarm."
     },
     {
      "en": "stable",
      "ko": "안정된",
      "d": "값이 시간에 따라 일정하게 유지되는 상태.",
      "ex": "The flow is stable at 50 sccm."
     },
     {
      "en": "unstable",
      "ko": "불안정한",
      "d": "값이 요동쳐 일정하지 않은 상태.",
      "ex": "The chamber pressure is unstable and keeps fluctuating."
     },
     {
      "en": "out of range",
      "ko": "범위 초과",
      "d": "허용 범위를 벗어난 이상 상태.",
      "ex": "Warning: gas flow is out of range."
     }
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — 압력 알람 대응",
    "doc": {
     "name": "EQP-204 Operating Manual",
     "no": "OM-204",
     "sec": "6.5",
     "rev": "B",
     "page": "6-9"
    },
    "heading": "6.5  Responding to a Pressure Out-of-Range Alarm",
    "steps": [
     "Read the current chamber pressure (PV) on the main screen.",
     "Compare PV against the setpoint (SP) and the alarm limit.",
     {
      "t": "If PV [drifts] above the limit, check for a gas leak or valve fault.",
      "note": {
       "kind": "caution",
       "en": "Rising pressure during process indicates a possible leak."
      }
     },
     "Record the event in the vacuum log with the timestamp."
    ],
    "callout": {
     "kind": "note",
     "en": "\"out of spec\" and \"out of range\" both mean the value left its allowed band."
    },
    "gloss": [
     [
      "drift",
      "서서히 벗어남"
     ],
     [
      "leak",
      "누설"
     ],
     [
      "out of range",
      "범위 이탈"
     ],
     [
      "timestamp",
      "기록 시각"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (1)",
    "intro": "영어 로그 표현의 의미를 고르세요.",
    "questions": [
     {
      "prompt": "화면에 'Actual value: 9.8 mTorr (SP 10.0)'가 보입니다. 무슨 뜻인가요?",
      "opts": [
       "목표는 10.0 mTorr이고 지금 측정값은 9.8 mTorr로 거의 도달했다",
       "목표가 9.8 mTorr로 낮아졌다",
       "압력이 10배 초과되었다"
      ],
      "ans": 0
     },
     {
      "prompt": "'The flow is stable at 50 sccm.' 이 문장의 의미는?",
      "opts": [
       "유량이 50 sccm에서 안정적으로 유지되고 있다",
       "유량이 50 sccm에서 요동치고 있다",
       "유량을 50 sccm으로 올려야 한다"
      ],
      "ans": 0
     },
     {
      "prompt": "로그에 'OUT OF RANGE'가 표시되면?",
      "opts": [
       "값이 허용 범위를 벗어난 이상 상태",
       "값이 정상 범위 안에 있음",
       "장비가 꺼져 있음"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (2) — 압력·유량·진공",
    "intro": "단위와 진공 관련 용어입니다.",
    "items": [
     {
      "en": "pressure",
      "ko": "압력",
      "d": "챔버 내부의 압력, 보통 Torr/mTorr로 표시.",
      "ex": "Chamber pressure dropped to 8 mTorr."
     },
     {
      "en": "flow rate",
      "ko": "유량",
      "d": "단위 시간당 흐르는 가스의 양, sccm/slm.",
      "ex": "Set the Ar flow rate to 50 sccm."
     },
     {
      "en": "vacuum",
      "ko": "진공",
      "d": "대기압보다 훨씬 낮은 저압 상태.",
      "ex": "Wait until the chamber reaches vacuum before starting."
     },
     {
      "en": "leak",
      "ko": "누설",
      "d": "밀폐가 깨져 공기가 새어 들어오는 현상.",
      "ex": "An unstable pressure may indicate a leak."
     },
     {
      "en": "tolerance",
      "ko": "허용 오차",
      "d": "정상으로 인정되는 편차의 한계.",
      "ex": "The flow is within tolerance of the set point."
     },
     {
      "en": "drift",
      "ko": "드리프트·서서히 변함",
      "d": "값이 시간에 따라 천천히 벗어나는 현상.",
      "ex": "The pressure reading shows a slow upward drift."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (2)",
    "intro": "단위와 판단을 확인하세요.",
    "questions": [
     {
      "prompt": "1 Torr는 몇 mTorr인가요?",
      "opts": [
       "1000 mTorr",
       "10 mTorr",
       "100 mTorr"
      ],
      "ans": 0
     },
     {
      "prompt": "'sccm'은 무엇을 나타내는 단위인가요?",
      "opts": [
       "가스 유량 (분당 표준 부피)",
       "압력",
       "온도"
      ],
      "ans": 0
     },
     {
      "prompt": "SP 50 sccm인데 PV가 30 sccm이고 'OUT OF RANGE' 경고가 떠 있습니다. 올바른 해석은?",
      "opts": [
       "실제 유량이 목표보다 크게 부족한 이상 상태",
       "유량이 목표보다 높은 정상 상태",
       "단위가 잘못 표시된 것일 뿐 정상"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (3) — 경보와 조치",
    "intro": "이상 신호를 등급으로 구분하는 용어입니다.",
    "items": [
     {
      "en": "warning",
      "ko": "주의·경고",
      "d": "주의가 필요하나 즉시 정지는 아닌 상태 (보통 노랑).",
      "ex": "A warning appears when the value nears its limit."
     },
     {
      "en": "alarm",
      "ko": "경보",
      "d": "즉시 조치가 필요한 이상 상태 (보통 빨강).",
      "ex": "A pressure alarm stopped the process automatically."
     },
     {
      "en": "interlock",
      "ko": "인터록·안전 정지",
      "d": "위험 조건에서 장비를 자동으로 멈추는 안전 장치.",
      "ex": "The safety interlock shut down the chamber."
     },
     {
      "en": "in range",
      "ko": "범위 내",
      "d": "허용 범위 안에 있는 정상 상태.",
      "ex": "All gas flows are in range."
     },
     {
      "en": "spike",
      "ko": "스파이크·순간 급등",
      "d": "값이 순간적으로 크게 튀는 현상.",
      "ex": "A sudden pressure spike was logged at 03:12."
     },
     {
      "en": "base pressure",
      "ko": "기준 압력·도달 진공",
      "d": "공정 전 챔버가 도달해야 하는 낮은 초기 압력.",
      "ex": "Confirm the chamber has reached base pressure."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (3)",
    "intro": "경보 등급과 상태어를 해석하세요.",
    "questions": [
     {
      "prompt": "화면이 빨간색으로 'ALARM'을 표시하고 있습니다. 노란색 'WARNING'과 비교하면?",
      "opts": [
       "ALARM은 즉시 조치·정지가 필요한 더 높은 등급이다",
       "ALARM은 WARNING보다 덜 위급하다",
       "둘은 완전히 같은 의미다"
      ],
      "ans": 0
     },
     {
      "prompt": "'All gas flows are in range.' 의 의미는?",
      "opts": [
       "모든 가스 유량이 정상 범위 안에 있다",
       "모든 가스 유량이 범위를 벗어났다",
       "가스 라인이 닫혀 있다"
      ],
      "ans": 0
     },
     {
      "prompt": "로그에 '03:12 Pressure spike 45 mTorr'가 찍혔습니다. 무슨 뜻인가요?",
      "opts": [
       "03시 12분에 압력이 순간적으로 45 mTorr까지 튀었다",
       "압력이 03시 12분부터 안정되었다",
       "목표 압력이 45 mTorr로 바뀌었다"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "manual",
    "mtitle": "OPERATING PROCEDURE — VACUUM & GAS LOG CHECK",
    "paras": [
     "Before starting the process, confirm that the chamber pressure has reached the base pressure and reads STABLE.",
     "공정 시작 전, 챔버 압력이 기준 압력(base pressure)에 도달했고 STABLE로 표시되는지 확인하세요.",
     "Verify that each gas flow actual value is within tolerance of its set point.",
     "각 가스 유량의 실제값(PV)이 설정값(SP)의 허용 오차 안에 있는지 확인하세요.",
     "NOTE: A deviation greater than 10% of the set point will be logged as OUT OF RANGE.",
     "참고: 설정값의 10%를 초과하는 편차는 OUT OF RANGE로 기록됩니다.",
     "If the pressure reading is UNSTABLE for more than 30 seconds, do not start the recipe.",
     "압력이 30초 이상 UNSTABLE 상태이면 레시피를 시작하지 마세요.",
     "WARNING: A pressure alarm may indicate a leak. Notify the equipment engineer and do not override the interlock.",
     "경고: 압력 경보는 누설의 신호일 수 있습니다. 장비 엔지니어에게 알리고 인터록을 임의로 해제하지 마세요.",
     "Record the set point, actual value, and status for each line in the shift log.",
     "각 라인의 설정값, 실제값, 상태를 교대 로그(shift log)에 기록하세요."
    ]
   },
   {
    "type": "manual",
    "mtitle": "ALARM RESPONSE — GAS FLOW OUT OF RANGE",
    "paras": [
     "When a gas flow reads OUT OF RANGE, first check whether the value is above or below the set point.",
     "가스 유량이 OUT OF RANGE로 표시되면, 먼저 값이 설정값보다 높은지 낮은지 확인하세요.",
     "A reading far below the set point often means the gas line is starved or the MFC is faulty.",
     "설정값보다 크게 낮은 값은 가스 공급 부족 또는 MFC 고장을 의미하는 경우가 많습니다.",
     "Do NOT reset the alarm until the actual value returns to within tolerance.",
     "실제값이 허용 오차 안으로 돌아오기 전에는 경보를 리셋하지 마세요.",
     "If the value does not recover, place the tool on hold and escalate to the shift leader.",
     "값이 회복되지 않으면 장비를 홀드(hold) 상태로 두고 교대 책임자에게 보고하세요."
    ]
   },
   {
    "type": "sim",
    "which": "partDiagram",
    "mode": "gasLog",
    "intro": "아래 다이어그램은 진공·가스 라인의 구성을 보여줍니다. 챔버(chamber), 진공 펌프(pump), MFC(가스 유량 제어기), 압력 게이지(pressure gauge)가 어떻게 연결되어 압력과 유량이 로그로 기록되는지 각 부분의 영어 명칭을 짚어가며 확인해 보세요."
   },
   {
    "type": "sim",
    "which": "devicePanel",
    "mode": "spPv",
    "intro": "아래는 HMI 상태 패널입니다. SP와 PV 값, 그리고 STABLE / UNSTABLE / OUT OF RANGE / IN RANGE 같은 상태 표시를 직접 읽어 보세요. 값과 상태어, 색(노랑=warning, 빨강=alarm)을 함께 보고 각 라인이 정상인지 이상인지 판단하는 연습을 하세요."
   },
   {
    "type": "sim",
    "which": "equipment",
    "mode": "log",
    "intro": "아래 장비 시뮬레이터에서 압력과 가스 유량을 조절해 보세요. set point를 바꾸면 actual value가 어떻게 따라오는지, 편차가 커지면 언제 OUT OF RANGE와 알람이 뜨는지, 값이 요동칠 때 UNSTABLE 표시가 어떻게 나타나는지 직접 관찰하며 정상/이상 판단 기준을 몸에 익히세요."
   },
   {
    "type": "comm",
    "items": [
     {
      "sit": "외국인 공정 엔지니어가 새벽 근무 중 로그 상태를 묻는다",
      "q": {
       "en": "The chamber pressure looks a bit off. What does the log say right now?",
       "ko": "챔버 압력이 좀 이상해 보여요. 지금 로그에 뭐라고 나와요?"
      },
      "a": {
       "en": "The pressure PV is 12.4 mTorr, but the set point is 10.0. It shows UNSTABLE.",
       "ko": "압력 실제값이 12.4 mTorr인데 설정값은 10.0이에요. UNSTABLE로 표시돼요."
      }
     },
     {
      "sit": "엔지니어가 가스 유량 상태를 확인한다",
      "q": {
       "en": "And the gas flows? Are they all within tolerance of their set points?",
       "ko": "가스 유량은요? 전부 설정값 허용 오차 안에 있나요?"
      },
      "a": {
       "en": "Ar is 48 sccm against a 50 sccm set point, and it is flagged OUT OF RANGE.",
       "ko": "아르곤이 설정값 50 sccm 대비 48 sccm이고, OUT OF RANGE로 표시돼 있어요."
      }
     },
     {
      "sit": "조치 방향을 정한다",
      "q": {
       "en": "Okay, do not start the recipe. Is there any red alarm or just a warning?",
       "ko": "알겠어요, 레시피 시작하지 마세요. 빨간 알람인가요, 아니면 경고뿐인가요?"
      },
      "a": {
       "en": "It is a yellow warning now, no interlock yet. I will hold the line and log the values.",
       "ko": "지금은 노란 경고이고 아직 인터록은 없어요. 라인을 대기시키고 값을 로그에 기록할게요."
      }
     }
    ]
   },
   {
    "type": "wrap",
    "title": "오늘의 정리",
    "points": [
     "진공·가스 로그는 **set point(SP)**와 **actual value(PV)**를 비교해 읽는다.",
     "압력 단위 **Torr / mTorr**(1 Torr = 1000 mTorr), 유량 단위 **sccm / slm**(1 slm = 1000 sccm)을 먼저 확인한다.",
     "상태어 **STABLE / UNSTABLE / IN RANGE / OUT OF RANGE**가 정상·이상 판단의 핵심 근거다.",
     "편차(**deviation**)가 허용 오차(**tolerance**)를 넘으면 이상이며, **warning(노랑)**과 **alarm(빨강)**으로 대응 등급이 나뉜다.",
     "판단 순서: 단위 → SP vs PV → 상태어 → 색/알람 등급."
    ],
    "done": "이제 새벽 3시에도 로그를 보고 **정상인지 이상인지 스스로 판단**할 수 있습니다. 수고했습니다!"
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (4) — 로그 화면 표현",
    "intro": "로그와 HMI 화면에서 바로 마주치는 추가 표현입니다.",
    "items": [
     {
      "en": "reading",
      "ko": "측정치·읽힌 값",
      "d": "센서가 표시하는 현재 수치.",
      "ex": "The gauge reading is 9.9 mTorr."
     },
     {
      "en": "fluctuate",
      "ko": "요동치다",
      "d": "값이 위아래로 계속 변하다.",
      "ex": "The pressure keeps fluctuating around the set point."
     },
     {
      "en": "hold",
      "ko": "홀드·대기",
      "d": "장비를 잠시 멈추고 대기시키는 상태.",
      "ex": "Place the tool on hold until the pressure recovers."
     },
     {
      "en": "recover",
      "ko": "회복하다",
      "d": "값이 다시 정상 범위로 돌아오다.",
      "ex": "Wait for the flow to recover to the set point."
     },
     {
      "en": "escalate",
      "ko": "상위 보고하다",
      "d": "해결되지 않은 문제를 책임자에게 알리다.",
      "ex": "Escalate to the shift leader if the alarm continues."
     }
    ]
   }
  ]
 },
 {
  "id": "w5",
  "title": "플라즈마 장비",
  "slides": [
   {
    "type": "story",
    "icon": "⚡",
    "title": "플라즈마가 켜지지 않는 새벽",
    "text": "새벽 3시, 식각(etch) 라인의 플라즈마 장비 앞에 선 지원이. 레시피를 시작했지만 웨이퍼 처리가 멈춰 있다. HMI 화면에는 **RF Power: 800 W** 라고 떠 있지만 그 아래 **Reflected: 210 W** 가 빨갛게 깜빡인다. 선배가 다가와 한마디 한다. \"**The plasma didn't ignite** — look at the **reflected power**, the **match** isn't tuned.\" 지원이는 이 문장을 읽고 무엇을 봐야 하는지 알아야 한다. 오늘 우리는 **RF power**, **forward/reflected power**, **matching network**, **impedance** 같은 화면 속 영어가 실제로 무엇을 뜻하는지, 그리고 반사파(reflected power) 값이 왜 중요한지를 읽고 판단하는 법을 배운다.",
    "art": "fse"
   },
   {
    "type": "scene",
    "title": "오늘의 현장 · 상황 설정",
    "where": "플라즈마 식각 장비 앞, 아직 어두운 새벽.",
    "tool": "RF 제너레이터와 매칭 네트워크(matching network).",
    "situation": "플라즈마가 켜지지 않는다. 반사전력이 높다. 곧 외국 FSE가 도착한다.",
    "meet": [
     "RF · 반사전력 계기",
     "매칭 상태 TUNING",
     "경고 PLASMA ON",
     "알람 REFLECTED POWER HIGH"
    ],
    "goal": "RF·매칭 관련 화면과 경고를 읽어 장비 상태를 판단하기.",
    "bg": "w5"
   },
   {
    "type": "read",
    "title": "플라즈마와 RF Power의 원리",
    "intro": "플라즈마 장비는 가스에 고주파 전력을 걸어 이온화된 상태(플라즈마)를 만든다. 화면의 영어를 읽으려면 먼저 무엇이 일어나는지 알아야 한다.",
    "paras": [
     "플라즈마는 챔버(chamber) 안의 가스에 강한 전기 에너지를 가해 전자와 이온으로 쪼개진 상태다. 이 에너지를 공급하는 것이 **RF power (Radio Frequency power)** 이며, 보통 **13.56 MHz** 같은 고주파를 사용한다.",
     "화면에서 **RF Power** 또는 **Forward Power** 는 장비가 챔버 쪽으로 내보내는 전력(W, watt)을 뜻한다. 예를 들어 **Forward Power: 800 W** 는 발생기(generator)가 800와트를 밀어내고 있다는 의미다.",
     "전력이 실제로 플라즈마에 전달되어야 식각이나 증착 반응이 일어난다. 즉 **RF power** 는 단순한 숫자가 아니라 공정 반응의 세기를 결정하는 핵심 파라미터다.",
     "화면에서 자주 보이는 **RF ON / RF OFF** 는 고주파 전력의 인가 여부를 나타낸다. **RF ON** 상태에서 값이 정상 범위여야 정상 처리 중이라는 뜻이다.",
     "전력이 너무 낮으면 플라즈마가 **ignite**(점화)되지 않고, 너무 높으면 웨이퍼 손상이나 아크(arc)가 발생할 수 있어 항상 화면 값을 레시피(recipe) 설정값과 비교해 읽는다."
    ],
    "figs": [
     {
      "kind": "meter",
      "name": "RF Forward Power",
      "sp": "1500",
      "pv": "1480",
      "unit": "W",
      "state": "ok"
     }
    ]
   },
   {
    "type": "read",
    "title": "Forward Power와 Reflected Power",
    "intro": "현장에서 가장 중요한 판단은 '나간 전력'과 '되돌아온 전력'을 구분해 읽는 것이다. 반사파의 의미가 이 슬라이드의 핵심이다.",
    "paras": [
     "**Forward Power** 는 발생기에서 챔버(부하) 쪽으로 나가는 전력이고, **Reflected Power** 는 부하에 흡수되지 못하고 발생기 쪽으로 되돌아온 전력이다. 화면에는 보통 두 값이 나란히 표시된다.",
     "이상적인 상태에서는 **Reflected Power ≈ 0 W** 여야 한다. 나간 전력이 전부 플라즈마에 전달됐다는 뜻이기 때문이다. 반사파가 크면 그만큼 전력이 낭비되고 공정이 불안정해진다.",
     "실제로 전달된 전력은 **Delivered Power = Forward − Reflected** 로 계산된다. 화면에 **Fwd 800 W / Ref 200 W** 라면 실제 플라즈마에 들어간 전력은 약 600 W다.",
     "**Reflected Power** 가 높다는 것은 **impedance mismatch**(임피던스 부정합)를 의미한다. 즉 발생기와 챔버의 전기적 조건이 맞지 않아 전력이 튕겨 나오는 상태다.",
     "높은 반사파는 발생기 자체를 손상시킬 수 있어 장비는 **High Reflected Power** 알람을 띄우고 스스로 **RF OFF** 될 수 있다. 그래서 화면의 **Reflected** 값이 빨갛게 뜨면 즉시 확인해야 한다.",
     "현장 판단 규칙: **Forward** 는 목표값 근처, **Reflected** 는 가능한 한 0에 가깝게 — 이 두 조건이 동시에 맞아야 '정상'이라고 읽는다."
    ]
   },
   {
    "type": "read",
    "title": "Matching Network와 Impedance",
    "intro": "반사파를 0으로 만드는 장치가 매칭 네트워크다. 임피던스라는 개념을 알면 화면의 tune 값들이 읽힌다.",
    "paras": [
     "**Impedance** 는 고주파 전력에 대한 회로의 '저항 성분'으로, 단위는 옴(Ω)이다. RF 발생기는 보통 **50 Ω** 로 설계되어 있고, 플라즈마 챔버의 임피던스는 공정 조건에 따라 계속 변한다.",
     "발생기의 50 Ω 과 챔버의 임피던스가 다르면 전력이 반사된다. 이 둘을 맞춰 주는 장치가 **matching network** (또는 **matchbox**, **matching unit**)다.",
     "매칭 네트워크 안에는 값을 조절하는 두 개의 가변 커패시터(variable capacitor)가 있고, 화면에는 보통 **Load** 와 **Tune** 두 위치 값이 % 또는 스텝(step)으로 표시된다.",
     "장비가 이 커패시터를 자동으로 움직여 반사파를 최소로 만드는 동작을 **auto tune** 또는 **impedance matching** 이라 한다. 화면의 **Tuning...** 표시는 지금 매칭을 맞추는 중이라는 뜻이다.",
     "**Match Position: Load 45% / Tune 62%** 같은 값이 매번 크게 튀거나 한쪽 끝(0% 또는 100%)에 붙어 있으면 매칭이 제대로 잡히지 못한 상태(**match at limit**)로, 반사파가 높게 남는다.",
     "즉 **matching network** 의 역할은 한 줄로: '챔버 임피던스를 50 Ω 으로 맞춰 **reflected power** 를 0에 가깝게 만든다'이다."
    ],
    "figs": [
     {
      "kind": "hmi",
      "tool": "PLASMA ETCH",
      "status": "RUN",
      "state": "run",
      "rows": [
       [
        "RF",
        "1480 W"
       ],
       [
        "Reflected",
        "85 W",
        "high"
       ],
       [
        "Match",
        "TUNING"
       ]
      ]
     },
     {
      "kind": "alarm",
      "level": "warn",
      "code": "E-1180",
      "en": "REFLECTED POWER HIGH",
      "ko": "반사전력 높음 — 매칭 확인"
     }
    ]
   },
   {
    "type": "read",
    "title": "Ignite와 Tune: 플라즈마 켜는 순서",
    "intro": "실제 절차에서 쓰이는 동사들 — ignite, strike, tune, stabilize — 를 순서로 이해하면 매뉴얼과 알람이 그대로 읽힌다.",
    "paras": [
     "**ignite the plasma** (또는 **strike the plasma**)는 '플라즈마를 점화한다'는 뜻으로, 가스를 넣고 RF 전력을 인가해 처음 방전을 일으키는 단계다. 화면에 **Plasma ON / Plasma detected** 가 뜨면 점화 성공이다.",
     "점화 직후에는 임피던스가 급격히 변하므로 반사파가 잠깐 튄다. 이때 **matching network** 가 **tune**(맞춤) 동작을 하며 반사파를 끌어내린다. 화면 순서는 대개 **RF ON → Igniting → Tuning → Stable** 이다.",
     "**tune** 은 '반사파가 최소가 되도록 매칭 값을 조정한다'는 뜻이다. **stabilize** 는 값이 안정되어 공정이 정상 진행되는 상태를 가리킨다.",
     "점화가 실패하면 **Failed to ignite** / **No plasma** 알람이 뜬다. 원인은 가스 유량 부족, 압력(pressure) 이상, 전력 부족, 매칭 불량 등이며 화면의 다른 값들과 함께 읽어 원인을 좁힌다.",
     "정상 사이클을 영어 흐름으로 외워 두면 좋다: **Set gas flow → Set pressure → RF ON → Ignite → Auto tune → Reflected drops to ~0 → Stable → Process runs.**",
     "현장에서 '**tune 이 안 잡힌다**'는 말은 곧 '반사파가 안 떨어진다', 즉 매칭 문제라는 뜻으로 통용된다."
    ],
    "figs": [
     {
      "kind": "note",
      "title": "TERM",
      "en": "[Strike] the plasma, then [tune] the match.",
      "ko": "플라즈마 점화(strike) 후 매칭 튜닝."
     },
     {
      "kind": "meter",
      "name": "Reflected Power",
      "sp": "< 20",
      "pv": "85",
      "unit": "W",
      "state": "high",
      "note": "반사전력 높음 → 매칭(matching) 이상."
     }
    ]
   },
   {
    "type": "read",
    "title": "HMI 화면 값 읽는 법",
    "intro": "이론을 실제 화면에 대입해 보자. 같은 화면이라도 어떤 값을 짝지어 읽느냐가 판단을 좌우한다.",
    "paras": [
     "화면 값은 항상 짝으로 읽는다: **Forward** 는 **Reflected** 와 함께, **Setpoint(SP)** 는 **Process Value(PV)** 와 함께. 예: **RF SP 1000 W / PV 995 W** 면 목표와 실제가 거의 같아 정상이다.",
     "**SP (Setpoint)** 는 우리가 설정한 목표값, **PV / Actual** 는 지금 측정되는 실제값이다. 둘의 차이가 크면 장비가 목표를 못 따라가고 있다는 신호다.",
     "색과 상태 텍스트도 정보다. **Reflected** 값이 초록/흰색이면 정상, 빨강 + **HIGH** 면 경고. **Match: AUTO** 는 자동 조정, **Match: MANUAL / HOLD** 는 수동 고정 상태를 뜻한다.",
     "단위를 반드시 확인한다: 전력은 **W (watt)**, 임피던스는 **Ω (ohm)**, 매칭 위치는 **% 또는 step**, 주파수는 **MHz**. 단위를 놓치면 값의 크기를 오판한다.",
     "정상 판단 체크: (1) **Forward ≈ Setpoint**, (2) **Reflected ≈ 0**, (3) **Match** 값이 양 끝단에 붙어 있지 않음, (4) 상태 텍스트가 **Stable / RUN**. 이 네 가지가 맞으면 '읽어서 정상'이라고 보고할 수 있다."
    ]
   },
   {
    "type": "acr",
    "title": "약어",
    "intro": "플라즈마 장비 화면과 매뉴얼에 반복되는 약어들이다. 뜻을 알면 화면이 문장으로 읽힌다.",
    "items": [
     {
      "ab": "RF",
      "full": "Radio Frequency",
      "ko": "고주파 — 플라즈마를 만드는 전력의 주파수"
     },
     {
      "ab": "Fwd",
      "full": "Forward Power",
      "ko": "발생기가 챔버로 내보내는 전력"
     },
     {
      "ab": "Ref",
      "full": "Reflected Power",
      "ko": "부하에서 되돌아온 전력(반사파)"
     },
     {
      "ab": "W",
      "full": "Watt",
      "ko": "전력의 단위"
     },
     {
      "ab": "SP",
      "full": "Setpoint",
      "ko": "설정 목표값"
     },
     {
      "ab": "PV",
      "full": "Process Value",
      "ko": "현재 측정 실제값"
     },
     {
      "ab": "MHz",
      "full": "Megahertz",
      "ko": "주파수 단위 (예: 13.56 MHz)"
     },
     {
      "ab": "VSWR",
      "full": "Voltage Standing Wave Ratio",
      "ko": "정재파비 — 정합 상태를 나타내는 값"
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 1 — 전력",
    "intro": "전력과 관련된 화면 용어. 각 예문은 실제 화면/보고에서 쓰이는 형태다.",
    "items": [
     {
      "en": "RF power",
      "ko": "고주파 전력",
      "d": "플라즈마를 발생·유지시키는 고주파 전기 에너지.",
      "ex": "Set the RF power to 1000 watts before igniting the plasma."
     },
     {
      "en": "forward power",
      "ko": "전진(순방향) 전력",
      "d": "발생기에서 챔버 쪽으로 나가는 전력.",
      "ex": "The forward power is holding steady at its setpoint."
     },
     {
      "en": "reflected power",
      "ko": "반사 전력(반사파)",
      "d": "부하에 흡수되지 못하고 되돌아온 전력.",
      "ex": "Reflected power is above 200 W, so the match is not tuned."
     },
     {
      "en": "delivered power",
      "ko": "전달 전력",
      "d": "실제로 플라즈마에 전달된 전력 (forward − reflected).",
      "ex": "Delivered power dropped because reflected power went up."
     }
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — 플라즈마 점화·정합",
    "doc": {
     "name": "PLASMA-ETCH Operating Manual",
     "no": "OM-PE",
     "sec": "5.3",
     "rev": "C",
     "page": "5-8"
    },
    "heading": "5.3  Igniting the Plasma and Tuning the Match",
    "steps": [
     "Confirm process pressure and gas flow are stable.",
     "Press RF ON to [strike] the plasma.",
     {
      "t": "Watch the reflected power; it must fall below 20 W.",
      "note": {
       "kind": "caution",
       "en": "High reflected power can damage the RF generator."
      }
     },
     "If reflected power stays high, set the match to AUTO TUNE."
    ],
    "callout": {
     "kind": "warning",
     "en": "PLASMA ON. Do not enter the chamber area."
    },
    "gloss": [
     [
      "strike",
      "점화(플라즈마 켜기)"
     ],
     [
      "reflected power",
      "반사전력"
     ],
     [
      "matching network",
      "매칭 회로"
     ],
     [
      "auto tune",
      "자동 정합"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 1",
    "intro": "화면 문장을 읽고 뜻을 고르시오.",
    "questions": [
     {
      "prompt": "\"Reflected power is above 200 W.\" 이 화면 메시지의 의미는?",
      "opts": [
       "전력이 정상적으로 플라즈마에 전달되고 있다",
       "전력의 상당 부분이 되돌아오고 있어 정합이 안 맞는 상태다",
       "발생기가 200 W만 출력하도록 설정되었다"
      ],
      "ans": 1
     },
     {
      "prompt": "\"Delivered power = Forward − Reflected\" 라는 식에서, Forward 800 W, Reflected 200 W 일 때 실제 전달 전력은?",
      "opts": [
       "약 600 W",
       "약 1000 W",
       "약 200 W"
      ],
      "ans": 0
     },
     {
      "prompt": "정상 상태에서 화면의 Reflected Power 값은 어떠해야 하는가?",
      "opts": [
       "Forward Power와 같아야 한다",
       "가능한 한 0 W에 가까워야 한다",
       "항상 높을수록 좋다"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 2 — 정합과 임피던스",
    "intro": "매칭 네트워크와 임피던스 관련 용어. 화면의 Tune/Load 값과 연결해 이해하자.",
    "items": [
     {
      "en": "matching network",
      "ko": "정합 회로",
      "d": "챔버 임피던스를 발생기(50 Ω)에 맞춰 반사파를 줄이는 장치.",
      "ex": "The matching network moves the capacitors to minimize reflected power."
     },
     {
      "en": "impedance",
      "ko": "임피던스",
      "d": "고주파에 대한 회로의 저항 성분(Ω).",
      "ex": "The chamber impedance changes as the plasma conditions change."
     },
     {
      "en": "impedance mismatch",
      "ko": "임피던스 부정합",
      "d": "발생기와 부하의 임피던스가 달라 전력이 반사되는 상태.",
      "ex": "An impedance mismatch causes high reflected power."
     },
     {
      "en": "auto tune",
      "ko": "자동 정합",
      "d": "장비가 매칭 값을 스스로 조정해 반사파를 최소화하는 동작.",
      "ex": "Leave the match in auto tune so it corrects the reflected power automatically."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 2",
    "intro": "용어의 의미를 판단하시오.",
    "questions": [
     {
      "prompt": "\"matching network\"의 주된 역할은 무엇인가?",
      "opts": [
       "가스 유량을 조절한다",
       "임피던스를 맞춰 반사파를 최소로 만든다",
       "웨이퍼 온도를 낮춘다"
      ],
      "ans": 1
     },
     {
      "prompt": "\"An impedance mismatch causes high reflected power.\" 문장이 뜻하는 인과관계는?",
      "opts": [
       "임피던스가 안 맞으면 반사파가 높아진다",
       "반사파가 높으면 전력이 자동으로 꺼진다",
       "임피던스가 맞으면 플라즈마가 꺼진다"
      ],
      "ans": 0
     },
     {
      "prompt": "화면에 \"Match: AUTO\"라고 떠 있다면?",
      "opts": [
       "매칭을 수동으로 고정한 상태다",
       "장비가 매칭 값을 스스로 조정 중인 상태다",
       "매칭 회로가 고장 난 상태다"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 3 — 점화 동작",
    "intro": "플라즈마를 켜고 안정화하는 절차 동사들. 매뉴얼 명령문에 그대로 등장한다.",
    "items": [
     {
      "en": "ignite (the plasma)",
      "ko": "점화하다",
      "d": "가스에 RF를 걸어 플라즈마 방전을 처음 일으키다.",
      "ex": "The system will ignite the plasma once the pressure is stable."
     },
     {
      "en": "strike",
      "ko": "(플라즈마를) 발생시키다",
      "d": "ignite와 같은 의미로 최초 방전을 일으키다.",
      "ex": "The plasma failed to strike, so check the gas flow."
     },
     {
      "en": "tune",
      "ko": "정합을 맞추다",
      "d": "반사파가 최소가 되도록 매칭을 조정하다.",
      "ex": "Wait for the match to tune before starting the process."
     },
     {
      "en": "stabilize",
      "ko": "안정화되다",
      "d": "전력·반사파 값이 안정되어 공정이 정상 진행되다.",
      "ex": "Once the readings stabilize, the recipe step will proceed."
     }
    ],
    "figs": [
     {
      "kind": "sticker",
      "level": "danger",
      "en": "PLASMA ON — DO NOT ENTER",
      "ko": "플라즈마 작동 — 출입 금지"
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 3",
    "intro": "절차 문장을 읽고 뜻을 고르시오.",
    "questions": [
     {
      "prompt": "\"The plasma failed to strike.\" 화면 알람의 의미는?",
      "opts": [
       "플라즈마가 점화되지 않았다",
       "플라즈마가 너무 강하게 켜졌다",
       "웨이퍼가 파손되었다"
      ],
      "ans": 0
     },
     {
      "prompt": "\"Wait for the match to tune before starting the process.\" 이 지시가 요구하는 행동은?",
      "opts": [
       "즉시 공정을 시작하라",
       "매칭이 정합을 맞출 때까지 기다린 뒤 공정을 시작하라",
       "매칭을 수동으로 꺼라"
      ],
      "ans": 1
     },
     {
      "prompt": "정상 점화 순서로 알맞은 것은?",
      "opts": [
       "RF ON → Ignite → Auto tune → Stable",
       "Stable → RF OFF → Ignite → Tune",
       "Reflected HIGH → Ignite → RF OFF"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 4 — 화면 상태",
    "intro": "화면 값을 짝지어 읽을 때 필요한 상태·단위 용어.",
    "items": [
     {
      "en": "setpoint",
      "ko": "설정값",
      "d": "장비에 설정한 목표 파라미터 값.",
      "ex": "The forward power reached its setpoint of 1000 W."
     },
     {
      "en": "process value",
      "ko": "실제값",
      "d": "현재 측정되는 실제 파라미터 값.",
      "ex": "The process value is close to the setpoint, so it is normal."
     },
     {
      "en": "VSWR",
      "ko": "정재파비",
      "d": "정합 정도를 나타내는 비율, 1.0에 가까울수록 좋다.",
      "ex": "A VSWR near 1.0 means almost no reflected power."
     },
     {
      "en": "match at limit",
      "ko": "정합 한계 도달",
      "d": "매칭 커패시터가 끝단에 붙어 더 조정할 수 없는 상태.",
      "ex": "The match is at limit, so it cannot reduce the reflected power."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 4",
    "intro": "화면 값 판단.",
    "questions": [
     {
      "prompt": "\"RF SP 1000 W / PV 995 W\" 를 어떻게 읽어야 하는가?",
      "opts": [
       "목표 1000 W에 실제 995 W로 거의 일치 — 정상",
       "목표와 실제가 크게 달라 이상",
       "발생기가 고장 나 값이 뜨지 않음"
      ],
      "ans": 0
     },
     {
      "prompt": "\"The match is at limit\" 상태가 문제인 이유는?",
      "opts": [
       "매칭이 더 조정할 수 없어 반사파를 못 줄인다",
       "매칭이 완벽하게 맞았다는 뜻이다",
       "전력이 자동으로 올라간다"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "manual",
    "mtitle": "OPERATING PROCEDURE — PLASMA IGNITION",
    "paras": [
     "1. Confirm that the process gas flow and chamber pressure have reached their setpoints before applying RF power.",
     "1. RF 전력을 인가하기 전에 공정 가스 유량과 챔버 압력이 설정값에 도달했는지 확인한다.",
     "2. Turn RF power ON and allow the system to ignite the plasma automatically.",
     "2. RF 전력을 ON 하고 시스템이 자동으로 플라즈마를 점화하도록 둔다.",
     "3. Keep the matching network in AUTO mode so it can tune and minimize reflected power.",
     "3. 매칭 네트워크를 AUTO 모드로 유지하여 정합을 맞추고 반사파를 최소화하게 한다.",
     "4. Verify that reflected power drops to nearly 0 W and the readings stabilize.",
     "4. 반사파가 거의 0 W까지 떨어지고 값들이 안정화되는지 확인한다.",
     "5. If the plasma fails to ignite, do NOT increase the RF power repeatedly; check gas flow, pressure, and the match position first.",
     "5. 플라즈마가 점화되지 않으면 RF 전력을 반복해서 올리지 말고, 먼저 가스 유량·압력·매칭 위치를 점검한다."
    ]
   },
   {
    "type": "manual",
    "mtitle": "WARNING — HIGH REFLECTED POWER",
    "paras": [
     "WARNING: Sustained high reflected power can damage the RF generator and its output components.",
     "경고: 반사파가 높은 상태가 지속되면 RF 발생기와 출력 부품이 손상될 수 있다.",
     "If the reflected power exceeds the alarm limit, the generator will automatically turn RF OFF to protect itself.",
     "반사파가 알람 한계를 초과하면 발생기는 자기 보호를 위해 자동으로 RF를 OFF 한다.",
     "NOTE: A reflected power alarm usually indicates an impedance mismatch or a match unit stuck at limit.",
     "참고: 반사파 알람은 대개 임피던스 부정합 또는 매칭 유닛이 한계에 걸린 상태를 나타낸다.",
     "Do not restart the RF power until the cause of the mismatch has been identified and cleared.",
     "부정합의 원인을 확인하고 해소하기 전에는 RF 전력을 다시 켜지 않는다."
    ]
   },
   {
    "type": "sim",
    "which": "chamber",
    "mode": "ignite",
    "intro": "아래 챔버 시뮬레이터에서 가스와 압력을 설정한 뒤 RF를 인가해 플라즈마가 점화되는 과정을 관찰하세요. 화면의 Forward / Reflected 값이 어떻게 변하는지, 그리고 언제 'Stable' 상태가 되는지 눈으로 확인하는 것이 목표입니다."
   },
   {
    "type": "sim",
    "which": "devicePanel",
    "mode": "rf",
    "intro": "이 장치 패널에서 RF Power의 Setpoint와 Process Value, 그리고 Reflected Power 값을 직접 읽어 보세요. Reflected 값이 빨갛게 변할 때 무엇이 '정상'이고 무엇이 '경고'인지 판단하는 연습입니다. 값의 단위(W)도 함께 확인하세요."
   },
   {
    "type": "sim",
    "which": "equipment",
    "mode": "match",
    "intro": "장비 전체 화면에서 매칭 네트워크(Match: AUTO)의 Load / Tune 위치 값을 관찰하세요. Auto tune이 동작하면서 Reflected가 0에 가까워지는 흐름과, 매칭이 한계(at limit)에 걸렸을 때 반사파가 남는 상황을 비교해 읽어 보세요."
   },
   {
    "type": "comm",
    "items": [
     {
      "sit": "새벽 교대, 외국인 엔지니어가 반사파 알람을 함께 보며 묻는다.",
      "q": {
       "en": "The reflected power is over 200 watts. Can you read me the forward power and the match position?",
       "ko": "반사파가 200와트를 넘었어요. 전진 전력과 매칭 위치 값을 읽어 줄래요?"
      },
      "a": {
       "en": "Forward is 800 watts, and the match shows Load 12 percent, Tune 98 percent — it looks like it's at limit.",
       "ko": "전진 전력은 800와트이고, 매칭은 Load 12%, Tune 98%입니다 — 한계에 걸린 것 같아요."
      }
     },
     {
      "sit": "엔지니어가 원인을 좁히려 한다.",
      "q": {
       "en": "So the plasma ignited but the match can't tune it. Did the chamber pressure reach its setpoint?",
       "ko": "그럼 플라즈마는 점화됐는데 매칭이 못 맞추는 거네요. 챔버 압력은 설정값에 도달했나요?"
      },
      "a": {
       "en": "The pressure setpoint is 50 millitorr, but the process value is only 30 — it hasn't reached the setpoint.",
       "ko": "압력 설정값은 50밀리토르인데 실제값은 30뿐입니다 — 설정값에 도달하지 못했어요."
      }
     },
     {
      "sit": "조치를 결정한다.",
      "q": {
       "en": "Good catch. Turn RF off first, then let the pressure stabilize before we ignite again.",
       "ko": "잘 봤어요. 먼저 RF를 끄고, 다시 점화하기 전에 압력을 안정화시킵시다."
      },
      "a": {
       "en": "Understood. I'll turn RF off now and wait for the pressure to reach setpoint before igniting.",
       "ko": "알겠습니다. 지금 RF를 끄고 압력이 설정값에 도달할 때까지 기다린 뒤 점화하겠습니다."
      }
     }
    ]
   },
   {
    "type": "wrap",
    "title": "정리",
    "points": [
     "**RF power (Forward Power)** 는 발생기가 챔버로 내보내는 전력, **Reflected Power** 는 되돌아온 전력이며 정상에서는 0에 가까워야 한다.",
     "실제 전달 전력은 **Delivered = Forward − Reflected** — 반사파가 크면 전력이 낭비되고 발생기가 손상될 수 있다.",
     "**Matching network** 는 챔버 **impedance** 를 50 Ω에 맞춰 반사파를 줄인다. **Match: AUTO**, **auto tune**, **at limit** 을 읽을 수 있어야 한다.",
     "점화 흐름: **RF ON → Ignite → Tune → Reflected ≈ 0 → Stable**. **Failed to ignite / High reflected** 알람은 가스·압력·매칭부터 점검한다.",
     "화면은 항상 짝으로 읽는다: **SP vs PV**, **Forward vs Reflected**, 그리고 단위(**W, Ω, MHz, %**)를 확인한다."
    ],
    "done": "이제 플라즈마 장비 화면에서 **반사파(reflected power)** 의 의미를 읽고 정상/경고를 스스로 판단할 수 있습니다. **잘 하셨습니다!**",
    "figs": [
     {
      "kind": "buttons",
      "items": [
       [
        "RF ON",
        "go"
       ],
       [
        "TUNE",
        "warn"
       ],
       [
        "RF OFF",
        "stop"
       ]
      ]
     }
    ]
   }
  ]
 },
 {
  "id": "w6",
  "title": "알람과 조치",
  "slides": [
   {
    "type": "story",
    "icon": "🚨",
    "title": "빨간 램프가 켜졌다",
    "text": "새벽 3시, 식각(etch) 장비의 타워 램프가 초록에서 빨강으로 바뀌고 로봇이 멈춘다. HMI 화면에는 붉은 글씨로 **ALARM: RF POWER FAILURE — Reflected power exceeded limit**이 떠 있다. 신입 기술자 지훈은 반사적으로 **RESET** 버튼에 손을 뻗었지만, 사수가 말린다. \"먼저 읽어. **alarm**인지 **warning**인지, **interlock**이 걸린 건지부터 봐야 해.\" 화면 아래에는 작은 글씨로 **INTERLOCK ACTIVE — Chamber door open**도 함께 떠 있었다. 만약 지훈이 그냥 리셋을 눌렀다면, 도어가 열린 채로 공정이 재개되어 위험한 상황이 벌어졌을 것이다. 이 장에서 우리는 화면과 매뉴얼에 뜨는 영어 알람 문장을 **읽고**, 무엇을 **먼저** 할지 **판단**하는 법을 배운다. 현장에서 영어는 쓰는 것이 아니라 정확히 읽고 조치를 결정하는 도구다.",
    "art": "alarm"
   },
   {
    "type": "scene",
    "title": "오늘의 현장 · 상황 설정",
    "where": "라인 한복판, 빨간 경보등이 돌아가는 장비 앞.",
    "tool": "HMI 알람 배너와 경보등(beacon).",
    "situation": "갑자기 알람이 울린다. INTERLOCK이 걸렸다. 무엇을 눌러야 하나?",
    "meet": [
     "알람 코드 · 문구",
     "INTERLOCK · TIMEOUT",
     "버튼 ABORT·RESET",
     "FAULT 화면"
    ],
    "goal": "알람 문구를 읽어 원인과 조치를 판단하기.",
    "bg": "w6"
   },
   {
    "type": "read",
    "title": "알람이란 무엇인가 — 장비가 보내는 신호",
    "intro": "알람은 장비가 \"정상 범위를 벗어났다\"고 사람에게 알리는 표준화된 메시지다.",
    "paras": [
     "**Alarm(알람)**은 공정 값이나 장비 상태가 미리 정해진 허용 범위(limit)를 벗어났을 때 자동으로 발생한다. 대부분의 장비는 알람이 뜨는 순간 공정을 **stop(정지)**하거나 **hold(대기)** 상태로 전환한다.",
     "화면에서 알람은 보통 **빨간색(red)** 텍스트와 타워 램프로 표시되고, 각 알람에는 고유한 **alarm code(알람 코드)**와 한 줄짜리 영어 **message(메시지)**가 붙는다. 예: **ALM-1203: Chamber pressure out of range**.",
     "알람은 원인과 시간이 기록되는 **alarm log / alarm history(알람 이력)**에 남는다. 기술자는 코드와 발생 시각(**timestamp**)을 읽어 나중에 엔지니어에게 정확히 보고할 수 있어야 한다.",
     "중요한 점: 알람 메시지는 \"무엇이 잘못됐는지\"를 알려줄 뿐, \"눌러도 되는지\"를 말해주지 않는다. 그래서 기술자의 **판단(judgement)**이 필요하다 — 읽고, 종류를 구분하고, 안전 조건을 확인한 뒤 조치한다.",
     "알람의 심각도는 색과 단어로 구분된다. **information / warning / alarm / critical(interlock)** 순으로 위험도가 올라가며, 단어 하나가 \"지금 멈춰라\"인지 \"곧 문제될 수 있다\"인지를 결정한다."
    ],
    "figs": [
     {
      "kind": "alarm",
      "level": "danger",
      "code": "E-0421",
      "en": "INTERLOCK NOT SATISFIED",
      "ko": "인터락 미충족 — 시작 불가"
     }
    ]
   },
   {
    "type": "read",
    "title": "Alarm vs Warning vs Interlock — 세 단어의 차이",
    "intro": "가장 먼저 구분해야 할 세 단어. 이 구분이 조치의 순서를 결정한다.",
    "paras": [
     "**Warning(경고)**는 아직 공정을 멈추지는 않지만 \"이대로 가면 곧 알람\"이라는 예고다. 예: **WARNING: Chamber temperature approaching upper limit**. 보통 노란색(yellow)으로 표시되며, 기술자는 상황을 관찰하고 원인을 미리 조치할 수 있다.",
     "**Alarm(알람)**은 실제로 한계를 벗어나 공정이 정지된 상태다. 예: **ALARM: Gas flow below setpoint**. 원인을 확인하고 조치한 뒤 **reset**해야 재개할 수 있다.",
     "**Interlock(인터록)**은 안전/설비 보호를 위한 강제 잠금이다. 도어 열림, 압력 이상, EMO 눌림 같은 **안전 조건(safety condition)**이 만족되지 않으면 장비가 절대 동작하지 못하게 막는다. 예: **INTERLOCK: Chamber door open**.",
     "핵심 차이: 일반 알람은 원인을 없애면 리셋되지만, **인터록은 안전 조건 자체를 물리적으로 해소하기 전에는 절대 리셋되지 않으며, 억지로 리셋하려 해서는 안 된다.** 화면의 **INTERLOCK ACTIVE**는 \"사람이 다칠 수 있다\"는 최고 우선순위 신호다.",
     "따라서 여러 메시지가 동시에 뜨면 읽는 순서는 항상 **interlock → alarm → warning**이다. 가장 위험한 것부터 읽고, 안전 조건을 먼저 확인한다."
    ]
   },
   {
    "type": "read",
    "title": "Timeout · Failure · Abort — 실패의 종류를 읽기",
    "intro": "알람 문장에 자주 등장하는 세 가지 실패 유형. 원인이 다르면 조치도 다르다.",
    "paras": [
     "**Timeout(타임아웃)**은 어떤 단계가 정해진 시간 안에 완료되지 않았을 때 발생한다. 예: **TIMEOUT: Vacuum not reached within 120 s**. 이는 밸브, 펌프, 누설(leak) 등 \"완료를 막는 원인\"이 있음을 뜻하므로, 단순 리셋이 아니라 원인 점검이 필요하다.",
     "**Failure / Fault(실패·고장)**는 부품이나 신호 자체가 정상 응답을 하지 못한 상태다. 예: **RF POWER FAILURE**, **PUMP FAULT**. 하드웨어 문제일 가능성이 높아 대개 엔지니어 호출 대상이다.",
     "**Abort(중단)**는 진행 중이던 공정이나 동작이 도중에 강제로 취소된 것이다. 예: **PROCESS ABORTED by interlock**. \"누가/무엇이\" 중단시켰는지(by ~)를 읽는 것이 원인 파악의 핵심이다.",
     "이 단어들은 종종 한 문장에 겹쳐 나온다. 예: **Step aborted due to pump-down timeout** — \"펌프다운 타임아웃 때문에 스텝이 중단됨\". 각 단어를 분해해 읽으면 원인 사슬(cause chain)이 보인다.",
     "판단 요령: **timeout**은 대기·재시도로 회복될 때가 있지만, **failure/fault**는 하드웨어 조치가 필요하고, **abort**는 무엇이 트리거(trigger)했는지를 먼저 찾아야 한다. 문장의 동사와 명사를 정확히 읽는 것이 곧 조치의 방향이다."
    ],
    "figs": [
     {
      "kind": "alarm",
      "level": "warn",
      "code": "W-0307",
      "en": "PROCESS TIMEOUT",
      "ko": "공정 시간 초과"
     }
    ]
   },
   {
    "type": "read",
    "title": "Reset · Recovery — 되돌리기 전에 확인할 것",
    "intro": "알람을 지우고 장비를 정상으로 되돌리는 절차. 순서를 지키지 않으면 위험하다.",
    "paras": [
     "**Acknowledge(ACK, 확인)**는 \"이 알람을 봤다\"고 시스템에 알리는 첫 동작이다. ACK를 눌러도 원인이 사라지는 것은 아니며, 단지 알람음/깜빡임을 멈추고 이력에 확인 시각을 남긴다.",
     "**Reset(리셋)**은 알람 상태를 해제하고 장비를 **IDLE/READY** 상태로 되돌리는 동작이다. 반드시 **원인을 해소(clear the cause)한 뒤에만** 눌러야 한다. 원인이 남은 채 리셋하면 같은 알람이 즉시 다시 뜨거나, 인터록이라면 위험을 초래한다.",
     "**Recovery(복구)**는 정지 지점에서 공정을 안전하게 재개하거나 초기 상태로 되돌리는 전체 과정을 말한다. 화면의 **Recovery** 메뉴는 보통 단계별(step-by-step) 안내를 제공한다.",
     "표준 순서는 대개 이렇다: (1) 메시지 **읽기(read)** → (2) 안전/인터록 조건 **확인(verify)** → (3) 원인 **조치(clear)** → (4) **ACK** → (5) **RESET** → (6) 상태가 **READY**인지 **확인** → (7) 재개(resume) 또는 엔지니어 보고.",
     "**Override(강제 해제)**는 인터록이나 안전 조건을 사람이 임의로 무시하는 기능으로, 권한이 있는 엔지니어만 사용해야 한다. 매뉴얼에 **Do NOT override**라고 적혀 있으면 절대 눌러서는 안 된다."
    ],
    "figs": [
     {
      "kind": "note",
      "title": "RESPONSE",
      "en": "[Acknowledge] the alarm, then find the cause.",
      "ko": "알람 확인(ACK) 후 원인 파악."
     }
    ]
   },
   {
    "type": "read",
    "title": "화면(HMI)에서 알람 읽기 — 어디를 보나",
    "intro": "실제 장비 GUI에서 알람 정보는 정해진 위치와 형식으로 표시된다.",
    "paras": [
     "**Status bar(상태 표시줄)**: 화면 상단 또는 하단에 장비 상태가 영어 한 단어로 뜬다 — **RUN / IDLE / READY / HOLD / DOWN / ALARM**. 이 단어만 봐도 지금 장비가 돌 수 있는지 없는지를 알 수 있다.",
     "**Alarm banner(알람 배너)**: 붉은 띠에 **code + message + timestamp**가 표시된다. 형식은 보통 **[ALM-1203] 03:14:07 Chamber pressure out of range**처럼 코드-시각-문장 순이다.",
     "**Active vs History(현재 vs 이력)**: **Active alarms**는 아직 해소되지 않아 지금 조치가 필요한 알람이고, **Alarm history**는 지나간 기록이다. 조치할 때는 반드시 **Active** 목록을 먼저 본다.",
     "**Severity color(심각도 색)**: 대부분 빨강=alarm/critical, 노랑=warning, 파랑/회색=information. 색과 단어를 함께 읽어 우선순위를 정한다.",
     "**Help / Guidance 링크**: 알람을 누르면 **Probable cause(추정 원인)**와 **Recommended action(권장 조치)** 영어 설명이 나오는 장비가 많다. 이 두 항목을 읽는 습관이 오조작을 막는다.",
     "정리하면, 기술자는 화면에서 항상 이 순서로 눈을 움직인다: 상태 단어 → 인터록 여부 → 알람 코드/문장 → 추정 원인 → 권장 조치. 읽는 순서가 곧 안전이다."
    ]
   },
   {
    "type": "read",
    "title": "알람은 '문장'이 아니라 '상태 조각'이다",
    "intro": "실제 알람 배너는 예의 바른 문장이 아니라, 원인·상태를 압축한 짧은 조각이다. 이 형태에 익숙해져야 빨리 판단한다.",
    "paras": [
     "실제 배너 예시: **Interlock not satisfied**(인터록 조건 미충족), **Chamber pressure out of spec**(챔버 압력 규격 이탈), **Reflected power high — Process abort**(반사파 높음 → 공정 중단), **Water flow low — Warning**(냉각수 유량 낮음, 경고).",
     "알람에는 **심각도 등급**이 붙는다(SECS/GEM 표준). **personal safety**(인명 안전) > **equipment safety**(장비 안전) > **parameter control**(공정 파라미터) > **others**. 등급 단어를 먼저 보고 긴장도를 정한다.",
     "색으로도 등급을 준다. 보통 **Blue = Warning**(주의), **Red = Process abort / Fault**(중단·고장). 색과 텍스트를 함께 읽는다.",
     "알람을 지우는 동작도 딱딱한 동사다: **Accept / Acknowledge**(확인해 로그에 남김), **Silence**(경보음만 끔), **Reset**(원인 해소 후 해제). 'Acknowledge'는 문제 해결이 아니라 그냥 '봤음'이다.",
     "핵심: 알람을 완전문장으로 기대하지 말고 **[대상] + [상태/문제] + [조치]** 조각으로 끊어 읽어라. 예: **APC valve / stuck / abort**."
    ],
    "figs": [
     {
      "kind": "buttons",
      "items": [
       [
        "ABORT",
        "stop"
       ],
       [
        "RESET",
        "warn"
       ],
       [
        "ACK",
        "n"
       ]
      ]
     },
     {
      "kind": "sticker",
      "level": "warn",
      "en": "FAULT — DO NOT RESTART",
      "ko": "고장 — 임의 재가동 금지"
     }
    ]
   },
   {
    "type": "acr",
    "title": "약어",
    "intro": "알람 화면과 매뉴얼에서 반복적으로 만나는 핵심 약어들이다.",
    "items": [
     {
      "ab": "ALM",
      "full": "Alarm",
      "ko": "알람 — 정상 범위를 벗어나 발생하는 경보"
     },
     {
      "ab": "WARN",
      "full": "Warning",
      "ko": "경고 — 아직 정지 전이지만 주의가 필요한 상태"
     },
     {
      "ab": "INTLK",
      "full": "Interlock",
      "ko": "인터록 — 안전 조건 미충족 시 강제 잠금"
     },
     {
      "ab": "EMO",
      "full": "Emergency Off",
      "ko": "비상 정지 — 눌리면 즉시 전원/동작 차단"
     },
     {
      "ab": "ACK",
      "full": "Acknowledge",
      "ko": "알람 확인 — \"봤음\"을 시스템에 등록"
     },
     {
      "ab": "RST",
      "full": "Reset",
      "ko": "리셋 — 원인 해소 후 알람 상태 해제"
     },
     {
      "ab": "FDC",
      "full": "Fault Detection and Classification",
      "ko": "이상 감지·분류 시스템 — 실패 원인을 자동 분류"
     }
    ],
    "figs": [
     {
      "kind": "sticker",
      "level": "danger",
      "en": "EMERGENCY OFF",
      "ko": "비상 정지(E-STOP)"
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 어휘 (1) — 알람의 상태어",
    "intro": "알람 문장의 뼈대가 되는 상태·심각도 단어들이다.",
    "items": [
     {
      "en": "Alarm",
      "ko": "알람, 경보",
      "d": "허용 범위를 벗어나 발생하며 보통 장비를 정지시키는 경보",
      "ex": "An alarm was triggered when the chamber pressure exceeded the limit."
     },
     {
      "en": "Warning",
      "ko": "경고",
      "d": "정지 전 단계로, 곧 문제가 될 수 있음을 미리 알리는 신호",
      "ex": "The screen shows a warning that the gas supply is running low."
     },
     {
      "en": "Interlock",
      "ko": "인터록, 안전 잠금",
      "d": "안전 조건이 만족되지 않으면 동작을 강제로 막는 보호 기능",
      "ex": "The interlock will not release until the chamber door is closed."
     },
     {
      "en": "Fault",
      "ko": "고장, 이상",
      "d": "부품이나 신호가 정상 응답을 하지 못하는 상태",
      "ex": "A pump fault stopped the tool during pump-down."
     },
     {
      "en": "Abort",
      "ko": "중단, 강제 취소",
      "d": "진행 중이던 동작이나 공정이 도중에 취소되는 것",
      "ex": "The process was aborted by the safety interlock."
     }
    ],
    "figs": [
     {
      "kind": "hmi",
      "tool": "EQP-204",
      "status": "FAULT",
      "state": "fault",
      "rows": [
       [
        "Chamber",
        "DOOR OPEN",
        "bad"
       ],
       [
        "Vacuum",
        "LOST",
        "bad"
       ]
      ],
      "banner": {
       "level": "danger",
       "en": "ABORT — CHECK INTERLOCK",
       "ko": "중단 — 인터락 확인"
      }
     }
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — 인터락 알람 해제",
    "doc": {
     "name": "EQP-204 Operating Manual",
     "no": "OM-204",
     "sec": "7.1",
     "rev": "B",
     "page": "7-2"
    },
    "heading": "7.1  Clearing an Interlock Alarm",
    "steps": [
     "Read the alarm code and message on the banner.",
     {
      "t": "Identify the unsatisfied interlock (e.g., DOOR OPEN, VACUUM LOST).",
      "note": {
       "kind": "note",
       "en": "\"INTERLOCK NOT SATISFIED\" means a safety condition is not met."
      }
     },
     "Correct the condition (close the door, restore vacuum).",
     "Press [ACK] to acknowledge, then [RESET] to clear the alarm."
    ],
    "callout": {
     "kind": "warning",
     "en": "Do NOT bypass an interlock. Bypassing may cause injury or tool damage."
    },
    "gloss": [
     [
      "interlock",
      "안전 연동"
     ],
     [
      "acknowledge (ACK)",
      "확인 처리"
     ],
     [
      "reset",
      "해제"
     ],
     [
      "bypass",
      "우회(무시)"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (1)",
    "intro": "다음 영어 표현의 의미를 고르시오.",
    "questions": [
     {
      "prompt": "화면에 'INTERLOCK: Chamber door open'이 떠 있다. 무슨 뜻인가?",
      "opts": [
       "챔버 도어가 열려 있어 안전 잠금이 걸렸다 — 도어를 닫기 전에는 동작하지 않는다",
       "챔버 도어를 열라는 작업 지시다",
       "도어 센서를 교체할 시간이라는 정기 점검 알림이다"
      ],
      "ans": 0
     },
     {
      "prompt": "'The process was aborted by the safety interlock.'의 의미는?",
      "opts": [
       "공정이 정상적으로 완료되었다",
       "안전 인터록에 의해 공정이 도중에 강제 취소되었다",
       "공정을 다시 시작하라는 뜻이다"
      ],
      "ans": 1
     },
     {
      "prompt": "노란색 'WARNING: Gas supply running low'가 뜬 상태다. 지금 상황은?",
      "opts": [
       "장비가 이미 정지되어 즉시 리셋해야 한다",
       "정지는 아니지만 가스가 부족해지고 있어 곧 알람이 될 수 있다",
       "가스 공급이 완전히 차단되어 위험하다"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 어휘 (2) — 조치 동작어",
    "intro": "알람에 대응할 때 버튼과 매뉴얼에 등장하는 동사들이다.",
    "items": [
     {
      "en": "Reset",
      "ko": "리셋, 초기화",
      "d": "원인을 해소한 뒤 알람 상태를 해제하고 장비를 대기로 되돌림",
      "ex": "Do not press reset until the root cause has been cleared."
     },
     {
      "en": "Acknowledge (ACK)",
      "ko": "확인 처리",
      "d": "알람을 봤다고 시스템에 등록해 경보음/깜빡임을 멈춤",
      "ex": "Press ACK to acknowledge the alarm before resetting the tool."
     },
     {
      "en": "Clear",
      "ko": "해소하다, 지우다",
      "d": "알람의 원인을 없애거나 메시지를 제거하는 것",
      "ex": "Clear the blockage in the exhaust line, then reset the alarm."
     },
     {
      "en": "Recover / Recovery",
      "ko": "복구(하다)",
      "d": "정지된 장비를 안전하게 정상 상태로 되돌리는 과정",
      "ex": "Follow the recovery steps shown on the HMI to return the tool to idle."
     },
     {
      "en": "Override",
      "ko": "강제 해제, 무시",
      "d": "안전 조건이나 인터록을 사람이 임의로 무시하는 기능(권한 필요)",
      "ex": "Never override an active interlock without engineer approval."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (2)",
    "intro": "다음 매뉴얼 문장을 읽고 올바른 조치를 고르시오.",
    "questions": [
     {
      "prompt": "매뉴얼: 'Do NOT press RESET until the root cause has been identified and cleared.' 올바른 행동은?",
      "opts": [
       "알람이 뜨면 즉시 리셋부터 누른다",
       "원인을 찾아 해소한 뒤에만 리셋을 누른다",
       "리셋 버튼을 절대 사용하지 않는다"
      ],
      "ans": 1
     },
     {
      "prompt": "'Press ACK to acknowledge the alarm.'에서 ACK를 누르면 일어나는 일은?",
      "opts": [
       "알람 원인이 자동으로 제거된다",
       "알람을 확인 처리하여 경보음/깜빡임을 멈추지만 원인은 그대로다",
       "장비가 즉시 공정을 재개한다"
      ],
      "ans": 1
     },
     {
      "prompt": "'Never override an active interlock without engineer approval.'의 뜻은?",
      "opts": [
       "인터록은 언제든 자유롭게 강제 해제해도 된다",
       "엔지니어 승인 없이는 작동 중인 인터록을 강제 해제하지 말라",
       "인터록이 뜨면 즉시 엔지니어가 리셋한다"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 어휘 (3) — 원인과 현상어",
    "intro": "알람 문장에서 \"왜 발생했는가\"를 설명하는 단어들이다.",
    "items": [
     {
      "en": "Timeout",
      "ko": "시간 초과",
      "d": "정해진 시간 안에 단계가 완료되지 않아 발생하는 알람",
      "ex": "A timeout alarm means the step did not finish within the allowed time."
     },
     {
      "en": "Sensor",
      "ko": "센서",
      "d": "온도·압력·유량 등을 측정해 알람 판단의 근거가 되는 소자",
      "ex": "The pressure sensor reading dropped below the setpoint."
     },
     {
      "en": "Threshold / Limit",
      "ko": "임계값, 한계",
      "d": "이 값을 넘으면 알람이 발생하는 기준선",
      "ex": "Reflected power exceeded the threshold and triggered the alarm."
     },
     {
      "en": "Trip",
      "ko": "차단 동작, 트립",
      "d": "보호 장치가 작동해 전원이나 동작을 끊는 것",
      "ex": "The high-temperature trip shut down the heater automatically."
     },
     {
      "en": "Latch",
      "ko": "래치, 상태 유지",
      "d": "리셋 전까지 알람 상태가 그대로 유지되도록 붙잡아 두는 것",
      "ex": "The alarm is latched, so it stays active until you reset it manually."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (3)",
    "intro": "다음 알람 문장의 의미를 정확히 해석하시오.",
    "questions": [
     {
      "prompt": "'TIMEOUT: Vacuum not reached within 120 s'의 의미는?",
      "opts": [
       "120초 안에 진공에 도달하지 못해 시간 초과 알람이 발생했다",
       "진공이 120초 동안 정상 유지되었다",
       "120초 후 자동으로 공정이 완료된다"
      ],
      "ans": 0
     },
     {
      "prompt": "'The alarm is latched.'가 뜻하는 바는?",
      "opts": [
       "알람이 잠시 후 자동으로 사라진다",
       "수동으로 리셋하기 전까지 알람 상태가 계속 유지된다",
       "알람이 이미 해제되었다"
      ],
      "ans": 1
     },
     {
      "prompt": "'Reflected power exceeded the threshold.'에서 무슨 일이 일어났나?",
      "opts": [
       "반사 전력이 기준 한계값을 넘었다",
       "반사 전력이 정상 범위 안에 들어왔다",
       "전력 센서를 교체해야 한다"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 어휘 (4) — 실제 알람 배너 표현(청크)",
    "intro": "낱단어가 아니라, 배너에 그대로 뜨는 '덩어리 표현(청크)'으로 익히자.",
    "items": [
     {
      "en": "out of spec (OOS)",
      "ko": "규격 이탈",
      "d": "값이 허용 범위를 벗어남.",
      "ex": "Chamber pressure is out of spec."
     },
     {
      "en": "interlock not satisfied",
      "ko": "인터록 미충족",
      "d": "안전 조건이 안 맞아 동작이 막힘.",
      "ex": "The tool won't start: interlock not satisfied."
     },
     {
      "en": "reflected power high",
      "ko": "반사파 높음",
      "d": "매칭 불량으로 RF가 되돌아옴 → 흔히 abort.",
      "ex": "Reflected power high — check the matching network."
     },
     {
      "en": "process abort",
      "ko": "공정 중단",
      "d": "심각 알람으로 공정을 즉시 멈춤.",
      "ex": "Reflected power high triggered a process abort."
     },
     {
      "en": "water flow low",
      "ko": "냉각수 유량 낮음",
      "d": "냉각 부족 경고. 보통 Warning 등급.",
      "ex": "Water flow low — do not ignite the plasma."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "종합 판단 퀴즈",
    "intro": "여러 메시지가 동시에 떴을 때 '무엇을 먼저' 할지 판단하시오.",
    "questions": [
     {
      "prompt": "화면에 'INTERLOCK: Chamber door open'과 'ALARM: RF power failure'가 동시에 떠 있다. 가장 먼저 할 일은?",
      "opts": [
       "바로 RESET을 눌러 둘 다 지운다",
       "인터록부터 확인해 도어를 닫는 등 안전 조건을 먼저 해소한다",
       "RF 파워 케이블을 즉시 교체한다"
      ],
      "ans": 1
     },
     {
      "prompt": "'Step aborted due to pump-down timeout'을 읽었다. 원인 사슬로 옳은 것은?",
      "opts": [
       "펌프다운이 시간 초과되어 그 결과 스텝이 중단되었다",
       "스텝을 일부러 중단시켜 펌프를 껐다",
       "타임아웃이 스텝 완료를 알리는 정상 신호다"
      ],
      "ans": 0
     },
     {
      "prompt": "조치 후 재개 전, 상태 표시줄에서 반드시 확인해야 할 단어는?",
      "opts": [
       "상태가 READY(또는 IDLE)인지 확인한다",
       "상태가 ALARM인 채로 바로 RUN 시킨다",
       "상태 단어는 무시하고 로트를 투입한다"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "manual",
    "mtitle": "ALARM RESPONSE PROCEDURE",
    "paras": [
     "When an alarm is triggered, the equipment stops automatically and the alarm lamp turns red.",
     "알람이 발생하면 장비는 자동으로 정지하고 타워 램프가 빨간색으로 바뀐다. 이때 당황하지 말고 화면을 먼저 읽는다.",
     "Read the alarm code and message on the HMI before taking any action.",
     "어떤 조치를 하기 전에 반드시 HMI에 표시된 알람 코드와 메시지를 먼저 읽는다. 읽는 것이 첫 번째 조치다.",
     "Check whether an interlock is active. If so, resolve the safety condition first.",
     "인터록이 활성 상태인지 확인한다. 활성이라면 도어 닫기 등 안전 조건을 가장 먼저 해소한다.",
     "Do NOT press RESET until the root cause has been identified and cleared.",
     "근본 원인을 찾아 해소하기 전에는 RESET을 누르지 않는다. 원인이 남아 있으면 같은 알람이 다시 발생한다.",
     "WARNING: Resetting an active interlock may cause serious injury or equipment damage.",
     "경고: 활성 상태의 인터록을 강제로 리셋하면 중대한 부상이나 장비 손상을 일으킬 수 있다.",
     "If the alarm cannot be cleared, record the alarm code and contact the equipment engineer.",
     "알람이 해소되지 않으면 알람 코드를 기록하고 장비 엔지니어에게 연락한다. 임의 판단으로 계속 시도하지 않는다."
    ]
   },
   {
    "type": "manual",
    "mtitle": "INTERLOCK CLEAR & RECOVERY",
    "paras": [
     "An interlock prevents the process from starting while a safety condition is not satisfied.",
     "인터록은 안전 조건이 만족되지 않는 동안 공정이 시작되지 못하도록 막는다. 이는 오작동이 아니라 정상적인 보호 동작이다.",
     "Verify that all doors are closed and the chamber pressure is within range before clearing the interlock.",
     "인터록을 해제하기 전에 모든 도어가 닫혀 있고 챔버 압력이 정상 범위 안에 있는지 확인한다.",
     "Press ACK to acknowledge the alarm, then press RESET to return the tool to IDLE.",
     "ACK를 눌러 알람을 확인 처리한 뒤, RESET을 눌러 장비를 IDLE 상태로 되돌린다. 순서를 지킨다.",
     "NOTE: A timeout alarm indicates that a step did not complete within the allowed time.",
     "참고: 타임아웃 알람은 어떤 스텝이 허용 시간 안에 완료되지 못했음을 뜻한다. 밸브·펌프·누설 여부를 점검한다.",
     "After recovery, confirm that the tool status shows READY before resuming the lot.",
     "복구 후에는 로트를 재개하기 전에 장비 상태가 READY로 표시되는지 확인한다. 상태 확인 없이 재개하지 않는다."
    ]
   },
   {
    "type": "sim",
    "which": "devicePanel",
    "mode": "status",
    "intro": "아래 장치 패널에서 상태 표시줄의 영어 단어(RUN / IDLE / READY / HOLD / ALARM 등)와 램프 색을 관찰하세요. 지금 장비가 동작 가능한 상태인지, 정지 상태인지를 화면 단어만 보고 판단하는 연습입니다."
   },
   {
    "type": "sim",
    "which": "alarm",
    "mode": "ackReset",
    "intro": "알람 시뮬레이터입니다. 알람 코드와 영어 메시지를 읽고, interlock인지 timeout인지 failure인지 종류를 먼저 구분한 뒤, ACK → 원인 확인 → RESET의 순서로 조치해 보세요. 원인을 해소하지 않고 RESET을 누르면 어떻게 되는지도 확인하세요."
   },
   {
    "type": "sim",
    "which": "equipment",
    "mode": "priority",
    "intro": "장비 전체 화면 시뮬레이터입니다. 인터록과 알람이 동시에 뜬 상황에서 무엇을 먼저 처리해야 하는지(interlock → alarm → warning 순) 판단하고, 복구 후 상태가 READY로 돌아오는지 끝까지 확인하세요."
   },
   {
    "type": "comm",
    "items": [
     {
      "sit": "야간 근무 중 식각 장비에 알람이 떠서 외국인 엔지니어에게 상황을 전화로 확인한다.",
      "q": {
       "en": "What does the alarm say on the screen right now?",
       "ko": "지금 화면에 알람이 뭐라고 떠 있나요?"
      },
      "a": {
       "en": "It shows ALM-1203, RF power failure, and there is also an active interlock: chamber door open.",
       "ko": "ALM-1203, RF 파워 페일러가 떠 있고, 인터록도 활성입니다 — 챔버 도어 열림입니다."
      }
     },
     {
      "sit": "엔지니어가 조치 순서를 지시한다.",
      "q": {
       "en": "Okay, do not reset yet. Close the door first and tell me the tool status.",
       "ko": "알겠어요, 아직 리셋하지 마세요. 도어부터 닫고 장비 상태를 알려주세요."
      },
      "a": {
       "en": "The door is closed now and the interlock is cleared. The status changed to IDLE.",
       "ko": "도어를 닫았고 인터록이 해제됐습니다. 상태가 IDLE로 바뀌었어요."
      }
     },
     {
      "sit": "RF 실패 알람이 리셋되지 않아 보고한다.",
      "q": {
       "en": "Try to acknowledge and reset. Does the RF alarm clear?",
       "ko": "확인 처리하고 리셋해 보세요. RF 알람이 지워지나요?"
      },
      "a": {
       "en": "No, the RF power failure is still latched after reset. I recorded the code; please check the hardware.",
       "ko": "아니요, 리셋 후에도 RF 파워 페일러가 계속 래치돼 있습니다. 코드는 기록해 뒀으니 하드웨어를 확인해 주세요."
      }
     }
    ]
   },
   {
    "type": "wrap",
    "title": "정리 — 읽고, 구분하고, 판단하라",
    "points": [
     "알람은 항상 **읽는 것**이 첫 조치다: 코드 → 메시지 → 추정 원인 → 권장 조치 순으로 화면을 본다.",
     "**Warning**은 예고, **Alarm**은 정지, **Interlock**은 안전 잠금 — 단어 하나가 위험도와 조치 순서를 결정한다.",
     "여러 메시지가 겹치면 언제나 **interlock → alarm → warning** 순으로, 안전 조건을 가장 먼저 해소한다.",
     "**Timeout / Failure(Fault) / Abort**를 구분해 원인 사슬을 읽고, **원인을 해소한 뒤에만 ACK → RESET**한다.",
     "복구 후에는 상태 표시줄이 **READY / IDLE**인지 확인하고 재개하며, 해소되지 않으면 코드를 기록해 엔지니어에게 보고한다."
    ],
    "done": "이제 여러분은 영어 알람 문장을 읽고 **무엇을 먼저 할지 스스로 판단**할 수 있습니다. 현장에서 빨간 램프가 켜져도, 손이 아니라 **눈**이 먼저 움직이세요. **Read first, then act.**"
   }
  ]
 },
 {
  "id": "w7",
  "title": "유지보수(PM)",
  "slides": [
   {
    "type": "story",
    "icon": "🔧",
    "title": "정비의 아침: 오늘 이 장비는 'DOWN'이다",
    "text": "야간 근무를 마친 지훈은 교대 전 HMI 화면에서 붉은 글씨를 본다. **PM DUE** — 오늘 이 식각(etch) 장비의 예방 정비(**Preventive Maintenance**) 기한이다. 화면 하단에는 상태가 **TOOL DOWN**으로 바뀌어 있고, 옆에는 **Work Order #4471**이 떠 있다. 선임 기술자가 태블릿을 건네며 말한다. \"Follow the **PM checklist**. **Inspect** the O-ring, **clean** the chamber wall, **replace** the pump oil, and **calibrate** the MFC.\" 지훈이 받은 체크리스트는 전부 영어 명령문이다. **Inspect / Clean / Replace / Calibrate / Tighten / Lubricate** — 이 여섯 개의 동사가 오늘 하루를 지배할 것이다. 그는 먼저 **LOTO**(잠금·표찰)를 걸어 장비의 위험 에너지를 차단한다. 챔버를 열자 **O-ring**에 미세한 균열이 보인다. 체크리스트에는 이렇게 적혀 있다: *Replace the O-ring if any damage is found.* 지훈은 새 O-ring에 **vacuum grease**를 얇게 바르고(lubricate), 볼트를 **star pattern**으로 규정 토크에 맞춰 조인다(tighten). 정비의 핵심은 손재주가 아니라 **영어 지시문을 정확히 읽고 판단하는 능력**이다. 한 줄을 잘못 읽으면 진공 누설(**vacuum leak**)로 이어진다.",
    "art": "pm"
   },
   {
    "type": "scene",
    "title": "오늘의 현장 · 상황 설정",
    "where": "정비의 아침. DOWN 태그가 걸린 장비 앞.",
    "tool": "PM 체크리스트와 공구, 잠금·표찰(LOTO).",
    "situation": "오늘 이 장비는 DOWN이다. 점검·세정·교체·교정을 순서대로 한다.",
    "meet": [
     "태그 DOWN · LOTO",
     "PM 체크리스트 동사",
     "정비 로그 N-G · rework",
     "토크 스펙 N·m"
    ],
    "goal": "정비 지시문의 동사를 정확히 읽고 행동으로 옮기기.",
    "bg": "w7"
   },
   {
    "type": "read",
    "title": "예방 정비(PM)란 무엇이며, 왜 영어로 되어 있는가",
    "intro": "PM은 '고장 난 뒤 고치는' 것이 아니라 '고장 나기 전에 정기적으로 손보는' 정비입니다. 반도체 팹의 장비 대부분은 해외 제조사(미국·일본·유럽 장비사) 제품이므로, PM 문서와 화면 텍스트는 거의 전부 영어입니다.",
    "paras": [
     "**Preventive Maintenance (PM)** 는 정해진 주기마다 부품을 점검·청소·교체하여 예기치 못한 고장(**unplanned downtime**)을 막는 정비입니다. 반대 개념은 고장 후 수리하는 **Corrective Maintenance(사후 정비)** 입니다.",
     "PM은 주기(**interval**)로 관리됩니다. 화면에는 상태가 **PM DUE**(기한 도래), **OVERDUE**(기한 초과), **DONE**(완료)로 표시됩니다. **OVERDUE**가 뜨면 그 장비는 규정상 가동을 멈추고 **TOOL DOWN** 상태가 됩니다.",
     "실제 작업은 **PM checklist(정비 체크리스트)** 로 진행됩니다. 각 줄은 **Inspect / Clean / Replace / Calibrate / Tighten / Lubricate** 같은 명령형 동사로 시작하고, 기술자는 각 항목을 **Pass / Fail** 로 표시합니다.",
     "대부분의 팹은 **CMMS(Computerized Maintenance Management System)** 로 정비 이력을 관리합니다. 기술자는 측정값을 **CMMS log**에 기록하고, 끝나면 **Work Order(작업 지시서)** 를 닫습니다(*close the work order*).",
     "PM의 목적은 단순 청소가 아니라 **공정 안정성** 유지입니다. 챔버 벽의 폴리머, 열화된 O-ring, 오염된 펌프 오일은 모두 **파티클 증가·진공 누설·유량 오차**로 이어져 웨이퍼 수율을 떨어뜨립니다.",
     "즉 이 수업의 핵심은 도구 설계가 아니라 **영어 체크리스트와 HMI 문구를 정확히 읽고, 합격/불합격을 판단하는 것**입니다."
    ],
    "figs": [
     {
      "kind": "sticker",
      "level": "danger",
      "en": "EQUIPMENT DOWN — PM IN PROGRESS",
      "ko": "장비 다운 — 정비(PM) 중"
     },
     {
      "kind": "log",
      "title": "MAINTENANCE LOG",
      "lines": [
       "TOOL 3 — [DOWN] for PM",
       "Replaced: O-ring, filter",
       "Result: [N-G] → rework needed"
      ]
     }
    ]
   },
   {
    "type": "read",
    "title": "체크리스트 6대 동사: 무엇을 하라는 명령인가",
    "intro": "PM 체크리스트의 모든 줄은 동사로 시작합니다. 이 여섯 개 동사의 뜻을 헷갈리면 엉뚱한 작업을 하게 됩니다. 각 동사가 실제로 어떤 물리적 행동을 지시하는지 정리합니다.",
    "paras": [
     "**Inspect (점검하다)** — 부품을 눈·손·계측기로 확인합니다. 예: *Inspect the O-ring for cracks and particles.* '교체'가 아니라 '상태 확인'입니다. 이상이 없으면 다음 단계로 넘어갑니다.",
     "**Clean (청소하다)** — 오염물·폴리머·파티클을 제거합니다. 예: *Clean the chamber wall with IPA-dampened wipes.* 보통 **lint-free wipe(보풀 없는 와이프)** 와 **IPA(이소프로필알코올)** 를 사용합니다.",
     "**Replace (교체하다)** — 소모품이나 손상 부품을 새것으로 바꿉니다. 예: *Replace the pump oil.* **Clean(청소)** 과 혼동하면 안 됩니다 — Replace는 반드시 새 부품으로 바꾸라는 뜻입니다.",
     "**Calibrate (교정하다)** — 계측기의 값을 기준기에 맞춰 보정합니다. 예: *Calibrate the MFC against the reference flow meter.* 흔히 **zero(영점)** 를 먼저 맞춥니다.",
     "**Tighten (조이다)** — 볼트·피팅을 규정 토크로 조입니다. 예: *Tighten the bolts to 8 N·m in a star pattern.* 너무 세게 조이면(**over-tighten**) 세라믹 부품이 깨질 수 있습니다.",
     "**Lubricate (윤활하다)** — O-ring이나 이동 부위에 그리스를 얇게 바릅니다. 예: *Lightly lubricate the new O-ring with vacuum grease.* '얇게(lightly)'가 핵심 — 과도하면 오히려 파티클 원인이 됩니다."
    ]
   },
   {
    "type": "read",
    "title": "PM 대상 부품과 소모품: O-ring, pump oil, chamber wall, MFC/gauge",
    "intro": "체크리스트에 반복해서 등장하는 네 가지 핵심 부품·소모품입니다. 각각이 왜 정비 대상인지, 문제가 생기면 무슨 증상이 나타나는지 이해하면 영어 문장의 뜻이 명확해집니다.",
    "paras": [
     "**O-ring(오링)** — 챔버 뚜껑·플랜지의 진공 실링(seal)입니다. 균열·변형·이물질이 있으면 **vacuum leak(진공 누설)** 이 생겨 **base pressure(도달 진공도)** 가 올라갑니다. PM 때 **inspect → (손상 시) replace → lubricate** 순서로 다룹니다.",
     "**Pump oil(펌프 오일)** — 러핑 펌프(rough/roughing pump)의 윤활·밀봉 오일입니다. 색이 어두워지거나 **sight glass(점검창)** 의 **MIN line** 아래로 내려가면 교체합니다. 예: *Replace the pump oil when it turns dark.*",
     "**Chamber wall(챔버 벽)** — 공정 중 폴리머·부산물이 쌓입니다. 방치하면 벗겨져 파티클(particle)이 됩니다. **wet clean(습식 세정)** 이나 와이프로 제거합니다. 예: *Remove polymer buildup from the chamber wall.*",
     "**MFC (Mass Flow Controller, 질량유량제어기)** — 공정 가스 유량을 **sccm** 단위로 제어합니다. 오차가 커지면 공정이 틀어지므로 정기적으로 **calibrate** 합니다. 화면에 *setpoint 50 / actual 0 sccm* 처럼 표시됩니다.",
     "**Gauge(진공 게이지)** — 챔버 압력을 측정합니다(예: Pirani, 이온 게이지). **zero(영점)** 확인과 **base pressure** 검증이 PM 항목에 포함됩니다. 예: *Check the gauge zero.*",
     "핵심: 이 네 부품은 서로 연결되어 있습니다 — O-ring 누설이나 게이지 오차는 결국 **진공 불량**으로, MFC 오차는 **유량 불량**으로, 챔버 벽 오염은 **파티클 불량**으로 나타납니다."
    ]
   },
   {
    "type": "read",
    "title": "측정과 규격 판단: torque, leak rate, base pressure, out of spec",
    "intro": "PM은 단순 작업이 아니라 '측정하고 규격(spec)과 비교해 합격/불합격을 판단'하는 일입니다. 영어 화면·체크리스트에 나오는 수치와 판정 문구를 읽는 법입니다.",
    "paras": [
     "**Torque spec(토크 규격)** — 볼트를 조이는 힘의 규정값입니다. 단위는 **N·m(뉴턴미터)**. 예: *Tighten to 8 N·m.* 규격보다 세게 조이면 부품 손상, 약하게 조이면 누설이 생깁니다. 보통 **star pattern(별 모양 순서)** 으로 균일하게 조입니다.",
     "**Leak check / leak rate(누설 검사 / 누설률)** — 진공 밀봉이 제대로 됐는지 확인합니다. 흔히 **helium leak check(헬륨 누설 검사)** 를 하며, **leak rate**가 규격보다 크면 실링(O-ring) 재점검이 필요합니다.",
     "**Base pressure(도달 진공도)** — 가스를 넣지 않은 상태에서 도달하는 최저 압력입니다. 단위는 **mTorr / Torr**. 예: *Verify base pressure reaches 5 mTorr.* 값이 규격보다 높으면 누설·오염을 의심합니다.",
     "**Setpoint vs Actual(설정값 대 실제값)** — HMI에서 유량·온도·압력은 목표(setpoint)와 실제(actual)가 나란히 표시됩니다. 예: *MFC1 flow 0 sccm (setpoint 50)* → 설정은 50인데 실제 0이므로 **가스가 흐르지 않는 이상 상태**입니다.",
     "**판정 문구** — 각 항목 결과는 **Pass / Fail**, **OK / NG(No Good)**, 또는 **In Spec / Out of Spec** 로 표시됩니다. **Out of Spec** 은 '규격을 벗어남 — 조치 필요'라는 뜻입니다.",
     "따라서 좋은 기술자는 '값을 읽는 것'을 넘어, 그 값이 **limit(한계)** 안에 있는지 즉시 판단합니다. 예: *Base pressure 12 mTorr (limit 5 mTorr)* → 한계 초과, 불합격."
    ]
   },
   {
    "type": "read",
    "title": "HMI·체크리스트 화면 영어 읽기: 상태·단위·기록",
    "intro": "정비 중에는 종이 체크리스트뿐 아니라 장비 HMI(터치스크린) 문구도 읽어야 합니다. 자주 나오는 상태 표시, 단위, 기록 관련 표현을 정리합니다.",
    "paras": [
     "**상태(status) 표시** — **TOOL UP**(가동 가능) / **TOOL DOWN**(가동 중지) / **PM DUE**(정비 기한) / **OVERDUE**(기한 초과) / **IN PROGRESS**(작업 중) / **DONE**(완료). 붉은색은 대개 이상·중지를 의미합니다.",
     "**단위(units)** — 유량은 **sccm**, 압력은 **Torr / mTorr / Pa**, 토크는 **N·m**, 온도는 **°C**. 단위를 잘못 읽으면 판단이 완전히 틀어집니다(예: 5 mTorr ≠ 5 Torr).",
     "**지시 문구** — *Confirm*, *Verify*, *Record*, *Do not operate*, *Remove before servicing* 등 명령·주의 표현이 자주 나옵니다. 특히 **Do not(하지 마라)** 로 시작하는 줄은 안전·손상 방지 경고이므로 반드시 지켜야 합니다.",
     "**기록(logging)** — *Record the reading in the CMMS log*(측정값을 정비 시스템에 기록), *Sign off each step*(각 단계에 서명), *Close the work order*(작업 지시 종료). 정비는 '기록으로 끝난다'는 점을 기억하세요.",
     "**경고 단계** — 문서의 **NOTE**(참고) < **CAUTION**(주의, 장비 손상 가능) < **WARNING**(경고, 인명 위험) < **DANGER**(위험, 즉각적 인명 위험) 순으로 위험도가 올라갑니다.",
     "요약: 화면 한 줄을 읽을 때 ①동사(무엇을), ②대상(어디에), ③수치·단위(얼마나), ④판정(합격 여부)의 네 가지를 순서대로 파악하는 습관을 들이면 실수를 크게 줄일 수 있습니다."
    ],
    "figs": [
     {
      "kind": "hmi",
      "tool": "EQP-3",
      "status": "DOWN",
      "state": "down",
      "rows": [
       [
        "Reason",
        "PM"
       ],
       [
        "ETA",
        "+4h"
       ]
      ]
     },
     {
      "kind": "note",
      "title": "NOTICE",
      "en": "Tag the tool [DOWN] before starting PM.",
      "ko": "PM 시작 전 장비를 DOWN 태그."
     }
    ]
   },
   {
    "type": "acr",
    "title": "약어",
    "intro": "PM 문서와 HMI 화면에서 반복적으로 마주치는 핵심 약어입니다.",
    "items": [
     {
      "ab": "PM",
      "full": "Preventive Maintenance",
      "ko": "예방 정비 — 고장 전 정기 점검·교체"
     },
     {
      "ab": "MFC",
      "full": "Mass Flow Controller",
      "ko": "질량유량제어기 — 가스 유량을 sccm으로 제어"
     },
     {
      "ab": "LOTO",
      "full": "Lockout / Tagout",
      "ko": "잠금·표찰 — 위험 에너지 차단 안전 절차"
     },
     {
      "ab": "PPE",
      "full": "Personal Protective Equipment",
      "ko": "개인 보호구 — 장갑·보안경·마스크 등"
     },
     {
      "ab": "CMMS",
      "full": "Computerized Maintenance Management System",
      "ko": "전산 정비 관리 시스템 — 정비 이력·작업지시 관리"
     },
     {
      "ab": "sccm",
      "full": "Standard Cubic Centimeter per Minute",
      "ko": "표준 유량 단위 — 가스 흐름량"
     },
     {
      "ab": "N·m",
      "full": "Newton-meter",
      "ko": "토크(조임 힘) 단위"
     },
     {
      "ab": "IPA",
      "full": "Isopropyl Alcohol",
      "ko": "이소프로필알코올 — 챔버 세정용 용제"
     }
    ],
    "figs": [
     {
      "kind": "sticker",
      "level": "danger",
      "en": "DO NOT ENERGIZE — LOTO",
      "ko": "전원 투입 금지 — 잠금·표찰(LOTO)"
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (1) — 체크리스트 동작 동사",
    "intro": "PM 체크리스트의 모든 줄을 시작하는 여섯 개 동사입니다. 실제 영어 예문과 함께 익힙니다.",
    "items": [
     {
      "en": "inspect",
      "ko": "점검하다",
      "d": "눈·손·계측기로 상태를 확인하는 것 (교체 아님)",
      "ex": "Inspect the O-ring for cracks, particles, or deformation before reassembly."
     },
     {
      "en": "clean",
      "ko": "청소하다",
      "d": "오염물·폴리머·파티클을 제거하는 것",
      "ex": "Clean the chamber wall with IPA-dampened lint-free wipes; do not spray solvent directly."
     },
     {
      "en": "replace",
      "ko": "교체하다",
      "d": "소모품·손상 부품을 새것으로 바꾸는 것",
      "ex": "Replace the pump oil when it turns dark or drops below the MIN line."
     },
     {
      "en": "calibrate",
      "ko": "교정하다",
      "d": "계측기 값을 기준기에 맞춰 보정하는 것",
      "ex": "Calibrate the MFC against the reference flow meter and record the zero offset."
     },
     {
      "en": "tighten",
      "ko": "조이다",
      "d": "볼트·피팅을 규정 토크로 조이는 것",
      "ex": "Tighten all chamber bolts to 8 N·m in a star pattern; do not over-tighten."
     },
     {
      "en": "lubricate",
      "ko": "윤활하다",
      "d": "O-ring·이동부에 그리스를 얇게 바르는 것",
      "ex": "Lightly lubricate the new O-ring with vacuum grease before installation."
     }
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — PM 챔버 세정",
    "doc": {
     "name": "ETCH-2000 Maintenance Manual",
     "no": "MM-2000",
     "sec": "8.2",
     "rev": "C",
     "page": "8-14"
    },
    "heading": "8.2  Preventive Maintenance: Chamber Clean",
    "steps": [
     "Tag the tool [DOWN] and apply LOTO before opening the chamber.",
     {
      "t": "Inspect the chamber wall and electrode for wear.",
      "note": {
       "kind": "note",
       "en": "Record any cracks or heavy deposition in the PM log."
      }
     },
     "Clean the parts with IPA-dampened, lint-free wipes.",
     "Replace the O-ring and lubricate lightly with vacuum grease.",
     {
      "t": "Tighten the bolts to 8 N·m in a star pattern.",
      "note": {
       "kind": "caution",
       "en": "Over-tightening may crack the ceramic parts."
      }
     }
    ],
    "callout": {
     "kind": "warning",
     "en": "DO NOT ENERGIZE. Equipment must remain locked out during PM."
    },
    "gloss": [
     [
      "LOTO",
      "잠금·표찰"
     ],
     [
      "deposition",
      "침착물"
     ],
     [
      "lint-free",
      "보풀 없는"
     ],
     [
      "torque (N·m)",
      "조임 토크"
     ]
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — 조립 후 성능 시험",
    "doc": {
     "name": "ETCH-2000 Test Procedure",
     "no": "TP-2000",
     "sec": "5.1",
     "rev": "B",
     "page": "5-2"
    },
    "heading": "5.1  Vacuum Leak-Rate Acceptance Test",
    "steps": [
     "Pump the chamber down to base pressure (< 1E-6 Torr).",
     "Close the gate valve to [isolate] the chamber.",
     {
      "t": "Record the pressure rise over 10 minutes.",
      "note": {
       "kind": "note",
       "en": "Rate of rise = (P_end − P_start) / time."
      }
     },
     {
      "t": "The leak rate must be below the spec limit to PASS.",
      "note": {
       "kind": "caution",
       "en": "If the tool fails, check flanges and gaskets, then retest."
      }
     }
    ],
    "callout": {
     "kind": "note",
     "en": "PASS = within spec.  FAIL / N-G = out of spec, needs rework."
    },
    "gloss": [
     [
      "acceptance test",
      "합격 판정 시험"
     ],
     [
      "rate of rise",
      "압력 상승률"
     ],
     [
      "spec limit",
      "규격 한계"
     ],
     [
      "pass / fail",
      "합격/불합격"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (1) — 동작 동사 해석",
    "intro": "영어 체크리스트 줄을 읽고 그 의미를 고르세요.",
    "questions": [
     {
      "prompt": "체크리스트에 'Replace the O-ring if any damage is found.' 라고 적혀 있다. 무엇을 하라는 뜻인가?",
      "opts": [
       "손상이 있으면 O-ring을 새것으로 교체한다",
       "O-ring을 청소만 하고 다시 쓴다",
       "O-ring 위치만 확인한다"
      ],
      "ans": 0
     },
     {
      "prompt": "'Tighten the bolts to 8 N·m in a star pattern.' 의 의미로 맞는 것은?",
      "opts": [
       "볼트를 규정 토크 8 N·m로, 별 모양 순서로 조인다",
       "볼트 8개를 아무 순서로 푼다",
       "볼트를 8분간 그대로 둔다"
      ],
      "ans": 0
     },
     {
      "prompt": "'Lightly lubricate the new O-ring with vacuum grease.' 는 무엇을 지시하는가?",
      "opts": [
       "새 O-ring에 진공 그리스를 얇게 바른다",
       "O-ring을 제거해 폐기한다",
       "O-ring의 무게를 측정한다"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (2) — PM 대상 부품·소모품",
    "intro": "정비 대상으로 반복 등장하는 부품과 소모품입니다.",
    "items": [
     {
      "en": "O-ring",
      "ko": "오링(진공 실링)",
      "d": "챔버 밀봉용 고무 링 — 손상 시 진공 누설 유발",
      "ex": "A damaged O-ring will cause a vacuum leak and rising base pressure."
     },
     {
      "en": "pump oil",
      "ko": "펌프 오일",
      "d": "러핑 펌프의 윤활·밀봉 오일 — 오염 시 교체",
      "ex": "Check the pump oil level through the sight glass every week."
     },
     {
      "en": "chamber wall",
      "ko": "챔버 벽",
      "d": "공정 부산물이 쌓이는 챔버 내벽 — 세정 대상",
      "ex": "Remove polymer buildup from the chamber wall during the wet clean."
     },
     {
      "en": "MFC",
      "ko": "질량유량제어기",
      "d": "공정 가스 유량을 sccm으로 제어하는 장치",
      "ex": "The MFC regulates the process gas flow in sccm and must be calibrated periodically."
     },
     {
      "en": "gauge",
      "ko": "진공 게이지",
      "d": "챔버 압력을 측정하는 계측기",
      "ex": "The Pirani gauge reads the chamber pressure in the rough vacuum range."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (2) — 부품·화면 해석",
    "intro": "부품 상태와 HMI 문구를 해석하세요.",
    "questions": [
     {
      "prompt": "HMI에 'MFC1 flow: 0 sccm (setpoint 50)' 가 표시된다. 어떤 상태인가?",
      "opts": [
       "설정값은 50인데 실제 유량이 0 — 가스가 흐르지 않는 이상 상태",
       "유량이 정상 범위",
       "MFC 교정이 방금 완료됨"
      ],
      "ans": 0
     },
     {
      "prompt": "'Check the pump oil level through the sight glass.' 는 무엇을 하라는 지시인가?",
      "opts": [
       "점검창으로 펌프 오일 레벨을 확인한다",
       "펌프 전체를 교체한다",
       "오일을 무조건 새로 주입한다"
      ],
      "ans": 0
     },
     {
      "prompt": "'A damaged O-ring will cause a vacuum leak.' 의 의미는?",
      "opts": [
       "손상된 O-ring이 진공 누설을 유발한다",
       "O-ring이 챔버 압력을 높여 준다",
       "O-ring이 가스 유량을 제어한다"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (3) — 측정·규격·판정",
    "intro": "측정값을 규격과 비교해 합격/불합격을 판단할 때 쓰는 표현입니다.",
    "items": [
     {
      "en": "torque spec",
      "ko": "토크 규격",
      "d": "볼트 조임 힘의 규정값 (단위 N·m)",
      "ex": "Follow the torque spec; over-tightening can crack the ceramic part."
     },
     {
      "en": "leak rate",
      "ko": "누설률",
      "d": "진공 누설의 크기 — 헬륨 누설 검사로 측정",
      "ex": "Perform a helium leak check; the leak rate must be below the specified limit."
     },
     {
      "en": "base pressure",
      "ko": "도달 진공도",
      "d": "가스 없이 도달하는 최저 압력 (mTorr/Torr)",
      "ex": "Verify that the base pressure reaches 5 mTorr before releasing the tool."
     },
     {
      "en": "out of spec",
      "ko": "규격 이탈",
      "d": "측정값이 규격 범위를 벗어남 — 조치 필요",
      "ex": "Mark the item Fail and note any out-of-spec reading in the log."
     },
     {
      "en": "overdue",
      "ko": "기한 초과",
      "d": "예정된 정비 기한이 지난 상태 — 즉시 수행 필요",
      "ex": "The chamber PM is overdue, so the tool stays down until it is completed."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (3) — 규격·판정 해석",
    "intro": "화면의 수치와 판정 문구를 읽고 올바르게 판단하세요.",
    "questions": [
     {
      "prompt": "체크리스트 항목 결과가 'Out of Spec' 으로 표시되었다. 어떤 뜻인가?",
      "opts": [
       "측정값이 규격 범위를 벗어남 — 조치가 필요하다",
       "정상 범위 안에 있다",
       "측정을 아직 하지 않았다"
      ],
      "ans": 0
     },
     {
      "prompt": "화면에 'Base pressure: 12 mTorr (limit 5 mTorr)' 라고 뜬다. 어떻게 판단해야 하는가?",
      "opts": [
       "기준 5 mTorr보다 높음 — 불합격, 누설·오염 의심",
       "정상, 합격 처리한다",
       "진공이 너무 강하니 압력을 낮춘다"
      ],
      "ans": 0
     },
     {
      "prompt": "장비 PM 상태가 'OVERDUE' 로 표시된다. 의미는?",
      "opts": [
       "예정 정비 기한이 지났음 — 즉시 수행해야 한다",
       "정비가 이미 완료되었다",
       "정비 예정일보다 아직 이르다"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "manual",
    "mtitle": "PREVENTIVE MAINTENANCE CHECKLIST — VACUUM CHAMBER",
    "paras": [
     "1. Inspect the main chamber O-ring for cracks, particles, and permanent deformation.",
     "해설: 챔버 메인 O-ring에 균열·이물질·영구 변형이 있는지 점검하라. (Inspect = 확인만, 교체 아님)",
     "2. Clean the chamber wall and showerhead using lint-free wipes dampened with IPA.",
     "해설: 보풀 없는 와이프에 IPA를 적셔 챔버 벽과 샤워헤드를 청소하라. 용제를 직접 분사하지 말 것.",
     "3. Replace the O-ring if any damage is found. Do not reuse a used O-ring.",
     "해설: 손상이 발견되면 O-ring을 교체하라. 사용했던 O-ring을 재사용하지 말 것.",
     "4. Lightly apply vacuum grease to the new O-ring before installation.",
     "해설: 설치 전 새 O-ring에 진공 그리스를 얇게 바르라. ('lightly' = 얇게가 핵심)",
     "5. Tighten all chamber bolts to the specified torque (8 N·m) in a star pattern.",
     "해설: 모든 챔버 볼트를 규정 토크 8 N·m로, 별 모양 순서로 조여 압력을 고르게 분산하라.",
     "6. Mark each step Pass / Fail and record any out-of-spec value in the CMMS log.",
     "해설: 각 단계를 합격/불합격으로 표시하고, 규격 이탈 값은 CMMS 기록에 남겨라."
    ],
    "figs": [
     {
      "kind": "note",
      "title": "SPEC",
      "en": "Tighten bolts to [8 N·m], star pattern.",
      "ko": "볼트 8N·m, 별 모양 순서로."
     }
    ]
   },
   {
    "type": "manual",
    "mtitle": "SAFETY — LOCKOUT / TAGOUT (LOTO)",
    "paras": [
     "WARNING: Hazardous energy present. Perform LOTO before opening the chamber.",
     "해설: 경고 — 위험 에너지가 있음. 챔버를 열기 전에 반드시 LOTO(잠금·표찰)를 수행하라.",
     "Shut off and lock the RF, gas, and vacuum supplies, then attach your personal tag.",
     "해설: RF·가스·진공 공급을 차단하고 잠근 뒤, 본인 이름표(개인 표찰)를 부착하라.",
     "Do not operate the tool until all locks and tags are removed by the assigned technician.",
     "해설: 담당 기술자가 모든 잠금과 표찰을 제거하기 전에는 장비를 절대 가동하지 말라.",
     "NOTE: Verify the zero-energy state before starting any maintenance work.",
     "해설: 참고 — 정비 작업을 시작하기 전 '무에너지 상태(zero-energy)'를 반드시 확인하라."
    ]
   },
   {
    "type": "manual",
    "mtitle": "MFC / GAUGE CALIBRATION PROCEDURE",
    "paras": [
     "1. Zero the MFC with no gas flow. The display should read 0 sccm.",
     "해설: 가스 흐름이 없는 상태에서 MFC 영점을 맞춰라. 표시값이 0 sccm이어야 한다.",
     "2. Calibrate the MFC against the reference flow meter at 20%, 50%, and 100% of full scale.",
     "해설: 기준 유량계에 맞춰 풀스케일의 20%, 50%, 100% 지점에서 MFC를 교정하라.",
     "3. If the deviation exceeds ±1% of full scale, recalibrate or replace the MFC.",
     "해설: 편차가 풀스케일의 ±1%를 넘으면 MFC를 재교정하거나 교체하라.",
     "4. Check the vacuum gauge zero and verify the base pressure reaches 5 mTorr.",
     "해설: 진공 게이지 영점을 확인하고, 도달 진공도가 5 mTorr에 도달하는지 검증하라.",
     "5. Record all readings in the CMMS maintenance log and close the work order.",
     "해설: 모든 측정값을 CMMS 정비 기록에 남기고 작업 지시서를 종료하라."
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (4) — 매뉴얼 문장 독해",
    "intro": "위 영어 매뉴얼 문장을 정확히 읽었는지 확인합니다.",
    "questions": [
     {
      "prompt": "매뉴얼: 'Do not operate the tool until all locks and tags are removed.' 언제 장비를 가동할 수 있는가?",
      "opts": [
       "모든 잠금과 표찰(LOTO)이 제거된 후에만",
       "언제든지 가동해도 된다",
       "잠금을 건 상태에서 가동한다"
      ],
      "ans": 0
     },
     {
      "prompt": "'Tighten the bolts in a star pattern.' — 별 모양 순서로 조이는 이유로 가장 적절한 것은?",
      "opts": [
       "압력을 고르게 분산해 실링을 균일하게 하기 위해",
       "그냥 더 빨리 조이려고",
       "조이는 순서는 아무 의미가 없다"
      ],
      "ans": 0
     },
     {
      "prompt": "'Record all readings in the CMMS maintenance log.' 는 무엇을 하라는 것인가?",
      "opts": [
       "모든 측정값을 정비 관리 시스템 기록에 남긴다",
       "측정을 생략한다",
       "이전 기록 값을 삭제한다"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "sim",
    "which": "chamber",
    "mode": "pmParts",
    "intro": "아래 챔버 단면 시뮬레이션에서 PM 대상 부위를 직접 눌러 확인해 보세요. **O-ring**, **chamber wall**, **pump oil**, **gauge/MFC** 위치를 찾아, 각 부위에 어떤 동작(Inspect / Clean / Replace / Calibrate)이 필요한지 영어 라벨과 연결해 보는 것이 목표입니다. 진공 누설이 생기면 어느 부위(특히 O-ring)를 먼저 의심해야 하는지 확인하세요."
   },
   {
    "type": "sim",
    "which": "pm",
    "mode": "pmWork",
    "intro": "이번에는 실제 **PM checklist**를 순서대로 진행하는 시뮬레이션입니다. 각 항목의 영어 지시문을 읽고 알맞은 동작을 선택한 뒤, 측정값이 규격 안(**In Spec**)인지 밖(**Out of Spec**)인지 판정하여 **Pass / Fail**을 표시하세요. 마지막에 모든 값을 기록하고 **work order**를 닫는 흐름까지 경험하는 것이 목표입니다."
   },
   {
    "type": "sim",
    "which": "devicePanel",
    "mode": "pmStatus",
    "intro": "마지막으로 장비 HMI 패널을 읽는 연습입니다. 화면의 **status**(TOOL DOWN / PM DUE / OVERDUE), **setpoint vs actual**, 단위(**sccm / mTorr / N·m**)를 보고 현재 장비 상태를 판단하세요. 예: base pressure가 limit을 넘었는지, MFC 실제 유량이 setpoint와 맞는지 확인해, '지금 이 장비를 가동해도 되는가?'를 스스로 판정해 보세요."
   },
   {
    "type": "comm",
    "items": [
     {
      "sit": "해외 엔지니어가 O-ring 교체 여부를 확인한다",
      "q": {
       "en": "Did you inspect the O-ring before you reinstalled the chamber lid?",
       "ko": "챔버 뚜껑을 다시 조립하기 전에 O-ring을 점검했나요?"
      },
      "a": {
       "en": "Yes, I inspected it. There was a small crack, so I replaced it with a new one and applied a light coat of vacuum grease.",
       "ko": "네, 점검했습니다. 미세한 균열이 있어서 새것으로 교체하고 진공 그리스를 얇게 발랐습니다."
      }
     },
     {
      "sit": "도달 진공도가 높아 누설을 의심한다",
      "q": {
       "en": "The base pressure is still high. Can you run a helium leak check?",
       "ko": "도달 진공도가 아직 높네요. 헬륨 누설 검사를 돌려 주겠어요?"
      },
      "a": {
       "en": "Sure. I'll run the leak check now. If the leak rate is out of spec, I'll re-tighten the bolts to the torque spec.",
       "ko": "네. 지금 누설 검사를 하겠습니다. 누설률이 규격을 벗어나면 볼트를 규정 토크로 다시 조이겠습니다."
      }
     },
     {
      "sit": "PM 마무리와 기록을 지시한다",
      "q": {
       "en": "Please record everything in the CMMS log and let me know when the PM is done.",
       "ko": "모든 내용을 CMMS 기록에 남기고, PM이 끝나면 알려 주세요."
      },
      "a": {
       "en": "Understood. I'll log all the readings and close the work order once the tool passes base pressure.",
       "ko": "알겠습니다. 모든 측정값을 기록하고, 장비가 도달 진공도를 통과하면 작업 지시서를 닫겠습니다."
      }
     }
    ]
   },
   {
    "type": "wrap",
    "title": "마무리 — 오늘 배운 것",
    "points": [
     "**PM(Preventive Maintenance)** 은 고장 전 정기 정비이며, 상태는 **PM DUE / OVERDUE / DONE**, 장비는 **TOOL UP / DOWN** 으로 표시된다.",
     "체크리스트 6대 동사: **Inspect(점검) / Clean(청소) / Replace(교체) / Calibrate(교정) / Tighten(조임) / Lubricate(윤활)** — 뜻을 정확히 구분하라.",
     "핵심 부품: **O-ring, pump oil, chamber wall, MFC, gauge** — 각 문제는 진공 누설·유량 오차·파티클로 이어진다.",
     "측정·판정: **torque spec(N·m), leak rate, base pressure(mTorr), setpoint vs actual**, 그리고 **Pass/Fail · In Spec/Out of Spec** 로 합격 여부를 판단한다.",
     "안전 최우선: 챔버를 열기 전 **LOTO** 로 위험 에너지를 차단하고, **Do not / WARNING** 문구는 반드시 지킨다.",
     "정비는 기록으로 끝난다 — **Record the readings in the CMMS log** 하고 **close the work order**."
    ],
    "done": "이제 여러분은 영어 **PM checklist**와 HMI 화면을 읽고, 각 항목의 **동작·대상·수치·판정**을 스스로 해석할 수 있습니다. **Read it, judge it, log it.** 현장에서 이 세 단계를 기억하세요!",
    "figs": [
     {
      "kind": "step",
      "title": "PM CHECKLIST",
      "items": [
       [
        "[Inspect] the chamber.",
        "챔버 점검"
       ],
       [
        "[Clean] the parts.",
        "부품 세정"
       ],
       [
        "[Replace] the o-ring.",
        "오링 교체"
       ],
       [
        "[Calibrate] the sensor.",
        "센서 교정"
       ]
      ]
     }
    ]
   }
  ]
 },
 {
  "id": "w8",
  "title": "중간 점검",
  "kind": "평가",
  "slides": [
   {
    "type": "story",
    "icon": "📝",
    "title": "중간 점검 안내",
    "text": "앞 챕터(CH 1~7)에서 배운 **장비 구성 · 운전 절차 · 로그 값 · 알람 해석**을 확인합니다. 영어 문장과 용어를 읽고 답하세요.",
    "art": "midcheck"
   },
   {
    "type": "scene",
    "title": "오늘의 현장 · 상황 설정",
    "where": "1~7장을 마친 중간 지점. 그동안 본 화면·경고·로그를 모아 둔 복습 보드 앞.",
    "tool": "장비·운전·로그·알람 — 지금까지의 현장 영어 전체.",
    "situation": "배운 것을 실제 상황에서 다시 \"읽고 판단\"해 본다.",
    "meet": [
     "HMI 상태어",
     "경고·알람",
     "로그·계기값"
    ],
    "goal": "흩어진 조각을 하나로 모아 스스로 판단해 보기.",
    "bg": "w8"
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — 상태·알람 빠른 참조",
    "doc": {
     "name": "EQP-204 Operating Manual",
     "no": "OM-204",
     "sec": "App.",
     "rev": "B",
     "page": "A-1"
    },
    "heading": "Appendix A  Quick Reference: Status & Alarms",
    "steps": [
     "[IDLE] — the tool is ready but not running.",
     "[RUN] / PROCESSING — a cycle is in progress.",
     "[FAULT] — a fault stopped the tool; check the alarm.",
     "[INTERLOCK ACTIVE] — a safety condition blocks START."
    ],
    "gloss": [
     [
      "ready",
      "준비됨"
     ],
     [
      "in progress",
      "진행 중"
     ],
     [
      "fault",
      "고장"
     ],
     [
      "blocks",
      "막다"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "① 장비 구성요소",
    "intro": "부품의 영어 이름·기능을 확인합니다.",
    "questions": [
     {
      "prompt": "Which part evacuates the chamber to vacuum?",
      "opts": [
       "Turbo pump",
       "RF generator",
       "MFC"
      ],
      "ans": 0
     },
     {
      "prompt": "The MFC (Mass Flow Controller) controls the ___.",
      "opts": [
       "gas flow",
       "RF power",
       "temperature"
      ],
      "ans": 0
     },
     {
      "prompt": "“Wafer chuck” 의 역할은?",
      "opts": [
       "웨이퍼를 고정·지지",
       "가스를 배기",
       "전력을 공급"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "quiz",
    "title": "② 운전 절차",
    "intro": "운전 동사와 순서를 확인합니다.",
    "questions": [
     {
      "prompt": "“Evacuate the chamber” 의 뜻은?",
      "opts": [
       "챔버를 배기하라",
       "챔버를 열어라",
       "가스를 넣어라"
      ],
      "ans": 0
     },
     {
      "prompt": "올바른 운전 순서는?",
      "opts": [
       "Load → Pump down → Ignite",
       "Ignite → Load → Vent",
       "Vent → Load → Pump down"
      ],
      "ans": 0
     },
     {
      "prompt": "“Vent” 는 무엇인가?",
      "opts": [
       "챔버를 대기압으로 되돌림",
       "진공으로 배기",
       "가스를 점화"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "quiz",
    "title": "③ 로그·값 읽기",
    "intro": "계기 값과 로그 문장을 해석합니다.",
    "questions": [
     {
      "prompt": "“set point” 와 “actual value” 의 차이는?",
      "opts": [
       "목표값 vs 실측값",
       "실측값 vs 목표값",
       "최대 vs 최소"
      ],
      "ans": 0
     },
     {
      "prompt": "“Base pressure reached.” 의 뜻은?",
      "opts": [
       "기준 압력에 도달했다",
       "압력이 초과했다",
       "누설이 생겼다"
      ],
      "ans": 0
     },
     {
      "prompt": "“Gas flow is 50 sccm and stable.” 는?",
      "opts": [
       "유량 50 sccm, 안정적",
       "유량이 0",
       "가스 누설"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "quiz",
    "title": "④ 알람·조치",
    "intro": "알람을 읽고 조치를 고릅니다.",
    "questions": [
     {
      "prompt": "“Process stopped by the interlock.” 의 뜻은?",
      "opts": [
       "인터록으로 공정이 멈췄다",
       "공정이 정상 완료됐다",
       "공정을 재시작했다"
      ],
      "ans": 0
     },
     {
      "prompt": "High reflected power(반사파 높음) → 먼저 점검할 것은?",
      "opts": [
       "pressure & matching",
       "wafer size",
       "room light"
      ],
      "ans": 0
     },
     {
      "prompt": "“Chamber pressure is above the allowable limit.” → 어느 계통?",
      "opts": [
       "진공(vacuum)",
       "RF",
       "조명"
      ],
      "ans": 0
     }
    ],
    "figs": [
     {
      "kind": "hmi",
      "tool": "REVIEW",
      "status": "IDLE",
      "state": "idle",
      "rows": [
       [
        "Ch.1",
        "TERMS"
       ],
       [
        "Ch.2",
        "PARTS"
       ],
       [
        "Ch.3",
        "OPERATION"
       ]
      ]
     },
     {
      "kind": "sticker",
      "level": "info",
      "en": "CHECKPOINT — READ & JUDGE",
      "ko": "중간 점검 — 읽고 판단"
     }
    ]
   },
   {
    "type": "wrap",
    "title": "중간 점검 정리",
    "points": [
     "장비 구성 · 운전 · 로그 · 알람 영어를 점검했다.",
     "다음 챕터(CH 9)부터는 디자인(Layer·DRC·LVS)으로 넘어간다."
    ],
    "done": "**중간 점검 완료 ✓**"
   }
  ]
 },
 {
  "id": "w9",
  "title": "안전 작업 — LOTO · 가스 · 작업 허가",
  "slides": [
   {
    "type": "story",
    "icon": "☣️",
    "title": "새벽 2시, 작업 허가서 한 장",
    "text": "새벽 2시. 민수는 가스 밸브 박스(**VMB**) 앞에서 오늘 받은 **작업 허가서(Permit to Work)** 를 다시 읽는다. 작업은 염소(**Cl2**) 라인의 피팅 교체 — 가스 배관을 여는 **line break** 다. 허가서 한가운데 이런 줄이 있다. \"**The line shall be cycle-purged and verified before the line break.**\" 옆에 있던 선배가 묻는다. \"여기 should 라고 쓰여 있어, shall 이라고 쓰여 있어?\" 민수는 대수롭지 않게 답한다. \"그게 그거 아닌가요?\" 선배는 고개를 젓는다. \"should 면 권장이고, shall 이면 안 하면 위반이야.\" 그때 벽의 가스 감지기 화면이 노랗게 바뀐다. **TGM — Cl2 0.06 ppm — LEVEL 1 WARNING**. 허가서의 다음 줄: \"**If any gas alarm activates, work shall stop immediately.**\" 민수는 공구를 내려놓는다. 1부에서 우리는 화면 한 줄을 읽었다. 2부부터는 **규정문 한 단어**가 결정을 바꾸는 문서를 읽는다.",
    "figs": [
     {
      "kind": "alarm",
      "level": "warn",
      "code": "TGM-03",
      "en": "Cl2 0.06 ppm — LEVEL 1 WARNING. Stop work and report.",
      "ko": "염소 0.06 ppm — 1차 경보. 작업 중지 후 보고."
     }
    ]
   },
   {
    "type": "scene",
    "title": "오늘의 현장 · 상황 설정",
    "where": "새벽의 가스 구역 — 가스 밸브 박스(VMB) 앞. 벽에는 가스 감지기(TGM) 화면이 있다.",
    "tool": "작업 허가서(Permit to Work), 개인 자물쇠와 표찰(LOTO), 가스 감지기 화면, 물질안전보건자료(SDS).",
    "situation": "염소 라인을 열기 전, 허가서의 영어 조건을 하나씩 확인해야 한다. 그 사이 감지기에 1차 경보가 뜬다.",
    "meet": [
     "조동사 shall · must · should · may",
     "LOTO 6단계",
     "가스 경보 LEVEL 1 / LEVEL 2",
     "작업 허가서 PTW · line break",
     "SDS 유해 문구 H330"
    ],
    "goal": "규정문의 조동사로 \"반드시 / 권장 / 해도 됨 / 안 해도 됨\"을 가르고, 경보 한 줄로 지금 할 일을 정하기.",
    "bg": "w9"
   },
   {
    "type": "read",
    "title": "2부의 시작 — 단어에서 규정문으로",
    "intro": "1부(1~8강)는 화면 라벨과 짧은 명령문을 알아보는 연습이었다. 2부는 문장이 길어지고, 문장 안의 작은 단어 하나가 의무인지 권장인지를 가르는 문서를 읽는다.",
    "paras": [
     "1부의 영어는 **label(라벨)** 과 **imperative(명령문)** 였다. RF ON, \"Close the gate valve.\" — 무엇을 하라는지만 알면 됐다.",
     "안전 규정·작업 허가서·SDS 같은 문서는 다르다. 같은 동작이라도 앞에 붙은 **조동사(modal verb)** 에 따라 \"반드시 해야 한다\"가 되기도, \"하면 좋다\"가 되기도 한다.",
     "예를 들어 \"The operator **shall** wear a face shield.\" 는 의무다. 안 쓰면 규정 위반이다. \"The operator **should** wear a face shield.\" 는 권장이다. 이 차이를 놓치면 지켜야 할 것을 선택 사항으로 읽게 된다.",
     "안전 문서는 대개 장비사가 아니라 **사업장(fab)과 표준(SEMI·OSHA·ISO)** 에서 온다. 그래서 장비 매뉴얼보다 문장이 길고 조건(**if / unless / until / before**)이 많다.",
     "오늘 다룰 세 문서: **LOTO 절차서**(정비 전 에너지 차단), **가스 경보 대응 절차**(감지기가 울렸을 때), **작업 허가서와 SDS**(위험 작업의 조건과 물질의 위험)."
    ],
    "figs": [
     {
      "kind": "note",
      "title": "PART 2",
      "en": "Read the [modal verb] first: it tells you whether a step is required.",
      "ko": "조동사부터 읽어라 — 그 단계가 의무인지 알려 준다."
     }
    ]
   },
   {
    "type": "read",
    "title": "shall · must · should · may — 조동사의 강도",
    "intro": "규정문을 읽을 때 가장 먼저 볼 단어는 동사 앞의 조동사다. 표준 문서(ISO 지침)는 이 단어들의 뜻을 정해 두고 쓴다.",
    "paras": [
     "**shall** — 요구사항(requirement). 지키지 않으면 규정 위반이다. 표준·사업장 규정에서 가장 강한 말이다. **shall not** 은 금지다.",
     "**must** — 장비 매뉴얼과 안전 표지에서 shall 과 같은 무게(반드시)로 쓴다. **must not** 은 금지다. (ISO 표준 문서는 must 를 법·물리 같은 외부 제약에만 쓰지만, 현장 매뉴얼에서는 그냥 \"반드시\"로 읽으면 된다.)",
     "**should** — 권고(recommendation). 하는 것이 좋지만, 정당한 이유가 있으면 다르게 할 수 있다. 의무가 아니다.",
     "**may** — 허용(permission). 해도 된다. 예: \"The technician **may** use a torque wrench with a digital readout.\" 다른 공구를 써도 위반이 아니다.",
     "**need not** — 의무가 아님. \"안 해도 된다\"이지, \"하지 마라\"가 아니다. 반대로 **must not** 은 \"하지 마라\"다. 두 말은 우리말로 옮기면 비슷해 보여 가장 자주 헷갈린다.",
     "**may not** 은 주의한다. \"하면 안 된다\"(금지)로도, \"아닐 수도 있다\"(가능성)로도 읽힌다. 그래서 표준은 금지에 may not 대신 **shall not** 을 쓴다. 현장에서 may not 을 만나면 문맥을 확인하고, 애매하면 묻는다."
    ],
    "figs": [
     {
      "kind": "step",
      "title": "STRENGTH",
      "items": [
       [
        "[shall] / [must] — required",
        "반드시"
       ],
       [
        "[should] — recommended",
        "권장"
       ],
       [
        "[may] — permitted",
        "해도 됨"
       ],
       [
        "[need not] — not required",
        "안 해도 됨"
       ]
      ]
     }
    ]
   },
   {
    "type": "read",
    "title": "LOTO 다시 보기 — 잠그기 전과 잠근 후",
    "intro": "7강에서 LOTO(잠금·표찰)를 \"정비 전에 거는 것\"으로 만났다. 실제 절차서는 여섯 단계이고, 순서가 바뀌면 의미가 없어진다.",
    "paras": [
     "**1. Prepare / Notify** — 영향받는 사람에게 장비를 멈춘다고 알린다. \"Notify affected personnel before shutdown.\"",
     "**2. Shut down** — 정상 정지 순서로 멈춘다. 운전 중에 전원부터 끊으면 공정과 장비가 비정상으로 멈춘다.",
     "**3. Isolate** — 에너지원을 하나씩 끊는다. 반도체 장비는 전기만이 아니다: **AC main breaker(주전원)**, **RF generator**, **CDA(압축공기, 공압)**, **process gas(공정 가스)**, **heater(열)**.",
     "**4. Lock & Tag** — 끊은 지점마다 **본인의 자물쇠와 표찰**을 단다. 원칙은 **one person, one lock, one key** — 내 자물쇠의 열쇠는 나만 갖는다.",
     "**5. Release stored energy** — 끊어도 남아 있는 에너지를 뺀다. 공압 라인의 잔압을 빼고(**bleed**), 가스 라인을 퍼지하고(**purge**), 뜨거운 부품은 식힌다.",
     "**6. Verify (try-out)** — 정말 에너지가 없는지 확인한다. 시작 버튼을 눌러 장비가 **움직이지 않는지** 보고, 측정기로 **0 V** 를 확인한다. 이것이 **zero energy state(무에너지 상태)** 다. 확인 전에는 손대지 않는다."
    ],
    "figs": [
     {
      "kind": "sticker",
      "level": "danger",
      "en": "DANGER — LOCKED OUT. DO NOT OPERATE.",
      "ko": "위험 — 잠금 중. 조작 금지."
     }
    ]
   },
   {
    "type": "read",
    "title": "가스 이름보다 성질을 읽어라 — toxic · pyrophoric · corrosive · oxidizer",
    "intro": "가스 캐비닛과 배관 라벨에는 가스 이름과 함께 그 가스의 위험 성질이 영어로 적혀 있다. 대처 방법은 이름이 아니라 성질이 정한다.",
    "paras": [
     "**toxic(독성)** — 들이마시면 해롭다. 예: **AsH3(arsine)**, **PH3(phosphine)** — 이온주입에 쓰며 아주 낮은 농도에서도 위험하다.",
     "**pyrophoric(자연발화성)** — 공기와 닿기만 해도 불이 붙는다. 대표가 **SiH4(silane)**. 그래서 SiH4 라인을 열 때는 공기가 닿지 않게 퍼지가 필수다.",
     "**corrosive(부식성)** — 금속과 피부를 상하게 한다. 예: **Cl2**, **HBr** — 식각에 쓴다. 독성도 함께 있다.",
     "**oxidizer(산화성)** — 스스로 타지 않지만 다른 것을 더 잘 타게 한다. 예: **NF3** — 챔버 세정에 쓴다.",
     "농도 단위는 **ppm(백만분율)** 과 **ppb(십억분율)**. **1 ppm = 1,000 ppb**. 아주 독한 가스는 감지기가 ppb 로 표시하기도 하므로, 숫자보다 단위를 먼저 본다.",
     "**TLV(Threshold Limit Value, 노출 기준)** 는 하루 8시간 일해도 대부분의 사람에게 해가 없다고 보는 평균 농도다. 예(ACGIH TLV-TWA): Cl2 **0.1 ppm**, SiH4 **5 ppm**, AsH3 **0.005 ppm**. 숫자가 작을수록 독한 가스다."
    ],
    "figs": [
     {
      "kind": "hmi",
      "tool": "GAS CABINET GC-07",
      "status": "ONLINE",
      "state": "run",
      "rows": [
       [
        "GAS",
        "SiH4 (silane)"
       ],
       [
        "HAZARD",
        "PYROPHORIC · FLAMMABLE",
        "warn"
       ],
       [
        "CYL PRESS",
        "1,250 psig"
       ],
       [
        "EXHAUST",
        "OK"
       ]
      ]
     }
    ]
   },
   {
    "type": "read",
    "title": "경보 화면 읽기 — LEVEL 1 과 LEVEL 2 는 행동이 다르다",
    "intro": "가스 감지기(TGM)는 보통 두 단계로 울린다. 단계마다 해야 할 일이 다르고, 경보 문구가 그 일을 영어 명령문으로 알려 준다.",
    "paras": [
     "**LEVEL 1 / WARNING** — 농도가 오르고 있다. 이 교재 실습에서는 **TLV 의 50%** 에 둔다. 할 일: \"Stop work, secure the area, and report to the supervisor.\" — 하던 작업을 멈추고, 그 자리를 안전하게 두고, 보고한다.",
     "**LEVEL 2 / ALARM** — 위험 농도다. 이 교재 실습에서는 **TLV 100%** 에 둔다. 할 일: \"Evacuate immediately via the nearest exit.\" — 즉시 대피한다. 장비를 정리하거나 원인을 보러 가지 않는다.",
     "대피 후의 핵심 문장: \"Do not re-enter until the ERT gives the all-clear.\" — 비상대응팀(**ERT**)이 **all-clear(해제)** 를 줄 때까지 다시 들어가지 않는다.",
     "경보와 함께 장비가 스스로 가스를 끊기도 한다: \"Gas cabinet auto shut-off activated.\" 이건 장비가 한 일이지, 내가 대피하지 않아도 된다는 뜻이 아니다.",
     "경보 단계 값은 **사업장마다 다르다**. 실제 현장에서는 그 사업장 절차서의 숫자를 따른다. 이 강에서 익힐 것은 숫자가 아니라 **\"단계 → 행동\"** 의 연결이다."
    ],
    "figs": [
     {
      "kind": "alarm",
      "level": "danger",
      "code": "TGM-03",
      "en": "Cl2 0.12 ppm — LEVEL 2 ALARM. Evacuate immediately.",
      "ko": "염소 0.12 ppm — 2차 경보. 즉시 대피."
     }
    ]
   },
   {
    "type": "read",
    "title": "작업 허가서(Permit to Work) — 누가, 무엇을, 언제까지",
    "intro": "가스 배관을 여는 일(line break), 불꽃이 나는 일(hot work), 좁은 공간에 들어가는 일(confined space)은 허가서 없이 시작할 수 없다. 허가서는 칸마다 정해진 영어를 쓴다.",
    "paras": [
     "**Scope of work** — 작업 범위. 예: \"Replace the VCR fitting on the Cl2 line at VMB-3.\" 범위 밖의 일은 허가되지 않은 일이다.",
     "**Hazards / Isolation points** — 위험 요소와 차단 지점. 예: \"Cl2 (toxic, corrosive); isolate at VMB-3 valve V2.\"",
     "**Precautions** — 조건. 여기에 조동사가 몰려 있다. \"The line **shall** be cycle-purged ...\", \"A second person **shall** be present.\"",
     "**Authorized by / Issued to** — 허가한 사람과 받은 사람. 서명(**sign-off**)이 없으면 시작할 수 없다.",
     "**Valid until** — 유효 기간. 예: \"Valid until 06:00 today.\" 시간을 넘기면 허가서가 만료(**expired**)되어 다시 받아야 한다.",
     "**Cycle purge** — 진공으로 빼고 N2 로 채우기를 여러 번 반복해 배관 속 가스를 없애는 방법. 한 번의 퍼지로는 배관 구석에 남은 가스가 빠지지 않는다."
    ],
    "figs": [
     {
      "kind": "log",
      "title": "PERMIT PTW-1182",
      "lines": [
       "TYPE: [LINE BREAK] — Cl2, VMB-3",
       "VALID UNTIL: 06:00",
       "STATUS: [ISSUED] — awaiting sign-off"
      ]
     }
    ]
   },
   {
    "type": "acr",
    "title": "약어",
    "intro": "안전 절차서·경보 화면·허가서에 반복해서 나오는 약어입니다.",
    "items": [
     {
      "ab": "LOTO",
      "full": "Lockout / Tagout",
      "ko": "잠금·표찰 — 정비 전 위험 에너지 차단"
     },
     {
      "ab": "PTW",
      "full": "Permit to Work",
      "ko": "작업 허가서 — 위험 작업의 조건·서명"
     },
     {
      "ab": "TGM",
      "full": "Toxic Gas Monitor",
      "ko": "독성 가스 감지기 — 농도 표시·경보"
     },
     {
      "ab": "VMB",
      "full": "Valve Manifold Box",
      "ko": "가스 밸브 박스 — 가스를 장비별로 나눠 보내는 곳"
     },
     {
      "ab": "EMO",
      "full": "Emergency Off",
      "ko": "비상 정지 버튼 — 장비 전원 즉시 차단"
     },
     {
      "ab": "SDS",
      "full": "Safety Data Sheet",
      "ko": "물질안전보건자료 — 화학물질의 위험·조치 16개 항목"
     },
     {
      "ab": "TLV",
      "full": "Threshold Limit Value",
      "ko": "노출 기준 — 하루 8시간 평균 허용 농도"
     },
     {
      "ab": "ERT",
      "full": "Emergency Response Team",
      "ko": "비상대응팀 — 대피 해제(all-clear)를 준다"
     },
     {
      "ab": "SCBA",
      "full": "Self-Contained Breathing Apparatus",
      "ko": "공기호흡기 — 가스 누출 현장 진입용"
     },
     {
      "ab": "ppm / ppb",
      "full": "parts per million / billion",
      "ko": "백만분율 / 십억분율 — 1 ppm = 1,000 ppb"
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (1) — 조동사 · 규정어",
    "intro": "규정문에서 의무의 세기를 정하는 말입니다. 예문을 읽으며 \"반드시 / 권장 / 해도 됨 / 안 해도 됨 / 금지\" 중 무엇인지 가려 보세요.",
    "items": [
     {
      "en": "shall",
      "ko": "~해야 한다 (요구)",
      "d": "표준·규정의 의무. 안 지키면 위반",
      "ex": "The operator shall wear chemical-resistant gloves when handling the bubbler."
     },
     {
      "en": "shall not / must not",
      "ko": "~해서는 안 된다 (금지)",
      "d": "금지. 예외 없음",
      "ex": "Personnel must not enter the gas cabinet area without a buddy."
     },
     {
      "en": "should",
      "ko": "~하는 것이 좋다 (권고)",
      "d": "권장. 정당한 이유가 있으면 달리 할 수 있다",
      "ex": "Leak checks should be performed at the start of each shift."
     },
     {
      "en": "may",
      "ko": "~해도 된다 (허용)",
      "d": "선택 가능. 하지 않아도 위반 아님",
      "ex": "The technician may use a digital torque wrench instead of a click type."
     },
     {
      "en": "need not",
      "ko": "~하지 않아도 된다 (의무 아님)",
      "d": "\"하지 마라\"가 아니다",
      "ex": "The tool need not be vented for a software-only update."
     },
     {
      "en": "prior to",
      "ko": "~하기 전에",
      "d": "before 의 문서체. 순서 조건",
      "ex": "Verify zero energy prior to opening any panel."
     }
    ],
    "figs": [
     {
      "kind": "sticker",
      "level": "warn",
      "en": "Face shield shall be worn beyond this point.",
      "ko": "이 지점부터 안면 보호구 착용 의무."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (1) — 조동사의 강도",
    "intro": "규정 문장의 조동사를 보고 그 줄이 무엇을 요구하는지 고르세요.",
    "questions": [
     {
      "prompt": "허가서: 'A second person shall be present during the line break.' 이 줄의 뜻은?",
      "opts": [
       "두 번째 사람이 있으면 좋다",
       "두 번째 사람이 반드시 있어야 한다 — 없으면 시작할 수 없다",
       "두 번째 사람은 있어도 되고 없어도 된다"
      ],
      "ans": 1
     },
     {
      "prompt": "매뉴얼: 'The tool need not be vented for a software-only update.' 소프트웨어만 업데이트할 때는?",
      "opts": [
       "벤트를 하면 안 된다",
       "벤트를 반드시 해야 한다",
       "벤트(대기압 복귀)를 하지 않아도 된다"
      ],
      "ans": 2
     },
     {
      "prompt": "'Leak checks should be performed at the start of each shift.' 어떤 무게의 문장인가?",
      "opts": [
       "권장 — 하는 것이 좋다",
       "의무 — 안 하면 위반이다",
       "금지 — 하지 마라"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (2) — LOTO 동작어",
    "intro": "LOTO 절차서의 각 단계를 여는 동사와 상태어입니다.",
    "items": [
     {
      "en": "isolate",
      "ko": "차단하다",
      "d": "에너지원(전기·공압·가스·열)을 장비에서 끊는 것",
      "ex": "Isolate all energy sources, including CDA and process gas, before servicing."
     },
     {
      "en": "de-energize",
      "ko": "전원을 내리다",
      "d": "전기 에너지를 없앤 상태로 만드는 것",
      "ex": "De-energize the RF generator and wait five minutes for the capacitors to discharge."
     },
     {
      "en": "bleed",
      "ko": "잔압을 빼다",
      "d": "닫은 뒤에도 배관에 남은 압력을 빼는 것",
      "ex": "Bleed the residual pressure from the CDA line after closing the supply valve."
     },
     {
      "en": "try-out",
      "ko": "작동 시도 확인",
      "d": "잠근 뒤 시작을 눌러 움직이지 않음을 확인하는 것",
      "ex": "Perform a try-out: press START and confirm that the tool does not respond."
     },
     {
      "en": "zero energy state",
      "ko": "무에너지 상태",
      "d": "모든 에너지원이 끊기고 남은 에너지도 없는 상태",
      "ex": "Do not touch any part until a zero energy state has been verified."
     },
     {
      "en": "remove a lock",
      "ko": "자물쇠를 풀다",
      "d": "단 사람만 풀 수 있다",
      "ex": "Only the person who applied the lock may remove it."
     }
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — LOTO 절차서",
    "doc": {
     "name": "FAB-SAFE Lockout/Tagout Procedure",
     "no": "SOP-EHS-012",
     "sec": "4",
     "rev": "F",
     "page": "4-1"
    },
    "heading": "4  Energy Control Procedure — Etch Tool",
    "steps": [
     "Notify all affected personnel that the tool will be shut down for service.",
     "Shut down the tool using the normal stop sequence.",
     {
      "t": "Isolate each energy source: AC main breaker, RF generator, CDA supply, and process gas at the VMB.",
      "note": {
       "kind": "note",
       "en": "The RF generator has its own breaker. It shall be isolated separately."
      }
     },
     "Apply your personal lock and tag to every isolation point.",
     {
      "t": "Release stored energy: bleed the CDA line and cycle-purge the gas line.",
      "note": {
       "kind": "caution",
       "en": "The heater may remain hot for 30 minutes after power-off."
      }
     },
     {
      "t": "Verify zero energy: perform a try-out and measure 0 V at the main terminal.",
      "note": {
       "kind": "warning",
       "en": "Do not begin work until the try-out has been completed."
      }
     }
    ],
    "callout": {
     "kind": "danger",
     "en": "Only the person who applied a lock shall remove it."
    },
    "gloss": [
     [
      "isolation point",
      "차단 지점"
     ],
     [
      "stored energy",
      "잔류 에너지"
     ],
     [
      "try-out",
      "작동 시도 확인"
     ],
     [
      "terminal",
      "단자"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (2) — LOTO 절차",
    "intro": "절차서 문장을 읽고 올바른 판단을 고르세요.",
    "questions": [
     {
      "prompt": "'The RF generator has its own breaker. It shall be isolated separately.' 이 문장이 경고하는 실수는?",
      "opts": [
       "RF 전원을 너무 일찍 켜는 것",
       "RF 출력을 낮게 설정하는 것",
       "주전원만 내리고 RF 전원은 살아 있는 채로 작업하는 것"
      ],
      "ans": 2
     },
     {
      "prompt": "자물쇠를 다 걸었다. 절차서 다음 줄은 'Release stored energy: bleed the CDA line.' 왜 필요한가?",
      "opts": [
       "밸브를 닫아도 배관 안에 압력이 남아 있기 때문에",
       "자물쇠가 제대로 걸렸는지 보려고",
       "공압이 부족해 보충하려고"
      ],
      "ans": 0
     },
     {
      "prompt": "'Only the person who applied a lock shall remove it.' 동료의 자물쇠가 걸려 있는데 동료가 퇴근했다. 맞는 것은?",
      "opts": [
       "급하면 내가 풀어도 된다",
       "내가 풀지 않는다 — 절차에 따라 감독자에게 보고한다",
       "절단기로 자르고 작업을 시작한다"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (3) — 가스 · 경보",
    "intro": "가스 라벨과 감지기 화면, 경보 문구에서 만나는 말입니다.",
    "items": [
     {
      "en": "toxic",
      "ko": "독성의",
      "d": "흡입하면 해로운 — AsH3, PH3, Cl2",
      "ex": "Arsine is extremely toxic even at very low concentrations."
     },
     {
      "en": "pyrophoric",
      "ko": "자연발화성의",
      "d": "공기에 닿으면 저절로 불이 붙는 — SiH4",
      "ex": "Silane is pyrophoric, so the line must be purged before it is opened."
     },
     {
      "en": "corrosive",
      "ko": "부식성의",
      "d": "금속·피부를 상하게 하는 — Cl2, HBr",
      "ex": "Chlorine is corrosive and attacks stainless steel when moisture is present."
     },
     {
      "en": "concentration",
      "ko": "농도",
      "d": "ppm·ppb 로 표시",
      "ex": "The monitor shows the Cl2 concentration in ppm."
     },
     {
      "en": "evacuate",
      "ko": "대피하다",
      "d": "그 구역을 즉시 떠나는 것",
      "ex": "Evacuate the area immediately when the LEVEL 2 alarm sounds."
     },
     {
      "en": "all-clear",
      "ko": "경보 해제",
      "d": "비상대응팀이 재진입을 허락하는 것",
      "ex": "Do not re-enter the area until the ERT gives the all-clear."
     }
    ],
    "figs": [
     {
      "kind": "meter",
      "name": "TGM-03  Cl2",
      "sp": "0.05 (L1)",
      "pv": "0.06",
      "unit": "ppm",
      "state": "warn",
      "note": "PV is above the LEVEL 1 set point."
     }
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — 가스 경보 대응",
    "doc": {
     "name": "FAB-SAFE Emergency Response Guide",
     "no": "ERG-003",
     "sec": "2",
     "rev": "D",
     "page": "2-3"
    },
    "heading": "2  Toxic Gas Alarm Response",
    "steps": [
     {
      "t": "LEVEL 1 (WARNING): Stop work and secure the area. Report to the supervisor.",
      "note": {
       "kind": "note",
       "en": "Do not open any gas line while a LEVEL 1 warning is active."
      }
     },
     {
      "t": "LEVEL 2 (ALARM): Evacuate immediately via the nearest exit.",
      "note": {
       "kind": "warning",
       "en": "Do not stop to shut down tools or investigate the source."
      }
     },
     "Go to the assembly point and report to the area warden.",
     "Do not re-enter until the ERT gives the all-clear."
    ],
    "callout": {
     "kind": "danger",
     "en": "Only ERT members wearing SCBA may enter an area in LEVEL 2 alarm."
    },
    "gloss": [
     [
      "secure the area",
      "현장을 안전하게 정리"
     ],
     [
      "assembly point",
      "집결 장소"
     ],
     [
      "area warden",
      "구역 안전 담당"
     ],
     [
      "investigate",
      "원인을 조사하다"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (3) — 경보 문장 판단",
    "intro": "경보 대응 절차를 읽고 행동을 고르세요.",
    "questions": [
     {
      "prompt": "LEVEL 2 경보. 절차서: 'Do not stop to shut down tools or investigate the source.' 맞는 행동은?",
      "opts": [
       "장비를 정리하지 않고 가장 가까운 출구로 바로 대피한다",
       "하던 웨이퍼를 마저 꺼내고 대피한다",
       "어디서 새는지 확인하고 대피한다"
      ],
      "ans": 0
     },
     {
      "prompt": "대피 후 10분, 경보음이 멈췄다. 'Do not re-enter until the ERT gives the all-clear.' 들어가도 되는가?",
      "opts": [
       "경보음이 멈췄으니 들어간다",
       "아니다 — 비상대응팀의 해제(all-clear)가 있어야 한다",
       "감독자 혼자 판단해 들어간다"
      ],
      "ans": 1
     },
     {
      "prompt": "'Only ERT members wearing SCBA may enter an area in LEVEL 2 alarm.' 이 문장의 may 는?",
      "opts": [
       "권고 — 누구나 들어가는 것이 좋다",
       "가능성 — 들어갈지도 모른다",
       "허용 — 그 조건을 갖춘 사람만 들어갈 수 있다"
      ],
      "ans": 2
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (4) — 작업 허가서",
    "intro": "허가서 양식의 칸 이름과, 그 칸에 들어가는 표현입니다.",
    "items": [
     {
      "en": "permit to work",
      "ko": "작업 허가서",
      "d": "위험 작업의 범위·조건·서명을 적은 문서",
      "ex": "A permit to work is required for any line break on a toxic gas line."
     },
     {
      "en": "line break",
      "ko": "배관 개방 작업",
      "d": "가스·약액 배관을 여는 모든 작업",
      "ex": "The line break shall not begin until the line has been cycle-purged."
     },
     {
      "en": "cycle purge",
      "ko": "반복 퍼지",
      "d": "진공 배기와 N2 충전을 여러 번 반복",
      "ex": "Cycle-purge the line at least ten times with nitrogen."
     },
     {
      "en": "scope of work",
      "ko": "작업 범위",
      "d": "허가된 일의 경계 — 밖의 일은 허가 안 됨",
      "ex": "Replacing the regulator is outside the scope of work on this permit."
     },
     {
      "en": "sign off",
      "ko": "서명하다 / 승인하다",
      "d": "확인했다는 서명",
      "ex": "The area owner must sign off the permit before work starts."
     },
     {
      "en": "expire",
      "ko": "만료되다",
      "d": "유효 시간이 지나 효력을 잃음",
      "ex": "This permit expires at 06:00; a new permit is required after that."
     }
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — 작업 허가서",
    "doc": {
     "name": "Permit to Work — Line Break",
     "no": "PTW-1182",
     "sec": "—",
     "rev": "A",
     "page": "1/1"
    },
    "heading": "Line Break Permit — Cl2 line, VMB-3",
    "intro": "Scope of work: Replace the VCR fitting downstream of valve V2. Valid until 06:00.",
    "steps": [
     {
      "t": "The line shall be cycle-purged and verified before the line break.",
      "note": {
       "kind": "note",
       "en": "Purge record: 10 cycles, N2, signed by the gas technician."
      }
     },
     "A second person shall be present at all times during the work.",
     "Respirators should be staged at the work area.",
     {
      "t": "If any gas alarm activates, work shall stop immediately.",
      "note": {
       "kind": "warning",
       "en": "Resume only after the supervisor re-authorizes the permit."
      }
     },
     "The permit holder may extend the work by one hour with the supervisor's approval."
    ],
    "callout": {
     "kind": "caution",
     "en": "This permit expires at 06:00. Work outside the scope requires a new permit."
    },
    "gloss": [
     [
      "downstream",
      "(흐름의) 뒤쪽"
     ],
     [
      "staged",
      "미리 갖춰 둔"
     ],
     [
      "re-authorize",
      "다시 허가하다"
     ],
     [
      "permit holder",
      "허가서를 받은 사람"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (4) — 허가서 읽기",
    "intro": "위 허가서 PTW-1182 의 문장을 근거로 판단하세요.",
    "questions": [
     {
      "prompt": "작업 중 보니 레귤레이터도 교체가 필요해 보인다. 허가서의 범위는 'Replace the VCR fitting downstream of valve V2.' 맞는 것은?",
      "opts": [
       "같은 라인이니 함께 교체한다",
       "권장 사항이므로 판단에 맡긴다",
       "범위 밖이므로 새 허가서를 받아야 한다"
      ],
      "ans": 2
     },
     {
      "prompt": "'Respirators should be staged at the work area.' 와 'A second person shall be present.' 를 비교하면?",
      "opts": [
       "둘 다 의무",
       "호흡보호구 비치는 권장, 두 번째 사람은 의무",
       "둘 다 권장"
      ],
      "ans": 1
     },
     {
      "prompt": "05:50, 작업이 20분 더 걸린다. 'The permit holder may extend the work by one hour with the supervisor's approval.' 어떻게 하나?",
      "opts": [
       "감독자 승인을 받으면 연장할 수 있다",
       "승인 없이 20분 더 한다",
       "연장은 금지되어 있다"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "manual",
    "mtitle": "SAFETY DATA SHEET — CHLORINE (Cl2), EXCERPT",
    "paras": [
     "SECTION 2. Hazard(s) identification — Signal word: DANGER.",
     "해설: 2항은 이 물질의 위험을 요약한다. 신호어 DANGER 는 WARNING 보다 높은 단계다.",
     "H270 May cause or intensify fire; oxidiser. H330 Fatal if inhaled. H314 Causes severe skin burns and eye damage.",
     "해설: H 로 시작하는 유해 문구(hazard statement). 스스로 타지는 않지만 불을 키우고(H270), 들이마시면 치명적이며(H330), 피부·눈에 심한 화상을 입힌다(H314).",
     "SECTION 4. First-aid measures — Inhalation: Remove the person to fresh air. Call for medical help immediately.",
     "해설: 4항은 응급조치. 흡입 시 신선한 공기가 있는 곳으로 옮기고 즉시 의료 지원을 부른다. 단, 구조자도 보호구 없이 오염 구역에 들어가지 않는다.",
     "SECTION 8. Exposure controls / personal protection — TLV-TWA 0.1 ppm. Use only with adequate exhaust ventilation.",
     "해설: 8항은 노출 기준과 보호구. 8시간 평균 0.1 ppm, 충분한 배기 환기 안에서만 쓴다. 감지기의 경보 값은 이 숫자에서 출발한다."
    ],
    "figs": [
     {
      "kind": "sticker",
      "level": "danger",
      "icon": "☠",
      "en": "DANGER — Fatal if inhaled.",
      "ko": "위험 — 흡입하면 치명적."
     }
    ]
   },
   {
    "type": "manual",
    "mtitle": "GENERAL SAFETY REQUIREMENTS — GAS AREA",
    "paras": [
     "1. Personnel shall complete gas safety training before entering the gas area.",
     "해설: 가스 구역에 들어가기 전에 가스 안전 교육을 반드시 마쳐야 한다. (shall = 의무)",
     "2. Personnel must not work alone on any toxic gas line.",
     "해설: 독성 가스 라인에서 혼자 작업해서는 안 된다. (must not = 금지)",
     "3. A portable gas detector should be carried during any line break.",
     "해설: 배관 개방 작업 중에는 휴대용 가스 감지기를 지니는 것이 좋다. (should = 권장)",
     "4. Visitors may enter the gas area only when escorted.",
     "해설: 방문자는 안내자와 함께일 때만 들어갈 수 있다. (may … only when = 조건이 맞을 때만 허용)",
     "5. A face shield need not be worn inside the control room.",
     "해설: 통제실 안에서는 안면 보호구를 쓰지 않아도 된다. (need not = 의무 아님, 금지 아님)"
    ]
   },
   {
    "type": "sim",
    "which": "safety",
    "mode": "modal",
    "intro": "먼저 **규정 문장 판정** 실습입니다. 안전 규정집에서 뽑은 문장을 하나씩 읽고, 그 줄이 **반드시(required) / 금지(prohibited) / 권장(recommended) / 해도 됨(permitted) / 안 해도 됨(not required)** 중 무엇인지 고르세요. 판단의 근거는 동사 앞의 조동사 하나입니다."
   },
   {
    "type": "sim",
    "which": "safety",
    "mode": "loto",
    "intro": "다음은 **LOTO 순서** 실습입니다. 식각 장비 정비를 앞두고 영어 지시 카드가 섞여 있습니다. 지금 해도 되는 카드를 골라 순서대로 누르세요. 순서가 틀리면 왜 안 되는지 로그가 알려 줍니다. 카드 중에는 **절차서에 없는 지름길**도 섞여 있습니다."
   },
   {
    "type": "sim",
    "which": "safety",
    "mode": "gas",
    "intro": "마지막은 **가스 경보 판독** 실습입니다. 감지기 화면의 가스·농도·**단위(ppm / ppb)** 를 읽고, 이 교재 설정(1차 = TLV 50%, 2차 = TLV 100%)으로 단계를 판정한 뒤, 그 단계에 맞는 영어 행동 지시를 고르세요."
   },
   {
    "type": "comm",
    "items": [
     {
      "sit": "해외 엔지니어가 허가서 조건을 확인한다",
      "q": {
       "en": "Has the line been cycle-purged? The permit says it shall be verified before the break.",
       "ko": "라인 반복 퍼지 했나요? 허가서에 개방 전에 확인해야 한다고 되어 있어요."
      },
      "a": {
       "en": "Yes. We did ten cycles with nitrogen, and the gas technician signed the purge record.",
       "ko": "네. 질소로 10회 했고, 가스 기술자가 퍼지 기록에 서명했습니다."
      }
     },
     {
      "sit": "작업 중 1차 경보가 울려 상황을 보고한다",
      "q": {
       "en": "What is the status? I heard the gas monitor went off.",
       "ko": "상황이 어때요? 가스 감지기가 울렸다고 들었어요."
      },
      "a": {
       "en": "We have a LEVEL 1 warning on TGM-03, chlorine at 0.06 ppm. We stopped work and secured the area. We are waiting for your instructions.",
       "ko": "TGM-03 에 1차 경보, 염소 0.06 ppm 입니다. 작업을 멈추고 현장을 정리했습니다. 지시를 기다리고 있습니다."
      }
     },
     {
      "sit": "정비를 넘겨받기 전 LOTO 상태를 묻는다",
      "q": {
       "en": "Is the tool locked out? Can I start on the chamber?",
       "ko": "장비 잠금 됐나요? 챔버 작업 시작해도 되나요?"
      },
      "a": {
       "en": "All four points are locked and tagged, but the try-out is not done yet. Please wait until I verify zero energy.",
       "ko": "네 곳 모두 잠금·표찰을 걸었지만 작동 확인은 아직입니다. 무에너지 상태를 확인할 때까지 기다려 주세요."
      }
     }
    ]
   },
   {
    "type": "wrap",
    "title": "정리 — 조동사가 행동을 정한다",
    "points": [
     "2부는 **규정문**을 읽는다. 동사보다 먼저 **조동사**를 본다: **shall / must** = 반드시, **should** = 권장, **may** = 해도 됨, **need not** = 안 해도 됨, **shall not / must not** = 금지.",
     "**need not** 과 **must not** 은 정반대다 — 하나는 \"안 해도 된다\", 하나는 \"하지 마라\".",
     "LOTO 는 여섯 단계: **Notify → Shut down → Isolate → Lock & Tag → Release stored energy → Verify(try-out)**. 확인 전에는 손대지 않는다.",
     "가스는 이름보다 **성질**(toxic · pyrophoric · corrosive · oxidizer)을 읽고, 농도는 숫자보다 **단위**(ppm / ppb)를 먼저 본다.",
     "경보는 **단계 → 행동**: LEVEL 1 = Stop work and report, LEVEL 2 = Evacuate immediately. 재진입은 **all-clear** 뒤에만.",
     "작업 허가서는 **scope · precautions · sign-off · valid until** — 범위 밖의 일, 만료된 허가서로는 일하지 않는다."
    ],
    "done": "이제 여러분은 안전 문서의 한 줄을 읽고 **그것이 의무인지, 권장인지, 금지인지** 가릴 수 있습니다. **Read the modal, then act.**",
    "figs": [
     {
      "kind": "step",
      "title": "LOTO",
      "items": [
       [
        "[Notify] affected personnel.",
        "알리기"
       ],
       [
        "[Isolate] every energy source.",
        "차단"
       ],
       [
        "[Lock] and [tag] each point.",
        "잠금·표찰"
       ],
       [
        "[Verify] zero energy.",
        "무에너지 확인"
       ]
      ]
     }
    ]
   }
  ]
 },
 {
  "id": "w10",
  "title": "레시피 · 변경 관리",
  "slides": [
   {
    "type": "story",
    "icon": "🧾",
    "title": "\"압력만 살짝 올려\"",
    "text": "새벽 4시. 지수는 폴리 식각 장비의 레시피 **ETCH-POLY-01 Rev C** 를 보고 있다. 최근 웨이퍼 가장자리 식각량이 조금씩 모자란다. 옆 라인 선배가 지나가며 말한다. \"메인 에치 압력 10에서 12로만 살짝 올려 봐. 그럼 맞을 거야.\" 지수가 레시피 편집 화면을 열자 노란 글씨가 뜬다. **RECIPE LOCKED — Changes require an approved ECN.** 공정 규정집에는 이렇게 적혀 있다. \"**A production recipe shall not be edited unless an ECN has been approved.**\" 승인된 변경 통지(**ECN**)가 없으면 고칠 수 없다는 뜻이다. 그 아래 줄도 있다. \"**An approved change may be released only if at least two qual wafers pass.**\" 고쳐도 바로 쓰는 게 아니라, 시험 웨이퍼(**qual wafer**) 두 장이 합격해야 한다. 지수는 레시피를 닫고 변경 요청서(**ECR**)를 쓰기 시작한다. 오늘의 영어는 **unless · only if · at least** — 조건과 경계를 정하는 말이다.",
    "figs": [
     {
      "kind": "hmi",
      "tool": "RECIPE EDITOR",
      "status": "LOCKED",
      "state": "fault",
      "rows": [
       [
        "RECIPE",
        "ETCH-POLY-01"
       ],
       [
        "REVISION",
        "Rev C"
       ],
       [
        "STATUS",
        "PRODUCTION",
        "warn"
       ]
      ],
      "banner": {
       "en": "Changes require an approved ECN.",
       "ko": "승인된 ECN 이 있어야 수정할 수 있다.",
       "level": "warn"
      }
     }
    ]
   },
   {
    "type": "scene",
    "title": "오늘의 현장 · 상황 설정",
    "where": "새벽의 식각 장비 앞 — 레시피 편집 화면(Recipe Editor)과 공정 규정집.",
    "tool": "레시피 표(step table), 끝점 검출(EPD) 화면, 변경 요청서(ECR), 시험 웨이퍼(qual wafer) 결과.",
    "situation": "식각량이 조금 모자라 레시피를 바꾸고 싶다. 하지만 레시피는 잠겨 있고, 규정은 조건을 달아 둔다.",
    "meet": [
     "조건어 unless · only if · provided that",
     "경계 not to exceed · at least · within ±",
     "레시피 표 STEP · END · EPD",
     "변경 관리 ECR → ECN → qual → release"
    ],
    "goal": "조건이 맞는지, 값이 경계 안인지 영어 문장 그대로 판단하기.",
    "bg": "w10"
   },
   {
    "type": "read",
    "title": "레시피는 왜 잠겨 있나 — production recipe 와 revision",
    "intro": "레시피(recipe)는 압력·가스·RF·시간 같은 공정 조건의 묶음이다. 같은 레시피를 쓰면 어느 장비, 어느 날이든 같은 결과가 나와야 한다.",
    "paras": [
     "양산에 쓰는 레시피를 **production recipe** 라고 한다. 누가 몰래 숫자 하나를 바꾸면 그 뒤에 흐른 웨이퍼 수백 장이 영향을 받는다. 그래서 장비는 레시피를 **locked(잠금)** 상태로 둔다.",
     "레시피에는 판 번호가 붙는다. **Rev C** 는 세 번째 판이라는 뜻이다. 바꾸면 **Rev D** 가 되고, 옛 판은 지우지 않고 남겨 둔다. 문제가 생기면 옛 판으로 되돌리기(**roll back**) 위해서다.",
     "바꾸는 길은 정해져 있다. 변경 요청(**ECR**) → 검토(**review**) → 승인된 변경 통지(**ECN**) → 시험 웨이퍼로 확인(**qualification**, 줄여서 **qual**) → 양산 적용(**release**).",
     "이 길을 거치지 않은 변경을 현장에서는 **unauthorized change(무단 변경)** 라고 부른다. 결과가 좋아도 위반이다. 기록이 없으면 다음 사람이 원인을 찾을 수 없기 때문이다.",
     "그래서 레시피 화면과 변경 규정의 영어는 거의 다 **조건문**이다 — 어떤 조건이 맞을 때만, 어떤 범위 안일 때만 허용한다."
    ],
    "figs": [
     {
      "kind": "log",
      "title": "RECIPE HISTORY",
      "lines": [
       "ETCH-POLY-01 Rev B — [ARCHIVED]",
       "ETCH-POLY-01 Rev C — [PRODUCTION] since 2026-09-14",
       "ETCH-POLY-01 Rev D — [DRAFT] ECR-0412 pending"
      ]
     }
    ]
   },
   {
    "type": "read",
    "title": "레시피 표 읽기 — STEP · END · TIME",
    "intro": "레시피 화면은 대개 표다. 한 줄이 한 단계(step)이고, 칸마다 그 단계의 설정값(setpoint)이 들어 있다.",
    "paras": [
     "**STEP** — 단계 이름. 식각이라면 **STAB(stabilize, 안정화)** → **BT(breakthrough, 표면 산화막 뚫기)** → **ME(main etch, 본 식각)** → **OE(over etch, 추가 식각)** → **PUMP(배기)** 순서가 흔하다.",
     "**END** — 그 단계가 언제 끝나는가. **TIME** 이면 정해진 시간이 지나면 끝나고, **EPD** 면 끝점 검출(endpoint detection)이 신호를 줄 때 끝난다.",
     "**TIME (s)** — 초 단위 시간. EPD 단계에는 보통 **MAX 60** 처럼 최대 시간이 붙는다. 60초 안에 끝점이 안 나오면 장비는 그 단계를 멈추고 알람을 낸다(**step timeout**).",
     "**PRESS (mTorr) · SRC / BIAS (W) · GAS (sccm)** — 압력, RF 전력(플라즈마를 만드는 source 와 이온을 끌어당기는 bias), 가스 유량. 1부에서 읽은 단위 그대로다.",
     "표 아래에는 거의 항상 **허용 범위(tolerance)** 가 한 줄 붙는다. 예: \"Pressure within ±5% of the setpoint.\" — 실제 값이 이 범위를 벗어나면 그 웨이퍼는 의심받는다."
    ],
    "figs": [
     {
      "kind": "hmi",
      "tool": "ETCH-POLY-01 · STEP 3",
      "status": "RUN",
      "state": "run",
      "rows": [
       [
        "STEP",
        "ME (main etch)"
       ],
       [
        "END",
        "EPD · MAX 60 s"
       ],
       [
        "PRESS SP / PV",
        "10.0 / 10.2 mTorr"
       ],
       [
        "SRC / BIAS",
        "600 / 120 W"
       ]
      ]
     }
    ]
   },
   {
    "type": "read",
    "title": "끝점(EPD)과 over-etch — \"언제 멈추나\"를 읽기",
    "intro": "식각은 시간이 아니라 \"막이 다 깎였는가\"로 멈추는 것이 이상적이다. 그 순간을 알려 주는 것이 끝점 검출(EPD)이다.",
    "paras": [
     "플라즈마는 빛을 낸다. 깎이는 막이 바뀌면 빛의 색(특정 파장의 세기)이 바뀐다. 이 변화를 **OES(optical emission spectroscopy)** 로 보다가 신호가 꺾이면 **endpoint detected** 다.",
     "웨이퍼 가운데와 가장자리는 식각 속도가 조금 다르다. 끝점은 대개 \"먼저 뚫린 곳\"에서 잡히므로, 남은 곳을 마저 깎는 **over etch(OE)** 단계를 둔다.",
     "OE 시간은 흔히 ME 시간의 비율로 적는다. 예: \"Over etch: **30% of the main etch time**.\" 끝점이 **40 s** 에 나왔다면 OE 는 **12 s** 다.",
     "끝점이 너무 빨리 나오면(예: 10 s) 웨이퍼나 막이 잘못 들어온 것일 수 있고, 너무 늦거나 안 나오면 식각 속도가 떨어진 것이다. 그래서 규정은 정상 범위를 적어 둔다: \"Endpoint shall be detected **between 30 and 60 s**.\"",
     "로그에서는 이렇게 보인다: STEP 3 ME — EPD triggered at 42.0 s / STEP 4 OE — 12.6 s (30% of ME). 숫자 두 개를 읽고 서로 맞는지 확인하는 것이 오늘 실습의 하나다."
    ]
   },
   {
    "type": "read",
    "title": "경계가 포함되는가 — not to exceed · below · at least · within ±",
    "intro": "허용 범위 문장은 숫자보다 그 앞의 말이 중요하다. 같은 \"20 W\"라도 20 W 가 합격인지 불합격인지가 말 하나로 갈린다.",
    "paras": [
     "**not to exceed 20 W / no more than 20 W / 20 W max** — 20 W 까지 허용(**≤ 20**). 20 W 는 합격.",
     "**below 20 W / less than 20 W / under 20 W** — 20 W 보다 작아야 한다(**< 20**). 20 W 는 불합격.",
     "**at least 5 min / a minimum of 5 min / no less than 5 min** — 5분 이상(**≥ 5**). 정확히 5분은 합격.",
     "**above / greater than / more than 95%** — 95% 보다 커야 한다(**> 95**). **greater than or equal to** 는 같아도 된다(**≥**).",
     "**within ±2 sccm of the setpoint** — 설정값 50 이면 **48 ~ 52**. 양 끝(48, 52)은 보통 포함한다. **between 30 and 60 s** 도 보통 양 끝을 포함한다 — 애매하면 문서는 **inclusive(포함)** / **exclusive(제외)** 를 적어 둔다.",
     "정리: 숫자를 읽기 전에 **경계어**를 읽는다. 경계값에 걸린 측정값이 가장 자주 판단이 갈리는 곳이다."
    ],
    "figs": [
     {
      "kind": "step",
      "title": "BOUNDARY",
      "items": [
       [
        "[not to exceed] 20 — ≤ 20",
        "20 포함"
       ],
       [
        "[below] 20 — < 20",
        "20 제외"
       ],
       [
        "[at least] 5 — ≥ 5",
        "5 포함"
       ],
       [
        "[within ±2] of 50 — 48 ~ 52",
        "양 끝 포함"
       ]
      ]
     }
    ]
   },
   {
    "type": "read",
    "title": "조건 연결어 — if · unless · provided that · only if",
    "intro": "변경 규정은 \"이럴 때만 된다\"를 여러 방법으로 말한다. 연결어마다 조건이 걸리는 방향이 다르다.",
    "paras": [
     "**if** — ~이면. \"If the endpoint is not detected within 60 s, the step aborts.\" 조건이 맞으면 뒤의 일이 일어난다.",
     "**unless** — ~이 아니면(= **if not**). \"The recipe shall not be edited unless an ECN has been approved.\" → ECN 승인이 **없으면** 고칠 수 없다. 우리말로 옮길 때 부정이 두 번 겹쳐 가장 자주 거꾸로 읽는다.",
     "**only if** — 오직 ~일 때만. \"A change may be released only if two qual wafers pass.\" → 두 장 합격은 **반드시 있어야 하는 조건**이다. 그냥 if 보다 훨씬 좁다.",
     "**provided that / as long as** — ~라는 조건이라면. \"The step time may be adjusted without qual, provided that the change is within ±10%.\" → 10% 안일 때만 그 예외가 허용된다.",
     "**otherwise** — 그렇지 않으면. \"Verify two qual wafers; otherwise, keep the previous revision.\" **until** — ~할 때까지. \"Do not release the recipe until the qual results are recorded.\"",
     "읽는 순서: ① 연결어를 찾는다 → ② 조건 부분과 결과 부분을 나눈다 → ③ 지금 사실이 조건을 만족하는지 본다. 이 세 단계를 실습에서 그대로 쓴다."
    ],
    "figs": [
     {
      "kind": "note",
      "title": "READ IT",
      "en": "[unless] = if not. [only if] = this condition is required.",
      "ko": "unless = ~가 아니면. only if = 이 조건이 반드시 필요하다."
     }
    ]
   },
   {
    "type": "read",
    "title": "변경 관리 흐름 — ECR → ECN → qual → release",
    "intro": "레시피를 바꾸는 일은 한 사람의 판단이 아니라 기록이 남는 흐름이다. 단계마다 쓰는 영어 표현이 정해져 있다.",
    "paras": [
     "**ECR (Engineering Change Request)** — 무엇을, 왜, 얼마나 바꾸려는지 쓴 요청서. \"Request: increase ME pressure from 10 to 12 mTorr to improve edge etch rate.\"",
     "**Review / Approval** — 공정·장비·품질 담당이 검토하고 승인한다. 승인되면 **ECN (Engineering Change Notice)** 번호가 붙는다. 상태는 **PENDING → APPROVED** 또는 **REJECTED**.",
     "**Qualification (qual)** — 새 판으로 시험 웨이퍼를 돌려 규격 안인지 확인한다. 결과는 **PASS / FAIL** 로 적는다.",
     "**Release / Effective date** — 합격하면 새 판을 양산에 적용한다. \"Rev D effective from 2026-11-10.\" 그 날부터 장비는 새 판만 쓴다.",
     "**Roll back** — 시험이나 양산에서 문제가 나오면 옛 판으로 되돌린다. \"Roll back to Rev C and hold the lot.\" 옛 판을 지우지 않는 이유가 이것이다.",
     "**Hold** — 판단이 끝날 때까지 웨이퍼 묶음(**lot**)을 멈춰 두는 것. 변경 관리 문장에서 자주 함께 나온다."
    ],
    "figs": [
     {
      "kind": "step",
      "title": "CHANGE FLOW",
      "items": [
       [
        "[ECR] submitted",
        "요청"
       ],
       [
        "[ECN] approved",
        "승인"
       ],
       [
        "[qual] 2 wafers PASS",
        "시험 합격"
       ],
       [
        "[release] Rev D",
        "양산 적용"
       ]
      ]
     }
    ]
   },
   {
    "type": "acr",
    "title": "약어",
    "intro": "레시피 화면과 변경 관리 문서에 반복해서 나오는 약어입니다.",
    "items": [
     {
      "ab": "EPD",
      "full": "Endpoint Detection",
      "ko": "끝점 검출 — 막이 다 깎인 순간을 잡는다"
     },
     {
      "ab": "OES",
      "full": "Optical Emission Spectroscopy",
      "ko": "발광 분광 — 플라즈마 빛으로 끝점을 본다"
     },
     {
      "ab": "ME / OE",
      "full": "Main Etch / Over Etch",
      "ko": "본 식각 / 추가 식각"
     },
     {
      "ab": "BT",
      "full": "Breakthrough",
      "ko": "표면 자연 산화막을 뚫는 짧은 단계"
     },
     {
      "ab": "SP / PV",
      "full": "Setpoint / Process Value",
      "ko": "설정값 / 실제값"
     },
     {
      "ab": "ECR",
      "full": "Engineering Change Request",
      "ko": "변경 요청서"
     },
     {
      "ab": "ECN",
      "full": "Engineering Change Notice",
      "ko": "승인된 변경 통지 — 번호가 붙는다"
     },
     {
      "ab": "MOC",
      "full": "Management of Change",
      "ko": "변경 관리 — 이 흐름 전체를 부르는 말"
     },
     {
      "ab": "Rev",
      "full": "Revision",
      "ko": "판 번호 — Rev C → Rev D"
     },
     {
      "ab": "qual",
      "full": "qualification",
      "ko": "적격 시험 — 시험 웨이퍼로 확인"
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (1) — 조건 연결어",
    "intro": "조건이 어느 쪽에 걸리는지 예문으로 확인하세요.",
    "items": [
     {
      "en": "unless",
      "ko": "~이 아니면 (= if not)",
      "d": "조건이 없을 때 결과가 막힌다",
      "ex": "Do not start the run unless the chamber has passed the leak check."
     },
     {
      "en": "only if",
      "ko": "오직 ~일 때만",
      "d": "반드시 있어야 하는 조건",
      "ex": "The lot may be released only if all qual wafers pass."
     },
     {
      "en": "provided that",
      "ko": "~라는 조건이라면",
      "d": "예외를 허락하는 조건",
      "ex": "Minor time changes are allowed, provided that they are within ±10%."
     },
     {
      "en": "otherwise",
      "ko": "그렇지 않으면",
      "d": "조건이 안 맞을 때 할 일",
      "ex": "Check the endpoint trace; otherwise, the over-etch time cannot be verified."
     },
     {
      "en": "until",
      "ko": "~할 때까지",
      "d": "그 일이 끝날 때까지 다른 일은 안 됨",
      "ex": "Keep the lot on hold until the engineer reviews the data."
     },
     {
      "en": "in case of",
      "ko": "~의 경우에는",
      "d": "특정 상황에 대한 지시",
      "ex": "In case of an endpoint timeout, abort the run and notify the process engineer."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (1) — 조건 연결어",
    "intro": "연결어를 찾고, 조건 부분이 지금 사실과 맞는지 판단하세요.",
    "questions": [
     {
      "prompt": "'Do not start the run unless the chamber has passed the leak check.' 누설 검사를 아직 안 했다. 시작해도 되는가?",
      "opts": [
       "시작해도 된다 — 금지 조건이 아니다",
       "시작하면 안 된다 — 누설 검사 통과가 먼저다",
       "누설 검사는 시작 후에 한다"
      ],
      "ans": 1
     },
     {
      "prompt": "'The lot may be released only if all qual wafers pass.' 시험 웨이퍼 3장 중 2장 합격. 출하할 수 있는가?",
      "opts": [
       "3장 중 2장이면 과반이라 된다",
       "감독자 판단에 따라 된다",
       "안 된다 — 모든(all) 웨이퍼가 합격해야 한다"
      ],
      "ans": 2
     },
     {
      "prompt": "'Minor time changes are allowed, provided that they are within ±10%.' 60초 단계를 64초로 바꾸려 한다(약 6.7%). 맞는 것은?",
      "opts": [
       "허용 범위 안이라 이 예외가 적용된다",
       "10% 를 넘으므로 안 된다",
       "provided that 은 권장이라 상관없다"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (2) — 레시피 표",
    "intro": "레시피 화면의 칸 이름과 그 칸에 들어가는 말입니다.",
    "items": [
     {
      "en": "step",
      "ko": "단계",
      "d": "레시피 표의 한 줄 — STAB · BT · ME · OE · PUMP",
      "ex": "Step 3 is the main etch, and it ends on the endpoint signal."
     },
     {
      "en": "setpoint",
      "ko": "설정값",
      "d": "장비가 맞추려는 목표 값(SP)",
      "ex": "The pressure setpoint for the main etch is 10 mTorr."
     },
     {
      "en": "endpoint",
      "ko": "끝점",
      "d": "막이 다 깎여 빛 신호가 바뀌는 순간",
      "ex": "The endpoint was detected at 42 seconds into the main etch."
     },
     {
      "en": "over-etch",
      "ko": "추가 식각",
      "d": "끝점 뒤 남은 곳을 마저 깎는 단계",
      "ex": "The over-etch time is set to 30% of the main etch time."
     },
     {
      "en": "tolerance",
      "ko": "허용 범위",
      "d": "설정값에서 벗어나도 되는 폭",
      "ex": "The pressure tolerance is ±5% of the setpoint."
     },
     {
      "en": "abort",
      "ko": "중단하다",
      "d": "그 단계·공정을 즉시 멈추는 것",
      "ex": "The step aborts if the endpoint is not detected within 60 seconds."
     }
    ]
   },
   {
    "type": "mansample",
    "variant": "parts",
    "title": "매뉴얼 표본 — 레시피 표 ETCH-POLY-01",
    "doc": {
     "name": "RECIPE SHEET — ETCH-POLY-01",
     "no": "RCP-0117",
     "rev": "C"
    },
    "heading": "Poly gate etch — step table (교재 예시)",
    "cols": [
     "STEP",
     "END",
     "TIME (s)",
     "PRESS (mTorr)",
     "SRC / BIAS (W)",
     "GAS (sccm)"
    ],
    "rows": [
     [
      "1 STAB",
      "TIME",
      "15",
      "10",
      "0 / 0",
      "HBr 150, Cl2 50"
     ],
     [
      "2 BT",
      "TIME",
      "8",
      "5",
      "500 / 150",
      "CF4 80"
     ],
     [
      "3 ME",
      "EPD",
      "MAX 60",
      "10",
      "600 / 120",
      "HBr 150, Cl2 50, O2 5"
     ],
     [
      "4 OE",
      "TIME",
      "30% of ME",
      "30",
      "400 / 80",
      "HBr 200, O2 5"
     ],
     [
      "5 PUMP",
      "TIME",
      "10",
      "base",
      "0 / 0",
      "—"
     ]
    ],
    "callout": {
     "kind": "note",
     "en": "Tolerance: pressure within ±5% of the setpoint, gas flow within ±2 sccm, RF power no more than 3% deviation. Endpoint shall be detected between 30 and 60 s."
    }
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (2) — 레시피 표 읽기",
    "intro": "위 레시피 표 ETCH-POLY-01 을 근거로 답하세요.",
    "questions": [
     {
      "prompt": "3단계(ME)의 END 칸은 'EPD', TIME 칸은 'MAX 60'. 뜻은?",
      "opts": [
       "60초 동안 무조건 식각한다",
       "끝점이 나오면 끝나고, 60초 안에 안 나오면 멈춘다",
       "끝점이 나온 뒤 60초 더 식각한다"
      ],
      "ans": 1
     },
     {
      "prompt": "끝점이 40 s 에 나왔다. 'Over etch: 30% of ME' 이면 4단계 시간은?",
      "opts": [
       "12 s",
       "30 s",
       "18 s"
      ],
      "ans": 0
     },
     {
      "prompt": "ME 압력 PV 가 10.6 mTorr. 'pressure within ±5% of the setpoint' (SP 10) 로 판단하면?",
      "opts": [
       "범위 안 — 9.5 ~ 10.5 에 들어간다",
       "정확히 경계라 합격이다",
       "범위 밖 — 10.5 를 넘었다"
      ],
      "ans": 2
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (3) — 경계 표현",
    "intro": "규격 문장의 숫자 앞에 붙는 말입니다. 경계값이 포함되는지 함께 익히세요.",
    "items": [
     {
      "en": "not to exceed",
      "ko": "~을 넘지 않게 (≤)",
      "d": "경계값은 합격",
      "ex": "Reflected power is not to exceed 20 W during the main etch."
     },
     {
      "en": "below / less than",
      "ko": "~보다 작게 (<)",
      "d": "경계값은 불합격",
      "ex": "Base pressure must be below 1.0E-5 Torr before the run starts."
     },
     {
      "en": "at least",
      "ko": "적어도 (≥)",
      "d": "경계값은 합격",
      "ex": "Purge the chamber for at least 5 minutes after the wet clean."
     },
     {
      "en": "within ±",
      "ko": "± 범위 안",
      "d": "설정값 양쪽으로 같은 폭, 양 끝 포함이 보통",
      "ex": "Gas flow must stay within ±2 sccm of the setpoint."
     },
     {
      "en": "between … and …",
      "ko": "~와 ~ 사이",
      "d": "보통 양 끝 포함 — 애매하면 inclusive 를 적는다",
      "ex": "The endpoint should be detected between 30 and 60 seconds."
     },
     {
      "en": "inclusive / exclusive",
      "ko": "포함 / 제외",
      "d": "경계값을 넣는지 빼는지 밝히는 말",
      "ex": "Accept values from 48 to 52 sccm, inclusive."
     }
    ]
   },
   {
    "type": "mansample",
    "variant": "email",
    "title": "매뉴얼 표본 — 변경 요청 메일 (ECR)",
    "from": "Jisu Park <jisu.park@fab.example>",
    "to": "Process Engineering <pe-etch@fab.example>",
    "subject": "ECR-0412: ETCH-POLY-01 main etch pressure 10 → 12 mTorr",
    "lines": [
     "Hello team,",
     "I would like to request a change to ETCH-POLY-01 Rev C.",
     "Problem: The edge etch depth has been [below] the lower limit on 4 of the last 20 lots.",
     "Proposed change: Increase the main etch pressure from 10 to 12 mTorr.",
     "Qualification plan: Run 2 qual wafers. The change will be released [only if] both wafers pass.",
     "If either wafer fails, we will [roll back] to Rev C and keep the lot on hold.",
     "Please let me know if you need the endpoint traces."
    ],
    "sign": "Best regards, Jisu Park (Etch, night shift)"
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (3) — 경계와 조건",
    "intro": "경계값에 걸린 값과 조건 문장을 판단하세요.",
    "questions": [
     {
      "prompt": "'Reflected power is not to exceed 20 W.' 측정값이 정확히 20 W. 판정은?",
      "opts": [
       "합격 — 20 W 까지 허용",
       "불합격 — 20 W 보다 작아야 한다",
       "다시 측정해야만 알 수 있다"
      ],
      "ans": 0
     },
     {
      "prompt": "'Base pressure must be below 1.0E-5 Torr.' 측정값이 1.0E-5 Torr. 판정은?",
      "opts": [
       "합격 — 경계와 같다",
       "판정할 수 없다",
       "불합격 — below 는 경계를 포함하지 않는다"
      ],
      "ans": 2
     },
     {
      "prompt": "ECR 메일: 'The change will be released only if both wafers pass.' 한 장만 합격했다. 다음 행동은?",
      "opts": [
       "합격한 한 장 기준으로 적용한다",
       "적용하지 않고, 메일대로 Rev C 로 되돌리고 lot 을 멈춘다",
       "세 번째 웨이퍼를 돌려 둘이 합격하면 적용한다"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (4) — 변경 관리",
    "intro": "변경 요청부터 양산 적용까지 각 단계의 말입니다.",
    "items": [
     {
      "en": "revision",
      "ko": "판(판 번호)",
      "d": "Rev C → Rev D. 옛 판은 남긴다",
      "ex": "Rev D replaces Rev C, but Rev C is archived for roll back."
     },
     {
      "en": "approve / reject",
      "ko": "승인하다 / 반려하다",
      "d": "검토 결과",
      "ex": "The change review board approved ECR-0412 with one condition."
     },
     {
      "en": "qualification (qual)",
      "ko": "적격 시험",
      "d": "새 판으로 시험 웨이퍼를 돌려 확인",
      "ex": "Two qual wafers are required before the new revision is released."
     },
     {
      "en": "release",
      "ko": "양산에 적용하다",
      "d": "합격한 새 판을 장비에 걸어 쓰기 시작",
      "ex": "Rev D was released to production on November 10."
     },
     {
      "en": "roll back",
      "ko": "되돌리다",
      "d": "옛 판으로 돌아가기",
      "ex": "If the qual fails, roll back to the previous revision."
     },
     {
      "en": "hold",
      "ko": "보류하다",
      "d": "판단이 끝날 때까지 lot 을 멈춰 둠",
      "ex": "Put the lot on hold until the engineer reviews the qual data."
     }
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — 변경 적용 절차",
    "doc": {
     "name": "Recipe Change Procedure",
     "no": "SOP-PE-031",
     "sec": "5",
     "rev": "B",
     "page": "5-2"
    },
    "heading": "5  Releasing an Approved Recipe Change",
    "steps": [
     "Confirm that the ECN status is APPROVED before editing the recipe.",
     {
      "t": "Save the new recipe as a new revision. Do not overwrite the current revision.",
      "note": {
       "kind": "note",
       "en": "The previous revision is kept for roll back."
      }
     },
     "Run two qual wafers with the new revision and measure the etch depth.",
     {
      "t": "Release the new revision only if both qual wafers are within the specification.",
      "note": {
       "kind": "caution",
       "en": "If either wafer fails, roll back and hold the lot."
      }
     },
     "Record the ECN number and the effective date in the recipe history."
    ],
    "callout": {
     "kind": "warning",
     "en": "Production recipes shall not be edited unless an ECN has been approved."
    },
    "gloss": [
     [
      "overwrite",
      "덮어쓰다"
     ],
     [
      "specification",
      "규격"
     ],
     [
      "effective date",
      "적용 시작일"
     ],
     [
      "recipe history",
      "레시피 이력"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (4) — 절차 읽기",
    "intro": "위 변경 적용 절차 SOP-PE-031 을 근거로 답하세요.",
    "questions": [
     {
      "prompt": "'Do not overwrite the current revision.' 를 지키지 않으면 무엇을 잃는가?",
      "opts": [
       "장비 알람 기록",
       "문제가 생겼을 때 되돌아갈 옛 판",
       "ECN 번호"
      ],
      "ans": 1
     },
     {
      "prompt": "ECN 상태가 'PENDING' 이다. 지금 레시피를 고쳐도 되는가?",
      "opts": [
       "안 된다 — APPROVED 를 확인한 뒤에만",
       "고쳐 두고 승인 뒤에 적용하면 된다",
       "PENDING 은 승인과 같은 뜻이다"
      ],
      "ans": 0
     },
     {
      "prompt": "두 장 모두 규격 안. 마지막으로 남은 일은?",
      "opts": [
       "아무 기록 없이 적용한다",
       "옛 판을 지운다",
       "ECN 번호와 적용 시작일을 레시피 이력에 적는다"
      ],
      "ans": 2
     }
    ]
   },
   {
    "type": "manual",
    "mtitle": "RECIPE CHANGE CONTROL POLICY (교재 예시)",
    "paras": [
     "R1. A production recipe shall not be edited unless an ECN has been approved.",
     "해설: 승인된 ECN 이 없으면 양산 레시피를 고칠 수 없다. (unless = if not)",
     "R2. An approved change may be released only if at least two qual wafers pass.",
     "해설: 승인된 변경도 시험 웨이퍼가 두 장 이상 합격해야만 적용할 수 있다. (only if = 필요조건, at least = 2 포함)",
     "R3. If any qual wafer fails, the change shall be rolled back to the previous revision.",
     "해설: 시험 웨이퍼가 한 장이라도 불합격이면 옛 판으로 되돌린다. (any = 한 장이라도)",
     "R4. A step time change need not be re-qualified, provided that the change is within ±10% of the original value.",
     "해설: 단계 시간 변경은 원래 값의 ±10% 안이면 다시 시험하지 않아도 된다. 단, R1(ECN 승인)은 그대로 적용된다."
    ]
   },
   {
    "type": "manual",
    "mtitle": "ENDPOINT AND OVER-ETCH SETTINGS",
    "paras": [
     "The main etch ends when the endpoint is detected. If no endpoint is detected within 60 s, the step aborts.",
     "해설: 본 식각은 끝점이 잡히면 끝난다. 60초 안에 끝점이 없으면 단계가 중단된다.",
     "Over etch time = 30% of the actual main etch time, not of the maximum time.",
     "해설: 추가 식각 시간은 최대 시간(60 s)이 아니라 실제 본 식각 시간의 30% 다. 끝점이 42 s 면 12.6 s.",
     "An endpoint detected earlier than 30 s shall be treated as abnormal.",
     "해설: 30초보다 일찍 잡힌 끝점은 비정상으로 본다 — 막이 얇거나 다른 웨이퍼가 들어왔을 수 있다.",
     "In case of an endpoint timeout, hold the lot and notify the process engineer.",
     "해설: 끝점 시간 초과가 나면 lot 을 멈추고 공정 엔지니어에게 알린다."
    ]
   },
   {
    "type": "sim",
    "which": "recipe",
    "mode": "limits",
    "intro": "먼저 **경계 판정** 실습입니다. 규격 문장과 측정값이 나옵니다. 숫자보다 앞에 붙은 **경계어**(not to exceed · below · at least · within ± · between)를 먼저 읽고, 측정값이 **합격(PASS)** 인지 **불합격(FAIL)** 인지 고르세요. 경계값에 딱 걸린 값이 섞여 있습니다."
   },
   {
    "type": "sim",
    "which": "recipe",
    "mode": "run",
    "intro": "다음은 **레시피 실행 기록 판정** 실습입니다. ETCH-POLY-01 의 본 식각(ME) 실제값과 끝점 시각, 추가 식각(OE) 시간이 나옵니다. 표 아래 **허용 범위** 문장으로 각 값을 판정하고, OE 시간이 **실제 ME 시간의 30%** 와 맞는지도 확인하세요."
   },
   {
    "type": "sim",
    "which": "recipe",
    "mode": "change",
    "intro": "마지막은 **변경 관리 결정** 실습입니다. 변경 규정 R1~R4 와 상황(ECN 상태 · 시험 웨이퍼 결과 · 바꾸려는 값)을 읽고, 지금 할 일을 고르세요: **지금 고칠 수 없음 · 보류(시험 더 필요) · 적용(release) · 되돌림(roll back)**. 근거가 되는 규정 번호가 함께 나옵니다."
   },
   {
    "type": "comm",
    "items": [
     {
      "sit": "해외 엔지니어가 레시피를 바로 고치자고 한다",
      "q": {
       "en": "Can you just bump the main etch pressure to 12 mTorr tonight?",
       "ko": "오늘 밤 메인 에치 압력을 12 mTorr 로 바로 올려 줄 수 있어요?"
      },
      "a": {
       "en": "I can't edit it tonight. The recipe is locked unless an ECN is approved. I'll submit an ECR now and attach the edge etch data.",
       "ko": "오늘 밤엔 못 고칩니다. ECN 승인 없이는 레시피가 잠겨 있어요. 지금 ECR 을 올리고 가장자리 식각 데이터를 붙이겠습니다."
      }
     },
     {
      "sit": "시험 웨이퍼 결과를 보고한다",
      "q": {
       "en": "How did the qual wafers look?",
       "ko": "시험 웨이퍼 결과는 어땠어요?"
      },
      "a": {
       "en": "Both qual wafers passed. Edge etch depth is within spec, and the endpoint came at 44 seconds. I'll release Rev D and record the ECN number.",
       "ko": "두 장 모두 합격입니다. 가장자리 식각 깊이는 규격 안이고, 끝점은 44초에 나왔습니다. Rev D 를 적용하고 ECN 번호를 기록하겠습니다."
      }
     },
     {
      "sit": "끝점 시간 초과로 공정이 멈췄다",
      "q": {
       "en": "Why did the run abort at step 3?",
       "ko": "3단계에서 왜 공정이 멈췄죠?"
      },
      "a": {
       "en": "The endpoint was not detected within 60 seconds, so the step aborted. I put the lot on hold and I'm checking the OES trace now.",
       "ko": "60초 안에 끝점이 안 잡혀서 단계가 중단됐습니다. lot 을 보류해 두고 지금 OES 신호를 확인하고 있습니다."
      }
     }
    ]
   },
   {
    "type": "wrap",
    "title": "정리 — 조건을 나누고, 경계를 읽어라",
    "points": [
     "레시피는 **locked**. 바꾸는 길은 **ECR → ECN(approved) → qual → release**, 문제가 나면 **roll back**. 옛 판(**revision**)은 지우지 않는다.",
     "레시피 표: **STEP · END(TIME / EPD) · TIME(MAX) · PRESS · RF · GAS**. OE 시간은 **실제 ME 시간**의 비율이다.",
     "경계어: **not to exceed / no more than** = ≤ · **below / less than** = < · **at least** = ≥ · **within ±** = 양 끝 포함이 보통. 경계값에서 판단이 갈린다.",
     "조건어: **unless** = if not · **only if** = 반드시 필요한 조건 · **provided that** = 예외를 허락하는 조건 · **otherwise** · **until**.",
     "읽는 순서: **연결어 찾기 → 조건과 결과 나누기 → 지금 사실이 조건을 만족하는지**."
    ],
    "done": "이제 여러분은 레시피 화면과 변경 규정을 읽고 **\"지금 바꿔도 되는가, 이 값은 경계 안인가\"** 를 영어 문장 그대로 판단할 수 있습니다. **Split the condition, read the boundary.**",
    "figs": [
     {
      "kind": "step",
      "title": "READ THE RULE",
      "items": [
       [
        "Find the [connector].",
        "연결어 찾기"
       ],
       [
        "Split [condition] and [result].",
        "조건 / 결과 나누기"
       ],
       [
        "Check the [boundary].",
        "경계 확인"
       ]
      ]
     }
    ]
   }
  ]
 },
 {
  "id": "w11",
  "title": "다른 장비 계열 읽기 — 증착 · 노광 · CMP · 이온주입",
  "slides": [
   {
    "type": "story",
    "icon": "🔄",
    "title": "순환 근무 첫날, 처음 보는 화면",
    "text": "석 달 동안 식각 장비만 본 민지가 이번 주부터 순환 근무(**rotation**)로 CMP 구역에 배치됐다. 화면을 여니 처음 보는 말이 가득하다. **PLATEN 2 DOWN FORCE 3.0 psi**, **SLURRY FLOW 200 mL/min**, 그리고 노란 줄 하나 — **PAD CONDITIONER SWEEP RATE LOW**. 민지가 중얼거린다. \"패드… 컨디셔너… 스윕… 비율이 낮다? 뭐가 낮다는 거지?\" 옆의 선배가 웃으며 말한다. \"명사가 줄줄이 붙으면 **맨 오른쪽**부터 읽어. rate 가 주인공이야. 무엇의 rate? sweep 의. 무엇의 sweep? pad conditioner 의.\" 민지가 다시 읽는다. \"패드 컨디셔너의, 왕복의, 속도가 낮다.\" 선배가 고개를 끄덕인다. \"식각에서 배운 거 그대로야. **SP / PV**, **ALARM / WARNING**, 단위. 장비가 바뀌면 단어만 바뀌고, 읽는 법은 안 바뀌어.\" 오늘은 증착 · 노광 · CMP · 이온주입 장비를 한 바퀴 돈다.",
    "figs": [
     {
      "kind": "hmi",
      "tool": "CMP POLISHER · PLATEN 2",
      "status": "RUN",
      "state": "run",
      "rows": [
       [
        "DOWN FORCE",
        "3.0 psi"
       ],
       [
        "SLURRY FLOW",
        "200 mL/min"
       ],
       [
        "PLATEN SPEED",
        "93 rpm"
       ]
      ],
      "banner": {
       "en": "PAD CONDITIONER SWEEP RATE LOW",
       "ko": "패드 컨디셔너 왕복 속도 낮음",
       "level": "warn"
      }
     }
    ]
   },
   {
    "type": "scene",
    "title": "오늘의 현장 · 상황 설정",
    "where": "순환 근무 첫 주 — 증착(CVD · ALD · PVD), 노광(트랙 · 스캐너), CMP, 이온주입 구역을 하루씩 돈다.",
    "tool": "장비마다 다른 HMI 화면, 장비 개요서(tool overview), 공정 조건 표.",
    "situation": "처음 보는 단어와 단위가 쏟아진다. 하지만 화면의 뼈대와 문장 구조는 식각 장비와 같다.",
    "meet": [
     "명사 덩어리 pad conditioner sweep rate",
     "수동태 is held by · is removed by",
     "목적 is used to · in order to",
     "단위 Å · psi · mJ/cm² · keV · E15"
    ],
    "goal": "처음 보는 장비 화면에서 \"무엇의 무엇인가\"와 \"단위가 무엇인가\"를 읽어 내기.",
    "bg": "w11"
   },
   {
    "type": "read",
    "title": "처음 보는 장비 앞에서 — 뼈대는 같다",
    "intro": "반도체 장비는 종류가 많지만 화면과 문서의 뼈대는 거의 같다. 낯선 장비를 만나면 먼저 이 뼈대를 찾는다.",
    "paras": [
     "**무엇이 들어오나** — 웨이퍼, 그리고 가스(gas) · 약액(chemical) · 슬러리(slurry) · 이온(ion) 중 하나 이상. 화면에는 보통 유량(**FLOW**)으로 나온다.",
     "**어디서 처리하나** — 챔버(chamber), 코터 컵(coater cup), 플래튼(platen), 엔드 스테이션(end station). 이름은 달라도 \"웨이퍼가 처리되는 곳\"이다.",
     "**무엇으로 조절하나** — 압력 · 온도 · 전력 · 회전 속도 · 누르는 힘 · 에너지. 화면은 1부에서 본 그대로 **SP / PV** 쌍으로 보여 준다.",
     "**결과를 무엇으로 재나** — 두께(thickness), 제거 속도(removal rate), 선폭(CD), 정렬 오차(overlay), 주입량(dose). 장비마다 다른 이 숫자가 그 장비의 \"성적표\"다.",
     "**상태어와 알람은 같다** — IDLE · RUN · ALARM · WARNING · INTERLOCK, 그리고 9강 · 10강의 규정문(shall · unless · not to exceed)도 그대로 나온다.",
     "그래서 오늘 새로 배울 것은 두 가지뿐이다. **장비마다 다른 명사와 단위**, 그리고 그 명사들이 **줄줄이 붙었을 때 읽는 법**."
    ],
    "figs": [
     {
      "kind": "step",
      "title": "SAME SKELETON",
      "items": [
       [
        "What comes [in]?",
        "들어오는 것"
       ],
       [
        "Where is it [processed]?",
        "처리하는 곳"
       ],
       [
        "What is [controlled]?",
        "조절하는 값"
       ],
       [
        "What is [measured]?",
        "결과 측정"
       ]
      ]
     }
    ]
   },
   {
    "type": "read",
    "title": "명사 덩어리는 오른쪽부터 — compound noun",
    "intro": "장비 화면의 영어는 자리가 좁아 명사를 줄줄이 붙인다. 이것을 compound noun(명사 덩어리)이라고 한다. 읽는 규칙은 하나다.",
    "paras": [
     "**맨 오른쪽 명사가 머리(head)** — 그 말이 \"무엇인가\"를 정한다. 나머지는 모두 그것을 꾸민다.",
     "**오른쪽부터 \"~의\"로 읽는다** — chamber wall temperature setpoint → 설정값(setpoint) ← 온도의 ← 챔버 벽의. 즉 \"챔버 벽 온도의 **설정값**\". 온도가 아니라 설정값을 말하는 줄이다.",
     "**of 로 풀어 보면 확실하다** — the setpoint **of** the temperature **of** the chamber wall. 영어 설명서에서는 이렇게 풀어 쓴 문장도 자주 나온다.",
     "**두 단어가 한 덩어리인 것도 있다** — pad conditioner(패드 컨디셔너), beam current(빔 전류), wafer edge(웨이퍼 가장자리)는 붙어서 하나의 이름이다. 덩어리끼리 오른쪽부터 읽는다.",
     "**머리를 틀리면 판단이 틀린다** — SLURRY FLOW ALARM LIMIT 은 \"슬러리 유량 알람의 **한계값**\"이다. 알람이 울렸다는 말이 아니라, 알람이 울리는 기준값을 말하는 칸이다."
    ],
    "figs": [
     {
      "kind": "note",
      "title": "READ RIGHT TO LEFT",
      "en": "chamber wall temperature [setpoint] = the setpoint of the temperature of the chamber wall",
      "ko": "맨 오른쪽(setpoint)이 주인공 — 오른쪽부터 \"~의\"로 읽는다."
     }
    ]
   },
   {
    "type": "read",
    "title": "증착 장비 — CVD · ALD · PVD",
    "intro": "막을 쌓는 장비다. 무엇으로 쌓는지에 따라 화면의 단어가 다르다.",
    "paras": [
     "**CVD(화학 기상 증착)** — 가스가 반응해 막이 된다. 원료를 **precursor(전구체)** 라고 하고, 예: TEOS 는 산화막 원료다. 화면: **TEOS FLOW 1.2 g/min**, **DEP RATE 1500 Å/min**.",
     "**ALD(원자층 증착)** — 원료를 한 번 넣고(pulse) 빼고(purge) 다음 원료를 넣는 것을 한 사이클(cycle)로 반복한다. 화면: **ALD CYCLES 120**, **GPC 1.0 Å/cycle**(growth per cycle, 사이클당 두께).",
     "**PVD(물리 기상 증착, sputter)** — 금속 덩어리(**target**)를 이온으로 때려 떨어진 원자가 웨이퍼에 붙는다. 화면: **DC POWER 12 kW**, **TARGET LIFE 820 kWh**(타깃을 얼마나 썼나).",
     "**Å(옹스트롬)** — 증착 두께의 단위. **1 Å = 0.1 nm**. 1,000 Å 은 100 nm 다.",
     "증착의 성적표는 **thickness(두께)** 와 **uniformity(균일도, %)** 다. 예: \"Film thickness: within ±3% of the target (1000 Å).\""
    ],
    "figs": [
     {
      "kind": "hmi",
      "tool": "CVD · CH B",
      "status": "RUN",
      "state": "run",
      "rows": [
       [
        "TEOS FLOW",
        "1.2 g/min"
       ],
       [
        "DEP RATE",
        "1500 Å/min"
       ],
       [
        "FILM THICKNESS",
        "1,028 Å"
       ]
      ]
     }
    ]
   },
   {
    "type": "read",
    "title": "노광 장비 — 트랙(track)과 스캐너(scanner)",
    "intro": "회로 무늬를 웨이퍼에 옮기는 구역이다. 감광액을 바르고 굽는 트랙과, 빛을 쏘는 스캐너가 한 줄로 붙어 있다.",
    "paras": [
     "**트랙 — coat · bake · develop** — 감광액(**resist**)을 웨이퍼를 돌려 바르고(**spin coat**, 단위 rpm), 굽고(**soft bake**, °C · s), 노광 뒤 현상한다(**develop**).",
     "**스캐너 — reticle · dose · focus** — 회로 원판(**reticle**)의 무늬를 빛으로 옮긴다. 빛의 양이 **dose**, 단위는 **mJ/cm²**. 초점 위치는 **focus**, 단위 nm.",
     "**overlay(정렬 오차)** — 이번 층이 아래층과 얼마나 어긋났는가. X · Y 방향으로 nm 단위로 잰다. 예: \"Overlay shall be no more than 3.0 nm.\"",
     "**CD(Critical Dimension, 선폭)** — 만든 무늬의 폭. 노광의 성적표는 CD 와 overlay 다.",
     "주의: 노광의 **dose(mJ/cm², 빛의 양)** 와 이온주입의 **dose(/cm², 이온의 개수)** 는 같은 단어지만 전혀 다른 양이다. **단위**가 어느 장비인지 알려 준다."
    ],
    "figs": [
     {
      "kind": "hmi",
      "tool": "SCANNER · LOT 2417",
      "status": "RUN",
      "state": "run",
      "rows": [
       [
        "DOSE",
        "25.0 mJ/cm²"
       ],
       [
        "FOCUS",
        "-20 nm"
       ],
       [
        "OVERLAY X / Y",
        "2.1 / 2.8 nm"
       ]
      ]
     }
    ]
   },
   {
    "type": "read",
    "title": "CMP · 이온주입 — 누르는 힘과 이온의 에너지",
    "intro": "두 장비 모두 화면의 숫자가 식각 · 증착과 단위부터 다르다.",
    "paras": [
     "**CMP(화학 기계적 연마)** — 웨이퍼를 머리(**carrier / head**)로 잡아 회전하는 판(**platen**) 위 패드에 눌러 깎는다. 누르는 힘 **down force**(psi), 연마액 **slurry flow**(mL/min), 판 회전 **platen speed**(rpm).",
     "**pad conditioner** — 패드 표면을 다이아몬드 원판으로 긁어 거칠기를 살린다. 왕복 속도가 **sweep rate**. 낮아지면 패드가 매끈해져 제거 속도(**removal rate**, Å/min)가 떨어진다.",
     "**이온주입(implant)** — 불순물 이온을 가속해 웨이퍼에 박는다. 이온의 세기 **energy**(keV), 흐르는 양 **beam current**(mA · µA), 박힌 개수 **dose**(ions/cm²).",
     "**지수 표기** — dose 는 **5.0E15 /cm²** 처럼 쓴다. E15 는 10의 15제곱. 4.8E15 와 5.0E15 는 숫자로 4%나 차이 난다.",
     "**tilt(기울임)** — 이온이 결정 사이로 너무 깊이 미끄러지는 것(**channeling**)을 막으려 웨이퍼를 기울인다. **7°** 가 흔하다.",
     "**µA 와 mA** — 1 mA = 1,000 µA. 화면 단위와 규격 단위가 다르면 먼저 같은 단위로 바꾼다."
    ],
    "figs": [
     {
      "kind": "hmi",
      "tool": "IMPLANTER · END STATION",
      "status": "RUN",
      "state": "run",
      "rows": [
       [
        "ENERGY",
        "40 keV"
       ],
       [
        "BEAM CURRENT",
        "2.4 mA"
       ],
       [
        "DOSE",
        "5.0E15 /cm²"
       ],
       [
        "TILT / TWIST",
        "7° / 22°"
       ]
      ]
     }
    ]
   },
   {
    "type": "read",
    "title": "장비 설명서의 문장 — 수동태와 목적 표현",
    "intro": "장비 개요서(tool overview)는 \"무엇이 무엇에 의해, 무엇을 위해\" 움직이는지를 설명한다. 그래서 두 가지 문형이 반복된다.",
    "paras": [
     "**수동태 — is + 과거분사 + by** — \"The wafer **is held by** the carrier.\" 웨이퍼는 캐리어에 **의해** 잡힌다. by 뒤가 실제로 일을 하는 부품이다.",
     "**by 가 없는 수동태** — \"The slurry **is supplied** at 200 mL/min.\" 누가 하는지보다 무엇이 일어나는지가 중요할 때 쓴다.",
     "**목적 — is used to / is used for** — \"The Faraday cup **is used to** measure the beam current.\" 이 부품이 무엇을 하려고 있는지. to 뒤는 동사, for 뒤는 명사(-ing).",
     "**목적 — in order to / so that** — \"The wafer is tilted 7° **in order to** reduce channeling.\" \"The pad is conditioned **so that** the removal rate stays stable.\"",
     "읽는 순서: ① 주어(무엇이) → ② **by** 뒤(누가) → ③ **to / so that** 뒤(왜). 처음 보는 부품 이름이 나와도 이 세 칸만 채우면 그 부품의 역할이 보인다."
    ],
    "figs": [
     {
      "kind": "step",
      "title": "READ A TOOL SENTENCE",
      "items": [
       [
        "[What] is acted on?",
        "무엇이"
       ],
       [
        "[By] what part?",
        "무엇에 의해"
       ],
       [
        "[To] do what?",
        "무엇을 위해"
       ]
      ]
     }
    ]
   },
   {
    "type": "acr",
    "title": "약어 · 단위",
    "intro": "장비 계열마다 다른 약어와 단위입니다.",
    "items": [
     {
      "ab": "CVD",
      "full": "Chemical Vapor Deposition",
      "ko": "화학 기상 증착 — 가스 반응으로 막을 쌓는다"
     },
     {
      "ab": "ALD",
      "full": "Atomic Layer Deposition",
      "ko": "원자층 증착 — 한 사이클에 한 층씩"
     },
     {
      "ab": "PVD",
      "full": "Physical Vapor Deposition",
      "ko": "물리 기상 증착(스퍼터) — 타깃 원자를 떼어 붙인다"
     },
     {
      "ab": "CMP",
      "full": "Chemical Mechanical Planarization",
      "ko": "화학 기계적 연마 — 눌러 깎아 평평하게"
     },
     {
      "ab": "CD",
      "full": "Critical Dimension",
      "ko": "선폭 — 노광·식각의 성적표"
     },
     {
      "ab": "GPC",
      "full": "Growth Per Cycle",
      "ko": "ALD 사이클당 두께 (Å/cycle)"
     },
     {
      "ab": "Å",
      "full": "angstrom",
      "ko": "옹스트롬 — 1 Å = 0.1 nm"
     },
     {
      "ab": "psi",
      "full": "pounds per square inch",
      "ko": "압력·누르는 힘 단위 — CMP down force"
     },
     {
      "ab": "keV",
      "full": "kilo-electron-volt",
      "ko": "이온 에너지 단위 — 클수록 깊이 박힌다"
     },
     {
      "ab": "E15",
      "full": "× 10¹⁵",
      "ko": "지수 표기 — 5.0E15 = 5.0 × 10¹⁵"
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (1) — 명사 덩어리 읽기",
    "intro": "맨 오른쪽이 머리입니다. 예문에서 머리가 무엇인지 먼저 찾으세요.",
    "items": [
     {
      "en": "setpoint",
      "ko": "설정값 (머리)",
      "d": "chamber wall temperature setpoint — 챔버 벽 온도의 설정값",
      "ex": "Raise the chamber wall temperature setpoint to 65 °C."
     },
     {
      "en": "rate",
      "ko": "속도 · 비율 (머리)",
      "d": "pad conditioner sweep rate — 패드 컨디셔너의 왕복 속도",
      "ex": "The pad conditioner sweep rate dropped below the lower limit."
     },
     {
      "en": "limit",
      "ko": "한계값 (머리)",
      "d": "slurry flow alarm limit — 슬러리 유량 알람의 한계값",
      "ex": "The slurry flow alarm limit is set to 150 mL/min."
     },
     {
      "en": "zone",
      "ko": "구역 (머리)",
      "d": "wafer edge exclusion zone — 웨이퍼 가장자리 제외 구역",
      "ex": "Do not measure inside the wafer edge exclusion zone."
     },
     {
      "en": "check",
      "ko": "점검 (머리)",
      "d": "beam current stability check — 빔 전류 안정성 점검",
      "ex": "Run a beam current stability check before the first lot."
     },
     {
      "en": "failure",
      "ko": "고장 (머리)",
      "d": "precursor line heater failure — 전구체 배관 히터의 고장",
      "ex": "A precursor line heater failure can cause particles in the film."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (1) — 명사 덩어리",
    "intro": "맨 오른쪽 명사(머리)를 먼저 찾고 뜻을 고르세요.",
    "questions": [
     {
      "prompt": "화면 라벨 'CHAMBER WALL TEMPERATURE SETPOINT 65 °C' 가 말하는 것은?",
      "opts": [
       "챔버 벽의 지금 온도가 65 °C 다",
       "챔버 벽 온도의 설정값이 65 °C 다",
       "65 °C 가 되면 챔버 벽이 설정된다"
      ],
      "ans": 1
     },
     {
      "prompt": "'SLURRY FLOW ALARM LIMIT 150 mL/min' 은 무엇인가?",
      "opts": [
       "슬러리 유량 알람이 지금 울리고 있다",
       "슬러리 유량이 지금 150 mL/min 이다",
       "슬러리 유량이 이 값 아래면 알람이 울리는 기준값이다"
      ],
      "ans": 2
     },
     {
      "prompt": "'Do not measure inside the wafer edge exclusion zone.' 무엇을 하지 말라는가?",
      "opts": [
       "웨이퍼 가장자리의 측정 제외 구역 안에서 재지 마라",
       "웨이퍼 가장자리를 제외하고 재지 마라",
       "구역을 나누어 재지 마라"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (2) — 증착",
    "intro": "CVD · ALD · PVD 화면과 문서에서 만나는 말입니다.",
    "items": [
     {
      "en": "precursor",
      "ko": "전구체 (원료)",
      "d": "반응해서 막이 되는 원료 물질 — 예: TEOS",
      "ex": "The precursor is vaporized and carried into the chamber by nitrogen."
     },
     {
      "en": "deposition rate",
      "ko": "증착 속도",
      "d": "단위 시간당 쌓이는 두께 (Å/min)",
      "ex": "The deposition rate is monitored on every tenth wafer."
     },
     {
      "en": "pulse / purge",
      "ko": "원료 넣기 / 빼기",
      "d": "ALD 한 사이클의 두 동작",
      "ex": "Each ALD cycle consists of a precursor pulse and a nitrogen purge."
     },
     {
      "en": "target",
      "ko": "타깃 (금속 원판)",
      "d": "PVD 에서 원자를 떼어 내는 금속 덩어리",
      "ex": "Replace the target when the target life reaches 1,000 kWh."
     },
     {
      "en": "uniformity",
      "ko": "균일도",
      "d": "웨이퍼 안 두께가 고른 정도 (%)",
      "ex": "Thickness uniformity must be within 2% across the wafer."
     },
     {
      "en": "film thickness",
      "ko": "막 두께",
      "d": "증착의 성적표 — Å 또는 nm",
      "ex": "Film thickness is measured at 49 points on each monitor wafer."
     }
    ]
   },
   {
    "type": "mansample",
    "variant": "parts",
    "title": "매뉴얼 표본 — 장비 계열별 화면 값",
    "doc": {
     "name": "TOOL PARAMETER QUICK SHEET",
     "no": "QS-0211",
     "rev": "A"
    },
    "heading": "Key parameters by tool family (교재 예시)",
    "cols": [
     "TOOL",
     "PARAMETER",
     "TYPICAL VALUE",
     "UNIT",
     "WHAT IT TELLS YOU"
    ],
    "rows": [
     [
      "CVD",
      "DEP RATE",
      "1500",
      "Å/min",
      "how fast the film grows"
     ],
     [
      "ALD",
      "GPC",
      "1.0",
      "Å/cycle",
      "thickness added per cycle"
     ],
     [
      "PVD",
      "DC POWER",
      "12",
      "kW",
      "how hard the target is sputtered"
     ],
     [
      "TRACK",
      "SPIN SPEED",
      "1500",
      "rpm",
      "resist thickness (faster = thinner)"
     ],
     [
      "SCANNER",
      "DOSE",
      "25.0",
      "mJ/cm²",
      "amount of light on the resist"
     ],
     [
      "CMP",
      "DOWN FORCE",
      "3.0",
      "psi",
      "how hard the wafer is pressed"
     ],
     [
      "IMPLANT",
      "DOSE",
      "5.0E15",
      "/cm²",
      "number of ions per area"
     ]
    ],
    "callout": {
     "kind": "note",
     "en": "The same word can mean different things on different tools. Check the unit first."
    }
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (2) — 장비와 단위",
    "intro": "위 빠른 참조표 QS-0211 을 근거로 답하세요.",
    "questions": [
     {
      "prompt": "화면에 'DOSE 5.0E15 /cm²' 가 떠 있다. 어느 장비인가?",
      "opts": [
       "스캐너 — 빛의 양",
       "CMP — 누르는 힘",
       "이온주입 — 면적당 이온 개수"
      ],
      "ans": 2
     },
     {
      "prompt": "트랙의 'SPIN SPEED' 를 1500 rpm 에서 2000 rpm 으로 올리면 감광액 두께는?",
      "opts": [
       "얇아진다 (faster = thinner)",
       "두꺼워진다",
       "변하지 않는다"
      ],
      "ans": 0
     },
     {
      "prompt": "'Film thickness: 1,000 Å' 를 nm 로 바꾸면?",
      "opts": [
       "1 nm",
       "100 nm",
       "10 nm"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (3) — 노광 · CMP",
    "intro": "트랙 · 스캐너 · CMP 화면의 말입니다.",
    "items": [
     {
      "en": "resist",
      "ko": "감광액",
      "d": "빛을 받으면 성질이 바뀌는 막",
      "ex": "The resist is spin-coated and soft-baked at 100 °C for 60 seconds."
     },
     {
      "en": "reticle",
      "ko": "레티클 (회로 원판)",
      "d": "무늬가 그려진 유리판 — 마스크",
      "ex": "Load the reticle and check its ID before exposure."
     },
     {
      "en": "overlay",
      "ko": "정렬 오차",
      "d": "이번 층과 아래층의 어긋남 (nm)",
      "ex": "Overlay shall be no more than 3.0 nm in both X and Y."
     },
     {
      "en": "down force",
      "ko": "누르는 힘",
      "d": "CMP 에서 웨이퍼를 패드에 누르는 힘 (psi)",
      "ex": "Increasing the down force raises the removal rate."
     },
     {
      "en": "slurry",
      "ko": "연마액",
      "d": "미세 입자가 든 약액 — 화학 + 기계 연마",
      "ex": "Slurry is supplied to the pad at 200 mL/min."
     },
     {
      "en": "removal rate",
      "ko": "제거 속도",
      "d": "CMP 의 성적표 (Å/min)",
      "ex": "The removal rate must be between 2000 and 3000 Å/min."
     }
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — CMP 장비 개요",
    "doc": {
     "name": "CMP-300 Tool Overview",
     "no": "TO-0300",
     "sec": "2",
     "rev": "C",
     "page": "2-1"
    },
    "heading": "2  How the Polisher Works",
    "steps": [
     "The wafer is held face down by the carrier and pressed onto the pad.",
     "The platen is rotated at 93 rpm, and the carrier is rotated in the same direction.",
     {
      "t": "Slurry is supplied to the center of the pad at 200 mL/min.",
      "note": {
       "kind": "note",
       "en": "The slurry flow alarm limit is 150 mL/min."
      }
     },
     {
      "t": "The pad conditioner is used to restore the pad surface during polishing.",
      "note": {
       "kind": "caution",
       "en": "A low sweep rate causes pad glazing and a lower removal rate."
      }
     },
     "Polishing is stopped by the endpoint system when the motor current changes."
    ],
    "callout": {
     "kind": "warning",
     "en": "Do not open the polisher door while the platen is rotating."
    },
    "gloss": [
     [
      "face down",
      "앞면이 아래로"
     ],
     [
      "restore",
      "되살리다"
     ],
     [
      "glazing",
      "패드가 매끈해짐"
     ],
     [
      "motor current",
      "모터 전류"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (3) — 수동태와 목적",
    "intro": "위 CMP 개요 TO-0300 의 문장을 읽고 답하세요.",
    "questions": [
     {
      "prompt": "'The wafer is held face down by the carrier.' 웨이퍼를 잡는 부품은?",
      "opts": [
       "패드(pad)",
       "플래튼(platen)",
       "캐리어(carrier)"
      ],
      "ans": 2
     },
     {
      "prompt": "'The pad conditioner is used to restore the pad surface.' 패드 컨디셔너의 역할은?",
      "opts": [
       "패드 표면을 되살린다",
       "웨이퍼를 누른다",
       "슬러리를 공급한다"
      ],
      "ans": 0
     },
     {
      "prompt": "'Polishing is stopped by the endpoint system when the motor current changes.' 연마는 무엇에 의해 멈추나?",
      "opts": [
       "정해진 시간",
       "끝점 시스템 — 모터 전류 변화로",
       "작업자가 문을 열어서"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (4) — 이온주입",
    "intro": "이온주입 화면과 문서의 말입니다. 단위와 지수 표기에 주의하세요.",
    "items": [
     {
      "en": "energy",
      "ko": "에너지 (keV)",
      "d": "이온을 얼마나 세게 가속하나 — 깊이를 정한다",
      "ex": "Higher energy places the dopant deeper in the silicon."
     },
     {
      "en": "beam current",
      "ko": "빔 전류 (mA · µA)",
      "d": "흐르는 이온의 양 — 주입 시간을 정한다",
      "ex": "The beam current is measured by the Faraday cup before each wafer."
     },
     {
      "en": "dose",
      "ko": "주입량 (ions/cm²)",
      "d": "면적당 박힌 이온 개수 — 지수 표기",
      "ex": "The target dose is 5.0E15 ions per square centimeter."
     },
     {
      "en": "tilt / twist",
      "ko": "기울임 / 돌림 각도",
      "d": "채널링을 막으려 웨이퍼를 기울이고 돌린다",
      "ex": "The wafer is tilted 7 degrees in order to reduce channeling."
     },
     {
      "en": "Faraday cup",
      "ko": "패러데이 컵",
      "d": "빔 전류를 재는 부품",
      "ex": "The Faraday cup is used to measure the beam current."
     },
     {
      "en": "channeling",
      "ko": "채널링",
      "d": "이온이 결정 사이로 너무 깊이 미끄러지는 현상",
      "ex": "Channeling makes the junction deeper than designed."
     }
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — 이온주입 빔 준비",
    "doc": {
     "name": "IMP-900 Operating Manual",
     "no": "OM-0900",
     "sec": "6",
     "rev": "B",
     "page": "6-4"
    },
    "heading": "6  Beam Setup Before the First Lot",
    "steps": [
     "Select the recipe. The energy, dose, and tilt are loaded from the recipe.",
     {
      "t": "Tune the beam until the beam current is at least 2.0 mA.",
      "note": {
       "kind": "note",
       "en": "The beam current is read from the Faraday cup in mA or µA."
      }
     },
     "Run a beam current stability check for 60 seconds.",
     {
      "t": "The dose is controlled by the scan speed so that every wafer receives the same dose.",
      "note": {
       "kind": "caution",
       "en": "A dose error larger than ±2% shall be treated as a lot hold."
      }
     },
     "Record the final dose and beam current in the lot log."
    ],
    "callout": {
     "kind": "danger",
     "en": "High voltage. Do not open the source housing unless the tool is locked out."
    },
    "gloss": [
     [
      "tune",
      "맞추다(조정)"
     ],
     [
      "scan speed",
      "스캔 속도"
     ],
     [
      "source housing",
      "이온원 덮개"
     ],
     [
      "lot hold",
      "lot 보류"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (4) — 지수 표기와 단위",
    "intro": "이온주입 매뉴얼 OM-0900 을 근거로 판단하세요.",
    "questions": [
     {
      "prompt": "목표 dose 5.0E15 /cm², 측정 4.8E15 /cm². 'A dose error larger than ±2% shall be treated as a lot hold.' 판단은?",
      "opts": [
       "정상 — E15 가 같으니 같은 값이다",
       "lot 보류 — 4% 차이로 ±2% 를 넘는다",
       "측정 오차라 무시한다"
      ],
      "ans": 1
     },
     {
      "prompt": "빔 전류 화면이 '1800 µA'. 'at least 2.0 mA' 를 만족하는가?",
      "opts": [
       "만족하지 않는다 — 1800 µA = 1.8 mA",
       "만족한다 — 1800 이 2.0 보다 크다",
       "단위가 달라 판단할 수 없다"
      ],
      "ans": 0
     },
     {
      "prompt": "'The dose is controlled by the scan speed so that every wafer receives the same dose.' so that 뒤는?",
      "opts": [
       "스캔 속도의 단위",
       "도즈를 재는 부품",
       "그렇게 하는 목적 — 모든 웨이퍼에 같은 도즈"
      ],
      "ans": 2
     }
    ]
   },
   {
    "type": "manual",
    "mtitle": "TOOL OVERVIEW SENTENCES — FOUR FAMILIES",
    "paras": [
     "CVD: The precursor is vaporized and carried into the chamber by nitrogen.",
     "해설: 전구체는 기화되어 질소에 의해 챔버로 운반된다. (is vaporized · is carried by — 수동태, by 뒤가 운반하는 것)",
     "TRACK: The resist is spin-coated so that the film thickness is uniform across the wafer.",
     "해설: 감광액은 웨이퍼 전체에서 두께가 고르도록 회전 도포된다. (so that 뒤 = 목적)",
     "CMP: The pad conditioner is used to keep the removal rate stable.",
     "해설: 패드 컨디셔너는 제거 속도를 일정하게 유지하는 데 쓰인다. (is used to + 동사 = 목적)",
     "IMPLANT: The wafer is tilted 7 degrees in order to reduce channeling.",
     "해설: 채널링을 줄이기 위해 웨이퍼를 7도 기울인다. (in order to = 목적)"
    ]
   },
   {
    "type": "manual",
    "mtitle": "SPEC SHEET EXCERPT — ONE LINE PER TOOL (교재 예시)",
    "paras": [
     "CVD film thickness: within ±3% of the target (1000 Å).",
     "해설: 목표 1000 Å 의 ±3% → 970 ~ 1030 Å. 10강의 경계 읽기 그대로.",
     "SCANNER overlay: no more than 3.0 nm in X and Y.",
     "해설: X 와 Y 둘 다 3.0 nm 이하. 하나라도 넘으면 불합격.",
     "CMP removal rate: between 2000 and 3000 Å/min.",
     "해설: 2000 ~ 3000 Å/min(양 끝 포함이 보통).",
     "IMPLANT dose: within ±2% of the target (5.0E15 /cm²).",
     "해설: 4.9E15 ~ 5.1E15. 지수(E15)가 같은지 먼저 보고, 앞 숫자를 비교한다."
    ]
   },
   {
    "type": "sim",
    "which": "tools",
    "mode": "nouns",
    "intro": "먼저 **명사 덩어리** 실습입니다. 장비 화면의 라벨이 나옵니다. **맨 오른쪽 명사(머리)** 를 찾고, 오른쪽부터 \"~의\"로 읽은 뜻을 고르세요. 고르면 **of 로 풀어 쓴 영어**가 함께 나옵니다."
   },
   {
    "type": "sim",
    "which": "tools",
    "mode": "family",
    "intro": "다음은 **장비 계열 맞히기** 실습입니다. 처음 보는 화면 한 줄을 보고 **어느 장비(CVD · ALD · PVD · TRACK · SCANNER · CMP · IMPLANT)** 의 화면인지 고르세요. 단서는 **단어와 단위**입니다. 같은 DOSE 라도 단위가 다르면 다른 장비입니다."
   },
   {
    "type": "sim",
    "which": "tools",
    "mode": "specs",
    "intro": "마지막은 **장비별 규격 판정** 실습입니다. 장비마다 다른 단위(Å · nm · mA · µA)와 **지수 표기(E15)** 가 나옵니다. 측정값을 규격과 **같은 단위로 바꾼 뒤** PASS / FAIL 을 고르세요."
   },
   {
    "type": "comm",
    "items": [
     {
      "sit": "처음 배치된 장비에서 외국인 엔지니어에게 라벨 뜻을 묻는다",
      "q": {
       "en": "What does \"pad conditioner sweep rate low\" mean on this screen?",
       "ko": "이 화면의 \"pad conditioner sweep rate low\" 는 무슨 뜻이에요?"
      },
      "a": {
       "en": "It means the conditioner arm is moving too slowly across the pad. If it stays low, the pad gets glazed and the removal rate drops.",
       "ko": "컨디셔너 암이 패드 위를 너무 느리게 왕복한다는 뜻이에요. 계속 낮으면 패드가 매끈해지고 제거 속도가 떨어집니다."
      }
     },
     {
      "sit": "CMP 제거 속도를 보고한다",
      "q": {
       "en": "What is the removal rate on the last monitor wafer?",
       "ko": "마지막 모니터 웨이퍼의 제거 속도가 얼마예요?"
      },
      "a": {
       "en": "It was 2,450 angstroms per minute, which is within the spec of 2,000 to 3,000.",
       "ko": "분당 2,450 옹스트롬으로, 규격 2,000 ~ 3,000 안입니다."
      }
     },
     {
      "sit": "이온주입 dose 를 확인한다",
      "q": {
       "en": "Is the dose on target for this lot?",
       "ko": "이 lot 의 도즈가 목표에 맞나요?"
      },
      "a": {
       "en": "Not quite. We measured 4.8E15 against a target of 5.0E15. That is a 4% error, so I put the lot on hold.",
       "ko": "아닙니다. 목표 5.0E15 에 4.8E15 가 측정됐습니다. 4% 오차라 lot 을 보류했습니다."
      }
     }
    ]
   },
   {
    "type": "wrap",
    "title": "정리 — 단어는 바뀌어도 읽는 법은 같다",
    "points": [
     "낯선 장비는 **뼈대**부터: 무엇이 들어오나 · 어디서 처리하나 · 무엇을 조절하나 · 무엇으로 재나. 상태어와 SP / PV 는 그대로다.",
     "**명사 덩어리는 오른쪽부터** — 맨 오른쪽이 머리. chamber wall temperature setpoint = 챔버 벽 온도의 **설정값**.",
     "장비 설명서는 **수동태(is held by)** 와 **목적(is used to · in order to · so that)** 으로 부품의 역할을 말한다.",
     "장비마다 성적표와 단위가 다르다: 두께 **Å** · 노광 dose **mJ/cm²** · overlay **nm** · CMP **psi · Å/min** · 이온주입 **keV · /cm²**.",
     "같은 단어(**dose**)도 단위가 장비를 알려 준다. 판정 전에는 **단위를 맞추고**(µA → mA), **지수(E15)** 를 먼저 본다."
    ],
    "done": "이제 여러분은 처음 보는 장비 화면 앞에서도 **\"무엇의 무엇인가, 단위는 무엇인가\"** 부터 읽어 낼 수 있습니다. **Read right to left, check the unit.**",
    "figs": [
     {
      "kind": "step",
      "title": "NEW TOOL CHECKLIST",
      "items": [
       [
        "Find the [head] noun.",
        "머리 명사"
       ],
       [
        "Read the [unit].",
        "단위"
       ],
       [
        "Find [by] and [to].",
        "누가 · 왜"
       ]
      ]
     }
    ]
   }
  ]
 },
 {
  "id": "w12",
  "title": "트러블슈팅 문서 — 원인을 좁히고, 확신을 밝혀라",
  "slides": [
   {
    "type": "story",
    "icon": "🔍",
    "title": "\"확정이야, 추정이야?\"",
    "text": "밤 11시. 식각 장비 ET-05 에 알람이 뜬다. **BASE PRESSURE HIGH — 4.2E-5 Torr (limit 1.0E-5)**. 준호는 장비사의 트러블슈팅 가이드를 펼친다. 표 맨 위 줄: **Symptom: Base pressure high. Possible cause: Vacuum leak at the lid O-ring.** 준호는 바로 교대 보고에 적는다. \"O-ring leak. Will replace.\" 30분 뒤, 해외 엔지니어에게서 메시지가 온다. \"**Is the O-ring leak confirmed, or only suspected?** Did you run a helium leak check?\" 준호는 멈칫한다. 검사는 아직 안 했다. 표에 「가능한 원인」으로 적힌 것을 「원인」으로 옮겨 적은 것이다. 선배가 보고를 고쳐 준다. \"**A leak at the lid O-ring is suspected. A helium leak check is in progress.**\" 그리고 덧붙인다. \"트러블슈팅 문서에서 제일 위험한 건 틀린 원인이 아니라, **추정을 확정처럼 쓰는 것**이야. 그 한 줄 때문에 멀쩡한 부품을 갈고, 진짜 원인은 그대로 남거든.\"",
    "figs": [
     {
      "kind": "alarm",
      "level": "danger",
      "code": "VAC-112",
      "en": "BASE PRESSURE HIGH — 4.2E-5 Torr (limit 1.0E-5).",
      "ko": "도달 진공도 높음 — 4.2E-5 Torr (한계 1.0E-5)"
     }
    ]
   },
   {
    "type": "scene",
    "title": "오늘의 현장 · 상황 설정",
    "where": "야간의 식각 장비 앞 — 장비사 트러블슈팅 가이드와 공정 감시(SPC) 화면.",
    "tool": "트러블슈팅 표, 헬륨 누설 검사기, 관리도(control chart), 교대 보고서와 원인 분석 보고서.",
    "situation": "알람의 원인 후보가 넷이다. 하나씩 확인해 지워 나가야 하고, 보고할 때는 어디까지 확인했는지를 영어로 밝혀야 한다.",
    "meet": [
     "표 Symptom · Possible Cause · Check · Action",
     "확신 confirmed · likely · suspected · ruled out",
     "원인 caused by ↔ results in",
     "관리도 UCL · LCL · OOC"
    ],
    "goal": "원인 후보를 확인으로 좁히고, 보고서에 확신의 정도를 정확히 적기.",
    "bg": "w12"
   },
   {
    "type": "read",
    "title": "트러블슈팅 표의 구조 — 증상에서 조치까지",
    "intro": "장비사 매뉴얼의 트러블슈팅 장(chapter)은 대개 표다. 한 증상(symptom)에 원인 후보가 여러 줄 달린다.",
    "paras": [
     "**Symptom(증상)** — 화면이나 측정에서 보이는 것. 예: \"Base pressure high\", \"Particle count increased\". 원인이 아니라 겉으로 드러난 결과다.",
     "**Possible Cause(가능한 원인)** — 그 증상을 낼 수 있는 후보들. **possible** 이라는 말 그대로 아직 확인된 것이 아니다. 보통 흔한 것부터 위에 적는다.",
     "**Check(확인 방법)** — 그 후보가 맞는지 가리는 검사. 예: \"Perform a helium leak check at the lid.\"",
     "**Corrective Action(조치)** — 확인된 원인에 대한 처치. 예: \"Replace the lid O-ring.\" 확인 없이 이 칸부터 하면 멀쩡한 부품을 갈게 된다(**parts swapping**).",
     "표 옆에는 흐름 문장이 붙기도 한다: \"**If** the leak check passes, **go to** Cause 2.\" — 10강의 조건문 그대로다."
    ],
    "figs": [
     {
      "kind": "step",
      "title": "TROUBLESHOOTING TABLE",
      "items": [
       [
        "[Symptom] — what you see",
        "증상"
       ],
       [
        "[Possible Cause] — not yet confirmed",
        "원인 후보"
       ],
       [
        "[Check] — how to confirm",
        "확인"
       ],
       [
        "[Corrective Action] — only after the check",
        "조치"
       ]
      ]
     }
    ]
   },
   {
    "type": "read",
    "title": "원인 좁히기 — 확인해서 지운다",
    "intro": "트러블슈팅은 원인을 맞히는 일이 아니라 후보를 하나씩 지워 가는 일이다. 지울 때 쓰는 말이 정해져 있다.",
    "paras": [
     "확인 결과가 그 후보와 맞지 않으면 그 후보를 지운다: \"Gauge error **is ruled out**: the second gauge reads the same value.\"",
     "확인 결과가 그 후보를 직접 보여 주면 확정이다: \"A leak **was found** at the lid O-ring with the helium detector.\"",
     "아직 확인하지 않은 후보는 그대로 둔다(**open**). 보고서에는 지운 것과 남은 것을 모두 적는다: \"Turbo and gauge **have been ruled out**. Lid leak check **is in progress**.\"",
     "순서도 중요하다. 쉽고 빠르고 장비를 열지 않는 확인부터 한다. 게이지 비교 → 터보 상태 → 누설 검사 → 분해 순서가 흔하다.",
     "모든 후보가 지워졌는데 증상이 남아 있으면, 표에 없는 원인이다. 이때는 추측으로 조치하지 말고 **escalate(상부 · 장비사에 올림)** 한다."
    ],
    "figs": [
     {
      "kind": "log",
      "title": "TROUBLESHOOTING LOG — ET-05",
      "lines": [
       "23:10  Gauge cross-check — [RULED OUT]",
       "23:18  Turbo speed 100% — [RULED OUT]",
       "23:40  He leak check at lid — [IN PROGRESS]"
      ]
     }
    ]
   },
   {
    "type": "read",
    "title": "확신의 정도 — confirmed · likely · suspected · ruled out",
    "intro": "원인 보고 문장은 원인이 무엇인지보다 먼저 얼마나 확실한지를 말해야 한다. 그 정도를 정하는 말이 네 층이다.",
    "paras": [
     "**확정(confirmed)** — confirmed · verified · was found · the root cause is. 직접 증거가 있다. 예: \"Root cause **confirmed**: the O-ring was cut during the last PM.\"",
     "**가능성 높음(likely)** — most likely · probably · is consistent with · points to · suggests. 증거가 그쪽을 가리키지만 직접 확인은 아직이다.",
     "**가능성 있음(possible)** — may · might · could · possibly · is suspected. 후보일 뿐이다. 예: \"The gauge **may** be drifting.\"",
     "**배제(ruled out)** — ruled out · eliminated · is not the cause. 확인해서 지웠다.",
     "9강의 조동사와 헷갈리지 마라. 규정문의 **may** 는 \"해도 된다\"(허용)였지만, 원인 보고의 **may** 는 \"~일 수도 있다\"(가능성)다. 문서의 종류가 뜻을 정한다.",
     "한 등급 높여 쓰면(suspected → confirmed) 멀쩡한 부품을 갈고, 한 등급 낮춰 쓰면(confirmed → may) 조치가 늦어진다. **증거만큼만** 쓴다."
    ],
    "figs": [
     {
      "kind": "step",
      "title": "CERTAINTY",
      "items": [
       [
        "[confirmed] / [was found]",
        "확정"
       ],
       [
        "[most likely] / [is consistent with]",
        "가능성 높음"
       ],
       [
        "[may] / [is suspected]",
        "가능성 있음"
       ],
       [
        "[ruled out] / [is not the cause]",
        "배제"
       ]
      ]
     }
    ]
   },
   {
    "type": "read",
    "title": "원인과 결과의 방향 — caused by ↔ results in",
    "intro": "원인과 결과를 잇는 말은 화살표의 방향이 정반대인 것끼리 짝을 이룬다. 방향을 거꾸로 읽으면 원인과 증상이 뒤바뀐다.",
    "paras": [
     "**결과 ← 원인** 방향: **caused by · due to · because of · results from**. 예: \"The pressure rise is **caused by** a leak.\" → 원인은 leak.",
     "**원인 → 결과** 방향: **causes · results in · leads to · so · as a result**. 예: \"A leak **results in** a pressure rise.\" → 원인은 여전히 leak.",
     "두 문장은 같은 내용이다. **results in** 과 **results from** 은 전치사 하나 차이로 방향이 정반대다 — 가장 자주 거꾸로 읽는 짝이다.",
     "**contribute to** 는 \"원인 중 하나다\"(유일한 원인이 아님). \"Chamber wall deposits **contributed to** the particle increase.\"",
     "읽는 법: 연결어 앞뒤에서 **원인 쪽에 밑줄**을 긋는다. 원인이 문장 앞에 있든 뒤에 있든, 밑줄 친 쪽이 조치의 대상이다."
    ],
    "figs": [
     {
      "kind": "note",
      "title": "DIRECTION",
      "en": "Effect [is caused by] cause. Cause [results in] effect.",
      "ko": "caused by 뒤가 원인 · results in 앞이 원인."
     }
    ]
   },
   {
    "type": "read",
    "title": "근본 원인과 세 가지 조치 — 5 Why · 8D",
    "intro": "부품을 갈아서 알람이 꺼졌다고 끝이 아니다. 원인 분석 보고(8D 등)는 원인을 두 층으로, 조치를 세 층으로 나눈다.",
    "paras": [
     "**direct cause(직접 원인)** — 증상을 바로 만든 것. 예: O-ring 이 찢어졌다.",
     "**root cause(근본 원인)** — 그 직접 원인이 생긴 이유. 예: 지난 PM 때 O-ring 을 끼우는 지그가 없어 손으로 끼우다 찢었다. \"Why?\"를 다섯 번쯤 물어 내려가는 방법을 **5 Why** 라고 한다.",
     "**containment action(임시 조치)** — 피해를 막는 즉시 조치. 예: 장비 정지, 영향받은 lot 보류(hold). 8D 의 D3.",
     "**corrective action(시정 조치)** — 직접 원인을 없앤다. 예: O-ring 교체 후 누설 검사 합격. 8D 의 D5.",
     "**preventive action(재발 방지)** — 근본 원인을 없애 같은 일이 다시 안 생기게 한다. 예: 지그 도입, PM 절차서 수정. 8D 의 D7. 이것이 없으면 다음 PM 에 또 찢어진다."
    ],
    "figs": [
     {
      "kind": "step",
      "title": "8D (KEY STEPS)",
      "items": [
       [
        "D3 [containment] — stop the damage",
        "임시 조치"
       ],
       [
        "D4 [root cause] — why it happened",
        "근본 원인"
       ],
       [
        "D5 [corrective] — remove the direct cause",
        "시정 조치"
       ],
       [
        "D7 [preventive] — stop it from recurring",
        "재발 방지"
       ]
      ]
     }
    ]
   },
   {
    "type": "read",
    "title": "SPC 관리도 읽기 — OOC 는 \"규격 밖\"이 아니다",
    "intro": "고장 전에 이상을 잡는 것이 공정 감시다. 측정값을 시간순으로 찍은 관리도(control chart)와 그 경고 메시지(OOC)를 읽는다.",
    "paras": [
     "**CL(center line)** — 평소 평균. **UCL / LCL(upper / lower control limit)** — 평소의 흔들림 폭(보통 ±3σ). 공정이 \"평소대로\"인지의 경계다.",
     "**spec limit(규격 한계)** — 제품이 합격인지의 경계. 고객·설계가 정한다. 보통 관리 한계보다 바깥에 있다.",
     "**OOC(out of control)** — 관리 한계 규칙에 걸렸다 = **평소와 달라졌다**. 아직 규격 안(**in spec**)일 수 있다. **OOS(out of spec)** 는 규격 밖 = 불량이다. 두 말을 섞으면 안 된다.",
     "대표 규칙(이 교재의 예시 — Western Electric · Nelson 규칙에서): ① **한 점이 UCL 또는 LCL 밖** ② **중심선 한쪽에 8점 연속(run)** ③ **6점 연속 증가 또는 감소(trend)**.",
     "②와 ③은 한 점도 한계 밖이 아닌데 걸린다. 값이 한쪽으로 쏠리거나 계속 움직이는 것은 무언가 바뀌었다는 신호이기 때문이다 — 예: 부품 마모, 챔버 벽 침착.",
     "OOC 가 뜨면 보통 장비를 멈추고(**inhibit**) 엔지니어가 원인을 본다. 메시지 예: \"**OOC: Rule 2 — 8 points above CL. Tool inhibited.**\""
    ],
    "figs": [
     {
      "kind": "hmi",
      "tool": "SPC · ET-05 ETCH RATE",
      "status": "OOC",
      "state": "fault",
      "rows": [
       [
        "CL / UCL / LCL",
        "100 / 106 / 94 nm/min"
       ],
       [
        "SPEC LIMIT",
        "90 ~ 110 nm/min"
       ],
       [
        "LAST POINT",
        "107 nm/min",
        "warn"
       ]
      ],
      "banner": {
       "en": "OOC: Rule 1 — 1 point beyond UCL. Tool inhibited.",
       "ko": "관리 이탈: 규칙 1 — UCL 밖 한 점. 장비 정지.",
       "level": "danger"
      }
     }
    ]
   },
   {
    "type": "acr",
    "title": "약어",
    "intro": "트러블슈팅 문서와 공정 감시 화면에 나오는 약어입니다.",
    "items": [
     {
      "ab": "RCA",
      "full": "Root Cause Analysis",
      "ko": "근본 원인 분석"
     },
     {
      "ab": "8D",
      "full": "Eight Disciplines",
      "ko": "8단계 문제 해결 보고 양식 — D3 임시 · D5 시정 · D7 재발 방지"
     },
     {
      "ab": "CAPA",
      "full": "Corrective and Preventive Action",
      "ko": "시정 및 재발 방지 조치"
     },
     {
      "ab": "FDC",
      "full": "Fault Detection and Classification",
      "ko": "장비 센서 값으로 이상을 잡는 감시 시스템"
     },
     {
      "ab": "SPC",
      "full": "Statistical Process Control",
      "ko": "통계적 공정 관리 — 관리도로 감시"
     },
     {
      "ab": "CL",
      "full": "Center Line",
      "ko": "관리도의 중심선(평소 평균)"
     },
     {
      "ab": "UCL / LCL",
      "full": "Upper / Lower Control Limit",
      "ko": "관리 상한 / 하한 — 규격 한계와 다르다"
     },
     {
      "ab": "OOC",
      "full": "Out of Control",
      "ko": "관리 이탈 — 평소와 달라짐(규격 안일 수 있음)"
     },
     {
      "ab": "OOS",
      "full": "Out of Specification",
      "ko": "규격 이탈 — 불량"
     },
     {
      "ab": "MTBF",
      "full": "Mean Time Between Failures",
      "ko": "평균 고장 간격 — 장비 신뢰성 지표"
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (1) — 확신의 정도",
    "intro": "원인 보고 문장의 확신 등급입니다. 예문마다 어느 층인지 가려 보세요.",
    "items": [
     {
      "en": "confirmed",
      "ko": "확정된",
      "d": "직접 증거로 확인됨",
      "ex": "Root cause confirmed: the lid O-ring was cut during the last PM."
     },
     {
      "en": "was found",
      "ko": "발견되었다",
      "d": "검사에서 실제로 봤다 — 확정",
      "ex": "A leak was found at the lid O-ring with the helium detector."
     },
     {
      "en": "most likely",
      "ko": "가장 가능성 높은",
      "d": "증거가 가리키지만 직접 확인 전",
      "ex": "The leak is most likely at the lid O-ring."
     },
     {
      "en": "is consistent with",
      "ko": "~와 들어맞는다",
      "d": "증거가 그 설명과 모순되지 않음 — 가능성 높음",
      "ex": "The pressure trend is consistent with outgassing after the wet clean."
     },
     {
      "en": "is suspected",
      "ko": "의심된다",
      "d": "후보일 뿐 — 가능성 있음",
      "ex": "The chamber liner is suspected as the particle source."
     },
     {
      "en": "ruled out",
      "ko": "배제된",
      "d": "확인해서 원인이 아님",
      "ex": "Turbo pump degradation has been ruled out."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (1) — 확신의 정도",
    "intro": "보고 문장의 확신 등급을 판단하세요.",
    "questions": [
     {
      "prompt": "교대 보고: 'The leak is most likely at the lid O-ring.' 다음 사람이 할 일은?",
      "opts": [
       "O-ring 을 바로 교체한다 — 확정이다",
       "누설 검사로 확인한다 — 가능성이 높을 뿐 확정 전이다",
       "아무것도 안 한다 — 배제되었다"
      ],
      "ans": 1
     },
     {
      "prompt": "'Turbo pump degradation has been ruled out.' 의 뜻은?",
      "opts": [
       "터보 펌프는 확인 결과 원인이 아니다",
       "터보 펌프가 원인으로 확정되었다",
       "터보 펌프가 원인일 수도 있다"
      ],
      "ans": 0
     },
     {
      "prompt": "원인 보고서의 'The gauge may be drifting.' 에서 may 는?",
      "opts": [
       "허용 — 게이지가 움직여도 된다",
       "의무 — 게이지를 움직여야 한다",
       "가능성 — 게이지가 틀어졌을 수도 있다"
      ],
      "ans": 2
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (2) — 원인과 결과",
    "intro": "화살표 방향을 정하는 연결어입니다. 원인 쪽에 밑줄을 그어 보세요.",
    "items": [
     {
      "en": "caused by",
      "ko": "~에 의해 생긴",
      "d": "뒤가 원인 (결과 ← 원인)",
      "ex": "The pressure rise was caused by a cut O-ring."
     },
     {
      "en": "due to",
      "ko": "~때문에",
      "d": "뒤가 원인",
      "ex": "The run was aborted due to an endpoint timeout."
     },
     {
      "en": "results in",
      "ko": "~을 낳는다",
      "d": "앞이 원인 (원인 → 결과)",
      "ex": "A low sweep rate results in pad glazing."
     },
     {
      "en": "results from",
      "ko": "~에서 생긴다",
      "d": "뒤가 원인 — results in 과 반대 방향",
      "ex": "Pad glazing results from a low conditioner sweep rate."
     },
     {
      "en": "leads to",
      "ko": "~로 이어진다",
      "d": "앞이 원인",
      "ex": "Polymer buildup on the wall leads to particle flakes."
     },
     {
      "en": "contribute to",
      "ko": "~의 한 원인이 되다",
      "d": "여러 원인 중 하나",
      "ex": "Chamber wall deposits contributed to the particle increase."
     }
    ]
   },
   {
    "type": "mansample",
    "variant": "parts",
    "title": "매뉴얼 표본 — 트러블슈팅 표",
    "doc": {
     "name": "ET-05 MAINTENANCE MANUAL — TROUBLESHOOTING",
     "no": "MM-0505",
     "rev": "D"
    },
    "heading": "Symptom: BASE PRESSURE HIGH (교재 예시)",
    "cols": [
     "#",
     "POSSIBLE CAUSE",
     "CHECK",
     "IF CONFIRMED (CORRECTIVE ACTION)"
    ],
    "rows": [
     [
      "1",
      "Gauge error or drift",
      "Compare with the second gauge.",
      "Calibrate or replace the gauge."
     ],
     [
      "2",
      "Turbo pump degraded",
      "Check turbo speed and foreline pressure.",
      "Replace the turbo pump."
     ],
     [
      "3",
      "Outgassing after wet clean",
      "Clean within 12 h and rate of rise decreasing?",
      "Continue pumping; recheck in 4 h."
     ],
     [
      "4",
      "Vacuum leak at the lid O-ring",
      "Perform a helium leak check at the lid.",
      "Replace the O-ring; retest."
     ]
    ],
    "callout": {
     "kind": "note",
     "en": "Check the causes in this order. Do not replace any part until its cause is confirmed."
    }
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (2) — 표로 좁히기",
    "intro": "위 트러블슈팅 표 MM-0505 를 근거로 판단하세요.",
    "questions": [
     {
      "prompt": "두 번째 게이지도 같은 값(4.2E-5 Torr)을 읽는다. 1번 원인(gauge error)은?",
      "opts": [
       "확정이다",
       "아직 열려 있다",
       "배제한다 — 두 게이지가 같으면 게이지 오차가 아니다"
      ],
      "ans": 2
     },
     {
      "prompt": "세정(wet clean)은 3일 전이었다. 3번 원인(outgassing)은?",
      "opts": [
       "배제한다 — 12시간 기준을 한참 넘었다",
       "확정이다",
       "가장 가능성이 높다"
      ],
      "ans": 0
     },
     {
      "prompt": "1~3번이 모두 배제되었다. 'Do not replace any part until its cause is confirmed.' 다음 할 일은?",
      "opts": [
       "O-ring 을 바로 교체한다",
       "4번 확인(헬륨 누설 검사)을 한다",
       "터보 펌프를 교체한다"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (3) — 원인 분석과 조치",
    "intro": "원인 분석 보고(8D · CAPA)에서 쓰는 말입니다.",
    "items": [
     {
      "en": "direct cause",
      "ko": "직접 원인",
      "d": "증상을 바로 만든 것",
      "ex": "The direct cause was a cut O-ring at the lid."
     },
     {
      "en": "root cause",
      "ko": "근본 원인",
      "d": "직접 원인이 생긴 이유 — 5 Why 로 찾는다",
      "ex": "The root cause was the lack of an O-ring install jig during PM."
     },
     {
      "en": "containment action",
      "ko": "임시 조치",
      "d": "피해를 막는 즉시 조치 (D3)",
      "ex": "As a containment action, the tool was inhibited and two lots were put on hold."
     },
     {
      "en": "corrective action",
      "ko": "시정 조치",
      "d": "직접 원인을 없앤다 (D5)",
      "ex": "Corrective action: the O-ring was replaced and the leak check passed."
     },
     {
      "en": "preventive action",
      "ko": "재발 방지 조치",
      "d": "근본 원인을 없앤다 (D7)",
      "ex": "Preventive action: an install jig was added to the PM procedure."
     },
     {
      "en": "escalate",
      "ko": "상부에 올리다",
      "d": "내 선에서 못 풀 때 엔지니어 · 장비사로",
      "ex": "If all causes are ruled out, escalate to the vendor."
     }
    ]
   },
   {
    "type": "mansample",
    "variant": "email",
    "title": "매뉴얼 표본 — 원인 분석 요약 메일",
    "from": "Junho Lee <junho.lee@fab.example>",
    "to": "Etch Equipment Team <etch-eq@fab.example>",
    "subject": "ET-05 base pressure high — RCA summary",
    "lines": [
     "Hi all,",
     "Symptom: Base pressure was 4.2E-5 Torr against a limit of 1.0E-5 Torr at 23:05.",
     "Checks: Gauge error and turbo degradation were [ruled out]. A leak [was found] at the lid O-ring with the helium detector.",
     "Direct cause: The O-ring was cut. It was [most likely] damaged during the PM on Nov 3, because it was installed by hand.",
     "Containment: ET-05 was inhibited, and lots 2417 and 2418 are on hold.",
     "Corrective action: The O-ring was replaced. Base pressure recovered to 6.0E-6 Torr.",
     "Preventive action (proposed): Add an install jig to the PM procedure. The root cause is not yet [confirmed]."
    ],
    "sign": "Thanks, Junho (Etch, night shift)"
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (3) — 보고서 읽기",
    "intro": "위 원인 분석 요약 메일을 근거로 답하세요.",
    "questions": [
     {
      "prompt": "메일에서 '확정'으로 쓴 것은?",
      "opts": [
       "O-ring 이 PM 때 손상되었다는 것",
       "근본 원인(지그가 없었다는 것)",
       "덮개 O-ring 에서 누설이 발견되었다는 것"
      ],
      "ans": 2
     },
     {
      "prompt": "'lots 2417 and 2418 are on hold' 는 8D 의 어느 조치인가?",
      "opts": [
       "임시 조치(containment)",
       "시정 조치(corrective)",
       "재발 방지(preventive)"
      ],
      "ans": 0
     },
     {
      "prompt": "'The root cause is not yet confirmed.' 를 읽은 엔지니어가 할 일은?",
      "opts": [
       "보고를 닫는다 — 부품을 갈았으니 끝이다",
       "근본 원인 확인을 계속하고 재발 방지를 확정한다",
       "O-ring 을 한 번 더 간다"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (4) — 공정 감시(SPC · FDC)",
    "intro": "관리도와 감시 화면의 말입니다. 관리 한계와 규격 한계를 구분하세요.",
    "items": [
     {
      "en": "control limit",
      "ko": "관리 한계 (UCL · LCL)",
      "d": "평소의 흔들림 폭 — 공정이 \"평소대로\"인지의 경계",
      "ex": "The point at 107 nm/min is above the upper control limit of 106."
     },
     {
      "en": "spec limit",
      "ko": "규격 한계",
      "d": "제품 합격의 경계 — 보통 관리 한계보다 바깥",
      "ex": "The same point is still within the spec limit of 110 nm/min."
     },
     {
      "en": "out of control (OOC)",
      "ko": "관리 이탈",
      "d": "평소와 달라짐 — 규격 안일 수 있다",
      "ex": "An OOC point does not always mean the wafer is bad."
     },
     {
      "en": "run",
      "ko": "연속(한쪽 쏠림)",
      "d": "중심선 한쪽에 여러 점이 연속",
      "ex": "Eight points in a run above the center line trigger Rule 2."
     },
     {
      "en": "trend",
      "ko": "추세",
      "d": "계속 오르거나 내림",
      "ex": "Six points steadily increasing indicate a trend, such as wear."
     },
     {
      "en": "inhibit",
      "ko": "(장비 사용을) 막다",
      "d": "OOC 뒤 엔지니어 확인 전까지 정지",
      "ex": "The tool is inhibited until the engineer reviews the chart."
     }
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — OOC 대응 절차",
    "doc": {
     "name": "SPC Response Procedure",
     "no": "SOP-QA-044",
     "sec": "3",
     "rev": "C",
     "page": "3-1"
    },
    "heading": "3  Responding to an OOC Alarm",
    "steps": [
     "When an OOC alarm occurs, the tool is inhibited automatically.",
     {
      "t": "Check which rule was triggered: Rule 1 (beyond a control limit), Rule 2 (run of 8), or Rule 3 (trend of 6).",
      "note": {
       "kind": "note",
       "en": "An OOC point may still be within the spec limit."
      }
     },
     {
      "t": "If the point is also out of spec (OOS), put the affected lots on hold.",
      "note": {
       "kind": "caution",
       "en": "OOC and OOS are different. Do not scrap wafers for OOC alone."
      }
     },
     "Investigate the cause using the troubleshooting guide and the FDC data.",
     "Release the tool only after the cause is confirmed or the engineer approves."
    ],
    "callout": {
     "kind": "warning",
     "en": "Do not clear an OOC alarm without recording the cause."
    },
    "gloss": [
     [
      "triggered",
      "(규칙에) 걸린"
     ],
     [
      "scrap",
      "폐기하다"
     ],
     [
      "investigate",
      "조사하다"
     ],
     [
      "release",
      "(정지를) 풀다"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (4) — OOC 와 OOS",
    "intro": "관리도와 OOC 대응 절차 SOP-QA-044 를 근거로 판단하세요.",
    "questions": [
     {
      "prompt": "식각 속도 107 nm/min. UCL 106, 규격 90~110. 이 점은?",
      "opts": [
       "OOC 이면서 OOS — 불량이다",
       "OOC 지만 규격 안 — 평소와 달라진 신호다",
       "정상 — 아무 일도 아니다"
      ],
      "ans": 1
     },
     {
      "prompt": "'Do not scrap wafers for OOC alone.' 의 뜻은?",
      "opts": [
       "관리 이탈만으로 웨이퍼를 폐기하지 마라",
       "OOC 면 웨이퍼를 폐기하라",
       "OOC 를 기록하지 마라"
      ],
      "ans": 0
     },
     {
      "prompt": "8점 연속 중심선 위, 한 점도 UCL 밖은 아니다. 어떻게 읽나?",
      "opts": [
       "정상 — 한계 밖이 없으니 문제없다",
       "규격 이탈이다",
       "Rule 2(run) 에 걸린 OOC — 공정이 한쪽으로 쏠렸다"
      ],
      "ans": 2
     }
    ]
   },
   {
    "type": "manual",
    "mtitle": "TROUBLESHOOTING REPORT — WRITE ONLY WHAT YOU KNOW",
    "paras": [
     "A leak at the lid O-ring is suspected. A helium leak check is in progress.",
     "해설: 확인 전 보고 — is suspected(가능성 있음) + in progress(진행 중). \"O-ring leak\" 이라고만 쓰면 확정처럼 읽힌다.",
     "A leak was found at the lid O-ring. The O-ring was replaced, and the leak check passed.",
     "해설: 확인 뒤 보고 — was found(확정) + 조치 + 조치의 결과(passed). 조치가 효과가 있었는지까지 쓴다.",
     "The particle increase is most likely caused by polymer flakes from the chamber wall.",
     "해설: most likely(가능성 높음) + caused by(뒤가 원인). 원인 = 챔버 벽의 폴리머 조각. 아직 확정은 아니다.",
     "Gauge error has been ruled out: the second gauge reads the same value.",
     "해설: ruled out(배제) + 근거(콜론 뒤). 배제한 이유를 함께 적어야 다음 사람이 같은 확인을 반복하지 않는다."
    ]
   },
   {
    "type": "manual",
    "mtitle": "SPC RULES FOR THIS COURSE (교재 예시)",
    "paras": [
     "Rule 1: One point beyond the upper or lower control limit.",
     "해설: UCL 또는 LCL 밖 한 점. 갑작스러운 변화 — 예: 부품 고장, 잘못된 레시피.",
     "Rule 2: Eight points in a row on one side of the center line.",
     "해설: 중심선 한쪽에 8점 연속. 평균이 옮겨 갔다 — 예: 세정 뒤 챔버 조건 변화.",
     "Rule 3: Six points in a row steadily increasing or decreasing.",
     "해설: 6점 연속 증가 또는 감소. 천천히 변하는 것 — 예: 부품 마모, 벽 침착.",
     "An OOC point is a signal to investigate, not proof of a bad wafer.",
     "해설: OOC 는 조사하라는 신호이지 불량의 증거가 아니다. 불량 판정은 규격(spec)으로 한다."
    ]
   },
   {
    "type": "sim",
    "which": "trouble",
    "mode": "certainty",
    "intro": "먼저 **확신 등급** 실습입니다. 교대 보고와 원인 분석 보고서에서 뽑은 문장을 읽고 **확정(confirmed) · 가능성 높음(likely) · 가능성 있음(possible) · 배제(ruled out)** 중 하나를 고르세요. 판단의 근거는 문장 속 **확신 표현** 하나입니다."
   },
   {
    "type": "sim",
    "which": "trouble",
    "mode": "narrow",
    "intro": "다음은 **원인 좁히기** 실습입니다. BASE PRESSURE HIGH 의 트러블슈팅 표(교재 예시)와 지금까지의 확인 결과가 나옵니다. 후보마다 **배제 · 확정 · 미확인** 을 따져, 증거가 가리키는 원인을 고르세요. 증거가 모자라면 **\"확인이 더 필요하다\"** 가 답입니다."
   },
   {
    "type": "sim",
    "which": "trouble",
    "mode": "spc",
    "intro": "마지막은 **관리도 규칙** 실습입니다. 식각 속도 관리도(CL 100 · UCL 106 · LCL 94, 규격 90~110)를 보고, 어느 규칙에 걸렸는지 고르세요: **이상 없음 · Rule 1(한계 밖) · Rule 2(8점 쏠림) · Rule 3(6점 추세)**. 그리고 그 점이 **규격 안인지**도 함께 보세요."
   },
   {
    "type": "comm",
    "items": [
     {
      "sit": "해외 엔지니어가 원인이 확정인지 묻는다",
      "q": {
       "en": "Is the O-ring leak confirmed, or only suspected?",
       "ko": "O-ring 누설이 확정이에요, 아니면 의심만 하는 거예요?"
      },
      "a": {
       "en": "It is only suspected for now. We ruled out the gauge and the turbo, and the helium leak check is in progress. I will update you in 20 minutes.",
       "ko": "지금은 의심 단계입니다. 게이지와 터보는 배제했고, 헬륨 누설 검사를 진행 중입니다. 20분 뒤에 다시 알려 드리겠습니다."
      }
     },
     {
      "sit": "원인과 조치를 한 번에 보고한다",
      "q": {
       "en": "What was the cause, and what did you do?",
       "ko": "원인이 뭐였고, 무엇을 했어요?"
      },
      "a": {
       "en": "A leak was found at the lid O-ring. It was cut, most likely during the last PM. We replaced it, and the base pressure is back to 6.0E-6 Torr. Two lots are on hold until you review them.",
       "ko": "덮개 O-ring 에서 누설이 발견됐습니다. 찢어져 있었고, 아마 지난 PM 때 손상된 것 같습니다. 교체했고 도달 진공도는 6.0E-6 Torr 로 돌아왔습니다. 두 lot 은 검토하실 때까지 보류해 두었습니다."
      }
     },
     {
      "sit": "OOC 알람을 보고한다",
      "q": {
       "en": "The SPC chart shows an OOC. Are the wafers bad?",
       "ko": "SPC 관리도에 OOC 가 떴네요. 웨이퍼가 불량인가요?"
      },
      "a": {
       "en": "Not necessarily. It is a Rule 2 OOC, eight points above the center line, but all points are within spec. The tool is inhibited, and I am checking the FDC data for a cause.",
       "ko": "꼭 그렇지는 않습니다. 중심선 위 8점 연속인 Rule 2 OOC 이지만 모든 점이 규격 안입니다. 장비는 정지해 두었고, FDC 데이터에서 원인을 찾고 있습니다."
      }
     }
    ]
   },
   {
    "type": "wrap",
    "title": "정리 — 증거만큼만 쓴다",
    "points": [
     "트러블슈팅 표: **Symptom → Possible Cause → Check → Corrective Action**. 확인 없이 조치하면 **parts swapping**.",
     "확신 네 층: **confirmed · was found** / **most likely · is consistent with** / **may · is suspected** / **ruled out**. 원인 보고의 may 는 허용이 아니라 **가능성**이다.",
     "방향: **caused by · due to · results from** 은 뒤가 원인, **results in · leads to** 는 앞이 원인.",
     "원인 두 층(**direct · root**), 조치 세 층(**containment · corrective · preventive**).",
     "관리도: **OOC 는 평소와 달라졌다는 신호**, **OOS 는 불량**. 한계 밖이 아니어도 **run · trend** 로 OOC 가 된다."
    ],
    "done": "이제 여러분은 트러블슈팅 문서를 읽고 **원인을 확인으로 좁히고**, 보고서에 **어디까지 확인했는지**를 영어로 정확히 적을 수 있습니다. **Write only what you know.**",
    "figs": [
     {
      "kind": "step",
      "title": "REPORT A CAUSE",
      "items": [
       [
        "State the [symptom].",
        "증상"
       ],
       [
        "Say how [certain] you are.",
        "확신의 정도"
       ],
       [
        "Give the [evidence].",
        "근거"
       ],
       [
        "Say what is [next].",
        "다음 할 일"
       ]
      ]
     }
    ]
   }
  ]
 },
 {
  "id": "w13",
  "title": "LVS 검증",
  "slides": [
   {
    "type": "story",
    "icon": "🔍",
    "title": "도면과 실제가 다르면?",
    "text": "야간 근무 중 후배 기술자가 화면을 보다가 당신을 부릅니다. 검증 리포트 맨 위에 빨간 글씨로 **LVS FAILED** 라고 떠 있습니다. 그 아래에는 **1 mismatch, 2 missing devices, 1 short**. 후배가 묻습니다. \"선배님, 이거 레이아웃을 잘못 그린 건가요, 아니면 회로도가 틀린 건가요?\" 당신은 침착하게 설명합니다. **LVS(Layout Versus Schematic)** 는 설계자가 그린 **schematic**(회로도)과 실제로 그려진 **layout**(레이아웃)이 전기적으로 똑같은지를 자동으로 비교하는 검증입니다. 두 개를 각각 **netlist**(넷리스트)로 뽑아서 소자 하나하나, 연결선 하나하나를 대조합니다. **match** 가 뜨면 통과, **mismatch** 가 뜨면 어딘가 다르다는 뜻이죠. 현장에서 우리가 읽어야 할 것은 바로 이 영문 리포트입니다. 어느 소자가 빠졌는지(**missing**), 어디가 붙어버렸는지(**short**), 어디가 끊어졌는지(**open**) — 영어 한 줄을 정확히 읽어내는 것이 오늘의 목표입니다.",
    "art": "lvs"
   },
   {
    "type": "scene",
    "title": "오늘의 현장 · 상황 설정",
    "where": "검증 데스크. 회로도와 레이아웃을 나란히 띄워 둔 화면 앞.",
    "tool": "LVS(Layout Versus Schematic) 리포트와 넷리스트 비교.",
    "situation": "도면과 실제가 다르다는 mismatch가 떴다.",
    "meet": [
     "LVS REPORT",
     "matched · mismatch",
     "layout ≠ schematic",
     "NOT CLEAN"
    ],
    "goal": "두 넷리스트를 비교해 \"일치 / 불일치\"를 읽기.",
    "bg": "w13"
   },
   {
    "type": "read",
    "title": "LVS란 무엇인가",
    "intro": "LVS는 '내가 그린 그림'과 '내가 의도한 회로'가 같은지 확인하는 검증입니다.",
    "paras": [
     "**LVS = Layout Versus Schematic**. 이름 그대로 **layout**(실제 배치된 도형)과 **schematic**(설계자가 의도한 회로도)을 서로(**Versus**) 비교하는 검증입니다. 화면에는 보통 **Compare Layout vs. Schematic** 또는 **LVS Run** 이라는 메뉴로 나타납니다.",
     "비교의 핵심은 도형을 직접 보는 게 아니라 **netlist**(넷리스트)로 변환해서 대조한다는 점입니다. 넷리스트는 '어떤 소자가, 어떤 핀끼리, 어떤 선(**net**)으로 연결되어 있는가'를 글자로 적어놓은 목록입니다.",
     "레이아웃에서는 **layout extraction**(레이아웃 추출) 과정을 통해 실제 그려진 도형에서 자동으로 넷리스트를 뽑아냅니다. 화면 로그에 **Extracting devices...**, **Building connectivity...** 같은 영문이 흘러갑니다.",
     "두 넷리스트가 완전히 같으면 리포트에 **LVS clean** 또는 **Match** 가 표시되고, 하나라도 다르면 **Mismatch** 와 함께 오류 목록이 나옵니다. 우리가 현장에서 읽어야 하는 것이 바로 이 오류 목록입니다.",
     "LVS가 검증하는 것은 '모양'이 아니라 '**connectivity**(연결 관계)'입니다. 선이 예쁘게 그려졌는지가 아니라, 전기적으로 같은 회로인지를 봅니다. 그래서 오류 메시지도 대부분 '무엇이 무엇에 잘못 연결/미연결되었다'는 문장입니다."
    ],
    "figs": [
     {
      "kind": "log",
      "title": "LVS REPORT",
      "lines": [
       "Nets matched:    1044",
       "Devices matched: 512",
       "[MISMATCH]: 1 net",
       "→ layout ≠ schematic"
      ]
     },
     {
      "kind": "sticker",
      "level": "danger",
      "en": "LVS: NOT CLEAN",
      "ko": "LVS 미일치"
     }
    ]
   },
   {
    "type": "read",
    "title": "검증 흐름 속에서의 LVS",
    "intro": "LVS는 혼자 돌아가지 않습니다. DRC·LVS·PEX로 이어지는 검증 흐름의 한 단계입니다.",
    "paras": [
     "먼저 **DRC(Design Rule Check)** 가 돌아갑니다. 이것은 선 간격·폭 같은 '물리적 규칙'을 지켰는지 보는 검사로, '그릴 수 있는 모양인가'를 판단합니다. LVS와는 별개의 검증입니다.",
     "DRC가 통과해도 **LVS** 는 따로 해야 합니다. DRC는 '잘 그렸다'만 보지, '설계 의도와 같은 회로인가'는 보지 않기 때문입니다. 모양은 규칙을 지켰어도 엉뚱한 net에 연결될 수 있습니다.",
     "현장 화면에서는 보통 **DRC → LVS → PEX** 순서로 버튼이 배치되어 있고, 각각 **Clean / Errors** 상태를 표시합니다. LVS가 clean이 되어야 다음 단계로 넘어갑니다.",
     "**PEX(Parasitic Extraction)** 는 LVS가 통과된 뒤 기생 저항·기생 용량을 뽑아내는 후속 단계입니다. LVS가 틀리면 PEX 결과도 믿을 수 없으므로, LVS clean이 전제 조건입니다.",
     "정리하면 **DRC = 모양 검사, LVS = 연결 검사, PEX = 성능 예측**입니다. 현장에서 \"LVS 못 넘어가서 PEX 못 돌린다\"는 말은 이 순서 때문입니다."
    ]
   },
   {
    "type": "read",
    "title": "LVS 오류의 종류를 읽는 법",
    "intro": "영문 리포트에 반복적으로 등장하는 오류 유형은 정해져 있습니다. 유형만 알면 절반은 읽은 것입니다.",
    "paras": [
     "**Missing device**(누락 소자): schematic에는 있는데 layout에는 없는 소자입니다. 리포트에는 **Device in schematic but not in layout** 형태로 나옵니다. 설계자가 의도한 트랜지스터를 레이아웃에서 안 그렸다는 뜻입니다.",
     "**Extra device**(잉여 소자): 반대로 layout에는 있는데 schematic에는 없는 소자입니다. **Device in layout but not in schematic** — 필요 없는 소자를 실수로 더 그린 경우입니다.",
     "**Incorrect connection**(잘못된 연결): 소자는 맞는데 연결된 **net**(노드)이 다른 경우입니다. **Net mismatch** 또는 **terminal connected to wrong net** 처럼 표시됩니다. 트랜지스터의 게이트가 엉뚱한 선에 붙은 상황이죠.",
     "**Short**(단락): 원래 떨어져 있어야 할 두 개의 net이 하나로 붙어버린 것입니다. 리포트의 **Nets shorted together** 또는 **Short between VDD and VSS** 같은 문장은 매우 위험한 신호입니다. 전원-접지 단락은 소자 파손으로 이어집니다.",
     "**Open**(단선): 원래 하나로 이어져야 할 net이 중간에 끊어진 것입니다. **Open net** 또는 **Net is not fully connected** 로 나타나며, 신호가 목적지까지 도달하지 못합니다.",
     "정리하면 소자 개수 문제는 **missing/extra device**, 연결 문제는 **incorrect connection/short/open** 입니다. 리포트를 읽을 때 '개수 이야기인가, 연결 이야기인가'부터 구분하면 원인 파악이 빨라집니다."
    ]
   },
   {
    "type": "read",
    "title": "화면과 리포트에서 오류가 보이는 방식",
    "intro": "LVS 결과는 텍스트 리포트와 GUI 하이라이트, 두 가지 형태로 함께 제공됩니다.",
    "paras": [
     "리포트 최상단에는 항상 총평이 한 줄로 뜹니다. **LVS PASSED / LVS FAILED**, 또는 **Layout matches schematic / Layout does NOT match schematic**. 이 한 줄로 통과 여부를 즉시 판단합니다.",
     "그 아래 **Summary**(요약) 표에는 유형별 개수가 나옵니다. 예: **Unmatched devices: 2**, **Unmatched nets: 1**, **Property errors: 0**. **Unmatched** 는 '짝을 못 찾은' 이라는 뜻으로 mismatch의 구체적 표현입니다.",
     "GUI에서는 문제 지점을 색으로 강조합니다. **Highlight errors** 버튼을 누르면 short난 net이 빨간색, open난 net이 노란색으로 레이아웃 위에 표시됩니다. 화면 안내문 **Click an error to zoom to location** 을 따라가면 됩니다.",
     "각 오류에는 위치 정보가 붙습니다. **at (X, Y)** 좌표나 **on net CLK**, **device M12** 처럼 어느 소자·어느 선인지 지목합니다. 이 식별자를 설계자에게 그대로 전달하면 소통이 정확해집니다.",
     "마지막으로 **Cross-probing**(크로스 프로빙) 기능은 리포트의 오류를 클릭하면 schematic과 layout에서 같은 지점을 동시에 띄워줍니다. 안내문 **Select in schematic and layout** 를 이해하면 원인을 눈으로 대조할 수 있습니다."
    ]
   },
   {
    "type": "acr",
    "title": "약어",
    "intro": "LVS 검증 화면과 리포트에서 반복되는 핵심 약어입니다.",
    "items": [
     {
      "ab": "LVS",
      "full": "Layout Versus Schematic",
      "ko": "레이아웃과 회로도 비교 검증"
     },
     {
      "ab": "DRC",
      "full": "Design Rule Check",
      "ko": "설계 규칙 검사 (LVS와 함께 도는 검증)"
     },
     {
      "ab": "ERC",
      "full": "Electrical Rule Check",
      "ko": "전기 규칙 검사 (short/open 등 전기 오류 점검)"
     },
     {
      "ab": "PEX",
      "full": "Parasitic Extraction",
      "ko": "기생 성분 추출 (LVS 후속 단계)"
     },
     {
      "ab": "VDD",
      "full": "Voltage Drain-Drain",
      "ko": "양(+) 전원 전압 노드"
     },
     {
      "ab": "VSS",
      "full": "Voltage Source-Source",
      "ko": "접지(0V) 노드"
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (1) — 비교의 대상",
    "intro": "무엇과 무엇을 비교하는지, 그 재료가 되는 용어들입니다.",
    "items": [
     {
      "en": "netlist",
      "ko": "넷리스트",
      "d": "소자와 연결 관계를 글자로 적은 목록",
      "ex": "The tool converts the layout into a netlist before comparison."
     },
     {
      "en": "schematic",
      "ko": "회로도",
      "d": "설계자가 의도한 회로의 원본 도면",
      "ex": "This device exists in the schematic but not in the layout."
     },
     {
      "en": "layout",
      "ko": "레이아웃",
      "d": "실제 마스크로 그려진 물리적 배치",
      "ex": "LVS extracts a netlist from the layout automatically."
     },
     {
      "en": "device",
      "ko": "소자",
      "d": "트랜지스터·저항 등 회로의 개별 부품",
      "ex": "Two devices could not be matched between the two netlists."
     },
     {
      "en": "net",
      "ko": "노드/배선",
      "d": "전기적으로 같은 하나의 연결선",
      "ex": "The signal net CLK is not fully connected."
     },
     {
      "en": "connectivity",
      "ko": "연결 관계",
      "d": "소자들이 어떤 선으로 이어져 있는가",
      "ex": "LVS checks connectivity, not the shape of the wires."
     }
    ]
   },
   {
    "type": "eda",
    "title": "설계 프로그램 화면 — LVS 비교",
    "app": "LVS Studio",
    "doc": "chip_top",
    "run": "Run",
    "canvas": "lvs",
    "left": {
     "title": "Nets",
     "items": [
      {
       "name": "matched 1044",
       "color": "#2f7d5b"
      },
      {
       "name": "MISMATCH 1",
       "color": "#e05a4a"
      }
     ]
    },
    "log": [
     "> run LVS: layout vs schematic",
     "> nets matched: 1044",
     "> MISMATCH: 1 net",
     "> result: NOT equivalent"
    ],
    "status": "Devices: 512   Nets: 1045   Mismatch: 1",
    "gloss": [
     [
      "LVS",
      "레이아웃-회로도 비교"
     ],
     [
      "Netlist",
      "넷리스트(연결표)"
     ],
     [
      "matched",
      "일치"
     ],
     [
      "mismatch",
      "불일치"
     ],
     [
      "equivalent",
      "동등(일치)"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (1)",
    "intro": "리포트 문장의 의미를 해석해 보세요.",
    "questions": [
     {
      "prompt": "리포트에 'Device in schematic but not in layout' 이 뜨면 무슨 뜻인가?",
      "opts": [
       "회로도에는 있으나 레이아웃에 그려지지 않은 누락 소자(missing device)",
       "레이아웃에 잘못 추가된 잉여 소자(extra device)",
       "두 배선이 붙어버린 단락(short)"
      ],
      "ans": 0
     },
     {
      "prompt": "'LVS checks connectivity' 에서 connectivity가 의미하는 것은?",
      "opts": [
       "도형의 모양과 크기",
       "소자들이 어떤 선으로 연결되어 있는가",
       "칩의 소비 전력"
      ],
      "ans": 1
     },
     {
      "prompt": "화면에 'Extracting devices...' 로그가 흐른다. 지금 진행 중인 작업은?",
      "opts": [
       "레이아웃에서 소자를 뽑아 넷리스트를 만드는 중",
       "회로도를 인쇄하는 중",
       "전원을 차단하는 중"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (2) — 결과와 판정",
    "intro": "비교 결과가 어떻게 표현되는지에 관한 용어들입니다.",
    "items": [
     {
      "en": "match",
      "ko": "일치",
      "d": "두 넷리스트가 전기적으로 동일함",
      "ex": "The layout matches the schematic. LVS passed."
     },
     {
      "en": "mismatch",
      "ko": "불일치",
      "d": "두 넷리스트가 어딘가 다름",
      "ex": "A net mismatch was found on the output node."
     },
     {
      "en": "unmatched",
      "ko": "짝을 못 찾음",
      "d": "대응되는 상대를 찾지 못한 소자/노드",
      "ex": "There are 2 unmatched devices in the summary."
     },
     {
      "en": "missing device",
      "ko": "누락 소자",
      "d": "회로도엔 있으나 레이아웃엔 없는 소자",
      "ex": "A missing device means it was not drawn in the layout."
     },
     {
      "en": "extra device",
      "ko": "잉여 소자",
      "d": "레이아웃엔 있으나 회로도엔 없는 소자",
      "ex": "Please delete the extra device that is not in the schematic."
     }
    ],
    "figs": [
     {
      "kind": "note",
      "title": "TERM",
      "en": "The [layout] must match the [schematic].",
      "ko": "레이아웃과 회로도가 일치해야 한다."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (2)",
    "intro": "판정 관련 영어 표현을 해석해 보세요.",
    "questions": [
     {
      "prompt": "Summary에 'Unmatched nets: 1' 이라고 적혀 있다. 무슨 의미인가?",
      "opts": [
       "모든 배선이 정상 연결되었다",
       "대응되는 짝을 찾지 못한 배선이 1개 있다",
       "배선을 1개 새로 추가해야 한다"
      ],
      "ans": 1
     },
     {
      "prompt": "'The layout matches the schematic' 을 현장 판정으로 옮기면?",
      "opts": [
       "LVS 통과 — 레이아웃과 회로도가 동일함",
       "LVS 실패 — 재작업 필요",
       "검증이 아직 시작되지 않음"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (3) — 연결 오류",
    "intro": "가장 자주 마주치고, 가장 위험한 연결 관련 오류 용어입니다.",
    "items": [
     {
      "en": "short",
      "ko": "단락",
      "d": "떨어져야 할 두 net이 하나로 붙음",
      "ex": "Warning: a short between VDD and VSS was detected."
     },
     {
      "en": "open",
      "ko": "단선",
      "d": "이어져야 할 net이 중간에 끊김",
      "ex": "This net is open; the signal cannot reach the input."
     },
     {
      "en": "incorrect connection",
      "ko": "잘못된 연결",
      "d": "소자가 엉뚱한 net에 연결됨",
      "ex": "The gate is connected to the wrong net."
     },
     {
      "en": "terminal",
      "ko": "단자/핀",
      "d": "소자에서 배선이 붙는 접점",
      "ex": "This terminal is connected to the wrong net."
     },
     {
      "en": "highlight",
      "ko": "강조 표시",
      "d": "오류 지점을 색으로 표시함",
      "ex": "Click Highlight errors to see the short in red."
     },
     {
      "en": "re-run",
      "ko": "재실행",
      "d": "수정 후 검증을 다시 돌림",
      "ex": "Fix the error and re-run LVS until it is clean."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (3)",
    "intro": "연결 오류 문장을 해석해 보세요.",
    "questions": [
     {
      "prompt": "'A short between VDD and VSS was detected' 가 위험한 이유는?",
      "opts": [
       "전원과 접지가 붙어 과전류·소자 파손으로 이어질 수 있어서",
       "단순히 색이 예쁘지 않아서",
       "검증 시간이 길어져서"
      ],
      "ans": 0
     },
     {
      "prompt": "'This net is open' 이 뜻하는 상태는?",
      "opts": [
       "배선이 끊겨 신호가 목적지에 도달하지 못함",
       "배선이 정상적으로 연결됨",
       "배선이 두 개로 붙어버림"
      ],
      "ans": 0
     },
     {
      "prompt": "'The gate is connected to the wrong net' 은 어떤 오류 유형인가?",
      "opts": [
       "incorrect connection (잘못된 연결)",
       "missing device (누락 소자)",
       "extra device (잉여 소자)"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "glossary",
    "title": "핵심 용어 (4) — 진행과 마무리",
    "intro": "검증을 돌리고 마무리하는 단계에서 쓰는 용어들입니다.",
    "items": [
     {
      "en": "run",
      "ko": "실행",
      "d": "검증을 한 번 돌리는 동작",
      "ex": "Click Run to start the LVS comparison."
     },
     {
      "en": "clean",
      "ko": "오류 없음",
      "d": "오류가 하나도 없는 상태",
      "ex": "Re-run until the report is LVS clean."
     },
     {
      "en": "summary",
      "ko": "요약",
      "d": "오류를 유형별로 몰아 보여주는 칸",
      "ex": "Read the summary section of the report first."
     },
     {
      "en": "cross-probing",
      "ko": "크로스 프로빙",
      "d": "리포트-도면을 연동해 같은 지점 표시",
      "ex": "Use cross-probing to find the net in both views."
     },
     {
      "en": "tape out",
      "ko": "최종 제출",
      "d": "설계를 제조 단계로 넘기는 것",
      "ex": "Do not tape out until LVS is clean."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "확인 퀴즈 (4)",
    "intro": "진행·마무리 표현을 해석해 보세요.",
    "questions": [
     {
      "prompt": "'Re-run until the report is LVS clean' 이 지시하는 행동은?",
      "opts": [
       "오류가 0이 될 때까지 수정 후 검증을 반복한다",
       "한 번만 돌리고 끝낸다",
       "리포트를 삭제한다"
      ],
      "ans": 0
     },
     {
      "prompt": "'Do not tape out until LVS is clean' 의 의미는?",
      "opts": [
       "LVS 오류가 남은 채로 제조 단계로 넘기지 말라",
       "LVS를 건너뛰고 바로 제조하라",
       "clean이면 검증을 멈춰라"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "manual",
    "mtitle": "LVS VERIFICATION PROCEDURE",
    "paras": [
     "1. Load both the schematic netlist and the layout view before starting the run.",
     "1. 실행 전에 회로도 넷리스트와 레이아웃 뷰를 모두 불러옵니다.",
     "2. Select Verify > LVS and click Run to begin the comparison.",
     "2. Verify > LVS 메뉴를 선택하고 Run을 눌러 비교를 시작합니다.",
     "3. Wait until the status bar shows LVS PASSED or LVS FAILED.",
     "3. 상태 표시줄에 LVS PASSED 또는 LVS FAILED가 나올 때까지 기다립니다.",
     "4. If the run fails, open the report and read the Summary section first.",
     "4. 실패하면 리포트를 열고 Summary(요약) 항목부터 읽습니다.",
     "NOTE: A device shown 'in schematic but not in layout' is a missing device.",
     "참고: '회로도엔 있으나 레이아웃엔 없음'으로 표시된 소자는 누락 소자입니다.",
     "WARNING: Do NOT tape out the design while any short or open remains unresolved.",
     "경고: short(단락)나 open(단선)이 해결되지 않은 상태로 절대 최종 제출(tape out)하지 마십시오."
    ]
   },
   {
    "type": "manual",
    "mtitle": "READING THE LVS ERROR REPORT",
    "paras": [
     "Summary: Unmatched devices = 2, Unmatched nets = 1, Property errors = 0.",
     "요약: 짝을 못 찾은 소자 2개, 짝을 못 찾은 배선 1개, 속성 오류 0개.",
     "Error 1: Device M12 exists in layout but not in schematic (extra device).",
     "오류 1: 소자 M12가 레이아웃엔 있으나 회로도엔 없음 (잉여 소자).",
     "Error 2: Terminal 'gate' of M7 is connected to net N4; expected net CLK.",
     "오류 2: M7의 게이트 단자가 N4에 연결됨; 원래는 CLK에 연결되어야 함 (잘못된 연결).",
     "Error 3: Net VOUT is open; two segments are not joined.",
     "오류 3: 배선 VOUT가 끊겨 있음; 두 구간이 이어지지 않음 (단선).",
     "Action: Fix each error, then re-run LVS until the report shows LVS clean.",
     "조치: 각 오류를 수정한 뒤, 리포트가 LVS clean으로 나올 때까지 LVS를 다시 실행합니다."
    ]
   },
   {
    "type": "sim",
    "which": "lvs",
    "mode": "netlist",
    "intro": "아래 시뮬레이터에서 schematic 넷리스트와 layout 넷리스트를 나란히 비교해 보세요. 각 소자와 net을 짝지어 가며 어디서 mismatch가 발생하는지 직접 찾아보고, 화면의 영문 판정(LVS PASSED / FAILED)을 소리 내어 읽어 봅니다."
   },
   {
    "type": "sim",
    "which": "lvs",
    "mode": "lvsFix",
    "intro": "이번에는 오류가 포함된 케이스입니다. missing device, short, open 중 어떤 유형인지 영문 오류 메시지를 읽고 분류해 보세요. 오류를 수정한 뒤 다시 실행하여 리포트가 LVS clean으로 바뀌는지 확인합니다."
   },
   {
    "type": "comm",
    "items": [
     {
      "sit": "해외 설계 엔지니어가 LVS 리포트를 함께 검토하며 상황을 확인한다.",
      "q": {
       "en": "The report says two devices are unmatched. Can you tell which side they are on?",
       "ko": "리포트에 소자 2개가 짝을 못 찾았다고 나오네요. 어느 쪽에 있는 건지 알려줄 수 있나요?"
      },
      "a": {
       "en": "One is a missing device in the layout, and the other is an extra device not in the schematic.",
       "ko": "하나는 레이아웃에서 누락된 소자이고, 다른 하나는 회로도에 없는 잉여 소자입니다."
      }
     },
     {
      "sit": "엔지니어가 가장 위험한 오류부터 확인하려 한다.",
      "q": {
       "en": "Is there any short or open in the power nets? That's my top priority.",
       "ko": "전원 배선에 단락이나 단선이 있나요? 그게 제일 급합니다."
      },
      "a": {
       "en": "Yes, there is a short between VDD and VSS. I highlighted it in red on the layout.",
       "ko": "네, VDD와 VSS 사이에 단락이 있습니다. 레이아웃에서 빨간색으로 강조해 두었습니다."
      }
     },
     {
      "sit": "수정 후 재검증 계획을 공유한다.",
      "q": {
       "en": "Okay, please fix the wrong connection first, then re-run and send me the result.",
       "ko": "좋아요, 잘못된 연결부터 고치고 다시 돌린 뒤 결과를 보내주세요."
      },
      "a": {
       "en": "Understood. I will re-run LVS and let you know when the report is clean.",
       "ko": "알겠습니다. LVS를 다시 실행하고 리포트가 clean으로 나오면 알려드리겠습니다."
      }
     }
    ]
   },
   {
    "type": "wrap",
    "title": "정리",
    "points": [
     "**LVS(Layout Versus Schematic)** 는 layout과 schematic을 각각 **netlist**로 뽑아 전기적 동일성을 비교하는 검증이다.",
     "판정은 한 줄로 나온다: **LVS PASSED / Match** 는 통과, **LVS FAILED / Mismatch** 는 재작업.",
     "소자 개수 문제는 **missing device / extra device**, 연결 문제는 **incorrect connection / short / open** 으로 구분해 읽는다.",
     "**short**(VDD-VSS 단락)와 **open**(배선 단선)은 가장 위험하며 해결 전 tape out 금지.",
     "검증 흐름은 **DRC(모양) → LVS(연결) → PEX(성능)** 이며, LVS clean이어야 다음 단계로 간다.",
     "리포트는 **Summary → Error 목록 → 위치(net/device 식별자)** 순으로 읽고, GUI의 **Highlight errors** 로 위치를 확인한다."
    ],
    "done": "이제 영문 LVS 리포트에서 **어떤 오류가 어디서** 났는지 스스로 읽어낼 수 있습니다. **한 줄의 영어를 정확히 읽는 힘**이 현장의 판단력입니다."
   }
  ]
 },
 {
  "id": "w14",
  "title": "종합 현장 보고",
  "slides": [
   {
    "type": "story",
    "icon": "📋",
    "title": "야간 근무 인계, 영어 리포트 한 장",
    "text": "새벽 6시, 야간조가 끝나고 인계 시간이다. 선임이 태블릿에 뜬 영어 **shift report** 한 장을 건네며 말한다. \"이거 3분 안에 읽고, 라인 상태 요약해서 주간조 반장한테 구두로 보고해줘.\" 화면에는 이런 문장이 있다. **Problem:** Chamber A pressure spiked to 12 mTorr during etch step 3. **Cause:** APC throttle valve stuck at 40%. **Action:** Aborted lot, switched to Chamber B, notified equipment engineer. **Result:** Lot recovered, chamber A placed **DOWN** pending PM. 당신이 할 일은 영작이 아니다. 이 **problem–cause–action–result** 4단 구조를 정확히 읽어내고, '지금 A 챔버는 정지 상태, B로 우회, 로트는 살렸다'를 한 문장으로 요약·판단하는 것이다. 오늘은 장비부터 디자인 검증까지 현장 전체를 아우르는 영어 보고문을 읽고, 무슨 일이 일어났고 지금 무엇을 해야 하는지 판단하는 훈련을 한다.",
    "art": "passdown"
   },
   {
    "type": "scene",
    "title": "오늘의 현장 · 상황 설정",
    "where": "야간 근무 종료. 인수인계(passdown) 데스크.",
    "tool": "인수인계 로그와 영어 리포트 한 장.",
    "situation": "다음 조에게 오늘 있었던 일을 영어로 넘겨야 한다.",
    "meet": [
     "PASSDOWN LOG",
     "약어 WO · OOS · ETA",
     "인계 문장 hand over",
     "SIGN OFF"
    ],
    "goal": "장비 이상→식각→DRC→보고까지 한 흐름을 영어로 정리·인계하기.",
    "bg": "w14"
   },
   {
    "type": "read",
    "title": "현장 보고의 뼈대: Problem–Cause–Action–Result",
    "intro": "영어 현장 보고문은 대부분 4단 구조를 따른다. 이 순서를 알면 낯선 문장도 '어디를 읽어야 할지' 바로 잡힌다.",
    "paras": [
     "**Problem (문제)**: 무엇이 잘못됐는지. 보통 **abnormal**, **spiked**, **failed**, **out of spec**, **alarm triggered** 같은 단어가 신호다. 예: *Wafer scratch detected on lot #A231.* '무엇이/어디서/얼마나'를 먼저 잡는다.",
     "**Cause (원인)**: 왜 그 문제가 생겼는지. **due to**, **caused by**, **root cause**, **traced to** 뒤에 원인이 온다. 예: *Root cause traced to worn robot arm gripper.* 원인이 '확정(confirmed)'인지 '추정(suspected)'인지 단어로 구분해야 한다.",
     "**Action (조치)**: 실제로 무엇을 했는지. 과거형 동사가 줄줄이 온다 — **aborted**, **replaced**, **notified**, **rebooted**, **isolated**. 예: *Replaced gripper and re-qualified the tool.* 조치가 '임시(temporary fix)'인지 '영구(permanent)'인지가 핵심.",
     "**Result (결과)**: 조치 후 상태. **recovered**, **back to normal**, **still down**, **pending PM** 등. 예: *Tool back UP, monitoring for 24h.* 결과 문장이 곧 '지금 현재 상태'이므로, 구두 보고에서 가장 먼저 말해야 할 정보다.",
     "이 4단은 화면 **HMI** 이벤트 로그, 종이 **work instruction**, 이메일 **8D report** 어디서나 반복된다. 순서가 뒤섞여 있어도 각 문장을 P/C/A/R 중 어디에 속하는지 분류하며 읽으면 요약이 쉬워진다."
    ]
   },
   {
    "type": "read",
    "title": "상태·심각도를 나타내는 영어 신호어",
    "intro": "보고문에서 '지금 얼마나 심각한가'는 몇 개의 정해진 단어로 표현된다. 이 단어들의 강도 차이를 읽어야 올바르게 판단한다.",
    "paras": [
     "장비 상태는 세 단계로 압축된다. **UP** (정상 가동 가능), **DOWN** (정지, 생산 불가), **IDLE** (가동 가능하지만 대기 중). 보고문에서 *Tool is DOWN*을 보면 '생산 중단'이라는 뜻이며 즉시 위로 전달해야 한다.",
     "심각도(severity)는 보통 **Critical > Major > Minor** 순. **Critical**은 라인 정지·안전 위험, **Minor**는 모니터링만 하면 되는 수준. *Minor alarm, no action required*와 *Critical fault, line stopped*는 대응 자체가 다르다.",
     "조치의 성격을 구분하는 짝: **temporary fix / workaround** (임시 우회) vs **permanent fix / root-cause fix** (근본 해결). *Applied a temporary workaround*라고 쓰여 있으면 '문제가 아직 남아 있다'는 뜻으로 읽어야 한다.",
     "후속 필요를 알리는 표현: **pending** (~대기 중), **follow-up required**, **needs PM**, **escalated to engineer**. *Pending PM*은 '예방정비 전까지는 못 돌린다'는 강한 제약이다.",
     "확실성의 정도: **confirmed** (확인됨) / **suspected**, **likely** (추정) / **under investigation** (조사 중). 원인이 **suspected**면 아직 확정이 아니므로 '원인 미상' 취지로 보고해야 정확하다.",
     "이 신호어들은 HMI 상단 배너, 알람 팝업, 리포트 헤더에 색상(빨강=Critical)과 함께 뜨는 경우가 많다. 단어와 색을 함께 읽으면 오판을 줄인다."
    ]
   },
   {
    "type": "read",
    "title": "장비·공정·디자인을 아우르는 종합 보고",
    "intro": "종합 현장 보고는 장비 고장 하나만 다루지 않는다. 공정 이상, 검사 결과, 심지어 디자인 규칙 위반까지 같은 틀로 묶인다.",
    "paras": [
     "장비 측(equipment): 알람, 인터록, 밸브·로봇 고장 등이 **Problem**이 되고, 부품 교체·챔버 전환이 **Action**이 된다. HMI 로그가 1차 근거다.",
     "공정 측(process): SPC 관리도 이탈, 두께 드리프트, 파티클 급증(**particle excursion**) 등이 Problem으로 잡히며, 보통 **yield loss**(수율 손실)와 연결된다.",
     "검사·디자인 측(design/inspection): **DRC**(Design Rule Check) 위반, 레이아웃 간격 오류, 마스크 결함 등이 보고된다. 이때도 '위반 내용–원인–수정–재검증 결과'로 서술된다.",
     "세 측 모두 결국 같은 **P–C–A–R** 구조이므로, 분야가 바뀜어도 읽는 방법은 동일하다. 단어만 분야별로 다를 뿐이다.",
     "또한 각 보고에는 **impact**(영향 범위: 몇 로트, 몇 장)와 **follow-up owner**(후속 담당: 장비/공정/설계 엔지니어)가 명시된다. 구두 보고 시 이 둘을 빼면 반드시 되묻는다."
    ]
   },
   {
    "type": "read",
    "title": "교대 인수인계 로그 — 짧게 끊어 쓴 과거형",
    "intro": "보고의 실제 형태는 매끈한 문장이 아니라 '인수인계 로그(passdown)'다. 주어를 빼고 과거형으로 짧게 끊는다.",
    "paras": [
     "실제 passdown 예: **Found leak on Chamber B, replaced O-ring, tool back up.** (B챔버 누설 발견 → O-링 교체 → 장비 재가동). 'I found... and then I replaced...'로 풀어 쓰지 않는다.",
     "아직 안 끝난 일은 이렇게: **Etcher 3 still down, waiting on the part, escalated to the vendor.** (3호기 여전히 정지, 부품 대기 중, 벤더에 에스컬레이션).",
     "자주 쓰는 **덩어리 표현(청크)**: **tool is down / back up**(장비 정지/재가동), **waiting on the part**(부품 대기), **out of spec**(규격 이탈), **no trouble found (NTF)**(이상 없음), **placed down pending PM**(PM까지 정지 처리).",
     "읽을 때는 **[무엇을 발견 → 무엇을 조치 → 지금 상태]** 세 조각으로 끊는다. 이 순서가 곧 problem–action–status 다.",
     "핵심: passdown은 '잘 쓴 영어'가 목표가 아니라 **다음 근무자가 3초 안에 상태를 파악**하게 하는 것. 그래서 짧고 딱딱하다. 그 형태를 읽어내는 게 이 챕터의 실전 능력이다."
    ],
    "figs": [
     {
      "kind": "sticker",
      "level": "info",
      "en": "END OF SHIFT — SIGN OFF",
      "ko": "교대 종료 — 확인 서명"
     }
    ]
   },
   {
    "type": "acr",
    "title": "약어",
    "intro": "현장 보고문과 화면에서 반복적으로 마주치는 핵심 약어. 뜻을 모르면 문장 전체를 오해한다.",
    "items": [
     {
      "ab": "PM",
      "full": "Preventive Maintenance",
      "ko": "예방정비. 고장 전에 계획적으로 하는 정비. 'pending PM'=정비 대기."
     },
     {
      "ab": "OOS",
      "full": "Out Of Spec",
      "ko": "규격 이탈. 측정값이 허용 범위를 벗어남."
     },
     {
      "ab": "RCA",
      "full": "Root Cause Analysis",
      "ko": "근본 원인 분석. 재발 방지를 위한 원인 규명."
     },
     {
      "ab": "ECN",
      "full": "Engineering Change Notice",
      "ko": "설계·공정 변경 통지."
     },
     {
      "ab": "DRC",
      "full": "Design Rule Check",
      "ko": "설계 규칙 검사. 레이아웃이 제조 규칙을 지키는지 자동 검증."
     },
     {
      "ab": "SPC",
      "full": "Statistical Process Control",
      "ko": "통계적 공정 관리. 관리도로 공정 이상 감지."
     },
     {
      "ab": "CAPA",
      "full": "Corrective And Preventive Action",
      "ko": "시정 및 예방 조치. 문제 재발 방지 조치."
     },
     {
      "ab": "ETA",
      "full": "Estimated Time of Arrival",
      "ko": "예상 완료/도착 시각. 복구 ETA 등."
     },
     {
      "ab": "WO",
      "full": "Work Order",
      "ko": "작업 지시(서) — 정비·수리 요청 건"
     },
     {
      "ab": "NTF",
      "full": "No Trouble Found",
      "ko": "이상 없음 — 점검했으나 문제 재현 안 됨"
     },
     {
      "ab": "N/G",
      "full": "No Good",
      "ko": "불량 — 판정 실패"
     }
    ]
   },
   {
    "type": "glossary",
    "title": "보고 동사·상태 어휘 (1)",
    "intro": "Action과 Result 문장의 핵심이 되는 동사와 상태 표현. 읽고 뜻을 즉시 떠올릴 수 있어야 한다.",
    "items": [
     {
      "en": "abort",
      "ko": "중단하다",
      "d": "진행 중인 공정·로트를 도중에 강제로 멈춤.",
      "ex": "The operator aborted the lot when the pressure alarm triggered."
     },
     {
      "en": "isolate",
      "ko": "격리하다",
      "d": "문제 장비·구간을 라인에서 분리해 영향 차단.",
      "ex": "We isolated Chamber A to prevent further wafer damage."
     },
     {
      "en": "escalate",
      "ko": "상위 보고하다",
      "d": "현장에서 해결 못 할 때 엔지니어·관리자에게 올림.",
      "ex": "The issue was escalated to the equipment engineer at 3 AM."
     },
     {
      "en": "recover",
      "ko": "복구되다",
      "d": "장비·로트가 정상 상태로 돌아옴.",
      "ex": "The lot recovered after switching to the backup chamber."
     },
     {
      "en": "quarantine",
      "ko": "보류/격리 처리하다",
      "d": "의심 웨이퍼·로트를 사용 보류로 잡아둠.",
      "ex": "All wafers from the affected lot were quarantined for review."
     },
     {
      "en": "downtime",
      "ko": "정지 시간",
      "d": "장비가 생산하지 못한 시간.",
      "ex": "Total downtime for the tool was 2.5 hours."
     }
    ]
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — 인수인계 로그 작성",
    "doc": {
     "name": "Shift Handover Procedure",
     "no": "SHP-14",
     "sec": "2.1",
     "rev": "B",
     "page": "2-1"
    },
    "heading": "2.1  Writing the Passdown Log",
    "steps": [
     "State the tool status (UP / DOWN) and any open [work orders (WO)].",
     {
      "t": "List parts on order with an [ETA].",
      "note": {
       "kind": "note",
       "en": "WO = work order, ETA = estimated time of arrival."
      }
     },
     "Note any chamber that is [OOS] (out of service).",
     "Sign off and hand over to the next shift."
    ],
    "gloss": [
     [
      "passdown",
      "인수인계"
     ],
     [
      "work order (WO)",
      "작업 지시"
     ],
     [
      "ETA",
      "도착 예정"
     ],
     [
      "OOS",
      "사용 불가"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "읽고 판단하기 (1)",
    "intro": "보고 문장의 뜻을 정확히 해석하세요. 영작이 아니라 '무슨 뜻인가'를 고릅니다.",
    "questions": [
     {
      "prompt": "보고문에 'Tool is DOWN, pending PM'이라고 적혀 있다. 무슨 뜻인가?",
      "opts": [
       "장비는 정상 가동 중이며 정비가 필요 없다",
       "장비가 정지 상태이고 예방정비 전까지는 돌릴 수 없다",
       "장비가 대기 상태이며 곧 자동 복구된다"
      ],
      "ans": 1
     },
     {
      "prompt": "'Root cause traced to a worn robot gripper'에서 원인의 성격은?",
      "opts": [
       "원인이 아직 조사 중이라 확정되지 않았다",
       "원인이 마모된 로봇 그리퍼로 확인·확정되었다",
       "원인이 소프트웨어 오류로 추정된다"
      ],
      "ans": 1
     },
     {
      "prompt": "'Applied a temporary workaround'라고 되어 있으면 어떻게 판단해야 하나?",
      "opts": [
       "근본 문제가 완전히 해결되었다",
       "문제가 아직 남아 있고 임시로 우회했을 뿐이다",
       "장비를 폐기하기로 결정했다"
      ],
      "ans": 1
     }
    ]
   },
   {
    "type": "glossary",
    "title": "보고 동사·상태 어휘 (2)",
    "intro": "Problem과 Cause 문장에서 자주 나오는 표현. 이상 현상과 원인을 나타내는 말들이다.",
    "items": [
     {
      "en": "spike",
      "ko": "급등(하다)",
      "d": "값이 짧은 시간에 비정상적으로 치솟음.",
      "ex": "The chamber pressure spiked to 12 mTorr during the etch step."
     },
     {
      "en": "drift",
      "ko": "서서히 변동하다",
      "d": "값이 천천히 규격에서 벗어나는 경향.",
      "ex": "The film thickness slowly drifted out of spec over three lots."
     },
     {
      "en": "trigger",
      "ko": "발동시키다",
      "d": "알람·인터록을 작동하게 만듦.",
      "ex": "A door-open condition triggered the safety interlock."
     },
     {
      "en": "interlock",
      "ko": "인터록(안전 연동)",
      "d": "안전 조건이 안 맞으면 동작을 막는 잠금 장치.",
      "ex": "The interlock prevented the tool from starting with the lid open."
     },
     {
      "en": "defect",
      "ko": "결함",
      "d": "웨이퍼·패턴의 불량 지점.",
      "ex": "Inline inspection found 14 defects on the wafer surface."
     },
     {
      "en": "yield loss",
      "ko": "수율 손실",
      "d": "불량으로 인해 정상 칩 비율이 떨어짐.",
      "ex": "The particle excursion caused a 3% yield loss on that lot."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "읽고 판단하기 (2)",
    "intro": "다음 영어 표현이 현장에서 뜻하는 바를 고르세요.",
    "questions": [
     {
      "prompt": "'The film thickness drifted out of spec over three lots.' 어떤 상황인가?",
      "opts": [
       "두께가 한 번에 급등해 즉시 알람이 울렸다",
       "두께가 세 로트에 걸쳐 서서히 규격을 벗어났다",
       "두께가 항상 규격 안에서 안정적이었다"
      ],
      "ans": 1
     },
     {
      "prompt": "'A door-open condition triggered the safety interlock.'의 의미는?",
      "opts": [
       "문이 열린 상태가 안전 잠금을 작동시켜 동작을 막았다",
       "안전 잠금을 해제하기 위해 일부러 문을 열었다",
       "문이 닫혀 있어서 알람이 꺼졌다"
      ],
      "ans": 0
     },
     {
      "prompt": "구두 보고 시, Result 문장 'Lot recovered, tool back UP, monitoring 24h'에서 반장에게 가장 먼저 전할 핵심은?",
      "opts": [
       "로트는 살았고 장비는 다시 정상 가동, 24시간 모니터링 중",
       "장비를 폐기하고 로트를 스크랩했다",
       "원인 조사를 아직 시작하지 못했다"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "glossary",
    "title": "보고서 구조·화면 어휘 (3)",
    "intro": "보고서의 틀과 HMI 화면에서 직접 마주치는 표현. 구조를 알면 어느 칸을 읽어야 할지 바로 보인다.",
    "items": [
     {
      "en": "handover",
      "ko": "인계/인수인계",
      "d": "교대 시 이전 조가 다음 조에게 상황을 넘김.",
      "ex": "Please read the handover notes before you start your shift."
     },
     {
      "en": "impact",
      "ko": "영향 범위",
      "d": "문제가 몇 로트·몇 장에 영향을 줍는지.",
      "ex": "Impact: two lots affected, about 50 wafers on hold."
     },
     {
      "en": "status",
      "ko": "상태",
      "d": "지금 장비·로트가 어떤 상태인지.",
      "ex": "Current status: Chamber A DOWN, Chamber B running normally."
     },
     {
      "en": "follow-up",
      "ko": "후속 조치",
      "d": "이후에 누가 무엇을 더 해야 하는지.",
      "ex": "Follow-up: equipment engineer to complete PM by 12:00."
     },
     {
      "en": "on hold",
      "ko": "보류 중",
      "d": "진행을 멈추고 대기시켜 둔 상태.",
      "ex": "The lot is on hold until the inspection result comes back."
     },
     {
      "en": "acknowledge",
      "ko": "(알람을) 확인하다",
      "d": "HMI에서 알람을 읽었다고 확인 처리함.",
      "ex": "The operator must acknowledge the alarm before resuming the run."
     }
    ],
    "figs": [
     {
      "kind": "log",
      "title": "PASSDOWN LOG",
      "lines": [
       "TOOL 3 — [DOWN], WO#4471",
       "Waiting on parts, [ETA] tomorrow",
       "CH-A OK · CH-B [OOS]"
      ],
      "cap": "교대 인수인계 로그 — 다음 조가 이걸 읽고 일한다."
     },
     {
      "kind": "note",
      "title": "SHIFT REPORT",
      "en": "Please [hand over] Tool 3 to the day shift.",
      "ko": "3호기를 주간조에 인계 바람."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "읽고 판단하기 (3)",
    "intro": "보고서 항목과 화면 메시지를 올바르게 해석하세요.",
    "questions": [
     {
      "prompt": "보고서에 'Impact: two lots affected, ~50 wafers on hold'이 있다. 무슨 뜻인가?",
      "opts": [
       "두 로트, 약 50장이 영향을 받아 보류 중이다",
       "두 로트가 이미 폐기되었다",
       "50장이 모두 정상 출하되었다"
      ],
      "ans": 0
     },
     {
      "prompt": "HMI에 'Acknowledge alarm before resuming'이라고 뜨면 작업자는?",
      "opts": [
       "알람을 무시하고 바로 재가동한다",
       "재가동 전에 알람을 확인 처리해야 한다",
       "장비를 꿄야 한다"
      ],
      "ans": 1
     },
     {
      "prompt": "'Follow-up: equipment engineer to complete PM by 12:00'의 뜻은?",
      "opts": [
       "12시까지 장비 엔지니어가 예방정비를 끝내야 한다",
       "12시에 생산을 중단해야 한다",
       "예방정비가 이미 끝났다"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "glossary",
    "title": "설계·검증(DRC) 관련 어휘 (4)",
    "intro": "디자인 룰 체크와 검증 화면에서 나오는 영어. 장비가 아닌 '설계' 상황 보고도 같은 구조로 읽는다.",
    "items": [
     {
      "en": "violation",
      "ko": "규칙 위반",
      "d": "레이아웃이 제조 규칙(design rule)을 어긴 지점.",
      "ex": "The DRC report shows 8 spacing violations in the layout."
     },
     {
      "en": "spacing",
      "ko": "간격",
      "d": "패턴 사이의 최소 거리 규칙.",
      "ex": "Minimum metal spacing must be at least 0.10 um."
     },
     {
      "en": "clean (DRC clean)",
      "ko": "위반 없음",
      "d": "검사 결과 오류가 하나도 없는 상태.",
      "ex": "After the fix, the layout came back DRC clean."
     },
     {
      "en": "waive",
      "ko": "예외 처리하다",
      "d": "검토 후 특정 위반을 의도된 것으로 인정해 넘김.",
      "ex": "The two known violations were waived with reviewer approval."
     },
     {
      "en": "layer",
      "ko": "레이어(층)",
      "d": "마스크/공정 단계별 설계 층.",
      "ex": "The violation is on the metal-1 layer, not poly."
     },
     {
      "en": "re-run",
      "ko": "재실행",
      "d": "수정 후 검사를 다시 돌림.",
      "ex": "Please re-run the DRC after applying the spacing fix."
     }
    ]
   },
   {
    "type": "quiz",
    "title": "읽고 판단하기 (4)",
    "intro": "DRC·검증 화면의 영어 메시지를 올바르게 해석하세요.",
    "questions": [
     {
      "prompt": "'The layout came back DRC clean.'의 뜻은?",
      "opts": [
       "검사 결과 위반이 하나도 없다",
       "검사에서 위반이 8개 나왔다",
       "레이아웃을 지워야 한다"
      ],
      "ans": 0
     },
     {
      "prompt": "'The two known violations were waived with reviewer approval.' 어떻게 읽나?",
      "opts": [
       "두 위반이 심각해서 작업이 중단됐다",
       "알려진 두 위반은 검토자 승인으로 예외 처리됐다",
       "두 위반이 자동으로 수정됐다"
      ],
      "ans": 1
     },
     {
      "prompt": "검증 보고서에 'Please re-run the DRC after applying the spacing fix'라고 있다. 다음 할 일은?",
      "opts": [
       "간격 수정을 적용한 뒤 DRC를 다시 돌린다",
       "수정 없이 그대로 출하한다",
       "간격을 더 줄인다"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "manual",
    "mtitle": "SHIFT HANDOVER REPORT — READING GUIDE",
    "paras": [
     "PROBLEM: During night shift, Chamber A chamber pressure spiked above 10 mTorr and the process alarm triggered on etch step 3.",
     "문제: 야간조 중 A 챔버 압력이 10 mTorr를 초과해 급등했고, 식각 3단계에서 공정 알람이 발동했다.",
     "CAUSE: Root cause traced to the APC throttle valve stuck at 40% open. Confirmed by valve position log.",
     "원인: 근본 원인은 APC 스로틀 밸브가 40% 개방 상태로 고착된 것으로, 밸브 위치 로그로 확인됨(추정이 아닌 확정).",
     "ACTION: Aborted the running lot, isolated Chamber A, rerouted the lot to Chamber B, and escalated to the equipment engineer.",
     "조치: 진행 로트 중단, A 챔버 격리, 로트를 B 챔버로 우회, 장비 엔지니어에게 상위 보고함.",
     "RESULT: Lot recovered with no wafer loss. Chamber A placed DOWN, pending PM. ETA to recovery: 6 hours.",
     "결과: 로트는 웨이퍼 손실 없이 복구됨. A 챔버는 DOWN 상태로 예방정비 대기, 복구 예상 6시간."
    ]
   },
   {
    "type": "manual",
    "mtitle": "WORK INSTRUCTION — WHEN YOU RECEIVE A DOWN REPORT",
    "paras": [
     "NOTE: A tool marked DOWN must not be run until an engineer clears it, even if the alarm has cleared on the HMI.",
     "주의: DOWN으로 표시된 장비는 HMI에서 알람이 사라졌더라도 엔지니어가 해제(clear)하기 전까지 가동하면 안 된다.",
     "Verify the current tool state on the HMI status banner before reporting to the next shift.",
     "다음 조에 보고하기 전에 HMI 상태 배너에서 현재 장비 상태를 반드시 확인한다.",
     "If the report says 'temporary workaround applied', treat the tool as still at risk and inform the incoming operator.",
     "보고문에 'temporary workaround applied'라고 있으면 장비가 여전히 위험 상태라고 보고 다음 작업자에게 알린다.",
     "WARNING: Do NOT release any quarantined lot back to production without written engineering approval.",
     "경고: 보류(quarantine) 처리된 로트는 서면 엔지니어링 승인 없이 절대 생산으로 되돌리지 않는다."
    ]
   },
   {
    "type": "manual",
    "mtitle": "NIGHT SHIFT PASSDOWN LOG (raw)",
    "paras": [
     "EQP-204 (Etcher 3): Unscheduled down at 02:10. RF fault, reflected power high. NTF after re-tune. Tool back up 03:05. Watch reflected power.",
     "EQP-204(3호기): 02:10 비계획 정지. RF 고장, 반사파 높음. 재매칭 후 이상 없음(NTF). 03:05 재가동. 반사파 계속 주시할 것.",
     "EQP-118 (CVD B): Chamber pressure out of spec during lot 7. Aborted lot, switched to Chamber A. Placed down pending PM.",
     "EQP-118(CVD B): 로트 7 중 챔버 압력 규격 이탈(OOS). 로트 중단, A챔버로 우회. PM까지 정지 처리.",
     "Open items: Etcher 5 waiting on the part (turbo pump), ETA tomorrow AM. WO #4471 still open. Escalated to vendor.",
     "미결 항목: 5호기 부품(터보펌프) 대기, 예상 도착(ETA) 내일 오전. 작업지시(WO) #4471 미결. 벤더 에스컬레이션.",
     "NOTE: Read every line as [what was found] -> [what was done] -> [current status]. Confirm any tool marked 'down' before you start it.",
     "참고: 각 줄을 [발견]->[조치]->[현재 상태]로 끊어 읽을 것. 'down'으로 표시된 장비는 가동 전 반드시 상태를 확인하라."
    ],
    "figs": [
     {
      "kind": "hmi",
      "tool": "EQP-204",
      "status": "DOWN",
      "state": "down",
      "rows": [
       [
        "Shift",
        "NIGHT → DAY"
       ],
       [
        "Open WO",
        "1"
       ]
      ]
     }
    ]
   },
   {
    "type": "quiz",
    "title": "인수인계 로그 읽기 — 판단",
    "intro": "위 passdown 로그 표현을 읽고 뜻을 고르시오.",
    "questions": [
     {
      "prompt": "'Etcher 3 still down, waiting on the part.' 무슨 상태인가?",
      "opts": [
       "3호기 정상 가동 중",
       "3호기 여전히 정지, 부품 기다리는 중",
       "3호기 부품 교체 완료"
      ],
      "ans": 1
     },
     {
      "prompt": "'NTF after re-tune' 의 뜻은?",
      "opts": [
       "재매칭 후에도 고장",
       "재매칭 후 이상 없음(문제 재현 안 됨)",
       "새 부품으로 교체함"
      ],
      "ans": 1
     },
     {
      "prompt": "'Placed down pending PM' 이 뜻하는 것은?",
      "opts": [
       "PM(예방정비)까지 정지 상태로 둠",
       "PM을 취소함",
       "즉시 재가동함"
      ],
      "ans": 0
     },
     {
      "prompt": "passdown 로그를 읽는 올바른 3조각 순서는?",
      "opts": [
       "[발견] -> [조치] -> [현재 상태]",
       "[결론] -> [원인] -> [인사]",
       "[가격] -> [수량] -> [날짜]"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "sim",
    "which": "equipment",
    "mode": "shiftLog",
    "intro": "아래 장비 HMI 화면을 열어보세요. 화면 상단의 상태 배너(UP/DOWN/IDLE)와 알람 로그의 영어 문장을 읽고, 이 장비가 지금 '가동 가능한지'를 판단하는 연습입니다. 특히 Problem·Cause·Action이 로그 어디에 나타나는지 찾아보세요."
   },
   {
    "type": "sim",
    "which": "drc",
    "mode": "triage",
    "intro": "아래 DRC(Design Rule Check) 결과 화면을 살펴보세요. 디자인 검증 단계에서 나오는 영어 위반 메시지(violation)를 읽고, 어떤 것이 Critical이고 어떤 것이 Minor인지, 그리고 보고문의 Problem 항목으로 무엇을 써 넣을지 판단하는 연습입니다. 장비뿐 아니라 설계 검증 상황도 같은 P–C–A–R 구조로 보고됩니다."
   },
   {
    "type": "sim",
    "which": "report",
    "mode": "pcar",
    "intro": "아래 종합 보고서 화면에서 Problem / Cause / Action / Result 4개 칸에 흩어진 영어 문장을 읽고, 각 문장을 올바른 칸으로 분류한 뒤 전체 상황을 한 문장으로 요약해 보세요. 이것이 오늘 배운 것을 실제 구두 보고로 옮기는 마지막 통합 훈련입니다."
   },
   {
    "type": "comm",
    "items": [
     {
      "sit": "새벽에 라인에 온 외국인 장비 엔지니어가 인계 상황을 묻는다.",
      "q": {
       "en": "I just got in. Can you give me a quick summary of what happened on Chamber A tonight?",
       "ko": "방금 도착했어요. 오늘 밤 A 챔버에 무슨 일이 있었는지 짧게 요약해줄래요?"
      },
      "a": {
       "en": "Sure. Pressure spiked on etch step 3, the throttle valve was stuck, we aborted the lot and rerouted it to Chamber B. The lot is fine. Chamber A is DOWN, pending PM.",
       "ko": "네. 식각 3단계에서 압력이 급등했고, 스로틀 밸브가 고착돼서 로트를 중단하고 B 챔버로 우회했어요. 로트는 정상입니다. A 챔버는 DOWN, 정비 대기 상태예요."
      }
     },
     {
      "sit": "엔지니어가 원인이 확정된 것인지 확인하려 한다.",
      "q": {
       "en": "Is the root cause confirmed, or is it still just suspected?",
       "ko": "근본 원인이 확정된 건가요, 아니면 아직 추정인가요?"
      },
      "a": {
       "en": "It's confirmed. The valve position log shows it stuck at 40%. It's in the report under 'Cause'.",
       "ko": "확정입니다. 밸브 위치 로그에 40%로 고착된 게 나와요. 보고서 'Cause' 항목에 적혀 있어요."
      }
     },
     {
      "sit": "엔지니어가 후속 조치와 복구 예상 시간을 묻는다.",
      "q": {
       "en": "Got it. Anything pending on my side, and what's the ETA to bring the tool back up?",
       "ko": "알겠어요. 제가 처리할 미결 사항이 있나요, 그리고 장비 복구 예상 시간은요?"
      },
      "a": {
       "en": "The tool needs PM before it can run again. It was escalated to you at 3 AM, and the report lists an ETA of about six hours.",
       "ko": "장비는 재가동 전에 PM이 필요합니다. 새벽 3시에 엔지니어님께 상위 보고됐고, 보고서상 복구 예상은 약 6시간입니다."
      }
     }
    ]
   },
   {
    "type": "wrap",
    "title": "마무리: 읽고, 분류하고, 한 문장으로",
    "points": [
     "모든 현장 보고는 **Problem – Cause – Action – Result** 4단으로 읽으면 요약이 쉬워진다.",
     "상태어 **UP / DOWN / IDLE**, 심각도 **Critical / Major / Minor**, 확실성 **confirmed / suspected**를 정확히 구분한다.",
     "**temporary workaround**와 **pending PM**은 '문제가 남아 있다'는 강한 신호로 읽는다.",
     "구두 보고는 **Result(현재 상태)**를 가장 먼저 말하고, 이어서 원인·조치·후속을 붙인다.",
     "장비 HMI, DRC 검증, 종합 보고서 모두 같은 P–C–A–R 구조를 공유한다 — 영작이 아니라 정확한 읽기·판단이 핵심이다."
    ],
    "done": "이제 낯선 영어 보고문 한 장을 받아도 **무슨 일이 있었고, 지금 라인이 어떤 상태인지**를 3분 안에 읽고 판단해 구두로 보고할 수 있다. 수고했다!"
   }
  ]
 },
 {
  "id": "w15",
  "title": "종합 점검",
  "kind": "평가",
  "slides": [
   {
    "type": "story",
    "icon": "🎓",
    "title": "종합 점검 안내",
    "text": "장비·공정·디자인 전체를 종합합니다. **로그 · 매뉴얼 · Design Rule · DRC/LVS 오류**를 읽고 답하세요.",
    "art": "finalcheck"
   },
   {
    "type": "scene",
    "title": "오늘의 현장 · 상황 설정",
    "where": "전 과정을 마친 종합 점검.",
    "tool": "장비 + 설계 전 영역의 화면·리포트.",
    "situation": "마지막으로 읽고·판단하고·영어로 보고한다.",
    "meet": [
     "장비 + 설계 종합",
     "최종 체크리스트",
     "DRC / LVS CLEAN"
    ],
    "goal": "배운 모든 현장 영어를 실제 흐름에서 통합 적용하기.",
    "bg": "w15"
   },
   {
    "type": "mansample",
    "title": "매뉴얼 표본 — 영어 현장 보고서",
    "doc": {
     "name": "Field Report Template",
     "no": "FRT-15",
     "sec": "1.0",
     "rev": "A",
     "page": "1-1"
    },
    "heading": "1.0  Writing an English Field Report",
    "steps": [
     "Describe the equipment [issue] (what the HMI/alarm showed).",
     "State the process result (e.g., etch abnormal, out of spec).",
     "Report the design check (DRC / LVS clean or not).",
     "Give the [action taken] and the current status."
    ],
    "callout": {
     "kind": "note",
     "en": "Read → judge → report: the whole loop in English."
    },
    "gloss": [
     [
      "issue",
      "문제"
     ],
     [
      "abnormal",
      "비정상"
     ],
     [
      "action taken",
      "조치 사항"
     ],
     [
      "status",
      "상태"
     ]
    ]
   },
   {
    "type": "quiz",
    "title": "① 장비·운전·알람 종합",
    "intro": "전반부 내용을 확인합니다.",
    "questions": [
     {
      "prompt": "“Ignite the plasma.” 의 뜻은?",
      "opts": [
       "플라즈마를 점화하라",
       "가스를 잠가라",
       "챔버를 열어라"
      ],
      "ans": 0
     },
     {
      "prompt": "“reflected power” 는 무엇인가?",
      "opts": [
       "매칭 불량으로 되돌아오는 RF 전력",
       "공급되는 전력",
       "챔버 온도"
      ],
      "ans": 0
     },
     {
      "prompt": "“Replace the pump oil.” 는 어떤 활동인가?",
      "opts": [
       "유지보수(PM)",
       "운전",
       "설계"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "quiz",
    "title": "② Layer · Design Rule",
    "intro": "디자인 기본 용어를 확인합니다.",
    "questions": [
     {
      "prompt": "Layer “Metal” 은 무엇인가?",
      "opts": [
       "금속 배선",
       "게이트",
       "기판"
      ],
      "ans": 0
     },
     {
      "prompt": "Design Rule 의 “spacing” 은?",
      "opts": [
       "패턴 사이 간격",
       "패턴의 폭",
       "겹침"
      ],
      "ans": 0
     },
     {
      "prompt": "“enclosure” 의 뜻은?",
      "opts": [
       "한 레이어가 다른 레이어를 감싸는 양",
       "최소 폭",
       "누설"
      ],
      "ans": 0
     }
    ],
    "figs": [
     {
      "kind": "hmi",
      "tool": "ALL TOOLS",
      "status": "RUN",
      "state": "run",
      "rows": [
       [
        "Equipment",
        "OK"
       ],
       [
        "Design",
        "DRC/LVS CLEAN",
        "ok"
       ]
      ]
     }
    ]
   },
   {
    "type": "quiz",
    "title": "③ DRC 오류",
    "intro": "영문 DRC 오류를 해석합니다.",
    "questions": [
     {
      "prompt": "DRC = ?",
      "opts": [
       "Design Rule Check",
       "Data Read Check",
       "Device Run Control"
      ],
      "ans": 0
     },
     {
      "prompt": "“METAL1.SPACING violation” 의 뜻은?",
      "opts": [
       "Metal1 간격 규칙 위반",
       "선폭 정상",
       "소자 누락"
      ],
      "ans": 0
     },
     {
      "prompt": "“insufficient spacing” 은?",
      "opts": [
       "간격이 부족하다",
       "간격이 넓다",
       "폭이 크다"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "quiz",
    "title": "④ LVS 검증",
    "intro": "영문 LVS 오류를 해석합니다.",
    "questions": [
     {
      "prompt": "LVS = ?",
      "opts": [
       "Layout Versus Schematic",
       "Low Voltage System",
       "Layer Verify Step"
      ],
      "ans": 0
     },
     {
      "prompt": "“Missing device in the layout.” 는 어떤 오류?",
      "opts": [
       "레이아웃에 소자가 빠짐",
       "간격 위반",
       "진공 이상"
      ],
      "ans": 0
     },
     {
      "prompt": "“incorrect connection” 의 뜻은?",
      "opts": [
       "배선이 회로도와 다름",
       "소자가 중복됨",
       "색이 틀림"
      ],
      "ans": 0
     }
    ]
   },
   {
    "type": "wrap",
    "title": "수료 — 이 과정을 마치며",
    "points": [
     "장비 운전·로그·알람 → 디자인 규칙·DRC·LVS → 종합 보고까지 마쳤다.",
     "이제 현장 영어를 읽고 → 판단하고 → 보고할 수 있다."
    ],
    "done": "🎓 **종합 점검 완료 · 전 과정 수료!**",
    "figs": [
     {
      "kind": "sticker",
      "level": "info",
      "en": "FINAL CHECK — READ · JUDGE · REPORT",
      "ko": "최종 점검 — 읽고·판단하고·보고"
     },
     {
      "kind": "log",
      "title": "FINAL CHECKLIST",
      "lines": [
       "Equipment English   ✓",
       "Design English      ✓",
       "Report in English   ✓"
      ]
     }
    ]
   }
  ]
 }
];
