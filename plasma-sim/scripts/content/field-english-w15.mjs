/* ═══ 현장 실무영어 15강 「종합 점검」 원고 ═══
   전 과정 종합 평가. 설계(Layer · Design Rule · DRC · LVS) 퀴즈 셋을 2부(9~14강)로 바꿨다:
   ① 1부 장비 · 운전 · 알람 ② 안전 · 레시피(9 · 10강) ③ 장비 계열 · 트러블슈팅(11 · 12강) ④ 벤더 소통 · 보고(13 · 14강).
   각 문항의 근거는 그 강의 교재 본문과 같은 규칙(엔진 fieldEnglishLabs.js — modalClass · parseLimit · nounHead · certaintyOf ·
   readBackValue)이며 테스트가 대조한다. 이 파일이 15강의 원본이다. 고친 뒤:  node scripts/content/apply-chapter.mjs w15 */
export default {
  id: 'w15',
  title: '종합 점검',
  kind: '평가',
  slides: [
    {
      type: 'story',
      icon: '🎓',
      title: '종합 점검 안내',
      text: '1부(장비 화면 · 운전 · 로그 · 알람 · PM)와 2부(안전 규정 · 레시피 · 다른 장비 · 트러블슈팅 · 벤더 소통 · 종합 보고)를 한 번에 점검합니다. **조동사 · 경계어 · 명사 덩어리 · 확신 표현 · 되읽기** — 문장 하나에서 판단을 바꾸는 말을 찾아 답하세요.',
      art: 'finalcheck',
    },
    {
      type: 'scene',
      title: '오늘의 현장 · 상황 설정',
      where: '전 과정을 마친 종합 점검.',
      tool: '장비 화면 · 규정 · 레시피 표 · 트러블슈팅 문서 · 벤더 티켓 · 인계 보고서.',
      situation: '마지막으로 읽고 · 판단하고 · 영어로 보고한다.',
      meet: ['1부 장비 · 운전 · 알람', '2부 규정 · 레시피 · 장비 계열', '확신 · 되읽기 · 보고', '최종 체크리스트'],
      goal: '배운 현장 영어를 실제 흐름에서 통합 적용하기.',
      bg: 'w15',
    },
    {
      type: 'mansample',
      title: '매뉴얼 표본 — 영어 현장 보고서',
      doc: { name: 'Field Report Template', no: 'FRT-15', sec: '1.0', rev: 'B', page: '1-1' },
      heading: '1.0  Writing an English Field Report',
      steps: [
        'Describe the equipment [issue] (what the HMI or alarm showed).',
        'State the process result (for example, out of spec or OOC).',
        'State how certain the cause is (confirmed, suspected, or ruled out).',
        'Give the [action taken], any vendor ticket (SR), and the current status.',
      ],
      callout: { kind: 'note', en: 'Read, judge, and report: the whole loop in English.' },
      gloss: [['issue', '문제'], ['OOC', '관리 이탈'], ['action taken', '조치 사항'], ['status', '상태']],
    },
    {
      type: 'quiz',
      title: '① 장비 · 운전 · 알람 종합',
      intro: '1부(1~7강) 내용을 확인합니다.',
      questions: [
        { prompt: '“Ignite the plasma.” 의 뜻은?', opts: ['가스를 잠가라', '플라즈마를 점화하라', '챔버를 열어라'], ans: 1 },
        { prompt: '“reflected power” 는 무엇인가?', opts: ['공급되는 전력', '챔버 온도', '매칭 불량으로 되돌아오는 RF 전력'], ans: 2 },
        { prompt: '“Replace the pump oil.” 는 어떤 활동인가?', opts: ['유지보수(PM)', '운전', '보고'], ans: 0 },
      ],
    },
    {
      type: 'quiz',
      title: '② 안전 · 레시피',
      intro: '9강(규정문의 조동사)과 10강(조건 · 경계)을 확인합니다.',
      questions: [
        { prompt: "'The tool need not be vented for a software-only update.' 의 뜻은?", opts: ['벤트하지 않아도 된다', '벤트하면 안 된다', '반드시 벤트해야 한다'], ans: 0 },
        { prompt: "'Reflected power must be below 20 W.' 측정값 20 W 는?", opts: ['합격 — 경계와 같다', '판정할 수 없다', '불합격 — below 는 경계를 포함하지 않는다'], ans: 2 },
        { prompt: "'The recipe shall not be edited unless an ECN has been approved.' ECN 이 PENDING 이면?", opts: ['고쳐도 된다', '고칠 수 없다 — 승인이 먼저다', '고친 뒤 승인받으면 된다'], ans: 1 },
      ],
    },
    {
      type: 'quiz',
      title: '③ 장비 계열 · 트러블슈팅',
      intro: '11강(명사 덩어리 · 단위)과 12강(확신 · 관리도)을 확인합니다.',
      questions: [
        { prompt: "화면 라벨 'SLURRY FLOW ALARM LIMIT 150 mL/min' 은?", opts: ['슬러리 유량 알람이 지금 울린다', '슬러리 유량 알람의 한계값이 150 이다', '슬러리 유량이 지금 150 이다'], ans: 1 },
        { prompt: "보고: 'The leak is most likely at the lid O-ring.' 원인은?", opts: ['가능성이 높지만 아직 확정 전이다', '확정되었다', '배제되었다'], ans: 0 },
        { prompt: "식각 속도가 UCL(106)을 넘은 107, 규격은 90~110. 이 점은?", opts: ['OOS — 불량이다', '정상이다', 'OOC 지만 규격 안 — 조사할 신호다'], ans: 2 },
      ],
    },
    {
      type: 'quiz',
      title: '④ 벤더 소통 · 보고',
      intro: '13강(티켓 · 통화)과 14강(종합 보고)을 확인합니다.',
      questions: [
        { prompt: "지원 엔지니어: 'Set the limit to fifteen watts.' 가장 안전한 되읽기는?", opts: ['Let me read that back: five-zero watts.', 'Let me read that back: one-five watts.', 'Okay, fifty.'], ans: 1 },
        { prompt: "장비가 멈췄고 같은 레시피를 돌릴 다른 장비가 없다. 티켓 긴급도는(교재 예시)?", opts: ['S1', 'S3', 'S4'], ans: 0 },
        { prompt: "구두 인계에서 가장 먼저 말할 것은?", opts: ['원인 분석의 자세한 과정', '내가 한 일의 순서', 'Result — 지금 장비 · 로트의 상태'], ans: 2 },
      ],
      figs: [
        { kind: 'hmi', tool: 'ALL TOOLS', status: 'RUN', state: 'run', rows: [['Equipment', 'OK'], ['Safety · Recipe', 'NO OPEN ITEMS', 'ok'], ['Vendor', 'SR-20618 CLOSED', 'ok']] },
      ],
    },
    {
      type: 'wrap',
      title: '수료 — 이 과정을 마치며',
      points: [
        '1부: 장비 화면 · 운전 절차 · 로그 · 알람 · PM 의 영어를 **읽고 판단**했다.',
        '2부: 규정의 **조동사**, 레시피의 **조건과 경계**, 낯선 장비의 **명사 덩어리와 단위**, 원인의 **확신 표현**, 벤더와의 **되읽기**를 익혔다.',
        '그리고 모든 것을 **Problem – Cause – Action – Result** 로 묶어 영어로 보고할 수 있다.',
      ],
      done: '🎓 **종합 점검 완료 · 전 과정 수료!**',
      figs: [
        { kind: 'sticker', level: 'info', en: 'FINAL CHECK — READ · JUDGE · REPORT', ko: '최종 점검 — 읽고 · 판단하고 · 보고' },
        { kind: 'log', title: 'FINAL CHECKLIST', lines: ['Equipment English      ✓', 'Safety · Recipe English ✓', 'Vendor · Report English ✓'] },
      ],
    },
  ],
};
