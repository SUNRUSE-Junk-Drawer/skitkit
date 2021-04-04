import * as ajv from "ajv";
import { uuidSchema, UuidSchema } from "../../../uuid-schema";

export const deleteEmoteEventSchema: ajv.JSONSchemaType<DeleteEmoteEventSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`type`, `emoteUuid`],
  properties: {
    type: {
      type: `string`,
      enum: [`deleteEmote`],
    },
    emoteUuid: uuidSchema,
  },
};

export type DeleteEmoteEventSchema = {
  readonly type: `deleteEmote`;
  readonly emoteUuid: UuidSchema;
};
