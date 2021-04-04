import * as superfine from "superfine";
import { histories } from "../../histories";
import { router } from "../../routing/router";

const importedPatch = superfine.patch;
const importedHistories = histories;
const importedRouter = router;

export function refresh(): void {
  const route = importedRouter(importedHistories);

  importedPatch(document.body as HTMLBodyElement, route.view(route.parameters));
}
