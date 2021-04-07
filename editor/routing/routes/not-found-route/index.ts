import * as superfine from "superfine";
import { header } from "../components/header";

export type NotFoundRouteParameters = {
  readonly breadcrumb: ReadonlyArray<readonly [string, string]>;
};

export function notFoundRouteView(
  parameters: NotFoundRouteParameters
): superfine.ElementNode<`body`> {
  return superfine.h(`body`, {}, [
    header(parameters.breadcrumb),
    superfine.h(
      `article`,
      {},
      superfine.h(
        `p`,
        { className: `error-message` },
        superfine.text(`The page you have requested cannot be found.`)
      )
    ),
  ]);
}
