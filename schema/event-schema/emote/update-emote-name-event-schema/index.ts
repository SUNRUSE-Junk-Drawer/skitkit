import * as ajv from "ajv";
import { uuidSchema, UuidSchema } from "../../../uuid-schema";
import { nameSchema, NameSchema } from "../../../name-schema";

export const updateEmoteNameEventSchema: ajv.JSONSchemaType<UpdateEmoteNameEventSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`type`, `emoteUuid`, `name`],
  properties: {
    type: {
      type: `string`,
      enum: [`updateEmoteName`],
    },
    emoteUuid: uuidSchema,
    name: nameSchema,
  },
};

export type UpdateEmoteNameEventSchema = {
  readonly type: `updateEmoteName`;
  readonly emoteUuid: UuidSchema;
  readonly name: NameSchema;
};
