import * as superfine from "superfine";
import { version } from "../../../../package.json";
export type HomeRouteParameters = Record<string, never>;

export function homeRouteView(
  parameters: HomeRouteParameters
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
      superfine.h(`ul`, { className: `text-list` }, [
        superfine.h(
          `li`,
          {},
          superfine.h(`a`, { href: `#skits` }, superfine.text(`Skits`))
        ),
      ])
    ),
  ]);
}
