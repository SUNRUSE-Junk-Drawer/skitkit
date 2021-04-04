import * as ajv from "ajv";
import { validateUuidSchema, validateUuidMapSchema } from "../uuid-schema/unit";
import { Json, uuidUuidMapSchema } from "../..";

export function validateUuidUuidMapSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (uuidUuidMap: Json) => Json
): void {
  describe(description, () => {
    validateUuidMapSchema(
      `uuid map`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory,
      `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
      `d982f79e-c16e-4224-85d9-b93946257052`,
      `4ce28459-6d17-4f33-b63d-3de7969a84cb`
    );

    validateUuidSchema(
      `value`,
      schema,
      `${path}/b3c27180-f8f9-4bbf-94a3-b50df6056114`,
      unpredictableErrors,
      (uuid) =>
        instanceFactory({
          "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
          "b3c27180-f8f9-4bbf-94a3-b50df6056114": uuid,
          "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
        })
    );
  });
}

validateUuidUuidMapSchema(
  `uuidUuidMapSchema`,
  uuidUuidMapSchema,
  `instance`,
  false,
  (uuidUuidMap) => uuidUuidMap
);
