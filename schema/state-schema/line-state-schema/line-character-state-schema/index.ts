import * as ajv from "ajv";
import { UuidSchema, uuidSchema } from "../../../uuid-schema";

export const lineCharacterStateSchema: ajv.JSONSchemaType<LineCharacterStateSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`emoteUuid`],
  properties: {
    emoteUuid: uuidSchema,
  },
};

export type LineCharacterStateSchema = {
  readonly emoteUuid: UuidSchema;
};
