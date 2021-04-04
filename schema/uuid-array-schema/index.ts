import * as ajv from "ajv";
import { uuidSchema, UuidSchema } from "../uuid-schema";

export const uuidArraySchema: ajv.JSONSchemaType<UuidArraySchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `array`,
  items: uuidSchema,
  minItems: 1,
  uniqueItems: true,
};

export type UuidArraySchema = ReadonlyArray<UuidSchema>;
