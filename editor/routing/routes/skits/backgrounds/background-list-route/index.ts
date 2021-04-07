import * as superfine from "superfine";
import { tryGetCurrentBySkitUuid } from "../../../../../history/try-get-current-by-skit-uuid";
import { header } from "../../../components/header";
import { newBackground } from "./new-background";

export type BackgroundListRouteParameters = {
  readonly skitUuid: string;
};

const importedTryGetCurrentBySkitUuid = tryGetCurrentBySkitUuid;
const importedNewBackground = newBackground;

export function backgroundListRouteView(
  parameters: BackgroundListRouteParameters
): superfine.ElementNode<`body`> {
  const state = importedTryGetCurrentBySkitUuid(parameters.skitUuid);

  if (state === null) {
    return superfine.h(`body`, {}, [
      header([[`#skits`, `Skits`]]),
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
    let list: superfine.ElementNode<`div` | `ul`>;

    const backgrounds = Object.entries(state.backgrounds)
      .map((keyValue) => ({
        uuid: keyValue[0],
        name: keyValue[1].name,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (backgrounds.length === 0) {
      list = superfine.h(
        `div`,
        { className: `empty-list-message` },
        superfine.text(`You have not created any backgrounds.`)
      );
    } else {
      list = superfine.h(
        `ul`,
        { className: `text-list` },
        backgrounds.map((background) =>
          superfine.h(
            `li`,
            {},
            superfine.h(
              `a`,
              {
                href: `#skits/${parameters.skitUuid}/backgrounds/${background.uuid}`,
              },
              superfine.text(background.name)
            )
          )
        )
      );
    }

    return superfine.h(`body`, {}, [
      header([
        [`#skits`, `Skits`],
        [`#skits/${parameters.skitUuid}`, state.name],
        [`#skits/${parameters.skitUuid}/backgrounds`, `Backgrounds`],
      ]),
      superfine.h(`article`, {}, list),
      superfine.h(
        `footer`,
        {},
        superfine.h(
          `button`,
          { onclick: importedNewBackground(parameters.skitUuid) },
          superfine.text(`New Background`)
        )
      ),
    ]);
  }
}
