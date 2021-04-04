import * as ajv from "ajv";
import { NameSchema, nameSchema } from "../../name-schema";
import { UuidSchema, uuidSchema } from "../../uuid-schema";
import { UuidArraySchema, uuidArraySchema } from "../../uuid-array-schema";

export const sceneStateSchema: ajv.JSONSchemaType<SceneStateSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`name`, `backgroundUuid`, `lineUuids`],
  properties: {
    name: nameSchema,
    backgroundUuid: uuidSchema,
    lineUuids: uuidArraySchema,
  },
};

export type SceneStateSchema = {
  readonly name: NameSchema;
  readonly backgroundUuid: UuidSchema;
  readonly lineUuids: UuidArraySchema;
};
