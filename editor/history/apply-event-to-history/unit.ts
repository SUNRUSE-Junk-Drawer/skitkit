import { HistorySchema } from "../history-schema";
import { applyEventToHistory } from ".";

describe(`applyEventToHistory`, () => {
  describe(`when no events have been done`, () => {
    let result: HistorySchema;

    beforeAll(() => {
      result = applyEventToHistory(
        {
          type: `updateBackgroundName`,
          backgroundUuid: `9a8e4994-8f94-4843-b28c-29c38cd1b365`,
          name: `Test Updated Background Name`,
        },
        {
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {
              "9a8e4994-8f94-4843-b28c-29c38cd1b365": {
                name: `Test Background Name`,
                svg: `Test Svg`,
              },
            },
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          doneSteps: [],
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
        }
      );
    });

    it(`does not change the state`, () => {
      expect(result.beforeSteps).toEqual({
        name: `Test Name`,
        backgrounds: {
          "9a8e4994-8f94-4843-b28c-29c38cd1b365": {
            name: `Test Background Name`,
            svg: `Test Svg`,
          },
        },
        characters: {},
        emotes: {},
        scenes: {},
        lines: {},
      });
    });

    it(`includes the new event`, () => {
      expect(result.doneSteps).toEqual([
        {
          type: `updateBackgroundName`,
          backgroundUuid: `9a8e4994-8f94-4843-b28c-29c38cd1b365`,
          name: `Test Updated Background Name`,
        },
      ]);
    });

    it(`clears the undone events`, () => {
      expect(result.undoneSteps).toEqual([]);
    });
  });

  describe(`when one event has been done`, () => {
    let result: HistorySchema;

    beforeAll(() => {
      result = applyEventToHistory(
        {
          type: `updateBackgroundName`,
          backgroundUuid: `9a8e4994-8f94-4843-b28c-29c38cd1b365`,
          name: `Test Updated Background Name`,
        },
        {
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {
              "9a8e4994-8f94-4843-b28c-29c38cd1b365": {
                name: `Test Background Name`,
                svg: `Test Svg`,
              },
            },
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          doneSteps: [
            {
              type: `createBackground`,
              backgroundUuid: `949de1e2-2649-44e7-a73c-b90cb68813b5`,
            },
          ],
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
        }
      );
    });

    it(`does not change the state`, () => {
      expect(result.beforeSteps).toEqual({
        name: `Test Name`,
        backgrounds: {
          "9a8e4994-8f94-4843-b28c-29c38cd1b365": {
            name: `Test Background Name`,
            svg: `Test Svg`,
          },
        },
        characters: {},
        emotes: {},
        scenes: {},
        lines: {},
      });
    });

    it(`includes the new event`, () => {
      expect(result.doneSteps).toEqual([
        {
          type: `createBackground`,
          backgroundUuid: `949de1e2-2649-44e7-a73c-b90cb68813b5`,
        },
        {
          type: `updateBackgroundName`,
          backgroundUuid: `9a8e4994-8f94-4843-b28c-29c38cd1b365`,
          name: `Test Updated Background Name`,
        },
      ]);
    });

    it(`clears the undone events`, () => {
      expect(result.undoneSteps).toEqual([]);
    });
  });

  describe(`when four events have been done`, () => {
    let result: HistorySchema;

    beforeAll(() => {
      result = applyEventToHistory(
        {
          type: `updateBackgroundName`,
          backgroundUuid: `9a8e4994-8f94-4843-b28c-29c38cd1b365`,
          name: `Test Updated Background Name`,
        },
        {
          beforeSteps: {
            name: `Test Name`,
            backgrounds: {
              "9a8e4994-8f94-4843-b28c-29c38cd1b365": {
                name: `Test Background Name`,
                svg: `Test Svg`,
              },
            },
            characters: {},
            emotes: {},
            scenes: {},
            lines: {},
          },
          doneSteps: [
            {
              type: `createBackground`,
              backgroundUuid: `949de1e2-2649-44e7-a73c-b90cb68813b5`,
            },
            {
              type: `createBackground`,
              backgroundUuid: `6a9337f4-e41d-432f-a00a-231f5b6e8775`,
            },
            {
              type: `createBackground`,
              backgroundUuid: `ed185ecf-2791-4124-ad32-6de063eb4d2e`,
            },
            {
              type: `createBackground`,
              backgroundUuid: `80bedd32-2e7b-495f-8fba-408903017884`,
            },
          ],
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
        }
      );
    });

    it(`does not change the state`, () => {
      expect(result.beforeSteps).toEqual({
        name: `Test Name`,
        backgrounds: {
          "9a8e4994-8f94-4843-b28c-29c38cd1b365": {
            name: `Test Background Name`,
            svg: `Test Svg`,
          },
        },
        characters: {},
        emotes: {},
        scenes: {},
        lines: {},
      });
    });

    it(`includes the new event`, () => {
      expect(result.doneSteps).toEqual([
        {
          type: `createBackground`,
          backgroundUuid: `949de1e2-2649-44e7-a73c-b90cb68813b5`,
        },
        {
          type: `createBackground`,
          backgroundUuid: `6a9337f4-e41d-432f-a00a-231f5b6e8775`,
        },
        {
          type: `createBackground`,
          backgroundUuid: `ed185ecf-2791-4124-ad32-6de063eb4d2e`,
        },
        {
          type: `createBackground`,
          backgroundUuid: `80bedd32-2e7b-495f-8fba-408903017884`,
        },
        {
          type: `updateBackgroundName`,
          backgroundUuid: `9a8e4994-8f94-4843-b28c-29c38cd1b365`,
          name: `Test Updated Background Name`,
        },
      ]);
    });

    it(`clears the undone events`, () => {
      expect(result.undoneSteps).toEqual([]);
    });
  });

  describe(`when five events have been done`, () => {
    describe(`when applying the first done step succeeds`, () => {
      let result: HistorySchema;

      beforeAll(() => {
        result = applyEventToHistory(
          {
            type: `updateBackgroundName`,
            backgroundUuid: `9a8e4994-8f94-4843-b28c-29c38cd1b365`,
            name: `Test Updated Background Name`,
          },
          {
            beforeSteps: {
              name: `Test Name`,
              backgrounds: {
                "9a8e4994-8f94-4843-b28c-29c38cd1b365": {
                  name: `Test Background Name`,
                  svg: `Test Svg`,
                },
              },
              characters: {},
              emotes: {},
              scenes: {},
              lines: {},
            },
            doneSteps: [
              {
                type: `createBackground`,
                backgroundUuid: `949de1e2-2649-44e7-a73c-b90cb68813b5`,
              },
              {
                type: `createBackground`,
                backgroundUuid: `6a9337f4-e41d-432f-a00a-231f5b6e8775`,
              },
              {
                type: `createBackground`,
                backgroundUuid: `ed185ecf-2791-4124-ad32-6de063eb4d2e`,
              },
              {
                type: `createBackground`,
                backgroundUuid: `80bedd32-2e7b-495f-8fba-408903017884`,
              },
              {
                type: `createBackground`,
                backgroundUuid: `0c82de84-7665-4221-a57f-48411a0a0611`,
              },
            ],
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
          }
        );
      });

      it(`applies the first done event to the state`, () => {
        expect(result.beforeSteps).toEqual({
          name: `Test Name`,
          backgrounds: {
            "9a8e4994-8f94-4843-b28c-29c38cd1b365": {
              name: `Test Background Name`,
              svg: `Test Svg`,
            },
            "949de1e2-2649-44e7-a73c-b90cb68813b5": {
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

      it(`includes the new event, and drops the oldest`, () => {
        expect(result.doneSteps).toEqual([
          {
            type: `createBackground`,
            backgroundUuid: `6a9337f4-e41d-432f-a00a-231f5b6e8775`,
          },
          {
            type: `createBackground`,
            backgroundUuid: `ed185ecf-2791-4124-ad32-6de063eb4d2e`,
          },
          {
            type: `createBackground`,
            backgroundUuid: `80bedd32-2e7b-495f-8fba-408903017884`,
          },
          {
            type: `createBackground`,
            backgroundUuid: `0c82de84-7665-4221-a57f-48411a0a0611`,
          },
          {
            type: `updateBackgroundName`,
            backgroundUuid: `9a8e4994-8f94-4843-b28c-29c38cd1b365`,
            name: `Test Updated Background Name`,
          },
        ]);
      });

      it(`clears the undone events`, () => {
        expect(result.undoneSteps).toEqual([]);
      });
    });

    describe(`when applying the first done step fails`, () => {
      let error: Error;

      beforeAll(() => {
        try {
          applyEventToHistory(
            {
              type: `updateBackgroundName`,
              backgroundUuid: `9a8e4994-8f94-4843-b28c-29c38cd1b365`,
              name: `Test Updated Background Name`,
            },
            {
              beforeSteps: {
                name: `Test Name`,
                backgrounds: {
                  "9a8e4994-8f94-4843-b28c-29c38cd1b365": {
                    name: `Test Background Name`,
                    svg: `Test Svg`,
                  },
                },
                characters: {},
                emotes: {},
                scenes: {},
                lines: {},
              },
              doneSteps: [
                {
                  type: `deleteBackground`,
                  backgroundUuid: `949de1e2-2649-44e7-a73c-b90cb68813b5`,
                },
                {
                  type: `createBackground`,
                  backgroundUuid: `6a9337f4-e41d-432f-a00a-231f5b6e8775`,
                },
                {
                  type: `createBackground`,
                  backgroundUuid: `ed185ecf-2791-4124-ad32-6de063eb4d2e`,
                },
                {
                  type: `createBackground`,
                  backgroundUuid: `80bedd32-2e7b-495f-8fba-408903017884`,
                },
                {
                  type: `createBackground`,
                  backgroundUuid: `0c82de84-7665-4221-a57f-48411a0a0611`,
                },
              ],
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
            }
          );
        } catch (e) {
          error = e;
        }
      });

      it(`throws the error`, () => {
        expect(error).toEqual(
          new Error(
            `Entity background 949de1e2-2649-44e7-a73c-b90cb68813b5 does not exist`
          )
        );
      });
    });
  });
});
