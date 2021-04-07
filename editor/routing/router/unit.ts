import { Route } from "../route";
import { router } from ".";
import {
  skitListRouteView,
  SkitListRouteParameters,
} from "../routes/skits/skit-list-route";
import { HomeRouteParameters, homeRouteView } from "../routes/home-route";
import {
  NotFoundRouteParameters,
  notFoundRouteView,
} from "../routes/not-found-route";
import { SkitRouteParameters, skitRouteView } from "../routes/skits/skit-route";

describe(`router`, () => {
  describe(`no route`, () => {
    let route:
      | Route<HomeRouteParameters>
      | Route<NotFoundRouteParameters>
      | Route<SkitListRouteParameters>
      | Route<SkitRouteParameters>;

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
    let route:
      | Route<HomeRouteParameters>
      | Route<NotFoundRouteParameters>
      | Route<SkitListRouteParameters>
      | Route<SkitRouteParameters>;

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

  describe(`skit`, () => {
    let route:
      | Route<HomeRouteParameters>
      | Route<NotFoundRouteParameters>
      | Route<SkitListRouteParameters>
      | Route<SkitRouteParameters>;

    beforeAll(() => {
      route = router([`skits`, `Test Skit Uuid`]);
    });

    it(`uses the skit view`, () => {
      expect(route.view).toBe(skitRouteView);
    });

    it(`includes the skit UUID as a parameter`, () => {
      expect(route.parameters).toEqual({ skitUuid: `Test Skit Uuid` });
    });
  });

  describe(`unknown`, () => {
    let route:
      | Route<HomeRouteParameters>
      | Route<NotFoundRouteParameters>
      | Route<SkitListRouteParameters>
      | Route<SkitRouteParameters>;

    beforeAll(() => {
      route = router([`unknown`]);
    });

    it(`uses the not found view`, () => {
      expect(route.view).toBe(notFoundRouteView);
    });

    it(`uses an empty breadcrumb`, () => {
      expect(route.parameters).toEqual({
        breadcrumb: [],
      });
    });
  });
});
