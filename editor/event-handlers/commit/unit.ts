import rewire = require("rewire");
import { histories } from "../../histories";
import { applyEventToHistory } from "../../history/apply-event-to-history";
import { refresh } from "../refresh";

describe(`commit`, () => {
  describe(`imports`, () => {
    let commit: { __get__(name: string): unknown };

    beforeAll(() => {
      commit = rewire(`.`);
    });

    it(`histories`, () => {
      expect(commit.__get__(`importedHistories`)).toBe(histories);
    });

    it(`applyEventToHistory`, () => {
      expect(commit.__get__(`importedApplyEventToHistory`)).toBe(
        applyEventToHistory
      );
    });

    it(`refresh`, () => {
      expect(commit.__get__(`importedRefresh`)).toBe(refresh);
    });
  });

  describe(`on execution`, () => {
    let historiesTryGetItem: jasmine.Spy;
    let historiesGetItem: jasmine.Spy;
    let historiesSetItem: jasmine.Spy;
    let historiesRemoveItem: jasmine.Spy;
    let historiesListKeys: jasmine.Spy;
    let applyEventToHistory: jasmine.Spy;
    let refresh: jasmine.Spy;

    beforeAll(() => {
      const commit = rewire(`.`);

      historiesTryGetItem = jasmine.createSpy(`historiesTryGetItem`);

      historiesGetItem = jasmine
        .createSpy(`historiesGetItem`)
        .and.returnValue(`Test Existing Value`);

      historiesSetItem = jasmine.createSpy(`historiesSetItem`);
      historiesRemoveItem = jasmine.createSpy(`historiesRemoveItem`);
      historiesListKeys = jasmine.createSpy(`historiesListKeys`);
      commit.__set__(`importedHistories`, {
        tryGetItem: historiesTryGetItem,
        getItem: historiesGetItem,
        setItem: historiesSetItem,
        removeItem: historiesRemoveItem,
        listKeys: historiesListKeys,
      });

      applyEventToHistory = jasmine
        .createSpy(`applyEventToHistory`)
        .and.returnValue(`Test Updated Value`);
      commit.__set__(`importedApplyEventToHistory`, applyEventToHistory);

      refresh = jasmine.createSpy(`refresh`);
      commit.__set__(`importedRefresh`, refresh);

      commit.__get__(`commit`)(`Test Skit Uuid`, `Test Event`);
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

    it(`applies one event`, () => {
      expect(applyEventToHistory).toHaveBeenCalledTimes(1);
    });

    it(`applies the event to the existing value`, () => {
      expect(applyEventToHistory).toHaveBeenCalledWith(
        `Test Event`,
        `Test Existing Value`
      );
    });

    it(`sets one item of history`, () => {
      expect(historiesSetItem).toHaveBeenCalledTimes(1);
    });

    it(`sets the item in history`, () => {
      expect(historiesSetItem).toHaveBeenCalledWith(
        `Test Skit Uuid`,
        `Test Updated Value`
      );
    });

    it(`refreshes once`, () => {
      expect(refresh).toHaveBeenCalledTimes(1);
    });

    it(`sets the item in history before refreshing`, () => {
      expect(historiesSetItem).toHaveBeenCalledBefore(refresh);
    });
  });
});
