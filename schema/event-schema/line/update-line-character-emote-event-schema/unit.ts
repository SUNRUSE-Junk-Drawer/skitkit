import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { Json, updateLineCharacterEmoteEventSchema } from "../../../..";

export function validateUpdateLineCharacterEmoteEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (updateLineCharacterEmoteEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `updateLineCharacterEmote`,
        lineUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        emoteUuid: `abb928c7-51a7-4138-a3b8-1ad78a1773d8`,
      }),
      schema
    );

    rejectsMissingProperty(
      `type`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        lineUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        emoteUuid: `abb928c7-51a7-4138-a3b8-1ad78a1773d8`,
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `updateLineCharacterEmote`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          lineUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          emoteUuid: `abb928c7-51a7-4138-a3b8-1ad78a1773d8`,
        })
    );

    rejectsMissingProperty(
      `lineUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateLineCharacterEmote`,
        emoteUuid: `abb928c7-51a7-4138-a3b8-1ad78a1773d8`,
      })
    );

    validateUuidSchema(
      `lineUuid`,
      schema,
      `${path}/lineUuid`,
      unpredictableErrors,
      (lineUuid) =>
        instanceFactory({
          type: `updateLineCharacterEmote`,
          lineUuid,
          emoteUuid: `abb928c7-51a7-4138-a3b8-1ad78a1773d8`,
        })
    );

    rejectsMissingProperty(
      `emoteUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateLineCharacterEmote`,
        lineUuid: `0062cfb9-92fe-45a2-bb71-4fb4290c3882`,
      })
    );

    validateUuidSchema(
      `emoteUuid`,
      schema,
      `${path}/emoteUuid`,
      unpredictableErrors,
      (emoteUuid) =>
        instanceFactory({
          type: `updateLineCharacterEmote`,
          lineUuid: `0062cfb9-92fe-45a2-bb71-4fb4290c3882`,
          emoteUuid,
        })
    );
  });
}

rejectsNonObjects(
  `updateLineCharacterEmoteEventSchema`,
  updateLineCharacterEmoteEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateUpdateLineCharacterEmoteEventSchema(
  `updateLineCharacterEmoteEventSchema`,
  updateLineCharacterEmoteEventSchema,
  `instance`,
  false,
  (updateLineCharacterEmoteEvent) => updateLineCharacterEmoteEvent
);
