import { HistorySchema } from "../history-schema";

export function undoHistory(history: HistorySchema): HistorySchema {
  return {
    beforeSteps: history.beforeSteps,
    doneSteps: history.doneSteps.slice(0, history.doneSteps.length - 1),
    undoneSteps: [
      history.doneSteps[history.doneSteps.length - 1],
      ...history.undoneSteps,
    ],
  };
}
