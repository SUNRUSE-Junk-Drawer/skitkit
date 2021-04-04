import * as ajv from "ajv";
import { uuidSchema, UuidSchema } from "../../../uuid-schema";

export const deleteBackgroundEventSchema: ajv.JSONSchemaType<DeleteBackgroundEventSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`type`, `backgroundUuid`],
  properties: {
    type: {
      type: `string`,
      enum: [`deleteBackground`],
    },
    backgroundUuid: uuidSchema,
  },
};

export type DeleteBackgroundEventSchema = {
  readonly type: `deleteBackground`;
  readonly backgroundUuid: UuidSchema;
};
