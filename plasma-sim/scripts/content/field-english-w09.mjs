/* ═══ 현장 실무영어 9강 「안전 작업 — LOTO · 독성 가스 · 작업 허가」 원고 ═══
   2부(9~15강, 장비)의 첫 강. 1부(1~8강)가 화면 한 줄·명령문을 '알아보는' 단계였다면,
   2부는 긴 문서(규정문·절차서·SDS·작업 허가서)를 읽고 말하고 쓰는 단계다.
   이 강의 영어 축: 규정문의 조동사 강도(shall / must / should / may / need not).

   이 파일이 9강의 원본이다. 고친 뒤 아래로 데이터 파일에 끼워 넣는다(다른 강은 건드리지 않는다).
     node scripts/content/apply-chapter.mjs w09
   수치 근거(교재 본문에 쓰는 것만):
     - TLV-TWA(ACGIH): Cl2 0.1 ppm · SiH4 5 ppm · AsH3 0.005 ppm · PH3 0.05 ppm · NF3 10 ppm
     - GHS 유해 문구: H250 Catches fire spontaneously if exposed to air · H330 Fatal if inhaled · H270 May cause or intensify fire; oxidiser
     - LOTO 6단계: OSHA 29 CFR 1910.147(d) — preparation · shutdown · isolation · device application · stored energy · verification
     - 조동사: ISO/IEC Directives Part 2 — shall(요구) · should(권고) · may(허용) · can(가능성)
     - 경보 단계(1차 = TLV 50%, 2차 = TLV 100%)는 이 교재 실습의 설정이다 — 사업장마다 다르다. */
