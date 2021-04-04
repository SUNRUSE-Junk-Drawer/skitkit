import * as ajv from "ajv";
import { uuidSchema, UuidSchema } from "../../../uuid-schema";

export const updateLineCharacterEmoteEventSchema: ajv.JSONSchemaType<UpdateLineCharacterEmoteEventSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`type`, `lineUuid`, `emoteUuid`],
  properties: {
    type: {
      type: `string`,
      enum: [`updateLineCharacterEmote`],
    },
    lineUuid: uuidSchema,
    emoteUuid: uuidSchema,
  },
};

export type UpdateLineCharacterEmoteEventSchema = {
  readonly type: `updateLineCharacterEmote`;
  readonly lineUuid: UuidSchema;
  readonly emoteUuid: UuidSchema;
};
