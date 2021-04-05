import rewire = require("rewire");
import * as superfine from "superfine";
import { histories } from "../../../../histories";

describe(`skitListRouteView`, () => {
  describe(`imports`, () => {
    let skitListRouteView: { __get__(name: string): unknown };

    beforeAll(() => {
      skitListRouteView = rewire(`.`);
    });

    it(`histories`, () => {
      expect(skitListRouteView.__get__(`importedHistories`)).toBe(histories);
    });
  });

  describe(`when there are no skits`, () => {
    let historiesTryGetItem: jasmine.Spy;
    let historiesGetItem: jasmine.Spy;
    let historiesSetItem: jasmine.Spy;
    let historiesRemoveItem: jasmine.Spy;
    let historiesListKeys: jasmine.Spy;
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      const skitListRouteView = rewire(`.`);

      historiesTryGetItem = jasmine.createSpy(`historiesTryGetItem`);
      historiesGetItem = jasmine.createSpy(`historiesGetItem`);
      historiesSetItem = jasmine.createSpy(`historiesSetItem`);
      historiesRemoveItem = jasmine.createSpy(`historiesRemoveItem`);
      historiesListKeys = jasmine
        .createSpy(`historiesListKeys`)
        .and.returnValue([]);

      skitListRouteView.__set__(`importedHistories`, {
        tryGetItem: historiesTryGetItem,
        getItem: historiesGetItem,
        setItem: historiesSetItem,
        removeItem: historiesRemoveItem,
        listKeys: historiesListKeys,
      });

      dom = skitListRouteView.__get__(`skitListRouteView`)({});
    });

    it(`lists all keys in the histories`, () => {
      expect(historiesListKeys).toHaveBeenCalledTimes(1);
    });

    it(`does not try to get any items of the histories collection`, () => {
      expect(historiesTryGetItem).not.toHaveBeenCalled();
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
          superfine.h(`article`, {}, [
            superfine.h(
              `div`,
              { className: `empty-list-message` },
              superfine.text(`You have not created any skits.`)
            ),
          ]),
          superfine.h(`footer`, {}, [
            superfine.h(`button`, {}, superfine.text(`New Skit`)),
          ]),
        ])
      );
    });
  });

  describe(`when there is one skit`, () => {
    let historiesTryGetItem: jasmine.Spy;
    let historiesGetItem: jasmine.Spy;
    let historiesSetItem: jasmine.Spy;
    let historiesRemoveItem: jasmine.Spy;
    let historiesListKeys: jasmine.Spy;
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      const skitListRouteView = rewire(`.`);

      historiesTryGetItem = jasmine.createSpy(`historiesTryGetItem`);
      historiesGetItem = jasmine.createSpy(`historiesGetItem`).and.returnValue({
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
        proposedStep: null,
        undoneSteps: [
          {
            type: `updateName`,
            name: `Test Name A`,
          },
        ],
      });
      historiesSetItem = jasmine.createSpy(`historiesSetItem`);
      historiesRemoveItem = jasmine.createSpy(`historiesRemoveItem`);
      historiesListKeys = jasmine
        .createSpy(`historiesListKeys`)
        .and.returnValue([`5e6a1c25-6eb1-4ffd-bb4f-4a641fa6f113`]);

      skitListRouteView.__set__(`importedHistories`, {
        tryGetItem: historiesTryGetItem,
        getItem: historiesGetItem,
        setItem: historiesSetItem,
        removeItem: historiesRemoveItem,
        listKeys: historiesListKeys,
      });

      dom = skitListRouteView.__get__(`skitListRouteView`)({});
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
    });

    it(`gets no further items from the histories collection`, () => {
      expect(historiesGetItem).toHaveBeenCalledTimes(1);
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
          superfine.h(`article`, {}, [
            superfine.h(`ul`, { className: `text-list` }, [
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  { href: `#skits/5e6a1c25-6eb1-4ffd-bb4f-4a641fa6f113` },
                  superfine.text(`Test Name E`)
                )
              ),
            ]),
          ]),
          superfine.h(`footer`, {}, [
            superfine.h(`button`, {}, superfine.text(`New Skit`)),
          ]),
        ])
      );
    });
  });

  describe(`when there are two skits`, () => {
    let historiesTryGetItem: jasmine.Spy;
    let historiesGetItem: jasmine.Spy;
    let historiesSetItem: jasmine.Spy;
    let historiesRemoveItem: jasmine.Spy;
    let historiesListKeys: jasmine.Spy;
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      const skitListRouteView = rewire(`.`);

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
                proposedStep: null,
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
                proposedStep: null,
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
        ]);

      skitListRouteView.__set__(`importedHistories`, {
        tryGetItem: historiesTryGetItem,
        getItem: historiesGetItem,
        setItem: historiesSetItem,
        removeItem: historiesRemoveItem,
        listKeys: historiesListKeys,
      });

      dom = skitListRouteView.__get__(`skitListRouteView`)({});
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
    });

    it(`gets no further items from the histories collection`, () => {
      expect(historiesGetItem).toHaveBeenCalledTimes(2);
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
          superfine.h(`article`, {}, [
            superfine.h(`ul`, { className: `text-list` }, [
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  { href: `#skits/4c4c3e22-8ea3-4735-b828-7aeb064d0465` },
                  superfine.text(`Test Name A`)
                )
              ),
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  { href: `#skits/5e6a1c25-6eb1-4ffd-bb4f-4a641fa6f113` },
                  superfine.text(`Test Name E`)
                )
              ),
            ]),
          ]),
          superfine.h(`footer`, {}, [
            superfine.h(`button`, {}, superfine.text(`New Skit`)),
          ]),
        ])
      );
    });
  });

  describe(`when there are three skits`, () => {
    let historiesTryGetItem: jasmine.Spy;
    let historiesGetItem: jasmine.Spy;
    let historiesSetItem: jasmine.Spy;
    let historiesRemoveItem: jasmine.Spy;
    let historiesListKeys: jasmine.Spy;
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      const skitListRouteView = rewire(`.`);

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
                proposedStep: null,
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
                proposedStep: null,
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
                proposedStep: null,
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

      skitListRouteView.__set__(`importedHistories`, {
        tryGetItem: historiesTryGetItem,
        getItem: historiesGetItem,
        setItem: historiesSetItem,
        removeItem: historiesRemoveItem,
        listKeys: historiesListKeys,
      });

      dom = skitListRouteView.__get__(`skitListRouteView`)({});
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
          superfine.h(`article`, {}, [
            superfine.h(`ul`, { className: `text-list` }, [
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  { href: `#skits/4c4c3e22-8ea3-4735-b828-7aeb064d0465` },
                  superfine.text(`Test Name A`)
                )
              ),
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  { href: `#skits/5e6a1c25-6eb1-4ffd-bb4f-4a641fa6f113` },
                  superfine.text(`Test Name E`)
                )
              ),
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  { href: `#skits/3be6883d-9236-4247-9461-b5c113c5e172` },
                  superfine.text(`Test Name H`)
                )
              ),
            ]),
          ]),
          superfine.h(`footer`, {}, [
            superfine.h(`button`, {}, superfine.text(`New Skit`)),
          ]),
        ])
      );
    });
  });
});
