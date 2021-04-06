import rewire = require("rewire");
import { StateSchema } from "../../../schema/state-schema";
import { histories } from "../../histories";
import { getCurrentFromHistory } from "../get-current-from-history";

describe(`getCurrentBySkitUuid`, () => {
  describe(`imports`, () => {
    let getCurrentBySkitUuid: { __get__(name: string): unknown };

    beforeAll(() => {
      getCurrentBySkitUuid = rewire(`.`);
    });

    it(`histories`, () => {
      expect(getCurrentBySkitUuid.__get__(`importedHistories`)).toBe(histories);
    });

    it(`getCurrentFromHistory`, () => {
      expect(
        getCurrentBySkitUuid.__get__(`importedGetCurrentFromHistory`)
      ).toBe(getCurrentFromHistory);
    });
  });

  describe(`on execution`, () => {
    let historiesTryGetItem: jasmine.Spy;
    let historiesGetItem: jasmine.Spy;
    let historiesSetItem: jasmine.Spy;
    let historiesRemoveItem: jasmine.Spy;
    let historiesListKeys: jasmine.Spy;
    let importedGetCurrentFromHistory: jasmine.Spy;
    let output: StateSchema;

    beforeAll(() => {
      const getCurrentBySkitUuid = rewire(`.`);

      historiesTryGetItem = jasmine.createSpy(`historiesTryGetItem`);
      historiesGetItem = jasmine
        .createSpy(`historiesGetItem`)
        .and.returnValue(`Test History Item`);
      historiesSetItem = jasmine.createSpy(`historiesSetItem`);
      historiesRemoveItem = jasmine.createSpy(`historiesRemoveItem`);
      historiesListKeys = jasmine.createSpy(`historiesListKeys`);
      getCurrentBySkitUuid.__set__(`importedHistories`, {
        tryGetItem: historiesTryGetItem,
        getItem: historiesGetItem,
        setItem: historiesSetItem,
        removeItem: historiesRemoveItem,
        listKeys: historiesListKeys,
      });

      importedGetCurrentFromHistory = jasmine
        .createSpy(`getCurrentFromHistory`)
        .and.returnValue(`Test State`);
      getCurrentBySkitUuid.__set__(
        `importedGetCurrentFromHistory`,
        importedGetCurrentFromHistory
      );

      output = getCurrentBySkitUuid.__get__(`getCurrentBySkitUuid`)(
        `Test Skit Uuid`
      );
    });

    it(`does not try to get any items from histories`, () => {
      expect(historiesTryGetItem).not.toHaveBeenCalled();
    });

    it(`does not remove any items from histories`, () => {
      expect(historiesRemoveItem).not.toHaveBeenCalled();
    });

    it(`does not set any items in histories`, () => {
      expect(historiesSetItem).not.toHaveBeenCalled();
    });

    it(`does not list keys of histories`, () => {
      expect(historiesListKeys).not.toHaveBeenCalled();
    });

    it(`gets one item from histories`, () => {
      expect(historiesGetItem).toHaveBeenCalledTimes(1);
    });

    it(`gets the specified skit from histories`, () => {
      expect(historiesGetItem).toHaveBeenCalledWith(`Test Skit Uuid`);
    });

    it(`gets the current state of one history`, () => {
      expect(importedGetCurrentFromHistory).toHaveBeenCalledTimes(1);
    });

    it(`gets the current state of the retrieved history`, () => {
      expect(importedGetCurrentFromHistory).toHaveBeenCalledWith(
        `Test History Item`
      );
    });

    it(`returns the current state of the retrieved history`, () => {
      expect(output).toEqual((`Test State` as unknown) as StateSchema);
    });
  });
});
