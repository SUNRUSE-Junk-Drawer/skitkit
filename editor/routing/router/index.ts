import { Route } from "../route";
import { HomeRouteParameters, homeRouteView } from "../routes/home-route";
import {
  NotFoundRouteParameters,
  notFoundRouteView,
} from "../routes/not-found-route";
import {
  skitListRouteView,
  SkitListRouteParameters,
} from "../routes/skits/skit-list-route";
import { skitRouteView, SkitRouteParameters } from "../routes/skits/skit-route";

export function router(
  parsedHash: ReadonlyArray<string>
):
  | Route<HomeRouteParameters>
  | Route<NotFoundRouteParameters>
  | Route<SkitListRouteParameters>
  | Route<SkitRouteParameters> {
  parsedHash;

  if (parsedHash.length === 0) {
    return {
      parameters: {},
      view: homeRouteView,
    };
  } else {
    switch (parsedHash[0]) {
      case `skits`:
        if (parsedHash.length === 1) {
          return {
            parameters: {},
            view: skitListRouteView,
          };
        } else {
          return {
            parameters: {
              skitUuid: parsedHash[1],
            },
            view: skitRouteView,
          };
        }

      default:
        return {
          parameters: {
            breadcrumb: [],
          },
          view: notFoundRouteView,
        };
    }
  }
}
