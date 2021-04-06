import * as superfine from "superfine";
import { version } from "../../../../package.json";
export type NotFoundRouteParameters = Record<string, never>;

export function notFoundRouteView(
  parameters: NotFoundRouteParameters
): superfine.ElementNode<`body`> {
  parameters;

  return superfine.h(`body`, {}, [
    superfine.h(`header`, {}, [
      superfine.h(`h1`, {}, [
        superfine.h(`a`, { href: `#` }, superfine.text(`SkitKit`)),
        superfine.h(`sub`, {}, superfine.text(`v${version}`)),
      ]),
    ]),
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
