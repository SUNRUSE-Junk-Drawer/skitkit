import rewire = require("rewire");
import * as superfine from "superfine";
import { histories } from "../../histories";
import { parseHash } from "../../routing/parse-hash";
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

    it(`parseHash`, () => {
      expect(refresh.__get__(`importedParseHash`)).toBe(parseHash);
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
    let importedParseHash: jasmine.Spy;
    let importedPatch: jasmine.Spy;

    beforeAll(() => {
      view = jasmine
        .createSpy(`view.render`)
        .and.returnValue(`Test Rendered View`);

      importedRouter = jasmine.createSpy(`importedRouter`).and.returnValue({
        parameters: `Test Parameters`,
        view,
      });

      importedParseHash = jasmine
        .createSpy(`importedParseHash`)
        .and.returnValue(`Test Parsed Hash`);

      importedPatch = jasmine.createSpy(`importedPatch`);

      const existingDocument = patchableGlobal.document;
      const existingLocation = patchableGlobal.location;

      try {
        patchableGlobal.document = { body: `Test Old Body` };
        patchableGlobal.location = { hash: `Test Old Location Hash` };

        const refresh = rewire(`.`);

        patchableGlobal.document.body = `Test Body`;
        patchableGlobal.location.hash = `Test Location Hash`;
        refresh.__set__(`importedRouter`, importedRouter);
        refresh.__set__(`importedParseHash`, importedParseHash);
        refresh.__set__(`importedHistories`, `Test Histories`);
        refresh.__set__(`importedPatch`, importedPatch);

        refresh.__get__(`refresh`)();
      } finally {
        patchableGlobal.document = existingDocument;
        patchableGlobal.location = existingLocation;
      }
    });

    it(`parses one hash`, () => {
      expect(importedParseHash).toHaveBeenCalledTimes(1);
    });

    it(`parses the location's hash`, () => {
      expect(importedParseHash).toHaveBeenCalledWith(`Test Location Hash`);
    });

    it(`looks up one route`, () => {
      expect(importedRouter).toHaveBeenCalledTimes(1);
    });

    it(`looks up a route using the parsed hash and histories`, () => {
      expect(importedRouter).toHaveBeenCalledWith(
        `Test Parsed Hash`,
        `Test Histories`
      );
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
