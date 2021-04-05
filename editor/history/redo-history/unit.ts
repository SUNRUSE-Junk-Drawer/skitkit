import { HistorySchema } from "../history-schema";
import { redoHistory } from ".";

describe(`redoHistory`, () => {
  describe(`when no step is proposed`, () => {
    describe(`when one step is undone`, () => {
      let history: HistorySchema;

      beforeEach(() => {
        history = redoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          doneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
          proposedStep: null,
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name C`,
            },
          ],
        });
      });

      it(`returns the original state`, () => {
        expect(history.beforeSteps).toEqual({
          name: `Test Name`,
          backgrounds: {},
          characters: {},
          emotes: {},
          scenes: {},
          lines: {},
        });
      });

      it(`adds the step to the done list`, () => {
        expect(history.doneSteps).toEqual([
          {
            type: `updateName`,
            name: `Test Updated Name A`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name C`,
          },
        ]);
      });

      it(`removes the step from the undone list`, () => {
        expect(history.undoneSteps).toEqual([]);
      });

      it(`does not propose a step`, () => {
        expect(history.proposedStep).toBeNull();
      });
    });

    describe(`when two steps are undone`, () => {
      let history: HistorySchema;

      beforeEach(() => {
        history = redoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          doneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
          proposedStep: null,
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name C`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name D`,
            },
          ],
        });
      });

      it(`returns the original state`, () => {
        expect(history.beforeSteps).toEqual({
          name: `Test Name`,
          backgrounds: {},
          characters: {},
          emotes: {},
          scenes: {},
          lines: {},
        });
      });

      it(`adds the step to the done list`, () => {
        expect(history.doneSteps).toEqual([
          {
            type: `updateName`,
            name: `Test Updated Name A`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name C`,
          },
        ]);
      });

      it(`removes one step from the undone list`, () => {
        expect(history.undoneSteps).toEqual([
          {
            type: `updateName`,
            name: `Test Updated Name D`,
          },
        ]);
      });

      it(`does not propose a step`, () => {
        expect(history.proposedStep).toBeNull();
      });
    });

    describe(`when three steps are undone`, () => {
      let history: HistorySchema;

      beforeEach(() => {
        history = redoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          doneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
          proposedStep: null,
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name C`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name D`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name E`,
            },
          ],
        });
      });

      it(`returns the original state`, () => {
        expect(history.beforeSteps).toEqual({
          name: `Test Name`,
          backgrounds: {},
          characters: {},
          emotes: {},
          scenes: {},
          lines: {},
        });
      });

      it(`adds the step to the done list`, () => {
        expect(history.doneSteps).toEqual([
          {
            type: `updateName`,
            name: `Test Updated Name A`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name C`,
          },
        ]);
      });

      it(`removes one step from the undone list`, () => {
        expect(history.undoneSteps).toEqual([
          {
            type: `updateName`,
            name: `Test Updated Name D`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name E`,
          },
        ]);
      });

      it(`does not propose a step`, () => {
        expect(history.proposedStep).toBeNull();
      });
    });
  });

  describe(`when a step is proposed`, () => {
    describe(`when one step is undone`, () => {
      let history: HistorySchema;

      beforeEach(() => {
        history = redoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          doneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
          proposedStep: {
            type: `updateName`,
            name: `Test Updated Name F`,
          },
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name C`,
            },
          ],
        });
      });

      it(`returns the original state`, () => {
        expect(history.beforeSteps).toEqual({
          name: `Test Name`,
          backgrounds: {},
          characters: {},
          emotes: {},
          scenes: {},
          lines: {},
        });
      });

      it(`adds the step to the done list`, () => {
        expect(history.doneSteps).toEqual([
          {
            type: `updateName`,
            name: `Test Updated Name A`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name C`,
          },
        ]);
      });

      it(`removes the step from the undone list`, () => {
        expect(history.undoneSteps).toEqual([]);
      });

      it(`clears the proposed step`, () => {
        expect(history.proposedStep).toBeNull();
      });
    });

    describe(`when two steps are undone`, () => {
      let history: HistorySchema;

      beforeEach(() => {
        history = redoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          doneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
          proposedStep: {
            type: `updateName`,
            name: `Test Updated Name F`,
          },
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name C`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name D`,
            },
          ],
        });
      });

      it(`returns the original state`, () => {
        expect(history.beforeSteps).toEqual({
          name: `Test Name`,
          backgrounds: {},
          characters: {},
          emotes: {},
          scenes: {},
          lines: {},
        });
      });

      it(`adds the step to the done list`, () => {
        expect(history.doneSteps).toEqual([
          {
            type: `updateName`,
            name: `Test Updated Name A`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name C`,
          },
        ]);
      });

      it(`removes one step from the undone list`, () => {
        expect(history.undoneSteps).toEqual([
          {
            type: `updateName`,
            name: `Test Updated Name D`,
          },
        ]);
      });

      it(`clears the proposed step`, () => {
        expect(history.proposedStep).toBeNull();
      });
    });

    describe(`when three steps are undone`, () => {
      let history: HistorySchema;

      beforeEach(() => {
        history = redoHistory({
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {},
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          doneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
          proposedStep: {
            type: `updateName`,
            name: `Test Updated Name F`,
          },
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name C`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name D`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name E`,
            },
          ],
        });
      });

      it(`returns the original state`, () => {
        expect(history.beforeSteps).toEqual({
          name: `Test Name`,
          backgrounds: {},
          characters: {},
          emotes: {},
          scenes: {},
          lines: {},
        });
      });

      it(`adds the step to the done list`, () => {
        expect(history.doneSteps).toEqual([
          {
            type: `updateName`,
            name: `Test Updated Name A`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name C`,
          },
        ]);
      });

      it(`removes one step from the undone list`, () => {
        expect(history.undoneSteps).toEqual([
          {
            type: `updateName`,
            name: `Test Updated Name D`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name E`,
          },
        ]);
      });

      it(`clears the proposed step`, () => {
        expect(history.proposedStep).toBeNull();
      });
    });
  });
});
