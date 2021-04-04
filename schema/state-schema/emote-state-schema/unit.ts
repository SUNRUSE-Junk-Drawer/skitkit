import * as ajv from "ajv";
import { accepts, rejectsMissingProperty, rejectsNonObjects } from "../../unit";
import { validateNameSchema } from "../../name-schema/unit";
import { validateSvgSchema } from "../../svg-schema/unit";
import { Json, emoteStateSchema } from "../../..";
import { validateUuidSchema } from "../../uuid-schema/unit";

export function validateEmoteStateSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (emoteState: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        characterUuid: `faee5b62-7886-4957-9cfe-6bd98fdec071`,
        name: `Test Name`,
        svg: `Test Svg`,
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
      `characterUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        name: `Test Name`,
        svg: `Test Svg`,
      })
    );

    validateUuidSchema(
      `characterUuid`,
      schema,
      `${path}/characterUuid`,
      unpredictableErrors,
      (characterUuid) =>
        instanceFactory({
          characterUuid,
          name: `Test Name`,
          svg: `Test Svg`,
        })
    );

    rejectsMissingProperty(
      `name`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        characterUuid: `faee5b62-7886-4957-9cfe-6bd98fdec071`,
        svg: `Test Svg`,
      })
    );

    validateNameSchema(
      `name`,
      schema,
      `${path}/name`,
      unpredictableErrors,
      (name) =>
        instanceFactory({
          characterUuid: `faee5b62-7886-4957-9cfe-6bd98fdec071`,
          name,
          svg: `Test Svg`,
        })
    );

    rejectsMissingProperty(
      `svg`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        characterUuid: `faee5b62-7886-4957-9cfe-6bd98fdec071`,
        name: `Test Name`,
      })
    );

    validateSvgSchema(
      `svg`,
      schema,
      `${path}/svg`,
      unpredictableErrors,
      (svg) =>
        instanceFactory({
          characterUuid: `faee5b62-7886-4957-9cfe-6bd98fdec071`,
          name: `Test Name`,
          svg,
        })
    );
  });
}

validateEmoteStateSchema(
  `emoteStateSchema`,
  emoteStateSchema,
  `instance`,
  false,
  (emoteState) => emoteState
);
