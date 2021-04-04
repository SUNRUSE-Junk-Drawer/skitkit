import * as ajv from "ajv";
import { accepts, rejectsMissingProperty, rejectsNonObjects } from "../../unit";
import { validateNameSchema } from "../../name-schema/unit";
import { validateSvgSchema } from "../../svg-schema/unit";
import { Json, backgroundStateSchema } from "../../..";

export function validateBackgroundStateSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (backgroundState: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
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
      `name`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
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
          name: `Test Name`,
          svg,
        })
    );
  });
}

validateBackgroundStateSchema(
  `backgroundStateSchema`,
  backgroundStateSchema,
  `instance`,
  false,
  (backgroundState) => backgroundState
);
