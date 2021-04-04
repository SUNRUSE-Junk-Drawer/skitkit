import { HistorySchema } from "../../history/history-schema";
import { Route } from "../route";
import { LocalStorageHelperInterface } from "../../local-storage-helper";
import {
  skitListRouteView,
  SkitListRouteParameters,
} from "../routes/skits/skit-list-route";
import { getCurrentFromHistory } from "../../history/get-current-from-history";

export function router(
  histories: LocalStorageHelperInterface<HistorySchema>
): Route<SkitListRouteParameters> {
  return {
    parameters: {
      skits: histories
        .listKeys()
        .map((uuid) => ({
          uuid,
          name: getCurrentFromHistory(histories.getItem(uuid)).name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    },
    view: skitListRouteView,
  };
}
