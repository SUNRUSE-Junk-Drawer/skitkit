import { HistorySchema } from "../history-schema";
import { StateSchema } from "../../../schema/state-schema";
import { applyEvent } from "../../../apply-event";
import { stringifyEventApplicationError } from "../../../stringify-event-application-error";
import { EventSchema } from "../../../schema/event-schema";

export function getCurrentFromHistory(history: HistorySchema): StateSchema {
  let current = history.beforeSteps;

  function apply(step: EventSchema): void {
    const result = applyEvent(current, step);

    if (!result.successful) {
      throw new Error(stringifyEventApplicationError(result.error));
    }

    current = result.state;
  }

  history.doneSteps.forEach(apply);

  if (history.proposedStep !== null) {
    apply(history.proposedStep);
  }

  return current;
}
