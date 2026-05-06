// Recipe I/O
// sample.history 자체가 recipe (process_id + params 시퀀스).
// 외부로 내보내고/불러와 시편을 재구성한다.
import { createInitialSample } from './sampleStateEngine.js';
import { runProcess } from './processRuleEngine.js';

export const buildRecipe = (sample, scenarioId = null) => ({
  format: 'minifab.recipe.v1',
  scenario_id: scenarioId,
  exported_at: new Date().toISOString(),
  steps: (sample.history || []).map((h) => ({
    process_id: h.process_id,
    params: h.params,
  })),
});

export const downloadRecipe = (recipe, filename = 'recipe.json') => {
  const blob = new Blob([JSON.stringify(recipe, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Recipe → fresh sample 재구성
export const replayRecipe = (recipe) => {
  if (!recipe || !Array.isArray(recipe.steps)) {
    throw new Error('Invalid recipe format.');
  }
  let sample = createInitialSample();
  const replayNotes = [];
  for (const step of recipe.steps) {
    try {
      const { sample: next, notes } = runProcess(sample, step.process_id, step.params || {});
      sample = next;
      replayNotes.push({ process_id: step.process_id, params: step.params, notes });
    } catch (e) {
      replayNotes.push({ process_id: step.process_id, error: e.message });
    }
  }
  return { sample, replayNotes };
};

export const parseRecipeFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try { resolve(JSON.parse(reader.result)); }
      catch (e) { reject(e); }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
