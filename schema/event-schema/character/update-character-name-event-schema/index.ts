import * as ajv from "ajv";
import { uuidSchema, UuidSchema } from "../../../uuid-schema";
import { nameSchema, NameSchema } from "../../../name-schema";

export const updateCharacterNameEventSchema: ajv.JSONSchemaType<UpdateCharacterNameEventSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`type`, `characterUuid`, `name`],
  properties: {
    type: {
      type: `string`,
      enum: [`updateCharacterName`],
    },
    characterUuid: uuidSchema,
    name: nameSchema,
  },
};

export type UpdateCharacterNameEventSchema = {
  readonly type: `updateCharacterName`;
  readonly characterUuid: UuidSchema;
  readonly name: NameSchema;
};
