import * as ajv from "ajv";
import { accepts, rejectsMissingProperty, rejectsNonObjects } from "../../unit";
import { validateNameSchema } from "../../name-schema/unit";
import { Json, characterStateSchema } from "../../..";
import { validateUuidArraySchema } from "../../uuid-array-schema/unit";

export function validateCharacterStateSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (characterState: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        name: `Test Name`,
        emoteUuids: [
          `faee5b62-7886-4957-9cfe-6bd98fdec071`,
          `04f4adef-eb24-4a52-a8e6-4cd431dadc41`,
          `81061265-b194-4a1c-aa3a-253981d18805`,
        ],
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
      `name`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        emoteUuids: [
          `faee5b62-7886-4957-9cfe-6bd98fdec071`,
          `04f4adef-eb24-4a52-a8e6-4cd431dadc41`,
          `81061265-b194-4a1c-aa3a-253981d18805`,
        ],
      })
    );

    validateNameSchema(
      `name`,
      schema,
      `${path}/name`,
      unpredictableErrors,
      (name) =>
        instanceFactory({
          name,
          emoteUuids: [
            `faee5b62-7886-4957-9cfe-6bd98fdec071`,
            `04f4adef-eb24-4a52-a8e6-4cd431dadc41`,
            `81061265-b194-4a1c-aa3a-253981d18805`,
          ],
        })
    );

    rejectsMissingProperty(
      `emoteUuids`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        name: `Test Name`,
      })
    );

    validateUuidArraySchema(
      `emoteUuids`,
      schema,
      `${path}/emoteUuids`,
      unpredictableErrors,
      (emoteUuids) =>
        instanceFactory({
          name: `Test Name`,
          emoteUuids,
        })
    );
  });
}

validateCharacterStateSchema(
  `characterStateSchema`,
  characterStateSchema,
  `instance`,
  false,
  (characterState) => characterState
);
