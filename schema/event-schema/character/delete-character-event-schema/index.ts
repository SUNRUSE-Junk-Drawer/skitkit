import * as ajv from "ajv";
import { uuidSchema, UuidSchema } from "../../../uuid-schema";

export const deleteCharacterEventSchema: ajv.JSONSchemaType<DeleteCharacterEventSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`type`, `characterUuid`],
  properties: {
    type: {
      type: `string`,
      enum: [`deleteCharacter`],
    },
    characterUuid: uuidSchema,
  },
};

export type DeleteCharacterEventSchema = {
  readonly type: `deleteCharacter`;
  readonly characterUuid: UuidSchema;
};
