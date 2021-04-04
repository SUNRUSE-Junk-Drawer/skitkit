import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { Json, createBackgroundEventSchema } from "../../../..";

export function validateCreateBackgroundEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (createBackgroundEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `createBackground`,
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
      `createBackground`,
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
        type: `createBackground`,
      })
    );

    validateUuidSchema(
      `backgroundUuid`,
      schema,
      `${path}/backgroundUuid`,
      unpredictableErrors,
      (backgroundUuid) =>
        instanceFactory({
          type: `createBackground`,
          backgroundUuid,
        })
    );
  });
}

rejectsNonObjects(
  `createBackgroundEventSchema`,
  createBackgroundEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateCreateBackgroundEventSchema(
  `createBackgroundEventSchema`,
  createBackgroundEventSchema,
  `instance`,
  false,
  (createBackgroundEvent) => createBackgroundEvent
);
