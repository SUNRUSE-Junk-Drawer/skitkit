import { HistorySchema } from "../history-schema";

export function redoHistory(history: HistorySchema): HistorySchema {
  return {
    beforeSteps: history.beforeSteps,
    doneSteps: [...history.doneSteps, history.undoneSteps[0]],
    undoneSteps: history.undoneSteps.slice(1),
  };
}
