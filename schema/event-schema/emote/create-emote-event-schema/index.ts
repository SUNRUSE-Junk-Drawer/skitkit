import * as ajv from "ajv";
import { uuidSchema, UuidSchema } from "../../../uuid-schema";

export const createEmoteEventSchema: ajv.JSONSchemaType<CreateEmoteEventSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`type`, `characterUuid`, `emoteUuid`],
  properties: {
    type: {
      type: `string`,
      enum: [`createEmote`],
    },
    characterUuid: uuidSchema,
    emoteUuid: uuidSchema,
  },
};

export type CreateEmoteEventSchema = {
  readonly type: `createEmote`;
  readonly characterUuid: UuidSchema;
  readonly emoteUuid: UuidSchema;
};
