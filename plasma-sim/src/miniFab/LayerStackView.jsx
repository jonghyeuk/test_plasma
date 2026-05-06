// Layer Stack Cross-Section Viewer
// 시편 상태를 SVG로 시각화. 시편 중심 철학을 직관적으로 보여준다.
const MATERIAL_STYLE = {
  Si: { fill: '#475569', label: 'Si' },
  SiO2: { fill: '#38bdf8', label: 'SiO₂' },
  SiN: { fill: '#14b8a6', label: 'SiN' },
  Al: { fill: '#cbd5e1', label: 'Al' },
  Cu: { fill: '#f97316', label: 'Cu' },
  Ti: { fill: '#94a3b8', label: 'Ti' },
  PR: { fill: '#f472b6', label: 'PR' },
};

// 두께 nm → 시각 높이 px (sqrt scale로 압축)
const visHeight = (nm) => Math.max(8, Math.round(8 + Math.sqrt(nm) * 3.5));

// 패터닝된 layer 시각화: 3개의 stripe로 표현
const Stripes = ({ x, y, w, h, fill }) => {
  const lineW = w / 7;
  return (
    <g>
      {[0, 2, 4].map((i) => (
        <rect key={i} x={x + i * lineW} y={y} width={lineW} height={h} fill={fill} />
      ))}
    </g>
  );
};

