import { HistorySchema } from "../history-schema";
import { undoHistory } from ".";

describe(`undoHistory`, () => {
  describe(`when one step is done`, () => {
    let history: HistorySchema;

    beforeEach(() => {
      history = undoHistory({
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
        ],
        undoneSteps: [
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
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

    it(`removes the step from the done list`, () => {
      expect(history.doneSteps).toEqual([]);
    });

    it(`adds the step to the undone list`, () => {
      expect(history.undoneSteps).toEqual([
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
  });

  describe(`when two steps are done`, () => {
    let history: HistorySchema;

    beforeEach(() => {
      history = undoHistory({
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

    it(`removes one step from the done list`, () => {
      expect(history.doneSteps).toEqual([
        {
          type: `updateName`,
          name: `Test Updated Name A`,
        },
      ]);
    });

    it(`adds the step to the undone list`, () => {
      expect(history.undoneSteps).toEqual([
        {
          type: `updateName`,
          name: `Test Updated Name B`,
        },
        {
          type: `updateName`,
          name: `Test Updated Name C`,
        },
        {
          type: `updateName`,
          name: `Test Updated Name D`,
        },
      ]);
    });
  });

  describe(`when three steps are done`, () => {
    let history: HistorySchema;

    beforeEach(() => {
      history = undoHistory({
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
          {
            type: `updateName`,
            name: `Test Updated Name C`,
          },
        ],
        undoneSteps: [
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

    it(`removes one step from the done list`, () => {
      expect(history.doneSteps).toEqual([
        {
          type: `updateName`,
          name: `Test Updated Name A`,
        },
        {
          type: `updateName`,
          name: `Test Updated Name B`,
        },
      ]);
    });

    it(`adds the step to the undone list`, () => {
      expect(history.undoneSteps).toEqual([
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
      ]);
    });
  });
});
