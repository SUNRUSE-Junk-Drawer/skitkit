import rewire = require("rewire");
import * as superfine from "superfine";
import { histories } from "../../../../histories";

describe(`skitRouteView`, () => {
  describe(`imports`, () => {
    let skitRouteView: { __get__(name: string): unknown };

    beforeAll(() => {
      skitRouteView = rewire(`.`);
    });

    it(`histories`, () => {
      expect(skitRouteView.__get__(`importedHistories`)).toBe(histories);
    });
  });

  describe(`when the skit does not exist`, () => {
    let historiesTryGetItem: jasmine.Spy;
    let historiesGetItem: jasmine.Spy;
    let historiesSetItem: jasmine.Spy;
    let historiesRemoveItem: jasmine.Spy;
    let historiesListKeys: jasmine.Spy;
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      const skitRouteView = rewire(`.`);

      historiesTryGetItem = jasmine
        .createSpy(`historiesTryGetItem`)
        .and.returnValue(null);
      historiesGetItem = jasmine.createSpy(`historiesGetItem`);
      historiesSetItem = jasmine.createSpy(`historiesSetItem`);
      historiesRemoveItem = jasmine.createSpy(`historiesRemoveItem`);
      historiesListKeys = jasmine.createSpy(`historiesListKeys`);

      skitRouteView.__set__(`importedHistories`, {
        tryGetItem: historiesTryGetItem,
        getItem: historiesGetItem,
        setItem: historiesSetItem,
        removeItem: historiesRemoveItem,
        listKeys: historiesListKeys,
      });

      dom = skitRouteView.__get__(`skitRouteView`)({
        skitUuid: `Test Skit Uuid`,
      });
    });

    it(`does not list all keys in the histories`, () => {
      expect(historiesListKeys).not.toHaveBeenCalledWith();
    });

    it(`tries to get one item from the histories collection`, () => {
      expect(historiesTryGetItem).toHaveBeenCalledTimes(1);
    });

    it(`tries to get the specified skit from the histories collection`, () => {
      expect(historiesTryGetItem).toHaveBeenCalledWith(`Test Skit Uuid`);
    });

    it(`does not get any items from the histories collection`, () => {
      expect(historiesGetItem).not.toHaveBeenCalled();
    });

    it(`does not set any items in the histories collection`, () => {
      expect(historiesSetItem).not.toHaveBeenCalled();
    });

    it(`does not remove any items from the histories collection`, () => {
      expect(historiesRemoveItem).not.toHaveBeenCalled();
    });

    it(`returns the expected dom`, () => {
      expect(dom).toEqual(
        superfine.h(`body`, {}, [
          superfine.h(`header`, {}, [
            superfine.h(`h1`, {}, [
              superfine.h(`a`, { href: `#` }, superfine.text(`SkitKit`)),
              superfine.h(`sub`, {}, superfine.text(`v999.999.999`)),
            ]),
            superfine.h(
              `nav`,
              {},
              superfine.h(`a`, { href: `#skits` }, superfine.text(`Skits`))
            ),
          ]),
          superfine.h(
            `article`,
            {},
            superfine.h(
              `ul`,
              { className: `error-message` },
              superfine.text(`The skit you have requested cannot be found.`)
            )
          ),
        ])
      );
    });
  });

  describe(`when the skit exists`, () => {
    let historiesTryGetItem: jasmine.Spy;
    let historiesGetItem: jasmine.Spy;
    let historiesSetItem: jasmine.Spy;
    let historiesRemoveItem: jasmine.Spy;
    let historiesListKeys: jasmine.Spy;
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      const skitRouteView = rewire(`.`);

      historiesTryGetItem = jasmine
        .createSpy(`historiesTryGetItem`)
        .and.returnValue({
          beforeSteps: {
            name: `Test Overwritten Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          doneSteps: [],
          proposedStep: { type: `updateName`, name: `Test Name` },
          undoneSteps: [],
        });
      historiesGetItem = jasmine.createSpy(`historiesGetItem`);
      historiesSetItem = jasmine.createSpy(`historiesSetItem`);
      historiesRemoveItem = jasmine.createSpy(`historiesRemoveItem`);
      historiesListKeys = jasmine.createSpy(`historiesListKeys`);

      skitRouteView.__set__(`importedHistories`, {
        tryGetItem: historiesTryGetItem,
        getItem: historiesGetItem,
        setItem: historiesSetItem,
        removeItem: historiesRemoveItem,
        listKeys: historiesListKeys,
      });

      dom = skitRouteView.__get__(`skitRouteView`)({
        skitUuid: `Test Skit Uuid`,
      });
    });

    it(`does not list all keys in the histories`, () => {
      expect(historiesListKeys).not.toHaveBeenCalledWith();
    });

    it(`tries to get one item from the histories collection`, () => {
      expect(historiesTryGetItem).toHaveBeenCalledTimes(1);
    });

    it(`tries to get the specified skit from the histories collection`, () => {
      expect(historiesTryGetItem).toHaveBeenCalledWith(`Test Skit Uuid`);
    });

    it(`does not get any items from the histories collection`, () => {
      expect(historiesGetItem).not.toHaveBeenCalled();
    });

    it(`does not set any items in the histories collection`, () => {
      expect(historiesSetItem).not.toHaveBeenCalled();
    });

    it(`does not remove any items from the histories collection`, () => {
      expect(historiesRemoveItem).not.toHaveBeenCalled();
    });

    it(`returns the expected dom`, () => {
      expect(dom).toEqual(
        superfine.h(`body`, {}, [
          superfine.h(`header`, {}, [
            superfine.h(`h1`, {}, [
              superfine.h(`a`, { href: `#` }, superfine.text(`SkitKit`)),
              superfine.h(`sub`, {}, superfine.text(`v999.999.999`)),
            ]),
            superfine.h(`nav`, {}, [
              superfine.h(`a`, { href: `#skits` }, superfine.text(`Skits`)),
              superfine.h(
                `a`,
                { href: `#skits/Test Skit Uuid` },
                superfine.text(`Test Name`)
              ),
            ]),
          ]),
        ])
      );
    });
  });
});