export default function LayerStackView({ sample }) {
  const W = 280;
  const margin = { top: 18, right: 100, bottom: 6, left: 12 };
  const stackW = W - margin.left - margin.right;

  // 기판: 항상 표시
  const substrateH = 60;
  // layer 스택 (오래된 것이 아래)
  const layers = sample.layers || [];

  // 전체 높이 계산
  const layerHeights = layers.map((l) => visHeight(l.thickness_nm));
  const prVisible = sample.photo?.pr_status === 'coated' || sample.photo?.pr_status === 'patterned';
  const prThickness = sample.photo?.pr_thickness_nm || 1500;
  const prH = prVisible ? Math.min(40, visHeight(prThickness) * 0.6) : 0;

  const stackTotal = layerHeights.reduce((a, b) => a + b, 0) + prH;
  const totalH = margin.top + stackTotal + substrateH + margin.bottom;

  // 그리기: 위에서부터 아래로
  let cursorY = margin.top;
  const elements = [];
  const annotations = [];

  // PR 레이어
  if (prVisible) {
    const style = MATERIAL_STYLE.PR;
    const isPatterned = sample.photo.pr_status === 'patterned';
    if (isPatterned) {
      elements.push(<Stripes key="pr" x={margin.left} y={cursorY} w={stackW} h={prH} fill={style.fill} />);
    } else {
      elements.push(<rect key="pr" x={margin.left} y={cursorY} width={stackW} height={prH} fill={style.fill} opacity={0.85} />);
    }
    annotations.push({
      y: cursorY + prH / 2,
      text: `PR ${prThickness}nm${isPatterned ? ' · patterned' : ''}`,
      color: '#fbcfe8',
    });
    cursorY += prH;
  }

  // 박막 layers (위에서부터 = 최신)
  [...layers].reverse().forEach((layer, i) => {
    const style = MATERIAL_STYLE[layer.material] || { fill: '#64748b', label: layer.material };
    const h = layerHeights[layers.length - 1 - i];
    if (layer.patterned) {
      elements.push(<Stripes key={`L${i}`} x={margin.left} y={cursorY} w={stackW} h={h} fill={style.fill} />);
    } else {
      elements.push(<rect key={`L${i}`} x={margin.left} y={cursorY} width={stackW} height={h} fill={style.fill} />);
    }
    const uniformity = layer.uniformity ? ` · ${layer.uniformity}` : '';
    annotations.push({
      y: cursorY + h / 2,
      text: `${style.label} ${layer.thickness_nm}nm${uniformity}${layer.patterned ? ' · patterned' : ''}`,
      color: '#e2e8f0',
    });
    cursorY += h;
  });

  // 기판
  const subStyle = MATERIAL_STYLE.Si;
  elements.push(
    <rect key="sub" x={margin.left} y={cursorY} width={stackW} height={substrateH} fill={subStyle.fill} />
  );

  // Junction (n-region) 시각화: 기판 상단에 음영
  if (sample.junction) {
    const depth = Math.min(substrateH * 0.6, (sample.junction.n_depth_nm || sample.junction.p_depth_nm || 50) * 0.3);
    elements.push(
      <rect key="junc" x={margin.left} y={cursorY} width={stackW} height={depth}
        fill="url(#junc-grad)" opacity={0.85} />
    );
    annotations.push({
      y: cursorY + depth / 2,
      text: `${sample.junction.type} junction (act ${sample.junction.activation_pct ?? 0}%)`,
      color: '#fef3c7',
    });
  } else if (sample.implant) {
    const depth = Math.min(substrateH * 0.5, (sample.implant.projected_range_nm || 30) * 0.4);
    elements.push(
      <rect key="impl" x={margin.left} y={cursorY} width={stackW} height={depth}
        fill="url(#impl-grad)" opacity={0.7} />
    );
    annotations.push({
      y: cursorY + depth / 2,
      text: `${sample.implant.dopant} implant (no anneal)`,
      color: '#fbbf24',
    });
  }
  annotations.push({
    y: cursorY + substrateH * 0.75,
    text: `${sample.base.substrate} ${sample.base.type} ⟨${sample.base.orientation}⟩`,
    color: '#cbd5e1',
  });

  // 결함 표시 (상단에 작은 마커)
  if (sample.defects?.bridge) {
    elements.push(<circle key="brg" cx={margin.left + 10} cy={margin.top - 6} r={4} fill="#f43f5e" />);
  }
  if (sample.defects?.open) {
    elements.push(<circle key="opn" cx={margin.left + 24} cy={margin.top - 6} r={4} fill="#f59e0b" />);
  }
  if (sample.defects?.particle && !['none', 'very_low'].includes(sample.defects.particle)) {
    elements.push(<circle key="prt" cx={margin.left + 38} cy={margin.top - 6} r={3} fill="#a3a3a3" />);
  }
  if (sample.surface?.plasma_damage && !['none', 'very_low'].includes(sample.surface.plasma_damage)) {
    elements.push(<rect key="dmg" x={margin.left + 50} y={margin.top - 9} width={8} height={5} fill="#a78bfa" />);
  }

  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
      <div className="text-xs font-bold text-cyan-400 mb-2 flex justify-between">
        <span>Layer Stack (cross-section)</span>
        <span className="font-normal text-gray-500">
          {layers.length} layer{layers.length !== 1 ? 's' : ''}
        </span>
      </div>
      <svg width={W} height={totalH} className="w-full">
        <defs>
          <linearGradient id="junc-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fde68a" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="impl-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {elements}
        {annotations.map((a, i) => (
          <text key={`a${i}`}
            x={W - margin.right + 6} y={a.y}
            dominantBaseline="middle"
            fontSize="10" fill={a.color} fontFamily="monospace"
          >
            {a.text}
          </text>
        ))}
      </svg>
      <div className="flex flex-wrap gap-2 mt-2 text-[10px] text-gray-500">
        {sample.defects?.bridge && <span className="text-rose-300">● bridge</span>}
        {sample.defects?.open && <span className="text-amber-300">● open</span>}
        {sample.defects?.particle && !['none', 'very_low'].includes(sample.defects.particle) && (
          <span className="text-gray-300">● particle</span>
        )}
        {sample.surface?.plasma_damage && !['none', 'very_low'].includes(sample.surface.plasma_damage) && (
          <span className="text-violet-300">▪ plasma damage</span>
        )}
        {!sample.defects?.bridge && !sample.defects?.open && (
          <span className="text-emerald-400">결함 표시 없음</span>
        )}
      </div>
    </div>
  );
}
