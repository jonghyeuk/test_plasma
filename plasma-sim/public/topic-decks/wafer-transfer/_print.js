/* ═══ 챕터 PDF 저장 ═══
   버튼을 누르면 챕터 전체 슬라이드가 한 장씩 담긴 인쇄본이 나온다.
   브라우저 인쇄 대화상자에서 "대상 → PDF로 저장" 을 고르면 파일로 받는다.

   시뮬레이터 안(iframe)에서는 프레임만 인쇄하는 동작이 브라우저마다 달라서,
   같은 챕터를 ?print=1 로 새 탭에 열어 거기서 인쇄한다. */
(function(){
  var QP = new URLSearchParams(location.search);

  function printNow(){
    try{ window.focus(); }catch(e){}
    window.print();
  }

  var btn = document.createElement('button');
  btn.id = 'wtprint';
  btn.type = 'button';
  btn.textContent = '📄 PDF 저장';
  btn.title = '이 챕터 전체를 PDF 로 저장합니다 (인쇄 대화상자에서 대상 → PDF로 저장)';
  btn.style.cssText =
    'position:fixed;right:16px;bottom:16px;z-index:12;'+
    'font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace;font-size:13px;font-weight:700;'+
    'background:#35e0c8;color:#03231e;border:0;border-radius:7px;padding:9px 15px;'+
    'cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.45)';
  btn.onclick = function(){
    if(window.top !== window.self){
      window.open(location.pathname + '?print=1', '_blank', 'noopener');
    } else {
      printNow();
    }
  };
  document.body.appendChild(btn);

  // ?print=1 로 열렸으면 글꼴과 그림이 자리잡은 뒤 바로 인쇄 대화상자를 띄운다
  if(QP.get('print') === '1'){
    var fired = false;
    var go = function(){ if(fired) return; fired = true; setTimeout(printNow, 350); };
    if(document.fonts && document.fonts.ready){ document.fonts.ready.then(go); setTimeout(go, 2500); }
    else if(document.readyState === 'complete'){ go(); }
    else { addEventListener('load', go); }
  }
})();
