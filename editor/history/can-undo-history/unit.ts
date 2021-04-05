import { canUndoHistory } from ".";

describe(`canUndoHistory`, () => {
  describe(`when no step is proposed`, () => {
    describe(`when no done steps exist`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canUndoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
          proposedStep: null,
          doneSteps: [],
        });
      });

      it(`returns false`, () => {
        expect(result).toBeFalse();
      });
    });

    describe(`when one done step exists`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canUndoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
          proposedStep: null,
          doneSteps: [{ type: `updateName`, name: `Test Updated Name C` }],
        });
      });

      it(`returns true`, () => {
        expect(result).toBeTrue();
      });
    });

    describe(`when two done steps exist`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canUndoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
          proposedStep: null,
          doneSteps: [
            { type: `updateName`, name: `Test Updated Name C` },
            { type: `updateName`, name: `Test Updated Name D` },
          ],
        });
      });

      it(`returns true`, () => {
        expect(result).toBeTrue();
      });
    });

    describe(`when three done steps exist`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canUndoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
          proposedStep: null,
          doneSteps: [
            { type: `updateName`, name: `Test Updated Name C` },
            { type: `updateName`, name: `Test Updated Name D` },
            { type: `updateName`, name: `Test Updated Name E` },
          ],
        });
      });

      it(`returns true`, () => {
        expect(result).toBeTrue();
      });
    });
  });

  describe(`when a step is proposed`, () => {
    describe(`when no done steps exist`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canUndoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
          proposedStep: { type: `updateName`, name: `Test Updated Name F` },
          doneSteps: [],
        });
      });

      it(`returns true`, () => {
        expect(result).toBeTrue();
      });
    });

    describe(`when one done step exists`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canUndoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
          proposedStep: { type: `updateName`, name: `Test Updated Name F` },
          doneSteps: [{ type: `updateName`, name: `Test Updated Name C` }],
        });
      });

      it(`returns true`, () => {
        expect(result).toBeTrue();
      });
    });

    describe(`when two done steps exist`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canUndoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
          proposedStep: { type: `updateName`, name: `Test Updated Name F` },
          doneSteps: [
            { type: `updateName`, name: `Test Updated Name C` },
            { type: `updateName`, name: `Test Updated Name D` },
          ],
        });
      });

      it(`returns true`, () => {
        expect(result).toBeTrue();
      });
    });

    describe(`when three done steps exist`, () => {
      let result: boolean;

      beforeAll(() => {
        result = canUndoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          undoneSteps: [
            { type: `updateName`, name: `Test Updated Name A` },
            { type: `updateName`, name: `Test Updated Name B` },
          ],
          proposedStep: { type: `updateName`, name: `Test Updated Name F` },
          doneSteps: [
            { type: `updateName`, name: `Test Updated Name C` },
            { type: `updateName`, name: `Test Updated Name D` },
            { type: `updateName`, name: `Test Updated Name E` },
          ],
        });
      });

      it(`returns true`, () => {
        expect(result).toBeTrue();
      });
    });
  });
});
