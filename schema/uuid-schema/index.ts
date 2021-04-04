import * as ajv from "ajv";

export const uuidSchema: ajv.JSONSchemaType<UuidSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `string`,
  pattern: `^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$`,
};

export type UuidSchema = string;
