import * as superfine from "superfine";
import { histories } from "../../histories";
import { parseHash } from "../../routing/parse-hash";
import { router } from "../../routing/router";

const importedPatch = superfine.patch;
const importedHistories = histories;
const importedParseHash = parseHash;
const importedRouter = router;

export function refresh(): void {
  const route = importedRouter(
    importedParseHash(location.hash),
    importedHistories
  );

  importedPatch(document.body as HTMLBodyElement, route.view(route.parameters));
}
