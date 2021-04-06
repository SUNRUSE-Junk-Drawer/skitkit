import rewire = require("rewire");
import { StateSchema } from "../../../schema/state-schema";
import { histories } from "../../histories";
import { getCurrentFromHistory } from "../get-current-from-history";

describe(`tryGetCurrentBySkitUuid`, () => {
  describe(`imports`, () => {
    let tryGetCurrentBySkitUuid: { __get__(name: string): unknown };

    beforeAll(() => {
      tryGetCurrentBySkitUuid = rewire(`.`);
    });

    it(`histories`, () => {
      expect(tryGetCurrentBySkitUuid.__get__(`importedHistories`)).toBe(
        histories
      );
    });

    it(`getCurrentFromHistory`, () => {
      expect(
        tryGetCurrentBySkitUuid.__get__(`importedGetCurrentFromHistory`)
      ).toBe(getCurrentFromHistory);
    });
  });

  describe(`on execution`, () => {
    describe(`when the item is not found`, () => {
      let historiesTryGetItem: jasmine.Spy;
      let historiesGetItem: jasmine.Spy;
      let historiesSetItem: jasmine.Spy;
      let historiesRemoveItem: jasmine.Spy;
      let historiesListKeys: jasmine.Spy;
      let importedGetCurrentFromHistory: jasmine.Spy;
      let output: null | StateSchema;

      beforeAll(() => {
        const tryGetCurrentBySkitUuid = rewire(`.`);

        historiesTryGetItem = jasmine
          .createSpy(`historiesTryGetItem`)
          .and.returnValue(null);
        historiesGetItem = jasmine.createSpy(`historiesGetItem`);
        historiesSetItem = jasmine.createSpy(`historiesSetItem`);
        historiesRemoveItem = jasmine.createSpy(`historiesRemoveItem`);
        historiesListKeys = jasmine.createSpy(`historiesListKeys`);
        tryGetCurrentBySkitUuid.__set__(`importedHistories`, {
          tryGetItem: historiesTryGetItem,
          getItem: historiesGetItem,
          setItem: historiesSetItem,
          removeItem: historiesRemoveItem,
          listKeys: historiesListKeys,
        });

        importedGetCurrentFromHistory = jasmine.createSpy(
          `getCurrentFromHistory`
        );
        tryGetCurrentBySkitUuid.__set__(
          `importedGetCurrentFromHistory`,
          importedGetCurrentFromHistory
        );

        output = tryGetCurrentBySkitUuid.__get__(`tryGetCurrentBySkitUuid`)(
          `Test Skit Uuid`
        );
      });

      it(`does not get any items from histories`, () => {
        expect(historiesGetItem).not.toHaveBeenCalled();
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

      it(`tries to get one item from histories`, () => {
        expect(historiesTryGetItem).toHaveBeenCalledTimes(1);
      });

      it(`tries to get the specified skit from histories`, () => {
        expect(historiesTryGetItem).toHaveBeenCalledWith(`Test Skit Uuid`);
      });

      it(`does not get the current state of any histories`, () => {
        expect(importedGetCurrentFromHistory).not.toHaveBeenCalled();
      });

      it(`returns null`, () => {
        expect(output).toBeNull();
      });
    });

    describe(`when the item is found`, () => {
      let historiesTryGetItem: jasmine.Spy;
      let historiesGetItem: jasmine.Spy;
      let historiesSetItem: jasmine.Spy;
      let historiesRemoveItem: jasmine.Spy;
      let historiesListKeys: jasmine.Spy;
      let importedGetCurrentFromHistory: jasmine.Spy;
      let output: null | StateSchema;

      beforeAll(() => {
        const tryGetCurrentBySkitUuid = rewire(`.`);

        historiesTryGetItem = jasmine
          .createSpy(`historiesTryGetItem`)
          .and.returnValue(`Test History Item`);
        historiesGetItem = jasmine.createSpy(`historiesGetItem`);
        historiesSetItem = jasmine.createSpy(`historiesSetItem`);
        historiesRemoveItem = jasmine.createSpy(`historiesRemoveItem`);
        historiesListKeys = jasmine.createSpy(`historiesListKeys`);
        tryGetCurrentBySkitUuid.__set__(`importedHistories`, {
          tryGetItem: historiesTryGetItem,
          getItem: historiesGetItem,
          setItem: historiesSetItem,
          removeItem: historiesRemoveItem,
          listKeys: historiesListKeys,
        });

        importedGetCurrentFromHistory = jasmine
          .createSpy(`getCurrentFromHistory`)
          .and.returnValue(`Test State`);
        tryGetCurrentBySkitUuid.__set__(
          `importedGetCurrentFromHistory`,
          importedGetCurrentFromHistory
        );

        output = tryGetCurrentBySkitUuid.__get__(`tryGetCurrentBySkitUuid`)(
          `Test Skit Uuid`
        );
      });

      it(`does not get any items from histories`, () => {
        expect(historiesGetItem).not.toHaveBeenCalled();
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

      it(`tries to get one item from histories`, () => {
        expect(historiesTryGetItem).toHaveBeenCalledTimes(1);
      });

      it(`tries to get the specified skit from histories`, () => {
        expect(historiesTryGetItem).toHaveBeenCalledWith(`Test Skit Uuid`);
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
        expect(output).toEqual((`Test State` as unknown) as null | StateSchema);
      });
    });
  });
});
