import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { Json, createStartingLineEventSchema } from "../../../..";
import { validateUuidUuidMapSchema } from "../../../uuid-uuid-map-schema/unit";

export function validateCreateStartingLineEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (createStartingLineEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `createStartingLine`,
        sceneUuid: `382e904a-646a-4e56-b56b-bba8302a206e`,
        lineUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        characterEmoteUuids: {
          "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
          "b3c27180-f8f9-4bbf-94a3-b50df6056114": `d982f79e-c16e-4224-85d9-b93946257052`,
          "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
        },
      }),
      schema
    );

    rejectsMissingProperty(
      `type`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        sceneUuid: `382e904a-646a-4e56-b56b-bba8302a206e`,
        lineUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        characterEmoteUuids: {
          "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
          "b3c27180-f8f9-4bbf-94a3-b50df6056114": `d982f79e-c16e-4224-85d9-b93946257052`,
          "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
        },
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `createStartingLine`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          sceneUuid: `382e904a-646a-4e56-b56b-bba8302a206e`,
          lineUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          characterEmoteUuids: {
            "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
            "b3c27180-f8f9-4bbf-94a3-b50df6056114": `d982f79e-c16e-4224-85d9-b93946257052`,
            "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
          },
        })
    );

    rejectsMissingProperty(
      `sceneUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `createStartingLine`,
        lineUuid: `382e904a-646a-4e56-b56b-bba8302a206e`,
        characterEmoteUuids: {
          "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
          "b3c27180-f8f9-4bbf-94a3-b50df6056114": `d982f79e-c16e-4224-85d9-b93946257052`,
          "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
        },
      })
    );

    validateUuidSchema(
      `sceneUuid`,
      schema,
      `${path}/sceneUuid`,
      unpredictableErrors,
      (sceneUuid) =>
        instanceFactory({
          type: `createStartingLine`,
          sceneUuid,
          lineUuid: `382e904a-646a-4e56-b56b-bba8302a206e`,
          characterEmoteUuids: {
            "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
            "b3c27180-f8f9-4bbf-94a3-b50df6056114": `d982f79e-c16e-4224-85d9-b93946257052`,
            "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
          },
        })
    );

    rejectsMissingProperty(
      `lineUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `createStartingLine`,
        sceneUuid: `382e904a-646a-4e56-b56b-bba8302a206e`,
        characterEmoteUuids: {
          "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
          "b3c27180-f8f9-4bbf-94a3-b50df6056114": `d982f79e-c16e-4224-85d9-b93946257052`,
          "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
        },
      })
    );

    validateUuidSchema(
      `lineUuid`,
      schema,
      `${path}/lineUuid`,
      unpredictableErrors,
      (lineUuid) =>
        instanceFactory({
          type: `createStartingLine`,
          sceneUuid: `382e904a-646a-4e56-b56b-bba8302a206e`,
          lineUuid,
          characterEmoteUuids: {
            "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
            "b3c27180-f8f9-4bbf-94a3-b50df6056114": `d982f79e-c16e-4224-85d9-b93946257052`,
            "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
          },
        })
    );

    rejectsMissingProperty(
      `characterEmoteUuids`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `createStartingLine`,
        sceneUuid: `382e904a-646a-4e56-b56b-bba8302a206e`,
        lineUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      })
    );

    validateUuidUuidMapSchema(
      `characterEmoteUuids`,
      schema,
      `${path}/characterEmoteUuids`,
      unpredictableErrors,
      (characterEmoteUuids) =>
        instanceFactory({
          type: `createStartingLine`,
          sceneUuid: `382e904a-646a-4e56-b56b-bba8302a206e`,
          lineUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          characterEmoteUuids,
        })
    );
  });
}

rejectsNonObjects(
  `createStartingLineEventSchema`,
  createStartingLineEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateCreateStartingLineEventSchema(
  `createStartingLineEventSchema`,
  createStartingLineEventSchema,
  `instance`,
  false,
  (createStartingLineEvent) => createStartingLineEvent
);
