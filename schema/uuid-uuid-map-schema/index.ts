import * as ajv from "ajv";
import { uuidSchema, UuidSchema } from "../uuid-schema";

export const uuidUuidMapSchema: ajv.JSONSchemaType<UuidUuidMapSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  patternProperties: {
    "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$": uuidSchema,
  },
  required: [],
};

export type UuidUuidMapSchema = { readonly [uuid: string]: UuidSchema };
