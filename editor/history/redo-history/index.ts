import { HistorySchema } from "../history-schema";

export function redoHistory(history: HistorySchema): HistorySchema {
  return {
    ...history,
    doneSteps: [...history.doneSteps, history.undoneSteps[0]],
    proposedStep: null,
    undoneSteps: history.undoneSteps.slice(1),
  };
}
