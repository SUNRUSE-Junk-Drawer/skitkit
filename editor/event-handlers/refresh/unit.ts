import rewire = require("rewire");
import * as superfine from "superfine";
import { histories } from "../../histories";
import { router } from "../../routing/router";

describe(`refresh`, () => {
  describe(`imports`, () => {
    let refresh: { __get__(name: string): unknown };

    beforeAll(() => {
      refresh = rewire(`.`);
    });

    it(`patch`, () => {
      expect(refresh.__get__(`importedPatch`)).toBe(superfine.patch);
    });

    it(`histories`, () => {
      expect(refresh.__get__(`importedHistories`)).toBe(histories);
    });

    it(`router`, () => {
      expect(refresh.__get__(`importedRouter`)).toBe(router);
    });
  });

  describe(`on execution`, () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const patchableGlobal = global as any;
    let view: jasmine.Spy;
    let importedRouter: jasmine.Spy;
    let importedPatch: jasmine.Spy;

    beforeAll(() => {
      view = jasmine
        .createSpy(`view.render`)
        .and.returnValue(`Test Rendered View`);

      importedRouter = jasmine.createSpy(`importedRouter`).and.returnValue({
        parameters: `Test Parameters`,
        view,
      });

      importedPatch = jasmine.createSpy(`importedPatch`);

      const refresh = rewire(`.`);

      refresh.__set__(`importedRouter`, importedRouter);
      refresh.__set__(`importedHistories`, `Test Histories`);
      refresh.__set__(`importedPatch`, importedPatch);

      const existingDocument = patchableGlobal.document;

      try {
        patchableGlobal.document = { body: `Test Body` };
        refresh.__get__(`refresh`)();
      } finally {
        patchableGlobal.document = existingDocument;
      }
    });

    it(`looks up one route`, () => {
      expect(importedRouter).toHaveBeenCalledTimes(1);
    });

    it(`looks up a route using the histories`, () => {
      expect(importedRouter).toHaveBeenCalledWith(`Test Histories`);
    });

    it(`renders the view once`, () => {
      expect(view).toHaveBeenCalledTimes(1);
    });

    it(`renders the view with the parameters`, () => {
      expect(view).toHaveBeenCalledWith(`Test Parameters`);
    });

    it(`patches one element`, () => {
      expect(importedPatch).toHaveBeenCalledTimes(1);
    });

    it(`patches the body with the rendered view`, () => {
      expect(importedPatch).toHaveBeenCalledWith(
        `Test Body`,
        `Test Rendered View`
      );
    });
  });
});
