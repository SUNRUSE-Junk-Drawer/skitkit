import * as ajv from "ajv";
import { uuidSchema, UuidSchema } from "../../../uuid-schema";

export const deleteSceneEventSchema: ajv.JSONSchemaType<DeleteSceneEventSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`type`, `sceneUuid`],
  properties: {
    type: {
      type: `string`,
      enum: [`deleteScene`],
    },
    sceneUuid: uuidSchema,
  },
};

export type DeleteSceneEventSchema = {
  readonly type: `deleteScene`;
  readonly sceneUuid: UuidSchema;
};
