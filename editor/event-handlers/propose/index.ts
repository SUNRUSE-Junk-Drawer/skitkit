import { EventSchema } from "../../../schema/event-schema";
import { histories } from "../../histories";
import { refresh } from "../refresh";

const importedHistories = histories;
const importedRefresh = refresh;

export function propose(skitUuid: string, event: EventSchema): void {
  importedHistories.setItem(skitUuid, {
    ...importedHistories.getItem(skitUuid),
    proposedStep: event,
  });

  importedRefresh();
}
