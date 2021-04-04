import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  validateUnpaddedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { Json, updateLineTextEventSchema } from "../../../..";

export function validateUpdateLineTextEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (updateLineTextEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `updateLineText`,
        lineUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        text: `Test Text`,
      }),
      schema
    );

    rejectsMissingProperty(
      `type`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        lineUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        text: `Test Text`,
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `updateLineText`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          lineUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          text: `Test Text`,
        })
    );

    rejectsMissingProperty(
      `lineUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateLineText`,
        text: `Test Text`,
      })
    );

    validateUuidSchema(
      `lineUuid`,
      schema,
      `${path}/lineUuid`,
      unpredictableErrors,
      (lineUuid) =>
        instanceFactory({
          type: `updateLineText`,
          lineUuid,
          text: `Test Text`,
        })
    );

    rejectsMissingProperty(
      `text`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateLineText`,
        lineUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      })
    );

    validateUnpaddedString(
      `text`,
      schema,
      `${path}/text`,
      1000,
      unpredictableErrors,
      (text) =>
        instanceFactory({
          type: `updateLineText`,
          lineUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          text,
        })
    );
  });
}

rejectsNonObjects(
  `updateLineTextEventSchema`,
  updateLineTextEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateUpdateLineTextEventSchema(
  `updateLineTextEventSchema`,
  updateLineTextEventSchema,
  `instance`,
  false,
  (updateLineTextEvent) => updateLineTextEvent
);
