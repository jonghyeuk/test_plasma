// Measurement Engine
// 측정 장비별 measure() 함수를 호출하여 장비 관점의 결과를 반환한다.
import { getMeasurement } from '../definitions/measurements.js';

export const runMeasurement = (sample, measurementId, params) => {
  const def = getMeasurement(measurementId);
  if (!def) throw new Error(`Unknown measurement_id: ${measurementId}`);
  return def.measure(sample, params || {});
};
