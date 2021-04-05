import { Route } from "../route";
import { router } from ".";
import {
  skitListRouteView,
  SkitListRouteParameters,
} from "../routes/skits/skit-list-route";

describe(`router`, () => {
  describe(`default route`, () => {
    let historiesTryGetItem: jasmine.Spy;
    let historiesGetItem: jasmine.Spy;
    let historiesSetItem: jasmine.Spy;
    let historiesRemoveItem: jasmine.Spy;
    let historiesListKeys: jasmine.Spy;
    let route: Route<SkitListRouteParameters>;

    beforeAll(() => {
      historiesTryGetItem = jasmine.createSpy(`historiesTryGetItem`);
      historiesGetItem = jasmine
        .createSpy(`historiesGetItem`)
        .and.callFake((key) => {
          switch (key) {
            case `5e6a1c25-6eb1-4ffd-bb4f-4a641fa6f113`:
              return {
                beforeSteps: {
                  name: `Test Name G`,
                  backgrounds: {},
                  characters: {},
                  emotes: {},
                  scenes: {},
                  lines: {},
                },
                doneSteps: [
                  {
                    type: `updateName`,
                    name: `Test Name C`,
                  },
                  {
                    type: `updateName`,
                    name: `Test Name E`,
                  },
                ],
                undoneSteps: [
                  {
                    type: `updateName`,
                    name: `Test Name A`,
                  },
                ],
              };
            case `4c4c3e22-8ea3-4735-b828-7aeb064d0465`:
              return {
                beforeSteps: {
                  name: `Test Name A`,
                  backgrounds: {},
                  characters: {},
                  emotes: {},
                  scenes: {},
                  lines: {},
                },
                doneSteps: [],
                undoneSteps: [],
              };
            case `3be6883d-9236-4247-9461-b5c113c5e172`:
              return {
                beforeSteps: {
                  name: `Test Name H`,
                  backgrounds: {},
                  characters: {},
                  emotes: {},
                  scenes: {},
                  lines: {},
                },
                doneSteps: [],
                undoneSteps: [],
              };
          }

          throw new Error(`Unexpected key "${key}".`);
        });
      historiesSetItem = jasmine.createSpy(`historiesSetItem`);
      historiesRemoveItem = jasmine.createSpy(`historiesRemoveItem`);
      historiesListKeys = jasmine
        .createSpy(`historiesListKeys`)
        .and.returnValue([
          `5e6a1c25-6eb1-4ffd-bb4f-4a641fa6f113`,
          `4c4c3e22-8ea3-4735-b828-7aeb064d0465`,
          `3be6883d-9236-4247-9461-b5c113c5e172`,
        ]);

      const histories = {
        tryGetItem: historiesTryGetItem,
        getItem: historiesGetItem,
        setItem: historiesSetItem,
        removeItem: historiesRemoveItem,
        listKeys: historiesListKeys,
      };

      route = router([], histories);
    });

    it(`lists all keys in the histories`, () => {
      expect(historiesListKeys).toHaveBeenCalledTimes(1);
    });

    it(`does not try to get any items of the histories collection`, () => {
      expect(historiesTryGetItem).not.toHaveBeenCalled();
    });

    it(`gets each item of the histories collection`, () => {
      expect(historiesGetItem).toHaveBeenCalledWith(
        `5e6a1c25-6eb1-4ffd-bb4f-4a641fa6f113`
      );
      expect(historiesGetItem).toHaveBeenCalledWith(
        `4c4c3e22-8ea3-4735-b828-7aeb064d0465`
      );
      expect(historiesGetItem).toHaveBeenCalledWith(
        `3be6883d-9236-4247-9461-b5c113c5e172`
      );
    });

    it(`gets no further items from the histories collection`, () => {
      expect(historiesGetItem).toHaveBeenCalledTimes(3);
    });

    it(`does not set any items in the histories collection`, () => {
      expect(historiesSetItem).not.toHaveBeenCalled();
    });

    it(`does not remove any items from the histories collection`, () => {
      expect(historiesRemoveItem).not.toHaveBeenCalled();
    });

    it(`uses the skit list view`, () => {
      expect(route.view).toBe(skitListRouteView);
    });

    describe(`parameters`, () => {
      it(`includes the uuids and names of the skits in name order`, () => {
        expect(route.parameters.skits).toEqual([
          {
            uuid: `4c4c3e22-8ea3-4735-b828-7aeb064d0465`,
            name: `Test Name A`,
          },
          {
            uuid: `5e6a1c25-6eb1-4ffd-bb4f-4a641fa6f113`,
            name: `Test Name E`,
          },
          {
            uuid: `3be6883d-9236-4247-9461-b5c113c5e172`,
            name: `Test Name H`,
          },
        ]);
      });
    });
  });
});
