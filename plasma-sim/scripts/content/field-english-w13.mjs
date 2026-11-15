/* ═══ 현장 실무영어 13강 「벤더 · 서비스 엔지니어와 소통 — 티켓 · 통화 · 메일」 원고 ═══
   2부 다섯째 강. 처음으로 '읽기'보다 '말하기 · 쓰기'가 중심이다 — 장비사(vendor)의 지원 창구에 티켓을 열고,
   원격 지원 통화를 하고, 부품과 RMA 를 메일로 주고받고, 필요하면 에스컬레이션한다.
   영어 축: ① 통화의 되묻기 · 되읽기(read back) — 15/50 · 13/30 같은 숫자 혼동, 한 자리씩 읽기(one-five),
               음성 기호 알파벳(ICAO/NATO: Alpha · Bravo · Charlie …)으로 부품 번호 읽기
            ② 티켓 · 메일의 구조 — 제목 한 줄(장비 · 증상 · 시각 · 영향), 사실 · 확인한 것 · 요청 · 기한 · 첨부
            ③ 정중한 요청과 에스컬레이션 — Could you … / Would it be possible … / We need … by …, 영향을 사실로
   이 파일이 13강의 원본이다. 고친 뒤:  node scripts/content/apply-chapter.mjs w13
   긴급도 등급(S1~S4)의 정의는 이 교재의 예시다 — 장비사마다 계약(SLA)이 다르다(화면에 '교재 예시'라고 밝힌다).
   음성 기호 알파벳은 ICAO 표준(교재는 흔한 철자 Alpha · Juliet 를 쓴다). 엔진(fieldEnglishLabs.js 13강 절)과 같은 규칙. */
