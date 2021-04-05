import { EventSchema } from "../../../schema/event-schema";
import { histories } from "../../histories";
import { applyEventToHistory } from "../../history/apply-event-to-history";
import { refresh } from "../refresh";

const importedHistories = histories;
const importedApplyEventToHistory = applyEventToHistory;
const importedRefresh = refresh;

export function commit(skitUuid: string, event: EventSchema): void {
  importedHistories.setItem(
    skitUuid,
    importedApplyEventToHistory(event, importedHistories.getItem(skitUuid))
  );

  importedRefresh();
}
