/* ═══ 현장 실무영어 14강 「종합 현장 보고」 원고 ═══
   1부(장비) 보고 틀(Problem–Cause–Action–Result · 인수인계 로그)은 그대로 두고, 설계(DRC) 부분을 2부 내용으로 바꿨다:
   종합 보고 읽기 한 장 · 약어 DRC → SR · 용어 묶음 (4)와 퀴즈 (4) · DRC 분류 실습 → 인계 항목 분류(report:handover).
   이 파일이 14강의 원본이다. 고친 뒤:  node scripts/content/apply-chapter.mjs w14 */
const CHAPTER = {
 "id": "w14",
 "title": "종합 현장 보고",
 "slides": [
  {
   "type": "story",
   "icon": "📋",
   "title": "야간 근무 인계, 영어 리포트 한 장",
   "text": "새벽 6시, 야간조가 끝나고 인계 시간이다. 선임이 태블릿에 뜬 영어 **shift report** 한 장을 건네며 말한다. \"이거 3분 안에 읽고, 라인 상태 요약해서 주간조 반장한테 구두로 보고해줘.\" 화면에는 이런 문장이 있다. **Problem:** Chamber A pressure spiked to 12 mTorr during etch step 3. **Cause:** APC throttle valve stuck at 40%. **Action:** Aborted lot, switched to Chamber B, notified equipment engineer. **Result:** Lot recovered, chamber A placed **DOWN** pending PM. 당신이 할 일은 영작이 아니다. 이 **problem–cause–action–result** 4단 구조를 정확히 읽어내고, '지금 A 챔버는 정지 상태, B로 우회, 로트는 살렸다'를 한 문장으로 요약·판단하는 것이다. 오늘은 1부의 장비 보고에 2부에서 배운 것 — 안전 경보, 레시피 변경, 트러블슈팅의 확신 표현, 벤더 티켓 — 을 더해, 현장 전체를 아우르는 영어 보고문을 읽고 무슨 일이 일어났고 지금 무엇을 해야 하는지 판단하는 훈련을 한다.",
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
   "goal": "장비 이상 → 원인 확인 → 벤더 요청 → 인계까지 한 흐름을 영어로 정리하기.",
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
   "title": "장비·공정·벤더를 아우르는 종합 보고",
   "intro": "종합 현장 보고는 장비 고장 하나만 다루지 않는다. 안전 경보, 공정 이상, 레시피 변경, 벤더 지원까지 같은 틀로 묶인다.",
   "paras": [
    "장비 측(equipment): 알람, 인터록, 밸브·로봇 고장 등이 **Problem**이 되고, 부품 교체·챔버 전환이 **Action**이 된다. HMI 로그가 1차 근거다.",
    "공정 측(process): SPC 관리도 이탈, 두께 드리프트, 파티클 급증(**particle excursion**) 등이 Problem으로 잡히며, 보통 **yield loss**(수율 손실)와 연결된다.",
    "안전·변경·지원 측(safety/change/vendor): 가스 경보와 LOTO(9강), 레시피 변경 요청과 ECN 승인 대기(10강), 벤더 티켓(**SR**)과 부품 대기(13강)도 보고에 들어간다. 이때도 '무엇이–왜–무엇을 했고–지금 어떤가'로 서술된다.",
    "세 측 모두 결국 같은 **P–C–A–R** 구조이므로, 분야가 바뀌어도 읽는 방법은 동일하다. 단어만 분야별로 다를 뿐이다.",
    "**Cause** 칸에는 12강의 확신 표현을 그대로 쓴다: **confirmed / was found**(확정) · **most likely**(가능성 높음) · **suspected**(의심) · **ruled out**(배제). 확인하지 않은 원인을 확정처럼 쓰면 다음 조가 엉뚱한 부품을 간다.",
    "또한 각 보고에는 **impact**(영향 범위: 몇 로트, 몇 장)와 **follow-up owner**(후속 담당: 장비·공정 엔지니어 또는 벤더)가 명시된다. 구두 보고 시 이 둘을 빼면 반드시 되묻는다."
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
     "ko": "승인된 변경 통지 — 레시피·공정 변경에 붙는 번호(10강)."
    },
    {
     "ab": "SR",
     "full": "Service Request",
     "ko": "서비스 요청 — 벤더 지원 티켓, 번호로 연락을 잇는다(13강)."
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
   "title": "2부를 묶는 보고 어휘 (4) — 확신 · 잠금 · 변경 · 벤더",
   "intro": "9~13강에서 배운 말이 인계 보고에서 어떻게 쓰이는지 모았습니다. 보고문에서 이 말을 보면 \"지금 무엇이 남아 있는가\"를 읽어 내세요.",
   "items": [
    {
     "en": "suspected / confirmed",
     "ko": "의심 / 확정",
     "d": "원인의 확신 정도(12강) — 확정 전에는 조치하지 않는다",
     "ex": "A leak at the lid O-ring is suspected; the helium leak check is in progress."
    },
    {
     "en": "ruled out",
     "ko": "배제된",
     "d": "확인해서 원인이 아님 — 다음 조가 같은 확인을 반복하지 않게",
     "ex": "Gauge error was ruled out: the second gauge reads the same value."
    },
    {
     "en": "locked out",
     "ko": "잠금 걸린",
     "d": "LOTO 중(9강) — 단 사람만 자물쇠를 푼다",
     "ex": "Chamber A is locked out by J. Lee; do not remove the tag."
    },
    {
     "en": "ECN pending",
     "ko": "변경 승인 대기",
     "d": "레시피 변경이 아직 승인 전(10강) — 현재 판 그대로",
     "ex": "ECN-0412 is still pending, so Rev C stays in production."
    },
    {
     "en": "OOC, in spec",
     "ko": "관리 이탈, 규격 안",
     "d": "평소와 달라졌지만 불량은 아님(12강)",
     "ex": "Etch rate went OOC on Rule 2, but all points are within spec."
    },
    {
     "en": "SR open",
     "ko": "벤더 티켓 진행 중",
     "d": "벤더 지원을 기다리는 중(13강) — 번호와 다음 연락 시각을 넘긴다",
     "ex": "SR-20618 is open as S1; the vendor will call back at 07:00 KST."
    }
   ]
  },
  {
   "type": "quiz",
   "title": "읽고 판단하기 (4)",
   "intro": "2부 표현이 들어간 인계 문장을 해석하세요.",
   "questions": [
    {
     "prompt": "인계 로그: 'A leak at the lid O-ring is suspected; the helium leak check is in progress.' 다음 조가 할 일은?",
     "opts": [
      "O-ring 을 바로 교체한다",
      "누설 검사 결과를 확인한 뒤 조치한다",
      "장비를 정상 가동한다"
     ],
     "ans": 1
    },
    {
     "prompt": "'Chamber A is locked out by J. Lee; do not remove the tag.' 이 자물쇠는 누가 풀 수 있나?",
     "opts": [
      "다음 조 작업자 누구나",
      "반장이 대신",
      "자물쇠를 건 J. Lee 본인"
     ],
     "ans": 2
    },
    {
     "prompt": "'Etch rate went OOC on Rule 2, but all points are within spec.' 웨이퍼는?",
     "opts": [
      "불량이 아니다 — 평소와 달라진 신호일 뿐",
      "모두 불량이라 폐기한다",
      "규격 밖이다"
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
   "which": "report",
   "mode": "handover",
   "intro": "이번에는 **인계 항목 분류** 실습입니다. 야간조 인계 로그의 항목을 하나씩 읽고 **Critical**(안전 위험 · 생산 정지 · 규격 이탈 웨이퍼)인지 **Minor**(모니터링 · 대기만 필요)인지 고른 뒤, 보고문 **Problem** 줄로 가장 알맞은 문장을 고르세요. 2부에서 배운 경보 · 레시피 · OOC · 벤더 티켓 표현이 섞여 있습니다."
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
    "2부의 말이 보고에 그대로 들어온다: **suspected / ruled out**(확신), **locked out**(잠금), **ECN pending**(변경 대기), **OOC, in spec**(관리 이탈), **SR open**(벤더 대기).",
    "장비 HMI, 인수인계 로그, 벤더 티켓, 종합 보고서 모두 같은 P–C–A–R 구조를 공유한다 — 영작이 아니라 정확한 읽기·판단이 핵심이다."
   ],
   "done": "이제 낯선 영어 보고문 한 장을 받아도 **무슨 일이 있었고, 지금 라인이 어떤 상태인지**를 3분 안에 읽고 판단해 구두로 보고할 수 있다. 수고했다!"
  }
 ]
};

export default CHAPTER;
