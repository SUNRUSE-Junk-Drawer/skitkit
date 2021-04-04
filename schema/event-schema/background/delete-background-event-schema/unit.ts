import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { Json, deleteBackgroundEventSchema } from "../../../..";

export function validateDeleteBackgroundEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (deleteBackgroundEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `deleteBackground`,
        backgroundUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      }),
      schema
    );

    rejectsMissingProperty(
      `type`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        backgroundUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `deleteBackground`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          backgroundUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        })
    );

    rejectsMissingProperty(
      `backgroundUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `deleteBackground`,
      })
    );

    validateUuidSchema(
      `backgroundUuid`,
      schema,
      `${path}/backgroundUuid`,
      unpredictableErrors,
      (backgroundUuid) =>
        instanceFactory({
          type: `deleteBackground`,
          backgroundUuid,
        })
    );
  });
}

rejectsNonObjects(
  `deleteBackgroundEventSchema`,
  deleteBackgroundEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateDeleteBackgroundEventSchema(
  `deleteBackgroundEventSchema`,
  deleteBackgroundEventSchema,
  `instance`,
  false,
  (deleteBackgroundEvent) => deleteBackgroundEvent
);
