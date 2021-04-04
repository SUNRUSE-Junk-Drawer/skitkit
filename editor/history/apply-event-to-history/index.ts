import { EventSchema } from "../../../schema/event-schema";
import { HistorySchema } from "../history-schema";
import { applyEvent } from "../../../apply-event";
import { stringifyEventApplicationError } from "../../../stringify-event-application-error";

export function applyEventToHistory(
  event: EventSchema,
  history: HistorySchema
): HistorySchema {
  let beforeSteps = history.beforeSteps;
  let doneSteps = history.doneSteps;

  if (history.doneSteps.length === 5) {
    const result = applyEvent(beforeSteps, history.doneSteps[0]);

    if (!result.successful) {
      throw new Error(stringifyEventApplicationError(result.error));
    }

    beforeSteps = result.state;
    doneSteps = doneSteps.slice(1);
  }

  doneSteps = [...doneSteps, event];

  return {
    beforeSteps,
    doneSteps,
    undoneSteps: [],
  };
}
