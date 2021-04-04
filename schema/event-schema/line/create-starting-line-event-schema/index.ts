import * as ajv from "ajv";
import { uuidSchema, UuidSchema } from "../../../uuid-schema";
import {
  uuidUuidMapSchema,
  UuidUuidMapSchema,
} from "../../../uuid-uuid-map-schema";

export const createStartingLineEventSchema: ajv.JSONSchemaType<CreateStartingLineEventSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`type`, `sceneUuid`, `lineUuid`, `characterEmoteUuids`],
  properties: {
    type: {
      type: `string`,
      enum: [`createStartingLine`],
    },
    sceneUuid: uuidSchema,
    lineUuid: uuidSchema,
    beforeLineUuid: uuidSchema,
    characterEmoteUuids: uuidUuidMapSchema,
  },
};

export type CreateStartingLineEventSchema = {
  readonly type: `createStartingLine`;
  readonly sceneUuid: UuidSchema;
  readonly lineUuid: UuidSchema;
  readonly characterEmoteUuids: UuidUuidMapSchema;
};
