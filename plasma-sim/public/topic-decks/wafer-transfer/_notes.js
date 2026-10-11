/* ═══ 강의자 메모 바 + 음성 플레이어 ═══
   데크 안의 <script id="wt-notes" type="application/json"> 를 읽어 슬라이드(data-nid)마다
   아래 바를 붙인다. 바에는 ▶ 재생 / ⏸ 일시정지(같은 버튼) / ■ 정지, 한 줄 핵심, 키워드 칩, 남은 시간.
   음성 파일은 narration/<nid>.mp3 — 없으면 버튼이 비활성으로 "음성 없음" 을 보여 준다.
   슬라이드가 바뀌면 재생을 멈춘다(강의자가 넘겼는데 이전 설명이 계속 나오지 않게).
   단축키: P 재생/일시정지 · S 정지. (← → 스페이스는 데크 네비게이션이 쓴다) */
(function(){
  var blk=document.getElementById('wt-notes'); if(!blk) return;
  var NOTES; try{ NOTES=JSON.parse(blk.textContent); }catch(e){ return; }
  var audio=new Audio(), curNid=null, bars={};
  audio.preload='none';
  /* 강의 해설은 살짝 천천히(담당자 2026-10-07). 브라우저가 음높이는 유지한다. 파일을 다시 만들지 않고 재생 속도만 낮춘다. */
  var RATE=0.9; audio.defaultPlaybackRate=RATE; audio.playbackRate=RATE;
  var fmt=function(s){ s=Math.max(0,Math.round(s||0)); return Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); };

  document.querySelectorAll('.slide[data-nid]').forEach(function(sl){
    var nid=sl.getAttribute('data-nid'), n=NOTES[nid]; if(!n) return;
    var pad=sl.querySelector('.wt-pad'); if(!pad) return;
    sl.classList.add('has-notes');
    var bar=document.createElement('div'); bar.className='wt-notes';
    bar.innerHTML='<div class="nb"><button class="play" type="button" title="재생 / 일시정지 (P)">▶</button>'+
      '<button class="stop" type="button" title="정지 (S)">■</button></div>'+
      '<div class="nt"><div class="nk">'+(n.key||'')+'</div>'+
      '<div class="nw">'+(n.kw||[]).map(function(k){return '<span>'+k+'</span>';}).join('')+'</div></div>'+
      '<div class="nm">강의자 메모<b class="tm">'+(n.sec?fmt(n.sec):'—')+'</b></div>';
    pad.appendChild(bar);
    var play=bar.querySelector('.play'), stop=bar.querySelector('.stop'), tm=bar.querySelector('.tm'), meta=bar.querySelector('.nm');
    if(n.audio===false){ play.disabled=true; stop.disabled=true; meta.classList.add('err'); tm.textContent='음성 없음'; }
    bars[nid]={bar:bar,play:play,stop:stop,tm:tm,meta:meta,n:n};
    play.addEventListener('click',function(){ toggle(nid); });
    stop.addEventListener('click',function(){ stopAll(); });
  });

  function src(nid){ return 'narration/'+nid+'.mp3'; }
  function refresh(){
    Object.keys(bars).forEach(function(nid){ var b=bars[nid], on=(nid===curNid&&!audio.paused&&!audio.ended);
      b.play.textContent=on?'❚❚':'▶'; b.play.classList.toggle('playing',on);
      if(nid===curNid&&audio.duration&&isFinite(audio.duration)) b.tm.textContent=fmt(audio.currentTime)+' / '+fmt(audio.duration);
      else if(nid!==curNid) b.tm.textContent=b.n.sec?fmt(b.n.sec):(b.n.audio===false?'음성 없음':'—'); });
  }
  function toggle(nid){
    var b=bars[nid]; if(!b||b.play.disabled) return;
    if(curNid!==nid){ stopAll(); curNid=nid; audio.src=src(nid); audio.playbackRate=RATE; }
    if(audio.paused){ var p=audio.play(); if(p&&p.catch) p.catch(function(){ b.meta.classList.add('err'); b.tm.textContent='재생 실패'; }); }
    else audio.pause();
    refresh();
  }
  function stopAll(){ try{ audio.pause(); audio.currentTime=0; }catch(e){} refresh(); }
  audio.addEventListener('timeupdate',refresh); audio.addEventListener('ended',refresh);
  audio.addEventListener('play',refresh); audio.addEventListener('pause',refresh);
  audio.addEventListener('loadedmetadata',refresh);
  audio.addEventListener('error',function(){ var b=bars[curNid]; if(b){ b.meta.classList.add('err'); b.tm.textContent='음성 파일 없음'; b.play.disabled=true; b.stop.disabled=true; } });

  /* 슬라이드가 바뀌면 멈춘다 — 데크 네비게이션은 .slide.on 을 토글한다 */
  var mo=new MutationObserver(function(ms){
    ms.forEach(function(m){ var el=m.target; if(el.classList.contains('on')) return;
      if(el.getAttribute('data-nid')===curNid&&!audio.paused) stopAll(); });
  });
  document.querySelectorAll('.slide[data-nid]').forEach(function(sl){ mo.observe(sl,{attributes:true,attributeFilter:['class']}); });

  addEventListener('keydown',function(e){
    if(/INPUT|TEXTAREA/.test(e.target.tagName)) return;
    if(e.key==='p'||e.key==='P'){ var on=document.querySelector('.slide.on[data-nid]'); if(on&&bars[on.getAttribute('data-nid')]){ e.preventDefault(); toggle(on.getAttribute('data-nid')); } }
    if(e.key==='s'||e.key==='S'){ e.preventDefault(); stopAll(); }
  });

  /* 헤드리스 검증용 */
  window.WTN={toggle:toggle,stop:stopAll,audio:audio,bars:bars,get cur(){return curNid;}};
})();
