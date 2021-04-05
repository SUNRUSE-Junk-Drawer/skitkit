import * as superfine from "superfine";
import { parseHash } from "../../routing/parse-hash";
import { router } from "../../routing/router";

const importedPatch = superfine.patch;
const importedParseHash = parseHash;
const importedRouter = router;

export function refresh(): void {
  const route = importedRouter(importedParseHash(location.hash));

  const loosenedRoute = route as {
    readonly parameters: Record<string, unknown>;
    view(parameters: Record<string, unknown>): superfine.ElementNode<`body`>;
  };

  importedPatch(
    document.body as HTMLBodyElement,
    loosenedRoute.view(loosenedRoute.parameters)
  );
}
