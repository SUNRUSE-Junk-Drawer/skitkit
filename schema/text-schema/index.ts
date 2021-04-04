import * as ajv from "ajv";

export const textSchema: ajv.JSONSchemaType<TextSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `string`,
  pattern: `^\\S(?:.*\\S)?$`,
  maxLength: 200,
};

export type TextSchema = string;
