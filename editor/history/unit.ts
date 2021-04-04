import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsNonArrays,
  rejectsNonObjects,
} from "../../schema/unit";
import { Json } from "../..";
import { validateStateSchema } from "../../schema/state-schema/unit";
import { historySchema } from ".";
import { validateEventSchema } from "../../schema/event-schema/unit";

export function validateHistorySchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (lineState: Json) => Json
): void {
  describe(description, () => {
    const validBeforeSteps = {
      name: `Test Name`,
      backgrounds: {
        "1e1446e1-b30f-478e-ab61-9f143639e525": {
          name: `Test Background A Name`,
          svg: `Test Background A Svg`,
        },
        "26b1e863-83e5-4f5d-aff9-c118da7ab94f": {
          name: `Test Background B Name`,
          svg: `Test Background B Svg`,
        },
        "54150a11-d314-4ccd-b7d1-1434622c9fa4": {
          name: `Test Background C Name`,
          svg: `Test Background C Svg`,
        },
        "9a814f11-8be3-44c1-aa72-3189f12b4845": {
          name: `Test Background D Name`,
          svg: `Test Background D Svg`,
        },
      },
      characters: {
        "d2a53a5b-e67f-4f8f-a0a0-cc6822b3b0a8": {
          name: `Test Character Name A`,
          emoteUuids: [
            `3884c6f7-a0a7-4ba4-9ea0-b9f2cff58897`,
            `3fc0295e-b3c5-4e56-bc1f-7ebb88532959`,
            `2deb48bc-80ae-4390-887a-fb1ae5871867`,
          ],
        },
        "d250d831-a15a-495f-9c6f-351a321e0f54": {
          name: `Test Character Name B`,
          emoteUuids: [`70fe3b5e-6e90-4d5a-aaa1-328b0a2799b4`],
        },
        "71a14866-09f6-44d1-aca1-81fa189f2e63": {
          name: `Test Character Name C`,
          emoteUuids: [
            `71a14866-09f6-44d1-aca1-81fa189f2e63`,
            `e8add675-8363-44ae-9298-63640ba24372`,
            `d8855df2-f55e-4c31-a21f-1d4d41f0d0f9`,
            `305880ed-85ee-45fe-b4c1-ea390735a79f`,
          ],
        },
      },
      emotes: {
        "307a6fc7-1ccf-4846-b3f2-c07fc0cd75da": {
          characterUuid: `ddcf88c2-4822-406d-b508-3a385865b1f2`,
          name: `Test Emote A Name`,
          svg: `Test Emote A Svg`,
        },
        "c29bc6c0-94b1-436a-ba53-55afda173c83": {
          characterUuid: `3c438c32-dd40-41db-8003-1ce6acd7d3fd`,
          name: `Test Emote B Name`,
          svg: `Test Emote B Svg`,
        },
        "82a1c2b1-5c7c-4590-978b-fb8f2c921814": {
          characterUuid: `bd1b007c-5191-4837-8666-77695233e98e`,
          name: `Test Emote C Name`,
          svg: `Test Emote C Svg`,
        },
        "054c5472-7192-45fa-bacc-4195138c54d6": {
          characterUuid: `79322a08-5807-4bcc-a99f-d058be365904`,
          name: `Test Emote D Name`,
          svg: `Test Emote D Svg`,
        },
        "a1ae9194-4a44-4878-af08-e1117b564c2e": {
          characterUuid: `06a9e5b0-4363-42fc-925c-1fb1f45af066`,
          name: `Test Emote E Name`,
          svg: `Test Emote E Svg`,
        },
      },
      scenes: {
        "9bb64416-6f14-482f-87b0-02e8657deb4d": {
          name: `Test Scene A Name`,
          backgroundUuid: `56335959-23dc-427e-9920-1bd5b450ba15`,
          lineUuids: [
            `67a7b540-98ea-4e97-bfb9-bfc4208cf8f1`,
            `cc1f74ea-907f-45f7-819d-15cb23a59be9`,
            `b5af717f-b94d-412b-8b51-7d35bc764567`,
            `8b5d0bb5-a899-4a99-a8fa-7e0a8e90f115`,
          ],
        },
        "fabfa033-9303-4055-b826-437be40c1bf9": {
          name: `Test Scene B Name`,
          backgroundUuid: `c3de01ef-d820-48fa-bb4c-f7159bf39424`,
          lineUuids: [
            `52109cde-ca83-45f5-90d0-7206c30e108f`,
            `9b64f4d8-cb5e-4fa0-8399-c766675bd313`,
            `6268ceb1-1d9e-4df1-aeee-42ef0c6c9e4a`,
          ],
        },
        "98f9b7ab-3091-427d-9ce5-817814fbd153": {
          name: `Test Scene C Name`,
          backgroundUuid: `2984d0fb-b0c2-4f6f-b04a-be016a5573ef`,
          lineUuids: [
            `6e551251-f5f5-4df6-9ee7-f5283ff81920`,
            `53f46bd7-1a0f-4a96-a551-880fa6608a7c`,
          ],
        },
      },
      lines: {
        "76fcc1ed-6b15-47c8-a97b-7e331230e469": {
          sceneUuid: `c49da74f-4d94-4f86-b62b-7ee756221063`,
          text: `Test Line A Text`,
          characters: {
            "80b66a07-26ee-4750-a9af-851c8622121b": {
              emoteUuid: `636e08e1-e3f4-43ab-901b-a7aa714d783e`,
            },
            "04923211-066d-4cba-bc42-1c915d085d28": {
              emoteUuid: `39c3d457-6553-4866-9b0c-c472743a91e7`,
            },
            "e4dc3e46-b359-4580-8fd7-7f8ce3bbe0fe": {
              emoteUuid: `43ccd6b5-2c71-471b-8fc9-c8a5ef8f7d06`,
            },
          },
        },
        "49d4b834-ba84-4fd5-8f88-687d1607ec7a": {
          sceneUuid: `44853bda-6edf-4225-970d-09dc9198c3a0`,
          text: `Test Line B Text`,
          characters: {
            "4ef9048c-57cc-47dc-a29a-e97e4c0d7e02": {
              emoteUuid: `44613275-d858-495b-b035-416c2084c857`,
            },
            "f3d1042a-c3bc-4686-913e-cf80269ad5a4": {
              emoteUuid: `8b422776-52f1-48ae-b384-adf065920251`,
            },
            "1e55e241-e506-4473-9ba0-7b887c8fafe1": {
              emoteUuid: `afa9fe5b-c1eb-4ca6-a721-5f18a65904ac`,
            },
            "503f6826-1105-47fb-b741-2b6a7cffd654": {
              emoteUuid: `ed9bb8f7-726d-492a-82fc-ef601f81bb78`,
            },
          },
        },
      },
    };

    const validDoneStepA = {
      type: `createScene`,
      sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      backgroundUuid: `45ff2bbf-7960-4be7-9742-a0d82316a9f1`,
      characterEmoteUuids: {
        "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
        "b3c27180-f8f9-4bbf-94a3-b50df6056114": `d982f79e-c16e-4224-85d9-b93946257052`,
        "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
      },
    };

    const validDoneStepB = {
      type: `updateEmoteSvg`,
      emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      svg: `Test Svg`,
    };

    const validDoneStepC = {
      type: `updateCharacterName`,
      characterUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      name: `Test Name`,
    };

    const validUndoneStepA = {
      type: `updateLineCharacterEmote`,
      lineUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      emoteUuid: `abb928c7-51a7-4138-a3b8-1ad78a1773d8`,
    };

    const validUndoneStepB = {
      type: `deleteScene`,
      sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
    };

    const validUndoneStepC = {
      type: `createCharacter`,
      characterUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
    };

    const validUndoneStepD = {
      type: `updateBackgroundName`,
      backgroundUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      name: `Test Name`,
    };

    accepts(
      `valid`,
      instanceFactory({
        beforeSteps: validBeforeSteps,
        doneSteps: [validDoneStepA, validDoneStepB, validDoneStepC],
        undoneSteps: [
          validUndoneStepA,
          validUndoneStepB,
          validUndoneStepC,
          validUndoneStepD,
        ],
      }),
      schema
    );

    rejectsNonObjects(
      `non-object`,
      schema,
      path,
      unpredictableErrors,
      (nonObject) => instanceFactory(nonObject)
    );

    rejectsMissingProperty(
      `beforeSteps`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        doneSteps: [validDoneStepA, validDoneStepB, validDoneStepC],
        undoneSteps: [
          validUndoneStepA,
          validUndoneStepB,
          validUndoneStepC,
          validUndoneStepD,
        ],
      })
    );

    validateStateSchema(
      `beforeSteps`,
      schema,
      `${path}/beforeSteps`,
      true,
      (beforeSteps) => ({
        beforeSteps,
        doneSteps: [validDoneStepA, validDoneStepB, validDoneStepC],
        undoneSteps: [
          validUndoneStepA,
          validUndoneStepB,
          validUndoneStepC,
          validUndoneStepD,
        ],
      })
    );

    rejectsMissingProperty(
      `doneSteps`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        beforeSteps: validBeforeSteps,
        undoneSteps: [
          validUndoneStepA,
          validUndoneStepB,
          validUndoneStepC,
          validUndoneStepD,
        ],
      })
    );

    rejectsNonArrays(
      `doneSteps non-array`,
      schema,
      `${path}/doneSteps`,
      unpredictableErrors,
      (doneSteps) => ({
        beforeSteps: validBeforeSteps,
        doneSteps,
        undoneSteps: [
          validUndoneStepA,
          validUndoneStepB,
          validUndoneStepC,
          validUndoneStepD,
        ],
      })
    );

    validateEventSchema(
      `doneSteps`,
      schema,
      `${path}/doneSteps/1`,
      (event) => ({
        beforeSteps: validBeforeSteps,
        doneSteps: [validDoneStepA, event, validDoneStepB],
        undoneSteps: [
          validUndoneStepA,
          validUndoneStepB,
          validUndoneStepC,
          validUndoneStepD,
        ],
      })
    );

    rejectsMissingProperty(
      `undoneSteps`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        beforeSteps: validBeforeSteps,
        doneSteps: [validDoneStepA, validDoneStepB, validDoneStepC],
      })
    );

    rejectsNonArrays(
      `undoneSteps non-array`,
      schema,
      `${path}/undoneSteps`,
      unpredictableErrors,
      (undoneSteps) => ({
        beforeSteps: validBeforeSteps,
        doneSteps: [validDoneStepA, validDoneStepB, validDoneStepC],
        undoneSteps,
      })
    );

    validateEventSchema(
      `undoneSteps`,
      schema,
      `${path}/undoneSteps/2`,
      (event) => ({
        beforeSteps: validBeforeSteps,
        doneSteps: [validDoneStepA, validDoneStepB, validDoneStepB],
        undoneSteps: [
          validUndoneStepA,
          validUndoneStepB,
          event,
          validUndoneStepD,
        ],
      })
    );
  });
}

validateHistorySchema(
  `historySchema`,
  historySchema,
  `instance`,
  false,
  (history) => history
);
