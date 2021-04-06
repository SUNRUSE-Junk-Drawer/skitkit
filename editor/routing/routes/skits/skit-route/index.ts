import * as superfine from "superfine";
import { version } from "../../../../../package.json";
import { tryGetCurrentBySkitUuid } from "../../../../history/try-get-current-by-skit-uuid";

export type SkitRouteParameters = {
  readonly skitUuid: string;
};

const importedTryGetCurrentBySkitUuid = tryGetCurrentBySkitUuid;

export function skitRouteView(
  parameters: SkitRouteParameters
): superfine.ElementNode<`body`> {
  const state = importedTryGetCurrentBySkitUuid(parameters.skitUuid);

  if (state === null) {
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
