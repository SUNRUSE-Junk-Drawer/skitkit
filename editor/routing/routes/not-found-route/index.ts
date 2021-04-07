import * as superfine from "superfine";
import { header } from "../components/header";
export type NotFoundRouteParameters = Record<string, never>;

export function notFoundRouteView(
  parameters: NotFoundRouteParameters
): superfine.ElementNode<`body`> {
  parameters;

  return superfine.h(`body`, {}, [
    header([]),
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
