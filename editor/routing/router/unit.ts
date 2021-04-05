import { Route } from "../route";
import { router } from ".";
import {
  skitListRouteView,
  SkitListRouteParameters,
} from "../routes/skits/skit-list-route";
import { homeRouteView } from "../routes/home-route";
import { notFoundRouteView } from "../routes/not-found-route";

describe(`router`, () => {
  describe(`no route`, () => {
    let route: Route<SkitListRouteParameters>;

    beforeAll(() => {
      route = router([]);
    });

    it(`uses the home view`, () => {
      expect(route.view).toBe(homeRouteView);
    });

    it(`does not include any parameters`, () => {
      expect(route.parameters).toEqual({});
    });
  });

  describe(`skit list`, () => {
    let route: Route<SkitListRouteParameters>;

    beforeAll(() => {
      route = router([`skits`]);
    });

    it(`uses the skit list view`, () => {
      expect(route.view).toBe(skitListRouteView);
    });

    it(`does not include any parameters`, () => {
      expect(route.parameters).toEqual({});
    });
  });

  describe(`unknown`, () => {
    let route: Route<SkitListRouteParameters>;

    beforeAll(() => {
      route = router([`unknown`]);
    });

    it(`uses the not found view`, () => {
      expect(route.view).toBe(notFoundRouteView);
    });

    it(`does not include any parameters`, () => {
      expect(route.parameters).toEqual({});
    });
  });
});
