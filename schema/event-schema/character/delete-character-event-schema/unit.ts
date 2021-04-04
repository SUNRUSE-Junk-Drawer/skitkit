import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { Json, deleteCharacterEventSchema } from "../../../..";

export function validateDeleteCharacterEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (deleteCharacterEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `deleteCharacter`,
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
      `deleteCharacter`,
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
        type: `deleteCharacter`,
      })
    );

    validateUuidSchema(
      `characterUuid`,
      schema,
      `${path}/characterUuid`,
      unpredictableErrors,
      (characterUuid) =>
        instanceFactory({
          type: `deleteCharacter`,
          characterUuid,
        })
    );
  });
}

rejectsNonObjects(
  `deleteCharacterEventSchema`,
  deleteCharacterEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateDeleteCharacterEventSchema(
  `deleteCharacterEventSchema`,
  deleteCharacterEventSchema,
  `instance`,
  false,
  (deleteCharacterEvent) => deleteCharacterEvent
);
