import { Route } from "../route";
import { HomeRouteParameters, homeRouteView } from "../routes/home-route";
import {
  NotFoundRouteParameters,
  notFoundRouteView,
} from "../routes/not-found-route";
import {
  BackgroundListRouteParameters,
  backgroundListRouteView,
} from "../routes/skits/backgrounds/background-list-route";
import {
  skitListRouteView,
  SkitListRouteParameters,
} from "../routes/skits/skit-list-route";
import {
  skitChildNotFoundRouteView,
  SkitChildNotFoundRouteParameters,
} from "../routes/skits/skit-child-not-found-route";
import { skitRouteView, SkitRouteParameters } from "../routes/skits/skit-route";

export function router(
  parsedHash: ReadonlyArray<string>
):
  | Route<HomeRouteParameters>
  | Route<NotFoundRouteParameters>
  | Route<SkitListRouteParameters>
  | Route<SkitRouteParameters>
  | Route<BackgroundListRouteParameters>
  | Route<SkitChildNotFoundRouteParameters> {
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
        } else if (parsedHash.length === 2) {
          return {
            parameters: {
              skitUuid: parsedHash[1],
            },
            view: skitRouteView,
          };
        } else {
          switch (parsedHash[2]) {
            case `backgrounds`:
              return {
                parameters: {
                  skitUuid: parsedHash[1],
                },
                view: backgroundListRouteView,
              };

            default:
              return {
                parameters: {
                  skitUuid: parsedHash[1],
                },
                view: skitChildNotFoundRouteView,
              };
          }
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
