import rewire = require("rewire");
import * as uuid from "uuid";
import { commitAndRedirect } from "../../../../../../event-handlers/commit-and-redirect";

describe(`newBackground`, () => {
  describe(`imports`, () => {
    let newBackground: { __get__(name: string): unknown };

    beforeAll(() => {
      newBackground = rewire(`.`);
    });

    it(`uuid`, () => {
      expect(newBackground.__get__(`importedUuid`)).toBe(uuid.v4);
    });

    it(`commitAndRedirect`, () => {
      expect(newBackground.__get__(`importedCommitAndRedirect`)).toBe(
        commitAndRedirect
      );
    });
  });

  describe(`on execution`, () => {
    let importedUuid: jasmine.Spy;
    let importedCommitAndRedirect: jasmine.Spy;

    beforeAll(() => {
      const newBackground = rewire(`.`);

      importedUuid = jasmine.createSpy(`importedUuid`);
      newBackground.__set__(`importedUuid`, importedUuid);

      importedCommitAndRedirect = jasmine.createSpy(
        `importedCommitAndRedirect`
      );
      newBackground.__set__(
        `importedCommitAndRedirect`,
        importedCommitAndRedirect
      );

      newBackground.__get__(`newBackground`)(`Test Skit Uuid`);
    });

    it(`does not generate any UUIDs`, () => {
      expect(importedUuid).not.toHaveBeenCalled();
    });

    it(`does not commit and redirect`, () => {
      expect(importedCommitAndRedirect).not.toHaveBeenCalled();
    });
  });

  describe(`on execution, then execution of the result`, () => {
    let importedUuid: jasmine.Spy;
    let importedCommitAndRedirect: jasmine.Spy;

    beforeAll(() => {
      const newBackground = rewire(`.`);

      importedUuid = jasmine
        .createSpy(`importedUuid`)
        .and.returnValue(`Test Background Uuid`);
      newBackground.__set__(`importedUuid`, importedUuid);

      importedCommitAndRedirect = jasmine.createSpy(
        `importedCommitAndRedirect`
      );
      newBackground.__set__(
        `importedCommitAndRedirect`,
        importedCommitAndRedirect
      );

      newBackground.__get__(`newBackground`)(`Test Skit Uuid`)();
    });

    it(`generates one UUID`, () => {
      expect(importedUuid).toHaveBeenCalledTimes(1);
    });

    it(`commits and redirects once`, () => {
      expect(importedCommitAndRedirect).toHaveBeenCalledTimes(1);
    });

    it(`commits the creation of a background to the appropriate skit and redirects to it`, () => {
      expect(importedCommitAndRedirect).toHaveBeenCalledWith(
        `Test Skit Uuid`,
        {
          type: `createBackground`,
          backgroundUuid: `Test Background Uuid`,
        },
        `#skits/Test Skit Uuid/backgrounds/Test Background Uuid`
      );
    });
  });
});
