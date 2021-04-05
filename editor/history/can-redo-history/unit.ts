import { canRedoHistory } from ".";

describe(`canRedoHistory`, () => {
  describe(`when no step is proposed`, () => {
    describe(`when no undone steps exist`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canRedoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [],
          proposedStep: null,
          doneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
        });
      });

      it(`returns false`, () => {
        expect(result).toBeFalse();
      });
    });

    describe(`when one undone step exists`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canRedoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [{ type: `updateName`, name: `Test Updated Name C` }],
          proposedStep: null,
          doneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
        });
      });

      it(`returns true`, () => {
        expect(result).toBeTrue();
      });
    });

    describe(`when two undone steps exist`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canRedoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [
            { type: `updateName`, name: `Test Updated Name C` },
            { type: `updateName`, name: `Test Updated Name D` },
          ],
          proposedStep: null,
          doneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
        });
      });

      it(`returns true`, () => {
        expect(result).toBeTrue();
      });
    });

    describe(`when three undone steps exist`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canRedoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [
            { type: `updateName`, name: `Test Updated Name C` },
            { type: `updateName`, name: `Test Updated Name D` },
            { type: `updateName`, name: `Test Updated Name E` },
          ],
          proposedStep: null,
          doneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
        });
      });

      it(`returns true`, () => {
        expect(result).toBeTrue();
      });
    });
  });

  describe(`when a step is proposed`, () => {
    describe(`when no undone steps exist`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canRedoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [],
          proposedStep: { type: `updateName`, name: `Test Updated Name F` },
          doneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
        });
      });

      it(`returns false`, () => {
        expect(result).toBeFalse();
      });
    });

    describe(`when one undone step exists`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canRedoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [{ type: `updateName`, name: `Test Updated Name C` }],
          proposedStep: { type: `updateName`, name: `Test Updated Name F` },
          doneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
        });
      });

      it(`returns false`, () => {
        expect(result).toBeFalse();
      });
    });

    describe(`when two undone steps exist`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canRedoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [
            { type: `updateName`, name: `Test Updated Name C` },
            { type: `updateName`, name: `Test Updated Name D` },
          ],
          proposedStep: { type: `updateName`, name: `Test Updated Name F` },
          doneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
        });
      });

      it(`returns false`, () => {
        expect(result).toBeFalse();
      });
    });

    describe(`when three undone steps exist`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canRedoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [
            { type: `updateName`, name: `Test Updated Name C` },
            { type: `updateName`, name: `Test Updated Name D` },
            { type: `updateName`, name: `Test Updated Name E` },
          ],
          proposedStep: { type: `updateName`, name: `Test Updated Name F` },
          doneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
        });
      });

      it(`returns false`, () => {
        expect(result).toBeFalse();
      });
    });
  });
});
