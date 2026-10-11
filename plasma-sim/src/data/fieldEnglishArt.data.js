/* 직무영어 삽화 — 실제 PNG 는 public/art/field-english/ 에 있고 여기서는 경로만 내보낸다.
 *
 * 예전에는 이 파일이 PNG 4장을 base64 data URI 로 품고 있었다(1.76 MB).
 * data URI 는 원본보다 33% 크고, JS 안에 있으므로
 *   · 메인 번들에 통째로 실려 첫 화면이 뜨기 전에 반드시 다운로드된다
 *   · 브라우저 이미지 캐시를 못 쓰고, 지연 로딩도 안 된다
 *   · 직무영어를 열지 않는 학생도 전부 받아야 한다
 * 파일로 빼면 직무영어 해당 슬라이드를 실제로 열 때만 받아오고,
 * firebase.json 의 이미지 캐시 헤더(max-age=31536000, immutable)도 적용된다.
 *
 * 경로를 절대 경로로 쓰는 이유 — firebase.json 의 rewrite 가 "**" 를 index.html 로
 * 보내므로, 상대 경로("./art/...")를 쓰면 깊은 주소에서 열었을 때 이미지 대신
 * index.html 이 돌아온다.
 */
const DIR = '/art/field-english';

export const ART = {
  chamber: `${DIR}/chamber.png`,
  layer:   `${DIR}/layer.png`,
  drc:     `${DIR}/drc.png`,
  lvs:     `${DIR}/lvs.png`,
};
