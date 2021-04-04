import { LocalStorageHelper } from "../local-storage-helper";
import { HistorySchema, historySchema } from "../history/history-schema";

export const histories = new LocalStorageHelper<HistorySchema>(
  `histories`,
  `skitKitHistory`,
  historySchema
);
