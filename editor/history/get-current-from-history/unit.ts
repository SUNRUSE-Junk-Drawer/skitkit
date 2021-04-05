import { StateSchema } from "../../../schema/state-schema";
import { getCurrentFromHistory } from ".";

describe(`getCurrentFromHistory`, () => {
  describe(`when there are no done steps and no proposed step`, () => {
    let state: StateSchema;

    beforeAll(() => {
      state = getCurrentFromHistory({
        beforeSteps: {
          name: `Test Name`,
          backgrounds: {},
          characters: {},
          emotes: {},
          scenes: {},
          lines: {},
        },
        doneSteps: [],
        proposedStep: null,
        undoneSteps: [
          {
            type: `updateName`,
            name: `Test Updated Name A`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
        ],
      });
    });

    it(`returns the original state`, () => {
      expect(state).toEqual({
        name: `Test Name`,
        backgrounds: {},
        characters: {},
        emotes: {},
        scenes: {},
        lines: {},
      });
    });
  });

  describe(`when there is a proposed step which succeeds`, () => {
    let state: StateSchema;

    beforeAll(() => {
      state = getCurrentFromHistory({
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
          type: `createBackground`,
          backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
        },
        undoneSteps: [
          {
            type: `updateName`,
            name: `Test Updated Name A`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
        ],
      });
    });

    it(`returns the state once the step has been applied`, () => {
      expect(state).toEqual({
        name: `Test Name`,
        backgrounds: {
          "98ee4534-6577-4563-909b-fe2a8db0d841": {
            name: `Untitled Background`,
            svg: `<svg xmlns="http://www.w3.org/2000/svg" height="256" width="256"><defs><linearGradient y2="256" x2="256" y1="0" x1="0" id="A" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="red"/><stop offset=".375" stop-color="#ff0"/><stop offset=".5" stop-color="#0f0"/><stop offset=".625" stop-color="#0ff"/><stop offset="1" stop-color="#00f"/></linearGradient></defs><rect x="0" y="0" width="256" height="256" fill="url(#A)"/><rect x="16" y="16" width="224" height="224" fill="#fff"/><text y="128" x="128" font-size="16" font-family="sans-serif" dominant-baseline="middle" text-anchor="middle">PLACEHOLDER</text></svg>`,
          },
        },
        characters: {},
        emotes: {},
        scenes: {},
        lines: {},
      });
    });
  });

  describe(`when there is a proposed step which fails`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        getCurrentFromHistory({
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
            type: `updateBackgroundName`,
            backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
            name: `Test Updated Background Name`,
          },
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
        });
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected exception`, () => {
      expect(error).toEqual(
        new Error(
          `Entity background 98ee4534-6577-4563-909b-fe2a8db0d841 does not exist`
        )
      );
    });
  });

  describe(`when there is one done step which succeeds`, () => {
    let state: StateSchema;

    beforeAll(() => {
      state = getCurrentFromHistory({
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
            type: `createBackground`,
            backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
          },
        ],
        proposedStep: null,
        undoneSteps: [
          {
            type: `updateName`,
            name: `Test Updated Name A`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
        ],
      });
    });

    it(`returns the state once the step has been applied`, () => {
      expect(state).toEqual({
        name: `Test Name`,
        backgrounds: {
          "98ee4534-6577-4563-909b-fe2a8db0d841": {
            name: `Untitled Background`,
            svg: `<svg xmlns="http://www.w3.org/2000/svg" height="256" width="256"><defs><linearGradient y2="256" x2="256" y1="0" x1="0" id="A" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="red"/><stop offset=".375" stop-color="#ff0"/><stop offset=".5" stop-color="#0f0"/><stop offset=".625" stop-color="#0ff"/><stop offset="1" stop-color="#00f"/></linearGradient></defs><rect x="0" y="0" width="256" height="256" fill="url(#A)"/><rect x="16" y="16" width="224" height="224" fill="#fff"/><text y="128" x="128" font-size="16" font-family="sans-serif" dominant-baseline="middle" text-anchor="middle">PLACEHOLDER</text></svg>`,
          },
        },
        characters: {},
        emotes: {},
        scenes: {},
        lines: {},
      });
    });
  });

  describe(`when there is one done step which fails`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        getCurrentFromHistory({
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
              type: `updateBackgroundName`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
              name: `Test Updated Background Name`,
            },
          ],
          proposedStep: null,
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
        });
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected exception`, () => {
      expect(error).toEqual(
        new Error(
          `Entity background 98ee4534-6577-4563-909b-fe2a8db0d841 does not exist`
        )
      );
    });
  });

  describe(`when there is one done step and a proposed step which succeed`, () => {
    let state: StateSchema;

    beforeAll(() => {
      state = getCurrentFromHistory({
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
            type: `createBackground`,
            backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
          },
        ],
        proposedStep: {
          type: `updateBackgroundName`,
          backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
          name: `Test Updated Background Name`,
        },
        undoneSteps: [
          {
            type: `updateName`,
            name: `Test Updated Name A`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
        ],
      });
    });

    it(`returns the state once the steps has been applied in order`, () => {
      expect(state).toEqual({
        name: `Test Name`,
        backgrounds: {
          "98ee4534-6577-4563-909b-fe2a8db0d841": {
            name: `Test Updated Background Name`,
            svg: `<svg xmlns="http://www.w3.org/2000/svg" height="256" width="256"><defs><linearGradient y2="256" x2="256" y1="0" x1="0" id="A" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="red"/><stop offset=".375" stop-color="#ff0"/><stop offset=".5" stop-color="#0f0"/><stop offset=".625" stop-color="#0ff"/><stop offset="1" stop-color="#00f"/></linearGradient></defs><rect x="0" y="0" width="256" height="256" fill="url(#A)"/><rect x="16" y="16" width="224" height="224" fill="#fff"/><text y="128" x="128" font-size="16" font-family="sans-serif" dominant-baseline="middle" text-anchor="middle">PLACEHOLDER</text></svg>`,
          },
        },
        characters: {},
        emotes: {},
        scenes: {},
        lines: {},
      });
    });
  });

  describe(`when there is one done step and the done step fails`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        getCurrentFromHistory({
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
              type: `updateBackgroundName`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
              name: `Test Updated Background Name`,
            },
          ],
          proposedStep: {
            type: `createBackground`,
            backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
          },
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
        });
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected exception`, () => {
      expect(error).toEqual(
        new Error(
          `Entity background 98ee4534-6577-4563-909b-fe2a8db0d841 does not exist`
        )
      );
    });
  });

  describe(`when there is one done step and a proposed step and the proposed step fails`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        getCurrentFromHistory({
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
              type: `createBackground`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
            },
          ],
          proposedStep: {
            type: `updateBackgroundName`,
            backgroundUuid: `cf0b805c-9bea-426c-9fc1-11bafeea8758`,
            name: `Test Updated Background Name`,
          },
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
        });
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected exception`, () => {
      expect(error).toEqual(
        new Error(
          `Entity background cf0b805c-9bea-426c-9fc1-11bafeea8758 does not exist`
        )
      );
    });
  });

  describe(`when there are two done steps which succeed`, () => {
    let state: StateSchema;

    beforeAll(() => {
      state = getCurrentFromHistory({
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
            type: `createBackground`,
            backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
          },
          {
            type: `updateBackgroundName`,
            backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
            name: `Test Updated Background Name`,
          },
        ],
        proposedStep: null,
        undoneSteps: [
          {
            type: `updateName`,
            name: `Test Updated Name A`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
        ],
      });
    });

    it(`returns the state once the steps has been applied in order`, () => {
      expect(state).toEqual({
        name: `Test Name`,
        backgrounds: {
          "98ee4534-6577-4563-909b-fe2a8db0d841": {
            name: `Test Updated Background Name`,
            svg: `<svg xmlns="http://www.w3.org/2000/svg" height="256" width="256"><defs><linearGradient y2="256" x2="256" y1="0" x1="0" id="A" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="red"/><stop offset=".375" stop-color="#ff0"/><stop offset=".5" stop-color="#0f0"/><stop offset=".625" stop-color="#0ff"/><stop offset="1" stop-color="#00f"/></linearGradient></defs><rect x="0" y="0" width="256" height="256" fill="url(#A)"/><rect x="16" y="16" width="224" height="224" fill="#fff"/><text y="128" x="128" font-size="16" font-family="sans-serif" dominant-baseline="middle" text-anchor="middle">PLACEHOLDER</text></svg>`,
          },
        },
        characters: {},
        emotes: {},
        scenes: {},
        lines: {},
      });
    });
  });

  describe(`when there are two done steps and the first fails`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        getCurrentFromHistory({
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
              type: `updateBackgroundName`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
              name: `Test Updated Background Name`,
            },
            {
              type: `createBackground`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
            },
          ],
          proposedStep: null,
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
        });
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected exception`, () => {
      expect(error).toEqual(
        new Error(
          `Entity background 98ee4534-6577-4563-909b-fe2a8db0d841 does not exist`
        )
      );
    });
  });

  describe(`when there are two done steps and the second fails`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        getCurrentFromHistory({
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
              type: `createBackground`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
            },
            {
              type: `updateBackgroundName`,
              backgroundUuid: `cf0b805c-9bea-426c-9fc1-11bafeea8758`,
              name: `Test Updated Background Name`,
            },
          ],
          proposedStep: null,
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
        });
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected exception`, () => {
      expect(error).toEqual(
        new Error(
          `Entity background cf0b805c-9bea-426c-9fc1-11bafeea8758 does not exist`
        )
      );
    });
  });

  describe(`then there are two done steps and a proposed step which succeed`, () => {
    let state: StateSchema;

    beforeAll(() => {
      state = getCurrentFromHistory({
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
            type: `createBackground`,
            backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
          },
          {
            type: `createScene`,
            sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
            backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
            characterEmoteUuids: {},
          },
        ],
        proposedStep: {
          type: `updateSceneName`,
          sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
          name: `Test Updated Scene Name`,
        },
        undoneSteps: [
          {
            type: `updateName`,
            name: `Test Updated Name A`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
        ],
      });
    });

    it(`returns the state once the steps has been applied in order`, () => {
      expect(state).toEqual({
        name: `Test Name`,
        backgrounds: {
          "98ee4534-6577-4563-909b-fe2a8db0d841": {
            name: `Untitled Background`,
            svg: `<svg xmlns="http://www.w3.org/2000/svg" height="256" width="256"><defs><linearGradient y2="256" x2="256" y1="0" x1="0" id="A" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="red"/><stop offset=".375" stop-color="#ff0"/><stop offset=".5" stop-color="#0f0"/><stop offset=".625" stop-color="#0ff"/><stop offset="1" stop-color="#00f"/></linearGradient></defs><rect x="0" y="0" width="256" height="256" fill="url(#A)"/><rect x="16" y="16" width="224" height="224" fill="#fff"/><text y="128" x="128" font-size="16" font-family="sans-serif" dominant-baseline="middle" text-anchor="middle">PLACEHOLDER</text></svg>`,
          },
        },
        characters: {},
        emotes: {},
        scenes: {
          "5811cea5-ef49-4558-a73e-01276c1e1bdf": {
            name: "Test Updated Scene Name",
            backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
            lineUuids: [`5811cea5-ef49-4558-a73e-01276c1e1bdf`],
          },
        },
        lines: {
          "5811cea5-ef49-4558-a73e-01276c1e1bdf": {
            sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
            text: `(this line is yet to be written)`,
            characters: {},
          },
        },
      });
    });
  });

  describe(`then there are two done steps and a proposed step and the first fails`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        getCurrentFromHistory({
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
              type: `createScene`,
              sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
              characterEmoteUuids: {},
            },
            {
              type: `createBackground`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
            },
          ],
          proposedStep: {
            type: `updateSceneName`,
            sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
            name: `Test Updated Scene Name`,
          },
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
        });
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected exception`, () => {
      expect(error).toEqual(new Error(`No entities of type background exist`));
    });
  });

  describe(`then there are two done steps a proposed step and the second fails`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        getCurrentFromHistory({
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
              name: `Test Updated Name`,
            },
            {
              type: `createScene`,
              sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
              characterEmoteUuids: {},
            },
          ],
          proposedStep: {
            type: `updateSceneName`,
            sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
            name: `Test Updated Scene Name`,
          },
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
        });
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected exception`, () => {
      expect(error).toEqual(new Error(`No entities of type background exist`));
    });
  });

  describe(`then there are two done steps and a proposed step and the proposed step fails`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        getCurrentFromHistory({
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
              type: `createBackground`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
            },
            {
              type: `createScene`,
              sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
              characterEmoteUuids: {},
            },
          ],
          proposedStep: {
            type: `updateSceneName`,
            sceneUuid: `ad8ab2cb-56e6-4194-8ab0-4aeb67ba9f13`,
            name: `Test Updated Scene Name`,
          },
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
        });
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected exception`, () => {
      expect(error).toEqual(
        new Error(
          `Entity scene ad8ab2cb-56e6-4194-8ab0-4aeb67ba9f13 does not exist`
        )
      );
    });
  });

  describe(`then there are three done steps which succeed`, () => {
    let state: StateSchema;

    beforeAll(() => {
      state = getCurrentFromHistory({
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
            type: `createBackground`,
            backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
          },
          {
            type: `createScene`,
            sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
            backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
            characterEmoteUuids: {},
          },
          {
            type: `updateSceneName`,
            sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
            name: `Test Updated Scene Name`,
          },
        ],
        proposedStep: null,
        undoneSteps: [
          {
            type: `updateName`,
            name: `Test Updated Name A`,
          },
          {
            type: `updateName`,
            name: `Test Updated Name B`,
          },
        ],
      });
    });

    it(`returns the state once the steps has been applied in order`, () => {
      expect(state).toEqual({
        name: `Test Name`,
        backgrounds: {
          "98ee4534-6577-4563-909b-fe2a8db0d841": {
            name: `Untitled Background`,
            svg: `<svg xmlns="http://www.w3.org/2000/svg" height="256" width="256"><defs><linearGradient y2="256" x2="256" y1="0" x1="0" id="A" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="red"/><stop offset=".375" stop-color="#ff0"/><stop offset=".5" stop-color="#0f0"/><stop offset=".625" stop-color="#0ff"/><stop offset="1" stop-color="#00f"/></linearGradient></defs><rect x="0" y="0" width="256" height="256" fill="url(#A)"/><rect x="16" y="16" width="224" height="224" fill="#fff"/><text y="128" x="128" font-size="16" font-family="sans-serif" dominant-baseline="middle" text-anchor="middle">PLACEHOLDER</text></svg>`,
          },
        },
        characters: {},
        emotes: {},
        scenes: {
          "5811cea5-ef49-4558-a73e-01276c1e1bdf": {
            name: "Test Updated Scene Name",
            backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
            lineUuids: [`5811cea5-ef49-4558-a73e-01276c1e1bdf`],
          },
        },
        lines: {
          "5811cea5-ef49-4558-a73e-01276c1e1bdf": {
            sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
            text: `(this line is yet to be written)`,
            characters: {},
          },
        },
      });
    });
  });

  describe(`then there are three done steps and the first fails`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        getCurrentFromHistory({
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
              type: `createScene`,
              sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
              characterEmoteUuids: {},
            },
            {
              type: `createBackground`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
            },
            {
              type: `updateSceneName`,
              sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
              name: `Test Updated Scene Name`,
            },
          ],
          proposedStep: null,
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
        });
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected exception`, () => {
      expect(error).toEqual(new Error(`No entities of type background exist`));
    });
  });

  describe(`then there are three done steps and the second fails`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        getCurrentFromHistory({
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
              name: `Test Updated Name`,
            },
            {
              type: `createScene`,
              sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
              characterEmoteUuids: {},
            },
            {
              type: `updateSceneName`,
              sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
              name: `Test Updated Scene Name`,
            },
          ],
          proposedStep: null,
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
        });
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected exception`, () => {
      expect(error).toEqual(new Error(`No entities of type background exist`));
    });
  });

  describe(`then there are three done steps and the third fails`, () => {
    let error: Error;

    beforeAll(() => {
      try {
        getCurrentFromHistory({
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
              type: `createBackground`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
            },
            {
              type: `createScene`,
              sceneUuid: `5811cea5-ef49-4558-a73e-01276c1e1bdf`,
              backgroundUuid: `98ee4534-6577-4563-909b-fe2a8db0d841`,
              characterEmoteUuids: {},
            },
            {
              type: `updateSceneName`,
              sceneUuid: `ad8ab2cb-56e6-4194-8ab0-4aeb67ba9f13`,
              name: `Test Updated Scene Name`,
            },
          ],
          proposedStep: null,
          undoneSteps: [
            {
              type: `updateName`,
              name: `Test Updated Name A`,
            },
            {
              type: `updateName`,
              name: `Test Updated Name B`,
            },
          ],
        });
      } catch (e) {
        error = e;
      }
    });

    it(`throws the expected exception`, () => {
      expect(error).toEqual(
        new Error(
          `Entity scene ad8ab2cb-56e6-4194-8ab0-4aeb67ba9f13 does not exist`
        )
      );
    });
  });
});
