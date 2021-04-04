import * as ajv from "ajv";

export const nameSchema: ajv.JSONSchemaType<NameSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `string`,
  pattern: `^\\S(?:.*\\S)?$`,
  maxLength: 50,
};

export type NameSchema = string;