const CHAPTER = {
  id: 'w9',
  title: '안전 작업 — LOTO · 가스 · 작업 허가',
  slides: [
    {
      type: 'story',
      icon: '☣️',
      title: '새벽 2시, 작업 허가서 한 장',
      text: '새벽 2시. 민수는 가스 밸브 박스(**VMB**) 앞에서 오늘 받은 **작업 허가서(Permit to Work)** 를 다시 읽는다. 작업은 염소(**Cl2**) 라인의 피팅 교체 — 가스 배관을 여는 **line break** 다. 허가서 한가운데 이런 줄이 있다. "**The line shall be cycle-purged and verified before the line break.**" 옆에 있던 선배가 묻는다. "여기 should 라고 쓰여 있어, shall 이라고 쓰여 있어?" 민수는 대수롭지 않게 답한다. "그게 그거 아닌가요?" 선배는 고개를 젓는다. "should 면 권장이고, shall 이면 안 하면 위반이야." 그때 벽의 가스 감지기 화면이 노랗게 바뀐다. **TGM — Cl2 0.06 ppm — LEVEL 1 WARNING**. 허가서의 다음 줄: "**If any gas alarm activates, work shall stop immediately.**" 민수는 공구를 내려놓는다. 1부에서 우리는 화면 한 줄을 읽었다. 2부부터는 **규정문 한 단어**가 결정을 바꾸는 문서를 읽는다.',
      figs: [
        { kind: 'alarm', level: 'warn', code: 'TGM-03', en: 'Cl2 0.06 ppm — LEVEL 1 WARNING. Stop work and report.', ko: '염소 0.06 ppm — 1차 경보. 작업 중지 후 보고.' },
      ],
    },
    {
      type: 'scene',
      title: '오늘의 현장 · 상황 설정',
      where: '새벽의 가스 구역 — 가스 밸브 박스(VMB) 앞. 벽에는 가스 감지기(TGM) 화면이 있다.',
      tool: '작업 허가서(Permit to Work), 개인 자물쇠와 표찰(LOTO), 가스 감지기 화면, 물질안전보건자료(SDS).',
      situation: '염소 라인을 열기 전, 허가서의 영어 조건을 하나씩 확인해야 한다. 그 사이 감지기에 1차 경보가 뜬다.',
      meet: ['조동사 shall · must · should · may', 'LOTO 6단계', '가스 경보 LEVEL 1 / LEVEL 2', '작업 허가서 PTW · line break', 'SDS 유해 문구 H330'],
      goal: '규정문의 조동사로 "반드시 / 권장 / 해도 됨 / 안 해도 됨"을 가르고, 경보 한 줄로 지금 할 일을 정하기.',
      bg: 'w9',
    },
    {
      type: 'read',
      title: '2부의 시작 — 단어에서 규정문으로',
      intro: '1부(1~8강)는 화면 라벨과 짧은 명령문을 알아보는 연습이었다. 2부는 문장이 길어지고, 문장 안의 작은 단어 하나가 의무인지 권장인지를 가르는 문서를 읽는다.',
      paras: [
        '1부의 영어는 **label(라벨)** 과 **imperative(명령문)** 였다. RF ON, "Close the gate valve." — 무엇을 하라는지만 알면 됐다.',
        '안전 규정·작업 허가서·SDS 같은 문서는 다르다. 같은 동작이라도 앞에 붙은 **조동사(modal verb)** 에 따라 "반드시 해야 한다"가 되기도, "하면 좋다"가 되기도 한다.',
        '예를 들어 "The operator **shall** wear a face shield." 는 의무다. 안 쓰면 규정 위반이다. "The operator **should** wear a face shield." 는 권장이다. 이 차이를 놓치면 지켜야 할 것을 선택 사항으로 읽게 된다.',
        '안전 문서는 대개 장비사가 아니라 **사업장(fab)과 표준(SEMI·OSHA·ISO)** 에서 온다. 그래서 장비 매뉴얼보다 문장이 길고 조건(**if / unless / until / before**)이 많다.',
        '오늘 다룰 세 문서: **LOTO 절차서**(정비 전 에너지 차단), **가스 경보 대응 절차**(감지기가 울렸을 때), **작업 허가서와 SDS**(위험 작업의 조건과 물질의 위험).',
      ],
      figs: [
        { kind: 'note', title: 'PART 2', en: 'Read the [modal verb] first: it tells you whether a step is required.', ko: '조동사부터 읽어라 — 그 단계가 의무인지 알려 준다.' },
      ],
    },
    {
      type: 'read',
      title: 'shall · must · should · may — 조동사의 강도',
      intro: '규정문을 읽을 때 가장 먼저 볼 단어는 동사 앞의 조동사다. 표준 문서(ISO 지침)는 이 단어들의 뜻을 정해 두고 쓴다.',
      paras: [
        '**shall** — 요구사항(requirement). 지키지 않으면 규정 위반이다. 표준·사업장 규정에서 가장 강한 말이다. **shall not** 은 금지다.',
        '**must** — 장비 매뉴얼과 안전 표지에서 shall 과 같은 무게(반드시)로 쓴다. **must not** 은 금지다. (ISO 표준 문서는 must 를 법·물리 같은 외부 제약에만 쓰지만, 현장 매뉴얼에서는 그냥 "반드시"로 읽으면 된다.)',
        '**should** — 권고(recommendation). 하는 것이 좋지만, 정당한 이유가 있으면 다르게 할 수 있다. 의무가 아니다.',
        '**may** — 허용(permission). 해도 된다. 예: "The technician **may** use a torque wrench with a digital readout." 다른 공구를 써도 위반이 아니다.',
        '**need not** — 의무가 아님. "안 해도 된다"이지, "하지 마라"가 아니다. 반대로 **must not** 은 "하지 마라"다. 두 말은 우리말로 옮기면 비슷해 보여 가장 자주 헷갈린다.',
        '**may not** 은 주의한다. "하면 안 된다"(금지)로도, "아닐 수도 있다"(가능성)로도 읽힌다. 그래서 표준은 금지에 may not 대신 **shall not** 을 쓴다. 현장에서 may not 을 만나면 문맥을 확인하고, 애매하면 묻는다.',
      ],
      figs: [
        { kind: 'step', title: 'STRENGTH', items: [['[shall] / [must] — required', '반드시'], ['[should] — recommended', '권장'], ['[may] — permitted', '해도 됨'], ['[need not] — not required', '안 해도 됨']] },
      ],
    },
    {
      type: 'read',
      title: 'LOTO 다시 보기 — 잠그기 전과 잠근 후',
      intro: '7강에서 LOTO(잠금·표찰)를 "정비 전에 거는 것"으로 만났다. 실제 절차서는 여섯 단계이고, 순서가 바뀌면 의미가 없어진다.',
      paras: [
        '**1. Prepare / Notify** — 영향받는 사람에게 장비를 멈춘다고 알린다. "Notify affected personnel before shutdown."',
        '**2. Shut down** — 정상 정지 순서로 멈춘다. 운전 중에 전원부터 끊으면 공정과 장비가 비정상으로 멈춘다.',
        '**3. Isolate** — 에너지원을 하나씩 끊는다. 반도체 장비는 전기만이 아니다: **AC main breaker(주전원)**, **RF generator**, **CDA(압축공기, 공압)**, **process gas(공정 가스)**, **heater(열)**.',
        '**4. Lock & Tag** — 끊은 지점마다 **본인의 자물쇠와 표찰**을 단다. 원칙은 **one person, one lock, one key** — 내 자물쇠의 열쇠는 나만 갖는다.',
        '**5. Release stored energy** — 끊어도 남아 있는 에너지를 뺀다. 공압 라인의 잔압을 빼고(**bleed**), 가스 라인을 퍼지하고(**purge**), 뜨거운 부품은 식힌다.',
        '**6. Verify (try-out)** — 정말 에너지가 없는지 확인한다. 시작 버튼을 눌러 장비가 **움직이지 않는지** 보고, 측정기로 **0 V** 를 확인한다. 이것이 **zero energy state(무에너지 상태)** 다. 확인 전에는 손대지 않는다.',
      ],
      figs: [
        { kind: 'sticker', level: 'danger', en: 'DANGER — LOCKED OUT. DO NOT OPERATE.', ko: '위험 — 잠금 중. 조작 금지.' },
      ],
    },
    {
      type: 'read',
      title: '가스 이름보다 성질을 읽어라 — toxic · pyrophoric · corrosive · oxidizer',
      intro: '가스 캐비닛과 배관 라벨에는 가스 이름과 함께 그 가스의 위험 성질이 영어로 적혀 있다. 대처 방법은 이름이 아니라 성질이 정한다.',
      paras: [
        '**toxic(독성)** — 들이마시면 해롭다. 예: **AsH3(arsine)**, **PH3(phosphine)** — 이온주입에 쓰며 아주 낮은 농도에서도 위험하다.',
        '**pyrophoric(자연발화성)** — 공기와 닿기만 해도 불이 붙는다. 대표가 **SiH4(silane)**. 그래서 SiH4 라인을 열 때는 공기가 닿지 않게 퍼지가 필수다.',
        '**corrosive(부식성)** — 금속과 피부를 상하게 한다. 예: **Cl2**, **HBr** — 식각에 쓴다. 독성도 함께 있다.',
        '**oxidizer(산화성)** — 스스로 타지 않지만 다른 것을 더 잘 타게 한다. 예: **NF3** — 챔버 세정에 쓴다.',
        '농도 단위는 **ppm(백만분율)** 과 **ppb(십억분율)**. **1 ppm = 1,000 ppb**. 아주 독한 가스는 감지기가 ppb 로 표시하기도 하므로, 숫자보다 단위를 먼저 본다.',
        '**TLV(Threshold Limit Value, 노출 기준)** 는 하루 8시간 일해도 대부분의 사람에게 해가 없다고 보는 평균 농도다. 예(ACGIH TLV-TWA): Cl2 **0.1 ppm**, SiH4 **5 ppm**, AsH3 **0.005 ppm**. 숫자가 작을수록 독한 가스다.',
      ],
      figs: [
        { kind: 'hmi', tool: 'GAS CABINET GC-07', status: 'ONLINE', state: 'run', rows: [['GAS', 'SiH4 (silane)'], ['HAZARD', 'PYROPHORIC · FLAMMABLE', 'warn'], ['CYL PRESS', '1,250 psig'], ['EXHAUST', 'OK']] },
      ],
    },
    {
      type: 'read',
      title: '경보 화면 읽기 — LEVEL 1 과 LEVEL 2 는 행동이 다르다',
      intro: '가스 감지기(TGM)는 보통 두 단계로 울린다. 단계마다 해야 할 일이 다르고, 경보 문구가 그 일을 영어 명령문으로 알려 준다.',
      paras: [
        '**LEVEL 1 / WARNING** — 농도가 오르고 있다. 이 교재 실습에서는 **TLV 의 50%** 에 둔다. 할 일: "Stop work, secure the area, and report to the supervisor." — 하던 작업을 멈추고, 그 자리를 안전하게 두고, 보고한다.',
        '**LEVEL 2 / ALARM** — 위험 농도다. 이 교재 실습에서는 **TLV 100%** 에 둔다. 할 일: "Evacuate immediately via the nearest exit." — 즉시 대피한다. 장비를 정리하거나 원인을 보러 가지 않는다.',
        '대피 후의 핵심 문장: "Do not re-enter until the ERT gives the all-clear." — 비상대응팀(**ERT**)이 **all-clear(해제)** 를 줄 때까지 다시 들어가지 않는다.',
        '경보와 함께 장비가 스스로 가스를 끊기도 한다: "Gas cabinet auto shut-off activated." 이건 장비가 한 일이지, 내가 대피하지 않아도 된다는 뜻이 아니다.',
        '경보 단계 값은 **사업장마다 다르다**. 실제 현장에서는 그 사업장 절차서의 숫자를 따른다. 이 강에서 익힐 것은 숫자가 아니라 **"단계 → 행동"** 의 연결이다.',
      ],
      figs: [
        { kind: 'alarm', level: 'danger', code: 'TGM-03', en: 'Cl2 0.12 ppm — LEVEL 2 ALARM. Evacuate immediately.', ko: '염소 0.12 ppm — 2차 경보. 즉시 대피.' },
      ],
    },
    {
      type: 'read',
      title: '작업 허가서(Permit to Work) — 누가, 무엇을, 언제까지',
      intro: '가스 배관을 여는 일(line break), 불꽃이 나는 일(hot work), 좁은 공간에 들어가는 일(confined space)은 허가서 없이 시작할 수 없다. 허가서는 칸마다 정해진 영어를 쓴다.',
      paras: [
        '**Scope of work** — 작업 범위. 예: "Replace the VCR fitting on the Cl2 line at VMB-3." 범위 밖의 일은 허가되지 않은 일이다.',
        '**Hazards / Isolation points** — 위험 요소와 차단 지점. 예: "Cl2 (toxic, corrosive); isolate at VMB-3 valve V2."',
        '**Precautions** — 조건. 여기에 조동사가 몰려 있다. "The line **shall** be cycle-purged ...", "A second person **shall** be present."',
        '**Authorized by / Issued to** — 허가한 사람과 받은 사람. 서명(**sign-off**)이 없으면 시작할 수 없다.',
        '**Valid until** — 유효 기간. 예: "Valid until 06:00 today." 시간을 넘기면 허가서가 만료(**expired**)되어 다시 받아야 한다.',
        '**Cycle purge** — 진공으로 빼고 N2 로 채우기를 여러 번 반복해 배관 속 가스를 없애는 방법. 한 번의 퍼지로는 배관 구석에 남은 가스가 빠지지 않는다.',
      ],
      figs: [
        { kind: 'log', title: 'PERMIT PTW-1182', lines: ['TYPE: [LINE BREAK] — Cl2, VMB-3', 'VALID UNTIL: 06:00', 'STATUS: [ISSUED] — awaiting sign-off'] },
      ],
    },
    {
      type: 'acr',
      title: '약어',
      intro: '안전 절차서·경보 화면·허가서에 반복해서 나오는 약어입니다.',
      items: [
        { ab: 'LOTO', full: 'Lockout / Tagout', ko: '잠금·표찰 — 정비 전 위험 에너지 차단' },
        { ab: 'PTW', full: 'Permit to Work', ko: '작업 허가서 — 위험 작업의 조건·서명' },
        { ab: 'TGM', full: 'Toxic Gas Monitor', ko: '독성 가스 감지기 — 농도 표시·경보' },
        { ab: 'VMB', full: 'Valve Manifold Box', ko: '가스 밸브 박스 — 가스를 장비별로 나눠 보내는 곳' },
        { ab: 'EMO', full: 'Emergency Off', ko: '비상 정지 버튼 — 장비 전원 즉시 차단' },
        { ab: 'SDS', full: 'Safety Data Sheet', ko: '물질안전보건자료 — 화학물질의 위험·조치 16개 항목' },
        { ab: 'TLV', full: 'Threshold Limit Value', ko: '노출 기준 — 하루 8시간 평균 허용 농도' },
        { ab: 'ERT', full: 'Emergency Response Team', ko: '비상대응팀 — 대피 해제(all-clear)를 준다' },
        { ab: 'SCBA', full: 'Self-Contained Breathing Apparatus', ko: '공기호흡기 — 가스 누출 현장 진입용' },
        { ab: 'ppm / ppb', full: 'parts per million / billion', ko: '백만분율 / 십억분율 — 1 ppm = 1,000 ppb' },
      ],
    },
    {
      type: 'glossary',
      title: '핵심 용어 (1) — 조동사 · 규정어',
      intro: '규정문에서 의무의 세기를 정하는 말입니다. 예문을 읽으며 "반드시 / 권장 / 해도 됨 / 안 해도 됨 / 금지" 중 무엇인지 가려 보세요.',
      items: [
        { en: 'shall', ko: '~해야 한다 (요구)', d: '표준·규정의 의무. 안 지키면 위반', ex: 'The operator shall wear chemical-resistant gloves when handling the bubbler.' },
        { en: 'shall not / must not', ko: '~해서는 안 된다 (금지)', d: '금지. 예외 없음', ex: 'Personnel must not enter the gas cabinet area without a buddy.' },
        { en: 'should', ko: '~하는 것이 좋다 (권고)', d: '권장. 정당한 이유가 있으면 달리 할 수 있다', ex: 'Leak checks should be performed at the start of each shift.' },
        { en: 'may', ko: '~해도 된다 (허용)', d: '선택 가능. 하지 않아도 위반 아님', ex: 'The technician may use a digital torque wrench instead of a click type.' },
        { en: 'need not', ko: '~하지 않아도 된다 (의무 아님)', d: '"하지 마라"가 아니다', ex: 'The tool need not be vented for a software-only update.' },
        { en: 'prior to', ko: '~하기 전에', d: 'before 의 문서체. 순서 조건', ex: 'Verify zero energy prior to opening any panel.' },
      ],
      figs: [
        { kind: 'sticker', level: 'warn', en: 'Face shield shall be worn beyond this point.', ko: '이 지점부터 안면 보호구 착용 의무.' },
      ],
    },
    {
      type: 'quiz',
      title: '확인 퀴즈 (1) — 조동사의 강도',
      intro: '규정 문장의 조동사를 보고 그 줄이 무엇을 요구하는지 고르세요.',
      questions: [
        { prompt: "허가서: 'A second person shall be present during the line break.' 이 줄의 뜻은?", opts: ['두 번째 사람이 있으면 좋다', '두 번째 사람이 반드시 있어야 한다 — 없으면 시작할 수 없다', '두 번째 사람은 있어도 되고 없어도 된다'], ans: 1 },
        { prompt: "매뉴얼: 'The tool need not be vented for a software-only update.' 소프트웨어만 업데이트할 때는?", opts: ['벤트를 하면 안 된다', '벤트를 반드시 해야 한다', '벤트(대기압 복귀)를 하지 않아도 된다'], ans: 2 },
        { prompt: "'Leak checks should be performed at the start of each shift.' 어떤 무게의 문장인가?", opts: ['권장 — 하는 것이 좋다', '의무 — 안 하면 위반이다', '금지 — 하지 마라'], ans: 0 },
      ],
    },
    {
      type: 'glossary',
      title: '핵심 용어 (2) — LOTO 동작어',
      intro: 'LOTO 절차서의 각 단계를 여는 동사와 상태어입니다.',
      items: [
        { en: 'isolate', ko: '차단하다', d: '에너지원(전기·공압·가스·열)을 장비에서 끊는 것', ex: 'Isolate all energy sources, including CDA and process gas, before servicing.' },
        { en: 'de-energize', ko: '전원을 내리다', d: '전기 에너지를 없앤 상태로 만드는 것', ex: 'De-energize the RF generator and wait five minutes for the capacitors to discharge.' },
        { en: 'bleed', ko: '잔압을 빼다', d: '닫은 뒤에도 배관에 남은 압력을 빼는 것', ex: 'Bleed the residual pressure from the CDA line after closing the supply valve.' },
        { en: 'try-out', ko: '작동 시도 확인', d: '잠근 뒤 시작을 눌러 움직이지 않음을 확인하는 것', ex: 'Perform a try-out: press START and confirm that the tool does not respond.' },
        { en: 'zero energy state', ko: '무에너지 상태', d: '모든 에너지원이 끊기고 남은 에너지도 없는 상태', ex: 'Do not touch any part until a zero energy state has been verified.' },
        { en: 'remove a lock', ko: '자물쇠를 풀다', d: '단 사람만 풀 수 있다', ex: 'Only the person who applied the lock may remove it.' },
      ],
    },
    {
      type: 'mansample',
      title: '매뉴얼 표본 — LOTO 절차서',
      doc: { name: 'FAB-SAFE Lockout/Tagout Procedure', no: 'SOP-EHS-012', sec: '4', rev: 'F', page: '4-1' },
      heading: '4  Energy Control Procedure — Etch Tool',
      steps: [
        'Notify all affected personnel that the tool will be shut down for service.',
        'Shut down the tool using the normal stop sequence.',
        { t: 'Isolate each energy source: AC main breaker, RF generator, CDA supply, and process gas at the VMB.', note: { kind: 'note', en: 'The RF generator has its own breaker. It shall be isolated separately.' } },
        'Apply your personal lock and tag to every isolation point.',
        { t: 'Release stored energy: bleed the CDA line and cycle-purge the gas line.', note: { kind: 'caution', en: 'The heater may remain hot for 30 minutes after power-off.' } },
        { t: 'Verify zero energy: perform a try-out and measure 0 V at the main terminal.', note: { kind: 'warning', en: 'Do not begin work until the try-out has been completed.' } },
      ],
      callout: { kind: 'danger', en: 'Only the person who applied a lock shall remove it.' },
      gloss: [['isolation point', '차단 지점'], ['stored energy', '잔류 에너지'], ['try-out', '작동 시도 확인'], ['terminal', '단자']],
    },
    {
      type: 'quiz',
      title: '확인 퀴즈 (2) — LOTO 절차',
      intro: '절차서 문장을 읽고 올바른 판단을 고르세요.',
      questions: [
        { prompt: "'The RF generator has its own breaker. It shall be isolated separately.' 이 문장이 경고하는 실수는?", opts: ['RF 전원을 너무 일찍 켜는 것', 'RF 출력을 낮게 설정하는 것', '주전원만 내리고 RF 전원은 살아 있는 채로 작업하는 것'], ans: 2 },
        { prompt: "자물쇠를 다 걸었다. 절차서 다음 줄은 'Release stored energy: bleed the CDA line.' 왜 필요한가?", opts: ['밸브를 닫아도 배관 안에 압력이 남아 있기 때문에', '자물쇠가 제대로 걸렸는지 보려고', '공압이 부족해 보충하려고'], ans: 0 },
        { prompt: "'Only the person who applied a lock shall remove it.' 동료의 자물쇠가 걸려 있는데 동료가 퇴근했다. 맞는 것은?", opts: ['급하면 내가 풀어도 된다', '내가 풀지 않는다 — 절차에 따라 감독자에게 보고한다', '절단기로 자르고 작업을 시작한다'], ans: 1 },
      ],
    },
    {
      type: 'glossary',
      title: '핵심 용어 (3) — 가스 · 경보',
      intro: '가스 라벨과 감지기 화면, 경보 문구에서 만나는 말입니다.',
      items: [
        { en: 'toxic', ko: '독성의', d: '흡입하면 해로운 — AsH3, PH3, Cl2', ex: 'Arsine is extremely toxic even at very low concentrations.' },
        { en: 'pyrophoric', ko: '자연발화성의', d: '공기에 닿으면 저절로 불이 붙는 — SiH4', ex: 'Silane is pyrophoric, so the line must be purged before it is opened.' },
        { en: 'corrosive', ko: '부식성의', d: '금속·피부를 상하게 하는 — Cl2, HBr', ex: 'Chlorine is corrosive and attacks stainless steel when moisture is present.' },
        { en: 'concentration', ko: '농도', d: 'ppm·ppb 로 표시', ex: 'The monitor shows the Cl2 concentration in ppm.' },
        { en: 'evacuate', ko: '대피하다', d: '그 구역을 즉시 떠나는 것', ex: 'Evacuate the area immediately when the LEVEL 2 alarm sounds.' },
        { en: 'all-clear', ko: '경보 해제', d: '비상대응팀이 재진입을 허락하는 것', ex: 'Do not re-enter the area until the ERT gives the all-clear.' },
      ],
      figs: [
        { kind: 'meter', name: 'TGM-03  Cl2', sp: '0.05 (L1)', pv: '0.06', unit: 'ppm', state: 'warn', note: 'PV is above the LEVEL 1 set point.' },
      ],
    },
    {
      type: 'mansample',
      title: '매뉴얼 표본 — 가스 경보 대응',
      doc: { name: 'FAB-SAFE Emergency Response Guide', no: 'ERG-003', sec: '2', rev: 'D', page: '2-3' },
      heading: '2  Toxic Gas Alarm Response',
      steps: [
        { t: 'LEVEL 1 (WARNING): Stop work and secure the area. Report to the supervisor.', note: { kind: 'note', en: 'Do not open any gas line while a LEVEL 1 warning is active.' } },
        { t: 'LEVEL 2 (ALARM): Evacuate immediately via the nearest exit.', note: { kind: 'warning', en: 'Do not stop to shut down tools or investigate the source.' } },
        'Go to the assembly point and report to the area warden.',
        'Do not re-enter until the ERT gives the all-clear.',
      ],
      callout: { kind: 'danger', en: 'Only ERT members wearing SCBA may enter an area in LEVEL 2 alarm.' },
      gloss: [['secure the area', '현장을 안전하게 정리'], ['assembly point', '집결 장소'], ['area warden', '구역 안전 담당'], ['investigate', '원인을 조사하다']],
    },
    {
      type: 'quiz',
      title: '확인 퀴즈 (3) — 경보 문장 판단',
      intro: '경보 대응 절차를 읽고 행동을 고르세요.',
      questions: [
        { prompt: "LEVEL 2 경보. 절차서: 'Do not stop to shut down tools or investigate the source.' 맞는 행동은?", opts: ['장비를 정리하지 않고 가장 가까운 출구로 바로 대피한다', '하던 웨이퍼를 마저 꺼내고 대피한다', '어디서 새는지 확인하고 대피한다'], ans: 0 },
        { prompt: "대피 후 10분, 경보음이 멈췄다. 'Do not re-enter until the ERT gives the all-clear.' 들어가도 되는가?", opts: ['경보음이 멈췄으니 들어간다', '아니다 — 비상대응팀의 해제(all-clear)가 있어야 한다', '감독자 혼자 판단해 들어간다'], ans: 1 },
        { prompt: "'Only ERT members wearing SCBA may enter an area in LEVEL 2 alarm.' 이 문장의 may 는?", opts: ['권고 — 누구나 들어가는 것이 좋다', '가능성 — 들어갈지도 모른다', '허용 — 그 조건을 갖춘 사람만 들어갈 수 있다'], ans: 2 },
      ],
    },
    {
      type: 'glossary',
      title: '핵심 용어 (4) — 작업 허가서',
      intro: '허가서 양식의 칸 이름과, 그 칸에 들어가는 표현입니다.',
      items: [
        { en: 'permit to work', ko: '작업 허가서', d: '위험 작업의 범위·조건·서명을 적은 문서', ex: 'A permit to work is required for any line break on a toxic gas line.' },
        { en: 'line break', ko: '배관 개방 작업', d: '가스·약액 배관을 여는 모든 작업', ex: 'The line break shall not begin until the line has been cycle-purged.' },
        { en: 'cycle purge', ko: '반복 퍼지', d: '진공 배기와 N2 충전을 여러 번 반복', ex: 'Cycle-purge the line at least ten times with nitrogen.' },
        { en: 'scope of work', ko: '작업 범위', d: '허가된 일의 경계 — 밖의 일은 허가 안 됨', ex: 'Replacing the regulator is outside the scope of work on this permit.' },
        { en: 'sign off', ko: '서명하다 / 승인하다', d: '확인했다는 서명', ex: 'The area owner must sign off the permit before work starts.' },
        { en: 'expire', ko: '만료되다', d: '유효 시간이 지나 효력을 잃음', ex: 'This permit expires at 06:00; a new permit is required after that.' },
      ],
    },
    {
      type: 'mansample',
      title: '매뉴얼 표본 — 작업 허가서',
      doc: { name: 'Permit to Work — Line Break', no: 'PTW-1182', sec: '—', rev: 'A', page: '1/1' },
      heading: 'Line Break Permit — Cl2 line, VMB-3',
      intro: 'Scope of work: Replace the VCR fitting downstream of valve V2. Valid until 06:00.',
      steps: [
        { t: 'The line shall be cycle-purged and verified before the line break.', note: { kind: 'note', en: 'Purge record: 10 cycles, N2, signed by the gas technician.' } },
        'A second person shall be present at all times during the work.',
        'Respirators should be staged at the work area.',
        { t: 'If any gas alarm activates, work shall stop immediately.', note: { kind: 'warning', en: 'Resume only after the supervisor re-authorizes the permit.' } },
        'The permit holder may extend the work by one hour with the supervisor\'s approval.',
      ],
      callout: { kind: 'caution', en: 'This permit expires at 06:00. Work outside the scope requires a new permit.' },
      gloss: [['downstream', '(흐름의) 뒤쪽'], ['staged', '미리 갖춰 둔'], ['re-authorize', '다시 허가하다'], ['permit holder', '허가서를 받은 사람']],
    },
    {
      type: 'quiz',
      title: '확인 퀴즈 (4) — 허가서 읽기',
      intro: '위 허가서 PTW-1182 의 문장을 근거로 판단하세요.',
      questions: [
        { prompt: "작업 중 보니 레귤레이터도 교체가 필요해 보인다. 허가서의 범위는 'Replace the VCR fitting downstream of valve V2.' 맞는 것은?", opts: ['같은 라인이니 함께 교체한다', '권장 사항이므로 판단에 맡긴다', '범위 밖이므로 새 허가서를 받아야 한다'], ans: 2 },
        { prompt: "'Respirators should be staged at the work area.' 와 'A second person shall be present.' 를 비교하면?", opts: ['둘 다 의무', '호흡보호구 비치는 권장, 두 번째 사람은 의무', '둘 다 권장'], ans: 1 },
        { prompt: "05:50, 작업이 20분 더 걸린다. 'The permit holder may extend the work by one hour with the supervisor's approval.' 어떻게 하나?", opts: ['감독자 승인을 받으면 연장할 수 있다', '승인 없이 20분 더 한다', '연장은 금지되어 있다'], ans: 0 },
      ],
    },
    {
      type: 'manual',
      mtitle: 'SAFETY DATA SHEET — CHLORINE (Cl2), EXCERPT',
      paras: [
        'SECTION 2. Hazard(s) identification — Signal word: DANGER.',
        '해설: 2항은 이 물질의 위험을 요약한다. 신호어 DANGER 는 WARNING 보다 높은 단계다.',
        'H270 May cause or intensify fire; oxidiser. H330 Fatal if inhaled. H314 Causes severe skin burns and eye damage.',
        '해설: H 로 시작하는 유해 문구(hazard statement). 스스로 타지는 않지만 불을 키우고(H270), 들이마시면 치명적이며(H330), 피부·눈에 심한 화상을 입힌다(H314).',
        'SECTION 4. First-aid measures — Inhalation: Remove the person to fresh air. Call for medical help immediately.',
        '해설: 4항은 응급조치. 흡입 시 신선한 공기가 있는 곳으로 옮기고 즉시 의료 지원을 부른다. 단, 구조자도 보호구 없이 오염 구역에 들어가지 않는다.',
        'SECTION 8. Exposure controls / personal protection — TLV-TWA 0.1 ppm. Use only with adequate exhaust ventilation.',
        '해설: 8항은 노출 기준과 보호구. 8시간 평균 0.1 ppm, 충분한 배기 환기 안에서만 쓴다. 감지기의 경보 값은 이 숫자에서 출발한다.',
      ],
      figs: [
        { kind: 'sticker', level: 'danger', icon: '☠', en: 'DANGER — Fatal if inhaled.', ko: '위험 — 흡입하면 치명적.' },
      ],
    },
    {
      type: 'manual',
      mtitle: 'GENERAL SAFETY REQUIREMENTS — GAS AREA',
      paras: [
        '1. Personnel shall complete gas safety training before entering the gas area.',
        '해설: 가스 구역에 들어가기 전에 가스 안전 교육을 반드시 마쳐야 한다. (shall = 의무)',
        '2. Personnel must not work alone on any toxic gas line.',
        '해설: 독성 가스 라인에서 혼자 작업해서는 안 된다. (must not = 금지)',
        '3. A portable gas detector should be carried during any line break.',
        '해설: 배관 개방 작업 중에는 휴대용 가스 감지기를 지니는 것이 좋다. (should = 권장)',
        '4. Visitors may enter the gas area only when escorted.',
        '해설: 방문자는 안내자와 함께일 때만 들어갈 수 있다. (may … only when = 조건이 맞을 때만 허용)',
        '5. A face shield need not be worn inside the control room.',
        '해설: 통제실 안에서는 안면 보호구를 쓰지 않아도 된다. (need not = 의무 아님, 금지 아님)',
      ],
    },
    {
      type: 'sim',
      which: 'safety',
      mode: 'modal',
      intro: '먼저 **규정 문장 판정** 실습입니다. 안전 규정집에서 뽑은 문장을 하나씩 읽고, 그 줄이 **반드시(required) / 금지(prohibited) / 권장(recommended) / 해도 됨(permitted) / 안 해도 됨(not required)** 중 무엇인지 고르세요. 판단의 근거는 동사 앞의 조동사 하나입니다.',
    },
    {
      type: 'sim',
      which: 'safety',
      mode: 'loto',
      intro: '다음은 **LOTO 순서** 실습입니다. 식각 장비 정비를 앞두고 영어 지시 카드가 섞여 있습니다. 지금 해도 되는 카드를 골라 순서대로 누르세요. 순서가 틀리면 왜 안 되는지 로그가 알려 줍니다. 카드 중에는 **절차서에 없는 지름길**도 섞여 있습니다.',
    },
    {
      type: 'sim',
      which: 'safety',
      mode: 'gas',
      intro: '마지막은 **가스 경보 판독** 실습입니다. 감지기 화면의 가스·농도·**단위(ppm / ppb)** 를 읽고, 이 교재 설정(1차 = TLV 50%, 2차 = TLV 100%)으로 단계를 판정한 뒤, 그 단계에 맞는 영어 행동 지시를 고르세요.',
    },
    {
      type: 'comm',
      items: [
        { sit: '해외 엔지니어가 허가서 조건을 확인한다', q: { en: 'Has the line been cycle-purged? The permit says it shall be verified before the break.', ko: '라인 반복 퍼지 했나요? 허가서에 개방 전에 확인해야 한다고 되어 있어요.' }, a: { en: 'Yes. We did ten cycles with nitrogen, and the gas technician signed the purge record.', ko: '네. 질소로 10회 했고, 가스 기술자가 퍼지 기록에 서명했습니다.' } },
        { sit: '작업 중 1차 경보가 울려 상황을 보고한다', q: { en: 'What is the status? I heard the gas monitor went off.', ko: '상황이 어때요? 가스 감지기가 울렸다고 들었어요.' }, a: { en: 'We have a LEVEL 1 warning on TGM-03, chlorine at 0.06 ppm. We stopped work and secured the area. We are waiting for your instructions.', ko: 'TGM-03 에 1차 경보, 염소 0.06 ppm 입니다. 작업을 멈추고 현장을 정리했습니다. 지시를 기다리고 있습니다.' } },
        { sit: '정비를 넘겨받기 전 LOTO 상태를 묻는다', q: { en: 'Is the tool locked out? Can I start on the chamber?', ko: '장비 잠금 됐나요? 챔버 작업 시작해도 되나요?' }, a: { en: 'All four points are locked and tagged, but the try-out is not done yet. Please wait until I verify zero energy.', ko: '네 곳 모두 잠금·표찰을 걸었지만 작동 확인은 아직입니다. 무에너지 상태를 확인할 때까지 기다려 주세요.' } },
      ],
    },
    {
      type: 'wrap',
      title: '정리 — 조동사가 행동을 정한다',
      points: [
        '2부는 **규정문**을 읽는다. 동사보다 먼저 **조동사**를 본다: **shall / must** = 반드시, **should** = 권장, **may** = 해도 됨, **need not** = 안 해도 됨, **shall not / must not** = 금지.',
        '**need not** 과 **must not** 은 정반대다 — 하나는 "안 해도 된다", 하나는 "하지 마라".',
        'LOTO 는 여섯 단계: **Notify → Shut down → Isolate → Lock & Tag → Release stored energy → Verify(try-out)**. 확인 전에는 손대지 않는다.',
        '가스는 이름보다 **성질**(toxic · pyrophoric · corrosive · oxidizer)을 읽고, 농도는 숫자보다 **단위**(ppm / ppb)를 먼저 본다.',
        '경보는 **단계 → 행동**: LEVEL 1 = Stop work and report, LEVEL 2 = Evacuate immediately. 재진입은 **all-clear** 뒤에만.',
        '작업 허가서는 **scope · precautions · sign-off · valid until** — 범위 밖의 일, 만료된 허가서로는 일하지 않는다.',
      ],
      done: '이제 여러분은 안전 문서의 한 줄을 읽고 **그것이 의무인지, 권장인지, 금지인지** 가릴 수 있습니다. **Read the modal, then act.**',
      figs: [
        { kind: 'step', title: 'LOTO', items: [['[Notify] affected personnel.', '알리기'], ['[Isolate] every energy source.', '차단'], ['[Lock] and [tag] each point.', '잠금·표찰'], ['[Verify] zero energy.', '무에너지 확인']] },
      ],
    },
  ],
};

export default CHAPTER;
