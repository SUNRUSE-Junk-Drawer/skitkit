import { Route } from "../route";
import { router } from ".";
import {
  skitListRouteView,
  SkitListRouteParameters,
} from "../routes/skits/skit-list-route";

describe(`router`, () => {
  describe(`default route`, () => {
    let route: Route<SkitListRouteParameters>;

    beforeAll(() => {
      route = router([]);
    });

    it(`uses the skit list view`, () => {
      expect(route.view).toBe(skitListRouteView);
    });

    it(`does not include any parameters`, () => {
      expect(route.parameters).toEqual({});
    });
  });
});