const CHAPTER = {
  id: 'w13',
  title: '벤더 · 서비스 엔지니어와 소통 — 티켓 · 통화 · 메일',
  slides: [
    {
      type: 'story',
      icon: '📞',
      title: '"Did you say fifteen or fifty?"',
      text: '새벽 3시. 지수는 장비사 원격 지원 창구와 통화 중이다. 상대는 미국에 있는 지원 엔지니어. 잡음 섞인 목소리가 들린다. "**Set the reflected power limit to fifteen watts, then restart the match.**" 지수는 50 을 입력하려다 손을 멈춘다. fifteen 이었나, fifty 였나? 영어에서 teen 과 ty 는 끝소리만 다르다. 지수가 말한다. "**Sorry, did you say fifteen or fifty?**" "Fifteen — **one-five**." 지수가 다시 읽어 준다. "**Let me read that back: reflected power limit, one-five watts, then restart the match.**" "That\'s correct." 통화 끝에 엔지니어가 교체 부품 번호를 불러 준다. "K X four zero seven one B." 지수는 받아 적고 한 번 더 확인한다. "**Kilo X-ray, four zero seven one, Bravo?**" B 를 D 로 적었다면 다른 부품이 3주 뒤에 도착했을 것이다. 통화의 영어는 유창함이 아니라 **틀리지 않게 확인하는 기술**이다.',
      figs: [
        { kind: 'note', title: 'READ BACK', en: 'Let me read that back: one-five watts.', ko: '다시 읽어 드릴게요: 일-오(15) 와트.' },
      ],
    },
    {
      type: 'scene',
      title: '오늘의 현장 · 상황 설정',
      where: '새벽의 장비 앞 — 장비사 지원 포털(티켓 화면), 헤드셋, 메일함.',
      tool: '서비스 요청 티켓(service request), 원격 지원 통화, 부품 요청 · 반송(RMA) 메일.',
      situation: '장비가 멈췄다. 해외 지원팀에 티켓을 열고, 전화로 지시를 받고, 부품을 받아야 한다. 숫자 하나, 글자 하나가 틀리면 몇 시간 · 몇 주가 날아간다.',
      meet: ['되묻기 Did you say fifteen or fifty?', '되읽기 Let me read that back.', '음성 기호 Kilo · X-ray · Bravo', '티켓 제목 · 긴급도 S1~S4', '정중한 요청 Could you … by …'],
      goal: '지원팀이 한 번에 알아듣게 쓰고, 들은 것을 틀리지 않게 확인하기.',
      bg: 'w13',
    },
    {
      type: 'read',
      title: '벤더와 일하는 세 가지 길 — 티켓 · 통화 · 메일',
      intro: '장비사(vendor) 지원은 보통 세 갈래로 온다. 갈래마다 영어의 모양이 다르다.',
      paras: [
        '**Ticket / Service Request(SR)** — 지원 포털에 여는 요청서. 번호가 붙는다(예: **SR-20618**). 이후 모든 메일과 통화는 이 번호로 이어진다. 그래서 첫 줄(제목)이 가장 중요하다.',
        '**Remote support call** — 지원 엔지니어(**TSE**, technical support engineer)와의 통화. 지시를 받고, 값을 불러 주고, 결과를 보고한다. 글이 없으니 **되묻고 되읽는 것**이 안전장치다.',
        '**Email** — 부품 요청, 반송(**RMA**), 정리 보고. 기록이 남으므로 숫자 · 부품 번호 · 기한을 정확히 쓴다.',
        '현장 방문이 필요하면 장비사 서비스 엔지니어(**FSE**, field service engineer)가 온다. 이때 쓰는 말: "**Could you send an FSE on site?**"',
        '세 갈래 모두에서 쓰는 것이 12강의 확신 표현이다. 지원팀은 우리 말만 듣고 판단한다 — **suspected** 와 **confirmed** 를 섞으면 엉뚱한 부품이 온다.',
      ],
      figs: [
        { kind: 'hmi', tool: 'VENDOR SUPPORT PORTAL', status: 'OPEN', state: 'run', rows: [['TICKET', 'SR-20618'], ['SEVERITY', 'S1 — Tool down', 'warn'], ['ASSIGNED', 'TSE · Remote']] },
      ],
    },
    {
      type: 'read',
      title: '티켓 제목 한 줄 — 장비 · 증상 · 시각 · 영향',
      intro: '지원팀은 하루에 티켓 수백 개를 본다. 제목 한 줄로 무엇이, 언제부터, 얼마나 급한지가 보여야 먼저 잡힌다.',
      paras: [
        '좋은 제목의 공식: **Tool ID | Symptom | Since when | Impact**. 예: "**ET-05 | Base pressure high since 23:05 | Tool down**".',
        '나쁜 제목: "URGENT!!! HELP", "Problem with our tool". 급하다는 말만 있고 무엇이 문제인지 없다. 느낌표는 순서를 앞당기지 못한다.',
        '**Severity(긴급도)** — 지원팀이 순서를 정하는 등급. 이 교재의 예시: **S1** 장비 정지 · 대안 없음 / **S2** 장비 정지지만 대안 있음, 또는 웨이퍼 위험 / **S3** 가동 중 · 웨이퍼 위험 없음 / **S4** 질문 · 자료 요청.',
        '긴급도는 느낌이 아니라 **사실**로 정한다: 장비가 멈췄나? 같은 일을 할 다른 장비가 있나? 웨이퍼가 위험한가? 실제 등급 정의는 장비사와의 계약(**SLA**)이 정한다.',
        '등급을 부풀리면(S3 를 S1 로) 한두 번은 빨리 오지만, 그 뒤로 우리 티켓을 믿지 않는다. 12강의 원칙 그대로 — **사실만큼만** 쓴다.',
      ],
      figs: [
        { kind: 'step', title: 'SEVERITY (교재 예시)', items: [['[S1] Tool down, no workaround', '정지 · 대안 없음'], ['[S2] Down with workaround, or wafer risk', '대안 있음 · 웨이퍼 위험'], ['[S3] Running, no wafer risk', '가동 · 위험 없음'], ['[S4] Question or document request', '질문 · 자료']] },
      ],
    },
    {
      type: 'read',
      title: '통화의 영어 — 되묻기와 되읽기',
      intro: '전화에는 글이 없다. 잡음 · 억양 · 속도 때문에 숫자와 이름이 가장 자주 틀린다. 그래서 통화에는 정해진 확인 문장이 있다.',
      paras: [
        '**못 알아들었을 때** — "Sorry, could you repeat that?" "Could you say that more slowly?" 모르는 채로 "Yes"라고 하지 않는다.',
        '**둘 중 하나가 헷갈릴 때** — "**Did you say fifteen or fifty?**" 고를 것을 같이 말하면 상대가 정확히 짚어 준다.',
        '**뜻을 확인할 때** — "Just to confirm, you mean the **upper** match, not the lower one?" — 내가 이해한 것을 문장으로 돌려준다.',
        '**지시를 받은 뒤** — "**Let me read that back:** …" 받은 값과 순서를 그대로 다시 읽는다. 상대가 "That\'s correct" 또는 "Negative, …"로 고쳐 준다.',
        '**끝낼 때** — "So the next step is …, and I will call you back by 04:00." 다음 할 일과 다음 연락 시각을 확인하고 끊는다.',
      ],
      figs: [
        { kind: 'log', title: 'CALL NOTES — SR-20618', lines: ['03:12  TSE: set REFL limit [15 W] — read back OK', '03:15  TSE: restart match — done', '03:20  Part: KX-4071-B — read back OK'] },
      ],
    },
    {
      type: 'read',
      title: '숫자와 글자 읽어 주기 — one-five · Bravo · point',
      intro: '값과 번호를 불러 줄 때는 듣는 사람이 헷갈릴 수 없는 방식으로 읽는다.',
      paras: [
        '**teen 과 ty** — fif**teen**(15) 과 **fif**ty(50), thir**teen**(13) 과 **thir**ty(30)는 끝소리 · 강세만 다르다. 중요한 값은 **한 자리씩** 다시 읽는다: 15 → "**one-five**", 50 → "**five-zero**".',
        '**0 은 zero** — "oh"라고 읽으면 글자 O 와 헷갈린다. 부품 번호 4071 → "four zero seven one".',
        '**소수점과 지수** — 4.2 → "four **point** two", 1.0E-5 → "one point zero **E minus** five". E 와 minus 를 빼먹으면 값이 10만 배 달라진다.',
        '**글자는 음성 기호 알파벳으로** — B · D · P · V · E · G, M · N, F · S 는 전화로 거의 구분이 안 된다. 국제 표준(ICAO) 단어로 읽는다: **Bravo · Delta · Papa · Victor · Echo · Golf**, **Mike · November**, **Foxtrot · Sierra**.',
        '부품 번호 KX-4071-B → "**Kilo X-ray, four zero seven one, Bravo**". 하이픈은 보통 읽지 않고 잠깐 끊는다.',
      ],
      figs: [
        { kind: 'step', title: 'SAY IT CLEARLY', items: [['15 → [one-five]', '한 자리씩'], ['4071 → four [zero] seven one', 'zero'], ['1.0E-5 → one [point] zero [E minus] five', '점 · 지수'], ['B → [Bravo]', '음성 기호']] },
      ],
    },
    {
      type: 'read',
      title: '부품 요청과 반송 — P/N · lead time · RMA',
      intro: '부품을 받고 돌려보내는 메일은 칸이 정해진 문서에 가깝다. 빠진 칸이 있으면 메일이 한 번 더 오간다 — 그만큼 장비가 더 멈춘다.',
      paras: [
        '**부품 요청에 꼭 들어갈 것** — part number(**P/N**), 수량(**Qty**), 장비 ID, 받을 곳(**ship to**), 필요한 날짜. 예: "P/N KX-4071-B, Qty 1, for ET-05, ship to Fab 2 receiving, needed by Nov 10."',
        '**lead time(납기)** — 주문에서 도착까지 걸리는 시간. "**in stock**"이면 바로 보내고, "lead time 3 weeks"면 3주다. 급하면 "Is there a local stock or a loaner?"(근처 재고나 대여품이 있나요?)라고 묻는다.',
        '**RMA(Return Material Authorization)** — 고장 난 부품을 장비사로 돌려보내기 위한 승인 번호. 번호 없이 보내면 받지 않는다. 상자에 RMA 번호를 적는다.',
        '**FA(Failure Analysis) request** — 장비사에 고장 원인 분석을 요청하는 것. 12강의 근본 원인을 찾는 데 쓴다. "Please include an FA report with the RMA."',
        '**warranty(보증)** — 보증 기간 안이면 무상이다. "Is this part still under warranty?"',
      ],
      figs: [
        { kind: 'hmi', tool: 'PARTS REQUEST', status: 'PENDING', state: 'idle', rows: [['P/N', 'KX-4071-B'], ['QTY', '1'], ['LEAD TIME', 'In stock (Singapore)'], ['RMA', 'RMA-77314']] },
      ],
    },
    {
      type: 'read',
      title: '정중하게 재촉하기 — 요청의 사다리와 에스컬레이션',
      intro: '지원이 늦을 때 화를 내면 더 늦어진다. 영어에는 같은 요청을 정중함 · 강도에 따라 고르는 사다리가 있다.',
      paras: [
        '**가볍게** — "**Could you** check the status of SR-20618?" "**Would it be possible to** get an update today?"',
        '**기한을 붙여서** — "**We need** the part **by** Nov 10 **because** the tool is down." 기한과 그 이유(영향)를 같이 쓴다. 이유 없는 기한은 무시되기 쉽다.',
        '**에스컬레이션** — 정해진 시간 안에 진전이 없을 때 윗단계 지원으로 올려 달라고 요청한다: "This is now impacting production: two lots are on hold. **Could we escalate this to Level 2 support?**"',
        '**하지 않을 것** — "ASAP!!!", "This is your fault.", "Reply immediately." 감정은 정보가 아니다. 영향(멈춘 시간 · 대기 lot 수 · 기한)을 숫자로 쓰는 것이 가장 강한 재촉이다.',
        '고마움도 정해진 말이 있다: "Thank you for the quick support." "I appreciate your help on this." 다음 티켓의 속도를 바꾼다.',
      ],
      figs: [
        { kind: 'step', title: 'REQUEST LADDER', items: [['[Could you] …?', '가볍게'], ['[Would it be possible to] …?', '더 정중하게'], ['[We need] … [by] … [because] …', '기한 + 이유'], ['[Could we escalate] this?', '에스컬레이션']] },
      ],
    },
    {
      type: 'acr',
      title: '약어',
      intro: '장비사 지원 창구와 메일에서 반복해서 나오는 약어입니다.',
      items: [
        { ab: 'SR', full: 'Service Request', ko: '서비스 요청 — 지원 티켓, 번호가 붙는다' },
        { ab: 'TSE', full: 'Technical Support Engineer', ko: '원격 기술 지원 엔지니어' },
        { ab: 'FSE', full: 'Field Service Engineer', ko: '현장 방문 서비스 엔지니어' },
        { ab: 'SLA', full: 'Service Level Agreement', ko: '지원 수준 계약 — 긴급도별 응답 시간' },
        { ab: 'P/N', full: 'Part Number', ko: '부품 번호' },
        { ab: 'Qty', full: 'Quantity', ko: '수량' },
        { ab: 'RMA', full: 'Return Material Authorization', ko: '반송 승인 번호 — 없으면 받지 않는다' },
        { ab: 'FA', full: 'Failure Analysis', ko: '고장 원인 분석' },
        { ab: 'ETA', full: 'Estimated Time of Arrival', ko: '도착 예정 시각' },
        { ab: 'KST', full: 'Korea Standard Time', ko: '한국 시간 — 해외 상대에겐 시간대를 꼭 붙인다' },
      ],
    },
    {
      type: 'glossary',
      title: '핵심 용어 (1) — 통화에서 확인하기',
      intro: '통화에서 숫자와 지시를 틀리지 않게 확인하는 문장입니다.',
      items: [
        { en: 'Could you repeat that?', ko: '다시 말씀해 주시겠어요?', d: '못 알아들었을 때 — 모르는 채로 Yes 하지 않는다', ex: 'Sorry, the line is noisy. Could you repeat that?' },
        { en: 'Did you say … or …?', ko: '…라고 하셨나요, …라고 하셨나요?', d: '둘 중 헷갈릴 때 선택지를 함께 말한다', ex: 'Did you say fifteen or fifty?' },
        { en: 'Just to confirm', ko: '확인하자면', d: '내가 이해한 내용을 문장으로 돌려준다', ex: 'Just to confirm, you mean the upper match, not the lower one?' },
        { en: 'Let me read that back', ko: '다시 읽어 드릴게요', d: '받은 값 · 순서를 그대로 다시 읽는다', ex: 'Let me read that back: reflected power limit, one-five watts.' },
        { en: 'That\'s correct / Negative', ko: '맞습니다 / 아닙니다', d: '되읽기에 대한 대답', ex: 'Negative, the limit is one-five, not five-zero.' },
        { en: 'call you back', ko: '다시 전화하다', d: '다음 연락 시각을 정하고 끊는다', ex: 'I will run the check and call you back by 04:00 KST.' },
      ],
    },
    {
      type: 'quiz',
      title: '확인 퀴즈 (1) — 통화에서 확인하기',
      intro: '통화 상황에서 가장 알맞은 말을 고르세요.',
      questions: [
        { prompt: "지원 엔지니어가 'Set the limit to fif…' 하는데 잡음에 묻혔다. 가장 알맞은 말은?", opts: ['Yes, okay.', 'Did you say fifteen or fifty?', 'I will set it to fifty.'], ans: 1 },
        { prompt: "지시를 다 받았다. 실행하기 전에 할 말은?", opts: ['Let me read that back: …', 'Thank you, bye.', 'Why?'], ans: 0 },
        { prompt: "내가 'Fifty watts'라고 되읽었더니 'Negative, one-five.' 라는 답이 왔다. 뜻은?", opts: ['50 이 맞다', '설정하지 마라', '아니다, 15 다'], ans: 2 },
      ],
    },
    {
      type: 'glossary',
      title: '핵심 용어 (2) — 숫자와 글자 읽기',
      intro: '전화로 값과 번호를 불러 줄 때의 규칙입니다.',
      items: [
        { en: 'one-five', ko: '일-오 (15 를 한 자리씩)', d: 'teen / ty 혼동을 막는다', ex: 'The limit is fifteen — one-five — watts.' },
        { en: 'zero', ko: '영 (oh 아님)', d: '글자 O 와 헷갈리지 않게', ex: 'The part number is four zero seven one.' },
        { en: 'point', ko: '점 (소수점)', d: '4.2 → four point two', ex: 'The pressure is four point two E minus five Torr.' },
        { en: 'E minus', ko: '지수 (×10의 마이너스)', d: '1.0E-5 → one point zero E minus five', ex: 'Base pressure must be below one point zero E minus five.' },
        { en: 'Bravo / Delta', ko: 'B / D 의 음성 기호', d: '전화로 거의 같게 들리는 글자를 단어로', ex: 'That is Bravo, not Delta.' },
        { en: 'Mike / November', ko: 'M / N 의 음성 기호', d: '비음 둘을 구분', ex: 'The tool ID is Mike Echo, one two.' },
      ],
    },
    {
      type: 'mansample',
      variant: 'parts',
      title: '매뉴얼 표본 — 헷갈리는 글자와 음성 기호',
      doc: { name: 'PHONETIC ALPHABET — QUICK CARD', no: 'QC-ICAO', rev: '—' },
      heading: 'Letters that sound alike on the phone (ICAO spelling alphabet)',
      cols: ['GROUP', 'LETTERS', 'SAY', 'EXAMPLE'],
      rows: [
        ['B-D-P-V', 'B · D · P · V', 'Bravo · Delta · Papa · Victor', 'KX-4071-B → … Bravo'],
        ['E-G', 'E · G', 'Echo · Golf', 'E-chuck → Echo chuck'],
        ['M-N', 'M · N', 'Mike · November', 'ME-12 → Mike Echo, one two'],
        ['F-S', 'F · S', 'Foxtrot · Sierra', 'SR-20618 → Sierra Romeo …'],
        ['digits', '0 · 13 · 15', 'zero · one-three · one-five', '4071 → four zero seven one'],
      ],
      callout: { kind: 'note', en: 'Read part numbers and ticket numbers letter by letter and digit by digit. Then ask the other person to read them back.' },
    },
    {
      type: 'quiz',
      title: '확인 퀴즈 (2) — 번호 불러 주기',
      intro: '위 빠른 참조 카드를 근거로 답하세요.',
      questions: [
        { prompt: "부품 번호 'KX-4071-B' 를 전화로 불러 줄 때 가장 안전한 것은?", opts: ['Kay ex four oh seven one bee', 'Kilo X-ray, four zero seven one, Bravo', 'KX four thousand seventy-one B'], ans: 1 },
        { prompt: "티켓 번호 'SR-20618' 을 불러 줄 때 S 를 무엇으로 읽나?", opts: ['Foxtrot', 'Echo', 'Sierra'], ans: 2 },
        { prompt: "'one point zero E minus five' 에서 'E minus' 를 빼먹고 'one point zero five'라고 들으면?", opts: ['값이 완전히 달라진다 — 1.0E-5 가 1.05 로', '같은 값이다', '단위만 달라진다'], ans: 0 },
      ],
    },
    {
      type: 'glossary',
      title: '핵심 용어 (3) — 티켓과 메일',
      intro: '지원 티켓과 메일의 칸 이름, 그리고 정중한 요청 표현입니다.',
      items: [
        { en: 'severity', ko: '긴급도', d: '지원팀이 순서를 정하는 등급 (S1~S4, 계약마다 정의)', ex: 'We opened the ticket as Severity 1 because the tool is down.' },
        { en: 'workaround', ko: '임시 우회 방법', d: '정식 해결 전에 일을 계속할 길', ex: 'ET-06 can run the same recipe, so we have a workaround.' },
        { en: 'impact', ko: '영향', d: '멈춘 시간 · 대기 lot 수 등 — 숫자로', ex: 'Impact: two lots on hold, about 50 wafers.' },
        { en: 'Could you …?', ko: '…해 주시겠어요?', d: '가장 기본의 정중한 요청', ex: 'Could you send an FSE on site tomorrow morning?' },
        { en: 'We need … by …', ko: '…까지 …이 필요합니다', d: '기한 — 이유(영향)와 함께', ex: 'We need the part by Nov 10 because the tool is down.' },
        { en: 'escalate', ko: '상위 단계로 올리다', d: '진전이 없을 때 정중하게', ex: 'Could we escalate this to Level 2 support?' },
      ],
    },
    {
      type: 'mansample',
      variant: 'email',
      title: '매뉴얼 표본 — 서비스 요청 메일',
      from: 'Jisu Park <jisu.park@fab.example>',
      to: 'Vendor Support <support@vendor.example>',
      subject: 'SR-20618 | ET-05 | Base pressure high since 23:05 | Tool down (S1)',
      lines: [
        'Hi Support team,',
        'This is Jisu Park from the etch night shift at Fab 2.',
        'What happened: Base pressure on ET-05 has been 4.2E-5 Torr since 23:05 KST (limit 1.0E-5). The tool is down.',
        'What we checked: We [ruled out] the gauge and the turbo pump. A leak at the lid O-ring is [suspected].',
        'Request: [Could you] send an FSE to inspect the lid seal, or advise on the next check?',
        'Impact: No other tool can run this recipe, and two lots are on hold. We would appreciate a reply [by] 06:00 KST.',
        'Attached: alarm log and pressure trend (last 12 h).',
      ],
      sign: 'Thank you for your support. Jisu Park (Etch, night shift)',
    },
    {
      type: 'quiz',
      title: '확인 퀴즈 (3) — 메일 읽기',
      intro: '위 서비스 요청 메일을 근거로 답하세요.',
      questions: [
        { prompt: "제목 'SR-20618 | ET-05 | Base pressure high since 23:05 | Tool down (S1)' 에 들어 있지 않은 것은?", opts: ['장비 ID', '증상이 시작된 시각', '교체할 부품 번호'], ans: 2 },
        { prompt: "'A leak at the lid O-ring is suspected.' 를 읽은 지원팀이 이해할 것은?", opts: ['누설은 아직 의심 단계 — 확정이 아니다', '누설이 확정되었다', '누설은 배제되었다'], ans: 0 },
        { prompt: "이 메일이 S1 인 근거로 쓴 사실은?", opts: ['보낸 사람이 야간 근무라서', '장비가 멈췄고 이 레시피를 돌릴 다른 장비가 없어서', '메일에 첨부가 있어서'], ans: 1 },
      ],
    },
    {
      type: 'glossary',
      title: '핵심 용어 (4) — 부품과 반송',
      intro: '부품 요청 · 반송 메일에 들어가는 말입니다.',
      items: [
        { en: 'part number (P/N)', ko: '부품 번호', d: '한 글자만 틀려도 다른 부품이 온다', ex: 'Please confirm P/N KX-4071-B before shipping.' },
        { en: 'lead time', ko: '납기', d: '주문에서 도착까지 걸리는 시간', ex: 'The lead time is three weeks, but there is one in stock in Singapore.' },
        { en: 'in stock', ko: '재고 있음', d: '바로 보낼 수 있음', ex: 'The O-ring kit is in stock and can ship today.' },
        { en: 'loaner', ko: '대여품', d: '수리 기간 동안 빌려 쓰는 부품', ex: 'Is a loaner available while our unit is repaired?' },
        { en: 'RMA number', ko: '반송 승인 번호', d: '없으면 장비사가 받지 않는다', ex: 'Write the RMA number on the outside of the box.' },
        { en: 'under warranty', ko: '보증 기간 안', d: '무상 수리 · 교체 대상', ex: 'The match unit is still under warranty until March.' },
      ],
    },
    {
      type: 'mansample',
      title: '매뉴얼 표본 — 부품 반송(RMA) 절차',
      doc: { name: 'Vendor Parts Return Guide', no: 'VPG-0102', sec: '2', rev: 'E', page: '2-1' },
      heading: '2  Returning a Failed Part',
      steps: [
        'Request an RMA number through the support portal before shipping.',
        { t: 'Include the SR number, P/N, serial number, and a short failure description.', note: { kind: 'note', en: 'Parts returned without an RMA number will be refused.' } },
        { t: 'Purge and clean the part if it was exposed to process gases.', note: { kind: 'warning', en: 'Attach a decontamination certificate. Contaminated parts shall not be shipped without it.' } },
        'Pack the part in the original packaging, and write the RMA number on the outside of the box.',
        'If you need a failure analysis, check "FA requested" on the RMA form.',
      ],
      callout: { kind: 'caution', en: 'Return the failed part within 30 days, or you may be charged for the replacement.' },
      gloss: [['serial number', '일련번호'], ['decontamination certificate', '오염 제거 확인서'], ['be refused', '거절되다'], ['be charged', '비용이 청구되다']],
    },
    {
      type: 'quiz',
      title: '확인 퀴즈 (4) — 반송 절차',
      intro: '위 부품 반송 절차 VPG-0102 를 근거로 판단하세요.',
      questions: [
        { prompt: "RMA 번호를 받기 전에 고장 부품을 먼저 보냈다. 어떻게 되나?", opts: ['장비사가 알아서 번호를 붙인다', '거절된다 — 번호 없이 보낸 부품은 받지 않는다', '보증이 늘어난다'], ans: 1 },
        { prompt: "공정 가스에 노출된 부품이다. 상자에 무엇을 붙여야 하나?", opts: ['영수증', '사진', '오염 제거 확인서(decontamination certificate)'], ans: 2 },
        { prompt: "'Return the failed part within 30 days, or you may be charged.' 40일 뒤에 보내면?", opts: ['교체품 비용이 청구될 수 있다', '아무 일도 없다', 'RMA 번호가 바뀐다'], ans: 0 },
      ],
    },
    {
      type: 'manual',
      mtitle: 'REMOTE SUPPORT CALL — A SAFE SCRIPT',
      paras: [
        'Hi, this is Jisu from Fab 2. I am calling about SR-20618, ET-05.',
        '해설: 시작 — 이름 · 소속 · 티켓 번호 · 장비 ID. 상대가 티켓을 여는 동안 기다린다.',
        'Sorry, did you say fifteen or fifty?',
        '해설: 헷갈리는 숫자는 두 후보를 같이 말해 고르게 한다.',
        'Let me read that back: reflected power limit, one-five watts, then restart the match.',
        '해설: 지시를 받으면 값과 순서를 그대로 되읽는다. 상대의 "That\'s correct" 를 들은 뒤에 실행한다.',
        'So the next step is a leak check at the lid, and I will call you back by 04:00 KST.',
        '해설: 끝낼 때 다음 할 일과 다음 연락 시각(시간대 포함)을 정한다.',
      ],
    },
    {
      type: 'manual',
      mtitle: 'TICKET SEVERITY — HOW TO CHOOSE (교재 예시)',
      paras: [
        'S1: The tool is down, and there is no workaround.',
        '해설: 장비 정지 + 같은 일을 할 대안 없음. 생산이 멈춘다.',
        'S2: The tool is down but a workaround exists, or wafers are at risk.',
        '해설: 정지했지만 다른 장비로 돌릴 수 있거나, 가동 중이어도 웨이퍼가 위험하다(예: 파티클 증가).',
        'S3: The tool is running, and there is no risk to wafers.',
        '해설: 가동 중 + 웨이퍼 위험 없음. 예: 화면 표시 오류, 저절로 풀리는 경고.',
        'S4: A question or a request for documents.',
        '해설: 질문 · 매뉴얼 · 교육 자료 요청. 실제 정의는 장비사와의 계약(SLA)을 따른다.',
      ],
    },
    {
      type: 'sim',
      which: 'vendor',
      mode: 'severity',
      intro: '먼저 **티켓 긴급도** 실습입니다. 상황 카드를 읽고 **S1 · S2 · S3 · S4** 중 하나를 고르세요(교재 예시 기준). 판단은 느낌이 아니라 세 가지 **사실**로 합니다: 장비가 멈췄나 · 대안이 있나 · 웨이퍼가 위험한가.',
    },
    {
      type: 'sim',
      which: 'vendor',
      mode: 'readback',
      intro: '다음은 **되읽기** 실습입니다. 지원 엔지니어가 전화로 불러 준 값이나 번호가 나옵니다. 가장 안전한 **되읽기(read back)** 를 고르세요 — 숫자는 **한 자리씩**, 0 은 **zero**, 글자는 **음성 기호**로.',
    },
    {
      type: 'sim',
      which: 'vendor',
      mode: 'email',
      intro: '마지막은 **서비스 요청 메일** 실습입니다. 메일을 칸(제목 · 인사 · 사실 · 확인한 것 · 요청 · 영향과 기한 · 맺음)으로 나눴습니다. 칸마다 **지원팀이 한 번에 알아듣는** 문장을 고르세요. 다 고르면 완성된 메일이 나옵니다.',
    },
    {
      type: 'comm',
      items: [
        { sit: '지원 엔지니어가 값을 불러 준다', q: { en: 'Set the reflected power limit to fifteen watts, then restart the match.', ko: '반사 전력 한계를 15 와트로 설정하고 매치를 재시작하세요.' }, a: { en: 'Let me read that back: reflected power limit, one-five watts, then restart the match. Is that correct?', ko: '다시 읽어 드릴게요: 반사 전력 한계 일-오 와트, 그다음 매치 재시작. 맞습니까?' } },
        { sit: '부품 번호를 확인한다', q: { en: 'The replacement part is K X four zero seven one B.', ko: '교체 부품은 K X 4 0 7 1 B 입니다.' }, a: { en: 'Copy. Kilo X-ray, four zero seven one, Bravo. Is it in stock, and what is the lead time to Korea?', ko: '알겠습니다. 킬로 엑스레이, 4 0 7 1, 브라보. 재고가 있나요, 한국까지 납기는 얼마인가요?' } },
        { sit: '진전이 없어 에스컬레이션을 요청한다', q: { en: 'We are still analyzing the logs. We will get back to you.', ko: '아직 로그를 분석 중입니다. 다시 연락드리겠습니다.' }, a: { en: 'Thank you. This is now impacting production: the tool has been down for six hours and two lots are on hold. Could we escalate this to Level 2 support?', ko: '감사합니다. 이제 생산에 영향이 있습니다 — 장비가 6시간째 멈췄고 두 lot 이 보류 중입니다. Level 2 지원으로 올려 주실 수 있을까요?' } },
      ],
    },
    {
      type: 'wrap',
      title: '정리 — 한 번에 알아듣게, 틀리지 않게',
      points: [
        '지원은 세 갈래: **ticket(SR) · call · email**. 모든 연락을 **티켓 번호**로 잇는다.',
        '티켓 제목 공식: **Tool ID | Symptom | Since when | Impact**. 긴급도는 느낌이 아니라 **사실**(정지 · 대안 · 웨이퍼 위험)로.',
        '통화: 못 들으면 **Could you repeat that?**, 헷갈리면 **Did you say … or …?**, 받으면 **Let me read that back.**',
        '숫자는 **한 자리씩**(one-five), 0 은 **zero**, 소수 · 지수는 **point · E minus**, 글자는 **Bravo · Delta · Mike · November**.',
        '부품: **P/N · Qty · lead time · RMA**. 재촉은 감정이 아니라 **영향을 숫자로** — 그리고 **Could we escalate this?**',
      ],
      done: '이제 여러분은 해외 지원팀과 **티켓 · 통화 · 메일**로 일할 때, 상대가 한 번에 알아듣게 쓰고 들은 것을 틀리지 않게 확인할 수 있습니다. **Say it once, read it back.**',
      figs: [
        { kind: 'step', title: 'BEFORE YOU HANG UP', items: [['[Read back] the values.', '되읽기'], ['Confirm the [next step].', '다음 할 일'], ['Agree on the [next call time].', '다음 연락 시각']] },
      ],
    },
  ],
};

export default CHAPTER;
