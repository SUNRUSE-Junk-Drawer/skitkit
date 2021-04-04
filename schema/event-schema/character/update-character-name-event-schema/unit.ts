import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { validateNameSchema } from "../../../name-schema/unit";
import { Json, updateCharacterNameEventSchema } from "../../../..";

export function validateUpdateCharacterNameEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (updateCharacterNameEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `updateCharacterName`,
        characterUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
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
        characterUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        name: `Test Name`,
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `updateCharacterName`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          characterUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          name: `Test Name`,
        })
    );

    rejectsMissingProperty(
      `characterUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateCharacterName`,
        name: `Test Name`,
      })
    );

    validateUuidSchema(
      `characterUuid`,
      schema,
      `${path}/characterUuid`,
      unpredictableErrors,
      (characterUuid) =>
        instanceFactory({
          type: `updateCharacterName`,
          characterUuid,
          name: `Test Name`,
        })
    );

    rejectsMissingProperty(
      `name`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateCharacterName`,
        characterUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      })
    );

    validateNameSchema(
      `name`,
      schema,
      `${path}/name`,
      unpredictableErrors,
      (name) =>
        instanceFactory({
          type: `updateCharacterName`,
          characterUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          name,
        })
    );
  });
}

rejectsNonObjects(
  `updateCharacterNameEventSchema`,
  updateCharacterNameEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateUpdateCharacterNameEventSchema(
  `updateCharacterNameEventSchema`,
  updateCharacterNameEventSchema,
  `instance`,
  false,
  (updateCharacterNameEvent) => updateCharacterNameEvent
);
