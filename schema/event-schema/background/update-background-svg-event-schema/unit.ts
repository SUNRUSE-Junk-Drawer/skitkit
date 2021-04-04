import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateSvgSchema } from "../../../svg-schema/unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { Json, updateBackgroundSvgEventSchema } from "../../../..";

export function validateUpdateBackgroundSvgEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (updateBackgroundSvgEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `updateBackgroundSvg`,
        backgroundUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        svg: `Test Svg`,
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
        svg: `Test Svg`,
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `updateBackgroundSvg`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          backgroundUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          svg: `Test Svg`,
        })
    );

    rejectsMissingProperty(
      `backgroundUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateBackgroundSvg`,
        svg: `Test Svg`,
      })
    );

    validateUuidSchema(
      `backgroundUuid`,
      schema,
      `${path}/backgroundUuid`,
      unpredictableErrors,
      (backgroundUuid) =>
        instanceFactory({
          type: `updateBackgroundSvg`,
          backgroundUuid,
          svg: `Test Svg`,
        })
    );

    rejectsMissingProperty(
      `svg`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateBackgroundSvg`,
        backgroundUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      })
    );

    validateSvgSchema(
      `svg`,
      schema,
      `${path}/svg`,
      unpredictableErrors,
      (svg) =>
        instanceFactory({
          type: `updateBackgroundSvg`,
          backgroundUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          svg,
        })
    );
  });
}

rejectsNonObjects(
  `updateBackgroundSvgEventSchema`,
  updateBackgroundSvgEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateUpdateBackgroundSvgEventSchema(
  `updateBackgroundSvgEventSchema`,
  updateBackgroundSvgEventSchema,
  `instance`,
  false,
  (updateBackgroundSvgEvent) => updateBackgroundSvgEvent
);
