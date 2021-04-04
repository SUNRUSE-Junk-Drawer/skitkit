import { HistorySchema } from "../history-schema";

export function canUndoHistory(history: HistorySchema): boolean {
  return history.doneSteps.length > 0;
}
