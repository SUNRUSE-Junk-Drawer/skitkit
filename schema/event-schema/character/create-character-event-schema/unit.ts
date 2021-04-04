import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { Json, createCharacterEventSchema } from "../../../..";

export function validateCreateCharacterEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (createCharacterEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `createCharacter`,
        characterUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
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
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `createCharacter`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          characterUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        })
    );

    rejectsMissingProperty(
      `characterUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `createCharacter`,
      })
    );

    validateUuidSchema(
      `characterUuid`,
      schema,
      `${path}/characterUuid`,
      unpredictableErrors,
      (characterUuid) =>
        instanceFactory({
          type: `createCharacter`,
          characterUuid,
        })
    );
  });
}

rejectsNonObjects(
  `createCharacterEventSchema`,
  createCharacterEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateCreateCharacterEventSchema(
  `createCharacterEventSchema`,
  createCharacterEventSchema,
  `instance`,
  false,
  (createCharacterEvent) => createCharacterEvent
);
