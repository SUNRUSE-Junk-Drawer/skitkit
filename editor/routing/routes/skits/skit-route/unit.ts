import rewire = require("rewire");
import * as superfine from "superfine";
import { tryGetCurrentBySkitUuid } from "../../../../history/try-get-current-by-skit-uuid";

describe(`skitRouteView`, () => {
  describe(`imports`, () => {
    let skitRouteView: { __get__(name: string): unknown };

    beforeAll(() => {
      skitRouteView = rewire(`.`);
    });

    it(`tryGetCurrentBySkitUuid`, () => {
      expect(skitRouteView.__get__(`importedTryGetCurrentBySkitUuid`)).toBe(
        tryGetCurrentBySkitUuid
      );
    });
  });

  describe(`when the skit does not exist`, () => {
    let importedTryGetCurrentBySkitUuid: jasmine.Spy;
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      const skitRouteView = rewire(`.`);

      importedTryGetCurrentBySkitUuid = jasmine
        .createSpy(`importedTryGetCurrentBySkitUuid`)
        .and.returnValue(null);

      skitRouteView.__set__(
        `importedTryGetCurrentBySkitUuid`,
        importedTryGetCurrentBySkitUuid
      );

      dom = skitRouteView.__get__(`skitRouteView`)({
        skitUuid: `Test Skit Uuid`,
      });
    });

    it(`tries to get one item from the histories collection`, () => {
      expect(importedTryGetCurrentBySkitUuid).toHaveBeenCalledTimes(1);
    });

    it(`tries to get the specified skit from the histories collection`, () => {
      expect(importedTryGetCurrentBySkitUuid).toHaveBeenCalledWith(
        `Test Skit Uuid`
      );
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
              `p`,
              { className: `error-message` },
              superfine.text(`The skit you have requested cannot be found.`)
            )
          ),
        ])
      );
    });
  });

  describe(`when the skit exists`, () => {
    let importedTryGetCurrentBySkitUuid: jasmine.Spy;
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      const skitRouteView = rewire(`.`);

      importedTryGetCurrentBySkitUuid = jasmine
        .createSpy(`importedTryGetCurrentBySkitUuid`)
        .and.returnValue({
          name: `Test Name`,
          backgrounds: {},
          characters: {},
          emotes: {},
          scenes: {},
          lines: {},
        });

      skitRouteView.__set__(
        `importedTryGetCurrentBySkitUuid`,
        importedTryGetCurrentBySkitUuid
      );

      dom = skitRouteView.__get__(`skitRouteView`)({
        skitUuid: `Test Skit Uuid`,
      });
    });

    it(`tries to get one item from the histories collection`, () => {
      expect(importedTryGetCurrentBySkitUuid).toHaveBeenCalledTimes(1);
    });

    it(`tries to get the specified skit from the histories collection`, () => {
      expect(importedTryGetCurrentBySkitUuid).toHaveBeenCalledWith(
        `Test Skit Uuid`
      );
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
