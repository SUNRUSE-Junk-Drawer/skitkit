import * as ajv from "ajv";
import { NameSchema, nameSchema } from "../../name-schema";
import { SvgSchema, svgSchema } from "../../svg-schema";

export const backgroundStateSchema: ajv.JSONSchemaType<BackgroundStateSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`name`, `svg`],
  properties: {
    name: nameSchema,
    svg: svgSchema,
  },
};

export type BackgroundStateSchema = {
  readonly name: NameSchema;
  readonly svg: SvgSchema;
};
