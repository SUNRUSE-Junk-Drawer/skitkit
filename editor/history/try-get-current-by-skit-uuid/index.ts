import { StateSchema } from "../../../schema/state-schema";
import { histories } from "../../histories";
import { getCurrentFromHistory } from "../get-current-from-history";

const importedHistories = histories;
const importedGetCurrentFromHistory = getCurrentFromHistory;

export function tryGetCurrentBySkitUuid(skitUuid: string): null | StateSchema {
  const history = importedHistories.tryGetItem(skitUuid);

  if (history === null) {
    return null;
  } else {
    return importedGetCurrentFromHistory(history);
  }
}
