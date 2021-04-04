import * as ajv from "ajv";
import { accepts, rejectsNonObjects, rejectsMissingProperty } from "../unit";
import { Json, stateSchema } from "../..";
import { validateNameSchema } from "../name-schema/unit";
import { validateUuidMapSchema } from "../uuid-schema/unit";
import { validateBackgroundStateSchema } from "./background-state-schema/unit";
import { validateCharacterStateSchema } from "./character-state-schema/unit";
import { validateEmoteStateSchema } from "./emote-state-schema/unit";
import { validateSceneStateSchema } from "./scene-state-schema/unit";
import { validateLineStateSchema } from "./line-state-schema/unit";

export function validateStateSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (sceneState: Json) => Json
): void {
  describe(description, () => {
    const backgrounds = {
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
    };

    const characters = {
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
    };

    const emotes = {
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
    };

    const scenes = {
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
    };

    const lines = {
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
    };

    accepts(
      `valid`,
      instanceFactory({
        name: `Test Name`,
        backgrounds,
        characters,
        emotes,
        scenes,
        lines,
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
      `name`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        backgrounds,
        characters,
        emotes,
        scenes,
        lines,
      })
    );

    validateNameSchema(
      `name`,
      schema,
      `${path}/name`,
      unpredictableErrors,
      (name) =>
        instanceFactory({
          name,
          backgrounds,
          characters,
          emotes,
          scenes,
          lines,
        })
    );

    rejectsMissingProperty(
      `backgrounds`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        name: `Test Name`,
        characters,
        emotes,
        scenes,
        lines,
      })
    );

    validateUuidMapSchema(
      `backgrounds`,
      schema,
      `${path}/backgrounds`,
      unpredictableErrors,
      (injectedBackgrounds) =>
        instanceFactory({
          name: `Test Name`,
          backgrounds: injectedBackgrounds,
          characters,
          emotes,
          scenes,
          lines,
        }),
      {
        name: `Test Background A Name`,
        svg: `Test Background A Svg`,
      },
      {
        name: `Test Background B Name`,
        svg: `Test Background B Svg`,
      },
      {
        name: `Test Background C Name`,
        svg: `Test Background C Svg`,
      }
    );

    validateBackgroundStateSchema(
      `backgrounds`,
      schema,
      `${path}/backgrounds/77577025-547c-4de5-b60e-b5bb2fc7fe77`,
      unpredictableErrors,
      (background) =>
        instanceFactory({
          name: `Test Name`,
          backgrounds: {
            ...backgrounds,
            "77577025-547c-4de5-b60e-b5bb2fc7fe77": background,
          },
          characters,
          emotes,
          scenes,
          lines,
        })
    );

    rejectsMissingProperty(
      `characters`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        name: `Test Name`,
        backgrounds,
        emotes,
        scenes,
        lines,
      })
    );

    validateUuidMapSchema(
      `characters`,
      schema,
      `${path}/characters`,
      unpredictableErrors,
      (injectedCharacters) =>
        instanceFactory({
          name: `Test Name`,
          backgrounds,
          characters: injectedCharacters,
          emotes,
          scenes,
          lines,
        }),
      {
        name: `Test Character Name A`,
        emoteUuids: [
          `3884c6f7-a0a7-4ba4-9ea0-b9f2cff58897`,
          `3fc0295e-b3c5-4e56-bc1f-7ebb88532959`,
          `2deb48bc-80ae-4390-887a-fb1ae5871867`,
        ],
      },
      {
        name: `Test Character Name B`,
        emoteUuids: [`70fe3b5e-6e90-4d5a-aaa1-328b0a2799b4`],
      },
      {
        name: `Test Character Name C`,
        emoteUuids: [
          `71a14866-09f6-44d1-aca1-81fa189f2e63`,
          `e8add675-8363-44ae-9298-63640ba24372`,
          `d8855df2-f55e-4c31-a21f-1d4d41f0d0f9`,
          `305880ed-85ee-45fe-b4c1-ea390735a79f`,
        ],
      }
    );

    validateCharacterStateSchema(
      `characters`,
      schema,
      `${path}/characters/77577025-547c-4de5-b60e-b5bb2fc7fe77`,
      unpredictableErrors,
      (character) =>
        instanceFactory({
          name: `Test Name`,
          backgrounds,
          characters: {
            ...characters,
            "77577025-547c-4de5-b60e-b5bb2fc7fe77": character,
          },
          emotes,
          scenes,
          lines,
        })
    );

    rejectsMissingProperty(
      `emotes`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        name: `Test Name`,
        backgrounds,
        characters,
        scenes,
        lines,
      })
    );

    validateUuidMapSchema(
      `emotes`,
      schema,
      `${path}/emotes`,
      unpredictableErrors,
      (injectedEmotes) =>
        instanceFactory({
          name: `Test Name`,
          backgrounds,
          characters,
          emotes: injectedEmotes,
          scenes,
          lines,
        }),
      {
        characterUuid: `ddcf88c2-4822-406d-b508-3a385865b1f2`,
        name: `Test Emote A Name`,
        svg: `Test Emote A Svg`,
      },
      {
        characterUuid: `3c438c32-dd40-41db-8003-1ce6acd7d3fd`,
        name: `Test Emote B Name`,
        svg: `Test Emote B Svg`,
      },
      {
        characterUuid: `bd1b007c-5191-4837-8666-77695233e98e`,
        name: `Test Emote C Name`,
        svg: `Test Emote C Svg`,
      }
    );

    validateEmoteStateSchema(
      `emotes`,
      schema,
      `${path}/emotes/77577025-547c-4de5-b60e-b5bb2fc7fe77`,
      unpredictableErrors,
      (emote) =>
        instanceFactory({
          name: `Test Name`,
          backgrounds,
          characters,
          emotes: {
            ...emotes,
            "77577025-547c-4de5-b60e-b5bb2fc7fe77": emote,
          },
          scenes,
          lines,
        })
    );

    rejectsMissingProperty(
      `scenes`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        name: `Test Name`,
        backgrounds,
        characters,
        emotes,
        lines,
      })
    );

    validateUuidMapSchema(
      `scenes`,
      schema,
      `${path}/scenes`,
      unpredictableErrors,
      (injectedScenes) =>
        instanceFactory({
          name: `Test Name`,
          backgrounds,
          characters,
          emotes,
          scenes: injectedScenes,
          lines,
        }),
      {
        name: `Test Scene A Name`,
        backgroundUuid: `56335959-23dc-427e-9920-1bd5b450ba15`,
        lineUuids: [
          `67a7b540-98ea-4e97-bfb9-bfc4208cf8f1`,
          `cc1f74ea-907f-45f7-819d-15cb23a59be9`,
          `b5af717f-b94d-412b-8b51-7d35bc764567`,
          `8b5d0bb5-a899-4a99-a8fa-7e0a8e90f115`,
        ],
      },
      {
        name: `Test Scene B Name`,
        backgroundUuid: `c3de01ef-d820-48fa-bb4c-f7159bf39424`,
        lineUuids: [
          `52109cde-ca83-45f5-90d0-7206c30e108f`,
          `9b64f4d8-cb5e-4fa0-8399-c766675bd313`,
          `6268ceb1-1d9e-4df1-aeee-42ef0c6c9e4a`,
        ],
      },
      {
        name: `Test Scene C Name`,
        backgroundUuid: `2984d0fb-b0c2-4f6f-b04a-be016a5573ef`,
        lineUuids: [
          `6e551251-f5f5-4df6-9ee7-f5283ff81920`,
          `53f46bd7-1a0f-4a96-a551-880fa6608a7c`,
        ],
      }
    );

    validateSceneStateSchema(
      `scenes`,
      schema,
      `${path}/scenes/77577025-547c-4de5-b60e-b5bb2fc7fe77`,
      unpredictableErrors,
      (scene) =>
        instanceFactory({
          name: `Test Name`,
          backgrounds,
          characters,
          emotes,
          scenes: {
            ...scenes,
            "77577025-547c-4de5-b60e-b5bb2fc7fe77": scene,
          },
          lines,
        })
    );

    rejectsMissingProperty(
      `lines`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        name: `Test Name`,
        backgrounds,
        characters,
        emotes,
        scenes,
      })
    );

    validateUuidMapSchema(
      `lines`,
      schema,
      `${path}/lines`,
      unpredictableErrors,
      (injectedLines) =>
        instanceFactory({
          name: `Test Name`,
          backgrounds,
          characters,
          emotes,
          scenes,
          lines: injectedLines,
        }),
      {
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
      {
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
      {
        sceneUuid: `7c588f84-6745-486f-b809-c84a080d68d5`,
        text: `Test Line C Text`,
        characters: {
          "b5626887-a5d3-441a-bc60-85299e39992b": {
            emoteUuid: `a85c82fb-02d1-4094-8d10-c6ba1cd11081`,
          },
          "c5ad08a0-554f-46c9-8a29-89e5ccaf90f5": {
            emoteUuid: `86264418-f4ae-4dcb-a9f5-b621af432aa1`,
          },
        },
      }
    );

    validateLineStateSchema(
      `lines`,
      schema,
      `${path}/lines/77577025-547c-4de5-b60e-b5bb2fc7fe77`,
      unpredictableErrors,
      (line) =>
        instanceFactory({
          name: `Test Name`,
          backgrounds,
          characters,
          emotes,
          scenes,
          lines: {
            ...lines,
            "77577025-547c-4de5-b60e-b5bb2fc7fe77": line,
          },
        })
    );
  });
}

validateStateSchema(
  `stateSchema`,
  stateSchema,
  `instance`,
  false,
  (state) => state
);
