import rewire = require("rewire");
import * as superfine from "superfine";
import { tryGetCurrentBySkitUuid } from "../../../../../history/try-get-current-by-skit-uuid";
import { newBackground } from "./new-background";

describe(`backgroundListRouteView`, () => {
  describe(`imports`, () => {
    let backgroundListRouteView: { __get__(name: string): unknown };

    beforeAll(() => {
      backgroundListRouteView = rewire(`.`);
    });

    it(`importedTryGetCurrentBySkitUuid`, () => {
      expect(
        backgroundListRouteView.__get__(`importedTryGetCurrentBySkitUuid`)
      ).toBe(tryGetCurrentBySkitUuid);
    });

    it(`newBackground`, () => {
      expect(backgroundListRouteView.__get__(`importedNewBackground`)).toBe(
        newBackground
      );
    });
  });

  describe(`when the skit does not exist`, () => {
    let importedTryGetCurrentBySkitUuid: jasmine.Spy;
    let importedNewBackground: jasmine.Spy;
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      const backgroundListRouteView = rewire(`.`);

      importedTryGetCurrentBySkitUuid = jasmine
        .createSpy(`importedTryGetCurrentBySkitUuid`)
        .and.returnValue(null);
      backgroundListRouteView.__set__(
        `importedTryGetCurrentBySkitUuid`,
        importedTryGetCurrentBySkitUuid
      );

      importedNewBackground = jasmine.createSpy(`importedNewBackground`);
      backgroundListRouteView.__set__(
        `importedNewBackground`,
        importedNewBackground
      );

      dom = backgroundListRouteView.__get__(`backgroundListRouteView`)({
        skitUuid: `Test Skit Uuid`,
      });
    });

    it(`tries to get one skit by its uuid`, () => {
      expect(importedTryGetCurrentBySkitUuid).toHaveBeenCalledTimes(1);
    });

    it(`tries to get the routed skit`, () => {
      expect(importedTryGetCurrentBySkitUuid).toHaveBeenCalledWith(
        `Test Skit Uuid`
      );
    });

    it(`does not generate any "new background" callbacks`, () => {
      expect(importedNewBackground).not.toHaveBeenCalled();
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

  describe(`when there are no skits`, () => {
    let importedTryGetCurrentBySkitUuid: jasmine.Spy;
    let importedNewBackground: jasmine.Spy;
    let importedNewBackgroundResult: jasmine.Spy;
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      const backgroundListRouteView = rewire(`.`);

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
      backgroundListRouteView.__set__(
        `importedTryGetCurrentBySkitUuid`,
        importedTryGetCurrentBySkitUuid
      );

      importedNewBackgroundResult = jasmine.createSpy(
        `importedNewBackgroundResult`
      );

      importedNewBackground = jasmine
        .createSpy(`importedNewBackground`)
        .and.returnValue(importedNewBackgroundResult);
      backgroundListRouteView.__set__(
        `importedNewBackground`,
        importedNewBackground
      );

      dom = backgroundListRouteView.__get__(`backgroundListRouteView`)({
        skitUuid: `Test Skit Uuid`,
      });
    });

    it(`tries to get one skit by its uuid`, () => {
      expect(importedTryGetCurrentBySkitUuid).toHaveBeenCalledTimes(1);
    });

    it(`tries to get the routed skit`, () => {
      expect(importedTryGetCurrentBySkitUuid).toHaveBeenCalledWith(
        `Test Skit Uuid`
      );
    });

    it(`generates one "new background" callback`, () => {
      expect(importedNewBackground).toHaveBeenCalledTimes(1);
    });

    it(`generates a "new background" callback using the routed skit`, () => {
      expect(importedNewBackground).toHaveBeenCalledWith(`Test Skit Uuid`);
    });

    it(`does not execute the "new background" callback`, () => {
      expect(importedNewBackgroundResult).not.toHaveBeenCalled();
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
              superfine.h(
                `a`,
                { href: `#skits/Test Skit Uuid/backgrounds` },
                superfine.text(`Backgrounds`)
              ),
            ]),
          ]),
          superfine.h(`article`, {}, [
            superfine.h(
              `div`,
              { className: `empty-list-message` },
              superfine.text(`You have not created any backgrounds.`)
            ),
          ]),
          superfine.h(`footer`, {}, [
            superfine.h(
              `button`,
              { onclick: importedNewBackgroundResult },
              superfine.text(`New Background`)
            ),
          ]),
        ])
      );
    });
  });

  describe(`when there is one background`, () => {
    let importedTryGetCurrentBySkitUuid: jasmine.Spy;
    let importedNewBackground: jasmine.Spy;
    let importedNewBackgroundResult: jasmine.Spy;
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      const backgroundListRouteView = rewire(`.`);

      importedTryGetCurrentBySkitUuid = jasmine
        .createSpy(`importedTryGetCurrentBySkitUuid`)
        .and.returnValue({
          name: `Test Name`,
          backgrounds: {
            "4c4c3e22-8ea3-4735-b828-7aeb064d0465": {
              name: `Test Name A`,
              svg: `Test Svg B`,
            },
          },
          characters: {},
          emotes: {},
          scenes: {},
          lines: {},
        });
      backgroundListRouteView.__set__(
        `importedTryGetCurrentBySkitUuid`,
        importedTryGetCurrentBySkitUuid
      );

      importedNewBackgroundResult = jasmine.createSpy(
        `importedNewBackgroundResult`
      );

      importedNewBackground = jasmine
        .createSpy(`importedNewBackground`)
        .and.returnValue(importedNewBackgroundResult);
      backgroundListRouteView.__set__(
        `importedNewBackground`,
        importedNewBackground
      );

      dom = backgroundListRouteView.__get__(`backgroundListRouteView`)({
        skitUuid: `Test Skit Uuid`,
      });
    });

    it(`tries to get one skit by its uuid`, () => {
      expect(importedTryGetCurrentBySkitUuid).toHaveBeenCalledTimes(1);
    });

    it(`tries to get the routed skit`, () => {
      expect(importedTryGetCurrentBySkitUuid).toHaveBeenCalledWith(
        `Test Skit Uuid`
      );
    });

    it(`generates one "new background" callback`, () => {
      expect(importedNewBackground).toHaveBeenCalledTimes(1);
    });

    it(`generates a "new background" callback using the routed skit`, () => {
      expect(importedNewBackground).toHaveBeenCalledWith(`Test Skit Uuid`);
    });

    it(`does not execute the "new background" callback`, () => {
      expect(importedNewBackgroundResult).not.toHaveBeenCalled();
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
              superfine.h(
                `a`,
                { href: `#skits/Test Skit Uuid/backgrounds` },
                superfine.text(`Backgrounds`)
              ),
            ]),
          ]),
          superfine.h(`article`, {}, [
            superfine.h(`ul`, { className: `text-list` }, [
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  {
                    href: `#skits/Test Skit Uuid/backgrounds/4c4c3e22-8ea3-4735-b828-7aeb064d0465`,
                  },
                  superfine.text(`Test Name A`)
                )
              ),
            ]),
          ]),
          superfine.h(`footer`, {}, [
            superfine.h(
              `button`,
              { onclick: importedNewBackgroundResult },
              superfine.text(`New Background`)
            ),
          ]),
        ])
      );
    });
  });

  describe(`when there are two backgrounds`, () => {
    let importedTryGetCurrentBySkitUuid: jasmine.Spy;
    let importedNewBackground: jasmine.Spy;
    let importedNewBackgroundResult: jasmine.Spy;
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      const backgroundListRouteView = rewire(`.`);

      importedTryGetCurrentBySkitUuid = jasmine
        .createSpy(`importedTryGetCurrentBySkitUuid`)
        .and.returnValue({
          name: `Test Name`,
          backgrounds: {
            "5e6a1c25-6eb1-4ffd-bb4f-4a641fa6f113": {
              name: `Test Name B`,
              svg: `Test Svg A`,
            },
            "4c4c3e22-8ea3-4735-b828-7aeb064d0465": {
              name: `Test Name A`,
              svg: `Test Svg B`,
            },
          },
          characters: {},
          emotes: {},
          scenes: {},
          lines: {},
        });
      backgroundListRouteView.__set__(
        `importedTryGetCurrentBySkitUuid`,
        importedTryGetCurrentBySkitUuid
      );

      importedNewBackgroundResult = jasmine.createSpy(
        `importedNewBackgroundResult`
      );

      importedNewBackground = jasmine
        .createSpy(`importedNewBackground`)
        .and.returnValue(importedNewBackgroundResult);
      backgroundListRouteView.__set__(
        `importedNewBackground`,
        importedNewBackground
      );

      dom = backgroundListRouteView.__get__(`backgroundListRouteView`)({
        skitUuid: `Test Skit Uuid`,
      });
    });

    it(`tries to get one skit by its uuid`, () => {
      expect(importedTryGetCurrentBySkitUuid).toHaveBeenCalledTimes(1);
    });

    it(`tries to get the routed skit`, () => {
      expect(importedTryGetCurrentBySkitUuid).toHaveBeenCalledWith(
        `Test Skit Uuid`
      );
    });

    it(`generates one "new background" callback`, () => {
      expect(importedNewBackground).toHaveBeenCalledTimes(1);
    });

    it(`generates a "new background" callback using the routed skit`, () => {
      expect(importedNewBackground).toHaveBeenCalledWith(`Test Skit Uuid`);
    });

    it(`does not execute the "new background" callback`, () => {
      expect(importedNewBackgroundResult).not.toHaveBeenCalled();
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
              superfine.h(
                `a`,
                { href: `#skits/Test Skit Uuid/backgrounds` },
                superfine.text(`Backgrounds`)
              ),
            ]),
          ]),
          superfine.h(`article`, {}, [
            superfine.h(`ul`, { className: `text-list` }, [
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  {
                    href: `#skits/Test Skit Uuid/backgrounds/4c4c3e22-8ea3-4735-b828-7aeb064d0465`,
                  },
                  superfine.text(`Test Name A`)
                )
              ),
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  {
                    href: `#skits/Test Skit Uuid/backgrounds/5e6a1c25-6eb1-4ffd-bb4f-4a641fa6f113`,
                  },
                  superfine.text(`Test Name B`)
                )
              ),
            ]),
          ]),
          superfine.h(`footer`, {}, [
            superfine.h(
              `button`,
              { onclick: importedNewBackgroundResult },
              superfine.text(`New Background`)
            ),
          ]),
        ])
      );
    });
  });

  describe(`when there are three backgrounds`, () => {
    let importedTryGetCurrentBySkitUuid: jasmine.Spy;
    let importedNewBackground: jasmine.Spy;
    let importedNewBackgroundResult: jasmine.Spy;
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      const backgroundListRouteView = rewire(`.`);

      importedTryGetCurrentBySkitUuid = jasmine
        .createSpy(`importedTryGetCurrentBySkitUuid`)
        .and.returnValue({
          name: `Test Name`,
          backgrounds: {
            "5e6a1c25-6eb1-4ffd-bb4f-4a641fa6f113": {
              name: `Test Name B`,
              svg: `Test Svg A`,
            },
            "4c4c3e22-8ea3-4735-b828-7aeb064d0465": {
              name: `Test Name A`,
              svg: `Test Svg B`,
            },
            "3be6883d-9236-4247-9461-b5c113c5e172": {
              name: `Test Name C`,
              svg: `Test Svg C`,
            },
          },
          characters: {},
          emotes: {},
          scenes: {},
          lines: {},
        });
      backgroundListRouteView.__set__(
        `importedTryGetCurrentBySkitUuid`,
        importedTryGetCurrentBySkitUuid
      );

      importedNewBackgroundResult = jasmine.createSpy(
        `importedNewBackgroundResult`
      );

      importedNewBackground = jasmine
        .createSpy(`importedNewBackground`)
        .and.returnValue(importedNewBackgroundResult);
      backgroundListRouteView.__set__(
        `importedNewBackground`,
        importedNewBackground
      );

      dom = backgroundListRouteView.__get__(`backgroundListRouteView`)({
        skitUuid: `Test Skit Uuid`,
      });
    });

    it(`tries to get one skit by its uuid`, () => {
      expect(importedTryGetCurrentBySkitUuid).toHaveBeenCalledTimes(1);
    });

    it(`tries to get the routed skit`, () => {
      expect(importedTryGetCurrentBySkitUuid).toHaveBeenCalledWith(
        `Test Skit Uuid`
      );
    });

    it(`generates one "new background" callback`, () => {
      expect(importedNewBackground).toHaveBeenCalledTimes(1);
    });

    it(`generates a "new background" callback using the routed skit`, () => {
      expect(importedNewBackground).toHaveBeenCalledWith(`Test Skit Uuid`);
    });

    it(`does not execute the "new background" callback`, () => {
      expect(importedNewBackgroundResult).not.toHaveBeenCalled();
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
              superfine.h(
                `a`,
                { href: `#skits/Test Skit Uuid/backgrounds` },
                superfine.text(`Backgrounds`)
              ),
            ]),
          ]),
          superfine.h(`article`, {}, [
            superfine.h(`ul`, { className: `text-list` }, [
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  {
                    href: `#skits/Test Skit Uuid/backgrounds/4c4c3e22-8ea3-4735-b828-7aeb064d0465`,
                  },
                  superfine.text(`Test Name A`)
                )
              ),
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  {
                    href: `#skits/Test Skit Uuid/backgrounds/5e6a1c25-6eb1-4ffd-bb4f-4a641fa6f113`,
                  },
                  superfine.text(`Test Name B`)
                )
              ),
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  {
                    href: `#skits/Test Skit Uuid/backgrounds/3be6883d-9236-4247-9461-b5c113c5e172`,
                  },
                  superfine.text(`Test Name C`)
                )
              ),
            ]),
          ]),
          superfine.h(`footer`, {}, [
            superfine.h(
              `button`,
              { onclick: importedNewBackgroundResult },
              superfine.text(`New Background`)
            ),
          ]),
        ])
      );
    });
  });
});
