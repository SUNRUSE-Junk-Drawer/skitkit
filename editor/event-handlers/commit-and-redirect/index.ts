import { EventSchema } from "../../../schema/event-schema";
import { histories } from "../../histories";
import { applyEventToHistory } from "../../history/apply-event-to-history";
import { navigate } from "../../navigate";

const importedHistories = histories;
const importedApplyEventToHistory = applyEventToHistory;
const importedNavigate = navigate;

export function commitAndRedirect(
  skitUuid: string,
  event: EventSchema,
  hash: string
): void {
  importedHistories.setItem(
    skitUuid,
    importedApplyEventToHistory(event, importedHistories.getItem(skitUuid))
  );

  importedNavigate(hash);
}
