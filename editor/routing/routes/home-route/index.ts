import * as superfine from "superfine";
import { header } from "../components/header";
export type HomeRouteParameters = Record<string, never>;

export function homeRouteView(
  parameters: HomeRouteParameters
): superfine.ElementNode<`body`> {
  parameters;

  return superfine.h(`body`, {}, [
    header([]),
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
