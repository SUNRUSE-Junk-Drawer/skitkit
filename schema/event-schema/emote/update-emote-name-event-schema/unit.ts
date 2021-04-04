import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { validateNameSchema } from "../../../name-schema/unit";
import { Json, updateEmoteNameEventSchema } from "../../../..";

export function validateUpdateEmoteNameEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (updateEmoteNameEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `updateEmoteName`,
        emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        name: `Test Name`,
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
        name: `Test Name`,
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `updateEmoteName`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          name: `Test Name`,
        })
    );

    rejectsMissingProperty(
      `emoteUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateEmoteName`,
        name: `Test Name`,
      })
    );

    validateUuidSchema(
      `emoteUuid`,
      schema,
      `${path}/emoteUuid`,
      unpredictableErrors,
      (emoteUuid) =>
        instanceFactory({
          type: `updateEmoteName`,
          emoteUuid,
          name: `Test Name`,
        })
    );

    rejectsMissingProperty(
      `name`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateEmoteName`,
        emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      })
    );

    validateNameSchema(
      `name`,
      schema,
      `${path}/name`,
      unpredictableErrors,
      (name) =>
        instanceFactory({
          type: `updateEmoteName`,
          emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          name,
        })
    );
  });
}

rejectsNonObjects(
  `updateEmoteNameEventSchema`,
  updateEmoteNameEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateUpdateEmoteNameEventSchema(
  `updateEmoteNameEventSchema`,
  updateEmoteNameEventSchema,
  `instance`,
  false,
  (updateEmoteNameEvent) => updateEmoteNameEvent
);
