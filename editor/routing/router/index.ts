import { Route } from "../route";
import {
  skitListRouteView,
  SkitListRouteParameters,
} from "../routes/skits/skit-list-route";

export function router(
  parsedHash: ReadonlyArray<string>
): Route<SkitListRouteParameters> {
  parsedHash;

  return {
    parameters: {},
    view: skitListRouteView,
  };
}
