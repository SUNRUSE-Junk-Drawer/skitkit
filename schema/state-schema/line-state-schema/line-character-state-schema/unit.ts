import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsNonObjects,
} from "../../../unit";
import { Json, lineCharacterStateSchema } from "../../../..";
import { validateUuidSchema } from "../../../uuid-schema/unit";

export function validateLineCharacterStateSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (lineCharacterState: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        emoteUuid: `faee5b62-7886-4957-9cfe-6bd98fdec071`,
      }),
      schema
    );

    rejectsNonObjects(
      `non-object`,
      schema,
      path,
      unpredictableErrors,
      (nonObject) => instanceFactory(nonObject)
    );

    rejectsMissingProperty(
      `emoteUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({})
    );

    validateUuidSchema(
      `emoteUuid`,
      schema,
      `${path}/emoteUuid`,
      unpredictableErrors,
      (emoteUuid) =>
        instanceFactory({
          emoteUuid,
        })
    );
  });
}

validateLineCharacterStateSchema(
  `lineCharacterStateSchema`,
  lineCharacterStateSchema,
  `instance`,
  false,
  (lineCharacterState) => lineCharacterState
);
