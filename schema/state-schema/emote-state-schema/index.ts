import * as ajv from "ajv";
import { NameSchema, nameSchema } from "../../name-schema";
import { SvgSchema, svgSchema } from "../../svg-schema";
import { UuidSchema, uuidSchema } from "../../uuid-schema";

export const emoteStateSchema: ajv.JSONSchemaType<EmoteStateSchema> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`characterUuid`, `name`, `svg`],
  properties: {
    characterUuid: uuidSchema,
    name: nameSchema,
    svg: svgSchema,
  },
};

export type EmoteStateSchema = {
  readonly characterUuid: UuidSchema;
  readonly name: NameSchema;
  readonly svg: SvgSchema;
};
