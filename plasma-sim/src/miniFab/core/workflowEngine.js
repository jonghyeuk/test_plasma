// Workflow Engine
// 시나리오 step 진행 상태를 관리한다.
import { getScenario } from '../definitions/scenarios.js';

export const initWorkflow = (scenarioId) => {
  const scenario = getScenario(scenarioId);
  if (!scenario) throw new Error(`Unknown scenario_id: ${scenarioId}`);
  return {
    scenario_id: scenarioId,
    current_step: 1,
    completed: [],
    results: {}, // step -> measurement result
  };
};

export const isStepUnlocked = (workflow, step) => {
  if (step === 1) return true;
  return workflow.completed.includes(step - 1);
};

export const completeStep = (workflow, step, result = null) => {
  const next = { ...workflow, completed: [...workflow.completed, step] };
  if (result) next.results = { ...workflow.results, [step]: result };
  next.current_step = step + 1;
  return next;
};

export const getStepDef = (scenarioId, step) => {
  const scenario = getScenario(scenarioId);
  return scenario?.steps.find((s) => s.step === step);
};
