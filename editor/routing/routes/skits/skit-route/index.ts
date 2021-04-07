import * as superfine from "superfine";
import { tryGetCurrentBySkitUuid } from "../../../../history/try-get-current-by-skit-uuid";
import { header } from "../../components/header";

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
    return superfine.h(`body`, {}, [
      header([
        [`#skits`, `Skits`],
        [`#skits/${parameters.skitUuid}`, state.name],
      ]),
    ]);
  }
}
