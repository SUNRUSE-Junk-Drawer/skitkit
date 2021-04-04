import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { Json, createEmoteEventSchema } from "../../../..";

export function validateCreateEmoteEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (createEmoteEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `createEmote`,
        characterUuid: `01d58b64-ae31-43c0-ab7e-1ab1a99b7e30`,
        emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      }),
      schema
    );

    rejectsMissingProperty(
      `type`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        characterUuid: `01d58b64-ae31-43c0-ab7e-1ab1a99b7e30`,
        emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `createEmote`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          characterUuid: `01d58b64-ae31-43c0-ab7e-1ab1a99b7e30`,
          emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        })
    );

    rejectsMissingProperty(
      `characterUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `createEmote`,
        emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      })
    );

    validateUuidSchema(
      `characterUuid`,
      schema,
      `${path}/characterUuid`,
      unpredictableErrors,
      (characterUuid) =>
        instanceFactory({
          type: `createEmote`,
          characterUuid,
          emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        })
    );

    rejectsMissingProperty(
      `emoteUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `createEmote`,
        characterUuid: `01d58b64-ae31-43c0-ab7e-1ab1a99b7e30`,
      })
    );

    validateUuidSchema(
      `emoteUuid`,
      schema,
      `${path}/emoteUuid`,
      unpredictableErrors,
      (emoteUuid) =>
        instanceFactory({
          type: `createEmote`,
          characterUuid: `01d58b64-ae31-43c0-ab7e-1ab1a99b7e30`,
          emoteUuid,
        })
    );
  });
}

rejectsNonObjects(
  `createEmoteEventSchema`,
  createEmoteEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateCreateEmoteEventSchema(
  `createEmoteEventSchema`,
  createEmoteEventSchema,
  `instance`,
  false,
  (createEmoteEvent) => createEmoteEvent
);
