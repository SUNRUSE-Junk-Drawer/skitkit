import * as superfine from "superfine";
import { parseHash } from "../../routing/parse-hash";
import { router } from "../../routing/router";

const importedPatch = superfine.patch;
const importedParseHash = parseHash;
const importedRouter = router;

export function refresh(): void {
  const route = importedRouter(importedParseHash(location.hash));

  importedPatch(document.body as HTMLBodyElement, route.view(route.parameters));
}
