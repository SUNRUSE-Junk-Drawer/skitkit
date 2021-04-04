import { LocalStorageHelper } from "../local-storage-helper";
import { History, historySchema } from "../history";

export const histories = new LocalStorageHelper<History>(
  `histories`,
  `skitKitHistory`,
  historySchema
);
