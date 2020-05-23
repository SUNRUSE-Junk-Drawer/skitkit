import * as jsonschema from "jsonschema";
import { uuidSchema, UuidSchema } from "../../../uuid-schema";
import { nameSchema, NameSchema } from "../../../name-schema";

export const updateSceneNameEventSchema: jsonschema.Schema = {
  $schema: `http://json-schema.org/draft-04/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`type`, `sceneUuid`, `name`],
  properties: {
    type: {
      type: `string`,
      enum: [`updateSceneName`],
    },
    sceneUuid: uuidSchema,
    name: nameSchema,
  },
};

export type UpdateSceneNameEventSchema = {
  readonly type: `updateSceneName`;
  readonly sceneUuid: UuidSchema;
  readonly name: NameSchema;
};
