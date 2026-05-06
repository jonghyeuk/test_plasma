// Process Rule Engine
// process_id를 받아 정의된 apply()를 실행해 sample 상태를 갱신한다.
import { getProcess } from '../definitions/processes.js';
import { cloneSample } from './sampleStateEngine.js';

export const runProcess = (sample, processId, params) => {
  const def = getProcess(processId);
  if (!def) {
    throw new Error(`Unknown process_id: ${processId}`);
  }
  const next = cloneSample(sample);
  const notes = def.apply(next, params || {}) || [];
  return { sample: next, notes };
};

export const listProcessParameters = (processId) => {
  const def = getProcess(processId);
  return def?.parameters || [];
};
