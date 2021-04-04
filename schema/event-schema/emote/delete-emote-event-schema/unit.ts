import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { Json, deleteEmoteEventSchema } from "../../../..";

export function validateDeleteEmoteEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (deleteEmoteEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `deleteEmote`,
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
        emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `deleteEmote`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        })
    );

    rejectsMissingProperty(
      `emoteUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `deleteEmote`,
      })
    );

    validateUuidSchema(
      `emoteUuid`,
      schema,
      `${path}/emoteUuid`,
      unpredictableErrors,
      (emoteUuid) =>
        instanceFactory({
          type: `deleteEmote`,
          emoteUuid,
        })
    );
  });
}

rejectsNonObjects(
  `deleteEmoteEventSchema`,
  deleteEmoteEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateDeleteEmoteEventSchema(
  `deleteEmoteEventSchema`,
  deleteEmoteEventSchema,
  `instance`,
  false,
  (deleteEmoteEvent) => deleteEmoteEvent
);
