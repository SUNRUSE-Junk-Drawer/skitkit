import * as ajv from "ajv";
import { accepts, rejectsMissingProperty, rejectsNonObjects } from "../../unit";
import { validateNameSchema } from "../../name-schema/unit";
import { Json, sceneStateSchema } from "../../..";
import { validateUuidSchema } from "../../uuid-schema/unit";
import { validateUuidArraySchema } from "../../uuid-array-schema/unit";

export function validateSceneStateSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (sceneState: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        name: `Test Name`,
        backgroundUuid: `9ecc9f98-18b1-4daf-a469-ad35fc74f29c`,
        lineUuids: [
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
        backgroundUuid: `9ecc9f98-18b1-4daf-a469-ad35fc74f29c`,
        lineUuids: [
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
          backgroundUuid: `9ecc9f98-18b1-4daf-a469-ad35fc74f29c`,
          lineUuids: [
            `faee5b62-7886-4957-9cfe-6bd98fdec071`,
            `04f4adef-eb24-4a52-a8e6-4cd431dadc41`,
            `81061265-b194-4a1c-aa3a-253981d18805`,
          ],
        })
    );

    rejectsMissingProperty(
      `backgroundUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        name: `Test Name`,
        lineUuids: [
          `faee5b62-7886-4957-9cfe-6bd98fdec071`,
          `04f4adef-eb24-4a52-a8e6-4cd431dadc41`,
          `81061265-b194-4a1c-aa3a-253981d18805`,
        ],
      })
    );

    validateUuidSchema(
      `backgroundUuid`,
      schema,
      `${path}/backgroundUuid`,
      unpredictableErrors,
      (backgroundUuid) =>
        instanceFactory({
          name: `Test Name`,
          backgroundUuid,
          lineUuids: [
            `faee5b62-7886-4957-9cfe-6bd98fdec071`,
            `04f4adef-eb24-4a52-a8e6-4cd431dadc41`,
            `81061265-b194-4a1c-aa3a-253981d18805`,
          ],
        })
    );

    rejectsMissingProperty(
      `lineUuids`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        name: `Test Name`,
        backgroundUuid: `9ecc9f98-18b1-4daf-a469-ad35fc74f29c`,
      })
    );

    validateUuidArraySchema(
      `lineUuids`,
      schema,
      `${path}/lineUuids`,
      unpredictableErrors,
      (lineUuids) =>
        instanceFactory({
          name: `Test Name`,
          backgroundUuid: `9ecc9f98-18b1-4daf-a469-ad35fc74f29c`,
          lineUuids,
        })
    );
  });
}

validateSceneStateSchema(
  `sceneStateSchema`,
  sceneStateSchema,
  `instance`,
  false,
  (sceneState) => sceneState
);
