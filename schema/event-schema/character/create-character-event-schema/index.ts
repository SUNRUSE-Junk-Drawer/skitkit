import * as ajv from "ajv";
import { uuidSchema, UuidSchema } from "../../../uuid-schema";

export const createCharacterEventSchema: ajv.JSONSchemaType<CreateCharacterEventSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`type`, `characterUuid`],
  properties: {
    type: {
      type: `string`,
      enum: [`createCharacter`],
    },
    characterUuid: uuidSchema,
  },
};

export type CreateCharacterEventSchema = {
  readonly type: `createCharacter`;
  readonly characterUuid: UuidSchema;
};
