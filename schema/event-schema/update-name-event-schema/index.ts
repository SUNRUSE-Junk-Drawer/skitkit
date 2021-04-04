import * as ajv from "ajv";
import { nameSchema, NameSchema } from "../../name-schema";

export const updateNameEventSchema: ajv.JSONSchemaType<UpdateNameEventSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`type`, `name`],
  properties: {
    type: {
      type: `string`,
      enum: [`updateName`],
    },
    name: nameSchema,
  },
};

export type UpdateNameEventSchema = {
  readonly type: `updateName`;
  readonly name: NameSchema;
};
