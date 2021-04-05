import { Route } from "../route";
import { homeRouteView } from "../routes/home-route";
import { notFoundRouteView } from "../routes/not-found-route";
import {
  skitListRouteView,
  SkitListRouteParameters,
} from "../routes/skits/skit-list-route";

export function router(
  parsedHash: ReadonlyArray<string>
): Route<SkitListRouteParameters> {
  parsedHash;

  if (parsedHash.length === 0) {
    return {
      parameters: {},
      view: homeRouteView,
    };
  } else {
    switch (parsedHash[0]) {
      case `skits`:
        return {
          parameters: {},
          view: skitListRouteView,
        };

      default:
        return {
          parameters: {},
          view: notFoundRouteView,
        };
    }
  }
}
