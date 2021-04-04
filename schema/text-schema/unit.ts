import * as ajv from "ajv";
import { validateUnpaddedString } from "../unit";
import { Json, textSchema } from "../..";

export function validateTextSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (text: Json) => Json
): void {
  validateUnpaddedString(
    description,
    schema,
    path,
    200,
    unpredictableErrors,
    instanceFactory
  );
}

validateTextSchema(`textSchema`, textSchema, `instance`, false, (text) => text);
