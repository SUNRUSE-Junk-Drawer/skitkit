import * as superfine from "superfine";
import { tryGetCurrentBySkitUuid } from "../../../../history/try-get-current-by-skit-uuid";
import { header } from "../../components/header";
import { notFoundRouteView } from "../../not-found-route";

export type SkitChildNotFoundRouteParameters = {
  readonly skitUuid: string;
};

const importedTryGetCurrentBySkitUuid = tryGetCurrentBySkitUuid;

export function skitChildNotFoundRouteView(
  parameters: SkitChildNotFoundRouteParameters
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
    return notFoundRouteView({
      breadcrumb: [
        [`#skits`, `Skits`],
        [`#skits/${parameters.skitUuid}`, state.name],
      ],
    });
  }
}
