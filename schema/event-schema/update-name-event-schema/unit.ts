import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../unit";
import { validateNameSchema } from "../../name-schema/unit";
import { Json, updateNameEventSchema } from "../../..";

export function validateUpdateNameEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (updateNameEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `updateName`,
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
        name: `Test Name`,
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `updateName`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          name: `Test Name`,
        })
    );

    rejectsMissingProperty(
      `name`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateName`,
      })
    );

    validateNameSchema(
      `name`,
      schema,
      `${path}/name`,
      unpredictableErrors,
      (name) =>
        instanceFactory({
          type: `updateName`,
          name,
        })
    );
  });
}

rejectsNonObjects(
  `updateNameEventSchema`,
  updateNameEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateUpdateNameEventSchema(
  `updateNameEventSchema`,
  updateNameEventSchema,
  `instance`,
  false,
  (updateNameEvent) => updateNameEvent
);
