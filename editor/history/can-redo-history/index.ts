import { HistorySchema } from "../history-schema";

export function canRedoHistory(history: HistorySchema): boolean {
  return history.undoneSteps.length > 0 && history.proposedStep === null;
}
