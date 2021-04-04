import * as ajv from "ajv";
import { uuidSchema, UuidSchema } from "../../../uuid-schema";

export const updateLineTextEventSchema: ajv.JSONSchemaType<UpdateLineTextEventSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`type`, `lineUuid`, `text`],
  properties: {
    type: {
      type: `string`,
      enum: [`updateLineText`],
    },
    lineUuid: uuidSchema,
    text: {
      type: `string`,
      pattern: `^\\S(?:.*\\S)?$`,
      maxLength: 1000,
    },
  },
};

export type UpdateLineTextEventSchema = {
  readonly type: `updateLineText`;
  readonly lineUuid: UuidSchema;
  readonly text: string;
};
