import * as ajv from "ajv";
import { uuidSchema, UuidSchema } from "../../../uuid-schema";
import {
  uuidUuidMapSchema,
  UuidUuidMapSchema,
} from "../../../uuid-uuid-map-schema";

export const createSceneEventSchema: ajv.JSONSchemaType<CreateSceneEventSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`type`, `sceneUuid`, `backgroundUuid`, `characterEmoteUuids`],
  properties: {
    type: {
      type: `string`,
      enum: [`createScene`],
    },
    sceneUuid: uuidSchema,
    backgroundUuid: uuidSchema,
    characterEmoteUuids: uuidUuidMapSchema,
  },
};

export type CreateSceneEventSchema = {
  readonly type: `createScene`;
  readonly sceneUuid: UuidSchema;
  readonly backgroundUuid: UuidSchema;
  readonly characterEmoteUuids: UuidUuidMapSchema;
};
