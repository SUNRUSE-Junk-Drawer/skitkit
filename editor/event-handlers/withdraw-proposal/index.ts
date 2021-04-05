import { histories } from "../../histories";
import { refresh } from "../refresh";

const importedHistories = histories;
const importedRefresh = refresh;

export function withdrawProposal(skitUuid: string): void {
  importedHistories.setItem(skitUuid, {
    ...importedHistories.getItem(skitUuid),
    proposedStep: null,
  });

  importedRefresh();
}
