import * as ajv from "ajv";
import { accepts, rejects, rejectsNonArrays } from "../unit";
import { validateUuidSchema } from "../uuid-schema/unit";
import { Json, uuidArraySchema } from "../..";

export function validateUuidArraySchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (uuidUuidMap: Json) => Json
): void {
  describe(description, () => {
    rejects(
      `empty`,
      instanceFactory([]),
      schema,
      unpredictableErrors ? null : [`${path} must NOT have fewer than 1 items`]
    );

    accepts(
      `valid with one`,
      instanceFactory([`930c204f-28b8-4e19-9b57-4d381fc82107`]),
      schema
    );

    accepts(
      `valid with two`,
      instanceFactory([
        `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
        `d982f79e-c16e-4224-85d9-b93946257052`,
      ]),
      schema
    );

    accepts(
      `valid with three`,
      instanceFactory([
        `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
        `d982f79e-c16e-4224-85d9-b93946257052`,
        `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
      ]),
      schema
    );

    rejects(
      `non-unique`,
      instanceFactory([
        `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
        `d982f79e-c16e-4224-85d9-b93946257052`,
        `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
      ]),
      schema,
      unpredictableErrors
        ? null
        : [
            `${path} must NOT have duplicate items (items ## 2 and 0 are identical)`,
          ]
    );

    rejectsNonArrays(
      `non-array`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory
    );

    validateUuidSchema(
      `value`,
      schema,
      `${path}/1`,
      unpredictableErrors,
      (uuid) =>
        instanceFactory([
          `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
          uuid,
          `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
        ])
    );
  });
}

validateUuidArraySchema(
  `uuidArraySchema`,
  uuidArraySchema,
  `instance`,
  false,
  (uuidArray) => uuidArray
);
