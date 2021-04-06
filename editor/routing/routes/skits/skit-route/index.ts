import * as superfine from "superfine";
import { version } from "../../../../../package.json";
import { histories } from "../../../../histories";
import { getCurrentFromHistory } from "../../../../history/get-current-from-history";

export type SkitRouteParameters = {
  readonly skitUuid: string;
};

const importedHistories = histories;

export function skitRouteView(
  parameters: SkitRouteParameters
): superfine.ElementNode<`body`> {
  const history = importedHistories.tryGetItem(parameters.skitUuid);

  if (history === null) {
    return superfine.h(`body`, {}, [
      superfine.h(`header`, {}, [
        superfine.h(`h1`, {}, [
          superfine.h(`a`, { href: `#` }, superfine.text(`SkitKit`)),
          superfine.h(`sub`, {}, superfine.text(`v${version}`)),
        ]),
        superfine.h(
          `nav`,
          {},
          superfine.h(`a`, { href: `#skits` }, superfine.text(`Skits`))
        ),
      ]),
      superfine.h(
        `article`,
        {},
        superfine.h(
          `p`,
          { className: `error-message` },
          superfine.text(`The skit you have requested cannot be found.`)
        )
      ),
    ]);
  } else {
    const state = getCurrentFromHistory(history);

    return superfine.h(`body`, {}, [
      superfine.h(`header`, {}, [
        superfine.h(`h1`, {}, [
          superfine.h(`a`, { href: `#` }, superfine.text(`SkitKit`)),
          superfine.h(`sub`, {}, superfine.text(`v${version}`)),
        ]),
        superfine.h(`nav`, {}, [
          superfine.h(`a`, { href: `#skits` }, superfine.text(`Skits`)),
          superfine.h(
            `a`,
            { href: `#skits/${parameters.skitUuid}` },
            superfine.text(state.name)
          ),
        ]),
      ]),
    ]);
  }
}
