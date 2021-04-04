import * as ajv from "ajv";

export const svgSchema: ajv.JSONSchemaType<SvgSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `string`,
  minLength: 1,
  maxLength: 1024 * 1024,
};

export type SvgSchema = string;
