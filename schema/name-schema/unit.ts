import * as ajv from "ajv";
import { validateUnpaddedString } from "../unit";
import { Json, nameSchema } from "../..";

export function validateNameSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (name: Json) => Json
): void {
  validateUnpaddedString(
    description,
    schema,
    path,
    50,
    unpredictableErrors,
    instanceFactory
  );
}

validateNameSchema(`nameSchema`, nameSchema, `instance`, false, (name) => name);
