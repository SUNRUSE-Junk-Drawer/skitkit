import rewire = require("rewire");
import { histories } from "../../histories";
import { refresh } from "../refresh";

describe(`propose`, () => {
  describe(`imports`, () => {
    let propose: { __get__(name: string): unknown };

    beforeAll(() => {
      propose = rewire(`.`);
    });

    it(`histories`, () => {
      expect(propose.__get__(`importedHistories`)).toBe(histories);
    });

    it(`refresh`, () => {
      expect(propose.__get__(`importedRefresh`)).toBe(refresh);
    });
  });

  describe(`on execution`, () => {
    let historiesTryGetItem: jasmine.Spy;
    let historiesGetItem: jasmine.Spy;
    let historiesSetItem: jasmine.Spy;
    let historiesRemoveItem: jasmine.Spy;
    let historiesListKeys: jasmine.Spy;
    let refresh: jasmine.Spy;

    beforeAll(() => {
      const propose = rewire(`.`);

      historiesTryGetItem = jasmine.createSpy(`historiesTryGetItem`);

      historiesGetItem = jasmine.createSpy(`historiesGetItem`).and.returnValue({
        beforeSteps: {
          name: `Test Name`,
          backgrounds: {
            "9a8e4994-8f94-4843-b28c-29c38cd1b365": {
              name: `Test Background Name`,
              svg: `Test Svg`,
            },
          },
          characters: {},
          emotes: {},
          scenes: {},
          lines: {},
        },
        doneSteps: [
          {
            type: `createBackground`,
            backgroundUuid: `949de1e2-2649-44e7-a73c-b90cb68813b5`,
          },
          {
            type: `createBackground`,
            backgroundUuid: `6a9337f4-e41d-432f-a00a-231f5b6e8775`,
          },
          {
            type: `createBackground`,
            backgroundUuid: `ed185ecf-2791-4124-ad32-6de063eb4d2e`,
          },
          {
            type: `createBackground`,
            backgroundUuid: `80bedd32-2e7b-495f-8fba-408903017884`,
          },
          {
            type: `createBackground`,
            backgroundUuid: `0c82de84-7665-4221-a57f-48411a0a0611`,
          },
        ],
        proposedStep: null,
        undoneSteps: [
          {
            type: `updateName`,
            name: `Test Updated Name A`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
        ],
      });

      historiesSetItem = jasmine.createSpy(`historiesSetItem`);
      historiesRemoveItem = jasmine.createSpy(`historiesRemoveItem`);
      historiesListKeys = jasmine.createSpy(`historiesListKeys`);
      propose.__set__(`importedHistories`, {
        tryGetItem: historiesTryGetItem,
        getItem: historiesGetItem,
        setItem: historiesSetItem,
        removeItem: historiesRemoveItem,
        listKeys: historiesListKeys,
      });

      refresh = jasmine.createSpy(`refresh`);
      propose.__set__(`importedRefresh`, refresh);

      propose.__get__(`propose`)(`Test Skit Uuid`, {
        type: `updateName`,
        name: `Test Name`,
      });
    });

    it(`does not list keys of the histories collection`, () => {
      expect(historiesListKeys).not.toHaveBeenCalled();
    });

    it(`does not remove items from the histories collection`, () => {
      expect(historiesRemoveItem).not.toHaveBeenCalled();
    });

    it(`does not try to get any items of the histories collection`, () => {
      expect(historiesTryGetItem).not.toHaveBeenCalled();
    });

    it(`gets one item of history`, () => {
      expect(historiesGetItem).toHaveBeenCalledTimes(1);
    });

    it(`gets the skit from history`, () => {
      expect(historiesGetItem).toHaveBeenCalledWith(`Test Skit Uuid`);
    });

    it(`sets one item of history`, () => {
      expect(historiesSetItem).toHaveBeenCalledTimes(1);
    });

    it(`sets the item in history`, () => {
      expect(historiesSetItem).toHaveBeenCalledWith(`Test Skit Uuid`, {
        beforeSteps: {
          name: `Test Name`,
          backgrounds: {
            "9a8e4994-8f94-4843-b28c-29c38cd1b365": {
              name: `Test Background Name`,
              svg: `Test Svg`,
            },
          },
          characters: {},
          emotes: {},
          scenes: {},
          lines: {},
        },
        doneSteps: [
          {
            type: `createBackground`,
            backgroundUuid: `949de1e2-2649-44e7-a73c-b90cb68813b5`,
          },
          {
            type: `createBackground`,
            backgroundUuid: `6a9337f4-e41d-432f-a00a-231f5b6e8775`,
          },
          {
            type: `createBackground`,
            backgroundUuid: `ed185ecf-2791-4124-ad32-6de063eb4d2e`,
          },
          {
            type: `createBackground`,
            backgroundUuid: `80bedd32-2e7b-495f-8fba-408903017884`,
          },
          {
            type: `createBackground`,
            backgroundUuid: `0c82de84-7665-4221-a57f-48411a0a0611`,
          },
        ],
        proposedStep: {
          type: `updateName`,
          name: `Test Name`,
        },
        undoneSteps: [
          {
            type: `updateName`,
            name: `Test Updated Name A`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
        ],
      });
    });

    it(`refreshes once`, () => {
      expect(refresh).toHaveBeenCalledTimes(1);
    });

    it(`sets the item in history before refreshing`, () => {
      expect(historiesSetItem).toHaveBeenCalledBefore(refresh);
    });
  });
});
