import rewire = require("rewire");
import { histories } from "../../histories";
import { applyEventToHistory } from "../../history/apply-event-to-history";
import { navigate } from "../../navigate";

describe(`commitAndRedirect`, () => {
  describe(`imports`, () => {
    let commitAndRedirect: { __get__(name: string): unknown };

    beforeAll(() => {
      commitAndRedirect = rewire(`.`);
    });

    it(`histories`, () => {
      expect(commitAndRedirect.__get__(`importedHistories`)).toBe(histories);
    });

    it(`applyEventToHistory`, () => {
      expect(commitAndRedirect.__get__(`importedApplyEventToHistory`)).toBe(
        applyEventToHistory
      );
    });

    it(`navigate`, () => {
      expect(commitAndRedirect.__get__(`importedNavigate`)).toBe(navigate);
    });
  });

  describe(`on execution`, () => {
    let historiesTryGetItem: jasmine.Spy;
    let historiesGetItem: jasmine.Spy;
    let historiesSetItem: jasmine.Spy;
    let historiesRemoveItem: jasmine.Spy;
    let historiesListKeys: jasmine.Spy;
    let applyEventToHistory: jasmine.Spy;
    let navigate: jasmine.Spy;

    beforeAll(() => {
      const commitAndRedirect = rewire(`.`);

      historiesTryGetItem = jasmine.createSpy(`historiesTryGetItem`);

      historiesGetItem = jasmine
        .createSpy(`historiesGetItem`)
        .and.returnValue(`Test Existing Value`);

      historiesSetItem = jasmine.createSpy(`historiesSetItem`);
      historiesRemoveItem = jasmine.createSpy(`historiesRemoveItem`);
      historiesListKeys = jasmine.createSpy(`historiesListKeys`);
      commitAndRedirect.__set__(`importedHistories`, {
        tryGetItem: historiesTryGetItem,
        getItem: historiesGetItem,
        setItem: historiesSetItem,
        removeItem: historiesRemoveItem,
        listKeys: historiesListKeys,
      });

      applyEventToHistory = jasmine
        .createSpy(`applyEventToHistory`)
        .and.returnValue(`Test Updated Value`);
      commitAndRedirect.__set__(
        `importedApplyEventToHistory`,
        applyEventToHistory
      );

      navigate = jasmine.createSpy(`navigate`);
      commitAndRedirect.__set__(`importedNavigate`, navigate);

      commitAndRedirect.__get__(`commitAndRedirect`)(
        `Test Skit Uuid`,
        `Test Event`,
        `Test Hash`
      );
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

    it(`navigates once`, () => {
      expect(navigate).toHaveBeenCalledTimes(1);
    });

    it(`navigates to the given route`, () => {
      expect(navigate).toHaveBeenCalledWith(`Test Hash`);
    });

    it(`sets the item in history before navigating`, () => {
      expect(historiesSetItem).toHaveBeenCalledBefore(navigate);
    });
  });
});
