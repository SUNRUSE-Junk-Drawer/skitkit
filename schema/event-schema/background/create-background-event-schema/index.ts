import * as ajv from "ajv";
import { uuidSchema, UuidSchema } from "../../../uuid-schema";

export const createBackgroundEventSchema: ajv.JSONSchemaType<CreateBackgroundEventSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`type`, `backgroundUuid`],
  properties: {
    type: {
      type: `string`,
      enum: [`createBackground`],
    },
    backgroundUuid: uuidSchema,
  },
};

export type CreateBackgroundEventSchema = {
  readonly type: `createBackground`;
  readonly backgroundUuid: UuidSchema;
};
