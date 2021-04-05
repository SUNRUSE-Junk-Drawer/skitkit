import { HistorySchema } from "../history-schema";
import { undoHistory } from ".";

describe(`undoHistory`, () => {
  describe(`when a step is proposed`, () => {
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
        doneSteps: [],
        proposedStep: {
          type: `updateName`,
          name: `Test Updated Name A`,
        },
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

    it(`does not modify the done list`, () => {
      expect(history.doneSteps).toEqual([]);
    });

    it(`clears the proposed step`, () => {
      expect(history.proposedStep).toBeNull();
    });

    it(`does not modify the undone list`, () => {
      expect(history.undoneSteps).toEqual([
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
        proposedStep: null,
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

    it(`does not propose a step`, () => {
      expect(history.proposedStep).toBeNull();
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

  describe(`when a step is proposed and a step is done`, () => {
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
        proposedStep: {
          type: `updateName`,
          name: `Test Updated Name B`,
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

    it(`does not modify the done list`, () => {
      expect(history.doneSteps).toEqual([
        { type: `updateName`, name: `Test Updated Name A` },
      ]);
    });

    it(`clears the proposed step`, () => {
      expect(history.proposedStep).toBeNull();
    });

    it(`does not modify the undone list`, () => {
      expect(history.undoneSteps).toEqual([
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

    it(`removes one step from the done list`, () => {
      expect(history.doneSteps).toEqual([
        {
          type: `updateName`,
          name: `Test Updated Name A`,
        },
      ]);
    });

    it(`does not propose a step`, () => {
      expect(history.proposedStep).toBeNull();
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

  describe(`when a step is proposed and two steps are done`, () => {
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
        proposedStep: {
          type: `updateName`,
          name: `Test Updated Name C`,
        },
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

    it(`does not modify the done list`, () => {
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

    it(`clears the proposed step`, () => {
      expect(history.proposedStep).toBeNull();
    });

    it(`does not modify the undone list`, () => {
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
        proposedStep: null,
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

    it(`does not propose a step`, () => {
      expect(history.proposedStep).toBeNull();
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

  describe(`when a step is proposed and three steps are done`, () => {
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
        proposedStep: {
          type: `updateName`,
          name: `Test Updated Name D`,
        },
        undoneSteps: [
          {
            type: `updateName`,
            name: `Test Updated Name E`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name F`,
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

    it(`does not modify the done list`, () => {
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

    it(`clears the proposed step`, () => {
      expect(history.proposedStep).toBeNull();
    });

    it(`does not modify the undone list`, () => {
      expect(history.undoneSteps).toEqual([
        {
          type: `updateName`,
          name: `Test Updated Name E`,
        },
        {
          type: `updateName`,
          name: `Test Updated Name F`,
        },
      ]);
    });
  });
});
