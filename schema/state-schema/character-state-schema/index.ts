import * as ajv from "ajv";
import { NameSchema, nameSchema } from "../../name-schema";
import { UuidSchema } from "../../uuid-schema";
import { uuidArraySchema } from "../../uuid-array-schema";

export const characterStateSchema: ajv.JSONSchemaType<CharacterStateSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`name`, `emoteUuids`],
  properties: {
    name: nameSchema,
    emoteUuids: uuidArraySchema,
  },
};

export type CharacterStateSchema = {
  readonly name: NameSchema;
  readonly emoteUuids: ReadonlyArray<UuidSchema>;
};
