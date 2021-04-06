import { StateSchema } from "../../../schema/state-schema";
import { histories } from "../../histories";
import { getCurrentFromHistory } from "../get-current-from-history";

const importedHistories = histories;
const importedGetCurrentFromHistory = getCurrentFromHistory;

export function getCurrentBySkitUuid(skitUuid: string): StateSchema {
  return importedGetCurrentFromHistory(importedHistories.getItem(skitUuid));
}
