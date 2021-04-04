import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { validateSvgSchema } from "../../../svg-schema/unit";
import { Json, updateEmoteSvgEventSchema } from "../../../..";

export function validateUpdateEmoteSvgEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (updateEmoteSvgEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `updateEmoteSvg`,
        emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
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
        emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        svg: `Test Svg`,
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `updateEmoteSvg`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          svg: `Test Svg`,
        })
    );

    rejectsMissingProperty(
      `emoteUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateEmoteSvg`,
        svg: `Test Svg`,
      })
    );

    validateUuidSchema(
      `emoteUuid`,
      schema,
      `${path}/emoteUuid`,
      unpredictableErrors,
      (emoteUuid) =>
        instanceFactory({
          type: `updateEmoteSvg`,
          emoteUuid,
          svg: `Test Svg`,
        })
    );

    rejectsMissingProperty(
      `svg`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateEmoteSvg`,
        emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      })
    );

    validateSvgSchema(
      `svg`,
      schema,
      `${path}/svg`,
      unpredictableErrors,
      (svg) =>
        instanceFactory({
          type: `updateEmoteSvg`,
          emoteUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          svg,
        })
    );
  });
}

rejectsNonObjects(
  `updateEmoteSvgEventSchema`,
  updateEmoteSvgEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateUpdateEmoteSvgEventSchema(
  `updateEmoteSvgEventSchema`,
  updateEmoteSvgEventSchema,
  `instance`,
  false,
  (updateEmoteSvgEvent) => updateEmoteSvgEvent
);
